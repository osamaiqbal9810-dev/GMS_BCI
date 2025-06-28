let ServiceLocator = require("../../framework/servicelocator");
import sensorReport from "./sensorReport.modal.js";

exports.getSensorReport = async function (req, res) {
  let SensorReportService = ServiceLocator.resolve("SensorReportService");
  let resultObj = await SensorReportService.getSensorReport(req.body);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};
