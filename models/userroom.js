'use strict';

const { sendEmail } = require('../helpers')


module.exports = (sequelize, DataTypes) => {
  const models = sequelize.models

  class UserRoom extends sequelize.Sequelize.Model {}

  UserRoom.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    RoomId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    book_date_start: DataTypes.DATE,
    book_date_end: DataTypes.DATE,
    participant: DataTypes.INTEGER
  }, {
    hooks: {
      afterCreate (userRoom) {
        let promises = [
          models.User.findByPk(userRoom.UserId, {include: [models.Floor]}),
          models.Room.findByPk(userRoom.RoomId),
        ]

        Promise.all(promises)
          .then(results => {
            let email = results[0].email
            let username = results[0].username
            let floor = results[0].Floor.name
            let roomname = results[1].name
            let participant = userRoom.participant
            let startBooking = userRoom.book_date_start.toLocaleString()
            let endBooking = userRoom.book_date_end.toLocaleString()

            let message = `Hello ${username} you are booking ${roomname} at ${floor} from ${startBooking} to ${endBooking} and total participant is ${participant} participant(s)
We hope you have a great day.`

            sendEmail(email, message)
          })
      }
    },
    sequelize
  });

  UserRoom.associate = function(models) {
    UserRoom.belongsTo(models.Room)
    UserRoom.belongsTo(models.User)
  };

  return UserRoom;
};
