import 'dotenv/config'
import { Sequelize, DataTypes} from 'sequelize'


const ProductAttrs: { [key: string]: any } = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
}

const ProductDefine = (sequelize: Sequelize) => sequelize.define(
    'Product',
    ProductAttrs,
    { timestamps: false, tableName: 'Product' }
)

const ProductAuditAttrs = { ...ProductAttrs }
ProductAuditAttrs.action = { type: DataTypes.STRING }
ProductAuditAttrs.date = { type: DataTypes.DATE }
ProductAuditAttrs.ProductId = {
    type: DataTypes.INTEGER,
    references: { model: 'Product', key: 'id'},
    onDelete: 'CASCADE', 
    onUpdate: 'CASCADE'
}

const ProductAuditDefine = (sequlize: Sequelize) => sequlize.define(
    'ProductAudit',
    ProductAuditAttrs,
    { timestamps: false, tableName: 'ProductAudit' }
)

export { ProductAttrs, ProductDefine, ProductAuditAttrs, ProductAuditDefine }