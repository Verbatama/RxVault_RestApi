"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MutasiStok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MutasiStok.belongsTo(models.Obat, {
        foreignKey: "obat_id",
        as: "obat",
      });

      MutasiStok.belongsTo(models.Lokasi, {
        foreignKey: "dari_lokasi_id",
        as: "dariLokasi",
      });

      MutasiStok.belongsTo(models.Lokasi, {
        foreignKey: "ke_lokasi_id",
        as: "keLokasi",
      });

      MutasiStok.belongsTo(models.JenisMutasi, {
        foreignKey: "jenis_mutasi_id",
        as: "jenisMutasi",
      });
    }
  }
  MutasiStok.init(
    {
      obat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dari_lokasi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ke_lokasi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jumlah_obat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nomor_batch: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      tanggal_mutasi: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      jenis_mutasi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "MutasiStok",
    },
  );
  return MutasiStok;
};
