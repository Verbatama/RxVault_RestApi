"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dokter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dokter.belongsTo(models.Spesialis, {
        foreignKey: "spesialis_id",
        as: "spesialis",
      });

      Dokter.hasMany(models.Resep, {
        foreignKey: "dokter_id",
        as: "reseps",
      });
    }
  }
  Dokter.init(
    {
      nama_dokter: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spesialis_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Dokter",
    },
  );
  return Dokter;
};
