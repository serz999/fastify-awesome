import 'dotenv/config'
import { Sequelize, DataTypes, ModelCtor } from 'sequelize'


const URI: string = process.env['DB_URI']!
const sequelize = new Sequelize(URI)

const User = sequelize.define(
    'User',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
        email: { type: DataTypes.STRING, unique: true },
        phoneNumber: DataTypes.STRING,
        firstName: DataTypes.STRING,
        secondName: DataTypes.STRING,
        age: DataTypes.INTEGER
    },
    { timestamps: false, tableName: 'User' }
)

const Product = sequelize.define(
    'Product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL
    },
    { timestamps: false, tableName: 'Product' }
)

const Order = sequelize.define(
    'Order',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
        totalPrice: DataTypes.DECIMAL,
        isFinish: DataTypes.BOOLEAN
    },
    { timestamps: false, tableName: 'Order' }
)

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, { through: 'Order_Product' })
Product.belongsToMany(Order, { through: 'Order_Product' })

export { User, Product, Order }