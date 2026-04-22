const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 6060;
const routers = require("./routers/index");

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",

];

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(",")
  : defaultAllowedOrigins
)
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin tidak diizinkan oleh CORS"));
    },
  }),
);

app.use("/api", routers);

app.listen(port, () => {
  console.log(`Berhasil berjalan di port ${port}`);
});
