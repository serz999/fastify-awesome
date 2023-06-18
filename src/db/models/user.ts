import 'dotenv/config'
import { Sequelize, DataTypes } from 'sequelize'


const UserAttrs: { [key: string]: any} = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    email: { type: DataTypes.STRING, unique: true },
    phoneNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    secondName: DataTypes.STRING,
    age: DataTypes.INTEGER
}

const UserDefine = (sequelize: Sequelize) => sequelize.define(
    'User',
    UserAttrs,    
    { timestamps: false, tableName: 'User' }
)

const UserAuditAttrs = { ...UserAttrs }
UserAuditAttrs.action = { type: DataTypes.STRING }
UserAuditAttrs.date = { type: DataTypes.DATE }
UserAuditAttrs.UserId = {
    type: DataTypes.INTEGER,
    references: { model: 'User', key: 'id'},
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
}

const UserAuditDefine = (sequlize: Sequelize) => sequlize.define(
    'UserAudit',
    UserAuditAttrs,
    { timestamps: false, tableName: 'UserAudit' }
)

export { UserAttrs, UserDefine, UserAuditAttrs, UserAuditDefine }

