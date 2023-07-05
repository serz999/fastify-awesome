import 'dotenv/config'
import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
const sequelize = new Sequelize(process.env['DB_URI'])

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    email: string;
    phoneNumber: string;
    firstName: string;
    secondName: string;
    age: number;
}

export const User = sequelize.define(
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