import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { OrderDefine } from './entities/order'
import { UserDefine } from './entities/user'
import { ProductDefine } from './entities/product'
import { ModelRevision } from './revision'


const URI: string = process.env['DB_URI']!
const sequelize = new Sequelize(URI)

// Busines models init
const User = UserDefine(sequelize)
const Product = ProductDefine(sequelize)
const Order = OrderDefine(sequelize)

// Bind models
User.hasMany(Order)   
Order.belongsTo(User)

Order.belongsToMany(Product, { through: 'Order_Product' })
Product.belongsToMany(Order, { through: 'Order_Product' })

// Audit instances
const userRevision = new ModelRevision(User, sequelize)
const productRevision = new ModelRevision(Product, sequelize)
const orderRevision = new ModelRevision(Order, sequelize)

userRevision.pop()

export { User, Product, Order }
export { userRevision , productRevision , orderRevision }