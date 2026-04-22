"use strict";

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    const now = new Date();
    const noRekamMedis = "RM-SEED-2026-0002";
    const noRegistrasi = "REG-SEED-003";
    const kodeRegistrasi = "KODE-SEED-003";

    try {
      const [[pasienExisting]] = await queryInterface.sequelize.query(
        "SELECT id FROM Pasiens WHERE no_rekam_medis = :noRekamMedis LIMIT 1",
        {
          replacements: { noRekamMedis },
          transaction,
        },
      );

      let pasienId = pasienExisting ? Number(pasienExisting.id) : null;
      if (!pasienId) {
        await queryInterface.bulkInsert(
          "Pasiens",
          [
            {
              nama_pasien: "Rina Permata",
              umur: 29,
              jenis_kelamin: "Perempuan",
              alamat: "Jl. Melati No. 12, Jakarta",
              tanggal_lahir: new Date("1997-09-20"),
              no_rekam_medis: noRekamMedis,
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction },
        );

        const [[pasienInserted]] = await queryInterface.sequelize.query(
          "SELECT id FROM Pasiens WHERE no_rekam_medis = :noRekamMedis LIMIT 1",
          {
            replacements: { noRekamMedis },
            transaction,
          },
        );
        pasienId = pasienInserted ? Number(pasienInserted.id) : null;
      }

      if (!pasienId) {
        throw new Error("Gagal mendapatkan ID pasien seeder");
      }

      const [[poliRow]] = await queryInterface.sequelize.query(
        "SELECT id FROM Polis ORDER BY id ASC LIMIT 1",
        { transaction },
      );
      if (!poliRow) {
        throw new Error("Data Poli belum tersedia");
      }

      const [[dokterRow]] = await queryInterface.sequelize.query(
        "SELECT id FROM Dokters ORDER BY id ASC LIMIT 1",
        { transaction },
      );
      if (!dokterRow) {
        throw new Error("Data Dokter belum tersedia");
      }

      const [[kunjunganExisting]] = await queryInterface.sequelize.query(
        "SELECT id FROM Kunjungans WHERE no_registrasi = :noRegistrasi LIMIT 1",
        {
          replacements: { noRegistrasi },
          transaction,
        },
      );

      let kunjunganId = kunjunganExisting ? Number(kunjunganExisting.id) : null;
      if (!kunjunganId) {
        await queryInterface.bulkInsert(
          "Kunjungans",
          [
            {
              pasien_id: pasienId,
              poli_id: Number(poliRow.id),
              tanggal_kunjungan: now,
              no_registrasi: noRegistrasi,
              kode_registrasi: kodeRegistrasi,
              no_antrian: 3,
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction },
        );

        const [[kunjunganInserted]] = await queryInterface.sequelize.query(
          "SELECT id FROM Kunjungans WHERE no_registrasi = :noRegistrasi LIMIT 1",
          {
            replacements: { noRegistrasi },
            transaction,
          },
        );
        kunjunganId = kunjunganInserted ? Number(kunjunganInserted.id) : null;
      }

      if (!kunjunganId) {
        throw new Error("Gagal mendapatkan ID kunjungan seeder");
      }

      const [[resepExisting]] = await queryInterface.sequelize.query(
        "SELECT id FROM Reseps WHERE kunjungan_id = :kunjunganId LIMIT 1",
        {
          replacements: { kunjunganId },
          transaction,
        },
      );

      let resepId = resepExisting ? Number(resepExisting.id) : null;
      if (!resepId) {
        await queryInterface.bulkInsert(
          "Reseps",
          [
            {
              dokter_id: Number(dokterRow.id),
              kunjungan_id: kunjunganId,
              tanggal: now,
              createdAt: now,
              updatedAt: now,
            },
          ],
          { transaction },
        );

        const [[resepInserted]] = await queryInterface.sequelize.query(
          "SELECT id FROM Reseps WHERE kunjungan_id = :kunjunganId LIMIT 1",
          {
            replacements: { kunjunganId },
            transaction,
          },
        );
        resepId = resepInserted ? Number(resepInserted.id) : null;
      }

      if (!resepId) {
        throw new Error("Gagal mendapatkan ID resep seeder");
      }

      const obatSeed = [
        {
          namaObat: "Paracetamol",
          jumlah: 10,
          aturanPakai: "3x sehari 1 tablet sesudah makan",
        },
        {
          namaObat: "Ibuprofen",
          jumlah: 6,
          aturanPakai: "2x sehari 1 tablet bila nyeri",
        },
        {
          namaObat: "Amoxicillin",
          jumlah: 12,
          aturanPakai: "3x sehari 1 kapsul sampai habis",
        },
      ];

      for (const item of obatSeed) {
        const [[obatRow]] = await queryInterface.sequelize.query(
          "SELECT id FROM Obats WHERE LOWER(nama_obat) = LOWER(:namaObat) LIMIT 1",
          {
            replacements: { namaObat: item.namaObat },
            transaction,
          },
        );

        if (!obatRow) {
          throw new Error(`Obat ${item.namaObat} tidak ditemukan untuk detail resep`);
        }

        const obatId = Number(obatRow.id);

        const [[detailExisting]] = await queryInterface.sequelize.query(
          "SELECT id FROM DetailReseps WHERE resep_id = :resepId AND obat_id = :obatId LIMIT 1",
          {
            replacements: { resepId, obatId },
            transaction,
          },
        );

        if (!detailExisting) {
          await queryInterface.bulkInsert(
            "DetailReseps",
            [
              {
                resep_id: resepId,
                obat_id: obatId,
                jumlah: Number(item.jumlah),
                aturan_pakai: item.aturanPakai,
                createdAt: now,
                updatedAt: now,
              },
            ],
            { transaction },
          );
        }
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    const noRekamMedis = "RM-SEED-2026-0002";
    const noRegistrasi = "REG-SEED-003";

    try {
      const [[pasienRow]] = await queryInterface.sequelize.query(
        "SELECT id FROM Pasiens WHERE no_rekam_medis = :noRekamMedis LIMIT 1",
        {
          replacements: { noRekamMedis },
          transaction,
        },
      );

      const [[kunjunganRow]] = await queryInterface.sequelize.query(
        "SELECT id FROM Kunjungans WHERE no_registrasi = :noRegistrasi LIMIT 1",
        {
          replacements: { noRegistrasi },
          transaction,
        },
      );

      if (kunjunganRow) {
        const [resepRows] = await queryInterface.sequelize.query(
          "SELECT id FROM Reseps WHERE kunjungan_id = :kunjunganId",
          {
            replacements: { kunjunganId: Number(kunjunganRow.id) },
            transaction,
          },
        );

        const resepIds = (resepRows || []).map((row) => Number(row.id));

        if (resepIds.length > 0) {
          await queryInterface.bulkDelete(
            "DetailReseps",
            {
              resep_id: resepIds,
            },
            { transaction },
          );

          await queryInterface.bulkDelete(
            "Reseps",
            {
              id: resepIds,
            },
            { transaction },
          );
        }

        await queryInterface.bulkDelete(
          "Kunjungans",
          {
            id: Number(kunjunganRow.id),
          },
          { transaction },
        );
      }

      if (pasienRow) {
        await queryInterface.bulkDelete(
          "Pasiens",
          {
            id: Number(pasienRow.id),
          },
          { transaction },
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
