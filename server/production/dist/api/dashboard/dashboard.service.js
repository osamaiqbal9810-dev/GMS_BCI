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

var getLists = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(subdiv, internal) {
    var lines, assetsModel, assetTreeService, result, plannableLocations, assets, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, line;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            lines = { lines_Id_name: {}, lines: {} };
            _context5.prev = 1;

            // let criteria = { assetType: "line" };
            // if (subdiv) criteria.subdivision = subdiv;
            // let AssetsModel = ServiceLocator.resolve("AssetsModel");
            // let assets = await AssetsModel.find(criteria).exec();
            assetsModel = ServiceLocator.resolve("AssetsModel");
            assetTreeService = ServiceLocator.resolve("AssetsTreeService");
            _context5.next = 6;
            return assetTreeService.getAllPlannableLocations();

          case 6:
            result = _context5.sent;
            plannableLocations = result.value ? result.value : [];
            _context5.next = 10;
            return assetsModel.find({ _id: { $in: plannableLocations } });

          case 10:
            assets = _context5.sent;

            if (!(assets.length > 0)) {
              _context5.next = 33;
              break;
            }

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context5.prev = 15;

            for (_iterator3 = assets[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              line = _step3.value;

              if (internal) {
                lines.lines_Id_name[line._id] = line.unitId;
              }
              lines.lines[line.unitId] = {
                inspections: {
                  summary: {
                    total: 0,
                    completed: 0,
                    inProgress: 0,
                    missed: 0,
                    overdue: 0,
                    upcoming: 0
                  },
                  details: [
                    // {
                    //   runName: "Inspection 1",
                    //   inspector: {
                    //     name: "Joe",
                    //     email: "abc@def.com",
                    //     avatar: "",
                    //   },
                    //   status: "inProgress",
                    // },
                  ]
                },
                issues: {
                  summary: {
                    total: 0,
                    info: 0,
                    high: 0,
                    medium: 0,
                    low: 0,
                    pending: 0,
                    marked: 0
                  },
                  details: [
                    // {
                    //   unitid: "track 1",
                    //   inspector: {
                    //     name: "Joe",
                    //     email: "abc@def.com",
                    //     avatar: "",
                    //   },
                    //   status: "in-progress",
                    // },
                  ]
                },
                line: {
                  id: line._id,
                  subdivision: line.subdivision
                }
              };
            }
            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](15);
            _didIteratorError3 = true;
            _iteratorError3 = _context5.t0;

          case 23:
            _context5.prev = 23;
            _context5.prev = 24;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 26:
            _context5.prev = 26;

            if (!_didIteratorError3) {
              _context5.next = 29;
              break;
            }

            throw _iteratorError3;

          case 29:
            return _context5.finish(26);

          case 30:
            return _context5.finish(23);

          case 31:
            _context5.next = 34;
            break;

          case 33:
            lines = null;

          case 34:
            _context5.next = 40;
            break;

          case 36:
            _context5.prev = 36;
            _context5.t1 = _context5["catch"](1);

            lines = null;
            console.log("getLists: " + _context5.t1);

          case 40:
            return _context5.abrupt("return", internal ? lines : lines.lines);

          case 41:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[1, 36], [15, 19, 23, 31], [24,, 26, 30]]);
  }));

  return function getLists(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var checkTriggersFunction = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(data) {
    var trigger, LAST_CALCULATION_DATE;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            trigger = false;
            _context6.prev = 1;

            if (data) {
              _context6.next = 6;
              break;
            }

            console.log("Case 1 trigger: No data length or data is undefined || null ");
            trigger = true;
            return _context6.abrupt("return", trigger);

          case 6:
            // to do : check if last recalculated date has changed , trigger logic to recalculate if it did.
            LAST_CALCULATION_DATE = data.lastCalculatedDate;

            if (LAST_CALCULATION_DATE && (0, _moment2.default)(LAST_CALCULATION_DATE).utc().format("YYYY-MM-DD") < (0, _moment2.default)().utc().startOf("day").format("YYYY-MM-DD")) {
              console.log("Case 2 : Date has changed");
              trigger = true;
            }
            _context6.next = 13;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](1);

            console.log("error in checkTriggersFunction : ", _context6.t0);

          case 13:
            return _context6.abrupt("return", trigger);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[1, 10]]);
  }));

  return function checkTriggersFunction(_x11) {
    return _ref6.apply(this, arguments);
  };
}();

var calculateIssueInInspection = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(line, jplan, dateRange) {
    var tasks, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, task, issues, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, issue, issuePush, issueObj;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            tasks = jplan.tasks;

            if (!(tasks && tasks.length > 0)) {
              _context7.next = 47;
              break;
            }

            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context7.prev = 5;
            _iterator4 = tasks[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context7.next = 33;
              break;
            }

            task = _step4.value;
            issues = task.issues;

            if (!(issues && issues.length > 0)) {
              _context7.next = 30;
              break;
            }

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context7.prev = 14;

            for (_iterator5 = issues[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              issue = _step5.value;
              issuePush = false;

              dateRange && (issuePush = new Date(issue.timeStamp) > new Date(dateRange.from) && new Date(issue.timeStamp) < new Date(dateRange.to));

              if (issuePush) {
                if (issue.status !== "Resolved") {
                  line.issues.summary.total++;

                  if (!issue.serverObject || !issue.serverObject.issuePriority) {
                    line.issues.summary.pending++;
                    // continue;
                  } else {
                    if (issue.serverObject.issuePriority == "info") {
                      line.issues.summary.info++;
                    }
                    if (issue.serverObject.issuePriority == "high") {
                      line.issues.summary.high++;
                    }
                    if (issue.serverObject.issuePriority == "medium") {
                      line.issues.summary.medium++;
                    }
                    if (issue.serverObject.issuePriority == "low") {
                      line.issues.summary.low++;
                    }
                  }

                  //comment because fixed on site implementaion changed
                  // if (issue.marked) {
                  //   line.issues.summary.marked++;
                  // }
                  issueObj = {
                    planId: jplan._id,
                    priority: issue.priority,
                    user: jplan.user,
                    trackId: issue.trackId,
                    timeStamp: issue.timeStamp,
                    marked: issue.marked,
                    serverObject: issue.serverObject
                  };

                  line.issues.details.push(issueObj);
                }
              }
            }
            _context7.next = 22;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](14);
            _didIteratorError5 = true;
            _iteratorError5 = _context7.t0;

          case 22:
            _context7.prev = 22;
            _context7.prev = 23;

            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }

          case 25:
            _context7.prev = 25;

            if (!_didIteratorError5) {
              _context7.next = 28;
              break;
            }

            throw _iteratorError5;

          case 28:
            return _context7.finish(25);

          case 29:
            return _context7.finish(22);

          case 30:
            _iteratorNormalCompletion4 = true;
            _context7.next = 7;
            break;

          case 33:
            _context7.next = 39;
            break;

          case 35:
            _context7.prev = 35;
            _context7.t1 = _context7["catch"](5);
            _didIteratorError4 = true;
            _iteratorError4 = _context7.t1;

          case 39:
            _context7.prev = 39;
            _context7.prev = 40;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 42:
            _context7.prev = 42;

            if (!_didIteratorError4) {
              _context7.next = 45;
              break;
            }

            throw _iteratorError4;

          case 45:
            return _context7.finish(42);

          case 46:
            return _context7.finish(39);

          case 47:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[5, 35, 39, 47], [14, 18, 22, 30], [23,, 25, 29], [40,, 42, 46]]);
  }));

  return function calculateIssueInInspection(_x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var fillDetailArray = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(lineListStatusData) {
    var finalArray, count, eachArrayCount, arrayFilled;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            //let lineListStatusData = [["A1"], ["B1", "B2"], ["C1,C2,C3"], [], ["E1", "E2", "E3", "E4", "E5"]];
            finalArray = [];
            count = 10;
            eachArrayCount = count / lineListStatusData.length;
            _context8.next = 5;
            return fillArrayCount(lineListStatusData, eachArrayCount, finalArray, count);

          case 5:
            arrayFilled = _context8.sent;
            return _context8.abrupt("return", finalArray);

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function fillDetailArray(_x15) {
    return _ref8.apply(this, arguments);
  };
}();

var fillArrayCount = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(lineListStatusData, eachArrayCount, finalArray, count, recur_index) {
    var allArrayLength, arr_index, arr, index, arrLengthBeforeDown, filledArray;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            allArrayLength = lineListStatusData.length;
            arr_index = recur_index ? recur_index : 0;

          case 2:
            if (!(arr_index < allArrayLength - 1)) {
              _context9.next = 22;
              break;
            }

            arr = lineListStatusData[arr_index];
            index = 0;
            arrLengthBeforeDown = arr.length;

            if (!(recur_index != arr_index)) {
              _context9.next = 19;
              break;
            }

            if (finalArray.length == 10) {}

            if (!(arr.length >= eachArrayCount)) {
              _context9.next = 12;
              break;
            }

            while (index < eachArrayCount && finalArray.length < count) {
              finalArray.push(arr[0]);

              arr.splice(0, 1);
              index++;
            }
            _context9.next = 19;
            break;

          case 12:
            if (!(arr.length > 0)) {
              _context9.next = 16;
              break;
            }

            while (index < arr.length && finalArray.length < count) {
              finalArray.push(arr[0]);
              arr.splice(0, 1);
              index++;
            }
            _context9.next = 19;
            break;

          case 16:
            _context9.next = 18;
            return fillArrayCount(lineListStatusData, arrLengthBeforeDown, finalArray, count, arr_index);

          case 18:
            filledArray = _context9.sent;

          case 19:
            arr_index++;
            _context9.next = 2;
            break;

          case 22:
            return _context9.abrupt("return", finalArray);

          case 23:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function fillArrayCount(_x16, _x17, _x18, _x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}();

var addAndPopDataInArray = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(arrayData, data, unshift) {
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            // const JPLAN_DATE = moment(data.date).startOf("day");
            // const TODAY_DATE_START = moment()
            //   .utc()
            //   .startOf("day");
            // if (JPLAN_DATE >= TODAY_DATE_START) {
            if (unshift) {
              arrayData.unshift(data);
            } else {
              arrayData.push(data);
            }
            //   if (arrayData.length > 10) {
            //     arrayData.pop();
            //   }
            // }

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function addAndPopDataInArray(_x21, _x22, _x23) {
    return _ref10.apply(this, arguments);
  };
}();

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _subdivisionCheck = require("../../apiUtils/subdivisionCheck");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");

var DashboardService = function () {
  function DashboardService() {
    (0, _classCallCheck3.default)(this, DashboardService);
  }

  (0, _createClass3.default)(DashboardService, [{
    key: "getDashboardData",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, query) {
        var resultObj, checkSubdiv, dateRange, dataObject, lineLists, getPlans;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = void 0, checkSubdiv = void 0, dateRange = void 0;

                resultObj = {};

                _context.prev = 2;

                if (query.dateRange) {
                  dateRange = JSON.parse(query.dateRange);
                  // console.log(dateRange);
                }

                //  checkSubdiv = await subdivisionChecker(user);
                dataObject = {};
                _context.next = 7;
                return getLists(checkSubdiv ? user.subdivision : null, false);

              case 7:
                lineLists = _context.sent;

                if (!lineLists) {
                  _context.next = 16;
                  break;
                }

                dataObject.lineLists = lineLists;
                _context.next = 12;
                return this.getInspectionDataBasedOnLine(dataObject, dateRange);

              case 12:
                getPlans = _context.sent;

                resultObj = { value: dataObject, status: 200 };
                _context.next = 17;
                break;

              case 16:
                resultObj = { errorVal: "Lines Not Found", status: 404 };

              case 17:
                _context.next = 23;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](2);

                console.log("getDashboardData Error: " + _context.t0);
                resultObj = { errorVal: _context.t0.toString(), status: 500 };

              case 23:
                return _context.abrupt("return", resultObj);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 19]]);
      }));

      function getDashboardData(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getDashboardData;
    }()
  }, {
    key: "reCalculateDashboardV1Data",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dateRange) {
        var updatedData, lines, range, workplanTemplateService, jplans, sortedPlans, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, jplan, jplanLineName, planObj, issues, _issues, dashboardModel, data, TODAY_CALCULATED_DATE, savedData, newData, _savedData;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                updatedData = {};
                _context2.prev = 1;
                _context2.next = 4;
                return getLists(null, true);

              case 4:
                lines = _context2.sent;

                //console.log(lines);
                range = dateRange ? dateRange : {
                  today: (0, _moment2.default)().utc().startOf("day"),
                  // from: moment()
                  //   .utc()
                  //   .subtract(30, "d")
                  //   .startOf("day"),
                  // to: moment()
                  //   .utc()
                  //   .add(30, "d")
                  //   .startOf("day"),
                  from: (0, _moment2.default)().utc().startOf("month"),
                  to: (0, _moment2.default)().utc().endOf("month")
                };
                //   console.log("Recalculating dashboard summary range: ", range);

                workplanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
                _context2.next = 9;
                return workplanTemplateService.getAllPlansInRange(range, {}, null, { date: "asc" });

              case 9:
                jplans = _context2.sent;
                sortedPlans = _lodash2.default.sortBy(jplans, "date");
                //let linesStatusesDataListArray = {};
                // line = [
                //   //inProgress:
                //   [],
                //   //finished:
                //   [],
                //   //overdue:
                //   [],
                //   //futureInspection:
                //   [],
                //   // missed:
                //   [],
                // ];

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 14;
                _iterator = sortedPlans[Symbol.iterator]();

              case 16:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 42;
                  break;
                }

                jplan = _step.value;
                jplanLineName = lines.lines_Id_name[jplan.lineId];

                if (!jplanLineName) {
                  _context2.next = 38;
                  break;
                }

                // Only add today's inspection upto 10
                // const JPLAN_DATE = moment(jplan.date).startOf("day");
                // const TODAY_DATE_START = moment()
                //   .utc()
                //   .startOf("day");
                // const TODAY_DATE_END = moment()
                //   .utc()
                //   .endOf("day");
                // if (JPLAN_DATE > TODAY_DATE_START && JPLAN_DATE < TODAY_DATE_END) {
                //   lines.lines[jplanLineName].inspections.details.length <= 10 ? lines.lines[jplanLineName].inspections.details.push(jplan) : "";
                // }

                // linesStatusesDataListArray[jplanLineName] = !linesStatusesDataListArray[jplanLineName]
                //   ? [[], [], [], [], []]
                //   : linesStatusesDataListArray[jplanLineName];
                lines.lines[jplanLineName].inspections.summary.total++;
                planObj = {
                  _id: jplan._id,
                  user: jplan.user,
                  status: jplan.status,
                  date: jplan.date,
                  title: jplan.title
                };

                lines.lines[jplanLineName].inspections.details.push(planObj);

                if (!(jplan.status == "Finished")) {
                  _context2.next = 28;
                  break;
                }

                lines.lines[jplanLineName].inspections.summary.completed++;
                _context2.next = 27;
                return calculateIssueInInspection(lines.lines[jplanLineName], jplan, dateRange);

              case 27:
                issues = _context2.sent;

              case 28:
                if (!(jplan.status == "In Progress")) {
                  _context2.next = 33;
                  break;
                }

                lines.lines[jplanLineName].inspections.summary.inProgress++;
                _context2.next = 32;
                return calculateIssueInInspection(lines.lines[jplanLineName], jplan, dateRange);

              case 32:
                _issues = _context2.sent;

              case 33:
                if (jplan.status == "Missed") {
                  lines.lines[jplanLineName].inspections.summary.missed++;
                }
                if (jplan.status == "Overdue") {
                  lines.lines[jplanLineName].inspections.summary.overdue++;
                }
                if (jplan.status == "Future Inspection") {
                  lines.lines[jplanLineName].inspections.summary.upcoming++;
                }
                _context2.next = 39;
                break;

              case 38:
                console.log("Caution : Active Inspection Run Plan Template Exist But Its Line Not Found, lineId :  ", jplan.lineId);

              case 39:
                _iteratorNormalCompletion = true;
                _context2.next = 16;
                break;

              case 42:
                _context2.next = 48;
                break;

              case 44:
                _context2.prev = 44;
                _context2.t0 = _context2["catch"](14);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 48:
                _context2.prev = 48;
                _context2.prev = 49;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 51:
                _context2.prev = 51;

                if (!_didIteratorError) {
                  _context2.next = 54;
                  break;
                }

                throw _iteratorError;

              case 54:
                return _context2.finish(51);

              case 55:
                return _context2.finish(48);

              case 56:

                //   console.log(lines);
                dashboardModel = ServiceLocator.resolve("ReportModel");
                _context2.next = 59;
                return dashboardModel.findOne({ tag: "dashboardV1" }).exec();

              case 59:
                data = _context2.sent;
                TODAY_CALCULATED_DATE = (0, _moment2.default)().utc().startOf("day").format("YYYY-MM-DD");

                if (!data) {
                  _context2.next = 71;
                  break;
                }

                data.data.lines = lines.lines;
                data.data.lastCalculatedDate = TODAY_CALCULATED_DATE;
                data.markModified("data");
                _context2.next = 67;
                return data.save();

              case 67:
                savedData = _context2.sent;

                updatedData = savedData;
                _context2.next = 80;
                break;

              case 71:
                data = { data: {} };
                data.data.lines = lines.lines;
                data.data.lastCalculatedDate = TODAY_CALCULATED_DATE;
                data.tag = "dashboardV1";
                newData = new dashboardModel(data);
                _context2.next = 78;
                return newData.save();

              case 78:
                _savedData = _context2.sent;

                updatedData = _savedData;

              case 80:
                _context2.next = 85;
                break;

              case 82:
                _context2.prev = 82;
                _context2.t1 = _context2["catch"](1);

                console.log("Error in reCalculateDashboardV1Data : ", _context2.t1);

              case 85:
                return _context2.abrupt("return", updatedData);

              case 86:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 82], [14, 44, 48, 56], [49,, 51, 55]]);
      }));

      function reCalculateDashboardV1Data(_x3) {
        return _ref2.apply(this, arguments);
      }

      return reCalculateDashboardV1Data;
    }()
  }, {
    key: "getInspectionDataBasedOnLine",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dataObject, dateRange) {
        var linesNames, dashboardModel, data, checkTrigger, re_calLogic, filledData;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                linesNames = void 0, dashboardModel = void 0, data = void 0, checkTrigger = void 0, re_calLogic = void 0, filledData = void 0;

                linesNames = Object.keys(dataObject.lineLists);
                dashboardModel = ServiceLocator.resolve("ReportModel");
                _context3.next = 6;
                return dashboardModel.findOne({ tag: "dashboardV1" }).exec();

              case 6:
                data = _context3.sent;

                checkTrigger = true; //await checkTriggersFunction(data, linesNames, dataObject);

                if (!checkTrigger) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 11;
                return this.reCalculateDashboardV1Data(dateRange);

              case 11:
                re_calLogic = _context3.sent;
                _context3.next = 14;
                return this.fillLinesData(re_calLogic, linesNames, dataObject);

              case 14:
                filledData = _context3.sent;
                _context3.next = 20;
                break;

              case 17:
                _context3.next = 19;
                return this.fillLinesData(data, linesNames, dataObject);

              case 19:
                filledData = _context3.sent;

              case 20:
                _context3.next = 25;
                break;

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](0);

                console.log("getInspectionDataBasedOnLine Error: " + _context3.t0);

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 22]]);
      }));

      function getInspectionDataBasedOnLine(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return getInspectionDataBasedOnLine;
    }()
  }, {
    key: "fillLinesData",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data, linesNames, dataObject) {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, line_name, re_calLogic, filledData, todayStartDate, todayEndDate, JourneyPlanModel, jPLans, todayInspectionData;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 4;
                _iterator2 = linesNames[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context4.next = 32;
                  break;
                }

                line_name = _step2.value;

                dataObject.lineLists[line_name] = data.data.lines[line_name];

                if (dataObject.lineLists[line_name]) {
                  _context4.next = 19;
                  break;
                }

                console.log("TO Call Recall Logic");
                _context4.next = 13;
                return this.reCalculateDashboardV1Data();

              case 13:
                re_calLogic = _context4.sent;
                _context4.next = 16;
                return this.fillLinesData(re_calLogic, linesNames, dataObject);

              case 16:
                filledData = _context4.sent;
                _context4.next = 29;
                break;

              case 19:
                //send today Inspection Data to frontend:
                todayStartDate = (0, _moment2.default)().utc().startOf("day");
                todayEndDate = (0, _moment2.default)().utc().endOf("day");
                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                _context4.next = 24;
                return JourneyPlanModel.find({
                  $or: [
                  // {
                  //   $and: [
                  //     {
                  //       date: {
                  //         $gte: new Date(todayStartDate.toISOString()),
                  //         $lte: new Date(todayEndDate.toISOString()),
                  //       },
                  //     },
                  //     {
                  //       lineId: dataObject.lineLists[line_name].line.id,
                  //     },
                  //   ],
                  // },
                  {
                    $and: [{
                      status: "In Progress"
                    }, {
                      lineId: dataObject.lineLists[line_name].line.id
                    }]
                  }]
                }).exec();

              case 24:
                jPLans = _context4.sent;

                // console.log("today plans", jPLans);
                todayInspectionData = jPLans;

                if (!dataObject.todayLineList) {
                  dataObject.todayLineList = {};
                }
                dataObject.todayLineList[line_name] = dataObject.todayLineList[line_name] ? dataObject.todayLineList[line_name] : dataObject.todayLineList[line_name] = {};
                dataObject.todayLineList[line_name].inspections = todayInspectionData;

              case 29:
                _iteratorNormalCompletion2 = true;
                _context4.next = 6;
                break;

              case 32:
                _context4.next = 38;
                break;

              case 34:
                _context4.prev = 34;
                _context4.t0 = _context4["catch"](4);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t0;

              case 38:
                _context4.prev = 38;
                _context4.prev = 39;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 41:
                _context4.prev = 41;

                if (!_didIteratorError2) {
                  _context4.next = 44;
                  break;
                }

                throw _iteratorError2;

              case 44:
                return _context4.finish(41);

              case 45:
                return _context4.finish(38);

              case 46:
                _context4.next = 51;
                break;

              case 48:
                _context4.prev = 48;
                _context4.t1 = _context4["catch"](0);

                console.log("Error in fillLinesData : ", _context4.t1);

              case 51:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 48], [4, 34, 38, 46], [39,, 41, 45]]);
      }));

      function fillLinesData(_x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return fillLinesData;
    }()
  }]);
  return DashboardService;
}();

exports.default = DashboardService;