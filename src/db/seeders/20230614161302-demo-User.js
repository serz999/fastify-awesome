'use strict';

const utils = require('../utils')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
   await queryInterface.bulkInsert('User', utils.generateObjects(100, () => {
    return {
        email: utils.randomStirng(11) + '@some.site',
        phoneNumber: '+0(000)000-00-00',
        firstName: utils.randomStirng(10),
        secondName: utils.randomStirng(10),
        age: utils.randomInt(11, 55), 
      }
    })
   )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {})
  }
};
