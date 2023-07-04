import { Model, InferAttributes, InferCreationAttributes } from "sequelize"

interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
    id: number
    name: string
    price: number 
}