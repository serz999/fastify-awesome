import 'dotenv/config'
import { Sequelize, DataTypes } from 'sequelize'


const DB_URI: string = process.env.DB_URI!
const sequelize = new Sequelize(DB_URI)

const User = sequelize.define(
  'User', 
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'users'
  }
)

const syncModels = async () => {
  await User.sync({ alter: true })
}

syncModels()


