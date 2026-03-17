"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dispensing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dispensing.belongsTo(models.StatusDispensing, {
        foreignKey: "status_id",
        as: "status",
      });

      Dispensing.belongsTo(models.Apoteker, {
        foreignKey: "apoteker_id",
        as: "apoteker",
      });

      Dispensing.belongsTo(models.Resep, {
        foreignKey: "resep_id",
        as: "resep",
      });
    }
  }
  Dispensing.init(
    {
      resep_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      apoteker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Dispensing",
    },
  );
  return Dispensing;
};
