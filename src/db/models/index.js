"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderAudit = exports.productAudit = exports.userAudit = exports.Order = exports.Product = exports.User = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const order_1 = require("./entities/order");
const user_1 = require("./entities/user");
const product_1 = require("./entities/product");
const audit_1 = require("./audit");
const URI = process.env['DB_URI'];
const sequelize = new sequelize_1.Sequelize(URI);
// Busines models init
const User = (0, user_1.UserDefine)(sequelize);
exports.User = User;
const Product = (0, product_1.ProductDefine)(sequelize);
exports.Product = Product;
const Order = (0, order_1.OrderDefine)(sequelize);
exports.Order = Order;
// Bind models
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: 'Order_Product' });
Product.belongsToMany(Order, { through: 'Order_Product' });
// Audit instances
const userAudit = new audit_1.Audit(User, sequelize);
exports.userAudit = userAudit;
const productAudit = new audit_1.Audit(Product, sequelize);
exports.productAudit = productAudit;
const orderAudit = new audit_1.Audit(Order, sequelize);
exports.orderAudit = orderAudit;
