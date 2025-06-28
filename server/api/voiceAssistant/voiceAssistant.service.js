import moment from "moment-timezone.js";
import { isJSON } from "../../utilities/isJson.js";
import _ from "lodash.js";
import AssetsModel from "../assets/assets.modal.js";
import SummaryModel from "../sensorLog/sensorsummary.modal.js";
import { stateCriteria } from "./../../config/sensorconfig.js";

let ServiceLocator = require("../../framework/servicelocator");
var ObjectId = require("mongodb").ObjectID;

// TODO: Define criteria for good or bad battery health status and
// update it as soon as the sensor data is received (voltage received is in millivolts)
// config.batteryHealthThreshold = 2200  // millivolts
// batteryHealthStatus = (batteryVoltage > config.batteryHealthThreshold) ? "good" : "bad"

// TODO: Define in system configurations?
const dateFormatForAlexa = "YYYY-MM-DD HH:mm";

class VoiceAssistantService {
  async extractSensorsSummary(req) {
    let resultObj;
    resultObj = {};
    let AssetService = ServiceLocator.resolve("AssetsService");
    let assetsIds = await AssetService.getUserAssetsIds(req.user);
    try {
      // states of all floors in a store.

      let summaryData = await SummaryModel.find({ summaryName: "floorstate", assetId: { $in: assetsIds } })
        .sort({ date: "desc" })
        .exec();
      let filterData = [];
      if (summaryData.length > 0) {
        let keys = _.uniqBy(summaryData, "assetId");
        for (let i = 0; i < keys.length; i++) {
          for (let j = 0; j < summaryData.length; j++) {
            if (summaryData[j].assetId === keys[i].assetId) {
              filterData.push(summaryData[i]);
              break;
            }
          }
        }
      } else {
      }

      resultObj.value = {
        NoOfActiveDevices: 0,
        NoOfOfflineDevices: 0,
        NoOfDevicesInAlerts: 0,
        NoOfDevicesInWarnings: 0,
        NoOfDevicesInDefrost: 0,
      };

      for (let floor of filterData) {
        resultObj.value.NoOfActiveDevices += floor.data.active;
        resultObj.value.NoOfOfflineDevices += floor.data.offline;
        resultObj.value.NoOfDevicesInAlerts += floor.data.alert;
        resultObj.value.NoOfDevicesInWarnings += floor.data.warning;
        resultObj.value.NoOfDevicesInDefrost += floor.data.defrost;
      }

      resultObj.status = 200;
    } catch (error) {
      resultObj.errorVal = error;
      resultObj.status = 500;
      console.log("Error occured in  : ", error);
    }
    return resultObj;
  }

  async extractSensorStatus(user, deviceType, num) {
    let resultObj;
    resultObj = {};

    try {
      let criteria = { $and: [{ "attributes.deviceType": deviceType }, { "attributes.deviceNum": num }] };
      let AssetService = ServiceLocator.resolve("AssetsService");
      let assetsIds = await AssetService.getUserAssetsIds(user);
      criteria["_id"] = { $in: assetsIds };
      let assets = await AssetsModel.find(criteria).exec();

      let resObj = {
        Exists: false,
        DeviceType: deviceType,
        Number: num,
        DeviceList: [],
      };
      let floors = [];
      if (assets && assets.length > 0) {
        for (let asset of assets) {
          resObj.Exists = true;
          let alexaAsset = {
            Floor: await getFloorName(asset, floors),
            Online: checkOnline(asset),
            AlertStatus: checkAlert(asset),
            Temperature: getTemp(asset),
            Humidity: getHumidity(asset),
            BatteryHealthStatus: checkBattery(asset),
            LastSeenTime: getDataReceiveTime(asset),
          };
          resObj.DeviceList.push(alexaAsset);
        }
      }
      resultObj.value = resObj;
      resultObj.status = 200;
    } catch (error) {
      resultObj.errorVal = error;
      resultObj.status = 500;
      console.log("Error occured in  : ", error);
    }
    return resultObj;
  }

  async extractSensorTemperature(user, deviceType, num) {
    let resultObj;
    resultObj = {};

    try {
      let criteria = { $and: [{ "attributes.deviceType": deviceType }, { "attributes.deviceNum": num }] };
      let AssetService = ServiceLocator.resolve("AssetsService");
      let assetsIds = await AssetService.getUserAssetsIds(user);
      criteria["_id"] = { $in: assetsIds };
      let assets = await AssetsModel.find(criteria).exec();
      let resObj = {
        Exists: false,
        DeviceType: deviceType,
        Number: num,
        DeviceList: [],
      };
      let floors = [];
      if (assets && assets.length > 0) {
        for (let asset of assets) {
          resObj.Exists = true;
          let alexaAsset = {
            Floor: await getFloorName(asset, floors),
            Online: checkOnline(asset),
            Temperature: getTemp(asset),
            LastSeenTime: getDataReceiveTime(asset),
          };
          resObj.DeviceList.push(alexaAsset);
        }
      }
      resultObj.value = resObj;
      resultObj.status = 200;
    } catch (error) {
      resultObj.errorVal = error;
      resultObj.status = 500;
      console.log("Error occured in  : ", error);
    }
    return resultObj;
  }

  async extractSensorHumidity(user, deviceType, num) {
    let resultObj;
    resultObj = {};

    try {
      let criteria = { $and: [{ "attributes.deviceType": deviceType }, { "attributes.deviceNum": num }] };
      let AssetService = ServiceLocator.resolve("AssetsService");
      let assetsIds = await AssetService.getUserAssetsIds(user);
      criteria["_id"] = { $in: assetsIds };
      let assets = await AssetsModel.find(criteria).exec();
      let resObj = {
        Exists: false,
        DeviceType: deviceType,
        Number: num,
        DeviceList: [],
      };
      let floors = [];
      if (assets && assets.length > 0) {
        for (let asset of assets) {
          resObj.Exists = true;
          let alexaAsset = {
            Floor: await getFloorName(asset, floors),
            Online: checkOnline(asset),
            Humidity: getHumidity(asset),
            LastSeenTime: getDataReceiveTime(asset),
          };
          resObj.DeviceList.push(alexaAsset);
        }
      }
      resultObj.value = resObj;
      resultObj.status = 200;
    } catch (error) {
      resultObj.errorVal = error;
      resultObj.status = 500;
      console.log("Error occured in  : ", error);
    }
    return resultObj;
  }

  async extractSensorBattery(user, deviceType, num) {
    let resultObj;
    resultObj = {};

    try {
      let criteria = { $and: [{ "attributes.deviceType": deviceType }, { "attributes.deviceNum": num }] };
      let AssetService = ServiceLocator.resolve("AssetsService");
      let assetsIds = await AssetService.getUserAssetsIds(user);
      criteria["_id"] = { $in: assetsIds };
      let assets = await AssetsModel.find(criteria).exec();
      let resObj = {
        Exists: false,
        DeviceType: deviceType,
        Number: num,
        DeviceList: [],
      };
      let floors = [];
      if (assets && assets.length > 0) {
        for (let asset of assets) {
          resObj.Exists = true;
          let alexaAsset = {
            Floor: await getFloorName(asset, floors),
            Online: checkOnline(asset),
            BatteryHealthStatus: checkBattery(asset),
            LastSeenTime: getDataReceiveTime(asset),
          };
          resObj.DeviceList.push(alexaAsset);
        }
      }
      resultObj.value = resObj;
      resultObj.status = 200;
    } catch (error) {
      resultObj.errorVal = error;
      resultObj.status = 500;
      console.log("Error occured in  : ", error);
    }
    return resultObj;
  }
}

// Miscelleneous Functions
function checkOnline(asset) {
  let Online = false;
  if (asset && asset.attributes && asset.attributes && asset.attributes.state !== "offline" && asset.attributes.state !== "comFailure") {
    Online = true;
  }
  return Online;
}

function checkAlert(asset) {
  let alert = "inactive";
  if (asset && asset.attributes && asset.attributes && asset.attributes.state == "alert") {
    alert = "active";
  }
  return alert;
}

function getTemp(asset) {
  let utils = ServiceLocator.resolve("utils");
  let temp = "";
  let config = getTempConfig();
  if (asset && asset.attributes && asset.attributes.data && asset.attributes.data.temperature) {
    temp = asset.attributes.data.temperature;
    if (config == "C") {
      temp = temp + " °" + config;
    } else {
      temp = utils.cToF(temp) + " °" + config;
    }
  }
  return temp;
}

function getTempConfig() {
  // TODO: Ahsan, get this config from the DB
  return "C";
}

function getHumidity(asset) {
  let hum = "unknown";
  // console.log("asset.attributes.data: " + JSON.stringify(asset.attributes.data));
  // console.log("asset.attributes.data.humidity: " + JSON.stringify(asset.attributes.data.humidity));
  if (asset && asset.attributes && asset.attributes.data && asset.attributes.data.humidity !== undefined) {
    hum = asset.attributes.data.humidity + " %";
  }
  return hum;
}
function checkBattery(asset) {
  let batHealth = "";
  if (asset && asset.attributes && asset.attributes && asset.attributes.batteryHealthStatus) {
    batHealth = asset.attributes.batteryHealthStatus;
  }
  return batHealth;
}
async function getFloorName(asset, floors) {
  // get floor if not already found.
  let exist = _.find(floors, (f) => {
    return f.id == asset.parentAsset;
  });
  let floorName = "";
  if (exist) {
    floorName = exist.unitId;
  } else {
    // Fetch from db and put it in floorList
    let floorObj = await AssetsModel.findOne({ _id: ObjectId(asset.parentAsset) }).exec();
    if (floorObj) {
      floors.push(floorObj);
      floorName = floorObj.unitId;
    } else {
      floorName = "";
    }
  }
  return floorName;
}
function getDataReceiveTime(asset) {
  let date = "";
  if (asset && asset.attributes && asset.attributes && asset.attributes.dataReceiveTime) {
    date = moment(asset.attributes.dataReceiveTime).format(dateFormatForAlexa);
  }
  return date;
}

export default VoiceAssistantService;
