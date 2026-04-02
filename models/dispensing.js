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
        foreignKey: "status_dispensing_id",
        as: "status",
      });

      Dispensing.belongsTo(models.Apoteker, {
        foreignKey: "apoteker_id",
        as: "apoteker",
      });
      Dispensing.belongsTo(models.DetailResep, {
        foreignKey: "detail_resep_id",
        as: "detailResep"
      })
    }
  }
  Dispensing.init(
    {
      detail_resep_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      apoteker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dispensingAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status_dispensing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_stok_keluar: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Dispensing",
    },
  );
  return Dispensing;
};
