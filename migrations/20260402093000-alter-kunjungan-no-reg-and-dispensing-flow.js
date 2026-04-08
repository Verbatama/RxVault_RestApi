"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Ubah no_registrasi ke STRING agar format alfanumerik (mis. REG-001) bisa disimpan.
    await queryInterface.changeColumn("Kunjungans", "no_registrasi", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Penanda apakah item dispensing sudah benar-benar keluar dari stok.
    await queryInterface.addColumn("Dispensings", "is_stok_keluar", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    // Pastikan satu detail resep hanya punya satu record dispensing aktif.
    await queryInterface.addIndex("Dispensings", ["detail_resep_id"], {
      name: "uniq_dispensing_detail_resep",
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    const dispensingTable = await queryInterface.describeTable("Dispensings");
    if (dispensingTable.is_stok_keluar) {
      // Hapus kolom tambahan saat rollback.
      await queryInterface.removeColumn("Dispensings", "is_stok_keluar");
    }

    // Bersihkan no_registrasi agar hanya angka sebelum dikembalikan ke INTEGER.
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
