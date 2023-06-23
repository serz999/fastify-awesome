'use strict';

const utils = require('../utils')
const { faker } = require('@faker-js/faker')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const someUser = await models.User.findOne()

    await queryInterface.bulkInsert('Order', utils.generateObjects(50, () => {
      return {
        id: faker.string.uuid(),
        totalPrice: faker.commerce.price(),
        isFinish: false,
        UserId: someUser.id
      }
    }))

    const someOrder = await models.Order.findOne()
    const someProduct = await models.Product.findOne()

    await queryInterface.bulkInsert('Order_Product', utils.generateObjects(50 * 5, () => { 
      return {
        id: faker.string.uuid(),
        OrderId:  someOrder.id,
        ProductId: someProduct.id 
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Order', null, {})
  }
};
