'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: '$2b$10$cEFAx23Z.oxTQc4aAgxeV.6YYFybUjvEnbzpFSyodU.qOT75aXdKq',
        email: 'admin@email.com',
        FloorId: 99,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
