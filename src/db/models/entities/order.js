"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderAuditDefine = exports.OrderAuditAttrs = exports.OrderDefine = exports.OrderAttrs = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const OrderAttrs = {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    totalPrice: sequelize_1.DataTypes.DECIMAL,
    isFinish: sequelize_1.DataTypes.BOOLEAN,
    UserId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'User', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
};
exports.OrderAttrs = OrderAttrs;
const OrderAuditAttrs = Object.assign({}, OrderAttrs);
exports.OrderAuditAttrs = OrderAuditAttrs;
OrderAuditAttrs.action = { type: sequelize_1.DataTypes.STRING };
OrderAuditAttrs.date = { type: sequelize_1.DataTypes.DATE };
OrderAuditAttrs.OrderId = {
    type: sequelize_1.DataTypes.INTEGER,
    references: { model: 'Order', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
};
const OrderDefine = (sequelize) => sequelize.define('Order', OrderAttrs, { timestamps: false, tableName: 'Order' });
exports.OrderDefine = OrderDefine;
const OrderAuditDefine = (sequlize) => sequlize.define('OrderAudit', OrderAuditAttrs, { timestamps: false, tableName: 'OrderAudit' });
exports.OrderAuditDefine = OrderAuditDefine;
