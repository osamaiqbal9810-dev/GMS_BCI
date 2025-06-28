import TilesModel from "./tiles.modal.js";
let ServiceLocator = require("../../framework/servicelocator");

exports.gettilesCount = async function (req, res) {
    let TilesService = ServiceLocator.resolve("TilesService");
    let resultObj = await TilesService.getAllTilesCount();
    
    if (resultObj.errorVal) {
      return res.send(resultObj.errorVal);
    }
    res.status(resultObj.status);
    res.json(resultObj.value);
  };


