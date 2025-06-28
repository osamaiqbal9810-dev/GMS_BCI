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

var getFloorName = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(asset, floors) {
    var exist, floorName, floorObj;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // get floor if not already found.
            exist = _lodash2.default.find(floors, function (f) {
              return f.id == asset.parentAsset;
            });
            floorName = "";

            if (!exist) {
              _context6.next = 6;
              break;
            }

            floorName = exist.unitId;
            _context6.next = 10;
            break;

          case 6:
            _context6.next = 8;
            return _assets2.default.findOne({ _id: ObjectId(asset.parentAsset) }).exec();

          case 8:
            floorObj = _context6.sent;

            if (floorObj) {
              floors.push(floorObj);
              floorName = floorObj.unitId;
            } else {
              floorName = "";
            }

          case 10:
            return _context6.abrupt("return", floorName);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getFloorName(_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _isJson = require("../../utilities/isJson");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _assets = require("../assets/assets.modal");

var _assets2 = _interopRequireDefault(_assets);

var _sensorsummary = require("../sensorLog/sensorsummary.modal");

var _sensorsummary2 = _interopRequireDefault(_sensorsummary);

var _sensorconfig = require("./../../config/sensorconfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var ObjectId = require("mongodb").ObjectID;

// TODO: Define criteria for good or bad battery health status and
// update it as soon as the sensor data is received (voltage received is in millivolts)
// config.batteryHealthThreshold = 2200  // millivolts
// batteryHealthStatus = (batteryVoltage > config.batteryHealthThreshold) ? "good" : "bad"

// TODO: Define in system configurations?
var dateFormatForAlexa = "YYYY-MM-DD HH:mm";

var VoiceAssistantService = function () {
  function VoiceAssistantService() {
    (0, _classCallCheck3.default)(this, VoiceAssistantService);
  }

  (0, _createClass3.default)(VoiceAssistantService, [{
    key: "extractSensorsSummary",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req) {
        var resultObj, AssetService, assetsIds, summaryData, filterData, keys, i, j, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, floor;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = void 0;

                resultObj = {};
                AssetService = ServiceLocator.resolve("AssetsService");
                _context.next = 5;
                return AssetService.getUserAssetsIds(req.user);

              case 5:
                assetsIds = _context.sent;
                _context.prev = 6;
                _context.next = 9;
                return _sensorsummary2.default.find({ summaryName: "floorstate", assetId: { $in: assetsIds } }).sort({ date: "desc" }).exec();

              case 9:
                summaryData = _context.sent;
                filterData = [];

                if (!(summaryData.length > 0)) {
                  _context.next = 28;
                  break;
                }

                keys = _lodash2.default.uniqBy(summaryData, "assetId");
                i = 0;

              case 14:
                if (!(i < keys.length)) {
                  _context.next = 26;
                  break;
                }

                j = 0;

              case 16:
                if (!(j < summaryData.length)) {
                  _context.next = 23;
                  break;
                }

                if (!(summaryData[j].assetId === keys[i].assetId)) {
                  _context.next = 20;
                  break;
                }

                filterData.push(summaryData[i]);
                return _context.abrupt("break", 23);

              case 20:
                j++;
                _context.next = 16;
                break;

              case 23:
                i++;
                _context.next = 14;
                break;

              case 26:
                _context.next = 28;
                break;

              case 28:

                resultObj.value = {
                  NoOfActiveDevices: 0,
                  NoOfOfflineDevices: 0,
                  NoOfDevicesInAlerts: 0,
                  NoOfDevicesInWarnings: 0,
                  NoOfDevicesInDefrost: 0
                };

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 32;
                for (_iterator = filterData[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  floor = _step.value;

                  resultObj.value.NoOfActiveDevices += floor.data.active;
                  resultObj.value.NoOfOfflineDevices += floor.data.offline;
                  resultObj.value.NoOfDevicesInAlerts += floor.data.alert;
                  resultObj.value.NoOfDevicesInWarnings += floor.data.warning;
                  resultObj.value.NoOfDevicesInDefrost += floor.data.defrost;
                }

                _context.next = 40;
                break;

              case 36:
                _context.prev = 36;
                _context.t0 = _context["catch"](32);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 40:
                _context.prev = 40;
                _context.prev = 41;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 43:
                _context.prev = 43;

                if (!_didIteratorError) {
                  _context.next = 46;
                  break;
                }

                throw _iteratorError;

              case 46:
                return _context.finish(43);

              case 47:
                return _context.finish(40);

              case 48:
                resultObj.status = 200;
                _context.next = 56;
                break;

              case 51:
                _context.prev = 51;
                _context.t1 = _context["catch"](6);

                resultObj.errorVal = _context.t1;
                resultObj.status = 500;
                console.log("Error occured in  : ", _context.t1);

              case 56:
                return _context.abrupt("return", resultObj);

              case 57:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 51], [32, 36, 40, 48], [41,, 43, 47]]);
      }));

      function extractSensorsSummary(_x) {
        return _ref.apply(this, arguments);
      }

      return extractSensorsSummary;
    }()
  }, {
    key: "extractSensorStatus",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user, deviceType, num) {
        var resultObj, criteria, AssetService, assetsIds, assets, resObj, floors, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, asset, alexaAsset;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = void 0;

                resultObj = {};

                _context2.prev = 2;
                criteria = { $and: [{ "attributes.deviceType": deviceType }, { "attributes.deviceNum": num }] };
                AssetService = ServiceLocator.resolve("AssetsService");
                _context2.next = 7;
                return AssetService.getUserAssetsIds(user);

              case 7:
                assetsIds = _context2.sent;

                criteria["_id"] = { $in: assetsIds };
                _context2.next = 11;
                return _assets2.default.find(criteria).exec();

              case 11:
                assets = _context2.sent;
                resObj = {
                  Exists: false,
                  DeviceType: deviceType,
                  Number: num,
                  DeviceList: []
                };
                floors = [];

                if (!(assets && assets.length > 0)) {
                  _context2.next = 51;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 18;
                _iterator2 = assets[Symbol.iterator]();

              case 20:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 37;
                  break;
                }

                asset = _step2.value;

                resObj.Exists = true;
                _context2.next = 25;
                return getFloorName(asset, floors);

              case 25:
                _context2.t0 = _context2.sent;
                _context2.t1 = checkOnline(asset);
                _context2.t2 = checkAlert(asset);
                _context2.t3 = getTemp(asset);
                _context2.t4 = getHumidity(asset);
                _context2.t5 = checkBattery(asset);
                _context2.t6 = getDataReceiveTime(asset);
                alexaAsset = {
                  Floor: _context2.t0,
                  Online: _context2.t1,
                  AlertStatus: _context2.t2,
                  Temperature: _context2.t3,
                  Humidity: _context2.t4,
                  BatteryHealthStatus: _context2.t5,
                  LastSeenTime: _context2.t6
                };

                resObj.DeviceList.push(alexaAsset);

              case 34:
                _iteratorNormalCompletion2 = true;
                _context2.next = 20;
                break;

              case 37:
                _context2.next = 43;
                break;

              case 39:
                _context2.prev = 39;
                _context2.t7 = _context2["catch"](18);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t7;

              case 43:
                _context2.prev = 43;
                _context2.prev = 44;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 46:
                _context2.prev = 46;

                if (!_didIteratorError2) {
                  _context2.next = 49;
                  break;
                }

                throw _iteratorError2;

              case 49:
                return _context2.finish(46);

              case 50:
                return _context2.finish(43);

              case 51:
                resultObj.value = resObj;
                resultObj.status = 200;
                _context2.next = 60;
                break;

              case 55:
                _context2.prev = 55;
                _context2.t8 = _context2["catch"](2);

                resultObj.errorVal = _context2.t8;
                resultObj.status = 500;
                console.log("Error occured in  : ", _context2.t8);

              case 60:
                return _context2.abrupt("return", resultObj);

              case 61:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 55], [18, 39, 43, 51], [44,, 46, 50]]);
      }));

      function extractSensorStatus(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return extractSensorStatus;
    }()
  }, {
    key: "extractSensorTemperature",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(user, deviceType, num) {
        var resultObj, criteria, AssetService, assetsIds, assets, resObj, floors, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, asset, alexaAsset;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = void 0;

                resultObj = {};

                _context3.prev = 2;
                criteria = { $and: [{ "attributes.deviceType": deviceType }, { "attributes.deviceNum": num }] };
                AssetService = ServiceLocator.resolve("AssetsService");
                _context3.next = 7;
                return AssetService.getUserAssetsIds(user);

              case 7:
                assetsIds = _context3.sent;

                criteria["_id"] = { $in: assetsIds };
                _context3.next = 11;
                return _assets2.default.find(criteria).exec();

              case 11:
                assets = _context3.sent;
                resObj = {
                  Exists: false,
                  DeviceType: deviceType,
                  Number: num,
                  DeviceList: []
                };
                floors = [];

                if (!(assets && assets.length > 0)) {
                  _context3.next = 48;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 18;
                _iterator3 = assets[Symbol.iterator]();

              case 20:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context3.next = 34;
                  break;
                }

                asset = _step3.value;

                resObj.Exists = true;
                _context3.next = 25;
                return getFloorName(asset, floors);

              case 25:
                _context3.t0 = _context3.sent;
                _context3.t1 = checkOnline(asset);
                _context3.t2 = getTemp(asset);
                _context3.t3 = getDataReceiveTime(asset);
                alexaAsset = {
                  Floor: _context3.t0,
                  Online: _context3.t1,
                  Temperature: _context3.t2,
                  LastSeenTime: _context3.t3
                };

                resObj.DeviceList.push(alexaAsset);

              case 31:
                _iteratorNormalCompletion3 = true;
                _context3.next = 20;
                break;

              case 34:
                _context3.next = 40;
                break;

              case 36:
                _context3.prev = 36;
                _context3.t4 = _context3["catch"](18);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t4;

              case 40:
                _context3.prev = 40;
                _context3.prev = 41;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 43:
                _context3.prev = 43;

                if (!_didIteratorError3) {
                  _context3.next = 46;
                  break;
                }

                throw _iteratorError3;

              case 46:
                return _context3.finish(43);

              case 47:
                return _context3.finish(40);

              case 48:
                resultObj.value = resObj;
                resultObj.status = 200;
                _context3.next = 57;
                break;

              case 52:
                _context3.prev = 52;
                _context3.t5 = _context3["catch"](2);

                resultObj.errorVal = _context3.t5;
                resultObj.status = 500;
                console.log("Error occured in  : ", _context3.t5);

              case 57:
                return _context3.abrupt("return", resultObj);

              case 58:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 52], [18, 36, 40, 48], [41,, 43, 47]]);
      }));

      function extractSensorTemperature(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return extractSensorTemperature;
    }()
  }, {
    key: "extractSensorHumidity",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(user, deviceType, num) {
        var resultObj, criteria, AssetService, assetsIds, assets, resObj, floors, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, asset, alexaAsset;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resultObj = void 0;

                resultObj = {};

                _context4.prev = 2;
                criteria = { $and: [{ "attributes.deviceType": deviceType }, { "attributes.deviceNum": num }] };
                AssetService = ServiceLocator.resolve("AssetsService");
                _context4.next = 7;
                return AssetService.getUserAssetsIds(user);

              case 7:
                assetsIds = _context4.sent;

                criteria["_id"] = { $in: assetsIds };
                _context4.next = 11;
                return _assets2.default.find(criteria).exec();

              case 11:
                assets = _context4.sent;
                resObj = {
                  Exists: false,
                  DeviceType: deviceType,
                  Number: num,
                  DeviceList: []
                };
                floors = [];

                if (!(assets && assets.length > 0)) {
                  _context4.next = 48;
                  break;
                }

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context4.prev = 18;
                _iterator4 = assets[Symbol.iterator]();

              case 20:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context4.next = 34;
                  break;
                }

                asset = _step4.value;

                resObj.Exists = true;
                _context4.next = 25;
                return getFloorName(asset, floors);

              case 25:
                _context4.t0 = _context4.sent;
                _context4.t1 = checkOnline(asset);
                _context4.t2 = getHumidity(asset);
                _context4.t3 = getDataReceiveTime(asset);
                alexaAsset = {
                  Floor: _context4.t0,
                  Online: _context4.t1,
                  Humidity: _context4.t2,
                  LastSeenTime: _context4.t3
                };

                resObj.DeviceList.push(alexaAsset);

              case 31:
                _iteratorNormalCompletion4 = true;
                _context4.next = 20;
                break;

              case 34:
                _context4.next = 40;
                break;

              case 36:
                _context4.prev = 36;
                _context4.t4 = _context4["catch"](18);
                _didIteratorError4 = true;
                _iteratorError4 = _context4.t4;

              case 40:
                _context4.prev = 40;
                _context4.prev = 41;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 43:
                _context4.prev = 43;

                if (!_didIteratorError4) {
                  _context4.next = 46;
                  break;
                }

                throw _iteratorError4;

              case 46:
                return _context4.finish(43);

              case 47:
                return _context4.finish(40);

              case 48:
                resultObj.value = resObj;
                resultObj.status = 200;
                _context4.next = 57;
                break;

              case 52:
                _context4.prev = 52;
                _context4.t5 = _context4["catch"](2);

                resultObj.errorVal = _context4.t5;
                resultObj.status = 500;
                console.log("Error occured in  : ", _context4.t5);

              case 57:
                return _context4.abrupt("return", resultObj);

              case 58:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 52], [18, 36, 40, 48], [41,, 43, 47]]);
      }));

      function extractSensorHumidity(_x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
      }

      return extractSensorHumidity;
    }()
  }, {
    key: "extractSensorBattery",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(user, deviceType, num) {
        var resultObj, criteria, AssetService, assetsIds, assets, resObj, floors, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, asset, alexaAsset;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                resultObj = void 0;

                resultObj = {};

                _context5.prev = 2;
                criteria = { $and: [{ "attributes.deviceType": deviceType }, { "attributes.deviceNum": num }] };
                AssetService = ServiceLocator.resolve("AssetsService");
                _context5.next = 7;
                return AssetService.getUserAssetsIds(user);

              case 7:
                assetsIds = _context5.sent;

                criteria["_id"] = { $in: assetsIds };
                _context5.next = 11;
                return _assets2.default.find(criteria).exec();

              case 11:
                assets = _context5.sent;
                resObj = {
                  Exists: false,
                  DeviceType: deviceType,
                  Number: num,
                  DeviceList: []
                };
                floors = [];

                if (!(assets && assets.length > 0)) {
                  _context5.next = 48;
                  break;
                }

                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context5.prev = 18;
                _iterator5 = assets[Symbol.iterator]();

              case 20:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context5.next = 34;
                  break;
                }

                asset = _step5.value;

                resObj.Exists = true;
                _context5.next = 25;
                return getFloorName(asset, floors);

              case 25:
                _context5.t0 = _context5.sent;
                _context5.t1 = checkOnline(asset);
                _context5.t2 = checkBattery(asset);
                _context5.t3 = getDataReceiveTime(asset);
                alexaAsset = {
                  Floor: _context5.t0,
                  Online: _context5.t1,
                  BatteryHealthStatus: _context5.t2,
                  LastSeenTime: _context5.t3
                };

                resObj.DeviceList.push(alexaAsset);

              case 31:
                _iteratorNormalCompletion5 = true;
                _context5.next = 20;
                break;

              case 34:
                _context5.next = 40;
                break;

              case 36:
                _context5.prev = 36;
                _context5.t4 = _context5["catch"](18);
                _didIteratorError5 = true;
                _iteratorError5 = _context5.t4;

              case 40:
                _context5.prev = 40;
                _context5.prev = 41;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 43:
                _context5.prev = 43;

                if (!_didIteratorError5) {
                  _context5.next = 46;
                  break;
                }

                throw _iteratorError5;

              case 46:
                return _context5.finish(43);

              case 47:
                return _context5.finish(40);

              case 48:
                resultObj.value = resObj;
                resultObj.status = 200;
                _context5.next = 57;
                break;

              case 52:
                _context5.prev = 52;
                _context5.t5 = _context5["catch"](2);

                resultObj.errorVal = _context5.t5;
                resultObj.status = 500;
                console.log("Error occured in  : ", _context5.t5);

              case 57:
                return _context5.abrupt("return", resultObj);

              case 58:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 52], [18, 36, 40, 48], [41,, 43, 47]]);
      }));

      function extractSensorBattery(_x11, _x12, _x13) {
        return _ref5.apply(this, arguments);
      }

      return extractSensorBattery;
    }()
  }]);
  return VoiceAssistantService;
}();

// Miscelleneous Functions


function checkOnline(asset) {
  var Online = false;
  if (asset && asset.attributes && asset.attributes && asset.attributes.state !== "offline" && asset.attributes.state !== "comFailure") {
    Online = true;
  }
  return Online;
}

function checkAlert(asset) {
  var alert = "inactive";
  if (asset && asset.attributes && asset.attributes && asset.attributes.state == "alert") {
    alert = "active";
  }
  return alert;
}

function getTemp(asset) {
  var utils = ServiceLocator.resolve("utils");
  var temp = "";
  var config = getTempConfig();
  if (asset && asset.attributes && asset.attributes.data && asset.attributes.data.temperature) {
    temp = asset.attributes.data.temperature;
    if (config == "C") {
      temp = temp + " °" + config;
    } else {
      temp = utils.cToF(temp) + " °" + config;
    }
  }
  return temp;
}

function getTempConfig() {
  // TODO: Ahsan, get this config from the DB
  return "C";
}

function getHumidity(asset) {
  var hum = "unknown";
  // console.log("asset.attributes.data: " + JSON.stringify(asset.attributes.data));
  // console.log("asset.attributes.data.humidity: " + JSON.stringify(asset.attributes.data.humidity));
  if (asset && asset.attributes && asset.attributes.data && asset.attributes.data.humidity !== undefined) {
    hum = asset.attributes.data.humidity + " %";
  }
  return hum;
}
function checkBattery(asset) {
  var batHealth = "";
  if (asset && asset.attributes && asset.attributes && asset.attributes.batteryHealthStatus) {
    batHealth = asset.attributes.batteryHealthStatus;
  }
  return batHealth;
}

function getDataReceiveTime(asset) {
  var date = "";
  if (asset && asset.attributes && asset.attributes && asset.attributes.dataReceiveTime) {
    date = (0, _momentTimezone2.default)(asset.attributes.dataReceiveTime).format(dateFormatForAlexa);
  }
  return date;
}

exports.default = VoiceAssistantService;