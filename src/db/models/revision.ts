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
        // ToDo transaction
        const insts: Array<any> = await this.Model.findAll({ 
            limit: recordsCount, 
            order:['date', 'DESC'] 
        })

        for ( const inst of insts) {
           // Logic 
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
        // ToDo transaction
        const insts: Array<any> = await this.Stash.findAll({ 
            limit: recordsCount, 
            order:['date', 'DESC'] 
        })

        for ( const inst of insts) {

        }
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
        console.log(inst) 
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