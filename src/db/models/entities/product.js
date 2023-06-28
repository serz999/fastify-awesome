"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAuditDefine = exports.ProductAuditAttrs = exports.ProductDefine = exports.ProductAttrs = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const ProductAttrs = {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: sequelize_1.DataTypes.STRING,
    price: sequelize_1.DataTypes.DECIMAL,
};
exports.ProductAttrs = ProductAttrs;
const ProductAuditAttrs = Object.assign({}, ProductAttrs);
exports.ProductAuditAttrs = ProductAuditAttrs;
ProductAuditAttrs.action = { type: sequelize_1.DataTypes.STRING };
ProductAuditAttrs.date = { type: sequelize_1.DataTypes.DATE };
ProductAuditAttrs.ProductId = {
    type: sequelize_1.DataTypes.INTEGER,
    references: { model: 'Product', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
};
const ProductDefine = (sequelize) => sequelize.define('Product', ProductAttrs, { timestamps: false, tableName: 'Product' });
exports.ProductDefine = ProductDefine;
const ProductAuditDefine = (sequlize) => sequlize.define('ProductAudit', ProductAuditAttrs, { timestamps: false, tableName: 'ProductAudit' });
exports.ProductAuditDefine = ProductAuditDefine;
