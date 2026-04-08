"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambah relasi lokasi pada stok agar stok bisa dipisah per Gudang/Apotek.
    await queryInterface.addColumn("Stoks", "lokasi_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Lokasis",
        key: "id",
      },
    });

    const [lokasiRows] = await queryInterface.sequelize.query(
      "SELECT id, nama_lokasi FROM Lokasis;",
    );

    const gudang = (lokasiRows || []).find(
      (row) => String(row.nama_lokasi || "").toLowerCase() === "gudang",
    );

    if (gudang) {
      // Backfill data lama: defaultkan stok tanpa lokasi ke Gudang.
      await queryInterface.sequelize.query(
        `UPDATE Stoks SET lokasi_id = ${Number(gudang.id)} WHERE lokasi_id IS NULL;`,
      );
    }

    // Setelah data lama terisi, ubah menjadi wajib isi.
    await queryInterface.changeColumn("Stoks", "lokasi_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Lokasis",
        key: "id",
      },
    });

    // Cegah duplikasi batch yang sama pada produk dan lokasi yang sama.
    await queryInterface.addIndex("Stoks", ["produk_obat_id", "lokasi_id", "nomor_batch"], {
      name: "uniq_stok_produk_lokasi_batch",
      unique: true,
    });

    // Index bantu filter stok berdasarkan lokasi.
    await queryInterface.addIndex("Stoks", ["lokasi_id"], {
      name: "idx_stok_lokasi",
    });
  },

  async down(queryInterface) {
    const stokTable = await queryInterface.describeTable("Stoks");
    if (stokTable.lokasi_id) {
      try {
        // Rollback aman: hapus kolom hanya jika memang ada.
        await queryInterface.removeColumn("Stoks", "lokasi_id");
      } catch (error) {
        if (!String(error.message || error).includes("doesn't exist")) {
          throw error;
        }
      }
    }
  },
};
