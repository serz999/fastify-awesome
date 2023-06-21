import { Sequelize } from "sequelize"
import { ModelStatic, Model, DataTypes } from "sequelize"


class ModelRevision {

    public TargetModel: ModelStatic<Model<any, any>>

    public Model:  ModelStatic<Model<any, any>>

    public foreignKeyName: string 

    private instDataBuff: any

    constructor(TargetModel: ModelStatic<Model<any, any>>, adapter: Sequelize) {
        this.TargetModel = TargetModel

        this.foreignKeyName = this.TargetModel.name + 'Id'
        this.Model = this.defineRevisionModel(adapter)

        this.bindModels()
        this.registerHooks()
    }

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
            this.instDataBuff = await this.TargetModel.findByPk(inst.id) 
            await this.makeRevisionRecord('create')
        })
                
        this.TargetModel.beforeUpdate(async (inst: any) => {
            this.instDataBuff = await this.TargetModel.findByPk(inst.id) 
        })
        
        this.TargetModel.beforeDestroy(async (inst: any) => { 
            this.instDataBuff = await this.TargetModel.findByPk(inst.id) 
            await this.makeRevisionRecord('delete')
        })
    }

    private async makeRevisionRecord(action: string): Promise<void> {
        const instData = this.instDataBuff
        const revisionData = { ...instData.dataValues }
        if (instData.id) delete revisionData.id
        revisionData.date = Date.now()
        revisionData.action = action
        revisionData[this.foreignKeyName] = inst.id
        await this.Model.create(revisionData)
    }
}


export { ModelRevision }