"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });
    }
  }
  User.init(
    {
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      sipa: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      stra: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password_confirmation: DataTypes.VIRTUAL,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
          }
        },
      },
    },
  );

  return User;
};
