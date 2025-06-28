import * as permitTypes from "../../config/permissions.js";
let express = require("express");
let router = express.Router();
let controller = require("./sensorReport.controller");
let isAuthenticated = require("../../auth/auth");
// Permission Validation
let isAllowed = require("../../middlewares/validatePermission");

router.post("/", /*[isAuthenticated],*/ controller.getSensorReport);

module.exports = router;
