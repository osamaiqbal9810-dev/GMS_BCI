import { templateSettings } from "../../template/config.js";
import _, { floor } from "lodash.js";
let ServiceLocator = require("../../framework/servicelocator");
var ObjectId = require("mongodb").ObjectID;
var turf = require("@turf/turf");
class DeviceService {
//devices api
  async getAllDevices() {
    let resultObj, DeviceModel;
    resultObj = { value: {} };

    try {
      DeviceModel = ServiceLocator.resolve("DeviceModel");
        let assetsToReturn =[];
            let allAssets = await DeviceModel.find();
            allAssets.map((asset)=>{
               assetsToReturn.push(asset);
            });
            resultObj.status = 200;
            resultObj.value.assetsList = assetsToReturn;
    } catch (err) {
      resultObj = { errorVal: err, status: 500 };
    }
    return resultObj;
  }



  async createDevice(deviceInfo) {
    console.log(deviceInfo);
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

  async find(id) {
    let resultObj, deviceModel;
    deviceModel = ServiceLocator.resolve("DeviceModel");
    try {
      if (id) {
        let device = await deviceModel.findById(id).exec();
        resultObj = { value: device, status: 200 };
      }
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }

  async updateAsset(asset) {
   
    let resultObj, deviceModel, savedAsset;
    deviceModel = ServiceLocator.resolve("DeviceModel");
 
    try {
      let query = { _id: asset._id };

      savedAsset = await deviceModel.findOneAndUpdate(query, asset, {
        upsert: true,
      }).exec();

      resultObj = { value: savedAsset, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }
    return resultObj;
  }

  async deleteAsset(id) {
    let deviceModel = ServiceLocator.resolve("DeviceModel");
    let result = { errorVal: "default", status: 200 };
    try {
      if (id) {
        let assetsToDelete = await deviceModel.findById(id).exec();

        if (assetsToDelete) {
          
          assetsToDelete.isRemoved = true;
          await deviceModel.save();

          result.status = 200;
        } else {
          result.status = 404;
          result.errorVal = "Device not found";
        }
      } else {
        result.status = 404;
        result.errorVal = "Missing id parameter";
      }
    } catch (err) {
      console.log(" err:", err.toString());
      result.status = 500;
      result.errorVal = "Internal Server Error: " + err.toString(); // todo log the error string and send back only 'Internal Server Error'
    }

    return result;
  }

}
export default DeviceService;

