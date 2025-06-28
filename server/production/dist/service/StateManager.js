"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var processSensors = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var AssetModel, allSensors, sensorsToUpdate, floorSummaryToRecal, sensorLogService, AssetsService, SocketIOService, timeNow, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, sensor, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, upSensor, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, floorId, listofSensors, states;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            AssetModel = void 0, allSensors = void 0, sensorsToUpdate = void 0, floorSummaryToRecal = void 0, sensorLogService = void 0, AssetsService = void 0, SocketIOService = void 0;

            AssetModel = ServiceLocator.resolve("AssetsModel");
            AssetsService = ServiceLocator.resolve("AssetsService");
            sensorLogService = ServiceLocator.resolve("SensorLogService");
            SocketIOService = ServiceLocator.resolve("SocketIOService");
            _context.prev = 5;
            timeNow = this.dateTimeService ? (0, _moment2.default)(this.dateTimeService.getNowTime()) : (0, _moment2.default)();

            sensorsToUpdate = [];
            floorSummaryToRecal = [];
            // # get all sensors and calculate if state transition criteria is met
            // ! improvement : filter sensor with no state or id
            _context.next = 11;
            return AssetModel.find({ assetType: "Sensor" }).exec();

          case 11:
            allSensors = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 15;

            for (_iterator = allSensors[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              sensor = _step.value;

              if (sensor.attributes.state && sensor.attributes.sensorId) {
                // # check time duration criteria for alert state
                if (checkAlertState(sensor, (0, _moment2.default)()) || checkNetworkFailure(sensor, (0, _moment2.default)())) {
                  // ! improvement save adjustment to the floor states
                  floorSummaryToRecal.push(sensor.parentAsset);
                  sensorsToUpdate.push(sensor);
                }
              }
            }
            // # after caching all the sensor to update , update them at once for optimization process
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](15);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 26:
            _context.prev = 26;

            if (!_didIteratorError) {
              _context.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context.finish(26);

          case 30:
            return _context.finish(23);

          case 31:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 34;
            _iterator2 = sensorsToUpdate[Symbol.iterator]();

          case 36:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 43;
              break;
            }

            upSensor = _step2.value;
            _context.next = 40;
            return upSensor.save();

          case 40:
            _iteratorNormalCompletion2 = true;
            _context.next = 36;
            break;

          case 43:
            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t1 = _context["catch"](34);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 49:
            _context.prev = 49;
            _context.prev = 50;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 52:
            _context.prev = 52;

            if (!_didIteratorError2) {
              _context.next = 55;
              break;
            }

            throw _iteratorError2;

          case 55:
            return _context.finish(52);

          case 56:
            return _context.finish(49);

          case 57:
            floorSummaryToRecal = _lodash2.default.uniq(floorSummaryToRecal);
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 61;
            _iterator3 = floorSummaryToRecal[Symbol.iterator]();

          case 63:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context.next = 76;
              break;
            }

            floorId = _step3.value;
            _context.next = 67;
            return AssetsService.getChildAssets(floorId);

          case 67:
            listofSensors = _context.sent;
            _context.next = 70;
            return sensorLogService.floorStatescalulate(listofSensors);

          case 70:
            states = _context.sent;
            _context.next = 73;
            return sensorLogService.summaryFloorStates(states, floorId, "min/hour", "floorstate", (0, _moment2.default)());

          case 73:
            _iteratorNormalCompletion3 = true;
            _context.next = 63;
            break;

          case 76:
            _context.next = 82;
            break;

          case 78:
            _context.prev = 78;
            _context.t2 = _context["catch"](61);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t2;

          case 82:
            _context.prev = 82;
            _context.prev = 83;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 85:
            _context.prev = 85;

            if (!_didIteratorError3) {
              _context.next = 88;
              break;
            }

            throw _iteratorError3;

          case 88:
            return _context.finish(85);

          case 89:
            return _context.finish(82);

          case 90:
            if (floorSummaryToRecal.length > 0) {
              SocketIOService.onDataReceiveFromGateway();
            }
            _context.next = 96;
            break;

          case 93:
            _context.prev = 93;
            _context.t3 = _context["catch"](5);

            console.log("Error in background timer service of sensors : processSensors : ", _context.t3);

          case 96:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 93], [15, 19, 23, 31], [24,, 26, 30], [34, 45, 49, 57], [50,, 52, 56], [61, 78, 82, 90], [83,, 85, 89]]);
  }));

  return function processSensors() {
    return _ref.apply(this, arguments);
  };
}();

var _sensorconfig = require("../config/sensorconfig");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../framework/servicelocator");

var StateManager = function () {
  function StateManager() {
    (0, _classCallCheck3.default)(this, StateManager);

    this.serviceConfig = {
      sensorBGServiceMiliSeconds: 15000,
      sensorBGServiceMinTimeSeconds: 5
    };
    this.intervals = {};
    this.dateTimeService = ServiceLocator.resolve("DateTimeService");
  }
  // # create timeout interval for alert offline


  (0, _createClass3.default)(StateManager, [{
    key: "intervalInitialize",
    value: function intervalInitialize(callback, time) {
      if (callback && time) {
        var interval = setInterval(callback, time);
        return interval;
      }
      return false;
    }
  }, {
    key: "sensorOfflineService",
    value: function sensorOfflineService() {
      checkmoment();
      this.intervals.processSensors = {
        executedTime: new Date(),
        interval: this.intervalInitialize(processSensors, this.serviceConfig.sensorBGServiceMiliSeconds)
      };
    }
    // if to be called from when data is received

  }, {
    key: "sensorOfflineServiceCall",
    value: function sensorOfflineServiceCall() {
      if ((0, _moment2.default)(this.intervals.processSensors.executedTime).add(sensorBGServiceMinTimeSeconds, "seconds").isAfter(new Date())) {
        clearInterval(this.interval.processSensors.interval);
        this.intervals.processSensors.interval = null;
        processSensors();
        this.intervals.processSensors = this.intervalInitialize(processSensors, this.serviceConfig.sensorBGServiceMiliSeconds);
      }
    }
  }]);
  return StateManager;
}();

exports.default = StateManager;


function checkAlertState(sensor, timeNow) {
  var alertState = false;
  if (sensor.attributes.state && sensor.attributes.state == "warning") {
    var timeToCheck = _sensorconfig.stateCriteria.toAlertSeconds;
    sensor.attributes.alert && sensor.attributes.alert.duration && (timeToCheck = sensor.attributes.alert.duration);
    if ((0, _moment2.default)((0, _moment2.default)(sensor.attributes.stateUpdateTime)).isBefore(timeNow.subtract(timeToCheck, "second"))) {
      alertState = true;
      sensor.attributes.state = "alert";
      sensor.attributes.stateUpdateTime = timeNow.toDate();
      sensor.markModified("attributes");
    }
  }
  return alertState;
}
function checkNetworkFailure(sensor, timeNow) {
  var networkFailure = false;

  if (sensor.attributes.state && sensor.attributes.state !== "offline" && (0, _moment2.default)((0, _moment2.default)(sensor.attributes.dataReceiveTime)).isBefore(timeNow.subtract(_sensorconfig.stateCriteria.toNetworkFailure, "second"))) {
    networkFailure = true;
    sensor.attributes.state = "offline";
    sensor.attributes.stateUpdateTime = timeNow.toDate();
    sensor.markModified("attributes");
  }
  return networkFailure;
}

function checkmoment() {
  var tn = (0, _moment2.default)();
  var val = (0, _moment2.default)().subtract(60, "seconds");

  var check = (0, _moment2.default)((0, _moment2.default)(val).add(30, "second")).isAfter(tn);
  console.log(check);
}