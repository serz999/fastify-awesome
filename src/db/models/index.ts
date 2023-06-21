import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { OrderDefine, OrderAttrs, OrderAuditAttrs } from './entities/order'
import { UserDefine, UserAttrs } from './entities/user'
import { ProductDefine, ProductAttrs } from './entities/product'
import { Audit } from './audit'


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
const userAudit = new Audit(User, sequelize)
const productAudit = new Audit(Product, sequelize)
const orderAudit = new Audit(Order, sequelize)


export { User, Product, Order }
export { userAudit, productAudit, orderAudit }