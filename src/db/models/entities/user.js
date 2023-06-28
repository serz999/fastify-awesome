"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDefine = exports.UserAttrs = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const UserAttrs = {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_email: { type: sequelize_1.DataTypes.STRING, unique: true },
    user_phoneNumber: sequelize_1.DataTypes.STRING,
    user_firstName: sequelize_1.DataTypes.STRING,
    user_secondName: sequelize_1.DataTypes.STRING,
    user_age: sequelize_1.DataTypes.INTEGER,
    user_name: sequelize_1.DataTypes.STRING,
    user_password: sequelize_1.DataTypes.STRING
};
exports.UserAttrs = UserAttrs;
const UserDefine = (sequelize) => sequelize.define('User', UserAttrs, { timestamps: false, tableName: 'User' });
exports.UserDefine = UserDefine;
