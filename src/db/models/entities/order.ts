import 'dotenv/config'
import { Model } from 'sequelize'
import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'


interface Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    id: number
    totalPrice: number
    isFinish: boolean
    UserId: number
}

interface OrderAudit extends Order, Model<InferAttributes<OrderAudit>, InferCreationAttributes<OrderAudit>> {
    
}

const OrderAttrs: any = {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, 
    totalPrice: DataTypes.DECIMAL,
    isFinish: DataTypes.BOOLEAN,
    UserId: {
        type: DataTypes.UUID, 
        references: { model: 'User', key: 'id'},
        onDelete: 'SET NULL', 
        onUpdate: 'SET NULL'
    } 
}

const OrderDefine = (sequelize: Sequelize) => sequelize.define(
    'Order',
    OrderAttrs, 
    { timestamps: false, tableName: 'Order' }
)


export { OrderAttrs, OrderDefine }