let ServiceLocator = require("../../framework/servicelocator");
import { result } from "lodash.js";

exports.getSummary = async function (req, res) {
  let VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
  let resultObj = await VoiceAssistantService.extractSensorsSummary(req);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(resultObj.status);
  res.json(resultObj.value);
};

exports.getSensorStatus = async function (req, res) {
  let VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
  let resultObj = await VoiceAssistantService.extractSensorStatus(req.user, req.params.deviceType, req.params.num);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(resultObj.status);
  res.json(resultObj.value);
};

exports.getSensorTemperaure = async function (req, res) {
  let VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
  let resultObj = await VoiceAssistantService.extractSensorTemperature(req.user, req.params.deviceType, req.params.num);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(resultObj.status);
  res.json(resultObj.value);
};

exports.getSensorHumidity = async function (req, res) {
  let VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
  let resultObj = await VoiceAssistantService.extractSensorHumidity(req.user, req.params.deviceType, req.params.num);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(resultObj.status);
  res.json(resultObj.value);
};

exports.getSensorBattery = async function (req, res) {
  let VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
  let resultObj = await VoiceAssistantService.extractSensorBattery(req.user, req.params.deviceType, req.params.num);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(resultObj.status);
  res.json(resultObj.value);
};
