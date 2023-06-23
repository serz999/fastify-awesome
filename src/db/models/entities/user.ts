import 'dotenv/config'
import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'


interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    email: string;
    phoneNumber: string;
    firstName: string;
    secondName: string;
    age: number;
}

const UserAttrs: any = {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, 
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

export { UserAttrs, UserDefine }
