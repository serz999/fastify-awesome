import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { OrderDefine, OrderAttrs, OrderAuditAttrs, OrderAuditDefine } from './order'
import { UserDefine, UserAttrs, UserAuditAttrs, UserAuditDefine} from './user'
import { ProductDefine, ProductAttrs, ProductAuditAttrs, ProductAuditDefine } from './product'


const URI: string = process.env['DB_URI']!
const sequelize = new Sequelize(URI)

const User = UserDefine(sequelize)
const Product = ProductDefine(sequelize)
const Order = OrderDefine(sequelize)

const UserAudit = UserAuditDefine(sequelize)
const ProductAudit = ProductAuditDefine(sequelize)
const OrderAudit = OrderAuditDefine(sequelize)

// Models relations
User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, { through: 'Order_Product' })
Product.belongsToMany(Order, { through: 'Order_Product' })

// Audit
User.hasMany(UserAudit)
UserAudit.belongsTo(User)

User.afterCreate(async (user: any) => {
    const userData = await User.findByPk(user.id)
    if (userData) {
        const AuditData = { ...userData.dataValues }
        delete AuditData.id
        AuditData.date = Date.now()
        AuditData.action = 'create' 
        AuditData.UserId = user.id
        await UserAudit.create(AuditData)
    }
})

User.beforeUpdate(async (user: any) => {
    const prevUserData = await User.findByPk(user.id)
    if (prevUserData) {
        const AuditData = { ...prevUserData.dataValues }
        delete AuditData.id
        AuditData.date = Date.now()
        AuditData.action = 'update' 
        AuditData.UserId = user.id
        await UserAudit.create(AuditData)
    }
})

User.beforeDestroy(async (user: any) => {
    const userData = await User.findByPk(user.id)
    if (userData) {
        const AuditData = { ...userData.dataValues }
        delete AuditData.id
        AuditData.date = Date.now()
        AuditData.action = 'delete' 
        AuditData.UserId = user.id
        await UserAudit.create(AuditData)
    }
})

Product.hasMany(ProductAudit)
ProductAudit.belongsTo(Product)

Order.hasMany(OrderAudit)
OrderAudit.belongsTo(Order)


export { OrderAttrs, UserAttrs, ProductAttrs }
export { User, Product, Order }
export { OrderAuditAttrs, UserAuditAttrs, ProductAuditAttrs }
export { UserAudit, ProductAudit, OrderAudit}
