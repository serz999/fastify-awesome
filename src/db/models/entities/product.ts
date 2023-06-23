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
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
}

const ProductDefine = (sequelize: Sequelize) => sequelize.define(
    'Product',
    ProductAttrs,
    { timestamps: false, tableName: 'Product' }
)


export { ProductAttrs, ProductDefine }