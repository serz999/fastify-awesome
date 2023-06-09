import { timeStamp } from 'console'
import 'dotenv/config'
import { Sequelize, DataTypes } from 'sequelize'


const URI: string = process.env['DB_URI']!
const sequelize = new Sequelize(URI)

const User = sequelize.define(
    'User',
    {
        id: { type: DataTypes.INTEGER, }, 
        email: { type: DataTypes.STRING, unique: true },
        phoneNumber: DataTypes.STRING,
        firstName: DataTypes.STRING,
        secondName: DataTypes.STRING,
        age: DataTypes.INTEGER
    },
    { timestamps: false }
)

const Product = sequelize.define(
    'Product',
    {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL
    },
    { timestamps: false }
)

const Order = sequelize.define(
    'Order',
    {
        totalPrice: DataTypes.DECIMAL,
        isFinish: DataTypes.BOOLEAN
    },
    { timestamps: false }
)

User.hasMany(Order, { onDelete: 'CASCADE' })
Order.belongsTo(User)

Order.belongsToMany(Product, { through: 'OrderProducts' })
Product.belongsToMany(Order, { through: 'OrderProducts' })

export { User, Product, Order }