const express = require("express");
const router = express.Router();
const userRoutes = require("./usercontroller");
const sheetRoutes = require("./sheetscontroller");




router.use("/api/users",userRoutes);
router.use("/api/sheets",sheetRoutes)


module.exports = router;