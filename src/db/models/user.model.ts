import 'dotenv/config'
import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'


const UserDefine = (sequelize: Sequelize) => sequelize.define(
    'User',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, 
        email: { type: DataTypes.STRING, unique: true },
        phoneNumber: DataTypes.STRING,
        firstName: DataTypes.STRING,
        secondName: DataTypes.STRING,
        age: DataTypes.INTEGER
    },    
    { timestamps: false, tableName: 'User' }
)

export { UserDefine }
