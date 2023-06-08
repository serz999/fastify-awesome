import 'dotenv/config'
import { Sequelize, DataTypes } from 'sequelize'


const URI: string = process.env['DB_URI']!
const sequelize = new Sequelize(URI)

const Book = sequelize.define(
    'Book',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        page_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }
)

const generate10Items = async () => {
    for (let i = 1; i < 11; i++) {
        await Book.create({
            name: `book #${i}`,
            page_count: Math.round(Math.random() * 200)
        })
    }
}

const getItems = async () => {
    const item = await Book.findOne()
    console.log(item?.dataValues.name)
}

const syncDB =  async () => {
    await sequelize.sync({ alter: true })
}

getItems()