let ServiceLocator = require("../framework/servicelocator");
import { stateCriteria } from "../config/sensorconfig";
import moment from "moment";
import _ from "lodash";
export default class StateManager {
  constructor() {
    this.serviceConfig = {
      sensorBGServiceMiliSeconds: 15000,
      sensorBGServiceMinTimeSeconds: 5,
    };
    this.intervals = {};
    this.dateTimeService = ServiceLocator.resolve("DateTimeService");
  }
  // # create timeout interval for alert offline
  intervalInitialize(callback, time) {
    if (callback && time) {
      let interval = setInterval(callback, time);
      return interval;
    }
    return false;
  }

  sensorOfflineService() {
    checkmoment();
    this.intervals.processSensors = {
      executedTime: new Date(),
      interval: this.intervalInitialize(processSensors, this.serviceConfig.sensorBGServiceMiliSeconds),
    };
  }
  // if to be called from when data is received
  sensorOfflineServiceCall() {
    if (moment(this.intervals.processSensors.executedTime).add(sensorBGServiceMinTimeSeconds, "seconds").isAfter(new Date())) {
      clearInterval(this.interval.processSensors.interval);
      this.intervals.processSensors.interval = null;
      processSensors();
      this.intervals.processSensors = this.intervalInitialize(processSensors, this.serviceConfig.sensorBGServiceMiliSeconds);
    }
  }
}

async function processSensors() {
  let AssetModel, allSensors, sensorsToUpdate, floorSummaryToRecal, sensorLogService, AssetsService, SocketIOService;
  AssetModel = ServiceLocator.resolve("AssetsModel");
  AssetsService = ServiceLocator.resolve("AssetsService");
  sensorLogService = ServiceLocator.resolve("SensorLogService");
  SocketIOService = ServiceLocator.resolve("SocketIOService");
  try {
    let timeNow = this.dateTimeService ? moment(this.dateTimeService.getNowTime()) : moment();
    sensorsToUpdate = [];
    floorSummaryToRecal = [];
    // # get all sensors and calculate if state transition criteria is met
    // ! improvement : filter sensor with no state or id
    allSensors = await AssetModel.find({ assetType: "Sensor" }).exec();
    for (let sensor of allSensors) {
      if (sensor.attributes.state && sensor.attributes.sensorId) {
        // # check time duration criteria for alert state
        if (checkAlertState(sensor, moment()) || checkNetworkFailure(sensor, moment())) {
          // ! improvement save adjustment to the floor states
          floorSummaryToRecal.push(sensor.parentAsset);
          sensorsToUpdate.push(sensor);
        }
      }
    }
    // # after caching all the sensor to update , update them at once for optimization process
    for (let upSensor of sensorsToUpdate) {
      await upSensor.save();
    }
    floorSummaryToRecal = _.uniq(floorSummaryToRecal);
    for (let floorId of floorSummaryToRecal) {
      // ! get last floorstate and adjust it with adjustment and creat new entry.
      let listofSensors = await AssetsService.getChildAssets(floorId);
      let states = await sensorLogService.floorStatescalulate(listofSensors);
      await sensorLogService.summaryFloorStates(states, floorId, "min/hour", "floorstate", moment());
    }
    if (floorSummaryToRecal.length > 0) {
      SocketIOService.onDataReceiveFromGateway();
    }
  } catch (err) {
    console.log("Error in background timer service of sensors : processSensors : ", err);
  }
}

function checkAlertState(sensor, timeNow) {
  let alertState = false;
  if (sensor.attributes.state && sensor.attributes.state == "warning") {
    let timeToCheck = stateCriteria.toAlertSeconds;
    sensor.attributes.alert && sensor.attributes.alert.duration && (timeToCheck = sensor.attributes.alert.duration);
    if (moment(moment(sensor.attributes.stateUpdateTime)).isBefore(timeNow.subtract(timeToCheck, "second"))) {
      alertState = true;
      sensor.attributes.state = "alert";
      sensor.attributes.stateUpdateTime = timeNow.toDate();
      sensor.markModified("attributes");
    }
  }
  return alertState;
}
function checkNetworkFailure(sensor, timeNow) {
  let networkFailure = false;

  if (
    sensor.attributes.state &&
    sensor.attributes.state !== "offline" &&
    moment(moment(sensor.attributes.dataReceiveTime)).isBefore(timeNow.subtract(stateCriteria.toNetworkFailure, "second"))
  ) {
    networkFailure = true;
    sensor.attributes.state = "offline";
    sensor.attributes.stateUpdateTime = timeNow.toDate();
    sensor.markModified("attributes");
  }
  return networkFailure;
}

function checkmoment() {
  let tn = moment();
  let val = moment().subtract(60, "seconds");

  let check = moment(moment(val).add(30, "second")).isAfter(tn);
  console.log(check);
}
