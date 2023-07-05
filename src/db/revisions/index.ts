import { Sequelize } from "sequelize";
import { Order, Product, User } from "../models";
import { ModelRevision } from "./ModelRevision";
import { sequelize } from '../sequelizeInst'

export const productRevision = new ModelRevision(Product, sequelize)
export const userRevision = new ModelRevision(User, sequelize)
export const orderRevision = new ModelRevision(Order, sequelize)
export { ModelRevision }