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

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require("mongoose");
var ServiceLocator = require("../framework/servicelocator");

var DatabaseSerivce = function () {
  function DatabaseSerivce() {
    (0, _classCallCheck3.default)(this, DatabaseSerivce);
  }

  (0, _createClass3.default)(DatabaseSerivce, [{
    key: "checkForTemplateScheduleReCalculateFlag",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(receivedObj) {
        var item, WPlanSchedulesModel, updateReCal, toChangeStatusToFinish, workplanTemplateId, jPlan, JourneyPlanModel, existedJPlan, newDataInspectionType, planClosedNow, wPlanSchedule, wPlanTemplateModel, ApplicationLookupsModel, scheduleService, workPlanTemplateService, workingDays, workingOffDays, template, freqPeriod, dateRange, startDate, calculatedSchedules, utils, alertService;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                item = receivedObj.item;
                WPlanSchedulesModel = ServiceLocator.resolve("WPlanSchedulesModel");
                updateReCal = false;
                toChangeStatusToFinish = false;
                workplanTemplateId = item.optParam1.workplanTemplateId;
                jPlan = null;

                if (item.code) {
                  _context.next = 11;
                  break;
                }

                updateReCal = true;
                _context.next = 16;
                break;

              case 11:
                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                _context.next = 14;
                return JourneyPlanModel.findOne({ _id: item.code });

              case 14:
                existedJPlan = _context.sent;

                if (existedJPlan) {
                  workplanTemplateId = existedJPlan.workplanTemplateId;
                  jPlan = existedJPlan;
                  newDataInspectionType = item.optParam1.tasks && item.optParam1.tasks.length > 0 && item.optParam1.tasks[0].inspectionType && item.optParam1.tasks[0].inspectionType !== existedJPlan.tasks[0].inspectionType;
                  planClosedNow = existedJPlan.status == "In Progress" && item.optParam1.status == "Finished";

                  if (newDataInspectionType || planClosedNow) {
                    updateReCal = true;
                  }
                  // if (toChangeStatusToFinish) {
                  //   existedJPlan.status = item.optParam1.status;
                  //   await existedJPlan.save();
                  // }
                }

              case 16:
                if (!updateReCal) {
                  _context.next = 51;
                  break;
                }

                _context.next = 19;
                return WPlanSchedulesModel.findOne({ templateId: workplanTemplateId }).exec();

              case 19:
                wPlanSchedule = _context.sent;

                if (!wPlanSchedule) {
                  _context.next = 24;
                  break;
                }

                wPlanSchedule.toRecalculate = true;
                _context.next = 24;
                return wPlanSchedule.save();

              case 24:
                // // # to update next execution date and expiry date on execution

                wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                scheduleService = ServiceLocator.resolve("scheduleService");
                workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
                workingDays = { holidays: [], weekOffDays: [] };
                _context.next = 31;
                return ApplicationLookupsModel.findOne({ code: "weekdays" }).exec();

              case 31:
                workingOffDays = _context.sent;

                workingDays.weekOffDays = workingOffDays.opt2;

                _context.next = 35;
                return wPlanTemplateModel.findOne({ _id: workplanTemplateId }).exec();

              case 35:
                template = _context.sent;

                if (!(template.inspectionFrequencies && template.inspectionFrequencies.length > 0)) {
                  _context.next = 51;
                  break;
                }

                freqPeriod = void 0;

                freqPeriod = {
                  recurNumber: template.inspectionFrequencies[0].recurNumber && parseInt(template.inspectionFrequencies[0].recurNumber),
                  recurPeriod: template.inspectionFrequencies[0].recurTimeFrame
                };
                dateRange = {
                  from: template.currentPeriodStart,
                  today: (0, _moment2.default)(),
                  to: (0, _moment2.default)(template.currentPeriodStart).add(freqPeriod.recurNumber * 2, freqPeriod.recurPeriod)
                };
                startDate = template.currentPeriodStart;
                calculatedSchedules = scheduleService.getSchedules(template, startDate, jPlan ? [jPlan] : [], dateRange, workingDays, workPlanTemplateService.ignoreInspectionsFromSchedulingCase);
                utils = ServiceLocator.resolve("utils");
                _context.next = 45;
                return workPlanTemplateService.checkWorkPlanNextDueExpiryDate(template, utils);

              case 45:
                _context.next = 47;
                return workPlanTemplateService.checkCurrentTimePeriodUpdate(template, utils);

              case 47:
                alertService = ServiceLocator.resolve("AlertService");

                alertService.recalculateAlertMonitoringByModelId(template.id);
                _context.next = 51;
                return template.save();

              case 51:
                _context.next = 56;
                break;

              case 53:
                _context.prev = 53;
                _context.t0 = _context["catch"](0);

                console.log("err in DBService checkForTemplateScheduleReCalculateFlag" + _context.t0);

              case 56:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 53]]);
      }));

      function checkForTemplateScheduleReCalculateFlag(_x) {
        return _ref.apply(this, arguments);
      }

      return checkForTemplateScheduleReCalculateFlag;
    }()
  }, {
    key: "checkTestsFormFilling",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(receivedObj) {
        var item, testSchedulesModel, JourneyPlanModel, existedJplan, unitsLength, units, u, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, form, obj, exists, newTestData;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                item = receivedObj && (0, _extends3.default)({}, receivedObj.item);
                testSchedulesModel = ServiceLocator.resolve("TestSchedulesModel");
                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                existedJplan = null;
                _context2.prev = 4;

                if (!item.code) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 8;
                return JourneyPlanModel.findOne({ _id: item.code });

              case 8:
                existedJplan = _context2.sent;

              case 9:
                if (!(item && item.optParam1 && item.optParam1.tasks && item.optParam1.tasks[0] && item.optParam1.tasks[0].units)) {
                  _context2.next = 57;
                  break;
                }

                unitsLength = item.optParam1.tasks[0].units.length;
                units = item.optParam1.tasks[0].units;
                u = 0;

              case 13:
                if (!(u < unitsLength)) {
                  _context2.next = 57;
                  break;
                }

                if (!units[u].appForms) {
                  _context2.next = 54;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 18;
                _iterator = units[u].appForms[Symbol.iterator]();

              case 20:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 40;
                  break;
                }

                form = _step.value;

                if (!form.id) {
                  _context2.next = 37;
                  break;
                }

                obj = {
                  assetId: existedJplan.tasks[0].units[u].id,
                  lineId: existedJplan ? existedJplan.lineId : item.optParam1.lineId,
                  lineName: existedJplan ? existedJplan.tasks[0].units[0].unitId : item.optParam1.tasks[0].units[0].unitId,
                  assetName: existedJplan.tasks[0].units[u].unitId,
                  testCode: form.id,
                  testDescription: form.name,
                  formData: form.form,
                  inspectionId: existedJplan && existedJplan.id,
                  user: existedJplan && existedJplan.user,
                  date: existedJplan && existedJplan.date,
                  assetType: existedJplan.tasks[0].units[u].assetType,
                  assetMP: existedJplan.tasks[0].units[u].start
                };
                _context2.next = 26;
                return testSchedulesModel.findOne({ assetId: obj.assetId, testCode: form.id, inspectionId: obj.inspectionId }).exec();

              case 26:
                exists = _context2.sent;

                if (!exists) {
                  _context2.next = 34;
                  break;
                }

                exists.formData = obj.formData;
                exists.markModified("formData");
                _context2.next = 32;
                return exists.save();

              case 32:
                _context2.next = 37;
                break;

              case 34:
                newTestData = new testSchedulesModel(obj);
                _context2.next = 37;
                return newTestData.save();

              case 37:
                _iteratorNormalCompletion = true;
                _context2.next = 20;
                break;

              case 40:
                _context2.next = 46;
                break;

              case 42:
                _context2.prev = 42;
                _context2.t0 = _context2["catch"](18);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 46:
                _context2.prev = 46;
                _context2.prev = 47;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 49:
                _context2.prev = 49;

                if (!_didIteratorError) {
                  _context2.next = 52;
                  break;
                }

                throw _iteratorError;

              case 52:
                return _context2.finish(49);

              case 53:
                return _context2.finish(46);

              case 54:
                u++;
                _context2.next = 13;
                break;

              case 57:
                _context2.next = 62;
                break;

              case 59:
                _context2.prev = 59;
                _context2.t1 = _context2["catch"](4);

                console.log("Error in checkTestsFormFilling: ", _context2.t1);

              case 62:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 59], [18, 42, 46, 54], [47,, 49, 53]]);
      }));

      function checkTestsFormFilling(_x2) {
        return _ref2.apply(this, arguments);
      }

      return checkTestsFormFilling;
    }()
    // async updateInspectionConditions(data) {
    //   try {
    //     let ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
    //     let JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
    //     let remedialActionResolveIssue = await ApplicationLookupsModel.findOne({ listName: "resolveIssueRemedialAction" }).exec();
    //     let checkRemedialActionConfig = await ApplicationLookupsModel.findOne({
    //       listName: "config",
    //       code: "issueResolveRemedialAction",
    //     }).exec();
    //     let inspection = data.optParam1;
    //     let inspectionUpdated;
    //     if (inspection && inspection.tasks && inspection.tasks.length > 0) {
    //       for (let task of inspection.tasks) {
    //         if (task.issues && task.issues.length > 0) {
    //           for (let issue of task.issues) {
    //             // check Remedial action to resolve issue
    //             if (
    //               checkRemedialActionConfig.opt2 == false &&
    //               issue.remedialAction &&
    //               remedialActionResolveIssue &&
    //               remedialActionResolveIssue.opt1 &&
    //               remedialActionResolveIssue.opt1.length > 0
    //             ) {
    //               let resolveActionFound = await _.find(remedialActionResolveIssue.opt1, (item) => {
    //                 return item == issue.remedialAction;
    //               });
    //               if (resolveActionFound) {
    //                 issue.status = "Resolved";
    //                 inspectionUpdated = true;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //     if (inspectionUpdated) {
    //       let savedInspection = await JourneyPlanModel.replaceOne({ _id: data.code }, inspection);
    //     }
    //   } catch (err) {
    //     console.log("err in DBService updateInspectionConditions" + err);
    //   }
    // }

  }]);
  return DatabaseSerivce;
}();

exports.default = DatabaseSerivce;