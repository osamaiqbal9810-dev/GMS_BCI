import AssetsTreeModel from "../assetsTree/assetsTreeModel.js";
let ServiceLocator = require("../../framework/servicelocator");
let devicesModal = require("./devices.model");

exports.create = async function (req, res, next) {

  let deviceService = ServiceLocator.resolve("DeviceService");
   let resultObj; 
   resultObj = await deviceService.createDevice(req.body);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};

exports.all = async function (req, res, next) {
  let deviceService = ServiceLocator.resolve("DeviceService");
  //let resultObj = await AssetsService.getAllAssetsLamp(req.user);

  let resultObj = await deviceService.getAllDevices();
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};

exports.find = async function (req, res) {
  let AssetsService = ServiceLocator.resolve("DeviceService");
  let resultObj = await AssetsService.find(req.params.id);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};

exports.update = async function (req, res, next) {
  let assetService = ServiceLocator.resolve("DeviceService");
  let resultObj = await assetService.updateAsset(req.body);
  res.status(resultObj.status);
  if (resultObj.value) res.json(resultObj.value);
  else res.json(resultObj.errorVal);
};

exports.delete = async function (req, res, next) {
  let assetService = ServiceLocator.resolve("DeviceService");

  let resultObj = await assetService.deleteAsset(req.params.id);
  res.status(resultObj.status);

  if (resultObj.value) {
    res.json(resultObj.value);
  } else {
    res.json(resultObj.errorVal);
  }
};
