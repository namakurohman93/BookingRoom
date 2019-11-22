'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Floors', [
      {
        name: 'Lantai 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lantai 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lantai 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Floors', null, {})
  }
};
