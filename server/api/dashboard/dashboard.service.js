let ServiceLocator = require("../../framework/servicelocator");
import SensorLogModel from "../sensorLog/sensorLog.modal.js";
import moment from "moment-timezone.js";
class DashboardService {
  async getDashboardData() {
    let resultObj;
    resultObj = { value: {} };

    try {
      let last24HoursLog = await SensorLogModel.find({ "createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }).exec();
      let prefSrcAvailRecs, standbySrcAvailRecs, bothAvailRecs;
      let prefSrcTime = 0, standbySrcTime = 0, alertStateTime = 0;
      if (last24HoursLog.length > 0) {
        prefSrcAvailRecs = last24HoursLog.filter(({ powerStatus }) => powerStatus == 'prefSrcAvail');
        standbySrcAvailRecs = last24HoursLog.filter(({ powerStatus }) => powerStatus == 'standbySrcAvail');
        bothAvailRecs = last24HoursLog.filter(({ powerStatus }) => powerStatus == 'alertState');

        if (prefSrcAvailRecs) {
          for (let prefSrc = 0; prefSrc < prefSrcAvailRecs.length; prefSrc++) {
            prefSrcTime += (prefSrcAvailRecs[prefSrc].updatedAt - prefSrcAvailRecs[prefSrc].createdAt) / 60000;
          }
        }

        if (standbySrcAvailRecs) {
          for (let standBysrc = 0; standBysrc < standbySrcAvailRecs.length; standBysrc++) {
            standbySrcTime += (standbySrcAvailRecs[standBysrc].updatedAt - standbySrcAvailRecs[standBysrc].createdAt) / 60000;
          }
        }

        if (bothAvailRecs) {
          for (let bothSrc = 0; bothSrc < bothAvailRecs.length; bothSrc++) {
            alertStateTime += (bothAvailRecs[bothSrc].updatedAt - bothAvailRecs[bothSrc].createdAt) / 60000;
          }
        }

      }
      resultObj.status = 200;
      resultObj.value.prefSrcAvailTime = prefSrcTime;
      resultObj.value.standbySrcAvailTime = standbySrcTime;
      resultObj.value.bothSrcAvailTime = alertStateTime;
    } catch (error) {
      console.log("getDashboardData Error: " + error);
      resultObj = { errorVal: error.toString(), status: 500 };
    }
    return resultObj;
  }

  async getSpecificChart(id) {

    let resultObj;
    resultObj = { value: {} };
    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    try {
      if (id) {
        let childAssets = await AssetsModel.find({ parentAsset: id, isRemoved: false }).exec();

        let time = Date.now() - 24 * 60 * 60 * 1000;
        let last24HoursLog = await SensorLogModel.find({ "createdAt": { $gt: new Date(Date.now() - 86400000), $lt: new Date(Date.now() - 60000) }, assetId: id }).exec();
        console.log("Last 24 hour Log Count: " + last24HoursLog.length);
        let prefSrcAvailRecs, standbySrcAvailRecs, bothAvailRecs;
        let prefSrcTime = 0, standbySrcTime = 0, alertStateTime = 0;
        if (last24HoursLog.length > 0) {
          prefSrcAvailRecs = last24HoursLog.filter(({ powerStatus }) => powerStatus == 'prefSrcAvail');
          standbySrcAvailRecs = last24HoursLog.filter(({ powerStatus }) => powerStatus == 'standbySrcAvail');
          bothAvailRecs = last24HoursLog.filter(({ powerStatus }) => powerStatus == 'alertState');

          if (prefSrcAvailRecs) {
            for (let prefSrc = 0; prefSrc < prefSrcAvailRecs.length; prefSrc++) {
                prefSrcTime += (prefSrcAvailRecs[prefSrc].updatedAt - prefSrcAvailRecs[prefSrc].createdAt) / 60000;
            }

          }

          if (standbySrcAvailRecs) {
            for (let standBysrc = 0; standBysrc < standbySrcAvailRecs.length; standBysrc++) {
                standbySrcTime += (standbySrcAvailRecs[standBysrc].updatedAt - standbySrcAvailRecs[standBysrc].createdAt) / 60000;
            }
          }

          if (bothAvailRecs) {
            for (let bothSrc = 0; bothSrc < bothAvailRecs.length; bothSrc++) {
                alertStateTime += (bothAvailRecs[bothSrc].updatedAt - bothAvailRecs[bothSrc].createdAt) / 60000;
            }
          }

        }
       // Average of assets at location
        if(childAssets.length > 0)
        {
          //console.log(childAssets.length);
          prefSrcTime = prefSrcTime/childAssets.length;
          standbySrcTime = standbySrcTime/childAssets.length;
          alertStateTime = alertStateTime/childAssets.length;
        }
        resultObj.status = 200;
        resultObj.value.prefSrcAvailTime = prefSrcTime;
        resultObj.value.standbySrcAvailTime = standbySrcTime;
        resultObj.value.bothSrcAvailTime = alertStateTime;
      }
    } catch (error) {
      console.log("getDashboardData Error: " + error);
      resultObj = { errorVal: error.toString(), status: 500 };
    }


    return resultObj;
  }

  async deleteTwoDayOldRecs() {

    var currentDate = new Date();
    var oldDate = moment(currentDate).subtract(2, 'days').toDate();

    if (oldDate) {
      SensorLogModel.deleteMany({ createdAt: { $lte: oldDate } }).then(function () {
        //  console.log("Two days old logs deleted"); // Success
      }).catch(function (error) {
        console.log(error); // Failure
      });
    }
  }

  async addTimeStamptoExistingLogs() {

    let sensorLogData = await SensorLogModel.find().exec();
    sensorLogData.forEach(async (logData) => {
      let logs = await SensorLogModel.find({ createdAt: logData.createdAt }).exec();

      let timeStampMilli = Date.parse(logs[0].createdAt);
      logs[0].timeStamp = timeStampMilli;

      let modify = new SensorLogModel(logs[0]);
      modify.save();
    });
  }
}
export default DashboardService;
