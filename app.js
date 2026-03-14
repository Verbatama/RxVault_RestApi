const express = require("express");
const app = express();
const port = 6060;
const userRouters = require("./routers/user");

app.use("/api", userRouters);

app.listen(port, () => {
  console.log(`Berhasil berjalan di port ${port}`);
});
