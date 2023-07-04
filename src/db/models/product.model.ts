import 'dotenv/config'
import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'


const ProductDefine = (sequelize: Sequelize) => sequelize.define(
    'Product',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
    },
    { timestamps: false, tableName: 'Product' }
)


export { ProductDefine }