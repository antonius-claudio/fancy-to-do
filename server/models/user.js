'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {

  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required!"
        },
        notNull: {
          msg: "Email is required!"
        },
        isEmail: {
          msg: "Must Email format!"
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required!"
        },
        notNull: {
          msg: "Password is required!"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(model, optional){
        //hash password
        model.password = hashPassword(model.password);
      }
    }
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  return User;
};