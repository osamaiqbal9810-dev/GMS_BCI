"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var temperature = exports.temperature = { min: -7, max: 7 }; // temperature limits
var humidity = exports.humidity = { min: 20, max: 70 }; // humidity limits
var timeLimit = exports.timeLimit = { hour: 25, min: 0, sec: 0 }; // for clean summary data
// sensor states
var sensorstate = exports.sensorstate = {
  active: 0,
  warning: 0,
  alert: 0,
  defrost: 0,
  offline: 0,
  comFailure: 0
};
var sensordata = exports.sensordata = {
  temperature: 0,
  humidity: 0
};
//defrost start and end time
var deforstTime = exports.deforstTime = [{ startTime: "2021-02-25 18:00:00", endTime: "2021-02-25 18:30:00" }];
//  set initial criteria of alert state and offline state
var stateCriteria = exports.stateCriteria = {
  toAlertSeconds: 600, //seconds
  toNetworkFailure: 900 //seconds
};
var countbeforeWarning = exports.countbeforeWarning = 3;