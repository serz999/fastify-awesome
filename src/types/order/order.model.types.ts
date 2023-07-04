import { Model, InferAttributes, InferCreationAttributes } from "sequelize"

interface Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    id: number
    totalPrice: number
    isFinish: boolean
    UserId: number
}