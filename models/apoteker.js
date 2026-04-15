"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Apoteker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Apoteker.hasMany(models.Dispensing, {
        foreignKey: "apoteker_id",
        as: "dispensing",
      });
    }
  }
  Apoteker.init(
    {
      nama_apoteker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Apoteker",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
      hooks: {
        beforeCreate: async (apoteker) => {
          if (apoteker.password) {
            apoteker.password = await bcrypt.hash(apoteker.password, 10);
          }
        },
        beforeUpdate: async (apoteker) => {
          if (apoteker.changed("password")) {
            apoteker.password = await bcrypt.hash(apoteker.password, 10);
          }
        },
      },
    },
  );
  return Apoteker;
};
