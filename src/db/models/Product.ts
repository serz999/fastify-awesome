import 'dotenv/config'
import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
const sequelize = new Sequelize(process.env['DB_URI'])

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