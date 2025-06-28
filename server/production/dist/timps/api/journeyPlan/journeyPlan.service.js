"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _UUID = require("../../../utilities/UUID.js");

var _subdivisionCheck = require("../../../apiUtils/subdivisionCheck");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../../framework/servicelocator");

var JourneyPlanService = function () {
  function JourneyPlanService() {
    (0, _classCallCheck3.default)(this, JourneyPlanService);
  }

  (0, _createClass3.default)(JourneyPlanService, [{
    key: "getJourneyPlansAll",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, query) {
        var resultObj, JourneyPlanModel, UserModel, adminCheck, subdivisionUser, dateRange, checkSubdiv, criteria, workplanTemplateService, jplans, _criteria, assetService, assetIds, _jplans;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = {}, JourneyPlanModel = void 0, UserModel = void 0, adminCheck = void 0, subdivisionUser = void 0, dateRange = void 0;


                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                UserModel = ServiceLocator.resolve("userModel");
                adminCheck = user.isAdmin;
                subdivisionUser = user.subdivision;
                if (query.dateRange) {
                  dateRange = JSON.parse(query.dateRange);

                  // console.log(dateRange);
                }

                _context.prev = 6;
                _context.next = 9;
                return (0, _subdivisionCheck.subdivisionChecker)(user);

              case 9:
                checkSubdiv = _context.sent;

                if (!dateRange) {
                  _context.next = 20;
                  break;
                }

                // 1.2: If Filter of date then get the data in that filter Range
                criteria = { date: { $gte: new Date(dateRange.from), $lte: new Date(dateRange.to) } };

                if (checkSubdiv) criteria.subdivision = subdivisionUser;

                // let jplans = await JourneyPlanModel.find(criteria).exec();
                // allTemplates = await TemplateModel.find({ isRemoved: !true }).exec();

                // let forecastInspection = await foreCastPlan(dateRange, allTemplates);
                // jplans = [...jplans, ...forecastInspection];
                workplanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
                _context.next = 16;
                return workplanTemplateService.getAllPlansInRange(dateRange, user, null, { sortBy: { date: "asc" } }, false, true);

              case 16:
                jplans = _context.sent;


                //  console.log(jplans);
                resultObj = { value: jplans, status: 200 };
                _context.next = 30;
                break;

              case 20:
                // 1.1 Get All inspections
                _criteria = {};
                assetService = ServiceLocator.resolve("AssetsService");
                _context.next = 24;
                return assetService.getFilteredAssetsIds(user, { plannable: true }, true);

              case 24:
                assetIds = _context.sent;

                _criteria.lineId = { $in: assetIds.assetIds };
                _context.next = 28;
                return JourneyPlanModel.find({}).exec();

              case 28:
                _jplans = _context.sent;

                resultObj = { value: _jplans, status: 200 };

              case 30:
                _context.next = 36;
                break;

              case 32:
                _context.prev = 32;
                _context.t0 = _context["catch"](6);

                console.log("Error in JplanService ", _context.t0);
                resultObj = { errorVal: _context.t0, status: 500 };

              case 36:
                return _context.abrupt("return", resultObj);

              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 32]]);
      }));

      function getJourneyPlansAll(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getJourneyPlansAll;
    }()
  }, {
    key: "getJourneyPlansFind",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user, query) {
        var resultObj, JourneyPlanModel, UserModel, adminCheck, subdivisionUser, AssetModel, dateRange, checkSubdiv, dbCriteria, dateCriteria, criteria, jPlans, plans, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, plan, outPlan, asset;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = {}, JourneyPlanModel = void 0, UserModel = void 0, adminCheck = void 0, subdivisionUser = void 0, AssetModel = void 0, dateRange = void 0;


                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                AssetModel = ServiceLocator.resolve("AssetsModel");
                UserModel = ServiceLocator.resolve("userModel");
                adminCheck = user.isAdmin;
                subdivisionUser = user.subdivision;
                if (query.dateRange) {
                  dateRange = JSON.parse(query.dateRange);

                  // console.log(dateRange);
                }

                _context2.prev = 7;
                _context2.next = 10;
                return (0, _subdivisionCheck.subdivisionChecker)(user);

              case 10:
                checkSubdiv = _context2.sent;

                if (!dateRange) {
                  _context2.next = 66;
                  break;
                }

                // 1.2: If Filter of date then get the data in that filter Range
                dbCriteria = [];

                if (query.userId) {
                  dbCriteria.push[{ "user.id": query.userId }];
                }
                if (query.userEmail) {
                  dbCriteria.push[{ "user.email": query.userEmail }];
                }
                if (query.lineId) {
                  dbCriteria.push[{ lineId: query.lineId }];
                }

                dateCriteria = { date: { $gte: new Date(dateRange.from), $lte: new Date(dateRange.to) } };
                criteria = {
                  $and: [dateCriteria].concat(dbCriteria, [{
                    $or: [{ "tasks.inspectionTypeTag": "required" }, { "tasks.inspectionType": "Required Inspection" }, { "tasks.inspectionTypeTag": "required" }, { "tasks.includeInFRAReport": true }]
                  }])
                };


                if (checkSubdiv) criteria.subdivision = subdivisionUser;
                _context2.next = 21;
                return JourneyPlanModel.find(criteria).exec();

              case 21:
                jPlans = _context2.sent;
                plans = [];

                if (!jPlans) {
                  _context2.next = 63;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 27;
                _iterator = jPlans[Symbol.iterator]();

              case 29:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 49;
                  break;
                }

                plan = _step.value;
                outPlan = {};

                outPlan["_id"] = plan._id;
                outPlan["date"] = plan.date;
                outPlan["title"] = plan.title;
                outPlan["lineId"] = plan.lineId;
                outPlan["user"] = plan.user;
                outPlan["inspectionType"] = plan.tasks[0].inspectionType;
                outPlan["inspectionTypeTag"] = plan.tasks[0].inspectionTypeTag;
                outPlan["status"] = plan.status;

                if (!plan.lineId) {
                  _context2.next = 45;
                  break;
                }

                _context2.next = 43;
                return AssetModel.findOne({ _id: plan.lineId });

              case 43:
                asset = _context2.sent;

                if (asset) {
                  outPlan["lineName"] = asset.unitId;
                }

              case 45:

                plans.push(outPlan);

              case 46:
                _iteratorNormalCompletion = true;
                _context2.next = 29;
                break;

              case 49:
                _context2.next = 55;
                break;

              case 51:
                _context2.prev = 51;
                _context2.t0 = _context2["catch"](27);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

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

                //  console.log(jplans);
                resultObj = { value: plans, status: 200 };
                _context2.next = 67;
                break;

              case 66:
                resultObj = { errorVal: "unable to find date criteria", status: 500 };

              case 67:
                _context2.next = 73;
                break;

              case 69:
                _context2.prev = 69;
                _context2.t1 = _context2["catch"](7);

                console.log("Error in JplanService ", _context2.t1);
                resultObj = { errorVal: _context2.t1, status: 500 };

              case 73:
                return _context2.abrupt("return", resultObj);

              case 74:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[7, 69], [27, 51, 55, 63], [56,, 58, 62]]);
      }));

      function getJourneyPlansFind(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getJourneyPlansFind;
    }()
  }, {
    key: "multiLinePlans",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(lines) {
        var resultObj, jplans, JourneyPlanModel, criteria;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = {}, jplans = void 0, JourneyPlanModel = void 0;

                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                _context3.prev = 2;
                criteria = { lineId: { $in: lines } };
                _context3.next = 6;
                return JourneyPlanModel.find(criteria);

              case 6:
                jplans = _context3.sent;

                resultObj = { value: jplans, status: 200 };
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);

                resultObj = { errorVal: _context3.t0.toString(), status: 500 };
                console.log("journeyPlan.service catch error:", _context3.t0.toString());

              case 14:
                return _context3.abrupt("return", resultObj);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      function multiLinePlans(_x5) {
        return _ref3.apply(this, arguments);
      }

      return multiLinePlans;
    }()
  }, {
    key: "updateIssue",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(issueObj, user) {
        var resultObj, maintenanceService, JourneyPlanModel, _issueObj$issue$index, _issueObj$issue$index2, jIndex, tIndex, iIndex, jPlan, maintenanceCreated;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resultObj = {}, maintenanceService = void 0, JourneyPlanModel = void 0;

                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                maintenanceService = ServiceLocator.resolve("MaintenanceService");
                _context4.prev = 3;
                _issueObj$issue$index = issueObj.issue.index.split("-"), _issueObj$issue$index2 = (0, _slicedToArray3.default)(_issueObj$issue$index, 3), jIndex = _issueObj$issue$index2[0], tIndex = _issueObj$issue$index2[1], iIndex = _issueObj$issue$index2[2];
                _context4.next = 7;
                return JourneyPlanModel.findOne({ _id: issueObj.issue.planId }).exec();

              case 7:
                jPlan = _context4.sent;

                if (!(issueObj.action == "Close")) {
                  _context4.next = 15;
                  break;
                }

                jPlan.tasks[tIndex].issues[iIndex].status = "Resolved";
                jPlan.tasks[tIndex].issues[iIndex].closeReason = issueObj.issue.closeReason;
                _context4.next = 13;
                return this.checkIfPlanSaved(resultObj, jPlan);

              case 13:
                _context4.next = 39;
                break;

              case 15:
                if (!(issueObj.action == "CreateMR")) {
                  _context4.next = 32;
                  break;
                }

                _context4.next = 18;
                return maintenanceService.createNewMaintenanceFromIssue(issueObj.issue, user, jPlan);

              case 18:
                maintenanceCreated = _context4.sent;

                if (!maintenanceCreated) {
                  _context4.next = 28;
                  break;
                }

                jPlan.tasks[tIndex].issues[iIndex].status = "Resolved";
                jPlan.tasks[tIndex].issues[iIndex].mrNumber = maintenanceCreated.mrNumber;
                jPlan.tasks[tIndex].issues[iIndex].maintenanceId = maintenanceCreated._id;
                jPlan.mrNumber = maintenanceCreated.mrNumber;
                _context4.next = 26;
                return this.checkIfPlanSaved(resultObj, jPlan);

              case 26:
                _context4.next = 30;
                break;

              case 28:
                resultObj.errorVal = "Maintenance Creation Failed";
                resultObj.status = 500;

              case 30:
                _context4.next = 39;
                break;

              case 32:
                if (!(issueObj.action == "serverChanges")) {
                  _context4.next = 38;
                  break;
                }

                jPlan.tasks[tIndex].issues[iIndex].serverObject = issueObj.issue.serverObject;
                _context4.next = 36;
                return this.checkIfPlanSaved(resultObj, jPlan);

              case 36:
                _context4.next = 39;
                break;

              case 38:
                resultObj = { errorVal: "No Action Found", status: 500 };

              case 39:
                _context4.next = 45;
                break;

              case 41:
                _context4.prev = 41;
                _context4.t0 = _context4["catch"](3);

                resultObj = { errorVal: _context4.t0.toString(), status: 500 };
                console.log("journeyPlan.service catch error:", _context4.t0.toString());

              case 45:
                return _context4.abrupt("return", resultObj);

              case 46:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 41]]);
      }));

      function updateIssue(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return updateIssue;
    }()
  }, {
    key: "updateJPlanIssue",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(jPlan) {
        var saved;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                saved = null;
                _context5.prev = 1;

                jPlan.markModified("tasks");
                _context5.next = 5;
                return jPlan.save();

              case 5:
                saved = _context5.sent;
                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);

                saved = null;
                console.log("journeyPlan.service error: ", _context5.t0.toString());

              case 12:
                return _context5.abrupt("return", saved);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 8]]);
      }));

      function updateJPlanIssue(_x8) {
        return _ref5.apply(this, arguments);
      }

      return updateJPlanIssue;
    }()
  }, {
    key: "checkIfPlanSaved",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(resultObj, jPlan) {
        var planSaved;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.updateJPlanIssue(jPlan);

              case 2:
                planSaved = _context6.sent;

                if (planSaved) {
                  resultObj.value = planSaved;
                  resultObj.status = 200;
                } else {
                  resultObj.errorVal = "Issue Can Not be Updated";
                  resultObj.status = 500;
                }

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function checkIfPlanSaved(_x9, _x10) {
        return _ref6.apply(this, arguments);
      }

      return checkIfPlanSaved;
    }()
  }, {
    key: "getAllIssues",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(query) {
        var resultObj, JourneyPlanModel, dateRange, issues, jPlans, criteria, jIndex, tIndex, iIndex, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, plan, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, task, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, issue, issuePush;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                resultObj = {}, JourneyPlanModel = void 0, dateRange = void 0, issues = void 0, jPlans = void 0, criteria = void 0, jIndex = void 0, tIndex = void 0, iIndex = void 0;


                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                if (query.dateRange) {
                  dateRange = JSON.parse(query.dateRange);
                }
                _context7.prev = 3;

                if (!dateRange) {
                  _context7.next = 11;
                  break;
                }

                criteria = {
                  //   $or: [
                  //     {
                  //       endDateTime: [ null, "" ], /// jplan end date is null
                  //     },
                  //     {
                  //       $or:
                  //       [
                  //           {
                  //             $and: [
                  //               {
                  //                 startDateTime: { $gte: new Date(dateRange.from)},
                  //               },
                  //               {
                  //                 startDateTime: { $lte: new Date(dateRange.to)},
                  //               }
                  //             ]
                  //           },
                  //           {
                  //             $and: [
                  //               {
                  //                 endDateTime: { $gte: new Date(dateRange.from)},
                  //               },
                  //               {
                  //                 endDateTime: { $lte: new Date(dateRange.to)},
                  //               }
                  //             ]
                  //           }
                  //       ]
                  //     },
                  //     {
                  //       $and: [
                  //         {
                  //           startDateTime: { $lte: new Date(dateRange.from)},
                  //         },
                  //         {
                  //           endDateTime: { $gte: new Date(dateRange.to)},
                  //         }
                  //       ]
                  //     }
                  // ]
                };
                _context7.next = 8;
                return JourneyPlanModel.find(criteria).exec();

              case 8:
                jPlans = _context7.sent;
                _context7.next = 14;
                break;

              case 11:
                _context7.next = 13;
                return JourneyPlanModel.find().exec();

              case 13:
                jPlans = _context7.sent;

              case 14:
                issues = [];
                jIndex = -1;
                tIndex = -1;
                iIndex = -1;

                if (!jPlans) {
                  _context7.next = 92;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context7.prev = 22;
                _iterator2 = jPlans[Symbol.iterator]();

              case 24:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context7.next = 78;
                  break;
                }

                plan = _step2.value;

                jIndex++;
                tIndex = -1;

                if (!plan.tasks) {
                  _context7.next = 75;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context7.prev = 32;
                _iterator3 = plan.tasks[Symbol.iterator]();

              case 34:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context7.next = 61;
                  break;
                }

                task = _step3.value;

                tIndex++;
                iIndex = -1;

                if (!task.issues) {
                  _context7.next = 58;
                  break;
                }

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context7.prev = 42;

                for (_iterator4 = task.issues[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  issue = _step4.value;

                  iIndex++;
                  issuePush = true;

                  dateRange && (issuePush = new Date(issue.timeStamp) > new Date(dateRange.from) && new Date(issue.timeStamp) < new Date(dateRange.to));
                  issuePush && issues.push((0, _extends3.default)({}, issue, {
                    planId: plan._id,
                    taskId: task.taskId,
                    index: jIndex + "-" + tIndex + "-" + iIndex,
                    date: plan.date,
                    user: plan.user,
                    uniqueGuid: (0, _UUID.guid)(),
                    lineName: plan.lineName,
                    lineId: plan.lineId,
                    weatherConditions: task.weatherConditions,
                    temperature: task.temperature,
                    tempUnit: task.tempUnit
                  }));
                }
                _context7.next = 50;
                break;

              case 46:
                _context7.prev = 46;
                _context7.t0 = _context7["catch"](42);
                _didIteratorError4 = true;
                _iteratorError4 = _context7.t0;

              case 50:
                _context7.prev = 50;
                _context7.prev = 51;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 53:
                _context7.prev = 53;

                if (!_didIteratorError4) {
                  _context7.next = 56;
                  break;
                }

                throw _iteratorError4;

              case 56:
                return _context7.finish(53);

              case 57:
                return _context7.finish(50);

              case 58:
                _iteratorNormalCompletion3 = true;
                _context7.next = 34;
                break;

              case 61:
                _context7.next = 67;
                break;

              case 63:
                _context7.prev = 63;
                _context7.t1 = _context7["catch"](32);
                _didIteratorError3 = true;
                _iteratorError3 = _context7.t1;

              case 67:
                _context7.prev = 67;
                _context7.prev = 68;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 70:
                _context7.prev = 70;

                if (!_didIteratorError3) {
                  _context7.next = 73;
                  break;
                }

                throw _iteratorError3;

              case 73:
                return _context7.finish(70);

              case 74:
                return _context7.finish(67);

              case 75:
                _iteratorNormalCompletion2 = true;
                _context7.next = 24;
                break;

              case 78:
                _context7.next = 84;
                break;

              case 80:
                _context7.prev = 80;
                _context7.t2 = _context7["catch"](22);
                _didIteratorError2 = true;
                _iteratorError2 = _context7.t2;

              case 84:
                _context7.prev = 84;
                _context7.prev = 85;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 87:
                _context7.prev = 87;

                if (!_didIteratorError2) {
                  _context7.next = 90;
                  break;
                }

                throw _iteratorError2;

              case 90:
                return _context7.finish(87);

              case 91:
                return _context7.finish(84);

              case 92:
                resultObj.value = issues;
                resultObj.status = 200;
                _context7.next = 100;
                break;

              case 96:
                _context7.prev = 96;
                _context7.t3 = _context7["catch"](3);

                resultObj = { errorVal: _context7.t3.toString(), status: 500 };
                console.log("journeyPlan.service error: ", _context7.t3.toString());

              case 100:
                return _context7.abrupt("return", resultObj);

              case 101:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[3, 96], [22, 80, 84, 92], [32, 63, 67, 75], [42, 46, 50, 58], [51,, 53, 57], [68,, 70, 74], [85,, 87, 91]]);
      }));

      function getAllIssues(_x11) {
        return _ref7.apply(this, arguments);
      }

      return getAllIssues;
    }()
  }]);
  return JourneyPlanService;
}();

exports.default = JourneyPlanService;

// async function foreCastPlan(dateRange, workPlans) {
//   let inspections = [];
//   for (let plan of workPlans) {
//     if (plan.startDate || plan.nextInspectionDate) {
//       if (new Date(dateRange.to) > new Date(dateRange.today)) {
//         let fromTodayInspections = await futureinspections(dateRange, plan, inspections);
//       }
//       if (new Date(dateRange.from) < new Date(dateRange.today)) {
//         // Past Inspections Implementation (business logic require discussion)
//       }
//     }
//   }
//   // console.log(inspections);
//   return inspections;
// }
// // iterate over dateTocheck to see that it falls between today and future "to" date, if so then create the expected inspection and send it back
// async function futureinspections(dateRange, c_plan, inspections) {
//   let NEXT_INSPECTION = c_plan.nextInspectionDate;
//   const FIRST_INSPECTION = c_plan.startDate;
//   const FREQUENCY = c_plan.inspectionFrequency;
//   const DATE_FILTER_TO = new Date(dateRange.to);
//   const DATE_FILTER_FROM = new Date(dateRange.from);
//   const DATE_FILTER_TODAY = new Date(dateRange.today);
//   let dateTocheck = NEXT_INSPECTION;
//   if (!c_plan.nextInspectionDate) {
//     dateTocheck = FIRST_INSPECTION;
//   }
//   let count = 100;
//   while (dateTocheck < DATE_FILTER_TO && FREQUENCY > 0 && count > 0) {
//     // if (dateTocheck > DATE_FILTER_TODAY) {
//     // console.log("In Future", dateTocheck);
//     let user = null;
//     if (c_plan.modifications) {
//       let momentDate = moment.utc(dateTocheck.getTime()).format("YYYYMMDD");
//       let futureChange_date = c_plan.modifications[momentDate];
//       if (futureChange_date && futureChange_date.user) {
//         user = futureChange_date.user;
//       }
//     }
//     let inspection = {
//       user: c_plan.user,
//       tasks: c_plan.tasks,
//       date: new Date(dateTocheck.getTime()),
//       title: c_plan.title,
//       workplanTemplateId: c_plan._id,
//       lineId: c_plan.lineId,
//       lineName: c_plan.lineName,
//       status: dateTocheck > DATE_FILTER_TODAY ? "Future Inspection" : "Overdue",
//     };
//     if (user) {
//       inspection.temp_user = user;
//     }
//     if (dateTocheck > DATE_FILTER_FROM) {
//       inspections.push(inspection);
//     }
//     //}
//     dateTocheck = new Date(dateTocheck.setDate(dateTocheck.getDate() + FREQUENCY));
//     count--;
//   }
// }