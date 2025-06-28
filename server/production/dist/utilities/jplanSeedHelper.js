"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _issue;

exports.jPlanSeedHelper = jPlanSeedHelper;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _UUID = require("./UUID");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyPlanModel = require("./../api/journeyPlan/journeyPlan.model");
function jPlanSeedHelper(numberOf) {
  if (!numberOf) {
    numberOf = 1;
  }
  JourneyPlanModel.find({}, function (err, data) {
    if (err || !data || data.length == 0) {
      var jPlans = getJplans(numberOf);
      jPlans.forEach(function (plan) {
        JourneyPlanModel.create(plan);
      });
    }
  });
}

function getJplans(count) {
  var jPlans = [];
  for (var j = 0; j < count; j++) {
    var newjPlan = (0, _extends3.default)({}, jPlanObj);
    var oldjPlan = (0, _extends3.default)({}, jPlanObj);
    newjPlan.date = new Date((0, _moment2.default)().add(j, "d"));
    oldjPlan.date = new Date((0, _moment2.default)().subtract(j + 1, "d"));
    oldjPlan.title = newjPlan.title + "-" + j;
    newjPlan.title = newjPlan.title + "-" + (count + j);
    var randomNum = Math.floor(Math.random() * (count - 1) + 1);
    var tasksNew = [];
    var tasksOld = [];
    for (var t = 0; t < randomNum; t++) {
      var newTask = (0, _extends3.default)({}, task);
      var oldTask = (0, _extends3.default)({}, task);
      newTask.title = newTask.title + "-" + t;
      oldTask.title = oldTask.title + "-" + (t + randomNum);
      var randomUnits = Math.floor(Math.random() * (6 - 1) + 1);
      var newTaskUnits = [];
      var oldTaskUnits = [];
      for (var u = 1; u <= randomUnits; u++) {
        var newUnit = (0, _extends3.default)({}, units["unit" + u]);
        var oldUnit = (0, _extends3.default)({}, units["unit" + (6 - u)]);
        newTaskUnits.push(newUnit);
        oldTaskUnits.push(oldUnit);
      }
      newTask.units = newTaskUnits;
      oldTask.units = oldTaskUnits;
      var oldIssues = [];
      // To check wether to add Issues in task or not
      var addIssues = _lodash2.default.sample([true, false]);
      if (addIssues) {
        var randomIssues = Math.floor(Math.random() * (4 - 1) + 1);
        for (var i = 0; i < randomIssues; i++) {
          var oldIssue = (0, _extends3.default)({}, issue);
          oldIssue.description = oldIssue.description + i;
          var maxVal = oldTask.units.length - 1;
          var issueTrackIdIndex = Math.floor(Math.random() * (maxVal - 0) + 0);
          oldIssue.trackId = oldTask.units[issueTrackIdIndex].unitId;
          var priority = ["High", "Medium", "Low", "Info"];
          var category = ["Tiles", "Rails", "Joint Bar", "Switch", "Spikes"];
          var selectCategory = Math.floor(Math.random() * (5 - 0) + 0);
          oldIssue.category = category[selectCategory];
          var selectPriority = Math.floor(Math.random() * (3 - 0) + 0);
          oldIssue.priority = priority[selectPriority];
          oldIssues.push(oldIssue);
        }
        oldTask.issues = oldIssues;
      }

      tasksNew.push(newTask);
      tasksOld.push(oldTask);
    }
    newjPlan.tasks = tasksNew;
    oldjPlan.tasks = tasksOld;
    jPlans.push(newjPlan);
    jPlans.push(oldjPlan);
  }
  return jPlans;
}

var jPlanObj = {
  supevisor: "",
  user: { id: "5b8950f78aae6dadfc2721c5", name: "admin" },
  date: "",
  title: "Plan",
  tasks: []
};

var task = {
  taskId: (0, _UUID.guid)(),
  taskDate: "",
  startLocation: "",
  endLocation: "",
  startTime: "",
  endTime: "",
  status: "",
  title: "Task",
  desc: "Not Available",
  notes: "Not Available",
  imgs: "defaultTask.jpg",
  units: [],
  issues: []
};

var units = {
  unit1: { id: "29143a56-27fb-1132-9aa9-51d784dedd10", unitId: "T001-U001", track_id: "5bf7eb2c5a6dd143e4dd0101" },
  unit2: { id: "29143a56-27fb-1132-9aa9-51d784dedd11", unitId: "T001-U002", track_id: "5bf7eb2c5a6dd143e4dd0101" },
  unit3: { id: "29143a56-27fb-1132-9aa9-51d784dedd12", unitId: "T001-U003", track_id: "5bf7eb2c5a6dd143e4dd0101" },
  unit4: { id: "29143a56-27fb-1132-9aa9-51d784dedd13", unitId: "T002-U001", track_id: "5bf7eb2c5a6dd143e4dd0102" },
  unit5: { id: "29143a56-27fb-1132-9aa9-51d784dedd14", unitId: "T003-U001", track_id: "5bf7eb2c5a6dd143e4dd0103" },
  unit6: { id: "29143a56-27fb-1132-9aa9-51d784dedd15", unitId: "T004-U001", track_id: "5bf7eb2c5a6dd143e4dd0104" }
};

var issue = (_issue = {
  description: "issue",
  location: "31.578934, 74.308607",
  category: "Rails",
  trackId: "T001-U001"
}, (0, _defineProperty3.default)(_issue, "description", "Issue Because of This"), (0, _defineProperty3.default)(_issue, "imgList", [{
  imgName: "defaultIssue1.jpg",
  status: 1
}, {
  imgName: "defaultIssue2.jpg",
  status: 0
}]), (0, _defineProperty3.default)(_issue, "marked", true), (0, _defineProperty3.default)(_issue, "priority", "Info"), (0, _defineProperty3.default)(_issue, "status", ""), (0, _defineProperty3.default)(_issue, "timeStamp", ""), _issue);