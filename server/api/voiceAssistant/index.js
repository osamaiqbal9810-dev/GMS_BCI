import * as permitTypes from "../../config/permissions.js";
let express = require("express");
let router = express.Router();
let controller = require("./voiceAssistant.controller");
let isAuthenticated = require("../../auth/auth");
// Permission Validation
let isAllowed = require("../../middlewares/validatePermission");

router.get("/getsummary/", [isAuthenticated], controller.getSummary);
router.get("/getsensorstatus/:deviceType/:num", [isAuthenticated], controller.getSensorStatus);
router.get("/getsensortemp/:deviceType/:num", [isAuthenticated], controller.getSensorTemperaure);
router.get("/getsensorhumidity/:deviceType/:num", [isAuthenticated], controller.getSensorHumidity);
router.get("/getsensorbattery/:deviceType/:num", [isAuthenticated], controller.getSensorBattery);

module.exports = router;
