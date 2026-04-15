const jwt = require("jsonwebtoken");

const APOTEKER_TOKEN_SECRET =
  process.env.APOTEKER_JWT_SECRET || "rxvault-apoteker-secret-change-me";
const APOTEKER_TOKEN_EXPIRES_IN = process.env.APOTEKER_JWT_EXPIRES_IN || "12h";

const signApotekerToken = (apoteker) => {
  return jwt.sign(
    {
      sub: Number(apoteker.id),
      role: "apoteker",
      nama_apoteker: apoteker.nama_apoteker,
    },
    APOTEKER_TOKEN_SECRET,
    {
      expiresIn: APOTEKER_TOKEN_EXPIRES_IN,
    },
  );
};

const verifyApotekerToken = (token) => {
  return jwt.verify(token, APOTEKER_TOKEN_SECRET);
};

module.exports = {
  signApotekerToken,
  verifyApotekerToken,
};
