import * as permitTypes from "../../config/permissions.js";
let express = require("express");
let router = express.Router();
let controller = require("./sensorLog.controller");
let isAuthenticated = require("../../auth/auth");
// Permission Validation
let isAllowed = require("../../middlewares/validatePermission");
router.post(
  "/sensordata/",
  [
    /*isAuthenticated isAllowed(permitTypes.READ_ASSET)*/
  ],
  controller.receiveSensorLog,
);
router.get("/", [isAuthenticated], controller.getSensorLog);
router.get("/getAll", [isAuthenticated], controller.getAllSensorLog);
router.get("/getstatesummary/", [isAuthenticated], controller.getFloorStates);
router.get("/dashboardsummary/", [isAuthenticated], controller.getFloorStatesHourlySummary);
router.get("/getsensorsummary/:id", /*[isAuthenticated],*/ controller.getSensorHourlySummary);
router.get("/detectdefrostcycles/:id", [isAuthenticated], controller.detectSensorDefrostCycles);
// router.post("/getreport", [isAuthenticated], controller.getSensorReport);

module.exports = router;
