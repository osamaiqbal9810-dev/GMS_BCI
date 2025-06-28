"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ListHelper = require("./utilities/ListHelper");

var _ListHelper2 = _interopRequireDefault(_ListHelper);

var _thumbnailHelper = require("./utilities/thumbnailHelper");

var _thumbnailHelper2 = _interopRequireDefault(_thumbnailHelper);

var _DataOpValidationService = require("./service/DataOpValidationService");

var _DataOpValidationService2 = _interopRequireDefault(_DataOpValidationService);

var _SODOpValidator = require("./service/SODOpValidator");

var _SODOpValidator2 = _interopRequireDefault(_SODOpValidator);

var _ApplicationLookups = require("./api/ApplicationLookups/ApplicationLookups.service");

var _ApplicationLookups2 = _interopRequireDefault(_ApplicationLookups);

var _permission = require("./api/permission/permission.service");

var _permission2 = _interopRequireDefault(_permission);

var _userGroup = require("./api/userGroup/userGroup.service");

var _userGroup2 = _interopRequireDefault(_userGroup);

var _DataOpEventService = require("./service/DataOpEventService");

var _DataOpEventService2 = _interopRequireDefault(_DataOpEventService);

var _DataOperationsLogic = require("./service/DataOperationsLogic");

var _DataOperationsLogic2 = _interopRequireDefault(_DataOperationsLogic);

var _assets = require("./api/assets/assets.service");

var _assets2 = _interopRequireDefault(_assets);

var _assetTypes = require("./api/assetTypes/assetTypes.service");

var _assetTypes2 = _interopRequireDefault(_assetTypes);

var _run = require("./api/run/run.service");

var _run2 = _interopRequireDefault(_run);

var _dashboard = require("./api/dashboard/dashboard.service");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _devices = require("./api/devices/devices.service");

var _devices2 = _interopRequireDefault(_devices);

var _params = require("./api/SupportedParams/params.service");

var _params2 = _interopRequireDefault(_params);

var _assetsTreeService = require("./api/assetsTree/assetsTreeService");

var _assetsTreeService2 = _interopRequireDefault(_assetsTreeService);

var _WorkOrder = require("./api/workOrder/WorkOrder.service");

var _WorkOrder2 = _interopRequireDefault(_WorkOrder);

var _location = require("./api/Location/location.service");

var _location2 = _interopRequireDefault(_location);

var _sensorLog = require("./api/sensorLog/sensorLog.service");

var _sensorLog2 = _interopRequireDefault(_sensorLog);

var _voiceAssistant = require("./api/voiceAssistant/voiceAssistant.service");

var _voiceAssistant2 = _interopRequireDefault(_voiceAssistant);

var _sensorReport = require("./api/sensorReport/sensorReport.service");

var _sensorReport2 = _interopRequireDefault(_sensorReport);

var _timps = require("./timps/timps");

var _DBService = require("./service/DBService");

var _DBService2 = _interopRequireDefault(_DBService);

var _AppAccessClass = require("./service/AppAccessClass");

var _AppAccessClass2 = _interopRequireDefault(_AppAccessClass);

var _RemedialActionListHook = require("./api/ApplicationLookups/RemedialActionListHook");

var _RemedialActionListHook2 = _interopRequireDefault(_RemedialActionListHook);

var _SchedulerService = require("./service/SchedulerService");

var _SchedulerService2 = _interopRequireDefault(_SchedulerService);

var _Alert = require("./api/Alert/Alert.service");

var _Alert2 = _interopRequireDefault(_Alert);

var _Notification = require("./api/Notification/Notification.service");

var _Notification2 = _interopRequireDefault(_Notification);

var _DateTimeService = require("./service/DateTimeService");

var _DateTimeService2 = _interopRequireDefault(_DateTimeService);

var _SensorDataSImulaterService = require("./service/SensorDataSImulaterService");

var _SensorDataSImulaterService2 = _interopRequireDefault(_SensorDataSImulaterService);

var _StateManager = require("./service/StateManager");

var _StateManager2 = _interopRequireDefault(_StateManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var config = require("./config/environment/index");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var routes = require("./routes/routes");
var rfs = require("rotating-file-stream");
var fs = require("fs");
var schedule = require("node-schedule");

try {
  require("fs").mkdirSync("./log");
} catch (e) {
  if (e.code != "EEXIST") {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}

var log4js = require("log4js");
// log4js.configure("./server/config/log4js.json");
log4js.configure("./config/log4js.json");
var startupLogger = log4js.getLogger("startup");

startupLogger.info("Starting up...");

var ServiceLocator = require("./framework/servicelocator");

// API SERVICES


// Import Timps


//Utils
//import { permChecker } from "./utilities/permCheck";
ServiceLocator.register("logger", log4js.getLogger("System"));

var listHelper = new _ListHelper2.default(log4js.getLogger("ListHelper"));
ServiceLocator.register("ListHelper", listHelper);
// Loger Not passing correctly to the Class. Server  Crashed on Creating Issue
var thumbnailHelper = new _thumbnailHelper2.default(log4js.getLogger("ThumbnailHelper"));
ServiceLocator.register("ThumbnailHelper", thumbnailHelper);

var doValidator = new _DataOpValidationService2.default(log4js.getLogger("DOValidator"));
ServiceLocator.register("DataOpValidationService", doValidator);

var sodvalidator = new _SODOpValidator2.default();
ServiceLocator.register("SODOpValidator", sodvalidator);

var doeventservice = new _DataOpEventService2.default();
ServiceLocator.register("DataOpEventService", doeventservice);

var doperationslogic = new _DataOperationsLogic2.default(log4js.getLogger("DataOperationsLogic"));
ServiceLocator.register("DataOperationsLogic", doperationslogic);

// var io = require('socket.io').listen(server);
// var socketIOService = new SocketIOService(io);
// ServiceLocator.register('SocketIOService', socketIOService);

// API SERVICES REGISTERING
var applicationLookupsService = new _ApplicationLookups2.default();
ServiceLocator.register("ApplicationLookupsService", applicationLookupsService);
var alertService = new _Alert2.default();
ServiceLocator.register("AlertService", alertService);
var notificationService = new _Notification2.default();
ServiceLocator.register("NotificationService", notificationService);
var permissionService = new _permission2.default();
ServiceLocator.register("PermissionService", permissionService);
var userGroupService = new _userGroup2.default();
ServiceLocator.register("UserGroupService", userGroupService);
var assetsService = new _assets2.default();
ServiceLocator.register("AssetsService", assetsService);
var assetsTypeService = new _assetTypes2.default();
ServiceLocator.register("AssetsTypeService", assetsTypeService);
//ServiceLocator.register("permissionChecker", permChecker);
var runService = new _run2.default();
ServiceLocator.register("LineRunService", runService);
var dashboardService = new _dashboard2.default();
ServiceLocator.register("DashboardService", dashboardService);
//dashboardService.get_dashboardData({}, {});
// dashboardService.fillDetailArray();
var assetsTreeService = new _assetsTreeService2.default();
ServiceLocator.register("AssetsTreeService", assetsTreeService);

var ws = new _WorkOrder2.default();
ServiceLocator.register("WorkOrderService", ws);

var locationService = new _location2.default();
ServiceLocator.register("LocationService", locationService);

var deviceService = new _devices2.default();
ServiceLocator.register("DeviceService", deviceService);

var supportedParams = new _params2.default();
ServiceLocator.register("SupportedParams", supportedParams);

var databaseSerivce = new _DBService2.default();
ServiceLocator.register("DBService", databaseSerivce);

var appAccessService = new _AppAccessClass2.default();
ServiceLocator.register("AppAccessService", appAccessService);

var rhook = new _RemedialActionListHook2.default();
ServiceLocator.register("RemedialActionListHook", rhook);

var scheduleService = new _SchedulerService2.default();
ServiceLocator.register("scheduleService", scheduleService);

var sensorLogService = new _sensorLog2.default();
ServiceLocator.register("SensorLogService", sensorLogService);
var voiceAssistantService = new _voiceAssistant2.default();
ServiceLocator.register("VoiceAssistantService", voiceAssistantService);
var dateTimeService = new _DateTimeService2.default();
ServiceLocator.register("DateTimeService", dateTimeService);
var stateManagerService = new _StateManager2.default();
ServiceLocator.register("StateManager", stateManagerService);
stateManagerService.sensorOfflineService();

var sensorReportService = new _sensorReport2.default();
ServiceLocator.register("SensorReportService", sensorReportService);

mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useFindAndModify: false }, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
    var utils;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!e) {
              console.log("Database Connected!");
              startupLogger.info("Database Connected!");
              // listHelper.getList('user',new Date('2018-09-24'),"{\"name\": \"<username>\"}", {name:'admin'},  {success: items=>{
              //   console.log(items);
              // }, fail: err=>{ console.log(err);}}
              // );
              // let user = {_id:'5d4f68d7b83e0c40ccf0bdd7', assignedLocation:'5db2f1f51cf2313e809e73dd'};
              // let ls = await assetsTreeService.getPlannableLocations(user);
              // console.log('assigned Locations: ', ls);

              // test code
              // console.log('executing test code...');
              // let assetService = ServiceLocator.resolve('AssetsService');
              // await assetService.cleanCoords("5e1ca6b0ef459b62244a5b44");
              // test code
            } else {
              console.log("Error connecting database");
              console.log(e);

              startupLogger.error("Error connecting database");
              startupLogger.error(e);
            }
            utils = ServiceLocator.resolve("utils");

            mongoose.connection.on("error", utils.handleMongoDbError);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var app = express();

var accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log")
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cors());
app.use(logger("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// http to https redirect server setup
if (config.server_comm_protocol === "https") {
  var httpApp = express();
  httpApp.get("*", function (req, res) {
    if (!req.secure) {
      console.log("Req on http. host: " + req.headers.host + ", url: " + req.url + ", remote: " + (req.ip || req.connection.remoteAddress));
      if (req.headers.host === config.domain_name || req.headers.host === config.ip) {
        var redirect_url = config.server_comm_protocol + "://" + req.headers.host + req.url;
        console.log("Redirecting to redirect_url");
        res.redirect(redirect_url);
      } else {
        console.log("Invalid host");
      }
    }
  });
  httpApp.listen(80, function () {
    console.log("Start redirect server");
  });
}

//app.use(express.static(path.join(__dirname, "public")));
var utils = ServiceLocator.resolve("utils");
utils.ensureFolderExists(config.giTestForms);
app.use("/thumbnails", express.static(config.thumbnailsPath));
app.use("/applicationresources", express.static(config.uploadPath));
app.use("/audio", express.static(config.audioPath));
app.use("/assetImages", express.static(config.assetImages));
app.use("/assetDocuments", express.static(config.assetDocuments));
app.use("/giTestForms", express.static(config.giTestForms));

require("./routes/routes")(app);
// TIMP INITIALIZATION
if (_timps.timpsStatus) {
  (0, _timps.timpsApp)(log4js);
  require("./timps/timps.route.js")();
  console.log("Timps : On");
} else {
  console.log("Timps : Off");
}
console.log("Environment : " + process.env.NODE_ENV);

// Lamp Initialization
require("./lamp/lamp.route.js")();

//app.use('/', indexRouter);
// app.use('/users', usersRouter);

// serve frontend through this server
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
///////////////////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (!fs.existsSync(config.uploads)) {
  fs.mkdirSync(config.uploads);
}
if (!fs.existsSync(config.uploadPath)) {
  fs.mkdirSync(config.uploadPath);
}
if (!fs.existsSync(config.thumbnailsPath)) {
  fs.mkdirSync(config.thumbnailsPath);
}
if (!fs.existsSync(config.audioPath)) {
  fs.mkdirSync(config.audioPath);
}
if (!fs.existsSync(config.assetImages)) {
  fs.mkdirSync(config.assetImages);
}
if (!fs.existsSync(config.assetDocuments)) {
  fs.mkdirSync(config.assetDocuments);
}

if (config.seedDB) {
  // let seed = require("./config/seed");
  var database = require("./config/database/database");

  database.createDatabase();

  console.log("Seed has been executed");
  startupLogger.info("Seed has been executed");
} else {
  console.log("Seed disabled");
  startupLogger.info("Seed disabled");
}

/**
 * Run Alerts cronJobs
 */
// let alertService = ServiceLocator.resolve('AlertService');
alertService.startAlertsMonitoring();

/**
 * CronJob for notification service
 */

schedule.scheduleJob("NotificationCronJob", "*/1 * * * *", function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(fireDate) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Cron job logic for notification service.
            // console.log("Cron job of notification service called: " + fireDate);
            dashboardService.deleteTwoDayOldRecs();
            notificationService.sendNewNotifications();

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

// For testing recaluculateMethod uncomment this
// alertService.recalculateAlertMonitoringByModelId('5f86ffcf81d9305668f2015a");

// For Adding Simulated Data
var sensorLogSimulated = new _SensorDataSImulaterService2.default();
//sensorLogSimulated.sampleSensorDataTypeOne();

module.exports = app;