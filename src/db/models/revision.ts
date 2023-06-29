import { Sequelize } from "sequelize"
import { ModelStatic, Model, DataTypes } from "sequelize"


enum States {
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    DELETED = 'DELETED'
}

class ModelRevision {

    public TargetModel: ModelStatic<Model<any, any>>

    public Model:  ModelStatic<Model<any, any>>

    public instUUIDFieldName: string 

    public Stash: ModelStatic<Model<any, any>>

    constructor(TargetModel: ModelStatic<Model<any, any>>, adapter: Sequelize) {
        this.TargetModel = TargetModel

        this.instUUIDFieldName = this.TargetModel.name + 'UUID'
        this.Model = this.defineRevisionModel(adapter)
        this.Stash = this.defineStash(adapter)

        this.registerHooks()
    }

    public async stash(recordsCount: number = 1): Promise<void> {
         
        const records: Array<any> = await this.Model.findAll({ 
            limit: recordsCount, 
            order: [['date', 'DESC']] 
        })
         
        for (const record of records) {
            const targetObjUUID = record[this.instUUIDFieldName]

            if (record.state === States.CREATED) {
                const inst: any = await this.TargetModel.findByPk(targetObjUUID) 
                await inst.destroy()
                 
                // Is need to disable hooks 
                const stash_record: any = await this.Model.findOne({ order: [['date', 'DESC']] })
                await stash_record.destroy()
                 
                await this.Stash.create(record.dataValues)             
                await record.destroy()

            } else if (record.state === States.DELETED) {
                const data: any = this.transformToInstAttrs(record.dataValues)
                await this.TargetModel.create(data)                

                // Is need to disable hooks 
                const stash_record: any = await this.Model.findOne({ order: [['date', 'DESC']] })
                await stash_record.destroy()

                await this.Stash.create(record.dataValues)
                await record.destroy()

            } else if (record.state === States.UPDATED) { 
                await this.Stash.create(record.dataValues)
                await record.destroy()

                const latestRecord: any = await this.Model.findOne({ 
                    where: { 
                        [this.instUUIDFieldName]: targetObjUUID, 
                    },
                    order: [['date', 'DESC']]
                }) 

                const inst: any = await this.TargetModel.findByPk(targetObjUUID)
                await inst.update(latestRecord.dataValues) 

                // Is need to disable hooks 
                const stash_record: any = await this.Model.findOne({ order: [['date', 'DESC']] })
                await stash_record.destroy()
            }
        }
    }

    public async stashTo(recordUUID: string): Promise<void> {
        const stepsToRecord = NaN // ToDo function
        this.stash(stepsToRecord)
    }
    
    public async stashAll(): Promise<void> {
        const stepsToRecord = await this.Model.count()  
        this.stash(stepsToRecord) 
    }

    public async pop(recordsCount: number = 1): Promise<void> {
        const insts: Array<any> = await this.Stash.findAll({ 
            limit: recordsCount, 
            order: [['date', 'DESC']]
        })

        for ( const inst of insts) {}
    } 

    public async popTo(recordUUID: string): Promise<void> {
        const stepsToRecord = NaN // ToDo function
        this.pop(stepsToRecord)
    }
    
    public async popAll(): Promise<void> {
        const stepsToRecord = await this.Stash.count()
        this.pop(stepsToRecord)
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


export { ModelRevision }