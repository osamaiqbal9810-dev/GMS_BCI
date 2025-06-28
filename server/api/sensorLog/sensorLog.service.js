import { temperature, humidity, sensorstate, sensordata, timeLimit, deforstTime, countbeforeWarning } from "./../../config/sensorconfig.js";
import utils from "../../utilities/utils.js";
import moment from "moment-timezone.js";
import { isJSON } from "../../utilities/isJson.js";
import e, { json } from "express.js";
import SensorLogModel from "./sensorLog.modal.js";
import _ from "lodash.js";
import { SupportedDeviceHelpers } from '../../helpers/index.js.js';

let ServiceLocator = require("../../framework/servicelocator");
var ObjectId = require("mongodb").ObjectID;
var turf = require("@turf/turf");
var fData;
var countDataPackets = 0;
let receivedDeviceData;
let timeOutObj ={

}
class SensorLogService {
  //main summary function
  async getAllSensorLogs(id) {
    let resultObj, SensorLogModel;
    resultObj = {};
    SensorLogModel = ServiceLocator.resolve("SensorLogModel");
    try {
      let sensorLogData = await SensorLogModel.find({ assetId: id }).sort({ date: -1 }).limit(1).exec();
      resultObj.value = sensorLogData;
      resultObj.status = 200;
    } catch (error) {
      resultObj.errorVal = error;
      resultObj.status = 500;
      console.log("Error occured in getAllSensorLogs : ", error);
    }
    return resultObj;
  }
  async getAllDeviceLogs() {
    let resultObj, SensorLogModel;
    resultObj = {};
    SensorLogModel = ServiceLocator.resolve("SensorLogModel");
    try {
      let sensorLogData = await SensorLogModel.find().sort({ date: -1 }).limit(100).exec();
      resultObj.value = sensorLogData;
      resultObj.status = 200;
    } catch (error) {
      resultObj.errorVal = error;
      resultObj.status = 500;
      console.log("Error occured in getAllSensorLogs : ", error);
    }
    return resultObj;
  }
  async sensorLogReceive(body) {

    let resultObj = {};
    let dateTimeService = ServiceLocator.resolve("DateTimeService");
    let SocketIOService = ServiceLocator.resolve("SocketIOService");
    try {
      let gateWayMsg = body;
      if (!gateWayMsg) throw "data received can not be parsed. please check if it is in proper JSON format and valid data";
      let dtTm = dateTimeService ? dateTimeService.getNowTime() : new Date();
      await this.saveSensorLog(gateWayMsg, dtTm);
      resultObj.value = "Success";
      resultObj.stauts = 200;
      // await this.summary(gateWayMsg, dtTm);
      // await this.cleanOlderData(dtTm);
      // SocketIOService.onDataReceiveFromGateway();
    } catch (err) {
      console.log("Error in sensorLogReceive : ", err);
      resultObj.errorVal = err;
      resultObj.status = 500;
    }

    return resultObj;
  }
  async summary(receivedData, dttm) {
    /* # improvements :
        -instead of assuming that sensor data received from gateway is from single floor , handle it as if it can be from  multiple floors
    */
    if (receivedData) {
      let AssetsService = ServiceLocator.resolve("AssetsService");
      let resultObj = await this.summaryCalculate(receivedData, dttm);
      if (resultObj.errorVal) {
        return resultObj;
      }
      if (resultObj.value && resultObj.value.length > 0) {
        for (let item of resultObj.value) {
          let listofSensors = await AssetsService.getChildAssets(item.floorId);
          let states;
          if (item.status) {
            states = await this.floorStatescalulate(listofSensors);
          } else {
            states = null;
          }
          await this.summaryFloorStates(states, item.floorId, "min/hour", "floorstate", dttm);
          resultObj.value = "Success";
        }
        // if (!resultObj.value.floorId) {
        //   resultObj.value = "Floor Not Added";
        //   return resultObj;
        // }
      } else {
        resultObj.value = "Floors Not Added";
        return resultObj;
      }
    } else {
      console.log("json invalid");
    }
  }

  async summaryCalculate(itemObj, dttm) {
    let sensorIds = [];
    let sensorsLogData = {};
    let sensorsList = itemObj.sensorsInfo;
    let floorIds = [];
    let resultObj = {};
    for (let sensorData of sensorsList) {
      sensorsLogData[sensorData.macAddress] = sensorData;
      sensorIds.push(sensorData.macAddress);
    }
    try {
      let AssetModel = ServiceLocator.resolve("AssetsModel");
      let criteria = { "attributes.sensorId": { $in: sensorIds } };
      let sensorsDoc = await AssetModel.find(criteria).exec();
      for (let sensorAsset of sensorsDoc) {
        let sensorLogData = sensorsLogData[sensorAsset.attributes.sensorId];
        let updatedData = await this.statusCalculate(sensorLogData, sensorAsset);
        let floorObj = { floorId: "", status: false };
        if (updatedData.state !== sensorAsset.attributes.state) {
          floorObj.status = true;
          floorObj.floorId = sensorAsset.parentAsset;
          let found = _.find(floorIds, { floorId: sensorAsset.parentAsset });
          if (!found) {
            floorIds.push(_.cloneDeep(floorObj));
          }
          sensorAsset.attributes.stateUpdateTime = dttm ? dttm : new Date();
        }

        sensorAsset.attributes.dataReceiveTime = dttm ? dttm : new Date();
        sensorAsset.attributes.warningCount = updatedData.cnt;
        sensorAsset.attributes.batteryHealthStatus = updatedData.batteryStatus;
        sensorAsset.attributes.batteryLevel = updatedData.batteryLevel;
        sensorAsset.attributes.rssiLevel = updatedData.rssiLevel;
        sensorAsset.attributes.data = sensorLogData;
        sensorAsset.attributes.state = updatedData.state;
        sensorAsset.markModified("attributes");
        await sensorAsset.save();
        let keys = Object.keys(sensordata);
        let summaryDataToSave = {};
        for (let key of keys) {
          summaryDataToSave[key] = sensorAsset.attributes.data[key];
        }
        await this.saveSensorSummary(summaryDataToSave, sensorAsset.id, "min/hour", "tempSensor", dttm);
      }
      resultObj = { value: floorIds, status: 200 };
    } catch (err) {
      console.log("Error in summaryCalculate : ", err);
      resultObj = { errorVal: err, status: 500 };
    }
    return resultObj;
  }

  // update status of sensor states
  async statusCalculate(sensorlog, sensor) {
    let obj = { state: "", cnt: 0, batteryStatus: "", batteryLevel: 0, rssiLevel: 0 };
    let criteriaList = {};
    try {
      let ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
      let criteria = sensor.attributes.deviceType
        ? {
          $and: [{ listName: { $ne: "offlineCriteria" } }, { $or: [{ code: sensor.attributes.deviceType }, { code: "battery" }] }],
        }
        : { $and: [{ listName: { $ne: "offlineCriteria" } }, { $or: [{ code: "default" }, { code: "battery" }] }] };

      let appLookUpList = await ApplicationLookupsService.getAllList(criteria);
      for (let item of appLookUpList.value) {
        criteriaList[item.listName] = item;
      }
      if (criteriaList.opt1 > sensorlog.batteryVoltage) {
        obj.batteryStatus = "bad";
      } else {
        obj.batteryStatus = "good";
      }

      obj.batteryLevel = await utils.getSensorVoltageLevel(sensorlog.batteryVoltage);
      obj.rssiLevel = await utils.getSensorRssiLevel(sensorlog.rssi);

      let defrostState = false;
      // # to check if state is defrost otherwise active or warning
      // if time now is between 16:00 and 17:00
      if (sensor.attributes.defrostCycles && sensor.attributes.defrostCycles.length > 0) {
        for (let dfTm of sensor.attributes.defrostCycles) {
          let newDate = new Date();
          let nowtime = moment().format("HH:mm:ss");
          let start = moment(newDate.toDateString() + " " + dfTm.startTime).format("HH:mm:ss");
          let end = moment(newDate.toDateString() + " " + dfTm.endTime).format("HH:mm:ss");
          if (nowtime > start && nowtime < end) {
            defrostState = true;
            obj.state = "defrost";
          }
        }
      }
      if (!defrostState) {
        if (
          sensorlog.temperature >= criteriaList["temperatureCriteria"].opt1 &&
          sensorlog.temperature <= criteriaList["temperatureCriteria"].opt2 &&
          sensorlog.humidity >= criteriaList["humidityCriteria"].opt1 &&
          sensorlog.humidity <= criteriaList["humidityCriteria"].opt2
        ) {
          obj.state = "active";
        } else {
          if (sensor.attributes.state == "alert") {
            obj.state = "alert";
          } else if (sensor.attributes.state && sensor.attributes.state !== "warning") {
            if (sensor.attributes.warningCount > criteriaList["warningCriteria"].opt1) {
              obj.state = "warning";
            } else {
              obj.state = "active";
              obj.cnt = sensor.attributes.warningCount + 1;
            }
          } else {
            obj.state = "warning";
          }
        }
      }
      // console.log("obj.state:" + obj.state);
    } catch (error) {
      return "Error" + error;
    }
    return obj;
  }

  async floorStatescalulate(list) {
    let sensorlist = list;
    let data = { ...sensorstate };
    let flag = false;
    if (sensorlist) {
      for (let sensor of sensorlist) {
        let keys = Object.keys(data);
        if (sensor.attributes.data) {
          for (let key of keys) {
            let state = sensor.attributes.state;
            if (state === key) {
              data[key] = data[key] + 1;
              flag = true;
              break;
            }
          }
        } else {
          data.offline = data.offline + 1;
          flag = true;
        }
        if (!flag) {
          data.offline = data.offline + 1;
        }
      }
    }
    return data;
  }

  async summaryFloorStates(states, id, timeframe, name, dateTime) {
    let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
    let summaryModel = {
      timeFrame: timeframe,
      date: moment(dateTime).utc().toDate(),
      summaryName: name,
      assetId: id,
      data: states,
    };
    if (states !== null) {
      let newSensorSummaryModel = new SensorSummaryModel(summaryModel);
      let savedSummary = await newSensorSummaryModel.save();
      return savedSummary;
    } else {
      let summary = await SensorSummaryModel.find({ assetId: id, summaryName: name }).sort({ date: "desc" }).limit(1).exec();
      if (summary.length > 0) {
        let lastupdate = summary[0];
        lastupdate.date = moment();
        let newSensorSummaryModel = new SensorSummaryModel(lastupdate);
        await newSensorSummaryModel.save();
      }
    }
  }

  // Get last updated states summary for check states change or not
  async getSummarylastdoc(id, name) {
    let resultObj;
    let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
    try {
      if (id) {
        let summary = await SensorSummaryModel.find({ assetId: id, summaryName: name }).sort({ date: "desc" }).limit(1).exec();
        if (summary.length > 0) {
          let lastupdate = summary[0];
          resultObj = { value: lastupdate, status: 200 };
        } else {
          resultObj = { value: "New", status: 200 };
        }
      }
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }

  // add new enter of summary table for floor states
  // async saveUpdateFloorStatus(prevData, newData) {
  //   let keys = Object.keys(prevData.value.data);
  //   for (let key of keys) {
  //     try {
  //       if (prevData.value.data[key] !== newData.data[key]) {
  //         let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
  //         let newSensorSummaryModel = new SensorSummaryModel(newData);
  //         let savedSummary = await newSensorSummaryModel.save();
  //         return savedSummary;
  //       }
  //     } catch (error) {
  //       console.log("saveUpdateFloorStatus Line 164", error);
  //     }
  //   }
  //   return { value: newData, status: 200 };
  // }

  async getFloorStateSummary(req) {
    let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
    let resultObj;
    let data = [];
    try {
      let summary = await SensorSummaryModel.find({ summaryName: "floorstate" }).sort({ date: "desc" }).exec();
      let keys = await SensorSummaryModel.find({ summaryName: "floorstate" }).distinct("assetId").exec();
      for (let key of keys) {
        for (let dat of summary) {
          if (key === dat.assetId) {
            data = [...data, ...[dat]];
            // console.log(dat);
            break;
          }
        }
      }
      // console.log(keys);
      resultObj = { value: data, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }
    return resultObj;
  }

  async cleanOlderData(dateTime) {
    let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
    let resultObj;
    try {
      let time = ((timeLimit.hour * 60 + timeLimit.min) * 60 + timeLimit.sec) * 1000;
      let currentDate = moment(dateTime ? dateTime : new Date()).utc();
      let deleteData = await SensorSummaryModel.remove({ updatedAt: { $lt: currentDate - time } });
      resultObj = { value: deleteData, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }

  async getSummaryHours(summaryHour) {
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
    let resultObj;
    try {
      let time = parseInt(summaryHour) * 60 * 60 * 1000;
      let currentDate = moment(new Date()).utc().toDate();
      let deleteTime = new Date(currentDate - time);
      let Summary = await SensorSummaryModel.find({ updatedAt: { $gt: deleteTime }, summaryName: "floorstate" })
        .sort({ date: "desc" })
        .exec();
      let data = { stateSummary: [], /* sensorSummary: [], sensorHourlySummary: [],*/ sensorData: [] };
      if (Summary.length > 0) {
        let filterFloorKeys = _.uniqBy(Summary, "assetId");
        for (let fkeys of filterFloorKeys) {
          for (let item of Summary) {
            if (item.summaryName === "floorstate" && fkeys.assetId === item.assetId) {
              data.stateSummary.push(item);
              break;
            }
            // else if (item.summaryName === "tempSensor") {
            //   if (item.timeFrame === "SlidingHour") {
            //     data.sensorHourlySummary.push(item);
            //   } else if (item.timeFrame === "runningHour") {
            //   } else {
            //     data.sensorSummary.push(item);
            //   }
            //}
          }
        }
      } else {
        resultObj = { errorVal: "Data Not Found", status: 500 };
      }
      let sensData = await AssetModel.find({ assetType: "Sensor" }).exec();
      for (let item of sensData) {
        let obj = { id: "", attributes: "", parentAsset: "" };
        obj.id = item.id;
        obj.parentAsset = item.parentAsset;
        obj.attributes = item.attributes;
        data.sensorData.push(_.cloneDeep(obj));
      }
      resultObj = { value: data, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }

  async getSensorSummary(id) {
    let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
    let ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
    let summaryData = { last24: [], lastHour: [] };
    let resultObj = {};
    let criteria = {
      $and: [{ listName: "timeLimit" }, { code: "time" }],
    };
    let timeLimitConfig = await ApplicationLookupsService.getAllList(criteria);
    try {
      let time = parseInt(timeLimitConfig.value[0].opt1) * 60 * 60 * 1000;
      let currentDate = moment(new Date()).utc().toDate();
      let deleteTime = new Date(currentDate - time);
      let Summary = await SensorSummaryModel.find({ assetId: id, updatedAt: { $gt: deleteTime } }).exec();
      if (Summary && Summary.length > 0) {
        for (let item of Summary) {
          if (item.summaryName === "tempSensor") {
            if (item.timeFrame === "SlidingHour") {
              summaryData.lastHour.push(item);
            } else if (item.timeFrame === "runningHour") {
            } else {
              summaryData.last24.push(item);
            }
          }
        }
        resultObj = { value: summaryData, status: 200 };
      } else {
        resultObj = { errorVal: "Data Not Found", status: 500 };
      }
    } catch (error) {
      console.log(error);
    }
    return resultObj;
  }
  async reportCommFailure( assetId, suppDevice,data) {
    let AssetModel = ServiceLocator.resolve("AssetsModel");
   
    if (data && data.data && data.data.error) {
      let assets = await AssetModel.find().exec();
      let foundData = assets.find(({ _id }) => _id == assetId);
      if (data.data.error.hasOwnProperty('code') && data.data.error.hasOwnProperty('message') && foundData.commStatus == false) {
        AssetModel.updateOne({ _id: assetId }, { $set: { commStatus: true } }).exec();
        let NotificationService = ServiceLocator.resolve("NotificationService");
        let code = data.data.error.code;
        let description = data.data.error.message;
        NotificationService.createCommFailureNotification(assetId, code, description, suppDevice.type);
      }
    }
  }
  
  async saveSensorLog(data, dateTime) {
    let sensorLog = ServiceLocator.resolve("SensorLogModel");
    let SocketIOService = ServiceLocator.resolve("SocketIOService");
    let TilesService = ServiceLocator.resolve("TilesService");
    let resultObj;
    let sensorInfo = [];

    try {
      if (data) {
        receivedDeviceData = data;
        // if(data.data.hasOwnProperty('error') == false)
        // {
        let { assetId } = data.data;
        let sensorLogModel = {
          date: dateTime
        };
        let AssetModel = ServiceLocator.resolve("AssetsModel");
        let NotificationService = ServiceLocator.resolve("NotificationService");
        let assets = await AssetModel.find().exec();

        let newModel = new sensorLog(sensorLogModel);
        let foundData = assets.find(({ _id }) => _id == assetId);
        let { suppDevice } = foundData;
        let interPretedValue = await SupportedDeviceHelpers.interpretData(data.data.data, suppDevice, foundData.state, ServiceLocator.resolve("DeviceModel"), foundData);
        AssetModel.updateOne({ _id: assetId }, { $set: { state: interPretedValue } }).exec();
        let stateArray = [];
        let stateUpdate = assets.find(({ _id }) => _id == assetId);
        stateArray.push(stateUpdate);
        SocketIOService.onDataReceiveFromGateway(stateArray);

        //for notifications
        NotificationService.createNotification(assetId, foundData.state, interPretedValue);

        //comm failure
        
        if (data.data.error !== null && Object.keys(data.data.error).length > 0) {
          
          if (data.data.error.hasOwnProperty('code') && data.data.error.hasOwnProperty('message') && foundData.commStatus == false && foundData.errorTimerStarted == false) {

            AssetModel.updateOne({ _id: assetId }, { $set: { errorTimerStarted: true } }).exec();
            let timeOut = (assetId,suppDevice,data) => {
              timeOutObj[assetId+"-"+foundData._id] =  setTimeout( () => {this.reportCommFailure(assetId,suppDevice,data);}, 300000);
              }
            timeOut(assetId,suppDevice,data);
          }
        }
        else if (data.data.error == null && foundData.commStatus == true) {
          AssetModel.updateOne({ _id: assetId }, { $set: { commStatus: false } }).exec();
          let NotificationService = ServiceLocator.resolve("NotificationService");
          NotificationService.createCommRestoreNotification(assetId, suppDevice.type);
          clearTimeout(timeOutObj[assetId+"-"+foundData._id]);
          delete timeOutObj[assetId+"-"+foundData._id];
        }
        else if(data.data.error !== null && foundData.commStatus == false && foundData.errorTimerStarted == true){
          //do nothing
        }
        else
        {
          AssetModel.updateOne({ _id: assetId }, { $set: { errorTimerStarted: false } }).exec();
          clearTimeout(timeOutObj[assetId+"-"+foundData._id]);
          delete timeOutObj[assetId+"-"+foundData._id];
        }

        // for tiles summary/status
        TilesService.computeAssetStatus(data.data, foundData, interPretedValue);
        // for pie chart summary

        if (foundData && foundData.suppDevice && foundData.commStatus == false && foundData.suppDevice.type == "ATS") {

          newModel.assetId = foundData.levels[2];
          newModel.validFlag = true;
          newModel.timeStamp = Date.now();
          newModel.gensetId = assetId;
          if (interPretedValue.hasOwnProperty('systemOverview')) {
            if (interPretedValue.systemOverview.hasOwnProperty('value')) {
              let { prefSrcAvail, standbySrcAvail } = interPretedValue.systemOverview.value || undefined;

              if (prefSrcAvail && standbySrcAvail) {

                if (prefSrcAvail == "Yes") {
                  newModel.powerStatus = "prefSrcAvail";
                }
                else if (standbySrcAvail == "Yes") {
                  newModel.powerStatus = "standbySrcAvail";
                }
                if (prefSrcAvail == "Yes" && standbySrcAvail == "Yes") {
                  newModel.powerStatus = "alertState";
                }
              }
            }
          }

          let findparentAsset = assets.find(({ _id }) => _id == foundData.parentAsset);

          if (findparentAsset) {
            //console.log(findparentAsset);
            let findSummaryLogs = await sensorLog.find({ assetId: findparentAsset.parentAsset, gensetId: assetId, validFlag: true }).exec();
            if (findSummaryLogs && findSummaryLogs.length > 0 && newModel && newModel.powerStatus) {

              SensorLogModel.findOneAndUpdate(
                { _id: findSummaryLogs[0]._id },
                { $set: { updatedAt: new Date(), validFlag: false } },
                { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                function (err, doc) {
                  if (err) {
                    console.log("Something wrong when updating data!");
                  }
                });

              let savedSummary = await sensorLog.insertMany(newModel);
              resultObj = { value: savedSummary, status: 200 };
            }
            else {
              if (newModel && newModel.powerStatus) {
                let savedSummary = await sensorLog.insertMany(newModel);
                resultObj = { value: savedSummary, status: 200 };
              }
            }
          }
        }
      } else {
        resultObj = { value: "Device Information Not received", status: 500 };
      }
      return resultObj;
    }
    catch (error) {
      console.log("Save Sensor Log " + error);
    }
  }

  //check for check sensor data in summary table
  async isExistSensorData(data, sId, name) {
    let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
    let flag = true;
    let foundData = await SensorSummaryModel.find({ assetId: sId, summaryName: name }).sort({ date: "desc" }).limit(1).exec();
    if (foundData.length > 0) {
      let currentHourStart = moment().startOf("hour");
      let prevHourStart = foundData[0].date;
      flag = currentHourStart.isSame(prevHourStart, "hour");
    } else {
      flag = false;
    }
    return flag;
  }

  // async sensorSummayHour(data, sId, timeframe, name) {
  //   let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
  //   let sensorSum;
  //   let summaryModel = {
  //     timeFrame: timeframe,
  //     date: moment().startOf("hour"),
  //     summaryName: name,
  //     assetId: sId,
  //     data: {},
  //   };
  //   let dat = await this.isExistSensorData(data, sId, name);
  //   if (!dat) {
  //     sensorSum = await this.calculateSensorSummary(sId);
  //     summaryModel.data = sensorSum;
  //     summaryModel.date = moment().startOf("hour");
  //     let newSensorSummaryModel = new SensorSummaryModel(summaryModel);
  //     let savedSummary = await newSensorSummaryModel.save();
  //   }
  // }

  async saveSensorSummary(dat, sId, timeframe, name, dttm) {
    let SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
    let summaryModel = {
      timeFrame: timeframe,
      date: null,
      summaryName: name,
      assetId: sId,
      data: {},
    };
    let foundData = await SensorSummaryModel.find({ assetId: sId, summaryName: "tempSensor", timeFrame: "runningHour" }).exec();
    let objSensorRecord = { sensDate: dttm ? moment(dttm).toDate() : new Date(), sensData: {} };
    let currentDate = moment(dttm ? dttm : new Date());
    await this.saveSlidingHour(SensorSummaryModel, currentDate, { ...objSensorRecord }, dat, sId);
    if (foundData.length > 0) {
      let dbTime = moment(foundData[0].date);
      let running = dbTime.isSame(moment(currentDate), "hour");
      // let after = dbTime.add(1, "hour").isAfter(moment(currentDate), "hour");
      // let currentTime = moment(currentDate)endOf("hour");
      // let tm = dbTime.isBefore(moment(currentDate), "hour") && dbTime.add(1, "hour").isAfter(moment(currentDate), "hour");
      if (running) {
        objSensorRecord.sensData = dat;
        foundData[0].data.sensorRecord.push(objSensorRecord);
        foundData[0].markModified("data");
        await foundData[0].save();
      } else {
        let hourSumData = await this.calculateSensorSummary(foundData[0].data.sensorRecord);
        let endOfDbTime = moment(dbTime).add(1, "h");
        let startofHour = moment(dttm);
        summaryModel.date = endOfDbTime;
        summaryModel.summaryName = "tempSensor";
        summaryModel.data = { processData: hourSumData, rawData: foundData[0].data.sensorRecord };
        summaryModel.timeFrame = timeframe;
        let newSensorSummaryModel = new SensorSummaryModel(summaryModel);
        await newSensorSummaryModel.save();
        await this.saveSensorReport(endOfDbTime.startOf("hour"), sId, "hourly", hourSumData);
        objSensorRecord.sensDate = moment(currentDate).toDate();
        objSensorRecord.sensData = dat;
        foundData[0].date = startofHour;
        foundData[0].data = { sensorRecord: [objSensorRecord] };
        foundData[0].markModified("data");
        await foundData[0].save();
      }
    } else {
      objSensorRecord.sensData = dat;

      summaryModel.date = dttm ? moment(dttm).startOf("hour") : moment().startOf("hour");
      summaryModel.summaryName = "tempSensor";
      summaryModel.data = { sensorRecord: [objSensorRecord] };
      summaryModel.timeFrame = "runningHour";
      let newSensorSummaryModel = new SensorSummaryModel(summaryModel);
      await newSensorSummaryModel.save();
    }
  }
  async saveSlidingHour(SensorSummaryModel, currentTime, sensorObj, dat, sId) {
    let slidingSensor = {
      timeFrame: "SlidingHour",
      date: currentTime.toDate(),
      summaryName: "tempSensor",
      assetId: sId,
      data: { sensorObj },
    };
    sensorObj.sensData = dat;
    let prevSlidingHour = await SensorSummaryModel.findOne({ summaryName: "tempSensor", timeFrame: "SlidingHour", assetId: sId }).exec();
    if (prevSlidingHour) {
      prevSlidingHour.data.sensorRecord.push(sensorObj);
      _.remove(prevSlidingHour.data.sensorRecord, (s) => {
        return moment(s.sensDate).isBefore(moment(currentTime).subtract(60, "minute"));
      });
      prevSlidingHour.markModified("data");
      await prevSlidingHour.save();
    } else {
      slidingSensor.data = { sensorRecord: [sensorObj] };
      let s = new SensorSummaryModel(slidingSensor);
      await s.save();
    }
  }

  // save report in report collection
  async saveSensorReport(date, id, timeframe, data) {
    let SensorReportModel = ServiceLocator.resolve("SensorReportModel");
    let ReportModel = {
      date: "",
      assetId: "",
      timeFrame: "",
      data: {},
    };
    ReportModel.date = date;
    ReportModel.assetId = id;
    ReportModel.data = data;
    ReportModel.timeFrame = timeframe;
    let newSensorSummaryModel = new SensorReportModel(ReportModel);
    await newSensorSummaryModel.save();
  }

  async calculateSensorSummary(sumdata) {
    let sumData = { temperature: { min: 0, max: 0, avg: 0 }, humidity: { min: 0, max: 0, avg: 0 } };
    let sumTemp = 0;
    let sumHumi = 0;
    // let foundData = await this.getSensorLog(1, "hour", sId);
    if (sumdata.length > 0) {
      sumData.temperature.min = sumdata[0].sensData.temperature;
      sumData.temperature.max = sumdata[0].sensData.temperature;
      sumData.humidity.min = sumdata[0].sensData.humidity;
      sumData.humidity.max = sumdata[0].sensData.humidity;

      for (let item of sumdata) {
        sumTemp = sumTemp + item.sensData["temperature"];
        sumHumi = sumHumi + item.sensData["humidity"];
        if (sumData.temperature.min > item.sensData["temperature"]) {
          sumData.temperature.min = item.sensData["temperature"];
        }
        if (sumData.temperature.max < item.sensData["temperature"]) {
          sumData.temperature.max = item.sensData["temperature"];
        }
        if (sumData.humidity.min > item.sensData["humidity"]) {
          sumData.humidity.min = item.sensData["humidity"];
        }
        if (sumData.humidity.max < item.sensData["humidity"]) {
          sumData.humidity.max = item.sensData["humidity"];
        }
      }
      sumData.temperature.avg = sumTemp / sumdata.length;
      sumData.humidity.avg = sumHumi / sumdata.length;
    }

    return sumData;
  }

  //time value set hour or minute in number(1 to 60)
  //timeType value set "hour" or "minute" in string
  async getSensorLog(time, timeType, sId = "All") {
    try {
      let sensorLog = ServiceLocator.resolve("SensorLogModel");
      // Fetch data from the start of the day
      let timeFilter = moment().startOf("day").subtract(time, timeType);
      let foundData = await sensorLog
        .find(sId === "All" ? { createdAt: { $gt: timeFilter } } : { sensorId: sId, createdAt: { $gt: timeFilter } })
        .exec();
      return foundData;
    } catch (error) {
      console.log("Error line 362", error);
    }
  }

  // get defrost cycle of sensor
  async detectDefrostCycles(sId) {
    let resultObj;
    let defrostCycles = [];
    try {
      let ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
      // Fetch the minimum duration of a defrost cycle from AppLookup
      let appLookUpList = await ApplicationLookupsService.getAllList({ code: "defrost" });
      let minDefrostTimeInSeconds = appLookUpList.value[0].opt1; // seconds
      // TODO: Get the number of days to look for from AppLookup i.e. 2
      // TODO: Get sensor log data (based on UTC time) for last 3 days from 12:00 AM to next day's 12:00 AM.
      let numberOfDaysForDefrost = 2;
      let data = await this.getSensorLog(numberOfDaysForDefrost, "days", sId);
      if (data.length > 0) {
        let firstDayData = _.filter(data, function (o) {
          return moment(o.date) > moment().startOf("day").subtract(1, "day") && moment(o.date) < moment().startOf("day");
        });
        let secondDayData = _.filter(data, function (o) {
          return (
            moment(o.date) > moment().startOf("day").subtract(2, "days") && moment(o.date) < moment().startOf("day").subtract(1, "day")
          );
        });
        let expectedDefCyclesFirstDay = this.detectSensorDefrostCycles(firstDayData, minDefrostTimeInSeconds);
        let expectedDefCyclesSecondDay = this.detectSensorDefrostCycles(secondDayData, minDefrostTimeInSeconds);
        // TODO: Update following condition according to {numberOfDaysForDefrost} parameter
        if (expectedDefCyclesSecondDay.length > 0 && expectedDefCyclesFirstDay.length > 0) {
          defrostCycles = this.verifyDetectedDefrostCycle(expectedDefCyclesSecondDay, expectedDefCyclesFirstDay);
        }

        // Time Fomatting
        for (let i = 0; i < defrostCycles.length; i += 1) {
          let defrostHeaterDuration = (moment(defrostCycles[i].endTime) - moment(defrostCycles[i].startTime)) / (1000 * 60);
          defrostCycles[i].startTime = moment(defrostCycles[i].startTime).format("hh:mm A");
          defrostCycles[i].endTime = moment(defrostCycles[i].endTime).add(defrostHeaterDuration, "minutes").format("hh:mm A");
        }
        // console.log(defrostCycles);

        if (defrostCycles.length > 0) {
          resultObj = { value: defrostCycles, status: 200 };
        } else {
          resultObj = {
            value: { Error: "data not found. At least " + numberOfDaysForDefrost + " days data enter in system" },
            status: 200,
          };
        }
      } else {
        resultObj = { value: { Error: "data not found. At least " + numberOfDaysForDefrost + " days data enter in system" }, status: 200 };
      }
    } catch (err) {
      console.log("Error in detect defrost cycles : ", err);
      resultObj = { errorVal: err, status: 500 };
    }

    return resultObj;
  }

  detectSensorDefrostCycles(sensorData, defrostTimeLimit) {
    let defrostCycles = [];
    if (sensorData.length > 0) {
      let temporaryTemp = sensorData[0].data["temperature"];
      let increasedTemp = [];
      for (let i = 0; i < sensorData.length; i++) {
        if (temporaryTemp <= sensorData[i].data["temperature"]) {
          increasedTemp.push(sensorData[i]);
        } else {
          if (increasedTemp.length > 0) {
            let cycleData = _.sortBy(increasedTemp, "date");
            let timeDiff = moment(cycleData[cycleData.length - 1].date).diff(cycleData[0].date, "seconds");
            // console.log(timeDiff);
            if (timeDiff > defrostTimeLimit) {
              let defrostCycleObj = { startTime: "", endTime: "", lowTemp: "", hightemp: "" };
              defrostCycleObj.startTime = moment(cycleData[0].date);
              defrostCycleObj.endTime = moment(cycleData[cycleData.length - 1].date);
              defrostCycleObj.lowTemp = cycleData[0].data["temperature"];
              defrostCycleObj.hightemp = cycleData[cycleData.length - 1].data["temperature"];
              defrostCycles.push(defrostCycleObj);
            }
            increasedTemp = [];
          }
        }
        temporaryTemp = sensorData[i].data["temperature"];
      }
    }
    return defrostCycles;
  }
  verifyDetectedDefrostCycle(firstData, secondData) {
    let verifiedCycles = [];
    for (let fItem of firstData) {
      let fStart = moment(fItem.startTime).format("H:mm");
      let fEnd = moment(fItem.endTime).format("H:mm");
      for (let secItem of secondData) {
        let secStart = moment(secItem.startTime).format("H:mm");
        let secEnd = moment(secItem.endTime).format("H:mm");
        if (fStart === secStart && fEnd === secEnd) {
          verifiedCycles.push(secItem);
          break;
        } else {
          let startDiff = this.getMinDiff(fItem.startTime, secItem.startTime);
          let endDiff = this.getMinDiff(fItem.endTime, secItem.endTime);
          if (startDiff <= 4 && endDiff <= 4) {
            verifiedCycles.push(secItem);
            break;
          }
        }
      }
    }

    return verifiedCycles;
  }

  getMinDiff(_date1, _date2) {
    let currDate = new Date();
    let date1 = new Date(_date1);
    let date2 = new Date(_date2);
    date1.setDate(currDate.getDate());
    date2.setDate(currDate.getDate());
    // let date2Local = new Date(date2.toLocaleTimeString())
    let timeDiff = date1 - date2;
    let minutes = Math.abs(Math.round(timeDiff / (1000 * 60)));
    return minutes;
  }

  // dateDifference(date1, date2) {
  //   let timeDiff;
  //   if (date1 < date2) {
  //     let diff = moment(date1).add(3, "minutes").format("H:mm");
  //     if (diff >= moment(date2).format("H:mm")) {
  //       timeDiff = true;
  //     } else {
  //       timeDiff = false;
  //     }
  //   } else {
  //     let diff = moment(date2).add(3, "minutes").format("H:mm");
  //     if (diff >= moment(date1).format("H:mm")) {
  //       timeDiff = true;
  //     } else {
  //       timeDiff = false;
  //     }
  //   }
  //   return timeDiff;
  // }

  // readDataFile(fileName) {
  //   const fs = require("fs");
  //   try {
  //     const data = fs.readFileSync(fileName, "utf8");
  //     let jsonData = JSON.parse(data);
  //     console.log(jsonData);
  //     return jsonData;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}
export default SensorLogService;
