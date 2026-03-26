const express = require("express");
const app = express();
const port = 6060;
const routers = require("./routers/index");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);

app.listen(port, () => {
  console.log(`Berhasil berjalan di port ${port}`);
});
