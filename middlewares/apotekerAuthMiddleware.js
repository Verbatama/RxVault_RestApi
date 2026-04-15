const respon = require("../helpers/responseHelper");
const { Apoteker } = require("../models");
const { verifyApotekerToken } = require("../helpers/apotekerTokenHelper");

const extractBearerToken = (authorizationHeader) => {
  if (!authorizationHeader || typeof authorizationHeader !== "string") {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (String(scheme).toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
};

const authenticateApoteker = async (req, res, next) => {
  try {
    const token = extractBearerToken(req.headers.authorization);
    if (!token) {
      return respon.unauthorized(res, "Token apoteker tidak ditemukan");
    }

    const payload = verifyApotekerToken(token);
    if (!payload || payload.role !== "apoteker" || !payload.sub) {
      return respon.unauthorized(res, "Token apoteker tidak valid");
    }

    const apoteker = await Apoteker.findByPk(Number(payload.sub));
    if (!apoteker) {
      return respon.unauthorized(res, "Sesi login apoteker tidak valid");
    }

    req.apoteker = {
      id: apoteker.id,
      nama_apoteker: apoteker.nama_apoteker,
    };

    next();
  } catch (error) {
    return respon.unauthorized(res, "Token apoteker tidak valid atau kedaluwarsa");
  }
};

const injectApotekerIdFromSession = (req, res, next) => {
  if (req.apoteker?.id) {
    req.body = {
      ...(req.body || {}),
      apoteker_id: Number(req.apoteker.id),
    };
  }

  next();
};

module.exports = {
  authenticateApoteker,
  injectApotekerIdFromSession,
};
