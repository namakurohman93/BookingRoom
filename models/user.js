'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {

  }

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    FloorId: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {sequelize});
  User.associate = function(models) {
    User.belongsToMany(models.Room, {through: models.RoomUser})
    User.belongsTo(models.Floor)
  };
  return User;
};