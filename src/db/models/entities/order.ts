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
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    totalPrice: DataTypes.DECIMAL,
    isFinish: DataTypes.BOOLEAN,
    UserId: {
        type: DataTypes.INTEGER,
        references: { model: 'User', key: 'id'},
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
    } 
}

const OrderAuditAttrs: any = { ...OrderAttrs }
OrderAuditAttrs.action = { type: DataTypes.STRING }
OrderAuditAttrs.date = { type: DataTypes.DATE }
OrderAuditAttrs.OrderId = {
    type: DataTypes.INTEGER,
    references: { model: 'Order', key: 'id'},
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
}

const OrderDefine = (sequelize: Sequelize) => sequelize.define(
    'Order',
    OrderAttrs, 
    { timestamps: false, tableName: 'Order' }
)

const OrderAuditDefine = (sequlize: Sequelize) => sequlize.define(
    'OrderAudit',
    OrderAuditAttrs,
    { timestamps: false, tableName: 'OrderAudit' }
)

export { OrderAttrs, OrderDefine , OrderAuditAttrs, OrderAuditDefine }