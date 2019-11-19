'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Floor extends Model {

  }

  Floor.init({
    name: DataTypes.STRING
  }, {sequelize});
  Floor.associate = function(models) {
    Floor.hasMany(models.Room);
    Floor.hasMany(model.User);
  };
  return Floor;
};