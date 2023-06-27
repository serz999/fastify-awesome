'use strict';

const utils = require('../utils')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
   await queryInterface.bulkInsert('User', utils.generateObjects(100, () => {
    return {
        user_email: utils.randomStirng(11) + '@some.site',
        user_phoneNumber: '+0(000)000-00-00',
        user_firstName: utils.randomStirng(10),
        user_secondName: utils.randomStirng(10),
        user_age: utils.randomInt(11, 55),
        user_name: utils.randomStirng(10),
        user_password: utils.randomStirng(8) 
      }
    })
   )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {})
  }
};
