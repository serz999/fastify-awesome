'use strict';

const utils = require('../utils/seedUtils')
const { faker } = require('@faker-js/faker')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
   await queryInterface.bulkInsert('User', utils.generateObjects(100, () => {
    return {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        firstName: faker.person.firstName(),
        secondName: faker.person.lastName(),
        age: faker.number.int({min: 10, max: 70})
      }
    })
   )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {})
  }
};
