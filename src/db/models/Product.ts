import 'dotenv/config'
import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import { sequelize } from '../sequelizeInst'
import { ModelRevision } from '../revisions'

interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    id: number
    name: string
    price: number 
}

export const Product = sequelize.define(
    'Product',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
    },
    { timestamps: false, tableName: 'Product' }
)

