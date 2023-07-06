import { Sequelize } from 'sequelize'
import { ProductConstructor } from './Product'
import { ModelRevision } from './revisions/ModelRevision'
import { UserConstructor } from './User'
import { OrderConstructor } from './Order'
export { ModelRevision }

const sequelize = new Sequelize(process.env.DB_URI!)

export const Product = ProductConstructor(sequelize)
export const productRevision = new ModelRevision(Product, sequelize)

export const User = UserConstructor(sequelize)
export const userRevision = new ModelRevision(User, sequelize)

export const Order = OrderConstructor(sequelize)
export const orderRevision = new ModelRevision(Order, sequelize)

User.hasMany(Order)   
Order.belongsTo(User)

Order.belongsToMany(Product, { through: 'Order_Product' })
Product.belongsToMany(Order, { through: 'Order_Product' })

