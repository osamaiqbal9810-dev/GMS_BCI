import * as permitTypes from "../../config/permissions.js";
let express = require("express");
let router = express.Router();
let controller = require("./tiles.controller");
let isAuthenticated = require("../../auth/auth");
// Permission Validation
let isAllowed = require("../../middlewares/validatePermission");
router.get("/", controller.gettilesCount);
// router.post("/getreport", [isAuthenticated], controller.getSensorReport);

module.exports = router;
