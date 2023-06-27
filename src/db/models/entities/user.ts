import 'dotenv/config'
import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'


interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    user_email: string;
    user_phoneNumber: string;
    user_firstName: string;
    user_secondName: string;
    user_age: number;
    user_user_name: string;
    user_password: string;
}

const UserAttrs: any = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    user_email: { type: DataTypes.STRING, unique: true },
    user_phoneNumber: DataTypes.STRING,
    user_firstName: DataTypes.STRING,
    user_secondName: DataTypes.STRING,
    user_age: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    user_password: DataTypes.STRING
}

const UserDefine = (sequelize: Sequelize) => sequelize.define(
    'User',
    UserAttrs,    
    { timestamps: false, tableName: 'User' }
)

export { UserAttrs, UserDefine }
