"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timpsStatus = exports.timpsApp = undefined;

var _wPlanTemplate = require("./api/wPlanTemplate/wPlanTemplate.service");

var _wPlanTemplate2 = _interopRequireDefault(_wPlanTemplate);

var _task = require("./api/task/task.service");

var _task2 = _interopRequireDefault(_task);

var _WPTService = require("./service/WPTService");

var _WPTService2 = _interopRequireDefault(_WPTService);

var _ValidationUtils = require("../utilities/ValidationUtils");

var _ValidationUtils2 = _interopRequireDefault(_ValidationUtils);

var _journeyPlan = require("./api/journeyPlan/journeyPlan.service");

var _journeyPlan2 = _interopRequireDefault(_journeyPlan);

var _testSchedules = require("./api/testSchedules/testSchedules.service");

var _testSchedules2 = _interopRequireDefault(_testSchedules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../framework/servicelocator");
var timpsApp = exports.timpsApp = function timpsApp(log4js) {
  var validationUtil = new _ValidationUtils2.default();
  ServiceLocator.register("ValidationUtil", validationUtil);
  // let workplanTemplateAssetGroupService = new WPTService(log4js.getLogger("WPTService"), validationUtil);
  // ServiceLocator.register("WorkplanTemplateService", workplanTemplateAssetGroupService);
  var workPlanTemplateService = new _wPlanTemplate2.default();
  ServiceLocator.register("WorkPlanTemplateService", workPlanTemplateService);
  var taskService = new _task2.default();
  ServiceLocator.register("TaskService", taskService);
  var journeyPlanService = new _journeyPlan2.default();
  ServiceLocator.register("JourneyPlanService", journeyPlanService);
  var testScheduleService = new _testSchedules2.default();
  ServiceLocator.register("TestScheduleService", testScheduleService);
};

var timpsStatus = exports.timpsStatus = true;