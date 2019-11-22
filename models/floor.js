'use strict';
module.exports = (sequelize, DataTypes) => {
  class Floor extends sequelize.Sequelize.Model {}

  Floor.init({
    name: DataTypes.STRING
  }, { sequelize });

  Floor.associate = function(models) {
    Floor.hasMany(models.User)
    Floor.hasMany(models.Room)
  };

  return Floor;
};
