import { Sequelize } from "sequelize"
import { ModelStatic, Model, DataTypes } from "sequelize"


enum AvailableActions {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

class ModelRevision {

    public TargetModel: ModelStatic<Model<any, any>>

    public Model:  ModelStatic<Model<any, any>>

    public foreignKeyName: string 

    constructor(TargetModel: ModelStatic<Model<any, any>>, adapter: Sequelize) {
        this.TargetModel = TargetModel

        this.foreignKeyName = this.TargetModel.name + 'Id'
        this.Model = this.defineRevisionModel(adapter)

        this.bindModels()
        this.registerHooks()
    }

    public stash(recordsCount: number = 1): void {}
    
    public pop(recordsCount: number = 1): void {}
    
    public popAll(): void {}

    private stashStack: Array<any> = []

    private defineRevisionModel(adapter: Sequelize): ModelStatic<Model<any, any>> {
        const revisionModelName: string = this.TargetModel.name + 'Revision'

        const Model = adapter.define(
            revisionModelName,
            this.assemblyRevisionModelAttrs(),
            { timestamps: false, tableName: revisionModelName}
        )

        return Model
    } 

    private assemblyRevisionModelAttrs(): any {
        const TargetModelAttrs = this.TargetModel.getAttributes() 

        const ModelAttrs: any = { ...TargetModelAttrs }

        // Extend ModelAttrs
        ModelAttrs[this.foreignKeyName] = {
            type: DataTypes.INTEGER,
            references: { model: this.TargetModel.name, key: 'id'},
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL' 
        }
        ModelAttrs.action = { type: DataTypes.STRING }
        ModelAttrs.date = { type: DataTypes.DATE }

        return ModelAttrs
    }
    
    private bindModels(): void {
        this.TargetModel.hasMany(this.Model)
        this.Model.belongsTo(this.TargetModel)
    }

    private registerHooks(): void { 
        this.TargetModel.afterCreate(async (inst: any) => { 
            await this.makeRevisionRecord(inst, AvailableActions.CREATE)
        })
                
        this.TargetModel.beforeBulkUpdate(async (inst: any) => {
            // here inst is with new data, why?
            await this.makeRevisionRecord(inst, AvailableActions.UPDATE) 
        })
        
        this.TargetModel.beforeDestroy(async (inst: any) => { 
            await this.makeRevisionRecord(inst, AvailableActions.DELETE)
        })
    }

    private async makeRevisionRecord(inst: any, action: string): Promise<void> { 
        console.log(inst) 
        const revisionData = { ...inst.dataValues }
        if (revisionData.id) delete revisionData.id
        revisionData.date = Date.now()
        revisionData.action = action
        revisionData[this.foreignKeyName] = inst.id
        console.log(revisionData)
        await this.Model.create(revisionData)
    }
}


export { ModelRevision }