import AssetsTreeModel from "../assetsTree/assetsTreeModel.js";
let ServiceLocator = require("../../framework/servicelocator");
let devicesModal = require("./params.model");

exports.create = async function (req, res, next) {

  let deviceService = ServiceLocator.resolve("SupportedParams");
   let resultObj; 
   resultObj = await deviceService.createDevice(req.body);
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};

exports.all = async function (req, res, next) {
  let paramsService = ServiceLocator.resolve("SupportedParams");
  //let resultObj = await AssetsService.getAllAssetsLamp(req.user);

  let resultObj = await paramsService.getAllParams();
  if (resultObj.errorVal) {
    return res.send(resultObj.errorVal);
  }
  res.status(200);
  res.json(resultObj.value);
};
