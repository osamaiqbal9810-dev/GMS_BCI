import moment, { isMoment } from "moment";
import { cloneDeep } from "lodash";
import AssetsModel from "../api/assets/assets.modal";

import SensorLogService from "../api/sensorLog/sensorLog.service";
import { temperature, humidity } from "../config/sensorconfig";
let ServiceLocator = require("../framework/servicelocator");
export default class SensorSimulatedData {
  constructor(sensorIdsToAdd, secondsFrequency, randomRange) {
    this.configs = {
      sensorIdsToAdd: sensorIdsToAdd ? sensorIdsToAdd : [],
      secondsFrequency: secondsFrequency ? secondsFrequency : 300,
    };

    this.randomRange = { ...randomVariableRange, ...randomRange };
  }
  setConfig(configName, configValue) {
    if (configName == "sensorIdsToAdd") {
      this.configs[configName] = configValue ? configValue : [];
    }
    if (configName == "secondsFrequency") {
      this.configs[configName] = configValue ? configValue : 300;
    }
  }
  async populateSensorLogData(startDateTime) {
    !startDateTime && (startDateTime = moment().startOf("day"));
    let utils = ServiceLocator.resolve("utils");
    if (!isMoment(startDateTime)) {
      console.log("Start Time is not a valid moment date object");
      return;
    }
    let gateWayData = [];
    try {
      let currentTime = moment(startDateTime);
      let endTime = moment();
      !this.configs.secondsFrequency && (this.configs.secondsFrequency = 300);
      while (currentTime.isBefore(endTime)) {
        let gateWayObj = {
          sensorsInfo: [],
        };
        for (let sensorId of this.configs.sensorIdsToAdd) {
          gateWayObj.dateTime = currentTime.toDate();
          // # randomize data and add an entry of sensor log
          let keys = Object.keys(randomVariableRange);
          let data = {};
          data["macAddress"] = sensorId;
          for (let key of keys) {
            data[key] = utils.getRandomInt(randomVariableRange[key]["min"], randomVariableRange[key]["max"]);
          }
          // let obj = {};
          // obj[sensorId] = data;
          gateWayObj.sensorsInfo.push(data);
          // # update current time to simulate
        }
        currentTime = moment(currentTime).add(this.configs.secondsFrequency, "seconds");
        gateWayData.push(gateWayObj);
      }
    } catch (err) {
      console.log("Cound not add Simulated Data to Sensor Log : ", err);
    }
    return gateWayData;
  }

  async sampleSensorDataTypeOne() {
    let sensors = await AssetsModel.find({ assetType: "Sensor" }).exec();
    let sensorIds = [
      "AABBCCDDEE01",
      "AABBCCDDEE02",
      "AABBCCDDEE03",
      "AABBCCDDEE04",
      "AABBCCDDEE05",
      "AABBCCDDEE06",
      "AABBCCDDEE07",
      "AABBCCDDEE08",
      "AABBCCDDEE09",
      "AABBCCDDEE10",
      "AABBCCDDEE11",
    ];
    // for (let s of sensors) {
    //   s.attributes.sensorId && sensorIds.push(s.attributes.sensorId);
    // }
    this.configs.sensorIdsToAdd = sensorIds;
    let data = await this.populateSensorLogData(moment().subtract(3, "day"));
    console.log(data.length);
    let SensorLogModel = ServiceLocator.resolve("SensorLogModel");
    let SumamryModel = ServiceLocator.resolve("SensorSummaryModel");
    await SensorLogModel.remove({}).exec();
    await SumamryModel.remove({}).exec();
    try {
      if (data.length > 0) {
        // initate saving sensor log data
        for (let gateWayData of data) {
          let sensorLogService = new SensorLogService();
          let dateTimeService = ServiceLocator.resolve("DateTimeService");
          dateTimeService.setNowTime(gateWayData.dateTime);
          let res = await sensorLogService.sensorLogReceive({ data: JSON.stringify(gateWayData) });
          if (res.errorVal) {
            throw res.errorVal;
          }
        }
        console.log("Succesfully Added Data");
      }
    } catch (err) {
      console.log("Error in sampleSensorDataTypeOne : ", err);
    }
  }
}

const randomVariableRange = {
  rssi: { min: 0, max: 10 },
  unixTimeStamp: { min: 0, max: 10 },
  protocolVersion: { min: 0, max: 10 },
  timeSlot: { min: 0, max: 10 },
  productIdentifier: { min: 0, max: 10 },
  deviceType: { min: 0, max: 10 },
  frameType: { min: 0, max: 10 },
  timePeriod: { min: 0, max: 10 },
  timeAtWakeup: { min: 0, max: 10 },
  timeSinceWakeup: { min: 0, max: 10 },
  batteryVoltage: { min: 0, max: 10 },
  timeSyncOnWakeup: { min: 0, max: 10 },
  timeSynced: { min: 0, max: 10 },
  timeSyncRequired: { min: 0, max: 10 },
  sequenceNumber: { min: 0, max: 10 },
  temperature: { min: temperature.min, max: temperature.max },
  humidity: { min: humidity.min, max: humidity.max },
};
