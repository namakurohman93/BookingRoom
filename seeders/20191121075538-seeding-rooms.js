'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', [
      {
        name: 'Ruang Mawar',
        FloorId: 1,
        capacity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruang Anggrek',
        FloorId: 1,
        capacity: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruang Kamboja',
        FloorId: 1,
        capacity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruang Komodo',
        FloorId: 2,
        capacity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruang Gajah',
        FloorId: 2,
        capacity: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruang Siang Laut',
        FloorId: 2,
        capacity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruang Ketoprak',
        FloorId: 3,
        capacity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruang Tahu Gejrot',
        FloorId: 3,
        capacity: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ruang Gulai Kambing',
        FloorId: 3,
        capacity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {})
  }
};
