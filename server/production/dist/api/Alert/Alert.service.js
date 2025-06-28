"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _path = require("path");

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var _ = require("lodash");


var schedule = require("node-schedule");
var AlertModel = require("./Alert.model");

var AlertService = function () {
  function AlertService() {
    (0, _classCallCheck3.default)(this, AlertService);

    this.logger = ServiceLocator.resolve("logger");
    // this.NotificationService = ServiceLocator.resolve("NotificationService");
  }

  (0, _createClass3.default)(AlertService, [{
    key: "fetchAlertsByModelId",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(modelId) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  AlertModel.find({ "reference.modelId": modelId }, function (err, alerts) {
                    if (err) {
                      console.log("Error in startAlertsMonitoring");
                      reject(new Error(err));
                      return false;
                    }

                    resolve(alerts);
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchAlertsByModelId(_x) {
        return _ref.apply(this, arguments);
      }

      return fetchAlertsByModelId;
    }()

    // This function recieves modelId

  }, {
    key: "recalculateAlertMonitoringByModelId",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(modelId) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.fetchAlertsByModelId(modelId).then(function (alerts) {
                  alerts.forEach(function () {
                    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(alert) {
                      var model, modelObj, constructedMessage;
                      return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              model = ServiceLocator.resolve(alert.reference.model);
                              _context2.next = 3;
                              return model.findOne({ _id: modelId }).exec();

                            case 3:
                              modelObj = _context2.sent;

                              if (!modelObj) {
                                _context2.next = 11;
                                break;
                              }

                              if (!(modelObj[alert.reference.field] !== alert.eventExactDate)) {
                                _context2.next = 11;
                                break;
                              }

                              alert.eventExactDate = modelObj[alert.reference.field];
                              alert = _this.calculateAlertTime(alert, alert.timezone);

                              if (alert.event === 'exact') {
                                constructedMessage = _this.constructMessage(alert, modelObj.title);


                                alert.title = constructedMessage.title;
                                alert.message = constructedMessage.message;
                              }

                              _context2.next = 11;
                              return alert.save();

                            case 11:

                              // start monitoring job
                              _this.stopMonitoring(alert.cronJobId);
                              _this.startMonitoringAlert(alert.cronJobId, { date: alert.alertTime, type: "date", timezone: alert.timezone });

                            case 13:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2, _this);
                    }));

                    return function (_x3) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                }).catch(function (err) {
                  console.log("Alert.service.recalculateAlertMonitoringByModelId", err.toString());
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function recalculateAlertMonitoringByModelId(_x2) {
        return _ref2.apply(this, arguments);
      }

      return recalculateAlertMonitoringByModelId;
    }()

    // Restart all cron jobs.

  }, {
    key: "startAlertsMonitoring",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                AlertModel.find({}, function (err, alerts) {
                  if (err) {
                    console.log("Error in startAlertsMonitoring");
                    return false;
                  }

                  alerts.forEach(function (alert) {
                    // first cancel the previous job;
                    _this2.stopMonitoring(alert.cronJobId);
                    // start monitoring job
                    _this2.startMonitoringAlert(alert.cronJobId, { date: alert.alertTime, type: "date", timezone: alert.timezone });
                  });
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function startAlertsMonitoring() {
        return _ref4.apply(this, arguments);
      }

      return startAlertsMonitoring;
    }()

    // create new alert.

  }, {
    key: "create",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(data, cronJobId) {
        var alertData, newAlert, created;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // initialize a object for alert model to store in db
                alertData = (0, _extends3.default)({
                  cronJobId: cronJobId
                }, data);
                newAlert = new AlertModel(alertData);
                created = null;
                _context5.prev = 3;
                _context5.next = 6;
                return newAlert.save();

              case 6:
                created = _context5.sent;
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](3);

                console.log("Error in creating alert Alert.serive.create", _context5.t0);

              case 12:
                return _context5.abrupt("return", created);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 9]]);
      }));

      function create(_x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return create;
    }()

    // create new alert.

  }, {
    key: "update",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(data) {
        var alert;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                alert = AlertModel.update({ _id: data._id }, data, { upset: true, setDefaultsOnInsert: true }).exec();

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function update(_x6) {
        return _ref6.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "addMultipleAlerts",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(alerts, modelId, model, modelObjectTitle, timezone) {
        var modelService, modelObj, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, alert;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                modelService = ServiceLocator.resolve(model);
                modelObj = modelService.findOne({ _id: modelId }).exec();

                if (!(alerts && alerts.length)) {
                  _context7.next = 29;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context7.prev = 6;
                _iterator = alerts[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context7.next = 15;
                  break;
                }

                alert = _step.value;
                _context7.next = 12;
                return this.addAlerts(alert, modelId, model, modelObjectTitle, timezone, modelObj);

              case 12:
                _iteratorNormalCompletion = true;
                _context7.next = 8;
                break;

              case 15:
                _context7.next = 21;
                break;

              case 17:
                _context7.prev = 17;
                _context7.t0 = _context7["catch"](6);
                _didIteratorError = true;
                _iteratorError = _context7.t0;

              case 21:
                _context7.prev = 21;
                _context7.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 24:
                _context7.prev = 24;

                if (!_didIteratorError) {
                  _context7.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context7.finish(24);

              case 28:
                return _context7.finish(21);

              case 29:

                this.startAlertsMonitoring(timezone);

              case 30:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[6, 17, 21, 29], [22,, 24, 28]]);
      }));

      function addMultipleAlerts(_x7, _x8, _x9, _x10, _x11) {
        return _ref7.apply(this, arguments);
      }

      return addMultipleAlerts;
    }()
  }, {
    key: "updateMultipleAlerts",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(alerts, modelId, model, modelObjectTitle, timezone) {
        var _this3 = this;

        var modelService, modelObj, alertRules, _loop, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, alertRule, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, alert;

        return _regenerator2.default.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                modelService = ServiceLocator.resolve(model);
                _context9.next = 3;
                return modelService.findOne({ _id: modelId }).exec();

              case 3:
                modelObj = _context9.sent;
                _context9.next = 6;
                return this.fetchAlertsByModelId(modelId);

              case 6:
                alertRules = _context9.sent;

                if (!(alertRules && alertRules.length)) {
                  _context9.next = 34;
                  break;
                }

                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(alertRule) {
                  var alertRuleObj, find;
                  return _regenerator2.default.wrap(function _loop$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          alertRuleObj = alertRule.toObject();
                          find = alerts.find(function (al) {
                            if (!al._id || !alertRuleObj._id) return false;
                            return al._id.toString() === alertRuleObj._id.toString();
                          });

                          if (find) {
                            _context8.next = 5;
                            break;
                          }

                          _context8.next = 5;
                          return alertRule.remove();

                        case 5:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _loop, _this3);
                });
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context9.prev = 12;
                _iterator2 = alertRules[Symbol.iterator]();

              case 14:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context9.next = 20;
                  break;
                }

                alertRule = _step2.value;
                return _context9.delegateYield(_loop(alertRule), "t0", 17);

              case 17:
                _iteratorNormalCompletion2 = true;
                _context9.next = 14;
                break;

              case 20:
                _context9.next = 26;
                break;

              case 22:
                _context9.prev = 22;
                _context9.t1 = _context9["catch"](12);
                _didIteratorError2 = true;
                _iteratorError2 = _context9.t1;

              case 26:
                _context9.prev = 26;
                _context9.prev = 27;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 29:
                _context9.prev = 29;

                if (!_didIteratorError2) {
                  _context9.next = 32;
                  break;
                }

                throw _iteratorError2;

              case 32:
                return _context9.finish(29);

              case 33:
                return _context9.finish(26);

              case 34:
                if (!(alerts && alerts.length)) {
                  _context9.next = 61;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context9.prev = 38;
                _iterator3 = alerts[Symbol.iterator]();

              case 40:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context9.next = 47;
                  break;
                }

                alert = _step3.value;
                _context9.next = 44;
                return this.addAlerts(alert, modelId, model, modelObjectTitle, timezone, modelObj);

              case 44:
                _iteratorNormalCompletion3 = true;
                _context9.next = 40;
                break;

              case 47:
                _context9.next = 53;
                break;

              case 49:
                _context9.prev = 49;
                _context9.t2 = _context9["catch"](38);
                _didIteratorError3 = true;
                _iteratorError3 = _context9.t2;

              case 53:
                _context9.prev = 53;
                _context9.prev = 54;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 56:
                _context9.prev = 56;

                if (!_didIteratorError3) {
                  _context9.next = 59;
                  break;
                }

                throw _iteratorError3;

              case 59:
                return _context9.finish(56);

              case 60:
                return _context9.finish(53);

              case 61:

                this.startAlertsMonitoring();

              case 62:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee8, this, [[12, 22, 26, 34], [27,, 29, 33], [38, 49, 53, 61], [54,, 56, 60]]);
      }));

      function updateMultipleAlerts(_x12, _x13, _x14, _x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return updateMultipleAlerts;
    }()
  }, {
    key: "timeConvert",
    value: function timeConvert(time, unitOfTime) {
      var days = void 0,
          minutes = void 0,
          hours = void 0;
      switch (unitOfTime) {
        case 'minutes':
          days = parseInt(time / 24 / 60);
          hours = parseInt(time / 60 % 24);
          minutes = parseInt(time % 60);

          if (days > 0) return days + " days " + hours + " hours and " + minutes + " minutes";else if (hours > 0) return hours + " hours and " + minutes + " minutes";

          return minutes + " minutes";
        case 'hours':
          days = parseInt(time / 24);
          hours = parseInt(time % 24);

          if (days > 0) return days + " days and " + hours + " hours";else if (hours > 0) return hours + " hours";

          return minutes + " minutes";
        default:
          return time + " " + unitOfTime;
      }
    }

    // 1st param "fields" array of objects
    // 2nd param uniqueId for cronJob ex: modelId
    // 3rd param model of event
    // 4th param object title
    // This function is use for add or update alert.

  }, {
    key: "addAlerts",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(alertRule, modelId, model, modelObjectTitle, timezone, modelObj) {
        var field, constructedMessage, oldAlert;
        return _regenerator2.default.wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (modelObj) {
                  alertRule.eventExactDate = modelObj[alertRule.field];
                }

                field = this.processAlertObjectToSaveInDB(alertRule, modelId, model, timezone);
                constructedMessage = this.constructMessage(alertRule, modelObjectTitle);

                field = (0, _extends3.default)({}, field, constructedMessage);

                _context10.next = 6;
                return AlertModel.findOne({ cronJobId: field.cronJobId }).exec();

              case 6:
                oldAlert = _context10.sent;

                if (!(alertRule._id || oldAlert)) {
                  _context10.next = 13;
                  break;
                }

                _context10.next = 10;
                return this.update(field);

              case 10:
                field = _context10.sent;
                _context10.next = 16;
                break;

              case 13:
                _context10.next = 15;
                return this.create(field);

              case 15:
                field = _context10.sent;

              case 16:
                return _context10.abrupt("return", field);

              case 17:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee9, this);
      }));

      function addAlerts(_x17, _x18, _x19, _x20, _x21, _x22) {
        return _ref9.apply(this, arguments);
      }

      return addAlerts;
    }()
  }, {
    key: "constructMessage",
    value: function constructMessage(alertRule, modelObjectTitle) {
      var title = "";
      var message = "";

      var fieldDisplayText = alertRule.field;

      if (alertRule.reference && alertRule.reference.fieldDisplayText) fieldDisplayText = alertRule.reference.fieldDisplayText;

      if (alertRule.fieldDisplayText) fieldDisplayText = alertRule.fieldDisplayText;

      if (alertRule.event === 'exact') {
        title = "Inspection " + modelObjectTitle + " Started";
        message = "Inspection " + modelObjectTitle + " has been started on " + (0, _momentTimezone2.default)(alertRule.eventExactDate).format('LLLL');
      } else if (alertRule.event === "before") {
        title = modelObjectTitle + " is approaching its " + fieldDisplayText;
        message = title + " in " + this.timeConvert(alertRule.time, alertRule.unitOfTime) + ", Please take appropriate action";
      } else {
        title = modelObjectTitle + " has passed its " + fieldDisplayText;
        message = title + ", Please take appropriate action";
      }

      return {
        title: title,
        message: message
      };
    }
  }, {
    key: "processAlertObjectToSaveInDB",
    value: function processAlertObjectToSaveInDB(object, modelId, model, timezone) {
      var field = object.field;
      var event = object.event;
      var fieldDisplayText = object.fieldDisplayText;
      object.timezone = timezone;
      object.reference = {
        modelId: modelId,
        model: model,
        field: field,
        fieldDisplayText: fieldDisplayText
      };

      var type = Array.isArray(object.type) ? object.type[0] : object.type;
      object.cronJobId = modelId + "_" + field + "_" + type + "_" + event + "_" + object.time;
      object.timeDifference = object.time;

      object = this.calculateAlertTime(object, timezone);

      return object;
    }
  }, {
    key: "calculateAlertTime",
    value: function calculateAlertTime(object, timezone) {
      var date = (0, _momentTimezone2.default)(object.eventExactDate).tz(timezone);
      if (object.event === "before") {
        object.alertTime = date.subtract(object.timeDifference, object.unitOfTime).format("LLLL");
      } else {
        object.alertTime = date.add(object.timeDifference, object.unitOfTime).format("LLLL");
      }

      return object;
    }
  }, {
    key: "deleteAlertByModelId",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(modelId) {
        var _this4 = this;

        return _regenerator2.default.wrap(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                AlertModel.find({ "reference.modelId": modelId }, function () {
                  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(err, res) {
                    var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, alert;

                    return _regenerator2.default.wrap(function _callee10$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            if (!err) {
                              _context11.next = 3;
                              break;
                            }

                            console.log("Error in delete alert.service.deleteAlertByModelId", err);
                            return _context11.abrupt("return", false);

                          case 3:
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            _context11.prev = 6;
                            _iterator4 = res[Symbol.iterator]();

                          case 8:
                            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                              _context11.next = 16;
                              break;
                            }

                            alert = _step4.value;

                            // First stop cronjob for this alert then delete the model from database;
                            _this4.stopMonitoring(alert.cronJobId);
                            _context11.next = 13;
                            return alert.remove();

                          case 13:
                            _iteratorNormalCompletion4 = true;
                            _context11.next = 8;
                            break;

                          case 16:
                            _context11.next = 22;
                            break;

                          case 18:
                            _context11.prev = 18;
                            _context11.t0 = _context11["catch"](6);
                            _didIteratorError4 = true;
                            _iteratorError4 = _context11.t0;

                          case 22:
                            _context11.prev = 22;
                            _context11.prev = 23;

                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                              _iterator4.return();
                            }

                          case 25:
                            _context11.prev = 25;

                            if (!_didIteratorError4) {
                              _context11.next = 28;
                              break;
                            }

                            throw _iteratorError4;

                          case 28:
                            return _context11.finish(25);

                          case 29:
                            return _context11.finish(22);

                          case 30:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee10, _this4, [[6, 18, 22, 30], [23,, 25, 29]]);
                  }));

                  return function (_x24, _x25) {
                    return _ref11.apply(this, arguments);
                  };
                }());

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee11, this);
      }));

      function deleteAlertByModelId(_x23) {
        return _ref10.apply(this, arguments);
      }

      return deleteAlertByModelId;
    }()
  }, {
    key: "startMonitoringAlert",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(cronJobId, interval) {
        var _this5 = this;

        var rule, formatOfDate;
        return _regenerator2.default.wrap(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                rule = new schedule.RecurrenceRule();

                rule.tz = interval.timezone || "America/New_York";
                // console.log('timezone: ', interval.timezone);
                // rule.tz = "Asia/Karachi";
                formatOfDate = "LLLL";
                _context15.t0 = interval.type;
                _context15.next = _context15.t0 === "hourly" ? 6 : _context15.t0 === "daily" ? 8 : _context15.t0 === "weekly" ? 12 : _context15.t0 === "monthly" ? 16 : _context15.t0 === "yearly" ? 17 : 18;
                break;

              case 6:
                rule.minute = (0, _momentTimezone2.default)(interval.date, formatOfDate).minute();
                return _context15.abrupt("break", 23);

              case 8:
                rule.minute = (0, _momentTimezone2.default)(interval.date, formatOfDate).minute();
                rule.hour = (0, _momentTimezone2.default)(interval.date, formatOfDate).hour();
                rule.date = (0, _momentTimezone2.default)(interval.date, formatOfDate).format("DD");
                return _context15.abrupt("break", 23);

              case 12:
                rule.minute = (0, _momentTimezone2.default)(interval.date, formatOfDate).minute();
                rule.hour = (0, _momentTimezone2.default)(interval.date, formatOfDate).hour();
                rule.dayOfWeek = 0;
                return _context15.abrupt("break", 23);

              case 16:
                return _context15.abrupt("break", 23);

              case 17:
                return _context15.abrupt("break", 23);

              case 18:
                rule.year = (0, _momentTimezone2.default)(interval.date, formatOfDate).year();
                rule.month = parseInt((0, _momentTimezone2.default)(interval.date, formatOfDate).format("M")) - 1;
                rule.date = (0, _momentTimezone2.default)(interval.date, formatOfDate).format("DD");
                rule.hour = (0, _momentTimezone2.default)(interval.date, formatOfDate).hour();
                rule.minute = (0, _momentTimezone2.default)(interval.date, formatOfDate).minute();

              case 23:

                //start schedule
                schedule.scheduleJob(cronJobId, rule, function () {
                  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(fireDate) {
                    return _regenerator2.default.wrap(function _callee13$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            // Cron job logic.
                            // console.log("Cron job called its schedule at: " + fireDate + "With job id: " + cronJobId);
                            AlertModel.findOne({ cronJobId: cronJobId }, function () {
                              var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(err, alert) {
                                var alertJsonObj, NotificationService, data;
                                return _regenerator2.default.wrap(function _callee12$(_context13) {
                                  while (1) {
                                    switch (_context13.prev = _context13.next) {
                                      case 0:
                                        if (!err) {
                                          _context13.next = 3;
                                          break;
                                        }

                                        console.log("Error in running cronjob", err);
                                        return _context13.abrupt("return", false);

                                      case 3:
                                        if (alert) {
                                          _context13.next = 6;
                                          break;
                                        }

                                        console.log("Error in running cronjob", err);
                                        return _context13.abrupt("return", false);

                                      case 6:
                                        alertJsonObj = alert.toJSON();
                                        NotificationService = ServiceLocator.resolve("NotificationService");
                                        data = {
                                          destinations: alertJsonObj.destinations,
                                          title: alert.title || "New nofication",
                                          message: alert.message || "You have a new notification",
                                          alertId: alert._id,
                                          notificationType: alertJsonObj.type[0]
                                        };


                                        if (alert.eventExactDate) NotificationService.createFromAlert(data);

                                      case 10:
                                      case "end":
                                        return _context13.stop();
                                    }
                                  }
                                }, _callee12, _this5);
                              }));

                              return function (_x29, _x30) {
                                return _ref14.apply(this, arguments);
                              };
                            }());

                          case 1:
                          case "end":
                            return _context14.stop();
                        }
                      }
                    }, _callee13, _this5);
                  }));

                  return function (_x28) {
                    return _ref13.apply(this, arguments);
                  };
                }());

              case 24:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee14, this);
      }));

      function startMonitoringAlert(_x26, _x27) {
        return _ref12.apply(this, arguments);
      }

      return startMonitoringAlert;
    }()
  }, {
    key: "stopMonitoring",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(cronJobId) {
        var schedule_id, cancelJob;
        return _regenerator2.default.wrap(function _callee15$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                // gets id of running job
                schedule_id = cronJobId;

                // cancel the job

                cancelJob = schedule.scheduledJobs[schedule_id];

                if (!(cancelJob == null)) {
                  _context16.next = 4;
                  break;
                }

                return _context16.abrupt("return", false);

              case 4:
                cancelJob.cancel();
                return _context16.abrupt("return", true);

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee15, this);
      }));

      function stopMonitoring(_x31) {
        return _ref15.apply(this, arguments);
      }

      return stopMonitoring;
    }()
  }]);
  return AlertService;
}();

exports.default = AlertService;