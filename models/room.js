'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Room extends Model {
    
  }

  Room.init({
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    FloorId: DataTypes.INTEGER
  }, {sequelize});
  Room.associate = function(models) {
    Room.belongsToMany(models.User, {through: models.RoomUser})
    Room.belongsTo(models.Floor)
  };
  return Room;
};