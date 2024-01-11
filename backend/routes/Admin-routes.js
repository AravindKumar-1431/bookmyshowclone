const express = require("express");
const { Addadmin, adminLogin } = require("../controllers/Admin-controller");
const adminRouter = express.Router();

adminRouter.post("/signup", Addadmin);
adminRouter.post("/login", adminLogin);
module.exports = { adminRouter };
