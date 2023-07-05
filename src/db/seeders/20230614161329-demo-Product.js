'use strict';

const utils = require('../utils/seedUtils')
const { faker } = require('@faker-js/faker')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product', utils.generateObjects(200, () => {
      return {
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        price: faker.commerce.price() 
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Product', null, {});
  }
};
