'use strict';
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.models

  class Room extends sequelize.Sequelize.Model {
    // isAvailable () {
    //   let start = new Date(new Date().toDateString())
    //   let end = new Date()
    //   models.UserRoom.findAll({where: {RoomId: this.id, book_date_start: }})
    //     .then(userRooms => {
    //     })
    // }
  }

  Room.init({
    name: DataTypes.STRING,
    FloorId: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER
  }, { sequelize });

  Room.associate = function(models) {
    Room.belongsToMany(models.User, {through: models.UserRoom})
    Room.belongsTo(models.Floor)
  };

  return Room;
};
