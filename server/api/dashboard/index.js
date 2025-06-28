import * as permitTypes from "../../config/permissions.js";

let controller = require("./dashboard.controller");
let isAuthenticated = require("../../auth/auth");
let express = require("express");
let router = express.Router();
// Permission Validation
let isAllowed = require("../../middlewares/validatePermission");

router.get("/", [isAuthenticated], controller.all);
router.get("/specificChart/:id", controller.specifChartData);
module.exports = router;
