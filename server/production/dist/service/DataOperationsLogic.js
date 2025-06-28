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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../framework/servicelocator");
var utils = require("../utilities/utils");

var DataOperaionsLogic = function () {
  function DataOperaionsLogic(logger) {
    var _this = this;

    (0, _classCallCheck3.default)(this, DataOperaionsLogic);

    var es = ServiceLocator.resolve("DataOpEventService");
    es.addCallback("JourneyPlan", "BeforeAddOrUpdate", function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(itm) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.JUpdateRequestCallback(itm);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    es.addCallback("JourneyPlan", "AddOrUpdateSuccess", function (itm) {
      // # check if new plan executed then turn flag of template schedules to be calculated again
      var DBService = ServiceLocator.resolve("DBService");
      DBService.checkForTemplateScheduleReCalculateFlag(itm);
    });
    es.addCallback("JourneyPlan", "AddOrUpdateSuccess", function (itm) {
      // # check if app form is filled , update it in the test schedules.
      var DBService = ServiceLocator.resolve("DBService");
      DBService.checkTestsFormFilling(itm);
    });

    es.addCallback("JourneyPlan", "AddOrUpdateSuccess", function (itm) {
      _this.JPUpdateCallback(itm);
    });
    // stop creating maintenance automatically // es.addCallback('JourneyPlan', 'BeforeAddOrUpdate', itm =>{this.JPUpdateRequestCallback(itm)});
    this.logger = logger;
  }

  (0, _createClass3.default)(DataOperaionsLogic, [{
    key: "JUpdateRequestCallback",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
        var item, user, ApplicationLookupsModel, jp, tasks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, task, issues, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, issue, remedialActionResolveIssue, checkRemedialActionConfig;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                item = data.item;
                user = data.user;
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                _context2.prev = 3;

                // # check for remedial action resolve case
                jp = item.optParam1;
                tasks = jp.tasks ? jp.tasks : [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 9;
                _iterator = tasks[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 49;
                  break;
                }

                task = _step.value;
                issues = task && task.issues ? task.issues : [];
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 17;
                _iterator2 = issues[Symbol.iterator]();

              case 19:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 32;
                  break;
                }

                issue = _step2.value;

                if (!(issue && issue.remedialAction)) {
                  _context2.next = 29;
                  break;
                }

                _context2.next = 24;
                return ApplicationLookupsModel.findOne({ listName: "resolveIssueRemedialAction" }).exec();

              case 24:
                remedialActionResolveIssue = _context2.sent;
                _context2.next = 27;
                return ApplicationLookupsModel.findOne({
                  listName: "config",
                  code: "issueResolveRemedialAction"
                }).exec();

              case 27:
                checkRemedialActionConfig = _context2.sent;

                if (checkRemedialActionConfig.opt2 === false && remedialActionResolveIssue && remedialActionResolveIssue.opt1.length) {
                  if (remedialActionResolveIssue.opt1.includes(issue.remedialAction)) {
                    issue.status = "Resolved";
                  }
                }

              case 29:
                _iteratorNormalCompletion2 = true;
                _context2.next = 19;
                break;

              case 32:
                _context2.next = 38;
                break;

              case 34:
                _context2.prev = 34;
                _context2.t0 = _context2["catch"](17);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 38:
                _context2.prev = 38;
                _context2.prev = 39;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 41:
                _context2.prev = 41;

                if (!_didIteratorError2) {
                  _context2.next = 44;
                  break;
                }

                throw _iteratorError2;

              case 44:
                return _context2.finish(41);

              case 45:
                return _context2.finish(38);

              case 46:
                _iteratorNormalCompletion = true;
                _context2.next = 11;
                break;

              case 49:
                _context2.next = 55;
                break;

              case 51:
                _context2.prev = 51;
                _context2.t1 = _context2["catch"](9);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 55:
                _context2.prev = 55;
                _context2.prev = 56;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 58:
                _context2.prev = 58;

                if (!_didIteratorError) {
                  _context2.next = 61;
                  break;
                }

                throw _iteratorError;

              case 61:
                return _context2.finish(58);

              case 62:
                return _context2.finish(55);

              case 63:
                _context2.next = 69;
                break;

              case 65:
                _context2.prev = 65;
                _context2.t2 = _context2["catch"](3);

                console.log("DataOperationsLogic:JPUpdateRequestCallback, catch:", _context2.t2.toString());
                this.logger.error(_context2.t2, _context2.t2.toString());

              case 69:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 65], [9, 51, 55, 63], [17, 34, 38, 46], [39,, 41, 45], [56,, 58, 62]]);
      }));

      function JUpdateRequestCallback(_x2) {
        return _ref2.apply(this, arguments);
      }

      return JUpdateRequestCallback;
    }()

    // async JPUpdateRequestCallback(data)
    // {
    //     let item = data.item;
    //     let user = data.user;
    //     let oldJp={};
    //     let maintenanceService = ServiceLocator.resolve('MaintenanceService');

    //     try
    //     {
    //         if(item && item.code && item.code!='')
    //         {
    //             let JPModel = ServiceLocator.resolve("JourneyPlanModel");
    //             oldJp = await JPModel.findOne({_id:item.code}).exec();
    //         }

    //         let additional = utils.substractObjects(item.optParam1, oldJp);
    //         let tasks = additional.tasks ? additional.tasks : [];
    //         for(const task of tasks)
    //         {
    //             let issues = task && task.issues ? task.issues:[];

    //             for(const issue of issues)
    //             {
    //                 if(issue && issue.timeStamp) // new issue being logged, check for creating maintenance
    //                 {
    //                     // if issue.typeOfAction==ImmediateFix then maintenanceState=fixed
    //                     //
    //                     if(issue.priority!="Info")
    //                     {
    //                         //create a maintenance
    //                         await maintenanceService.createNewMaintenance(issue, user, item.code, oldJp.workplanTemplateId ? oldJp.workplanTemplateId : issue.workplanTemplateId ? issue.workplanTemplateId : '' );
    //                     }
    //                     //console.log('new=>', issue.timeStamp, issue.description,{issue});
    //                 }
    //             }
    //         }
    //     }
    //     catch(err)
    //     {
    //         console.log('DataOperationsLogic:JPUpdateRequestCallback, catch:', err.toString());
    //         this.logger.error(err, err.toString());
    //     }
    // }

  }, {
    key: "JPUpdateCallback",
    value: function JPUpdateCallback(data) {
      var item = data.item;
      var user = data.user;
      //this.logger.info('JPUpdateCallback: code: '+ item.code);
      //console.log('actual cb : code : ' + item.code);
      // check if this jp is new and being created
      try {
        if (item.code == "" || item.code == null) {
          var wptId = item.optParam1.workplanTemplateId; // TODO: Discuss to make sure 'workplanTemplateId' being transmitted

          if (wptId) {
            var workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
            workPlanTemplateService.workPlanExecuted(item, wptId);

            //   let WPTModel = ServiceLocator.resolve("WorkPlanTemplateModel");

            //   WPTModel.findOne({ _id: wptId }).exec((err, wpt) => {
            //     //console.log('WorkplanTemplate: '+ wpt);
            //     if (wpt) {
            //       wpt.lastInspection = new Date();
            //       wpt.nextInspectionDate = new Date();
            //       wpt.nextInspectionDate.setDate(wpt.nextInspectionDate.getDate() + wpt.inspectionFrequency);
            //       wpt.markModified("nextInspectionDate");
            //       wpt.markModified("lastInspection");
            //       wpt.save((err, result) => {
            //         if (err) {
            //           this.logger.error("Error saving inspeciton dates: user:" + user.email + ", err:" + err);
            //           console.log(err);
            //         }
            //       });
            //     } else {
            //       this.logger.warn("wptId: " + wptId + " not found, not updating nextInspectionDate, user:" + user.email);
            //       console.log("wptId: " + wptId + " not found, not updating nextInspectionDate");
            //     }
            //   });
          } else {
            this.logger.warn("workplanTemplateId not included in call to create inspection, user:" + user.email);
          }
        } else {
          // let DBService = ServiceLocator.resolve("DBService");
          // DBService.updateInspectionConditions(item);
          var socketIO = ServiceLocator.resolve("SocketIOService");
          socketIO.inspectionUpdated(item.code);
        }
      } catch (error) {
        console.log(error);
        this.logger.error("catch: err:" + error);
      }
    }
  }]);
  return DataOperaionsLogic;
}();

exports.default = DataOperaionsLogic;