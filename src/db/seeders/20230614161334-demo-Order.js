'use strict';

const { randomInt } = require('crypto');
const utils = require('../utils')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Order', utils.generateObjects(50, () => {
      return {
        totalPrice: 0,
        isFinish: false,
        UserId: utils.randomInt(1, 99)
      }
    }))
    await queryInterface.bulkInsert('Order_Product', utils.generateObjects(50 * 5, () => {
      return {
        OrderId: randomInt(1, 49),
        ProductId: randomInt(1, 199)
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Order', null, {})
  }
};
