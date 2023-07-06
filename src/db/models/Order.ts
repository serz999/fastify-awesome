import 'dotenv/config'
import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes, Model,} from 'sequelize'

interface Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    id: number
    totalPrice: number
    isFinish: boolean
    UserId: number
}

export const OrderConstructor = (sequelize: Sequelize) => sequelize.define(
    'Order',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, 
        totalPrice: DataTypes.DECIMAL,
        isFinish: DataTypes.BOOLEAN,
        UserId: {
            type: DataTypes.UUID, 
            references: { model: 'User', key: 'id'},
            onDelete: 'SET NULL', 
            onUpdate: 'SET NULL'
        }
    },
    { timestamps: false, tableName: 'Order' }
)


