import { Sequelize } from "sequelize";
import { Order, Product, User } from "../models";
import { ModelRevision } from "./ModelRevision";
const sequelize = new Sequelize(process.env['DB_URI'])

export const productRevision = new ModelRevision(Product, sequelize)
export const userRevision = new ModelRevision(User, sequelize)
export const orderRevision = new ModelRevision(Order, sequelize)
export { ModelRevision }