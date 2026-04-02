const respon = require("../helpers/responseHelper");
const {
  Dispensing,
  DetailResep,
  Obat,
  Resep,
  Kunjungan,
  Pasien,
  StatusDispensing,
  Stok,
  ProdukObat,
  Apoteker,
  DispensingAuditLog,
} = require("../models");
const {
  beginIdempotentRequest,
  completeIdempotentRequest,
} = require("../helpers/idempotencyHelper");

const getLokasiApotek = async () => {
  const { Lokasi } = require("../models");
  const data = await Lokasi.findAll();
  return data.find((item) => String(item.nama_lokasi || "").toLowerCase() === "apotek") || null;
};

const getStatusByName = async (name) => {
  return StatusDispensing.findOne({
    where: { nama_status: name },
  });
};

const findKunjunganByNoReg = async (no_registrasi) => {
  return Kunjungan.findOne({
    where: { no_registrasi: String(no_registrasi) },
    include: [
      {
        model: Pasien,
        as: "pasien",
      },
      {
        model: Resep,
        as: "reseps",
        include: [
          {
            model: DetailResep,
            as: "detailReseps",
            include: [
              {
                model: Obat,
                as: "obat",
              },
              {
                model: Dispensing,
                as: "dispensing",
                include: [
                  {
                    model: StatusDispensing,
                    as: "status",
                  },
                  {
                    model: Apoteker,
                    as: "apoteker",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
};

const calculateAvailableQtyByObat = async (obat_id, lokasi_id) => {
  const stokRows = await Stok.findAll({
    where: { lokasi_id },
    include: [
      {
        model: ProdukObat,
        as: "produkObat",
        where: { obat_id },
        required: true,
      },
    ],
  });

  return stokRows.reduce((acc, item) => acc + Number(item.jumlah_obat || 0), 0);
};

const getDispensing = async (req, res) => {
  try {
    const data = await Dispensing.findAll();
    return respon.success(res, "Success get all dispensing", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getDispensingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Dispensing.findByPk(id);

    if (!data) {
      return respon.notFound(res, "Dispensing not found");
    }
    return respon.success(res, "Success get dispensing by id", data);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const createDispensing = async (req, res) => {
  try {
    const newDispensing = await Dispensing.create(req.body);
    return respon.success(res, "Success create dispensing", newDispensing);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const updateDispensing = async (req, res) => {
  try {
    const { id } = req.params;
    const dispensing = await Dispensing.findByPk(id);

    if (!dispensing) {
      return respon.notFound(res, "Dispensing not found");
    }

    await dispensing.update(req.body);
    return respon.success(res, "Success update dispensing", dispensing);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getDispensingByNoReg = async (req, res) => {
  try {
    const { no_registrasi } = req.params;
    const lokasiApotek = await getLokasiApotek();
    if (!lokasiApotek) {
      return respon.notFound(res, "Lokasi Apotek belum tersedia");
    }

    const kunjungan = await findKunjunganByNoReg(no_registrasi);
    if (!kunjungan) {
      return respon.notFound(res, "Kunjungan/pasien tidak ditemukan");
    }

    const detailItems = [];
    for (const resep of kunjungan.reseps || []) {
      for (const detail of resep.detailReseps || []) {
        const available = await calculateAvailableQtyByObat(detail.obat_id, lokasiApotek.id);
        const lastDispensing = (detail.dispensing || []).slice().sort((a, b) => b.id - a.id)[0] || null;
        detailItems.push({
          detail_resep_id: detail.id,
          resep_id: resep.id,
          obat_id: detail.obat_id,
          nama_obat: detail.obat?.nama_obat || "-",
          jumlah_resep: Number(detail.jumlah),
          stok_apotek: available,
          tersedia: available >= Number(detail.jumlah),
          status_dispensing: lastDispensing?.status?.nama_status || "Belum",
          is_stok_keluar: Boolean(lastDispensing?.is_stok_keluar),
        });
      }
    }

    return respon.success(res, "Success get dispensing by no registrasi", {
      no_registrasi: kunjungan.no_registrasi,
      pasien: kunjungan.pasien,
      details: detailItems,
    });
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const processDispensingByNoReg = async (req, res) => {
  const { sequelize } = require("../models");
  const t = await sequelize.transaction();
  const idempotencyKey = req.headers["x-idempotency-key"];
  const endpoint = "POST:/api/dispensing/process-by-no-reg";
  let idempotencyRecord = null;
  try {
    const { no_registrasi, apoteker_id } = req.body;

    if (!idempotencyKey) {
      await t.rollback();
      return respon.badRequest(res, "Header x-idempotency-key wajib diisi");
    }

    const idem = await beginIdempotentRequest({
      endpoint,
      idempotencyKey: String(idempotencyKey),
      body: req.body,
    });

    if (idem.state === "hash_mismatch") {
      await t.rollback();
      return respon.conflict(res, "Idempotency key sudah dipakai untuk payload berbeda");
    }
    if (idem.state === "processing") {
      await t.rollback();
      return respon.conflict(res, "Request dengan idempotency key ini sedang diproses");
    }
    if (idem.state === "replay") {
      await t.rollback();
      return res.status(idem.record.response_code || 200).json(
        idem.record.response_body || {
          success: true,
          message: "Replay response",
        },
      );
    }

    idempotencyRecord = idem.record;

    const apoteker = await Apoteker.findByPk(apoteker_id, { transaction: t });
    if (!apoteker) {
      await t.rollback();
      return respon.notFound(res, "Apoteker tidak ditemukan");
    }

    const lokasiApotek = await getLokasiApotek();
    if (!lokasiApotek) {
      await t.rollback();
      return respon.notFound(res, "Lokasi Apotek belum tersedia");
    }

    const statusSudah = await getStatusByName("Sudah");
    const statusPending = await getStatusByName("Pending");
    if (!statusSudah || !statusPending) {
      await t.rollback();
      return respon.badRequest(res, "Master status dispensing (Sudah/Pending) belum lengkap");
    }

    const kunjungan = await findKunjunganByNoReg(no_registrasi);
    if (!kunjungan) {
      await t.rollback();
      return respon.notFound(res, "Kunjungan/pasien tidak ditemukan");
    }

    const processed = [];

    for (const resep of kunjungan.reseps || []) {
      for (const detail of resep.detailReseps || []) {
        const available = await calculateAvailableQtyByObat(detail.obat_id, lokasiApotek.id);
        const isAvailable = available >= Number(detail.jumlah);
        const statusId = isAvailable ? statusSudah.id : statusPending.id;

        const existing = await Dispensing.findOne({
          where: { detail_resep_id: detail.id },
          transaction: t,
        });

        if (existing) {
          await existing.update(
            {
              apoteker_id,
              dispensingAt: new Date(),
              status_dispensing_id: statusId,
            },
            { transaction: t },
          );
        } else {
          await Dispensing.create(
            {
              detail_resep_id: detail.id,
              apoteker_id,
              dispensingAt: new Date(),
              status_dispensing_id: statusId,
              is_stok_keluar: false,
            },
            { transaction: t },
          );
        }

        processed.push({
          detail_resep_id: detail.id,
          nama_obat: detail.obat?.nama_obat || "-",
          jumlah_resep: Number(detail.jumlah),
          stok_apotek: Number(available),
          status: isAvailable ? "Sudah" : "Pending",
        });
      }
    }

    await t.commit();
    const responseBody = {
      success: true,
      message: "Success process dispensing by no registrasi",
      data: {
        no_registrasi: String(no_registrasi),
        apoteker: {
          id: apoteker.id,
          nama_apoteker: apoteker.nama_apoteker,
        },
        processed,
      },
    };

    await DispensingAuditLog.create({
      endpoint,
      action_type: "PROCESS_DISPENSING",
      no_registrasi: String(no_registrasi),
      apoteker_id,
      idempotency_key: String(idempotencyKey),
      status: "SUCCESS",
      processed_count: processed.length,
      failed_count: 0,
      response_message: responseBody.message,
      metadata: { processed },
    });

    await completeIdempotentRequest({
      recordId: idempotencyRecord.id,
      status: "SUCCESS",
      responseCode: 200,
      responseBody,
    });

    return res.status(200).json(responseBody);
  } catch (error) {
    await t.rollback();
    if (idempotencyRecord) {
      await completeIdempotentRequest({
        recordId: idempotencyRecord.id,
        status: "FAILED",
        responseCode: 500,
        responseBody: {
          success: false,
          message: error.message,
        },
      });
    }

    try {
      await DispensingAuditLog.create({
        endpoint,
        action_type: "PROCESS_DISPENSING",
        no_registrasi: String(req.body?.no_registrasi || "-"),
        apoteker_id: req.body?.apoteker_id || null,
        idempotency_key: idempotencyKey ? String(idempotencyKey) : null,
        status: "FAILED",
        processed_count: 0,
        failed_count: 1,
        response_message: error.message,
      });
    } catch (auditError) {
      console.log(auditError);
    }

    console.log(error);
    return respon.serverError(res, error.message);
  }
};

const getDispensingQueue = async (req, res) => {
  try {
    const q = String(req.query.q || "").toLowerCase().trim();

    const kunjungans = await Kunjungan.findAll({
      include: [
        {
          model: Pasien,
          as: "pasien",
        },
        {
          model: Resep,
          as: "reseps",
          include: [
            {
              model: DetailResep,
              as: "detailReseps",
              include: [
                {
                  model: Dispensing,
                  as: "dispensing",
                  include: [
                    {
                      model: StatusDispensing,
                      as: "status",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [["updatedAt", "DESC"]],
      limit: 50,
    });

    const rows = [];
    for (const k of kunjungans) {
      const noReg = String(k.no_registrasi || "");
      const namaPasien = String(k.pasien?.nama_pasien || "");
      if (q && !noReg.toLowerCase().includes(q) && !namaPasien.toLowerCase().includes(q)) {
        continue;
      }

      let total = 0;
      let sudah = 0;
      let pending = 0;
      let stokKeluarDone = 0;

      for (const resep of k.reseps || []) {
        for (const detail of resep.detailReseps || []) {
          total += 1;
          const lastDispensing = (detail.dispensing || []).slice().sort((a, b) => b.id - a.id)[0] || null;
          const status = String(lastDispensing?.status?.nama_status || "Belum");
          if (status === "Sudah") {
            sudah += 1;
          }
          if (status === "Pending") {
            pending += 1;
          }
          if (lastDispensing?.is_stok_keluar) {
            stokKeluarDone += 1;
          }
        }
      }

      rows.push({
        no_registrasi: noReg,
        nama_pasien: namaPasien,
        total_item: total,
        sudah,
        pending,
        stok_keluar_done: stokKeluarDone,
        siap_stok_keluar: sudah > 0,
      });
    }

    return respon.success(res, "Success get dispensing queue", rows);
  } catch (error) {
    console.log(error);
    return respon.serverError(res, error.message);
  }
};

module.exports = {
  getDispensing,
  getDispensingById,
  createDispensing,
  updateDispensing,
  getDispensingByNoReg,
  processDispensingByNoReg,
  getDispensingQueue,
};
