const crypto = require("crypto");
const { RequestIdempotency } = require("../models");

const hashBody = (body) => {
  const text = JSON.stringify(body || {});
  return crypto.createHash("sha256").update(text).digest("hex");
};

const beginIdempotentRequest = async ({ endpoint, idempotencyKey, body }) => {
  const requestHash = hashBody(body);
  const existing = await RequestIdempotency.findOne({
    where: {
      endpoint,
      idempotency_key: idempotencyKey,
    },
  });

  if (existing) {
    if (existing.request_hash !== requestHash) {
      return {
        state: "hash_mismatch",
        record: existing,
      };
    }

    if (existing.status === "PROCESSING") {
      return {
        state: "processing",
        record: existing,
      };
    }

    return {
      state: "replay",
      record: existing,
    };
  }

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
