'use strict';

const { hashPassword } = require('../helpers')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    FloorId: DataTypes.INTEGER,
    role: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate (user) {
        user.role = 'user'
        user.password = hashPassword(user.password)
      },
      beforeUpdate (user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.belongsToMany(models.Room, {through: models.UserRoom})
    User.belongsTo(models.Floor)
  };

  return User;
};
