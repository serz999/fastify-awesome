import 'dotenv/config'
import { Sequelize, DataTypes } from 'sequelize'


const OrderAttrs: { [ key: string]: any } = {
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

const OrderDefine = (sequelize: Sequelize) => sequelize.define(
    'Order',
    OrderAttrs, 
    { timestamps: false, tableName: 'Order' }
)

const OrderAuditAttrs = { ...OrderAttrs }
OrderAuditAttrs.action = { type: DataTypes.STRING }
OrderAuditAttrs.date = { type: DataTypes.DATE }
OrderAuditAttrs.OrderId = {
    type: DataTypes.INTEGER,
    references: { model: 'Order', key: 'id'},
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
}

const OrderAuditDefine = (sequlize: Sequelize) => sequlize.define(
    'OrderAudit',
    OrderAuditAttrs,
    { timestamps: false, tableName: 'OrderAudit' }
)

export { OrderAttrs, OrderDefine , OrderAuditAttrs, OrderAuditDefine }