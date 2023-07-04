import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { OrderDefine } from './order.model'
import { UserDefine } from './user.model'
import { ProductDefine } from './product.model'
import { ModelRevision } from './revisions/revision'

const URI: string = process.env['DB_URI']!
const sequelize = new Sequelize(URI)

// Domain models init
const User = UserDefine(sequelize)
const Product = ProductDefine(sequelize)
const Order = OrderDefine(sequelize)

// Bind models
User.hasMany(Order)   
Order.belongsTo(User)

Order.belongsToMany(Product, { through: 'Order_Product' })
Product.belongsToMany(Order, { through: 'Order_Product' })

// Init revisions
const productRevision = new ModelRevision(Product, sequelize) 

export { User, Product, Order }