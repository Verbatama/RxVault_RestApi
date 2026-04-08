const crypto = require("crypto");
const { RequestIdempotency } = require("../models");

// Hash payload request untuk memastikan key yang sama tidak dipakai dengan isi berbeda.
const hashBody = (body) => {
  const text = JSON.stringify(body || {});
  return crypto.createHash("sha256").update(text).digest("hex");
};

const beginIdempotentRequest = async ({ endpoint, idempotencyKey, body }) => {
  const requestHash = hashBody(body);
  // Cari apakah key untuk endpoint ini sudah pernah dipakai.
  const existing = await RequestIdempotency.findOne({
    where: {
      endpoint,
      idempotency_key: idempotencyKey,
    },
  });

  if (existing) {
    // Tolak jika key sama tapi payload berbeda.
    if (existing.request_hash !== requestHash) {
      return {
        state: "hash_mismatch",
        record: existing,
      };
    }

    // Hindari eksekusi paralel untuk request yang sama.
    if (existing.status === "PROCESSING") {
      return {
        state: "processing",
        record: existing,
      };
    }

    // Jika sudah pernah selesai, response lama bisa di-replay.
    return {
      state: "replay",
      record: existing,
    };
  }

  // Buat jejak baru dan tandai sedang diproses.
  const record = await RequestIdempotency.create({
    endpoint,
    idempotency_key: idempotencyKey,
    request_hash: requestHash,
    status: "PROCESSING",
  });

  return {
    state: "created",
    record,
  };
};

const completeIdempotentRequest = async ({ recordId, status, responseCode, responseBody }) => {
  // Simpan status akhir dan response agar bisa dipakai saat replay.
  await RequestIdempotency.update(
    {
      status,
      response_code: responseCode,
      response_body: responseBody,
    },
    {
      where: { id: recordId },
    },
  );
};

module.exports = {
  beginIdempotentRequest,
  completeIdempotentRequest,
};
