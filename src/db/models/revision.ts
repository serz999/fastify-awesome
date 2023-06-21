import { Sequelize } from "sequelize"
import { ModelStatic, Model, DataTypes } from "sequelize"


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
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT' 
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
        const registerCreateEval = async (inst: any) => await this.makeRevision(inst, 'create')
        this.TargetModel.afterCreate(registerCreateEval.bind(this))
         
        const registerUpdateEval = async (inst: any) => await this.makeRevision(inst, 'update')
        this.TargetModel.beforeUpdate(registerUpdateEval.bind(this))
         
        const registerDeleteEval = async (inst: any) => await this.makeRevision(inst, 'delete')
        this.TargetModel.beforeDestroy(registerDeleteEval.bind(this))
    }

    private async makeRevision(inst: any, action: string): Promise<void> {
        const instData: any = await this.TargetModel.findByPk(inst.id)
        if (instData) {
            const revisionData = { ...instData.dataValues }
            if (instData.id) delete revisionData.id
            revisionData.date = Date.now()
            revisionData.action = action
            revisionData[this.foreignKeyName] = inst.id
            await this.Model.create(revisionData)
        }
    }
}


export { ModelRevision }