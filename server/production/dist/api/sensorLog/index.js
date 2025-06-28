"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require("express");
var router = express.Router();
var controller = require("./sensorLog.controller");
var isAuthenticated = require("../../auth/auth");
// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");
router.post("/sensordata/", [
  /*isAuthenticated isAllowed(permitTypes.READ_ASSET)*/
], controller.receiveSensorLog);
router.get("/", [isAuthenticated], controller.getSensorLog);
router.get("/getAll", [isAuthenticated], controller.getAllSensorLog);
router.get("/getstatesummary/", [isAuthenticated], controller.getFloorStates);
router.get("/dashboardsummary/", [isAuthenticated], controller.getFloorStatesHourlySummary);
router.get("/getsensorsummary/:id", /*[isAuthenticated],*/controller.getSensorHourlySummary);
router.get("/detectdefrostcycles/:id", [isAuthenticated], controller.detectSensorDefrostCycles);
// router.post("/getreport", [isAuthenticated], controller.getSensorReport);

module.exports = router;