"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Kunjungans", "no_registrasi", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Dispensings", "is_stok_keluar", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addIndex("Dispensings", ["detail_resep_id"], {
      name: "uniq_dispensing_detail_resep",
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    const dispensingTable = await queryInterface.describeTable("Dispensings");
    if (dispensingTable.is_stok_keluar) {
      await queryInterface.removeColumn("Dispensings", "is_stok_keluar");
    }

    await queryInterface.sequelize.query(`
      UPDATE Kunjungans
      SET no_registrasi = CASE
        WHEN no_registrasi REGEXP '[0-9]+' THEN REGEXP_REPLACE(no_registrasi, '[^0-9]', '')
        ELSE '0'
      END
    `);

    await queryInterface.changeColumn("Kunjungans", "no_registrasi", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
