"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _sensorconfig = require("./../../config/sensorconfig");

var _utils = require("../../utilities/utils");

var _utils2 = _interopRequireDefault(_utils);

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _isJson = require("../../utilities/isJson");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require("../../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var ObjectId = require("mongodb").ObjectID;
var turf = require("@turf/turf");

var SensorLogService = function () {
  function SensorLogService() {
    (0, _classCallCheck3.default)(this, SensorLogService);
  }

  (0, _createClass3.default)(SensorLogService, [{
    key: "getAllSensorLogs",

    //main summary function
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
        var resultObj, SensorLogModel, sensorLogData;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = void 0, SensorLogModel = void 0;

                resultObj = {};
                SensorLogModel = ServiceLocator.resolve("SensorLogModel");
                _context.prev = 3;
                _context.next = 6;
                return SensorLogModel.find({ assetId: id }).sort({ date: -1 }).limit(1).exec();

              case 6:
                sensorLogData = _context.sent;

                resultObj.value = sensorLogData;
                resultObj.status = 200;
                _context.next = 16;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);

                resultObj.errorVal = _context.t0;
                resultObj.status = 500;
                console.log("Error occured in getAllSensorLogs : ", _context.t0);

              case 16:
                return _context.abrupt("return", resultObj);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 11]]);
      }));

      function getAllSensorLogs(_x) {
        return _ref.apply(this, arguments);
      }

      return getAllSensorLogs;
    }()
  }, {
    key: "getAllDeviceLogs",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var resultObj, SensorLogModel, sensorLogData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = void 0, SensorLogModel = void 0;

                resultObj = {};
                SensorLogModel = ServiceLocator.resolve("SensorLogModel");
                _context2.prev = 3;
                _context2.next = 6;
                return SensorLogModel.find().sort({ date: -1 }).limit(100).exec();

              case 6:
                sensorLogData = _context2.sent;

                resultObj.value = sensorLogData;
                resultObj.status = 200;
                _context2.next = 16;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](3);

                resultObj.errorVal = _context2.t0;
                resultObj.status = 500;
                console.log("Error occured in getAllSensorLogs : ", _context2.t0);

              case 16:
                return _context2.abrupt("return", resultObj);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 11]]);
      }));

      function getAllDeviceLogs() {
        return _ref2.apply(this, arguments);
      }

      return getAllDeviceLogs;
    }()
  }, {
    key: "sensorLogReceive",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(body) {
        var resultObj, dateTimeService, SocketIOService, gateWayMsg, dtTm;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = {};
                dateTimeService = ServiceLocator.resolve("DateTimeService");
                SocketIOService = ServiceLocator.resolve("SocketIOService");
                _context3.prev = 3;
                gateWayMsg = body;

                if (gateWayMsg) {
                  _context3.next = 7;
                  break;
                }

                throw "data received can not be parsed. please check if it is in proper JSON format and valid data";

              case 7:
                dtTm = dateTimeService ? dateTimeService.getNowTime() : new Date();
                _context3.next = 10;
                return this.saveSensorLog(gateWayMsg, dtTm);

              case 10:
                resultObj.value = "Success";
                resultObj.stauts = 200;
                // await this.summary(gateWayMsg, dtTm);
                // await this.cleanOlderData(dtTm);
                // SocketIOService.onDataReceiveFromGateway();
                _context3.next = 19;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](3);

                console.log("Error in sensorLogReceive : ", _context3.t0);
                resultObj.errorVal = _context3.t0;
                resultObj.status = 500;

              case 19:
                return _context3.abrupt("return", resultObj);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 14]]);
      }));

      function sensorLogReceive(_x2) {
        return _ref3.apply(this, arguments);
      }

      return sensorLogReceive;
    }()
  }, {
    key: "summary",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(receivedData, dttm) {
        var AssetsService, resultObj, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, listofSensors, states;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!receivedData) {
                  _context4.next = 52;
                  break;
                }

                AssetsService = ServiceLocator.resolve("AssetsService");
                _context4.next = 4;
                return this.summaryCalculate(receivedData, dttm);

              case 4:
                resultObj = _context4.sent;

                if (!resultObj.errorVal) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", resultObj);

              case 7:
                if (!(resultObj.value && resultObj.value.length > 0)) {
                  _context4.next = 48;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 11;
                _iterator = resultObj.value[Symbol.iterator]();

              case 13:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 32;
                  break;
                }

                item = _step.value;
                _context4.next = 17;
                return AssetsService.getChildAssets(item.floorId);

              case 17:
                listofSensors = _context4.sent;
                states = void 0;

                if (!item.status) {
                  _context4.next = 25;
                  break;
                }

                _context4.next = 22;
                return this.floorStatescalulate(listofSensors);

              case 22:
                states = _context4.sent;
                _context4.next = 26;
                break;

              case 25:
                states = null;

              case 26:
                _context4.next = 28;
                return this.summaryFloorStates(states, item.floorId, "min/hour", "floorstate", dttm);

              case 28:
                resultObj.value = "Success";

              case 29:
                _iteratorNormalCompletion = true;
                _context4.next = 13;
                break;

              case 32:
                _context4.next = 38;
                break;

              case 34:
                _context4.prev = 34;
                _context4.t0 = _context4["catch"](11);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 38:
                _context4.prev = 38;
                _context4.prev = 39;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 41:
                _context4.prev = 41;

                if (!_didIteratorError) {
                  _context4.next = 44;
                  break;
                }

                throw _iteratorError;

              case 44:
                return _context4.finish(41);

              case 45:
                return _context4.finish(38);

              case 46:
                _context4.next = 50;
                break;

              case 48:
                resultObj.value = "Floors Not Added";
                return _context4.abrupt("return", resultObj);

              case 50:
                _context4.next = 53;
                break;

              case 52:
                console.log("json invalid");

              case 53:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[11, 34, 38, 46], [39,, 41, 45]]);
      }));

      function summary(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return summary;
    }()
  }, {
    key: "summaryCalculate",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(itemObj, dttm) {
        var sensorIds, sensorsLogData, sensorsList, floorIds, resultObj, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, sensorData, AssetModel, criteria, sensorsDoc, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, sensorAsset, sensorLogData, updatedData, floorObj, found, keys, summaryDataToSave, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, key;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                sensorIds = [];
                sensorsLogData = {};
                sensorsList = itemObj.sensorsInfo;
                floorIds = [];
                resultObj = {};
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context5.prev = 8;

                for (_iterator2 = sensorsList[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  sensorData = _step2.value;

                  sensorsLogData[sensorData.macAddress] = sensorData;
                  sensorIds.push(sensorData.macAddress);
                }
                _context5.next = 16;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](8);
                _didIteratorError2 = true;
                _iteratorError2 = _context5.t0;

              case 16:
                _context5.prev = 16;
                _context5.prev = 17;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 19:
                _context5.prev = 19;

                if (!_didIteratorError2) {
                  _context5.next = 22;
                  break;
                }

                throw _iteratorError2;

              case 22:
                return _context5.finish(19);

              case 23:
                return _context5.finish(16);

              case 24:
                _context5.prev = 24;
                AssetModel = ServiceLocator.resolve("AssetsModel");
                criteria = { "attributes.sensorId": { $in: sensorIds } };
                _context5.next = 29;
                return AssetModel.find(criteria).exec();

              case 29:
                sensorsDoc = _context5.sent;
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context5.prev = 33;
                _iterator3 = sensorsDoc[Symbol.iterator]();

              case 35:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context5.next = 79;
                  break;
                }

                sensorAsset = _step3.value;
                sensorLogData = sensorsLogData[sensorAsset.attributes.sensorId];
                _context5.next = 40;
                return this.statusCalculate(sensorLogData, sensorAsset);

              case 40:
                updatedData = _context5.sent;
                floorObj = { floorId: "", status: false };

                if (updatedData.state !== sensorAsset.attributes.state) {
                  floorObj.status = true;
                  floorObj.floorId = sensorAsset.parentAsset;
                  found = _lodash2.default.find(floorIds, { floorId: sensorAsset.parentAsset });

                  if (!found) {
                    floorIds.push(_lodash2.default.cloneDeep(floorObj));
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
                _context5.next = 53;
                return sensorAsset.save();

              case 53:
                keys = Object.keys(_sensorconfig.sensordata);
                summaryDataToSave = {};
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context5.prev = 58;

                for (_iterator4 = keys[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  key = _step4.value;

                  summaryDataToSave[key] = sensorAsset.attributes.data[key];
                }
                _context5.next = 66;
                break;

              case 62:
                _context5.prev = 62;
                _context5.t1 = _context5["catch"](58);
                _didIteratorError4 = true;
                _iteratorError4 = _context5.t1;

              case 66:
                _context5.prev = 66;
                _context5.prev = 67;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 69:
                _context5.prev = 69;

                if (!_didIteratorError4) {
                  _context5.next = 72;
                  break;
                }

                throw _iteratorError4;

              case 72:
                return _context5.finish(69);

              case 73:
                return _context5.finish(66);

              case 74:
                _context5.next = 76;
                return this.saveSensorSummary(summaryDataToSave, sensorAsset.id, "min/hour", "tempSensor", dttm);

              case 76:
                _iteratorNormalCompletion3 = true;
                _context5.next = 35;
                break;

              case 79:
                _context5.next = 85;
                break;

              case 81:
                _context5.prev = 81;
                _context5.t2 = _context5["catch"](33);
                _didIteratorError3 = true;
                _iteratorError3 = _context5.t2;

              case 85:
                _context5.prev = 85;
                _context5.prev = 86;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 88:
                _context5.prev = 88;

                if (!_didIteratorError3) {
                  _context5.next = 91;
                  break;
                }

                throw _iteratorError3;

              case 91:
                return _context5.finish(88);

              case 92:
                return _context5.finish(85);

              case 93:
                resultObj = { value: floorIds, status: 200 };
                _context5.next = 100;
                break;

              case 96:
                _context5.prev = 96;
                _context5.t3 = _context5["catch"](24);

                console.log("Error in summaryCalculate : ", _context5.t3);
                resultObj = { errorVal: _context5.t3, status: 500 };

              case 100:
                return _context5.abrupt("return", resultObj);

              case 101:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[8, 12, 16, 24], [17,, 19, 23], [24, 96], [33, 81, 85, 93], [58, 62, 66, 74], [67,, 69, 73], [86,, 88, 92]]);
      }));

      function summaryCalculate(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return summaryCalculate;
    }()

    // update status of sensor states

  }, {
    key: "statusCalculate",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(sensorlog, sensor) {
        var obj, criteriaList, ApplicationLookupsService, criteria, appLookUpList, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, item, defrostState, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, dfTm, newDate, nowtime, start, end;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                obj = { state: "", cnt: 0, batteryStatus: "", batteryLevel: 0, rssiLevel: 0 };
                criteriaList = {};
                _context6.prev = 2;
                ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
                criteria = sensor.attributes.deviceType ? {
                  $and: [{ listName: { $ne: "offlineCriteria" } }, { $or: [{ code: sensor.attributes.deviceType }, { code: "battery" }] }]
                } : { $and: [{ listName: { $ne: "offlineCriteria" } }, { $or: [{ code: "default" }, { code: "battery" }] }] };
                _context6.next = 7;
                return ApplicationLookupsService.getAllList(criteria);

              case 7:
                appLookUpList = _context6.sent;
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context6.prev = 11;

                for (_iterator5 = appLookUpList.value[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  item = _step5.value;

                  criteriaList[item.listName] = item;
                }
                _context6.next = 19;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](11);
                _didIteratorError5 = true;
                _iteratorError5 = _context6.t0;

              case 19:
                _context6.prev = 19;
                _context6.prev = 20;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 22:
                _context6.prev = 22;

                if (!_didIteratorError5) {
                  _context6.next = 25;
                  break;
                }

                throw _iteratorError5;

              case 25:
                return _context6.finish(22);

              case 26:
                return _context6.finish(19);

              case 27:
                if (criteriaList.opt1 > sensorlog.batteryVoltage) {
                  obj.batteryStatus = "bad";
                } else {
                  obj.batteryStatus = "good";
                }

                _context6.next = 30;
                return _utils2.default.getSensorVoltageLevel(sensorlog.batteryVoltage);

              case 30:
                obj.batteryLevel = _context6.sent;
                _context6.next = 33;
                return _utils2.default.getSensorRssiLevel(sensorlog.rssi);

              case 33:
                obj.rssiLevel = _context6.sent;
                defrostState = false;
                // # to check if state is defrost otherwise active or warning
                // if time now is between 16:00 and 17:00

                if (!(sensor.attributes.defrostCycles && sensor.attributes.defrostCycles.length > 0)) {
                  _context6.next = 55;
                  break;
                }

                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context6.prev = 39;

                for (_iterator6 = sensor.attributes.defrostCycles[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                  dfTm = _step6.value;
                  newDate = new Date();
                  nowtime = (0, _momentTimezone2.default)().format("HH:mm:ss");
                  start = (0, _momentTimezone2.default)(newDate.toDateString() + " " + dfTm.startTime).format("HH:mm:ss");
                  end = (0, _momentTimezone2.default)(newDate.toDateString() + " " + dfTm.endTime).format("HH:mm:ss");

                  if (nowtime > start && nowtime < end) {
                    defrostState = true;
                    obj.state = "defrost";
                  }
                }
                _context6.next = 47;
                break;

              case 43:
                _context6.prev = 43;
                _context6.t1 = _context6["catch"](39);
                _didIteratorError6 = true;
                _iteratorError6 = _context6.t1;

              case 47:
                _context6.prev = 47;
                _context6.prev = 48;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 50:
                _context6.prev = 50;

                if (!_didIteratorError6) {
                  _context6.next = 53;
                  break;
                }

                throw _iteratorError6;

              case 53:
                return _context6.finish(50);

              case 54:
                return _context6.finish(47);

              case 55:
                if (!defrostState) {
                  if (sensorlog.temperature >= criteriaList["temperatureCriteria"].opt1 && sensorlog.temperature <= criteriaList["temperatureCriteria"].opt2 && sensorlog.humidity >= criteriaList["humidityCriteria"].opt1 && sensorlog.humidity <= criteriaList["humidityCriteria"].opt2) {
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
                _context6.next = 61;
                break;

              case 58:
                _context6.prev = 58;
                _context6.t2 = _context6["catch"](2);
                return _context6.abrupt("return", "Error" + _context6.t2);

              case 61:
                return _context6.abrupt("return", obj);

              case 62:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 58], [11, 15, 19, 27], [20,, 22, 26], [39, 43, 47, 55], [48,, 50, 54]]);
      }));

      function statusCalculate(_x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return statusCalculate;
    }()
  }, {
    key: "floorStatescalulate",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(list) {
        var sensorlist, data, flag, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, sensor, keys, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, key, state;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                sensorlist = list;
                data = (0, _extends3.default)({}, _sensorconfig.sensorstate);
                flag = false;

                if (!sensorlist) {
                  _context7.next = 64;
                  break;
                }

                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                _context7.prev = 7;
                _iterator7 = sensorlist[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                  _context7.next = 50;
                  break;
                }

                sensor = _step7.value;
                keys = Object.keys(data);

                if (!sensor.attributes.data) {
                  _context7.next = 44;
                  break;
                }

                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                _context7.prev = 16;
                _iterator8 = keys[Symbol.iterator]();

              case 18:
                if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                  _context7.next = 28;
                  break;
                }

                key = _step8.value;
                state = sensor.attributes.state;

                if (!(state === key)) {
                  _context7.next = 25;
                  break;
                }

                data[key] = data[key] + 1;
                flag = true;
                return _context7.abrupt("break", 28);

              case 25:
                _iteratorNormalCompletion8 = true;
                _context7.next = 18;
                break;

              case 28:
                _context7.next = 34;
                break;

              case 30:
                _context7.prev = 30;
                _context7.t0 = _context7["catch"](16);
                _didIteratorError8 = true;
                _iteratorError8 = _context7.t0;

              case 34:
                _context7.prev = 34;
                _context7.prev = 35;

                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }

              case 37:
                _context7.prev = 37;

                if (!_didIteratorError8) {
                  _context7.next = 40;
                  break;
                }

                throw _iteratorError8;

              case 40:
                return _context7.finish(37);

              case 41:
                return _context7.finish(34);

              case 42:
                _context7.next = 46;
                break;

              case 44:
                data.offline = data.offline + 1;
                flag = true;

              case 46:
                if (!flag) {
                  data.offline = data.offline + 1;
                }

              case 47:
                _iteratorNormalCompletion7 = true;
                _context7.next = 9;
                break;

              case 50:
                _context7.next = 56;
                break;

              case 52:
                _context7.prev = 52;
                _context7.t1 = _context7["catch"](7);
                _didIteratorError7 = true;
                _iteratorError7 = _context7.t1;

              case 56:
                _context7.prev = 56;
                _context7.prev = 57;

                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }

              case 59:
                _context7.prev = 59;

                if (!_didIteratorError7) {
                  _context7.next = 62;
                  break;
                }

                throw _iteratorError7;

              case 62:
                return _context7.finish(59);

              case 63:
                return _context7.finish(56);

              case 64:
                return _context7.abrupt("return", data);

              case 65:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[7, 52, 56, 64], [16, 30, 34, 42], [35,, 37, 41], [57,, 59, 63]]);
      }));

      function floorStatescalulate(_x9) {
        return _ref7.apply(this, arguments);
      }

      return floorStatescalulate;
    }()
  }, {
    key: "summaryFloorStates",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(states, id, timeframe, name, dateTime) {
        var SensorSummaryModel, summaryModel, newSensorSummaryModel, savedSummary, summary, lastupdate, _newSensorSummaryModel;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
                summaryModel = {
                  timeFrame: timeframe,
                  date: (0, _momentTimezone2.default)(dateTime).utc().toDate(),
                  summaryName: name,
                  assetId: id,
                  data: states
                };

                if (!(states !== null)) {
                  _context8.next = 10;
                  break;
                }

                newSensorSummaryModel = new SensorSummaryModel(summaryModel);
                _context8.next = 6;
                return newSensorSummaryModel.save();

              case 6:
                savedSummary = _context8.sent;
                return _context8.abrupt("return", savedSummary);

              case 10:
                _context8.next = 12;
                return SensorSummaryModel.find({ assetId: id, summaryName: name }).sort({ date: "desc" }).limit(1).exec();

              case 12:
                summary = _context8.sent;

                if (!(summary.length > 0)) {
                  _context8.next = 19;
                  break;
                }

                lastupdate = summary[0];

                lastupdate.date = (0, _momentTimezone2.default)();
                _newSensorSummaryModel = new SensorSummaryModel(lastupdate);
                _context8.next = 19;
                return _newSensorSummaryModel.save();

              case 19:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function summaryFloorStates(_x10, _x11, _x12, _x13, _x14) {
        return _ref8.apply(this, arguments);
      }

      return summaryFloorStates;
    }()

    // Get last updated states summary for check states change or not

  }, {
    key: "getSummarylastdoc",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(id, name) {
        var resultObj, SensorSummaryModel, summary, lastupdate;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                resultObj = void 0;
                SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
                _context9.prev = 2;

                if (!id) {
                  _context9.next = 8;
                  break;
                }

                _context9.next = 6;
                return SensorSummaryModel.find({ assetId: id, summaryName: name }).sort({ date: "desc" }).limit(1).exec();

              case 6:
                summary = _context9.sent;

                if (summary.length > 0) {
                  lastupdate = summary[0];

                  resultObj = { value: lastupdate, status: 200 };
                } else {
                  resultObj = { value: "New", status: 200 };
                }

              case 8:
                _context9.next = 13;
                break;

              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9["catch"](2);

                resultObj = { errorVal: _context9.t0.toString(), status: 500 };

              case 13:
                return _context9.abrupt("return", resultObj);

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 10]]);
      }));

      function getSummarylastdoc(_x15, _x16) {
        return _ref9.apply(this, arguments);
      }

      return getSummarylastdoc;
    }()

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

  }, {
    key: "getFloorStateSummary",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req) {
        var SensorSummaryModel, resultObj, data, summary, keys, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, key, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, dat;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
                resultObj = void 0;
                data = [];
                _context10.prev = 3;
                _context10.next = 6;
                return SensorSummaryModel.find({ summaryName: "floorstate" }).sort({ date: "desc" }).exec();

              case 6:
                summary = _context10.sent;
                _context10.next = 9;
                return SensorSummaryModel.find({ summaryName: "floorstate" }).distinct("assetId").exec();

              case 9:
                keys = _context10.sent;
                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                _context10.prev = 13;
                _iterator9 = keys[Symbol.iterator]();

              case 15:
                if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                  _context10.next = 47;
                  break;
                }

                key = _step9.value;
                _iteratorNormalCompletion10 = true;
                _didIteratorError10 = false;
                _iteratorError10 = undefined;
                _context10.prev = 20;
                _iterator10 = summary[Symbol.iterator]();

              case 22:
                if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                  _context10.next = 30;
                  break;
                }

                dat = _step10.value;

                if (!(key === dat.assetId)) {
                  _context10.next = 27;
                  break;
                }

                data = [].concat((0, _toConsumableArray3.default)(data), [dat]);
                // console.log(dat);
                return _context10.abrupt("break", 30);

              case 27:
                _iteratorNormalCompletion10 = true;
                _context10.next = 22;
                break;

              case 30:
                _context10.next = 36;
                break;

              case 32:
                _context10.prev = 32;
                _context10.t0 = _context10["catch"](20);
                _didIteratorError10 = true;
                _iteratorError10 = _context10.t0;

              case 36:
                _context10.prev = 36;
                _context10.prev = 37;

                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                  _iterator10.return();
                }

              case 39:
                _context10.prev = 39;

                if (!_didIteratorError10) {
                  _context10.next = 42;
                  break;
                }

                throw _iteratorError10;

              case 42:
                return _context10.finish(39);

              case 43:
                return _context10.finish(36);

              case 44:
                _iteratorNormalCompletion9 = true;
                _context10.next = 15;
                break;

              case 47:
                _context10.next = 53;
                break;

              case 49:
                _context10.prev = 49;
                _context10.t1 = _context10["catch"](13);
                _didIteratorError9 = true;
                _iteratorError9 = _context10.t1;

              case 53:
                _context10.prev = 53;
                _context10.prev = 54;

                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                  _iterator9.return();
                }

              case 56:
                _context10.prev = 56;

                if (!_didIteratorError9) {
                  _context10.next = 59;
                  break;
                }

                throw _iteratorError9;

              case 59:
                return _context10.finish(56);

              case 60:
                return _context10.finish(53);

              case 61:
                // console.log(keys);
                resultObj = { value: data, status: 200 };
                _context10.next = 67;
                break;

              case 64:
                _context10.prev = 64;
                _context10.t2 = _context10["catch"](3);

                resultObj = { errorVal: _context10.t2.toString(), status: 500 };

              case 67:
                return _context10.abrupt("return", resultObj);

              case 68:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[3, 64], [13, 49, 53, 61], [20, 32, 36, 44], [37,, 39, 43], [54,, 56, 60]]);
      }));

      function getFloorStateSummary(_x17) {
        return _ref10.apply(this, arguments);
      }

      return getFloorStateSummary;
    }()
  }, {
    key: "cleanOlderData",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(dateTime) {
        var SensorSummaryModel, resultObj, time, currentDate, deleteData;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
                resultObj = void 0;
                _context11.prev = 2;
                time = ((_sensorconfig.timeLimit.hour * 60 + _sensorconfig.timeLimit.min) * 60 + _sensorconfig.timeLimit.sec) * 1000;
                currentDate = (0, _momentTimezone2.default)(dateTime ? dateTime : new Date()).utc();
                _context11.next = 7;
                return SensorSummaryModel.remove({ updatedAt: { $lt: currentDate - time } });

              case 7:
                deleteData = _context11.sent;

                resultObj = { value: deleteData, status: 200 };
                _context11.next = 14;
                break;

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11["catch"](2);

                resultObj = { errorVal: _context11.t0.toString(), status: 500 };

              case 14:
                return _context11.abrupt("return", resultObj);

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[2, 11]]);
      }));

      function cleanOlderData(_x18) {
        return _ref11.apply(this, arguments);
      }

      return cleanOlderData;
    }()
  }, {
    key: "getSummaryHours",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(summaryHour) {
        var AssetModel, SensorSummaryModel, resultObj, time, currentDate, deleteTime, Summary, data, filterFloorKeys, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, fkeys, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, item, sensData, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _item, obj;

        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                AssetModel = ServiceLocator.resolve("AssetsModel");
                SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
                resultObj = void 0;
                _context12.prev = 3;
                time = parseInt(summaryHour) * 60 * 60 * 1000;
                currentDate = (0, _momentTimezone2.default)(new Date()).utc().toDate();
                deleteTime = new Date(currentDate - time);
                _context12.next = 9;
                return SensorSummaryModel.find({ updatedAt: { $gt: deleteTime }, summaryName: "floorstate" }).sort({ date: "desc" }).exec();

              case 9:
                Summary = _context12.sent;
                data = { stateSummary: [], /* sensorSummary: [], sensorHourlySummary: [],*/sensorData: [] };

                if (!(Summary.length > 0)) {
                  _context12.next = 66;
                  break;
                }

                filterFloorKeys = _lodash2.default.uniqBy(Summary, "assetId");
                _iteratorNormalCompletion11 = true;
                _didIteratorError11 = false;
                _iteratorError11 = undefined;
                _context12.prev = 16;
                _iterator11 = filterFloorKeys[Symbol.iterator]();

              case 18:
                if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
                  _context12.next = 50;
                  break;
                }

                fkeys = _step11.value;
                _iteratorNormalCompletion12 = true;
                _didIteratorError12 = false;
                _iteratorError12 = undefined;
                _context12.prev = 23;
                _iterator12 = Summary[Symbol.iterator]();

              case 25:
                if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                  _context12.next = 33;
                  break;
                }

                item = _step12.value;

                if (!(item.summaryName === "floorstate" && fkeys.assetId === item.assetId)) {
                  _context12.next = 30;
                  break;
                }

                data.stateSummary.push(item);
                return _context12.abrupt("break", 33);

              case 30:
                _iteratorNormalCompletion12 = true;
                _context12.next = 25;
                break;

              case 33:
                _context12.next = 39;
                break;

              case 35:
                _context12.prev = 35;
                _context12.t0 = _context12["catch"](23);
                _didIteratorError12 = true;
                _iteratorError12 = _context12.t0;

              case 39:
                _context12.prev = 39;
                _context12.prev = 40;

                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                  _iterator12.return();
                }

              case 42:
                _context12.prev = 42;

                if (!_didIteratorError12) {
                  _context12.next = 45;
                  break;
                }

                throw _iteratorError12;

              case 45:
                return _context12.finish(42);

              case 46:
                return _context12.finish(39);

              case 47:
                _iteratorNormalCompletion11 = true;
                _context12.next = 18;
                break;

              case 50:
                _context12.next = 56;
                break;

              case 52:
                _context12.prev = 52;
                _context12.t1 = _context12["catch"](16);
                _didIteratorError11 = true;
                _iteratorError11 = _context12.t1;

              case 56:
                _context12.prev = 56;
                _context12.prev = 57;

                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                  _iterator11.return();
                }

              case 59:
                _context12.prev = 59;

                if (!_didIteratorError11) {
                  _context12.next = 62;
                  break;
                }

                throw _iteratorError11;

              case 62:
                return _context12.finish(59);

              case 63:
                return _context12.finish(56);

              case 64:
                _context12.next = 67;
                break;

              case 66:
                resultObj = { errorVal: "Data Not Found", status: 500 };

              case 67:
                _context12.next = 69;
                return AssetModel.find({ assetType: "Sensor" }).exec();

              case 69:
                sensData = _context12.sent;
                _iteratorNormalCompletion13 = true;
                _didIteratorError13 = false;
                _iteratorError13 = undefined;
                _context12.prev = 73;

                for (_iterator13 = sensData[Symbol.iterator](); !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                  _item = _step13.value;
                  obj = { id: "", attributes: "", parentAsset: "" };

                  obj.id = _item.id;
                  obj.parentAsset = _item.parentAsset;
                  obj.attributes = _item.attributes;
                  data.sensorData.push(_lodash2.default.cloneDeep(obj));
                }
                _context12.next = 81;
                break;

              case 77:
                _context12.prev = 77;
                _context12.t2 = _context12["catch"](73);
                _didIteratorError13 = true;
                _iteratorError13 = _context12.t2;

              case 81:
                _context12.prev = 81;
                _context12.prev = 82;

                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                  _iterator13.return();
                }

              case 84:
                _context12.prev = 84;

                if (!_didIteratorError13) {
                  _context12.next = 87;
                  break;
                }

                throw _iteratorError13;

              case 87:
                return _context12.finish(84);

              case 88:
                return _context12.finish(81);

              case 89:
                resultObj = { value: data, status: 200 };
                _context12.next = 95;
                break;

              case 92:
                _context12.prev = 92;
                _context12.t3 = _context12["catch"](3);

                resultObj = { errorVal: _context12.t3.toString(), status: 500 };

              case 95:
                return _context12.abrupt("return", resultObj);

              case 96:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[3, 92], [16, 52, 56, 64], [23, 35, 39, 47], [40,, 42, 46], [57,, 59, 63], [73, 77, 81, 89], [82,, 84, 88]]);
      }));

      function getSummaryHours(_x19) {
        return _ref12.apply(this, arguments);
      }

      return getSummaryHours;
    }()
  }, {
    key: "getSensorSummary",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(id) {
        var SensorSummaryModel, ApplicationLookupsService, summaryData, resultObj, criteria, timeLimitConfig, time, currentDate, deleteTime, Summary, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, item;

        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
                ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
                summaryData = { last24: [], lastHour: [] };
                resultObj = {};
                criteria = {
                  $and: [{ listName: "timeLimit" }, { code: "time" }]
                };
                _context13.next = 7;
                return ApplicationLookupsService.getAllList(criteria);

              case 7:
                timeLimitConfig = _context13.sent;
                _context13.prev = 8;
                time = parseInt(timeLimitConfig.value[0].opt1) * 60 * 60 * 1000;
                currentDate = (0, _momentTimezone2.default)(new Date()).utc().toDate();
                deleteTime = new Date(currentDate - time);
                _context13.next = 14;
                return SensorSummaryModel.find({ assetId: id, updatedAt: { $gt: deleteTime } }).exec();

              case 14:
                Summary = _context13.sent;

                if (!(Summary && Summary.length > 0)) {
                  _context13.next = 38;
                  break;
                }

                _iteratorNormalCompletion14 = true;
                _didIteratorError14 = false;
                _iteratorError14 = undefined;
                _context13.prev = 19;

                for (_iterator14 = Summary[Symbol.iterator](); !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                  item = _step14.value;

                  if (item.summaryName === "tempSensor") {
                    if (item.timeFrame === "SlidingHour") {
                      summaryData.lastHour.push(item);
                    } else if (item.timeFrame === "runningHour") {} else {
                      summaryData.last24.push(item);
                    }
                  }
                }
                _context13.next = 27;
                break;

              case 23:
                _context13.prev = 23;
                _context13.t0 = _context13["catch"](19);
                _didIteratorError14 = true;
                _iteratorError14 = _context13.t0;

              case 27:
                _context13.prev = 27;
                _context13.prev = 28;

                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                  _iterator14.return();
                }

              case 30:
                _context13.prev = 30;

                if (!_didIteratorError14) {
                  _context13.next = 33;
                  break;
                }

                throw _iteratorError14;

              case 33:
                return _context13.finish(30);

              case 34:
                return _context13.finish(27);

              case 35:
                resultObj = { value: summaryData, status: 200 };
                _context13.next = 39;
                break;

              case 38:
                resultObj = { errorVal: "Data Not Found", status: 500 };

              case 39:
                _context13.next = 44;
                break;

              case 41:
                _context13.prev = 41;
                _context13.t1 = _context13["catch"](8);

                console.log(_context13.t1);

              case 44:
                return _context13.abrupt("return", resultObj);

              case 45:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[8, 41], [19, 23, 27, 35], [28,, 30, 34]]);
      }));

      function getSensorSummary(_x20) {
        return _ref13.apply(this, arguments);
      }

      return getSensorSummary;
    }()
  }, {
    key: "saveSensorLog",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(data, dateTime) {
        var sensorLog, SocketIOService, resultObj, sensorInfo, assetId, sensorLogModel, AssetModel, assets, newModel, foundData, suppDevice, interPretedValue, stateArray, stateUpdate, savedSummary;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                sensorLog = ServiceLocator.resolve("SensorLogModel");
                SocketIOService = ServiceLocator.resolve("SocketIOService");
                //console.log(data.data.data);

                resultObj = void 0;
                sensorInfo = [];

                // let {data} = data.data.data;

                if (!data) {
                  _context14.next = 36;
                  break;
                }

                assetId = data.data.assetId;
                sensorLogModel = {
                  date: dateTime,
                  assetId: assetId,
                  sensorId: assetId,
                  // location: data["Location"],
                  // gateWayMac: data["GateWayMac"],
                  data: Object
                };
                AssetModel = ServiceLocator.resolve("AssetsModel");
                _context14.next = 10;
                return AssetModel.find().exec();

              case 10:
                assets = _context14.sent;


                // for (let item of data) {
                newModel = new sensorLog(sensorLogModel);
                foundData = assets.find(function (_ref15) {
                  var _id = _ref15._id;
                  return _id == assetId;
                });
                suppDevice = foundData.suppDevice;
                _context14.next = 16;
                return _helpers.SupportedDeviceHelpers.interpretData(data.data.data, suppDevice, foundData.state, ServiceLocator.resolve("DeviceModel"));

              case 16:
                interPretedValue = _context14.sent;

                AssetModel.updateOne({ _id: assetId }, { $set: { state: interPretedValue } }).exec();
                stateArray = [];
                stateUpdate = assets.find(function (_ref16) {
                  var _id = _ref16._id;
                  return _id == assetId;
                });

                stateArray.push(stateUpdate);
                SocketIOService.onDataReceiveFromGateway(stateArray);

                if (foundData) {
                  newModel.assetId = foundData.id;
                  newModel.sensorId = foundData.id;
                  newModel.data = data.data;
                  sensorInfo.push(newModel);
                }

                // }
                _context14.prev = 23;
                _context14.next = 26;
                return sensorLog.insertMany(sensorInfo);

              case 26:
                savedSummary = _context14.sent;

                //console.log(savedSummary);
                //   let savedSummary = await sensorLog.findOneAndUpdate({assetId:data['_id']},newModel,{new:true}).then(result => {
                //     console.log(result);
                //     res.status(200).json({ message: "Update Successful !!"});
                // });;
                resultObj = { value: savedSummary, status: 200 };
                _context14.next = 34;
                break;

              case 30:
                _context14.prev = 30;
                _context14.t0 = _context14["catch"](23);

                console.log("Error", _context14.t0);
                resultObj = { value: _context14.t0, status: 500 };

              case 34:
                _context14.next = 37;
                break;

              case 36:
                resultObj = { value: "Sensor Information Not received", status: 500 };

              case 37:
                return _context14.abrupt("return", resultObj);

              case 38:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[23, 30]]);
      }));

      function saveSensorLog(_x21, _x22) {
        return _ref14.apply(this, arguments);
      }

      return saveSensorLog;
    }()

    //check for check sensor data in summary table

  }, {
    key: "isExistSensorData",
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(data, sId, name) {
        var SensorSummaryModel, flag, foundData, currentHourStart, prevHourStart;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
                flag = true;
                _context15.next = 4;
                return SensorSummaryModel.find({ assetId: sId, summaryName: name }).sort({ date: "desc" }).limit(1).exec();

              case 4:
                foundData = _context15.sent;

                if (foundData.length > 0) {
                  currentHourStart = (0, _momentTimezone2.default)().startOf("hour");
                  prevHourStart = foundData[0].date;

                  flag = currentHourStart.isSame(prevHourStart, "hour");
                } else {
                  flag = false;
                }
                return _context15.abrupt("return", flag);

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function isExistSensorData(_x23, _x24, _x25) {
        return _ref17.apply(this, arguments);
      }

      return isExistSensorData;
    }()

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

  }, {
    key: "saveSensorSummary",
    value: function () {
      var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(dat, sId, timeframe, name, dttm) {
        var SensorSummaryModel, summaryModel, foundData, objSensorRecord, currentDate, dbTime, running, hourSumData, endOfDbTime, startofHour, newSensorSummaryModel, _newSensorSummaryModel2;

        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                SensorSummaryModel = ServiceLocator.resolve("SensorSummaryModel");
                summaryModel = {
                  timeFrame: timeframe,
                  date: null,
                  summaryName: name,
                  assetId: sId,
                  data: {}
                };
                _context16.next = 4;
                return SensorSummaryModel.find({ assetId: sId, summaryName: "tempSensor", timeFrame: "runningHour" }).exec();

              case 4:
                foundData = _context16.sent;
                objSensorRecord = { sensDate: dttm ? (0, _momentTimezone2.default)(dttm).toDate() : new Date(), sensData: {} };
                currentDate = (0, _momentTimezone2.default)(dttm ? dttm : new Date());
                _context16.next = 9;
                return this.saveSlidingHour(SensorSummaryModel, currentDate, (0, _extends3.default)({}, objSensorRecord), dat, sId);

              case 9:
                if (!(foundData.length > 0)) {
                  _context16.next = 43;
                  break;
                }

                dbTime = (0, _momentTimezone2.default)(foundData[0].date);
                running = dbTime.isSame((0, _momentTimezone2.default)(currentDate), "hour");
                // let after = dbTime.add(1, "hour").isAfter(moment(currentDate), "hour");
                // let currentTime = moment(currentDate)endOf("hour");
                // let tm = dbTime.isBefore(moment(currentDate), "hour") && dbTime.add(1, "hour").isAfter(moment(currentDate), "hour");

                if (!running) {
                  _context16.next = 20;
                  break;
                }

                objSensorRecord.sensData = dat;
                foundData[0].data.sensorRecord.push(objSensorRecord);
                foundData[0].markModified("data");
                _context16.next = 18;
                return foundData[0].save();

              case 18:
                _context16.next = 41;
                break;

              case 20:
                _context16.next = 22;
                return this.calculateSensorSummary(foundData[0].data.sensorRecord);

              case 22:
                hourSumData = _context16.sent;
                endOfDbTime = (0, _momentTimezone2.default)(dbTime).add(1, "h");
                startofHour = (0, _momentTimezone2.default)(dttm);

                summaryModel.date = endOfDbTime;
                summaryModel.summaryName = "tempSensor";
                summaryModel.data = { processData: hourSumData, rawData: foundData[0].data.sensorRecord };
                summaryModel.timeFrame = timeframe;
                newSensorSummaryModel = new SensorSummaryModel(summaryModel);
                _context16.next = 32;
                return newSensorSummaryModel.save();

              case 32:
                _context16.next = 34;
                return this.saveSensorReport(endOfDbTime.startOf("hour"), sId, "hourly", hourSumData);

              case 34:
                objSensorRecord.sensDate = (0, _momentTimezone2.default)(currentDate).toDate();
                objSensorRecord.sensData = dat;
                foundData[0].date = startofHour;
                foundData[0].data = { sensorRecord: [objSensorRecord] };
                foundData[0].markModified("data");
                _context16.next = 41;
                return foundData[0].save();

              case 41:
                _context16.next = 51;
                break;

              case 43:
                objSensorRecord.sensData = dat;

                summaryModel.date = dttm ? (0, _momentTimezone2.default)(dttm).startOf("hour") : (0, _momentTimezone2.default)().startOf("hour");
                summaryModel.summaryName = "tempSensor";
                summaryModel.data = { sensorRecord: [objSensorRecord] };
                summaryModel.timeFrame = "runningHour";
                _newSensorSummaryModel2 = new SensorSummaryModel(summaryModel);
                _context16.next = 51;
                return _newSensorSummaryModel2.save();

              case 51:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function saveSensorSummary(_x26, _x27, _x28, _x29, _x30) {
        return _ref18.apply(this, arguments);
      }

      return saveSensorSummary;
    }()
  }, {
    key: "saveSlidingHour",
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(SensorSummaryModel, currentTime, sensorObj, dat, sId) {
        var slidingSensor, prevSlidingHour, s;
        return _regenerator2.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                slidingSensor = {
                  timeFrame: "SlidingHour",
                  date: currentTime.toDate(),
                  summaryName: "tempSensor",
                  assetId: sId,
                  data: { sensorObj: sensorObj }
                };

                sensorObj.sensData = dat;
                _context17.next = 4;
                return SensorSummaryModel.findOne({ summaryName: "tempSensor", timeFrame: "SlidingHour", assetId: sId }).exec();

              case 4:
                prevSlidingHour = _context17.sent;

                if (!prevSlidingHour) {
                  _context17.next = 13;
                  break;
                }

                prevSlidingHour.data.sensorRecord.push(sensorObj);
                _lodash2.default.remove(prevSlidingHour.data.sensorRecord, function (s) {
                  return (0, _momentTimezone2.default)(s.sensDate).isBefore((0, _momentTimezone2.default)(currentTime).subtract(60, "minute"));
                });
                prevSlidingHour.markModified("data");
                _context17.next = 11;
                return prevSlidingHour.save();

              case 11:
                _context17.next = 17;
                break;

              case 13:
                slidingSensor.data = { sensorRecord: [sensorObj] };
                s = new SensorSummaryModel(slidingSensor);
                _context17.next = 17;
                return s.save();

              case 17:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function saveSlidingHour(_x31, _x32, _x33, _x34, _x35) {
        return _ref19.apply(this, arguments);
      }

      return saveSlidingHour;
    }()

    // save report in report collection

  }, {
    key: "saveSensorReport",
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(date, id, timeframe, data) {
        var SensorReportModel, ReportModel, newSensorSummaryModel;
        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                SensorReportModel = ServiceLocator.resolve("SensorReportModel");
                ReportModel = {
                  date: "",
                  assetId: "",
                  timeFrame: "",
                  data: {}
                };

                ReportModel.date = date;
                ReportModel.assetId = id;
                ReportModel.data = data;
                ReportModel.timeFrame = timeframe;
                newSensorSummaryModel = new SensorReportModel(ReportModel);
                _context18.next = 9;
                return newSensorSummaryModel.save();

              case 9:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function saveSensorReport(_x36, _x37, _x38, _x39) {
        return _ref20.apply(this, arguments);
      }

      return saveSensorReport;
    }()
  }, {
    key: "calculateSensorSummary",
    value: function () {
      var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(sumdata) {
        var sumData, sumTemp, sumHumi, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, item;

        return _regenerator2.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                sumData = { temperature: { min: 0, max: 0, avg: 0 }, humidity: { min: 0, max: 0, avg: 0 } };
                sumTemp = 0;
                sumHumi = 0;
                // let foundData = await this.getSensorLog(1, "hour", sId);

                if (!(sumdata.length > 0)) {
                  _context19.next = 29;
                  break;
                }

                sumData.temperature.min = sumdata[0].sensData.temperature;
                sumData.temperature.max = sumdata[0].sensData.temperature;
                sumData.humidity.min = sumdata[0].sensData.humidity;
                sumData.humidity.max = sumdata[0].sensData.humidity;

                _iteratorNormalCompletion15 = true;
                _didIteratorError15 = false;
                _iteratorError15 = undefined;
                _context19.prev = 11;
                for (_iterator15 = sumdata[Symbol.iterator](); !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                  item = _step15.value;

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
                _context19.next = 19;
                break;

              case 15:
                _context19.prev = 15;
                _context19.t0 = _context19["catch"](11);
                _didIteratorError15 = true;
                _iteratorError15 = _context19.t0;

              case 19:
                _context19.prev = 19;
                _context19.prev = 20;

                if (!_iteratorNormalCompletion15 && _iterator15.return) {
                  _iterator15.return();
                }

              case 22:
                _context19.prev = 22;

                if (!_didIteratorError15) {
                  _context19.next = 25;
                  break;
                }

                throw _iteratorError15;

              case 25:
                return _context19.finish(22);

              case 26:
                return _context19.finish(19);

              case 27:
                sumData.temperature.avg = sumTemp / sumdata.length;
                sumData.humidity.avg = sumHumi / sumdata.length;

              case 29:
                return _context19.abrupt("return", sumData);

              case 30:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[11, 15, 19, 27], [20,, 22, 26]]);
      }));

      function calculateSensorSummary(_x40) {
        return _ref21.apply(this, arguments);
      }

      return calculateSensorSummary;
    }()

    //time value set hour or minute in number(1 to 60)
    //timeType value set "hour" or "minute" in string

  }, {
    key: "getSensorLog",
    value: function () {
      var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(time, timeType) {
        var sId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "All";
        var sensorLog, timeFilter, foundData;
        return _regenerator2.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.prev = 0;
                sensorLog = ServiceLocator.resolve("SensorLogModel");
                // Fetch data from the start of the day

                timeFilter = (0, _momentTimezone2.default)().startOf("day").subtract(time, timeType);
                _context20.next = 5;
                return sensorLog.find(sId === "All" ? { createdAt: { $gt: timeFilter } } : { sensorId: sId, createdAt: { $gt: timeFilter } }).exec();

              case 5:
                foundData = _context20.sent;
                return _context20.abrupt("return", foundData);

              case 9:
                _context20.prev = 9;
                _context20.t0 = _context20["catch"](0);

                console.log("Error line 362", _context20.t0);

              case 12:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[0, 9]]);
      }));

      function getSensorLog(_x42, _x43) {
        return _ref22.apply(this, arguments);
      }

      return getSensorLog;
    }()

    // get defrost cycle of sensor

  }, {
    key: "detectDefrostCycles",
    value: function () {
      var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(sId) {
        var resultObj, defrostCycles, ApplicationLookupsService, appLookUpList, minDefrostTimeInSeconds, numberOfDaysForDefrost, data, firstDayData, secondDayData, expectedDefCyclesFirstDay, expectedDefCyclesSecondDay, i, defrostHeaterDuration;
        return _regenerator2.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                resultObj = void 0;
                defrostCycles = [];
                _context21.prev = 2;
                ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
                // Fetch the minimum duration of a defrost cycle from AppLookup

                _context21.next = 6;
                return ApplicationLookupsService.getAllList({ code: "defrost" });

              case 6:
                appLookUpList = _context21.sent;
                minDefrostTimeInSeconds = appLookUpList.value[0].opt1; // seconds
                // TODO: Get the number of days to look for from AppLookup i.e. 2
                // TODO: Get sensor log data (based on UTC time) for last 3 days from 12:00 AM to next day's 12:00 AM.

                numberOfDaysForDefrost = 2;
                _context21.next = 11;
                return this.getSensorLog(numberOfDaysForDefrost, "days", sId);

              case 11:
                data = _context21.sent;

                if (data.length > 0) {
                  firstDayData = _lodash2.default.filter(data, function (o) {
                    return (0, _momentTimezone2.default)(o.date) > (0, _momentTimezone2.default)().startOf("day").subtract(1, "day") && (0, _momentTimezone2.default)(o.date) < (0, _momentTimezone2.default)().startOf("day");
                  });
                  secondDayData = _lodash2.default.filter(data, function (o) {
                    return (0, _momentTimezone2.default)(o.date) > (0, _momentTimezone2.default)().startOf("day").subtract(2, "days") && (0, _momentTimezone2.default)(o.date) < (0, _momentTimezone2.default)().startOf("day").subtract(1, "day");
                  });
                  expectedDefCyclesFirstDay = this.detectSensorDefrostCycles(firstDayData, minDefrostTimeInSeconds);
                  expectedDefCyclesSecondDay = this.detectSensorDefrostCycles(secondDayData, minDefrostTimeInSeconds);
                  // TODO: Update following condition according to {numberOfDaysForDefrost} parameter

                  if (expectedDefCyclesSecondDay.length > 0 && expectedDefCyclesFirstDay.length > 0) {
                    defrostCycles = this.verifyDetectedDefrostCycle(expectedDefCyclesSecondDay, expectedDefCyclesFirstDay);
                  }

                  // Time Fomatting
                  for (i = 0; i < defrostCycles.length; i += 1) {
                    defrostHeaterDuration = ((0, _momentTimezone2.default)(defrostCycles[i].endTime) - (0, _momentTimezone2.default)(defrostCycles[i].startTime)) / (1000 * 60);

                    defrostCycles[i].startTime = (0, _momentTimezone2.default)(defrostCycles[i].startTime).format("hh:mm A");
                    defrostCycles[i].endTime = (0, _momentTimezone2.default)(defrostCycles[i].endTime).add(defrostHeaterDuration, "minutes").format("hh:mm A");
                  }
                  // console.log(defrostCycles);

                  if (defrostCycles.length > 0) {
                    resultObj = { value: defrostCycles, status: 200 };
                  } else {
                    resultObj = {
                      value: { Error: "data not found. At least " + numberOfDaysForDefrost + " days data enter in system" },
                      status: 200
                    };
                  }
                } else {
                  resultObj = { value: { Error: "data not found. At least " + numberOfDaysForDefrost + " days data enter in system" }, status: 200 };
                }
                _context21.next = 19;
                break;

              case 15:
                _context21.prev = 15;
                _context21.t0 = _context21["catch"](2);

                console.log("Error in detect defrost cycles : ", _context21.t0);
                resultObj = { errorVal: _context21.t0, status: 500 };

              case 19:
                return _context21.abrupt("return", resultObj);

              case 20:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this, [[2, 15]]);
      }));

      function detectDefrostCycles(_x44) {
        return _ref23.apply(this, arguments);
      }

      return detectDefrostCycles;
    }()
  }, {
    key: "detectSensorDefrostCycles",
    value: function detectSensorDefrostCycles(sensorData, defrostTimeLimit) {
      var defrostCycles = [];
      if (sensorData.length > 0) {
        var temporaryTemp = sensorData[0].data["temperature"];
        var increasedTemp = [];
        for (var i = 0; i < sensorData.length; i++) {
          if (temporaryTemp <= sensorData[i].data["temperature"]) {
            increasedTemp.push(sensorData[i]);
          } else {
            if (increasedTemp.length > 0) {
              var cycleData = _lodash2.default.sortBy(increasedTemp, "date");
              var timeDiff = (0, _momentTimezone2.default)(cycleData[cycleData.length - 1].date).diff(cycleData[0].date, "seconds");
              // console.log(timeDiff);
              if (timeDiff > defrostTimeLimit) {
                var defrostCycleObj = { startTime: "", endTime: "", lowTemp: "", hightemp: "" };
                defrostCycleObj.startTime = (0, _momentTimezone2.default)(cycleData[0].date);
                defrostCycleObj.endTime = (0, _momentTimezone2.default)(cycleData[cycleData.length - 1].date);
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
  }, {
    key: "verifyDetectedDefrostCycle",
    value: function verifyDetectedDefrostCycle(firstData, secondData) {
      var verifiedCycles = [];
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = firstData[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var fItem = _step16.value;

          var fStart = (0, _momentTimezone2.default)(fItem.startTime).format("H:mm");
          var fEnd = (0, _momentTimezone2.default)(fItem.endTime).format("H:mm");
          var _iteratorNormalCompletion17 = true;
          var _didIteratorError17 = false;
          var _iteratorError17 = undefined;

          try {
            for (var _iterator17 = secondData[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
              var secItem = _step17.value;

              var secStart = (0, _momentTimezone2.default)(secItem.startTime).format("H:mm");
              var secEnd = (0, _momentTimezone2.default)(secItem.endTime).format("H:mm");
              if (fStart === secStart && fEnd === secEnd) {
                verifiedCycles.push(secItem);
                break;
              } else {
                var startDiff = this.getMinDiff(fItem.startTime, secItem.startTime);
                var endDiff = this.getMinDiff(fItem.endTime, secItem.endTime);
                if (startDiff <= 4 && endDiff <= 4) {
                  verifiedCycles.push(secItem);
                  break;
                }
              }
            }
          } catch (err) {
            _didIteratorError17 = true;
            _iteratorError17 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion17 && _iterator17.return) {
                _iterator17.return();
              }
            } finally {
              if (_didIteratorError17) {
                throw _iteratorError17;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16.return) {
            _iterator16.return();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }

      return verifiedCycles;
    }
  }, {
    key: "getMinDiff",
    value: function getMinDiff(_date1, _date2) {
      var currDate = new Date();
      var date1 = new Date(_date1);
      var date2 = new Date(_date2);
      date1.setDate(currDate.getDate());
      date2.setDate(currDate.getDate());
      // let date2Local = new Date(date2.toLocaleTimeString())
      var timeDiff = date1 - date2;
      var minutes = Math.abs(Math.round(timeDiff / (1000 * 60)));
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

  }]);
  return SensorLogService;
}();

exports.default = SensorLogService;