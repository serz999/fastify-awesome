import { Sequelize } from "sequelize"
import { ModelStatic, Model, DataTypes } from "sequelize"


enum States {
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    DELETED = 'DELETED'
}

interface vscOpts {
    instsUUIDs?: string | Array<string>
    revisionsCount?: number
}

interface goToVscOpts {
    instsUUIDs?: string | Array<string>
    revisionUUID?: string
}

interface broadcastVscOpts {
    instsUUIDs?: string | Array<string>
    revisionUUID?: string
}

export class ModelRevision {

    public TargetModel: ModelStatic<Model<any, any>>

    public Model:  ModelStatic<Model<any, any>>

    public instUUIDFieldName: string 

    public Stash: ModelStatic<Model<any, any>>

    constructor(TargetModel: ModelStatic<Model<any, any>>, sequelize: Sequelize) {
        this.TargetModel = TargetModel

        this.instUUIDFieldName = this.TargetModel.name + 'UUID'
        this.Model = this.defineRevisionModel(sequelize)
        this.Stash = this.defineStash(sequelize)
        
        this.registerHooks()
    }

    public async stash(opts: vscOpts): Promise<void> {
        const revisionsCount = opts.revisionsCount || 1 
        const instsUUIDs = opts.instsUUIDs || 'common context'

        const contexts: Array<Array<any>> = []
         
        if (instsUUIDs === 'common context') {
            contexts[0] = await this.Model.findAll({ 
                limit: revisionsCount, 
                order: [['date', 'DESC']] 
            })
        } else {
            for (const instUUID of instsUUIDs) {
                const context = await this.Model.findAll({
                    limit: revisionsCount, 
                    order: [['date', 'DESC']],
                    where: {
                        [this.instUUIDFieldName]: instUUID
                    }
                })
                contexts.push(context)
            }
       }
        for (const context of contexts) {
            for (const revision of context) {
                const instUUID = revision[this.instUUIDFieldName]
                 
                if (revision.state === States.CREATED) {
                    const inst: any = await this.TargetModel.findByPk(instUUID) 
                    await inst.destroy()
    
                    await this.Stash.create(revision.dataValues)
                    await revision.destroy()

                } else if (revision.state === States.DELETED) {
                    const data: any = this.transformToInstAttrs(revision.dataValues)
                    await this.TargetModel.create(data)                

                    await this.Stash.create(revision.dataValues)
                    await revision.destroy()

                } else if (revision.state === States.UPDATED) { 
                    await this.Stash.create(revision.dataValues)
                    await revision.destroy()

                    const latestRecord: any = await this.Model.findOne({ 
                        where: { 
                            [this.instUUIDFieldName]: instUUID, 
                        },
                        order: [['date', 'DESC']]
                    }) 

                    const inst: any = await this.TargetModel.findByPk(instUUID)
                    await inst.update(latestRecord.dataValues) 
                }

                await this.offsetHooks(1)
            }
        }        
    }

    public async stashTo(opts: goToVscOpts): Promise<void> {
        const instsUUIDs = opts.instsUUIDs || 'common context'
        const revisionUUID: string = opts.revisionUUID!
        const revisionsCount = await this.calculateStepsTo(revisionUUID, this.Model, true) 

        await this.stash({ instsUUIDs: instsUUIDs, revisionsCount: revisionsCount })
    }
    
    public async stashAll(opts: broadcastVscOpts): Promise<void> {
        const instsUUIDs = opts.instsUUIDs || 'common context'
        const revisionsCount = await this.Model.count()

        await this.stash({ instsUUIDs: instsUUIDs, revisionsCount: revisionsCount }) 
    }
     
    public async pop(opts: vscOpts): Promise<void> {
        const recordsCount = opts.revisionsCount || 1
        const instsUUIDs = opts.instsUUIDs || 'common context' 
        
        let contexts: Array<Array<any>> = []

        if (instsUUIDs === 'common context') {
            contexts[0] = await this.Stash.findAll({ 
                limit: recordsCount, 
                order: ['date'] 
            })
        } else {
            for (const instUUID of instsUUIDs) {
                const context = await this.Stash.findAll({
                    limit: recordsCount, 
                    order: ['date'],
                    where: {
                        [this.instUUIDFieldName]: instUUID
                    }
                })
                contexts.push(context)
            }
       }
        
        for (const context of contexts) {
            for (const revision of context) {
                const instUUID = revision[this.instUUIDFieldName]

                if (revision.state === States.CREATED) {
                    const data: any = this.transformToInstAttrs(revision.dataValues)
                    await this.TargetModel.create(data)
                } else if (revision.state === States.DELETED) {
                    const inst: any = await this.TargetModel.findByPk(instUUID)
                    await inst.destroy()
                } else if (revision.state === States.UPDATED) { 
                    const data: any = this.transformToInstAttrs(revision.dataValues)
                    const inst: any = await this.TargetModel.findByPk(instUUID)
                    await inst.update(data)
                }
                await this.offsetHooks(1)
                await this.Model.create(revision.dataValues)
                await revision.destroy()
            }
        }
        
    } 

    public async popTo(opts: goToVscOpts): Promise<void> {
        const instsUUIDs = opts.instsUUIDs || 'common context'
        const revisionUUID: string = opts.revisionUUID!
        const revisionsCount = await this.calculateStepsTo(revisionUUID, this.Stash) 

        await this.pop({ instsUUIDs: instsUUIDs, revisionsCount: revisionsCount })
    }
    
    public async popAll(opts: broadcastVscOpts): Promise<void> {
        const instsUUIDs = opts.instsUUIDs || 'common context' 
        const stepsToRecord = await this.Stash.count()

        await this.pop({instsUUIDs: instsUUIDs, revisionsCount: stepsToRecord })
    }

    private async calculateStepsTo(instUUID: string, Model: ModelStatic<Model<any, any>>, desc: boolean = false): Promise<number> {
        let count = 1 

        let allInsts: any
        if (desc) {
            allInsts = await Model.findAll({ order: [['date', 'DESC']] })
        } else {
            allInsts = await Model.findAll({ order: ['date'] })
        } 

        for ( const inst of allInsts) {
            if (inst.id === instUUID) break
            count++
        }
         
        return count
    }

    private defineRevisionModel(adapter: Sequelize): ModelStatic<Model<any, any>> {
        const revisionModelName: string = this.TargetModel.name + 'Revision'
         
        const Model = adapter.define(
            revisionModelName,
            this.assemblyRevisionAttrs(),
            { timestamps: false, tableName: revisionModelName}
        )
         
        return Model
    } 
     
    private assemblyRevisionAttrs(): any {
        const TargetModelAttrs = this.TargetModel.getAttributes()  
        const validTargetModelAttrs = this.prepareModelAttrs(TargetModelAttrs)
         
        const ModelAttrs: any = { ...validTargetModelAttrs } 
        ModelAttrs[this.instUUIDFieldName] = { type: DataTypes.UUID }
        ModelAttrs.state = { type: DataTypes.STRING }
        ModelAttrs.date = { type: DataTypes.DATE }

        return ModelAttrs
    }
    
    private transformToInstAttrs(recordAttrs: any): Object {
        const attrs = { ...recordAttrs }

        delete attrs.state
        delete attrs.date

        attrs.id = attrs[this.instUUIDFieldName]
        delete attrs[this.instUUIDFieldName]

        return attrs
    } 

    private prepareModelAttrs(modelAttrs: Object): Object {
        const attrs: any = { ...modelAttrs }

        for (const key in attrs) {
            if (attrs[key].unique == true) delete attrs[key].unique
        }

        return attrs
    }

    private defineStash(adapter: Sequelize): ModelStatic<Model<any, any>> {
        const modelName = this.Model.name + 'Stash'

        const attrs: any = this.Model.getAttributes()

        const Stash = adapter.define(
            modelName,
            attrs, 
            { timestamps: false, tableName: modelName}
        )

        return Stash
    }

    private registerHooks(): void {
        this.TargetModel.afterCreate(async (inst: any) => { 
            await this.makeRevisionRecord(inst, States.CREATED)
        })
                
        this.TargetModel.afterUpdate(async (inst: any) => {
            await this.makeRevisionRecord(inst, States.UPDATED) 
        })
        
        this.TargetModel.beforeDestroy(async (inst: any) => { 
            await this.makeRevisionRecord(inst, States.DELETED)
        })
    }
    
    private async offsetHooks(offset: number): Promise<void> {
        for (let i = 0; i < offset; i++) {
            const record: any = await this.Model.findOne({ order: [['date', 'DESC']] })
            await record.destroy()
        }
    }

    private async makeRevisionRecord(inst: any, state: string): Promise<void> { 
        const revisionData: any = this.prepareInstData(inst.dataValues)

        revisionData.date = Date.now()
        revisionData.state = state
        revisionData[this.instUUIDFieldName] = inst.id
         
        await this.Model.create(revisionData)
    } 

    private prepareInstData(instData: Object): Object {
        const data: any = {...instData}

        if (data.id) delete data.id

        return data
    }
}

