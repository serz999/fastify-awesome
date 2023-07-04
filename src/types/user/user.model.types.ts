import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    email: string;
    phoneNumber: string;
    firstName: string;
    secondName: string;
    age: number;
}