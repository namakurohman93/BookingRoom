'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class RoomUser extends Model {

  }

  RoomUser.init({
    UserId: DataTypes.INTEGER,
    FloorId: DataTypes.INTEGER,
    booking_date: DataTypes.DATE,
    booking_start: DataTypes.DATE,
    booking_end: DataTypes.DATE,
    participant: DataTypes.INTEGER
  }, {sequelize});
  RoomUser.associate = function(models) {
    // associations can be defined here
  };
  return RoomUser;
};