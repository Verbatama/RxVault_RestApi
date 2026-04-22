"use strict";

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    const now = new Date();
    const namaObat = "Candesartan Seed 2026";
    const namaSupplier = "Supplier Seed Pengadaan 2026";
    const brandProduk = "Candesartan Farma Seed";
    const kodeBpom = "BPOM-PGD-2026-0001";
    const nomorBatch = "PGD-2026-0423-A";
    const stokMasuk = 15;

    try {
      const [[lokasiGudang]] = await queryInterface.sequelize.query(
        "SELECT id FROM Lokasis WHERE LOWER(nama_lokasi) = 'gudang' LIMIT 1",
        { transaction },
      );

      if (!lokasiGudang) {
        throw new Error("Lokasi Gudang tidak ditemukan");
      }

      const [[golonganObat]] = await queryInterface.sequelize.query(
        "SELECT id FROM GolonganObats ORDER BY id ASC LIMIT 1",
        { transaction },
      );

      if (!golonganObat) {
        throw new Error("Data GolonganObat tidak tersedia");
      }

      const [[bentukTablet]] = await queryInterface.sequelize.query(
        "SELECT id FROM BentukObats WHERE LOWER(nama_bentuk_obat) = 'tablet' LIMIT 1",
        { transaction },
      );

      const bentukObatId = bentukTablet ? Number(bentukTablet.id) : null;
      if (!bentukObatId) {
        throw new Error("Bentuk obat Tablet tidak ditemukan");
      }

      const [[satuanMg]] = await queryInterface.sequelize.query(
        "SELECT id, nama_satuan_dosis FROM SatuanDosis WHERE bentuk_obat_id = :bentukObatId AND LOWER(nama_satuan_dosis) = 'mg' LIMIT 1",
        {
          replacements: { bentukObatId },
          transaction,
        },
      );

      const [[satuanFallback]] = await queryInterface.sequelize.query(
        "SELECT id, nama_satuan_dosis FROM SatuanDosis WHERE bentuk_obat_id = :bentukObatId ORDER BY id ASC LIMIT 1",
        {
          replacements: { bentukObatId },
          transaction,
        },
      );

      const satuanDosis = satuanMg || satuanFallback;
      if (!satuanDosis) {
        throw new Error("Satuan dosis untuk bentuk obat Tablet tidak ditemukan");
      }

      const [[supplierExisting]] = await queryInterface.sequelize.query(
        "SELECT id FROM Suppliers WHERE nama_supplier = :namaSupplier LIMIT 1",
        {
          replacements: { namaSupplier },
          transaction,
        },
      );

      let supplierId = supplierExisting ? Number(supplierExisting.id) : null;
      if (!supplierId) {
        await queryInterface.bulkInsert(
          "Suppliers",
          [
            {
              nama_supplier: namaSupplier,
              kontak: "021-55502026",
              alamat: "Jl. Contoh Pengadaan No. 26",
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction },
        );

        const [[supplierInserted]] = await queryInterface.sequelize.query(
          "SELECT id FROM Suppliers WHERE nama_supplier = :namaSupplier LIMIT 1",
          {
            replacements: { namaSupplier },
            transaction,
          },
        );
        supplierId = supplierInserted ? Number(supplierInserted.id) : null;
      }

      if (!supplierId) {
        throw new Error("Gagal mendapatkan ID supplier pengadaan");
      }

      const [[obatExisting]] = await queryInterface.sequelize.query(
        "SELECT id FROM Obats WHERE nama_obat = :namaObat LIMIT 1",
        {
          replacements: { namaObat },
          transaction,
        },
      );

      let obatId = obatExisting ? Number(obatExisting.id) : null;
      if (!obatId) {
        await queryInterface.bulkInsert(
          "Obats",
          [
            {
              nama_obat: namaObat,
              golongan_obat_id: Number(golonganObat.id),
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction },
        );

        const [[obatInserted]] = await queryInterface.sequelize.query(
          "SELECT id FROM Obats WHERE nama_obat = :namaObat LIMIT 1",
          {
            replacements: { namaObat },
            transaction,
          },
        );
        obatId = obatInserted ? Number(obatInserted.id) : null;
      }

      if (!obatId) {
        throw new Error("Gagal mendapatkan ID obat untuk pengadaan");
      }

      const [[produkExisting]] = await queryInterface.sequelize.query(
        "SELECT id FROM ProdukObats WHERE bpom = :kodeBpom LIMIT 1",
        {
          replacements: { kodeBpom },
          transaction,
        },
      );

      let produkObatId = produkExisting ? Number(produkExisting.id) : null;
      if (!produkObatId) {
        await queryInterface.bulkInsert(
          "ProdukObats",
          [
            {
              obat_id: obatId,
              brand: brandProduk,
              bentuk_obat_id: bentukObatId,
              dosis: 8,
              satuan_dosis: String(satuanDosis.nama_satuan_dosis || "mg"),
              satuan_dosis_id: Number(satuanDosis.id),
              bpom: kodeBpom,
              min_stok_gudang: 40,
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction },
        );

        const [[produkInserted]] = await queryInterface.sequelize.query(
          "SELECT id FROM ProdukObats WHERE bpom = :kodeBpom LIMIT 1",
          {
            replacements: { kodeBpom },
            transaction,
          },
        );
        produkObatId = produkInserted ? Number(produkInserted.id) : null;
      }

      if (!produkObatId) {
        throw new Error("Gagal mendapatkan ID produk obat pengadaan");
      }

      const [[stokExisting]] = await queryInterface.sequelize.query(
        "SELECT id FROM Stoks WHERE produk_obat_id = :produkObatId AND lokasi_id = :lokasiGudangId AND nomor_batch = :nomorBatch LIMIT 1",
        {
          replacements: {
            produkObatId,
            lokasiGudangId: Number(lokasiGudang.id),
            nomorBatch,
          },
          transaction,
        },
      );

      if (!stokExisting) {
        await queryInterface.bulkInsert(
          "Stoks",
          [
            {
              produk_obat_id: produkObatId,
              lokasi_id: Number(lokasiGudang.id),
              nomor_batch: nomorBatch,
              jumlah_obat: stokMasuk,
              expired_date: new Date("2027-12-31"),
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction },
        );
      }

      const [[jenisPenerimaan]] = await queryInterface.sequelize.query(
        "SELECT id FROM JenisMutasis WHERE LOWER(nama_jenis_mutasi) = 'penerimaan' LIMIT 1",
        { transaction },
      );

      const jenisMutasiId = jenisPenerimaan ? Number(jenisPenerimaan.id) : 1;

      await queryInterface.bulkInsert(
        "MutasiStoks",
        [
          {
            obat_id: obatId,
            dari_lokasi_id: Number(lokasiGudang.id),
            ke_lokasi_id: Number(lokasiGudang.id),
            jumlah_obat: stokMasuk,
            nomor_batch: nomorBatch,
            tanggal_mutasi: now,
            jenis_mutasi_id: jenisMutasiId,
            supplier_id: supplierId,
            createdAt: now,
            updatedAt: now,
          },
        ],
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    const namaObat = "Candesartan Seed 2026";
    const namaSupplier = "Supplier Seed Pengadaan 2026";
    const kodeBpom = "BPOM-PGD-2026-0001";
    const nomorBatch = "PGD-2026-0423-A";

    try {
      const [[produk]] = await queryInterface.sequelize.query(
        "SELECT id, obat_id FROM ProdukObats WHERE bpom = :kodeBpom LIMIT 1",
        {
          replacements: { kodeBpom },
          transaction,
        },
      );

      if (produk) {
        await queryInterface.bulkDelete(
          "MutasiStoks",
          {
            obat_id: Number(produk.obat_id),
            nomor_batch: nomorBatch,
          },
          { transaction },
        );

        await queryInterface.bulkDelete(
          "Stoks",
          {
            produk_obat_id: Number(produk.id),
            nomor_batch: nomorBatch,
          },
          { transaction },
        );

        await queryInterface.bulkDelete(
          "ProdukObats",
          {
            id: Number(produk.id),
          },
          { transaction },
        );
      }

      await queryInterface.bulkDelete(
        "Obats",
        {
          nama_obat: namaObat,
        },
        { transaction },
      );

      await queryInterface.bulkDelete(
        "Suppliers",
        {
          nama_supplier: namaSupplier,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
