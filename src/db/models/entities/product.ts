import 'dotenv/config'
import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'


interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    id: number
    name: string
    price: number 
}

interface ProductAuditModel extends ProductModel {
    action: string
    date: Date 
    UserId: number 
}

const ProductAttrs: any = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
}

const ProductAuditAttrs: any = { ...ProductAttrs }
ProductAuditAttrs.action = { type: DataTypes.STRING }
ProductAuditAttrs.date = { type: DataTypes.DATE }
ProductAuditAttrs.ProductId = {
    type: DataTypes.INTEGER,
    references: { model: 'Product', key: 'id'},
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
}

const ProductDefine = (sequelize: Sequelize) => sequelize.define(
    'Product',
    ProductAttrs,
    { timestamps: false, tableName: 'Product' }
)


const ProductAuditDefine = (sequlize: Sequelize) => sequlize.define(
    'ProductAudit',
    ProductAuditAttrs,
    { timestamps: false, tableName: 'ProductAudit' }
)

export { ProductAttrs, ProductDefine, ProductAuditAttrs, ProductAuditDefine }