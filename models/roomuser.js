'use strict';
const sequelize = require('Sequelize');
const {gt} = sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class RoomUser extends Model {
    static isAvailable(roomId,bookingDate,bookingStart,bookingEnd,participant) {
      let statusAvailable = true;
      RoomUser.findAll(
        {
        where: {RoomId: roomId,
                booking_date: bookingDate,
                },
        order: [['booking_start','asc']]
        }
      )
      .then(roomUsers=>{
        for(let i=0; i<roomUsers.length; i++) {
           if(bookingStart>roomUsers[i].dataValues.booking_start && bookingStart<roomUsers[i].dataValues.booking_end) {
              statusAvailable = false;
           } else if(bookingEnd>roomUsers[i].dataValues.booking_start && bookingEnd<roomUsers[i].dataValues.booking_end) {
              statusAvailable = false;
           }
        }
        return statusAvailable;
      })
    }
  }

  RoomUser.init({
    UserId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER,
    booking_date: DataTypes.STRING,
    booking_start: DataTypes.INTEGER,
    booking_end: DataTypes.INTEGER,
    participant: DataTypes.INTEGER
  }, {sequelize});
  RoomUser.associate = function(models) {
    // associations can be defined here
  };
  return RoomUser;
};