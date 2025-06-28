import utils from "../../utilities/utils.js";
import moment from "moment-timezone.js";
import _ from "lodash.js";

let ServiceLocator = require("../../framework/servicelocator");

class SensorReportService {
  async getSensorReport(body) {
    // console.log(body);
    let SensorReportModel = ServiceLocator.resolve("SensorReportModel");
    let assetsModel = ServiceLocator.resolve("AssetsModel");
    let ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
    let criteriaList = {};
    let resultObj = {};
    try {
      // Added because we need to include this full day
      let params = { assetId: body.assetId, startTime: body.startTime, endTime: moment(body.endTime).add(1, "days") };
  
      // console.log("new params = " + JSON.stringify(params));
      let assets = await assetsModel.find({ _id: params.assetId});
      let deviceInfo = {deviceName: "NA", currTemp: "NA", currHumidity: "NA", currState: "NA", deviceType: "NA", idealTemperature: {min: "NA", max: "NA"} };
      if (assets.length == 1) {
        deviceInfo.deviceName = assets[0].attributes.sensorName;
        deviceInfo.currTemp = assets[0].attributes.data.temperature;
        deviceInfo.currHumidity = assets[0].attributes.data.humidity;
        deviceInfo.currState = assets[0].attributes.state;
        deviceInfo.deviceType = assets[0].attributes.deviceType;
        // deviceInfo.idealTemperature = 
      }

      let appLookupCriteria = deviceInfo.deviceType
        ? {
            $and: [{ listName: { $ne: "offlineCriteria" } }, { $or: [{ code: deviceInfo.deviceType }] }],
          }
        : { $and: [{ listName: { $ne: "offlineCriteria" } }, { $or: [{ code: "default" }] }] };

      let appLookUpList = await ApplicationLookupsService.getAllList(appLookupCriteria);
      for (let item of appLookUpList.value) {
        criteriaList[item.listName] = item;
      }

      deviceInfo.idealTemperature.min = criteriaList["temperatureCriteria"].opt1;
      deviceInfo.idealTemperature.max = criteriaList["temperatureCriteria"].opt2;

      let criteria = {
        $and: [
          { assetId: params.assetId },
          { date: { $gt: params.startTime, $lte: params.endTime } },
        ],
      };
      let sensorReport = await SensorReportModel.find(criteria).sort({ date: 1 }).exec();
      //console.log(sensorReport);
      let reportData = this.reportDataFormater(sensorReport);
      reportData.generatedDate = moment().toISOString();
      reportData.deviceInfo = deviceInfo;
      resultObj.value = reportData;
      console.log(reportData);
    } catch (error) {
      resultObj.errorVal = error;
      resultObj.status = 500;
    }
    return resultObj;
  }

  reportDataFormater(reportData) {
    let resObject = { report: { days: [] } };
    if (reportData && reportData.length > 0) {

      let sensorGroupData = this.groupByDate(reportData);
      //console.log(sensorGroupData);

      let HOURS_IN_A_DAY = 24;
      let NO_OF_DURATIONS = 6;    // todo: fetch from configurations 
      let single_duration_time = HOURS_IN_A_DAY / NO_OF_DURATIONS;
      // Create Hour durations
      sensorGroupData.forEach(dailyData => {
        let dayObj = { day: "", date: "", durations: [] };
        // get date in string
        dayObj.date = _.cloneDeep(moment(dailyData.date).format('DD/MM/YYYY'));
        // get day in string
        dayObj.day = _.cloneDeep(moment(dailyData.date).format("dddd"));

        for (let i = 0; i < NO_OF_DURATIONS; i++) {
          let duration_start = moment(dailyData.date).startOf('day').add(single_duration_time * i, "hours");
          let duration_end = moment(dailyData.date).startOf('day').add(single_duration_time * (i+1), "hours");
          let duration = duration_start.format("hh:mm A") + " to " + duration_end.format("hh:mm A");
          let durationObj = { duration: duration };
          // iterate through all possible properties (todo: update following list if news sensors or attributes get added in future)
          let properties = ["temperature", "humidity"]
          properties.forEach(property => {
            durationObj[property] = {min: "NA", max: "NA", avg: "NA"};
            let count = 0;
            let avg = 0;
            let sum = 0;
            let min = +1000000;
            let max = -1000000;
            dailyData.data.forEach(singleday => {
              let date = moment(singleday.date);
              let data = singleday.data;
              if (data.hasOwnProperty(property)) {
                if (date > duration_start && date <= duration_end) {
                    
                  if (data[property].min < min) {
                    min = data[property].min;
                  }
                  if (data[property].max > max) {
                    max = data[property].max;
                  }
                  sum += data[property].avg;
                  count += 1;
                  if (count > 0) {
                    avg = sum / count;
                  }
                }
              }
              if (min != 1000000 && max != -1000000){
                durationObj[property] = {min: min.toFixed(2), max: max.toFixed(2), avg: avg.toFixed(2)};  
              }
              
            });

          });
          dayObj.durations.push(durationObj);
        }

        // add day's report object 
        resObject.report.days.push(dayObj);      
      });

    }
    // console.log(resObject);
    return resObject;
  }

  groupByDate(data) {
    let groupByDateData = [];
    let groupByObj = { date: "", data: [] };
    let count = 0;
      
    for (let ele of data) {
      if (count == 0) {
        groupByObj = { date: moment(ele.date).startOf("day"), data: [] };
      }
      if (moment(groupByObj.date).isSame(ele.date, "date"))
      {
        groupByObj.data.push(ele);
        count += 1;
      }
      else if (moment(groupByObj.date).isSame(moment(ele.date).subtract(1, "days"), "date") && moment(ele.date).hour() == 0) {
        count = 0;
        groupByObj.data.push(ele);
        groupByDateData.push(_.cloneDeep(groupByObj));
      }
    }
    if (count > 0) {
      groupByDateData.push(_.cloneDeep(groupByObj));
    }
    return groupByDateData;
  }
}
export default SensorReportService;
