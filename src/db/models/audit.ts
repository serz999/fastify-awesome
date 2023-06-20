import { Sequelize } from "sequelize"
import { ModelStatic, Model, DataTypes } from "sequelize"


class Audit {

    public TargetModel: ModelStatic<Model<any, any>>

    public Model:  ModelStatic<Model<any, any>>

    public foreignKeyName: string 

    constructor(targetModel: ModelStatic<Model<any, any>>, adapter: Sequelize) {
        this.TargetModel = targetModel
        this.Model = this.defineAuditModel(adapter)
        this.foreignKeyName = this.TargetModel.name + 'Id'
        this.bindModels()
        this.registerHooks()
    }

    private defineAuditModel(adapter: Sequelize): ModelStatic<Model<any, any>> {
        const auditModelName: string = this.TargetModel.name + 'Audit'

        const auditModelDefine = (sequelize: Sequelize) => sequelize.define(
            auditModelName,
            this.assemblyAuditModelAttrs(),
            { timestamps: false, tableName: auditModelName}
        )

        return auditModelDefine(adapter)
    } 

    private assemblyAuditModelAttrs(): any {
        const TargetModelAttrs = this.TargetModel.getAttributes() 

        const ModelAttrs: any = { ...TargetModelAttrs }

        // Extend ModelAttrs
        ModelAttrs[this.foreignKeyName] = {
            type: DataTypes.INTEGER,
            references: { model: this.TargetModel.name, key: 'id'},
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'
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
            await this.audit(inst, 'create')
        })
        
        this.TargetModel.beforeUpdate(async (inst: any) => {
            await this.audit(inst, 'update')
        })
        
        this.TargetModel.beforeDestroy(async (inst: any) => {
            await this.audit(inst, 'delete')
        })
    }

    private async audit(inst: any, action: string): Promise<void> {
        const instData: any = await this.TargetModel.findByPk(inst.id)
        if (instData) {
            const auditData = { ...instData.dataValues }
            if (instData.id) delete auditData.id
            auditData.date = Date.now()
            auditData.action = action 
            auditData[this.foreignKeyName] = inst.id
            await this.Model.create(auditData)
        }
    }
}

export { Audit }