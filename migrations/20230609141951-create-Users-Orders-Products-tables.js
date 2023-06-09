'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      id: {type: DataTypes.STRING, primaryKey: true},
      email: {type: DataTypes.STRING, unique: true},
      phoneNumber: DataTypes.STRING,
      firstName: DataTypes.STRING,
      secondName: DataTypes.STRING,
      age: DataTypes.INTEGER
    })
    queryInterface.createTable('Products', {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL
    })
    queryInterface.createTable('Orders', {
      totalPrice: DataTypes.DECIMAL,
      isFinish: DataTypes.BOOLEAN,
      userId: { type: DataTypes.INTEGER, allowNull: false }
    })
    queryInterface.createTable('OrderProducts', {
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('Users')
    queryInterface.dropTable('Products')
    queryInterface.dropTable('Orders')
    queryInterface.dropTable('Orders')
  }
};
