const router = require("express").Router();
// const authRoutes = require("./routes/auth");

const topupRoutes = require("./admin/routes/topup");
const adminRoutes = require("./admin/routes/user");
const transferRoutes = require("./admin/routes/transfer");

router
  .use("/topup", topupRoutes)
  .use("/users", adminRoutes)
  .use("/transfer", transferRoutes);

module.exports = router;
