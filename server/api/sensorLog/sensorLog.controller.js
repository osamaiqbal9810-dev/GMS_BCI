let ServiceLocator = require("../../framework/servicelocator");
import summaryModel from "./sensorsummary.modal.js";
import sensorLogModal from "./sensorLog.modal.js";
import sensorReportModal from "../sensorReport/sensorReport.modal"
import { timeLimit } from "../../config/sensorconfig.js";
import { result } from "lodash.js";

exports.getSensorLog = async function (req, res) {
  let SensorLogService = ServiceLocator.resolve("SensorLogService");
  let resultObj = await SensorLogService.getAllSensorLogs(req.query.id);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(resultObj.status);
  res.json(resultObj.value);
};
exports.getAllSensorLog = async function (req, res) {
  let SensorLogService = ServiceLocator.resolve("SensorLogService");
  let resultObj = await SensorLogService.getAllDeviceLogs();
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(resultObj.status);
  res.json(resultObj.value);
};
exports.receiveSensorLog = async function (req, res) {
  let sensorLogService = ServiceLocator.resolve("SensorLogService");
  //console.log(sensorLogService);
  let resultObj = await sensorLogService.sensorLogReceive(req.body);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};
exports.getFloorStates = async function (req, res) {
  let sensorLogService = ServiceLocator.resolve("SensorLogService");
  // console.log(sensorLogService);
  let resultObj = await sensorLogService.getFloorStateSummary(req);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};
exports.getFloorStatesHourlySummary = async function (req, res) {
  let sensorLogService = ServiceLocator.resolve("SensorLogService");
  // console.log(sensorLogService);
  let resultObj = await sensorLogService.getSummaryHours(timeLimit.hour);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};

exports.getSensorHourlySummary = async function (req, res) {
  let sensorLogService = ServiceLocator.resolve("SensorLogService");
  // console.log(sensorLogService);
  let resultObj = await sensorLogService.getSensorSummary(req.params.id);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};
exports.detectSensorDefrostCycles = async function (req, res) {
  let sensorLogService = ServiceLocator.resolve("SensorLogService");
  let resultObj = await sensorLogService.detectDefrostCycles(req.params.id);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};

exports.getSensorReport = async function (req, res) {
  let sensorLogService = ServiceLocator.resolve("SensorLogService");
  let resultObj = await sensorLogService.getSensorReport(req.body);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};
