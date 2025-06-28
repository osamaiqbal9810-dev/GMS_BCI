"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyPlan = require("./wPlanTemplate.model");
//let SODModel = require("../SOD/SOD.model");
var ServiceLocator = require("../../../framework/servicelocator");

var _require = require("lodash"),
    uniqueId = _require.uniqueId;

var moment = require("moment");

exports.all = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var workPlanTemplateService, result, templates, alertService, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, template, alertRules;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
            _context.next = 3;
            return workPlanTemplateService.getWorkplanTemplates(req.user);

          case 3:
            result = _context.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.send(result.errorVal));

          case 7:
            templates = [];
            // fetchAlertsOfAllTemplates

            alertService = ServiceLocator.resolve("AlertService");

            if (!(result.value && result.value.length)) {
              _context.next = 41;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 13;
            _iterator = result.value[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 27;
              break;
            }

            template = _step.value;

            template = template.toObject();
            _context.next = 20;
            return alertService.fetchAlertsByModelId(template._id);

          case 20:
            alertRules = _context.sent;


            alertRules = alertRules.map(function (al) {
              al = al.toObject();
              al.field = al.reference.field;
              al.time = al.timeDifference;
              return al;
            });

            template.alertRules = alertRules;
            templates.push(template);

          case 24:
            _iteratorNormalCompletion = true;
            _context.next = 15;
            break;

          case 27:
            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](13);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 33:
            _context.prev = 33;
            _context.prev = 34;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 36:
            _context.prev = 36;

            if (!_didIteratorError) {
              _context.next = 39;
              break;
            }

            throw _iteratorError;

          case 39:
            return _context.finish(36);

          case 40:
            return _context.finish(33);

          case 41:

            res.json(templates);
            // JourneyPlan.find().exec(function(err, plan) {
            //     let filteredWorkPlans = [];
            //     let adminCheck = req.user.isAdmin;
            //     let subdivisionUser = req.user.subdivision;
            //     if (!adminCheck && subdivisionUser) {
            //         plan.forEach(jplan => {
            //             if (subdivisionUser == jplan.subdivision) {
            //                 filteredWorkPlans.push(jplan);
            //             }
            //         });
            //     } else {
            //         filteredWorkPlans = plan;
            //     }
            //     if (err) {
            //         return handleError(res, err);
            //     }
            //     res.status(200);
            //     res.json(filteredWorkPlans);
            // });

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[13, 29, 33, 41], [34,, 36, 40]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.find = function (req, res, next) {
  JourneyPlan.findOne({ _id: req.params.id, isRemoved: !true }).exec(function (err, plan) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200);
    res.json(plan);
  });
};

exports.create = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var jPlan, newJourneyPlan, workPlanTemplateService, result, template, scheduleService, freqPeriod, dateRange, startDate, workingDays, calculatedSchedules, utils, alertSetupValues, AssetsModel, asset, timezone, alertService, dashboardService;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            jPlan = req.body.workPlanTemplate;

            if (!(jPlan.type == 1)) {
              _context2.next = 7;
              break;
            }

            newJourneyPlan = new JourneyPlan(req.body.workPlanTemplate);

            newJourneyPlan.supervisor = req.user._id;
            newJourneyPlan.save(function (err, plan) {
              if (err) return handleError(res, err);
              res.status(200);
              return res.json(plan);
            });
            _context2.next = 42;
            break;

          case 7:
            workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
            _context2.next = 10;
            return workPlanTemplateService.createWorkplanTemplate(jPlan);

          case 10:
            result = _context2.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.send(result.errorVal));

          case 14:
            template = result.value;
            // we calculate short schedule time period for getting next due and expiry date fields in template and update the template

            if (!(template && template.inspectionFrequencies && template.inspectionFrequencies.length > 0)) {
              _context2.next = 30;
              break;
            }

            scheduleService = ServiceLocator.resolve("scheduleService");
            freqPeriod = void 0;

            freqPeriod = {
              recurNumber: template.inspectionFrequencies[0].recurNumber && parseInt(template.inspectionFrequencies[0].recurNumber),
              recurPeriod: template.inspectionFrequencies[0].recurTimeFrame
            };
            dateRange = {
              from: moment(template.startDate),
              today: moment(),
              to: moment(template.startDate).add(freqPeriod.recurNumber * 2, freqPeriod.recurPeriod)
            };
            startDate = template.currentPeriodStart;
            workingDays = { holidays: [], weekOffDays: [] };
            calculatedSchedules = scheduleService.getSchedules(template, startDate, jPlan ? [jPlan] : [], dateRange, workingDays, workPlanTemplateService.ignoreInspectionsFromSchedulingCase);
            utils = ServiceLocator.resolve("utils");
            _context2.next = 26;
            return workPlanTemplateService.checkWorkPlanNextDueExpiryDate(template, utils);

          case 26:
            _context2.next = 28;
            return workPlanTemplateService.checkCurrentTimePeriodUpdate(template, utils);

          case 28:
            _context2.next = 30;
            return template.save();

          case 30:

            // When workplan template saved succeslly then Template alert logic will start
            // Below is the logic of alert entry into the database
            // *** Start of Alert Logic *** //
            alertSetupValues = req.body.workPlanTemplate.alertSetupValues;

            //Check if user setup the alert for this template

            if (!alertSetupValues) {
              _context2.next = 39;
              break;
            }

            AssetsModel = ServiceLocator.resolve("AssetsModel");
            _context2.next = 35;
            return AssetsModel.findById(result.value.lineId).exec();

          case 35:
            asset = _context2.sent;
            timezone = asset.attributes && asset.attributes.timezone ? asset.attributes.timezone : "";
            alertService = ServiceLocator.resolve("AlertService");

            alertService.addMultipleAlerts(alertSetupValues, result.value._id, "WorkPlanTemplateModel", result.value.title, timezone);

          case 39:

            // *** End of Alert logic *** //

            dashboardService = ServiceLocator.resolve("DashboardService");

            dashboardService.reCalculateDashboardV1Data();
            res.json(result.value);

          case 42:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var plan, workPlanTemplateService, result, WPlanSchedulesModel, wPlanSchedule, alertSetupValues, alertService, AssetsModel, asset, timezone, dashboardService;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return JourneyPlan.findOne({ _id: req.params.id }).exec();

          case 2:
            plan = _context3.sent;

            plan.user = req.body.user;
            plan.title = req.body.title;
            plan.dayFreq = req.body.dayFreq;
            plan.inspectionFrequency = req.body.inspectionFrequency;
            plan.minMaxAllowable = req.body.minMaxAllowable;
            plan.inspectionType = req.body.inspectionType;
            plan.inspectionFrequencies = req.body.inspectionFrequencies;
            plan.timeFrame = req.body.timeFrame;
            plan.perTime = req.body.perTime;
            plan.minDays = req.body.minDays;
            plan.workZone = req.body.workZone;
            plan.foulTime = req.body.foulTime;
            plan.watchmen = req.body.watchmen;
            plan.lineId = req.body.lineId;
            plan.lineName = req.body.lineName;
            plan.subdivision = req.body.subdivision;
            plan.inspectionAssets = req.body.inspectionAssets;
            if (plan.startDate != req.body.startDate) {
              // if startDate is changed, change the nextInspectionDate as well
              plan.startDate = req.body.startDate;
              plan.nextInspectionDate = plan.startDate;
            }
            if (req.body.maxAllowable) plan.maxAllowable = req.body.maxAllowable;
            workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
            _context3.next = 25;
            return workPlanTemplateService.createWorkplanTemplate(plan);

          case 25:
            result = _context3.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context3.next = 29;
              break;
            }

            return _context3.abrupt("return", res.send(result.errorVal));

          case 29:
            WPlanSchedulesModel = ServiceLocator.resolve("WPlanSchedulesModel");
            _context3.next = 32;
            return WPlanSchedulesModel.findOne({ templateId: plan._id }).exec();

          case 32:
            wPlanSchedule = _context3.sent;

            if (!wPlanSchedule) {
              _context3.next = 37;
              break;
            }

            wPlanSchedule.toRecalculate = true;
            _context3.next = 37;
            return wPlanSchedule.save();

          case 37:

            // When workplan template updates succeslly then Template alert update logic will start
            // Below is the logic of alert update into the database and cronjob
            // *** Start of Alert Logic *** //
            alertSetupValues = req.body.alertSetupValues;

            //Check if user setup the alert for this template

            if (!alertSetupValues) {
              _context3.next = 46;
              break;
            }

            alertService = ServiceLocator.resolve("AlertService");
            AssetsModel = ServiceLocator.resolve("AssetsModel");
            _context3.next = 43;
            return AssetsModel.findById(result.value.lineId).exec();

          case 43:
            asset = _context3.sent;
            timezone = asset.attributes && asset.attributes.timezone ? asset.attributes.timezone : "";


            alertService.updateMultipleAlerts(alertSetupValues, req.params.id, "WorkPlanTemplateModel", result.value.title, timezone);

          case 46:
            dashboardService = ServiceLocator.resolve("DashboardService");

            dashboardService.reCalculateDashboardV1Data();
            res.json(result.value);

            /*     plan.save(function(err, plan) {
                if (err) {
                  return next(err);
                }
                res.status(200);
                return res.json(plan);
              });
            */

          case 49:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.update_old = function (req, res, next) {
  JourneyPlan.findOne({ _id: req.params.id }).exec(function (err, plan) {
    if (err) {
      return handleError(res, err);
    }
    plan.user = req.body.user;
    plan.title = req.body.title;
    plan.dayFreq = req.body.dayFreq;
    plan.inspectionFrequency = req.body.inspectionFrequency;
    plan.minMaxAllowable = req.body.minMaxAllowable;
    plan.inspectionType = req.body.inspectionType;

    //  plan.tasks = req.body.tasks;
    plan.workZone = req.body.workZone;
    plan.foulTime = req.body.foulTime;
    plan.watchmen = req.body.watchmen;
    plan.lineId = req.body.lineId;
    plan.lineName = req.body.lineName;
    plan.subdivision = req.body.subdivision;

    if (plan.startDate != req.body.startDate) {
      // if startDate is changed, change the nextInspectionDate as well
      plan.startDate = req.body.startDate;
      plan.nextInspectionDate = plan.startDate;
    }
    if (req.body.maxAllowable) plan.maxAllowable = req.body.maxAllowable;

    plan.save(function (err, plan) {
      if (err) {
        return next(err);
      }
      res.status(200);
      return res.json(plan);
    });
  });
};
exports.delete = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var workPlanTemplateService, result, alertService;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
            _context4.next = 3;
            return workPlanTemplateService.deleteWorkPlanTemplate(req.params.id);

          case 3:
            result = _context4.sent;


            // Delete alerts of this workplanTemplate
            alertService = ServiceLocator.resolve("AlertService");
            _context4.next = 7;
            return alertService.deleteAlertByModelId(req.params.id);

          case 7:

            res.status(result.status);

            if (!result.errorVal) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.send(result.errorVal));

          case 10:
            res.json(result.value);
            // JourneyPlan.findById(req.params.id, (errFindP, plan) => {
            //   if (errFindP) {
            //     return handleError(res, errFindP);
            //   }
            //   if (plan) {
            //     let TrackModel = ServiceLocator.resolve("TrackModel");
            //     TrackModel.findById(plan.assetGroupId, (errorFindAG, assetGroup) => {
            //       if (errorFindAG) {
            //         JourneyPlan.deleteOne({ _id: req.params.id }, err => {
            //           if (err) {
            //             return handleError(res, err);
            //           }
            //           res.status(200);
            //           return res.json(true);
            //         });
            //       }
            //       if (assetGroup) {
            //         assetGroup.templateCreated = undefined;
            //         assetGroup.save((saveError, assetGroupUpdated) => {
            //           if (saveError) {
            //             return handleError(res, saveError);
            //           }
            //           JourneyPlan.deleteOne({ _id: req.params.id }, err => {
            //             if (err) {
            //               return handleError(res, err);
            //             }
            //             res.status(200);
            //             return res.json(true);
            //           });
            //         });
            //       } else {
            //         JourneyPlan.deleteOne({ _id: req.params.id }, err => {
            //           if (err) {
            //             return handleError(res, err);
            //           }
            //           res.status(200);
            //           return res.json(true);
            //         });
            //       }
            //     });
            //   }
            // });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateTemplatesPlanPrioritySorting = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var workPlanTemplateService, result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
            _context5.next = 3;
            return workPlanTemplateService.sortTemplates(req.user, req.body);

          case 3:
            result = _context5.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}

exports.usersTemplate = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    var workPlanTemplateService, result;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
            _context6.next = 3;
            return workPlanTemplateService.getUsersTemplates(req.params.users);

          case 3:
            result = _context6.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateTemplatesTempChanges = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res, next) {
    var workPlanTemplateService, result;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
            _context7.next = 3;
            return workPlanTemplateService.updateTemplatesTempChanges(req.body);

          case 3:
            result = _context7.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();