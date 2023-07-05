import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URI!)