"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require("lodash");

var _assets = require("../api/assets/assets.modal");

var _assets2 = _interopRequireDefault(_assets);

var _sensorLog = require("../api/sensorLog/sensorLog.service");

var _sensorLog2 = _interopRequireDefault(_sensorLog);

var _sensorconfig = require("../config/sensorconfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../framework/servicelocator");

var SensorSimulatedData = function () {
  function SensorSimulatedData(sensorIdsToAdd, secondsFrequency, randomRange) {
    (0, _classCallCheck3.default)(this, SensorSimulatedData);

    this.configs = {
      sensorIdsToAdd: sensorIdsToAdd ? sensorIdsToAdd : [],
      secondsFrequency: secondsFrequency ? secondsFrequency : 300
    };

    this.randomRange = (0, _extends3.default)({}, randomVariableRange, randomRange);
  }

  (0, _createClass3.default)(SensorSimulatedData, [{
    key: "setConfig",
    value: function setConfig(configName, configValue) {
      if (configName == "sensorIdsToAdd") {
        this.configs[configName] = configValue ? configValue : [];
      }
      if (configName == "secondsFrequency") {
        this.configs[configName] = configValue ? configValue : 300;
      }
    }
  }, {
    key: "populateSensorLogData",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(startDateTime) {
        var utils, gateWayData, currentTime, endTime, gateWayObj, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, sensorId, keys, data, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, key;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                !startDateTime && (startDateTime = (0, _moment2.default)().startOf("day"));
                utils = ServiceLocator.resolve("utils");

                if ((0, _moment.isMoment)(startDateTime)) {
                  _context.next = 5;
                  break;
                }

                console.log("Start Time is not a valid moment date object");
                return _context.abrupt("return");

              case 5:
                gateWayData = [];
                _context.prev = 6;
                currentTime = (0, _moment2.default)(startDateTime);
                endTime = (0, _moment2.default)();

                !this.configs.secondsFrequency && (this.configs.secondsFrequency = 300);

              case 10:
                if (!currentTime.isBefore(endTime)) {
                  _context.next = 64;
                  break;
                }

                gateWayObj = {
                  sensorsInfo: []
                };
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 15;
                _iterator = this.configs.sensorIdsToAdd[Symbol.iterator]();

              case 17:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 46;
                  break;
                }

                sensorId = _step.value;

                gateWayObj.dateTime = currentTime.toDate();
                // # randomize data and add an entry of sensor log
                keys = Object.keys(randomVariableRange);
                data = {};

                data["macAddress"] = sensorId;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 26;
                for (_iterator2 = keys[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  key = _step2.value;

                  data[key] = utils.getRandomInt(randomVariableRange[key]["min"], randomVariableRange[key]["max"]);
                }
                // let obj = {};
                // obj[sensorId] = data;
                _context.next = 34;
                break;

              case 30:
                _context.prev = 30;
                _context.t0 = _context["catch"](26);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t0;

              case 34:
                _context.prev = 34;
                _context.prev = 35;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 37:
                _context.prev = 37;

                if (!_didIteratorError2) {
                  _context.next = 40;
                  break;
                }

                throw _iteratorError2;

              case 40:
                return _context.finish(37);

              case 41:
                return _context.finish(34);

              case 42:
                gateWayObj.sensorsInfo.push(data);
                // # update current time to simulate

              case 43:
                _iteratorNormalCompletion = true;
                _context.next = 17;
                break;

              case 46:
                _context.next = 52;
                break;

              case 48:
                _context.prev = 48;
                _context.t1 = _context["catch"](15);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 52:
                _context.prev = 52;
                _context.prev = 53;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 55:
                _context.prev = 55;

                if (!_didIteratorError) {
                  _context.next = 58;
                  break;
                }

                throw _iteratorError;

              case 58:
                return _context.finish(55);

              case 59:
                return _context.finish(52);

              case 60:
                currentTime = (0, _moment2.default)(currentTime).add(this.configs.secondsFrequency, "seconds");
                gateWayData.push(gateWayObj);
                _context.next = 10;
                break;

              case 64:
                _context.next = 69;
                break;

              case 66:
                _context.prev = 66;
                _context.t2 = _context["catch"](6);

                console.log("Cound not add Simulated Data to Sensor Log : ", _context.t2);

              case 69:
                return _context.abrupt("return", gateWayData);

              case 70:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 66], [15, 48, 52, 60], [26, 30, 34, 42], [35,, 37, 41], [53,, 55, 59]]);
      }));

      function populateSensorLogData(_x) {
        return _ref.apply(this, arguments);
      }

      return populateSensorLogData;
    }()
  }, {
    key: "sampleSensorDataTypeOne",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var sensors, sensorIds, data, SensorLogModel, SumamryModel, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, gateWayData, sensorLogService, dateTimeService, res;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _assets2.default.find({ assetType: "Sensor" }).exec();

              case 2:
                sensors = _context2.sent;
                sensorIds = ["AABBCCDDEE01", "AABBCCDDEE02", "AABBCCDDEE03", "AABBCCDDEE04", "AABBCCDDEE05", "AABBCCDDEE06", "AABBCCDDEE07", "AABBCCDDEE08", "AABBCCDDEE09", "AABBCCDDEE10", "AABBCCDDEE11"];
                // for (let s of sensors) {
                //   s.attributes.sensorId && sensorIds.push(s.attributes.sensorId);
                // }

                this.configs.sensorIdsToAdd = sensorIds;
                _context2.next = 7;
                return this.populateSensorLogData((0, _moment2.default)().subtract(3, "day"));

              case 7:
                data = _context2.sent;

                console.log(data.length);
                SensorLogModel = ServiceLocator.resolve("SensorLogModel");
                SumamryModel = ServiceLocator.resolve("SensorSummaryModel");
                _context2.next = 13;
                return SensorLogModel.remove({}).exec();

              case 13:
                _context2.next = 15;
                return SumamryModel.remove({}).exec();

              case 15:
                _context2.prev = 15;

                if (!(data.length > 0)) {
                  _context2.next = 50;
                  break;
                }

                // initate saving sensor log data
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context2.prev = 20;
                _iterator3 = data[Symbol.iterator]();

              case 22:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context2.next = 35;
                  break;
                }

                gateWayData = _step3.value;
                sensorLogService = new _sensorLog2.default();
                dateTimeService = ServiceLocator.resolve("DateTimeService");

                dateTimeService.setNowTime(gateWayData.dateTime);
                _context2.next = 29;
                return sensorLogService.sensorLogReceive({ data: JSON.stringify(gateWayData) });

              case 29:
                res = _context2.sent;

                if (!res.errorVal) {
                  _context2.next = 32;
                  break;
                }

                throw res.errorVal;

              case 32:
                _iteratorNormalCompletion3 = true;
                _context2.next = 22;
                break;

              case 35:
                _context2.next = 41;
                break;

              case 37:
                _context2.prev = 37;
                _context2.t0 = _context2["catch"](20);
                _didIteratorError3 = true;
                _iteratorError3 = _context2.t0;

              case 41:
                _context2.prev = 41;
                _context2.prev = 42;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 44:
                _context2.prev = 44;

                if (!_didIteratorError3) {
                  _context2.next = 47;
                  break;
                }

                throw _iteratorError3;

              case 47:
                return _context2.finish(44);

              case 48:
                return _context2.finish(41);

              case 49:
                console.log("Succesfully Added Data");

              case 50:
                _context2.next = 55;
                break;

              case 52:
                _context2.prev = 52;
                _context2.t1 = _context2["catch"](15);

                console.log("Error in sampleSensorDataTypeOne : ", _context2.t1);

              case 55:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[15, 52], [20, 37, 41, 49], [42,, 44, 48]]);
      }));

      function sampleSensorDataTypeOne() {
        return _ref2.apply(this, arguments);
      }

      return sampleSensorDataTypeOne;
    }()
  }]);
  return SensorSimulatedData;
}();

exports.default = SensorSimulatedData;


var randomVariableRange = {
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
  temperature: { min: _sensorconfig.temperature.min, max: _sensorconfig.temperature.max },
  humidity: { min: _sensorconfig.humidity.min, max: _sensorconfig.humidity.max }
};