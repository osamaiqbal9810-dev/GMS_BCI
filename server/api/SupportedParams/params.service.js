import { templateSettings } from "../../template/config.js";
import _, { floor } from "lodash.js";
let ServiceLocator = require("../../framework/servicelocator");
var ObjectId = require("mongodb").ObjectID;
var turf = require("@turf/turf");
class SupportedParams {
//devices api
  async getAllParams() {
    let resultObj, paramsModel;
    resultObj = { value: {} };

    try {
      paramsModel = ServiceLocator.resolve("SupportedParamsModel");
      let paramsToReturn =[];
            let allParams = await paramsModel.find();
            allParams.map((params)=>{
               paramsToReturn.push(params);
            });
            resultObj.status = 200;
            resultObj.value.params = paramsToReturn;
    } catch (err) {
      resultObj = { errorVal: err, status: 500 };
    }
    return resultObj;
  }



  async createDevice(deviceInfo) {
    let resultObj, DevicesModel;
    resultObj = {};
    DevicesModel = ServiceLocator.resolve("DeviceModel");
    try{
      let newDevice = new DevicesModel(deviceInfo);
      let savedDevice = await newDevice.save();
    } catch (error) {
      console.log(error);
      resultObj = { errorVal: error, status: 500 };
    }
    return resultObj;
  }

}
export default SupportedParams;

