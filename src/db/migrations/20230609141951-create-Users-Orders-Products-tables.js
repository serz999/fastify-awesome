'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('User', {
          id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
          email: { type: DataTypes.STRING, unique: true },
          phoneNumber: DataTypes.STRING,
          firstName: DataTypes.STRING,
          secondName: DataTypes.STRING,
          age: DataTypes.INTEGER
        }, { transaction: t }
      )
      await queryInterface.createTable('Product', {
          id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
          name: DataTypes.STRING,
          price: DataTypes.DECIMAL,
        }, { transaction: t }
      )
      await queryInterface.createTable('Order', {
          id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
          totalPrice: DataTypes.DECIMAL,
          isFinish: DataTypes.BOOLEAN,
          UserId: {
            type: DataTypes.INTEGER,
            references: { model: 'User', key: 'id'},
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'
          }
        }, { transaction: t }
      )
      await queryInterface.createTable('Order_Product', {
          OrderId: {
            type: DataTypes.INTEGER,
            references: { model: 'Order', key: 'id' },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'
          },
          ProductId: {
            type: DataTypes.INTEGER,
            references: { model: 'Product', key: 'id' },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'
          }
        }, { transaction: t }
      )
      await t.commit()
    } catch (err) {
      await transaction.rollback()
      throw err;
    } 
  },

  async down(queryInterface, Sequelize) {
    try {
      const t = await queryInterface.sequelize.transaction()
      await queryInterface.dropTable('User', { cascade: true , transaction: t})
      await queryInterface.dropTable('Product', { cascade: true, transaction: t })
      await queryInterface.dropTable('Order', { cascade: true, transaction: t })
      await queryInterface.dropTable('Order_Product', { cascade: true, transaction: t })
      await t.commit()
    } catch (err) {
      await t.rollback()
      throw err;
    }
  }
};
