import 'dotenv/config'
import { Model } from 'sequelize'
import { Sequelize, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'


const OrderDefine = (sequelize: Sequelize) => sequelize.define(
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


export { OrderDefine }