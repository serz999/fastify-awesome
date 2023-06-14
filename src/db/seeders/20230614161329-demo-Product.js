'use strict';

const utils = require('../utils')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product', utils.generateObjects(200, () => {
      return {
        name: utils.randomStirng(20),
        price: utils.randomInt(1000, 100000)
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Product', null, {});
  }
};
