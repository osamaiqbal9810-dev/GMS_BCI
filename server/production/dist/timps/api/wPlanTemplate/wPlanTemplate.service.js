"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var getInspectionsOfTemplate = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(plan, exec_inspections, dateRange, workingDays) {
    var inspections, inspectionsBeforePlanDate, DATE_FILTER_TO, FREQUENCY, DATE_FILTER_FROM, DATE_FILTER_TODAY, c_exec_inspections, dateToCheck, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, inspec, tempDate, freqNum, timePeriod, newFreq, nextDateToCheck, next_nextInspectionCheck, CHECK_DATE_IN_RANGE, CHECK_DATE_BEFORE_TODAY, NEXT_CHECK_DATE_BEFORE_TODAY, exists, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, _inspec, missedInspection, overdueInspection, momentDate, futureChange_date, inspFound, _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, _inspec2, futureInspection, _momentDate, _futureChange_date, adjustedFreq, _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _iterator18, _step18, _inspec3, _iteratorNormalCompletion19, _didIteratorError19, _iteratorError19, _iterator19, _step19, _inspec4;

    return _regenerator2.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            inspections = [];
            inspectionsBeforePlanDate = [];
            DATE_FILTER_TO = new Date(dateRange.to);
            FREQUENCY = plan.inspectionFrequency;
            DATE_FILTER_FROM = new Date(dateRange.from);
            DATE_FILTER_TODAY = new Date(dateRange.today);
            c_exec_inspections = [].concat((0, _toConsumableArray3.default)(exec_inspections));
            // cases
            /*
            check for both cases if fixed or custom inspections.
            */

            _context21.prev = 7;

            // 1.1 start the iteration from the start date till we fell into the date range
            dateToCheck = plan.startDate;
            //  add any inspection before start date of the template plan

            _iteratorNormalCompletion15 = true;
            _didIteratorError15 = false;
            _iteratorError15 = undefined;
            _context21.prev = 12;
            for (_iterator15 = c_exec_inspections[Symbol.iterator](); !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
              inspec = _step15.value;

              if (inspec.date < plan.startDate && inspec.date > DATE_FILTER_FROM) {
                inspectionsBeforePlanDate.push(inspec);
              }
            }

            // Check Both cases when frequency is greater then 0
            _context21.next = 20;
            break;

          case 16:
            _context21.prev = 16;
            _context21.t0 = _context21["catch"](12);
            _didIteratorError15 = true;
            _iteratorError15 = _context21.t0;

          case 20:
            _context21.prev = 20;
            _context21.prev = 21;

            if (!_iteratorNormalCompletion15 && _iterator15.return) {
              _iterator15.return();
            }

          case 23:
            _context21.prev = 23;

            if (!_didIteratorError15) {
              _context21.next = 26;
              break;
            }

            throw _iteratorError15;

          case 26:
            return _context21.finish(23);

          case 27:
            return _context21.finish(20);

          case 28:
            if (!(FREQUENCY > 0 || plan.timeFrame && plan.perTime)) {
              _context21.next = 129;
              break;
            }

          case 29:
            if (!(dateToCheck && dateToCheck <= DATE_FILTER_TO)) {
              _context21.next = 108;
              break;
            }

            tempDate = new Date(dateToCheck);
            freqNum = plan.inspectionType == "custom" ? plan.maxAllowable : FREQUENCY;
            timePeriod = plan.timeFrame == "Week" ? 7 - workingDays.weekOffDays.length : plan.timeFrame == "Month" ? (0, _moment2.default)(dateToCheck).daysInMonth() : (0, _moment2.default)(dateToCheck).isLeapYear() ? 366 : 365;
            newFreq = Math.ceil(timePeriod / parseInt(plan.perTime));
            nextDateToCheck = new Date((0, _moment2.default)(nextDateToCheck ? nextDateToCheck : dateToCheck).add(newFreq, "days"));
            next_nextInspectionCheck = nextDateToCheck;
            CHECK_DATE_IN_RANGE = dateToCheck >= DATE_FILTER_FROM;
            CHECK_DATE_BEFORE_TODAY = dateToCheck < DATE_FILTER_TODAY;
            NEXT_CHECK_DATE_BEFORE_TODAY = next_nextInspectionCheck < DATE_FILTER_TODAY;
            // Case :- the dateToCheck falls in the range of the query date , it make sure the date is still in the past , including the next possible inspection to check if its  missed or overdue.

            if (!(CHECK_DATE_IN_RANGE && CHECK_DATE_BEFORE_TODAY)) {
              _context21.next = 76;
              break;
            }

            exists = false;
            _iteratorNormalCompletion16 = true;
            _didIteratorError16 = false;
            _iteratorError16 = undefined;
            _context21.prev = 44;

            for (_iterator16 = c_exec_inspections[Symbol.iterator](); !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
              _inspec = _step16.value;

              if (_inspec.date < next_nextInspectionCheck && _inspec.date >= plan.startDate) {
                if (!_inspec.added) {
                  inspections.push(_inspec);
                  _inspec.added = true;
                  if (plan.inspectionType == "custom") {
                    nextDateToCheck = new Date(_inspec.date);
                  }
                }
                // _.remove(c_exec_inspections, { _id: inspec._id });

                exists = true;
              }
            }
            _context21.next = 52;
            break;

          case 48:
            _context21.prev = 48;
            _context21.t1 = _context21["catch"](44);
            _didIteratorError16 = true;
            _iteratorError16 = _context21.t1;

          case 52:
            _context21.prev = 52;
            _context21.prev = 53;

            if (!_iteratorNormalCompletion16 && _iterator16.return) {
              _iterator16.return();
            }

          case 55:
            _context21.prev = 55;

            if (!_didIteratorError16) {
              _context21.next = 58;
              break;
            }

            throw _iteratorError16;

          case 58:
            return _context21.finish(55);

          case 59:
            return _context21.finish(52);

          case 60:
            if (exists) {
              _context21.next = 74;
              break;
            }

            if (!(NEXT_CHECK_DATE_BEFORE_TODAY && !plan.isRemoved)) {
              _context21.next = 68;
              break;
            }

            _context21.next = 64;
            return foreCastedInspectionObjectGet(plan, dateToCheck, "Missed");

          case 64:
            missedInspection = _context21.sent;

            inspections.push(missedInspection);
            _context21.next = 74;
            break;

          case 68:
            if (plan.isRemoved) {
              _context21.next = 74;
              break;
            }

            _context21.next = 71;
            return foreCastedInspectionObjectGet(plan, dateToCheck, "Overdue");

          case 71:
            overdueInspection = _context21.sent;

            inspections.push(overdueInspection);
            if (plan.modifications) {
              momentDate = _moment2.default.utc(dateToCheck.getTime()).format("YYYYMMDD");
              futureChange_date = plan.modifications[momentDate];

              if (futureChange_date && futureChange_date.user) {
                overdueInspection.temp_user = futureChange_date.user;
              }
            }

          case 74:
            _context21.next = 104;
            break;

          case 76:
            if (!(CHECK_DATE_IN_RANGE && !CHECK_DATE_BEFORE_TODAY)) {
              _context21.next = 104;
              break;
            }

            inspFound = false;

            if (!(dateToCheck < DATE_FILTER_TO)) {
              _context21.next = 98;
              break;
            }

            _iteratorNormalCompletion17 = true;
            _didIteratorError17 = false;
            _iteratorError17 = undefined;
            _context21.prev = 82;

            for (_iterator17 = c_exec_inspections[Symbol.iterator](); !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
              _inspec2 = _step17.value;

              if (!_inspec2.added) {
                if (_inspec2.date < next_nextInspectionCheck && _inspec2.date >= plan.startDate) {
                  inspections.push(_inspec2);
                  _inspec2.added = true;
                  if (plan.inspectionType == "custom") {
                    nextDateToCheck = new Date(_inspec2.date);
                  }
                }
                // _.remove(c_exec_inspections, { _id: inspec._id });

                inspFound = true;
              }
            }
            _context21.next = 90;
            break;

          case 86:
            _context21.prev = 86;
            _context21.t2 = _context21["catch"](82);
            _didIteratorError17 = true;
            _iteratorError17 = _context21.t2;

          case 90:
            _context21.prev = 90;
            _context21.prev = 91;

            if (!_iteratorNormalCompletion17 && _iterator17.return) {
              _iterator17.return();
            }

          case 93:
            _context21.prev = 93;

            if (!_didIteratorError17) {
              _context21.next = 96;
              break;
            }

            throw _iteratorError17;

          case 96:
            return _context21.finish(93);

          case 97:
            return _context21.finish(90);

          case 98:
            if (!(!plan.isRemoved && !inspFound)) {
              _context21.next = 104;
              break;
            }

            _context21.next = 101;
            return foreCastedInspectionObjectGet(plan, dateToCheck, "Future Inspection");

          case 101:
            futureInspection = _context21.sent;


            if (plan.modifications) {
              _momentDate = _moment2.default.utc(dateToCheck.getTime()).format("YYYYMMDD");
              _futureChange_date = plan.modifications[_momentDate];

              if (_futureChange_date && _futureChange_date.user) {
                futureInspection.temp_user = _futureChange_date.user;
              }
            }

            inspections.push(futureInspection);

          case 104:
            adjustedFreq = plan.timeFrame ? calculateTimeFrameNextFreq(plan, inspections, dateToCheck, workingDays) : nextWorkingDaysAdjusted(dateToCheck, freqNum, workingDays);

            dateToCheck = new Date((0, _moment2.default)(dateToCheck).add(adjustedFreq, "days"));
            _context21.next = 29;
            break;

          case 108:
            _iteratorNormalCompletion18 = true;
            _didIteratorError18 = false;
            _iteratorError18 = undefined;
            _context21.prev = 111;

            for (_iterator18 = c_exec_inspections[Symbol.iterator](); !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
              _inspec3 = _step18.value;

              if (!_inspec3.added && _inspec3.date >= DATE_FILTER_FROM && _inspec3.date <= DATE_FILTER_TO) {
                inspections.push(_inspec3);
                _inspec3.added = true;
              }
            }
            _context21.next = 119;
            break;

          case 115:
            _context21.prev = 115;
            _context21.t3 = _context21["catch"](111);
            _didIteratorError18 = true;
            _iteratorError18 = _context21.t3;

          case 119:
            _context21.prev = 119;
            _context21.prev = 120;

            if (!_iteratorNormalCompletion18 && _iterator18.return) {
              _iterator18.return();
            }

          case 122:
            _context21.prev = 122;

            if (!_didIteratorError18) {
              _context21.next = 125;
              break;
            }

            throw _iteratorError18;

          case 125:
            return _context21.finish(122);

          case 126:
            return _context21.finish(119);

          case 127:
            _context21.next = 148;
            break;

          case 129:
            // Inspections template that have 0 frequency.
            _iteratorNormalCompletion19 = true;
            _didIteratorError19 = false;
            _iteratorError19 = undefined;
            _context21.prev = 132;
            for (_iterator19 = c_exec_inspections[Symbol.iterator](); !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
              _inspec4 = _step19.value;

              if (_inspec4.date > DATE_FILTER_FROM && _inspec4.date < DATE_FILTER_TO) {
                inspections.push(_inspec4);
              }
            }
            _context21.next = 140;
            break;

          case 136:
            _context21.prev = 136;
            _context21.t4 = _context21["catch"](132);
            _didIteratorError19 = true;
            _iteratorError19 = _context21.t4;

          case 140:
            _context21.prev = 140;
            _context21.prev = 141;

            if (!_iteratorNormalCompletion19 && _iterator19.return) {
              _iterator19.return();
            }

          case 143:
            _context21.prev = 143;

            if (!_didIteratorError19) {
              _context21.next = 146;
              break;
            }

            throw _iteratorError19;

          case 146:
            return _context21.finish(143);

          case 147:
            return _context21.finish(140);

          case 148:
            _context21.next = 153;
            break;

          case 150:
            _context21.prev = 150;
            _context21.t5 = _context21["catch"](7);

            console.log(_context21.t5);

          case 153:
            return _context21.abrupt("return", [].concat(inspectionsBeforePlanDate, inspections));

          case 154:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, this, [[7, 150], [12, 16, 20, 28], [21,, 23, 27], [44, 48, 52, 60], [53,, 55, 59], [82, 86, 90, 98], [91,, 93, 97], [111, 115, 119, 127], [120,, 122, 126], [132, 136, 140, 148], [141,, 143, 147]]);
  }));

  return function getInspectionsOfTemplate(_x40, _x41, _x42, _x43) {
    return _ref21.apply(this, arguments);
  };
}();

var foreCastedInspectionObjectGet = function () {
  var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(c_plan, date, status) {
    var inspection;
    return _regenerator2.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            inspection = {
              user: c_plan.user,
              tasks: c_plan.tasks,
              date: new Date(date.getTime()),
              title: c_plan.title,
              workplanTemplateId: c_plan._id,
              lineId: c_plan.lineId,
              lineName: c_plan.lineName,
              status: status
            };
            return _context22.abrupt("return", inspection);

          case 2:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, this);
  }));

  return function foreCastedInspectionObjectGet(_x44, _x45, _x46) {
    return _ref22.apply(this, arguments);
  };
}();

var checkAvailableDateRange = function () {
  var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23(wpScheduleObj, dateRange, utils) {
    var checkObjToReturnWithDate;
    return _regenerator2.default.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            checkObjToReturnWithDate = {
              reCal: false,
              updatedDateRange: dateRange,
              fromUpdated: false,
              toUpdated: false,
              todayUpdated: false
            };

            if (wpScheduleObj) {
              if (utils.compareTwoDates(dateRange.from, wpScheduleObj.dateRange.from, "IB")) {
                checkObjToReturnWithDate.updatedDateRange.from = dateRange.from;
                checkObjToReturnWithDate.reCal = true;
                checkObjToReturnWithDate.fromUpdated = true;
              }
              if (utils.compareTwoDates(dateRange.to, wpScheduleObj.dateRange.to, "IA")) {
                checkObjToReturnWithDate.updatedDateRange.to = dateRange.to;
                checkObjToReturnWithDate.reCal = true;
                checkObjToReturnWithDate.toUpdated = true;
              }
              if (!utils.checkSameDates((0, _moment2.default)(dateRange.today), (0, _moment2.default)(wpScheduleObj.dateRange.today))) {
                checkObjToReturnWithDate.updatedDateRange.today = new Date((0, _moment2.default)(dateRange.today).startOf("d"));
                checkObjToReturnWithDate.reCal = true;
                checkObjToReturnWithDate.todayUpdated = true;
              }
            } else {
              checkObjToReturnWithDate.reCal = true;
            }
            return _context23.abrupt("return", checkObjToReturnWithDate);

          case 3:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, this);
  }));

  return function checkAvailableDateRange(_x47, _x48, _x49) {
    return _ref23.apply(this, arguments);
  };
}();

var populateInspectionDataToID = function () {
  var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24(schedules, Jmodel) {
    var inspectionArrayLength, i, inspection;
    return _regenerator2.default.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            inspectionArrayLength = schedules.length;
            i = 0;

          case 2:
            if (!(i < inspectionArrayLength)) {
              _context24.next = 11;
              break;
            }

            if (!schedules[i]._id) {
              _context24.next = 8;
              break;
            }

            _context24.next = 6;
            return Jmodel.findOne({ _id: schedules[i]._id });

          case 6:
            inspection = _context24.sent;

            if (inspection) {
              schedules[i] = inspection;
            }

          case 8:
            i++;
            _context24.next = 2;
            break;

          case 11:
            return _context24.abrupt("return", schedules);

          case 12:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, this);
  }));

  return function populateInspectionDataToID(_x50, _x51) {
    return _ref24.apply(this, arguments);
  };
}();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _UUID = require("../../../utilities/UUID.js");

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _subdivisionCheck = require("../../../apiUtils/subdivisionCheck");

var _babelTypes = require("babel-types");

var _workingdays = require("../../../template/workingdays");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = require("mongodb").ObjectID;
var ServiceLocator = require("../../../framework/servicelocator");

var turf = require("@turf/turf");

var WorkPlanTemplateService = function () {
  function WorkPlanTemplateService() {
    (0, _classCallCheck3.default)(this, WorkPlanTemplateService);
  }

  (0, _createClass3.default)(WorkPlanTemplateService, [{
    key: "getAssetsByLine",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(lineId, assetType) {
        var assetsTreeService, assetArray, assetTreeObj, assetsModel, criteria, assetArray1;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
                //let assetArray = assetsTreeService.findAssetFlat(lineId);

                assetArray = [];
                //console.log(assetsTreeService);

                _context.next = 4;
                return assetsTreeService.getAssetTree(lineId);

              case 4:
                assetTreeObj = _context.sent;
                _context.next = 7;
                return assetsTreeService.filterTreeByProperties(assetTreeObj, {}, assetArray);

              case 7:
                assetsModel = ServiceLocator.resolve("AssetsModel");
                criteria = {};

                criteria._id = { $in: assetArray };
                if (assetType) {
                  criteria.assetType = assetType;
                }
                _context.next = 13;
                return assetsModel.find(criteria).sort({ start: "asc" }).exec();

              case 13:
                assetArray1 = _context.sent;
                return _context.abrupt("return", [].concat((0, _toConsumableArray3.default)(assetArray1)));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAssetsByLine(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getAssetsByLine;
    }()
  }, {
    key: "getOtherAssetsByLine",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(lineId, assetType) {
        var assetsTreeService, assetArray, treeObj, assetsModel, criteria, assetArray1;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
                //let assetArray = assetsTreeService.findAssetFlat(lineId);

                assetArray = [];
                //console.log(assetsTreeService);

                _context2.next = 4;
                return assetsTreeService.getAssetTree(lineId);

              case 4:
                treeObj = _context2.sent;
                _context2.next = 7;
                return assetsTreeService.filterTreeGetLineOtherAssets(treeObj, assetArray);

              case 7:
                assetsModel = ServiceLocator.resolve("AssetsModel");
                criteria = {};

                criteria._id = { $in: assetArray };
                if (assetType) {
                  criteria.assetType = assetType;
                }
                _context2.next = 13;
                return assetsModel.find(criteria).sort({ start: "asc" }).exec();

              case 13:
                assetArray1 = _context2.sent;
                return _context2.abrupt("return", [].concat((0, _toConsumableArray3.default)(assetArray1)));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getOtherAssetsByLine(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getOtherAssetsByLine;
    }()
  }, {
    key: "getCoordinatesArray",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(coordinates, geoJsonCord, start, end) {
        var startOffset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var uom = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "miles";

        var assetsTreeService, _coordinates, _start, _end, startCords, endCords;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(coordinates && coordinates.length > 0 && coordinates[0][0] != "" && coordinates[0][1] != "" && coordinates[1][0] != "" && coordinates[1][1] != "")) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", coordinates);

              case 2:
                assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
                _coordinates = [];
                //console.log(geoJsonCord);

                _start = start, _end = end;


                if (_start >= startOffset) _start -= startOffset;

                if (_end >= startOffset) _end -= startOffset;

                _context3.next = 9;
                return assetsTreeService.resolveLocation(geoJsonCord, _start, uom);

              case 9:
                startCords = _context3.sent;
                _context3.next = 12;
                return assetsTreeService.resolveLocation(geoJsonCord, _end, uom);

              case 12:
                endCords = _context3.sent;

                _coordinates.push(startCords);
                _coordinates.push(endCords);
                return _context3.abrupt("return", _coordinates);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getCoordinatesArray(_x7, _x8, _x9, _x10) {
        return _ref3.apply(this, arguments);
      }

      return getCoordinatesArray;
    }()
  }, {
    key: "createAndFillRunRange",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(lineAsset, runRange) {
        var runModel, run, runRangeFull, mpStart, mpEnd, utils, rangeCords, geoJsonCord, lineGeodata, uom, endGeoJsonMP, startGeoJsonMP, existingRangeIndex, ranges;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                runModel = void 0, run = void 0, runRangeFull = void 0, mpStart = void 0, mpEnd = void 0, utils = void 0, rangeCords = void 0, geoJsonCord = void 0, lineGeodata = void 0, uom = void 0;

                runModel = ServiceLocator.resolve("RunModel");
                utils = ServiceLocator.resolve("utils");
                mpStart = utils.toFixed(+runRange.runStart);
                mpEnd = utils.toFixed(+runRange.runEnd);
                rangeCords = { geoJsonCord: "", start: mpStart, end: mpEnd };
                geoJsonCord = JSON.parse(lineAsset.attributes.geoJsonCord);
                lineGeodata = turf.lineString(geoJsonCord.features[0].geometry.coordinates, { name: "line 1" });
                uom = this.getUnitOfMeasurements(lineAsset);
                // if mpStart and and mpEnd are 0 , it causes error that coordinates must be an array of two or more posiitons
                endGeoJsonMP = mpEnd - mpStart; // substract start offset to make the ranges 0 based lengths

                startGeoJsonMP = 0;


                rangeCords.geoJsonCord = turf.lineSliceAlong(lineGeodata, startGeoJsonMP, endGeoJsonMP, { units: uom });
                rangeCords.start = turf.along(lineGeodata, startGeoJsonMP, { units: uom });
                rangeCords.end = turf.along(lineGeodata, endGeoJsonMP, { units: uom });

                runRangeFull = (0, _extends3.default)({
                  id: (0, _UUID.guid)(),
                  runId: runRange.runId,
                  runDescription: runRange.runId,
                  mpStart: mpStart,
                  mpEnd: mpEnd,
                  lineId: lineAsset._id,
                  lineName: lineAsset.unitId
                }, rangeCords);

                _context4.prev = 15;
                _context4.next = 18;
                return runModel.findOne({ runLineID: lineAsset._id }).exec();

              case 18:
                run = _context4.sent;

                if (run) {
                  if (runRange.updated) {
                    existingRangeIndex = _lodash2.default.findIndex(run.runRange, { id: runRange.id });

                    run.runRange[existingRangeIndex] = runRangeFull;
                  } else {
                    run.runRange.push(runRangeFull);
                  }
                  run.markModified(runRange);
                } else {
                  run = new runModel({
                    runLineID: lineAsset._id,
                    runId: runRange.runId,
                    runLineName: lineAsset.unitId,
                    lineStart: lineAsset.start,
                    lineEnd: lineAsset.end,
                    runRange: [runRangeFull]
                  });
                }
                _context4.next = 22;
                return run.save();

              case 22:
                _context4.next = 27;
                break;

              case 24:
                _context4.prev = 24;
                _context4.t0 = _context4["catch"](15);

                console.log("error in createAndFillRunRange : " + _context4.t0);

              case 27:
                ranges = [runRangeFull];
                return _context4.abrupt("return", ranges);

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[15, 24]]);
      }));

      function createAndFillRunRange(_x11, _x12) {
        return _ref4.apply(this, arguments);
      }

      return createAndFillRunRange;
    }()
  }, {
    key: "fillRunRangesData",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(runRanges) {
        var RunService, rranges, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, rr, run, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _rrange;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                RunService = ServiceLocator.resolve("LineRunService");
                rranges = [];

                if (!(runRanges && runRanges.length && runRanges[0] && runRanges[0].geoJsonCord)) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return", runRanges);

              case 4:
                if (!(runRanges && runRanges.length)) {
                  _context5.next = 52;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context5.prev = 8;
                _iterator = runRanges[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context5.next = 38;
                  break;
                }

                rr = _step.value;
                _context5.next = 14;
                return RunService.findSingleRun(rr.runParentId);

              case 14:
                run = _context5.sent;

                run = run && run.value ? run.value : { runRange: [] };
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context5.prev = 19;
                for (_iterator2 = run.runRange[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _rrange = _step2.value;

                  if (_rrange.id === rr.id) {
                    rranges.push(_rrange);
                  }
                }
                _context5.next = 27;
                break;

              case 23:
                _context5.prev = 23;
                _context5.t0 = _context5["catch"](19);
                _didIteratorError2 = true;
                _iteratorError2 = _context5.t0;

              case 27:
                _context5.prev = 27;
                _context5.prev = 28;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 30:
                _context5.prev = 30;

                if (!_didIteratorError2) {
                  _context5.next = 33;
                  break;
                }

                throw _iteratorError2;

              case 33:
                return _context5.finish(30);

              case 34:
                return _context5.finish(27);

              case 35:
                _iteratorNormalCompletion = true;
                _context5.next = 10;
                break;

              case 38:
                _context5.next = 44;
                break;

              case 40:
                _context5.prev = 40;
                _context5.t1 = _context5["catch"](8);
                _didIteratorError = true;
                _iteratorError = _context5.t1;

              case 44:
                _context5.prev = 44;
                _context5.prev = 45;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 47:
                _context5.prev = 47;

                if (!_didIteratorError) {
                  _context5.next = 50;
                  break;
                }

                throw _iteratorError;

              case 50:
                return _context5.finish(47);

              case 51:
                return _context5.finish(44);

              case 52:
                return _context5.abrupt("return", rranges);

              case 53:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[8, 40, 44, 52], [19, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
      }));

      function fillRunRangesData(_x13) {
        return _ref5.apply(this, arguments);
      }

      return fillRunRangesData;
    }()
  }, {
    key: "getUnitOfMeasurements",
    value: function getUnitOfMeasurements(lineAsset) {
      var uom = "miles";
      if (lineAsset && lineAsset.systemAttributes && lineAsset.systemAttributes.milepostUnit && lineAsset.systemAttributes.milepostUnit.value && typeof lineAsset.systemAttributes.milepostUnit.value === "string") {
        uom = lineAsset.systemAttributes.milepostUnit.value;
      }
      return uom;
    }
  }, {
    key: "createWorkplanTemplate",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(jPlan) {
        var resultObj, assetService, AssetsModel, wPlanTemplate, assetsTreeService, lineAsset, assetArray, criteria, lineAssets, copyJPlan, tasks, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _run, _task, lineAssetsArrary, assetListToAdd, runStart, runEnd, uom, _coordinatesArray, _lineAssetToPush, longestAsset, primaryTrackFound, i, l, _uom, prevLongest, nowAssetLongest, toMerge, primaryTrackAssetIndex, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, run, task, filteredAssets, _runStart, _runEnd, startIndex, endIndex, _i, _i2, isOtherAssets, _uom2, coordinatesArray, lineAssetToPush, _i3, _uom3, _coordinatesArray2, assetToPush, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, track, trackAssetsObj, trackAssets, trackAsset, _runStart2, _runEnd2, _uom4, _coordinatesArray3, trackAssetToPush, _i4, _trackAsset, _uom5, _coordinatesArray4, _assetToPush, timezone, dayBasedLocalDate, newWorkPlan, savedWorkPlan;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                //console.log("createWorkplanTemplate Func");
                resultObj = void 0, assetService = void 0, AssetsModel = void 0, wPlanTemplate = void 0, assetsTreeService = void 0;

                resultObj = {};
                wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
                assetService = ServiceLocator.resolve("AssetsService");
                assetsTreeService = ServiceLocator.resolve("AssetsTreeService");

                AssetsModel = ServiceLocator.resolve("AssetsModel");
                _context6.next = 8;
                return AssetsModel.findOne({ _id: jPlan.lineId }).exec();

              case 8:
                lineAsset = _context6.sent;

                if (!(jPlan && jPlan.runRanges && jPlan.runRanges.length > 0 && (jPlan.runRanges[0].isNew || jPlan.runRanges[0].isUpdated))) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 12;
                return this.createAndFillRunRange(lineAsset, jPlan.runRanges[0]);

              case 12:
                jPlan.runRanges = _context6.sent;
                _context6.next = 19;
                break;

              case 15:
                if (!(jPlan && jPlan.runRanges && jPlan.runRanges.length > 0)) {
                  _context6.next = 19;
                  break;
                }

                _context6.next = 18;
                return this.fillRunRangesData(jPlan.runRanges);

              case 18:
                jPlan.runRanges = _context6.sent;

              case 19:

                //try {
                //let lineAssets = await this.getAssetsByLine(jPlan.lineId);
                assetArray = jPlan.inspectionAssets || [];
                criteria = {};

                criteria._id = { $in: assetArray };

                lineAssets = void 0;

                if (!jPlan.inspectionAssets) {
                  _context6.next = 29;
                  break;
                }

                _context6.next = 26;
                return AssetsModel.find(criteria).exec();

              case 26:
                lineAssets = _context6.sent;
                _context6.next = 32;
                break;

              case 29:
                _context6.next = 31;
                return this.getOtherAssetsByLine(jPlan.lineId);

              case 31:
                lineAssets = _context6.sent;

              case 32:

                //console.log(lineAssets);
                /*
                  let lineAssets = await AssetsModel.find({ lineId: jPlan.lineId })
                    .sort({ start: "asc" })
                    .exec();*/
                copyJPlan = jPlan.id ? jPlan : (0, _extends3.default)({}, jPlan);
                //console.log(copyJPlan);

                tasks = [];

                if (!(jPlan.inspectionAssets && jPlan.inspectionAssets.length > 0)) {
                  _context6.next = 95;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context6.prev = 38;
                _iterator3 = jPlan.runRanges[Symbol.iterator]();

              case 40:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context6.next = 79;
                  break;
                }

                _run = _step3.value;
                _task = {
                  title: "",
                  desc: "Perform Inspection",
                  notes: "Default Inspection Notes",
                  units: [],
                  imgs: null,
                  taskId: (0, _UUID.guid)(),
                  startLoc: _run.start,
                  endLoc: _run.end,
                  lineCords: _run.geoJsonCord,
                  runId: _run.runId,
                  runStart: _run.mpStart,
                  runEnd: _run.mpEnd
                };

                _task.title = _run.runDescription;
                lineAssetsArrary = [].concat((0, _toConsumableArray3.default)(lineAssets));
                assetListToAdd = [];
                runStart = _run.mpStart || _run.mpStart == 0 ? parseFloat(_run.mpStart) : null;
                runEnd = _run.mpEnd || _run.mpEnd == 0 ? parseFloat(_run.mpEnd) : null;
                uom = this.getUnitOfMeasurements(lineAsset);
                _context6.next = 51;
                return this.getCoordinatesArray([["", ""], ["", ""]], _run.geoJsonCord, runStart, runEnd, lineAsset.start, uom);

              case 51:
                _coordinatesArray = _context6.sent;
                _lineAssetToPush = {
                  start: lineAsset.start,
                  end: lineAsset.end,
                  unitId: lineAsset.unitId,
                  coordinates: _coordinatesArray,
                  assetType: lineAsset.assetType,
                  id: lineAsset._id.toString(),
                  runId: _run.runId,
                  run_id: _run.id,
                  track_id: lineAsset.trackId,
                  parent_id: lineAsset.parentAsset,
                  attributes: {
                    showDirection: false
                  }
                };

                assetListToAdd.push(_lineAssetToPush);
                longestAsset = { id: "", start: "", end: "" };
                primaryTrackFound = null;
                i = 0, l = lineAssetsArrary.length;

              case 57:
                if (!(i < l)) {
                  _context6.next = 71;
                  break;
                }

                if (!(lineAssetsArrary[i].start >= runStart && lineAssetsArrary[i].end <= runEnd || lineAssetsArrary[i].start >= runStart && lineAssetsArrary[i].start <= runEnd || lineAssetsArrary[i].end >= runStart && lineAssetsArrary[i].end <= runEnd || runStart >= lineAssetsArrary[i].start && runEnd <= lineAssetsArrary[i].end)) {
                  _context6.next = 68;
                  break;
                }

                _uom = this.getUnitOfMeasurements(lineAsset);
                _context6.next = 62;
                return this.getCoordinatesArray(lineAssetsArrary[i].coordinates, _run.geoJsonCord, lineAssetsArrary[i].start, lineAssetsArrary[i].end, lineAsset.start, _uom);

              case 62:
                _coordinatesArray = _context6.sent;

                if (!primaryTrackFound) {
                  if (longestAsset.id) {
                    prevLongest = longestAsset.end - longestAsset.start;
                    nowAssetLongest = lineAssetsArrary[i].end - lineAssetsArrary[i].start;

                    nowAssetLongest > prevLongest && (longestAsset = { id: lineAssetsArrary[i].id, start: lineAssetsArrary[i].start, end: lineAssetsArrary[i].end });
                  } else {
                    lineAssetsArrary[i].start !== lineAssetsArrary[i].end && (longestAsset = { id: lineAssetsArrary[i].id, start: lineAssetsArrary[i].start, end: lineAssetsArrary[i].end });
                  }
                  lineAssetsArrary[i].attributes && lineAssetsArrary[i].attributes.primaryTrack && (primaryTrackFound = lineAssetsArrary[i].id);
                }
                toMerge = { attributes: {} };

                if (lineAssetsArrary[i].assetType == "track") {
                  toMerge.attributes.showDirection = true;
                  if (lineAssetsArrary[i].attributes && lineAssetsArrary[i].attributes.railOrientation) {
                    toMerge.attributes.railOrientation = lineAssetsArrary[i].attributes.railOrientation;
                    toMerge.attributes.railOptions = getRailOptions(lineAssetsArrary[i].attributes.railOrientation, lineAssetsArrary[i].attributes.electrified, lineAssetsArrary[i].attributes.electrifiedAssetType);
                  } else {
                    toMerge.attributes.railOptions = ["N/A", "North", "East", "South", "West"];
                  }
                } else {
                  toMerge.attributes.showDirection = false;
                }
                _lineAssetToPush = (0, _extends3.default)({
                  start: lineAssetsArrary[i].start,
                  end: lineAssetsArrary[i].end,
                  unitId: lineAssetsArrary[i].unitId,
                  coordinates: _coordinatesArray,
                  assetType: lineAssetsArrary[i].assetType,
                  id: lineAssetsArrary[i]._id.toString(),
                  runId: _run.runId,
                  run_id: _run.id,
                  track_id: lineAssetsArrary[i].trackId,
                  parent_id: lineAssetsArrary[i].parentAsset
                }, toMerge);
                assetListToAdd.push(_lineAssetToPush);

              case 68:
                i++;
                _context6.next = 57;
                break;

              case 71:
                primaryTrackAssetIndex = _lodash2.default.findIndex(assetListToAdd, { id: primaryTrackFound ? primaryTrackFound : longestAsset.id });

                if (primaryTrackAssetIndex > -1) {
                  !assetListToAdd[primaryTrackAssetIndex].attributes && (assetListToAdd[primaryTrackAssetIndex].attributes = {});
                  assetListToAdd[primaryTrackAssetIndex].attributes.primaryTrack = true;
                }
                _task.units = assetListToAdd;
                tasks.push(_task);
                copyJPlan.inspecitonRun = _run.runId;

              case 76:
                _iteratorNormalCompletion3 = true;
                _context6.next = 40;
                break;

              case 79:
                _context6.next = 85;
                break;

              case 81:
                _context6.prev = 81;
                _context6.t0 = _context6["catch"](38);
                _didIteratorError3 = true;
                _iteratorError3 = _context6.t0;

              case 85:
                _context6.prev = 85;
                _context6.prev = 86;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 88:
                _context6.prev = 88;

                if (!_didIteratorError3) {
                  _context6.next = 91;
                  break;
                }

                throw _iteratorError3;

              case 91:
                return _context6.finish(88);

              case 92:
                return _context6.finish(85);

              case 93:
                _context6.next = 223;
                break;

              case 95:
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context6.prev = 98;
                _iterator4 = jPlan.runRanges[Symbol.iterator]();

              case 100:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context6.next = 209;
                  break;
                }

                run = _step4.value;
                task = {
                  title: "",
                  desc: "Perform Inspection",
                  notes: "Default Inspection Notes",
                  units: [],
                  imgs: null,
                  taskId: (0, _UUID.guid)(),
                  startLoc: run.start,
                  endLoc: run.end,
                  lineCords: run.geoJsonCord,
                  runId: run.runId
                };
                filteredAssets = [];
                // let startComma = task.title ? "," : "";
                // task.title = task.title + startComma + run.runDescription;

                task.title = run.runDescription;
                _runStart = run.mpStart || run.mpStart == 0 ? parseFloat(run.mpStart) : null;
                _runEnd = run.mpEnd || run.mpEnd == 0 ? parseFloat(run.mpEnd) : null;
                startIndex = -1; // _.findIndex(lineAssets, { start: runStart });

                endIndex = -1; //_.findLastIndex(lineAssets, { start: runEnd });

                _i = 0;

              case 110:
                if (!(_i < lineAssets.length)) {
                  _context6.next = 117;
                  break;
                }

                if (!(lineAssets[_i].start >= _runStart)) {
                  _context6.next = 114;
                  break;
                }

                startIndex = _i;
                return _context6.abrupt("break", 117);

              case 114:
                _i++;
                _context6.next = 110;
                break;

              case 117:
                if (!(startIndex != -1)) {
                  _context6.next = 127;
                  break;
                }

                _i2 = startIndex;

              case 119:
                if (!(_i2 < lineAssets.length)) {
                  _context6.next = 126;
                  break;
                }

                if (!(lineAssets[_i2].start >= _runEnd)) {
                  _context6.next = 123;
                  break;
                }

                endIndex = _i2;
                return _context6.abrupt("break", 126);

              case 123:
                _i2++;
                _context6.next = 119;
                break;

              case 126:
                if (endIndex === -1) endIndex = lineAssets.length - 1;

              case 127:
                isOtherAssets = run && run.tracks ? run.tracks.includes("others") : null;

                if (!isOtherAssets) {
                  _context6.next = 147;
                  break;
                }

                //console.log(startIndex, endIndex);
                //push line asset also
                _uom2 = this.getUnitOfMeasurements(lineAsset);
                _context6.next = 132;
                return this.getCoordinatesArray([["", ""], ["", ""]], run.geoJsonCord, _runStart, _runEnd, lineAsset.start, _uom2);

              case 132:
                coordinatesArray = _context6.sent;
                lineAssetToPush = {
                  start: lineAsset.start,
                  end: lineAsset.end,
                  unitId: lineAsset.unitId,
                  coordinates: coordinatesArray,
                  assetType: lineAsset.assetType,
                  id: lineAsset._id.toString(),
                  runId: run.runId,
                  run_id: run.id,
                  track_id: lineAsset.trackId,
                  parent_id: lineAsset.parentAsset
                };

                filteredAssets.push(lineAssetToPush);
                //

                if (!(startIndex > -1 && endIndex > -1)) {
                  _context6.next = 147;
                  break;
                }

                _i3 = startIndex;

              case 137:
                if (!(_i3 <= endIndex)) {
                  _context6.next = 147;
                  break;
                }

                _uom3 = this.getUnitOfMeasurements(lineAssets[_i3]);
                _context6.next = 141;
                return this.getCoordinatesArray(lineAssets[_i3].coordinates, run.geoJsonCord, lineAssets[_i3].start, lineAssets[_i3].end, lineAsset.start, _uom3);

              case 141:
                _coordinatesArray2 = _context6.sent;
                assetToPush = {
                  start: lineAssets[_i3].start,
                  end: lineAssets[_i3].end,
                  unitId: lineAssets[_i3].unitId,
                  coordinates: _coordinatesArray2,
                  assetType: lineAssets[_i3].assetType,
                  id: lineAssets[_i3]._id.toString(),
                  runId: run.runId,
                  run_id: run.id,
                  track_id: lineAssets[_i3].trackId,
                  parent_id: lineAssets[_i3].parentAsset
                };

                filteredAssets.push(assetToPush);

              case 144:
                _i3++;
                _context6.next = 137;
                break;

              case 147:
                if (!(run && run.tracks)) {
                  _context6.next = 203;
                  break;
                }

                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context6.prev = 151;
                _iterator5 = run.tracks[Symbol.iterator]();

              case 153:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context6.next = 189;
                  break;
                }

                track = _step5.value;

                if (!(track != "others")) {
                  _context6.next = 186;
                  break;
                }

                _context6.next = 158;
                return this.getAssetsByLine(track);

              case 158:
                trackAssetsObj = _context6.sent;
                trackAssets = [].concat((0, _toConsumableArray3.default)(trackAssetsObj));
                _context6.next = 162;
                return AssetsModel.findOne({ _id: track });

              case 162:
                trackAsset = _context6.sent;
                _runStart2 = run.mpStart || run.mpStart == 0 ? parseFloat(run.mpStart) : null;
                _runEnd2 = run.mpEnd || run.mpEnd == 0 ? parseFloat(run.mpEnd) : null;
                //let startIndex = _.findIndex(trackAssets, { start: runStart });
                //let endIndex = _.findLastIndex(trackAssets, { start: runEnd });
                //console.log(trackAssets);
                //console.log(startIndex, endIndex);

                _uom4 = this.getUnitOfMeasurements(lineAsset);
                _context6.next = 168;
                return this.getCoordinatesArray(trackAsset.coordinates, run.geoJsonCord, trackAsset.start, trackAsset.end, lineAsset.start, _uom4);

              case 168:
                _coordinatesArray3 = _context6.sent;
                trackAssetToPush = {
                  start: trackAsset.start,
                  end: trackAsset.end,
                  unitId: trackAsset.unitId,
                  coordinates: _coordinatesArray3,
                  assetType: trackAsset.assetType,
                  id: trackAsset._id.toString(),
                  runId: run.runId,
                  run_id: run.id,
                  track_id: trackAsset._id,
                  parent_id: trackAsset.parentAsset
                };

                filteredAssets.push(trackAssetToPush);
                startIndex = 0;
                endIndex = trackAssets.length;

                _i4 = 0;

              case 174:
                if (!(_i4 < trackAssets.length)) {
                  _context6.next = 186;
                  break;
                }

                _trackAsset = trackAssets[_i4];

                if (!(_trackAsset.start >= _runStart2 && _trackAsset.end <= _runEnd2 || _trackAsset.end >= _runStart2 && _trackAsset.end <= _runEnd2 || _trackAsset.start <= _runStart2 && _trackAsset.end >= _runEnd2)) {
                  _context6.next = 183;
                  break;
                }

                _uom5 = this.getUnitOfMeasurements(lineAsset);
                _context6.next = 180;
                return this.getCoordinatesArray(trackAssets[_i4].coordinates, run.geoJsonCord, trackAssets[_i4].start, trackAssets[_i4].end, lineAsset.start, _uom5);

              case 180:
                _coordinatesArray4 = _context6.sent;
                _assetToPush = {
                  start: trackAssets[_i4].start,
                  end: trackAssets[_i4].end,
                  unitId: trackAssets[_i4].unitId,
                  coordinates: _coordinatesArray4,
                  assetType: trackAssets[_i4].assetType,
                  id: trackAssets[_i4]._id.toString(),
                  runId: run.runId,
                  run_id: run.id,
                  track_id: trackAssets[_i4].trackId,
                  parent_id: trackAssets[_i4].parentAsset
                };

                filteredAssets.push(_assetToPush);

              case 183:
                _i4++;
                _context6.next = 174;
                break;

              case 186:
                _iteratorNormalCompletion5 = true;
                _context6.next = 153;
                break;

              case 189:
                _context6.next = 195;
                break;

              case 191:
                _context6.prev = 191;
                _context6.t1 = _context6["catch"](151);
                _didIteratorError5 = true;
                _iteratorError5 = _context6.t1;

              case 195:
                _context6.prev = 195;
                _context6.prev = 196;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 198:
                _context6.prev = 198;

                if (!_didIteratorError5) {
                  _context6.next = 201;
                  break;
                }

                throw _iteratorError5;

              case 201:
                return _context6.finish(198);

              case 202:
                return _context6.finish(195);

              case 203:
                //console.log(filteredAssets);
                task.units = filteredAssets;
                tasks.push(task);
                copyJPlan.inspecitonRun = run.runId;

              case 206:
                _iteratorNormalCompletion4 = true;
                _context6.next = 100;
                break;

              case 209:
                _context6.next = 215;
                break;

              case 211:
                _context6.prev = 211;
                _context6.t2 = _context6["catch"](98);
                _didIteratorError4 = true;
                _iteratorError4 = _context6.t2;

              case 215:
                _context6.prev = 215;
                _context6.prev = 216;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 218:
                _context6.prev = 218;

                if (!_didIteratorError4) {
                  _context6.next = 221;
                  break;
                }

                throw _iteratorError4;

              case 221:
                return _context6.finish(218);

              case 222:
                return _context6.finish(215);

              case 223:

                copyJPlan.tasks = tasks;

                // apply plannable location asset's timezone to the startDate to make it 00:00 AM of local time to that particular location
                if (lineAsset && lineAsset.attributes && lineAsset.attributes.timezone) {
                  timezone = lineAsset.attributes.timezone;
                  // console.log('applying timezone', timezone,' to inspection plan', copyJPlan.title, 'current startDate:', copyJPlan.startDate);

                  if (_momentTimezone2.default.tz.zone(timezone)) {
                    // verify if the timezone id is valid, todo: validate copyJPlan.startDate too.
                    dayBasedLocalDate = _momentTimezone2.default.tz(new Date(copyJPlan.startDate).toISOString().slice(0, 10), timezone).toDate();

                    copyJPlan.startDate = dayBasedLocalDate;
                    // console.log('new time:', copyJPlan.startDate);
                  } else {
                    console.log("could not found timezone id", timezone);
                  }
                } else {
                  // todo: log warning here
                  console.log("wPlanTemplate.service.createWorkplanTemplate: Warning: Time zone information not available for", lineAsset.unitId, " using UTC for", copyJPlan.title);
                }

                if (!copyJPlan.nextInspectionDate || copyJPlan.nextInspectionDate < copyJPlan.startDate) {
                  copyJPlan.nextInspectionDate = copyJPlan.startDate;
                }

                newWorkPlan = copyJPlan.id ? copyJPlan : new wPlanTemplate(copyJPlan);
                _context6.next = 229;
                return newWorkPlan.save();

              case 229:
                savedWorkPlan = _context6.sent;


                resultObj = { value: savedWorkPlan, status: 200 };
                // let startArray = [];
                // for (let asset of filteredAssets) {
                //   startArray.push(asset.start);
                // }
                // console.log(startArray);
                //} catch (error) {
                //  resultObj = { errorVal: error, status: 500 };
                //}
                return _context6.abrupt("return", resultObj);

              case 232:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[38, 81, 85, 93], [86,, 88, 92], [98, 211, 215, 223], [151, 191, 195, 203], [196,, 198, 202], [216,, 218, 222]]);
      }));

      function createWorkplanTemplate(_x14) {
        return _ref6.apply(this, arguments);
      }

      return createWorkplanTemplate;
    }()
  }, {
    key: "filterHeavyComps",
    value: function filterHeavyComps(templates) {
      if (templates && templates.length) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = templates[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var template = _step6.value;

            if (template.tasks && template.tasks.length) {
              var _iteratorNormalCompletion7 = true;
              var _didIteratorError7 = false;
              var _iteratorError7 = undefined;

              try {
                for (var _iterator7 = template.tasks[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                  var task = _step7.value;

                  if (task.lineCords) delete task.lineCords; // remove lineCords as they can be heavy and cause problem in transfer from frontend to backend later
                }
              } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                  }
                } finally {
                  if (_didIteratorError7) {
                    throw _iteratorError7;
                  }
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }
      return templates;
    }
  }, {
    key: "getWorkplanTemplates",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(user) {
        var resultObj, wPlanTemplate, logger, criteria, assetService, assetIds, ids, templates, execValue, _templates, _execValue, _templates2, _execValue2;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                resultObj = {};
                wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
                logger = ServiceLocator.resolve("logger");
                criteria = { isRemoved: !true };
                assetService = ServiceLocator.resolve("AssetsService");
                _context7.next = 7;
                return assetService.getFilteredAssetsIds(user, { plannable: true }, true);

              case 7:
                assetIds = _context7.sent;


                if (assetIds && assetIds.assetIds && assetIds.assetIds.length > 0) {
                  ids = assetIds.assetIds;


                  criteria.lineId = { $in: ids };
                }

                //let permCheckUtil = ServiceLocator.resolve("permissionChecker");
                //   if (permCheckUtil(user.userGroup.permissions, "WORKPLAN" , "self_workplans_templates")) {

                if (!(user.group_id == "supervisor")) {
                  _context7.next = 27;
                  break;
                }

                _context7.prev = 10;
                templates = wPlanTemplate.find(criteria).sort({ sort_id: "desc", nextInspectionDate: "asc" });
                _context7.next = 14;
                return templates.exec();

              case 14:
                execValue = _context7.sent;

                execValue = this.filterHeavyComps(execValue);

                resultObj = { value: execValue, status: 200 };
                _context7.next = 24;
                break;

              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7["catch"](10);

                console.log(_context7.t0);
                logger.error("getWorkplanTemplates: supervisor: find user error:" + _context7.t0);
                resultObj = { errorVal: _context7.t0, status: 500 };

              case 24:
                return _context7.abrupt("return", resultObj);

              case 27:
                if (!(user.subdivision == "" || user.subdivision == "All" || user.isAdmin)) {
                  _context7.next = 44;
                  break;
                }

                _context7.prev = 28;
                _templates = wPlanTemplate.find(criteria).sort({ sort_id: "desc", nextInspectionDate: "asc", "user.email": "desc" });
                _context7.next = 32;
                return _templates.exec();

              case 32:
                _execValue = _context7.sent;


                _execValue = this.filterHeavyComps(_execValue);

                resultObj = { value: _execValue, status: 200 };
                _context7.next = 41;
                break;

              case 37:
                _context7.prev = 37;
                _context7.t1 = _context7["catch"](28);

                resultObj = { errorVal: _context7.t1, status: 500 };
                logger.error("getWorkplanTemplates: all subdivision or admin: find user error:" + _context7.t1);

              case 41:
                return _context7.abrupt("return", resultObj);

              case 44:
                _context7.prev = 44;
                _templates2 = wPlanTemplate.find({ subdivision: user.subdivision, isRemoved: !true }).sort({ sort_id: "desc", nextInspectionDate: "asc", "user.email": "desc" });
                _context7.next = 48;
                return _templates2.exec();

              case 48:
                _execValue2 = _context7.sent;


                _execValue2 = this.filterHeavyComps(_execValue2);

                resultObj = { value: _execValue2, status: 200 };
                _context7.next = 57;
                break;

              case 53:
                _context7.prev = 53;
                _context7.t2 = _context7["catch"](44);

                resultObj = { errorVal: _context7.t2, status: 500 };
                logger.error("getWorkplanTemplates: otherusers: find user error:" + _context7.t2);

              case 57:
                return _context7.abrupt("return", resultObj);

              case 58:
                return _context7.abrupt("return", resultObj);

              case 59:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[10, 19], [28, 37], [44, 53]]);
      }));

      function getWorkplanTemplates(_x15) {
        return _ref7.apply(this, arguments);
      }

      return getWorkplanTemplates;
    }()
  }, {
    key: "getWptIdsForRange",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(rangeId) {
        var ids, wPlanTemplateModel, rangeWPlans;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                ids = [];
                _context8.prev = 1;
                wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                _context8.next = 5;
                return wPlanTemplateModel.aggregate([{ $unwind: "$runRanges" }, { $match: { "runRanges.id": rangeId } }, { $project: { _id: true } }]);

              case 5:
                rangeWPlans = _context8.sent;
                //{'isRemoved': false}
                ids = rangeWPlans.map(function (v) {
                  return v._id.toString();
                });
                _context8.next = 12;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](1);

                console.log("wPlanTemplate.service.getWptIdsForRange.catch: ", _context8.t0.toString());

              case 12:
                return _context8.abrupt("return", ids);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 9]]);
      }));

      function getWptIdsForRange(_x16) {
        return _ref8.apply(this, arguments);
      }

      return getWptIdsForRange;
    }()
  }, {
    key: "updateWorkplanTemplatesForRunRange",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(updatedRange) {
        var wPlanTemplateModel, ids, wpts, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, wpt, index, r, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, task, unitsArray, unitsToPush, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, u, unit;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                // Find workplantemplates that used the range
                // Iterate tasks, if !task.type || task.type !== 'special' reprocess the task.units to have assets in the  WPT.runRanges(after replacing new range)
                //

                _context9.prev = 1;
                _context9.next = 4;
                return this.getWptIdsForRange(updatedRange.id);

              case 4:
                ids = _context9.sent;
                _context9.next = 7;
                return wPlanTemplateModel.find({ _id: { $in: ids } });

              case 7:
                wpts = _context9.sent;

                //console.log('wpts:', wpts);

                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                _context9.prev = 11;
                _iterator8 = wpts[Symbol.iterator]();

              case 13:
                if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                  _context9.next = 73;
                  break;
                }

                wpt = _step8.value;
                index = -1;
                r = wpt.runRanges.find(function (v, i) {
                  index = i;
                  return v.id === updatedRange.id;
                });
                //console.log('old range:', {r});

                wpt.runRanges[index] = updatedRange;
                wpt.markModified("runRanges");

                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                _context9.prev = 22;
                _iterator9 = wpt.tasks[Symbol.iterator]();

              case 24:
                if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                  _context9.next = 56;
                  break;
                }

                task = _step9.value;

                if (!(!task.type || task.type !== "special")) {
                  _context9.next = 53;
                  break;
                }

                _context9.next = 29;
                return this.getRangesAssets(wpt.runRanges, "track1,track2", "Switch,Crossing");

              case 29:
                unitsArray = _context9.sent;
                // trackUnitIds, assetTypes); // get all assets for now, pass this info through wpt
                unitsToPush = [];
                _iteratorNormalCompletion10 = true;
                _didIteratorError10 = false;
                _iteratorError10 = undefined;
                _context9.prev = 34;

                for (_iterator10 = unitsArray[Symbol.iterator](); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                  u = _step10.value;
                  unit = {
                    start: u.start,
                    end: u.end,
                    unitId: u.unitId,
                    coordinates: u.coordinates,
                    assetType: u.assetType,
                    id: u._id.toString(),
                    runId: u.runId,
                    run_id: u.run_id,
                    track_id: u.trackId,
                    parent_id: u.parentAsset
                  };

                  unitsToPush.push(unit);
                }
                _context9.next = 42;
                break;

              case 38:
                _context9.prev = 38;
                _context9.t0 = _context9["catch"](34);
                _didIteratorError10 = true;
                _iteratorError10 = _context9.t0;

              case 42:
                _context9.prev = 42;
                _context9.prev = 43;

                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                  _iterator10.return();
                }

              case 45:
                _context9.prev = 45;

                if (!_didIteratorError10) {
                  _context9.next = 48;
                  break;
                }

                throw _iteratorError10;

              case 48:
                return _context9.finish(45);

              case 49:
                return _context9.finish(42);

              case 50:
                task.units = unitsToPush;

                //console.log('new units:', task.units);
                wpt.markModified("tasks");
                wpt.save();

              case 53:
                _iteratorNormalCompletion9 = true;
                _context9.next = 24;
                break;

              case 56:
                _context9.next = 62;
                break;

              case 58:
                _context9.prev = 58;
                _context9.t1 = _context9["catch"](22);
                _didIteratorError9 = true;
                _iteratorError9 = _context9.t1;

              case 62:
                _context9.prev = 62;
                _context9.prev = 63;

                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                  _iterator9.return();
                }

              case 65:
                _context9.prev = 65;

                if (!_didIteratorError9) {
                  _context9.next = 68;
                  break;
                }

                throw _iteratorError9;

              case 68:
                return _context9.finish(65);

              case 69:
                return _context9.finish(62);

              case 70:
                _iteratorNormalCompletion8 = true;
                _context9.next = 13;
                break;

              case 73:
                _context9.next = 79;
                break;

              case 75:
                _context9.prev = 75;
                _context9.t2 = _context9["catch"](11);
                _didIteratorError8 = true;
                _iteratorError8 = _context9.t2;

              case 79:
                _context9.prev = 79;
                _context9.prev = 80;

                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }

              case 82:
                _context9.prev = 82;

                if (!_didIteratorError8) {
                  _context9.next = 85;
                  break;
                }

                throw _iteratorError8;

              case 85:
                return _context9.finish(82);

              case 86:
                return _context9.finish(79);

              case 87:
                _context9.next = 92;
                break;

              case 89:
                _context9.prev = 89;
                _context9.t3 = _context9["catch"](1);

                console.log("wPlanTemplate.service.updateWorkplanTemplatesForRunRange.catch:", _context9.t3.toString());

              case 92:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[1, 89], [11, 75, 79, 87], [22, 58, 62, 70], [34, 38, 42, 50], [43,, 45, 49], [63,, 65, 69], [80,, 82, 86]]);
      }));

      function updateWorkplanTemplatesForRunRange(_x17) {
        return _ref9.apply(this, arguments);
      }

      return updateWorkplanTemplatesForRunRange;
    }()
  }, {
    key: "getRangesAssets",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(ranges, tracknames, assetTypes) {
        var assetService, assetModel, ids, orArray, rCondition, arr, ats, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, range, criteria, res;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                assetService = ServiceLocator.resolve("AssetsService");
                assetModel = ServiceLocator.resolve("AssetsModel");
                ids = [];
                orArray = [], rCondition = [];

                if (!(tracknames && tracknames.length > 0)) {
                  _context10.next = 9;
                  break;
                }

                arr = tracknames.split(",");
                _context10.next = 8;
                return assetService.getAssetIdsForUnitIds(arr);

              case 8:
                ids = _context10.sent;

              case 9:

                if (ids.length > 0) {
                  orArray.push({ _id: { $in: ids } }); // track themselves
                  orArray.push({ trackId: { $in: ids } }); // track childern
                }

                if (assetTypes) {
                  if (assetTypes.includes("Other Assets")) {
                    // all inspectable assets other than track
                    orArray.push({ assetType: { $ne: "track" } });
                  } // otherwise its an array of assettypes to get
                  else {
                      ats = assetTypes.split(",");

                      orArray.push({ assetType: { $in: ats } });
                    }
                }

                _iteratorNormalCompletion11 = true;
                _didIteratorError11 = false;
                _iteratorError11 = undefined;
                _context10.prev = 14;
                for (_iterator11 = ranges[Symbol.iterator](); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                  range = _step11.value;

                  rCondition.push({ $and: [{ start: { $gte: range.mpStart } }, { start: { $lte: range.mpEnd } }, { lineId: range.lineId }] });
                }

                _context10.next = 22;
                break;

              case 18:
                _context10.prev = 18;
                _context10.t0 = _context10["catch"](14);
                _didIteratorError11 = true;
                _iteratorError11 = _context10.t0;

              case 22:
                _context10.prev = 22;
                _context10.prev = 23;

                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                  _iterator11.return();
                }

              case 25:
                _context10.prev = 25;

                if (!_didIteratorError11) {
                  _context10.next = 28;
                  break;
                }

                throw _iteratorError11;

              case 28:
                return _context10.finish(25);

              case 29:
                return _context10.finish(22);

              case 30:
                criteria = { $and: [{ $or: orArray }, { isRemoved: false }].concat(rCondition) }; // combine all criterion
                //console.log('criteria:', JSON.stringify(criteria));

                _context10.next = 33;
                return assetModel.find(criteria);

              case 33:
                res = _context10.sent;
                return _context10.abrupt("return", res);

              case 35:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[14, 18, 22, 30], [23,, 25, 29]]);
      }));

      function getRangesAssets(_x18, _x19, _x20) {
        return _ref10.apply(this, arguments);
      }

      return getRangesAssets;
    }()
  }, {
    key: "sortTemplates",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(user, body) {
        var resultObj, objKeys, wPlanTemplate, logger, plan, templates, execValue;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                resultObj = {};
                objKeys = Object.keys(body);
                wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
                logger = ServiceLocator.resolve("logger");
                _context11.t0 = _regenerator2.default.keys(body);

              case 5:
                if ((_context11.t1 = _context11.t0()).done) {
                  _context11.next = 22;
                  break;
                }

                plan = _context11.t1.value;
                _context11.prev = 7;

                if (!plan.nextInspectionDate || plan.nextInspectionDate < plan.startDate) {
                  plan.nextInspectionDate = plan.startDate;
                }

                templates = wPlanTemplate.findByIdAndUpdate(body[plan]._id, body[plan]);
                _context11.next = 12;
                return templates.exec();

              case 12:
                execValue = _context11.sent;

                resultObj = { value: execValue, status: 200 };
                _context11.next = 20;
                break;

              case 16:
                _context11.prev = 16;
                _context11.t2 = _context11["catch"](7);

                resultObj = { errorVal: _context11.t2, status: 500 };
                logger.error("sortTemplates: error:" + _context11.t2);

              case 20:
                _context11.next = 5;
                break;

              case 22:
                return _context11.abrupt("return", resultObj);

              case 23:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[7, 16]]);
      }));

      function sortTemplates(_x21, _x22) {
        return _ref11.apply(this, arguments);
      }

      return sortTemplates;
    }()
  }, {
    key: "updateTemplateOnAssetGroupUpdate",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(assetGroup) {
        var resultObj, wPlanTemplate, logger, templateQuery, template, unitsNew, updatedtemplatetemplate;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                resultObj = {};
                wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
                logger = ServiceLocator.resolve("logger");
                _context12.prev = 3;
                templateQuery = wPlanTemplate.findOne({ assetGroupId: assetGroup._id });
                _context12.next = 7;
                return templateQuery.exec();

              case 7:
                template = _context12.sent;

                if (!template) {
                  _context12.next = 25;
                  break;
                }

                unitsNew = [];

                assetGroup.units.forEach(function (element) {
                  var unitSingle = {
                    id: element.id,
                    unitId: element.unitId,
                    track_id: assetGroup._id,
                    assetType: element.assetType,
                    coordinates: element.coordinates
                  };
                  unitsNew.push(unitSingle);
                });
                template.tasks[0].units = unitsNew;
                template.markModified("tasks");
                _context12.prev = 13;
                _context12.next = 16;
                return template.save();

              case 16:
                updatedtemplatetemplate = _context12.sent;

                resultObj = { value: updatedtemplatetemplate, status: 200 };
                _context12.next = 25;
                break;

              case 20:
                _context12.prev = 20;
                _context12.t0 = _context12["catch"](13);

                console.log(_context12.t0);
                logger.error("updateTemplateOnAssetGroupUpdate: saving template error:" + _context12.t0);
                resultObj = { errorVal: _context12.t0, status: 500 };

              case 25:
                _context12.next = 31;
                break;

              case 27:
                _context12.prev = 27;
                _context12.t1 = _context12["catch"](3);

                resultObj = { errorVal: _context12.t1, status: 500 };
                logger.error("updateTemplateOnAssetGroupUpdate: error:" + _context12.t1);

              case 31:
                return _context12.abrupt("return", resultObj);

              case 32:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[3, 27], [13, 20]]);
      }));

      function updateTemplateOnAssetGroupUpdate(_x23) {
        return _ref12.apply(this, arguments);
      }

      return updateTemplateOnAssetGroupUpdate;
    }()
  }, {
    key: "deleteWorkPlanTemplate",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(templateId) {
        var resultObj, wPlanTemplate, logger, TrackModel, foundTemplate, assetGroup, saved, savedTemplate;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                resultObj = {};
                // find the template of given id

                wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
                logger = ServiceLocator.resolve("logger");
                TrackModel = ServiceLocator.resolve("TrackModel");
                _context13.prev = 4;
                _context13.next = 7;
                return wPlanTemplate.findOne({ _id: templateId, isRemoved: !true }).exec();

              case 7:
                foundTemplate = _context13.sent;

                if (!foundTemplate) {
                  _context13.next = 24;
                  break;
                }

                _context13.next = 11;
                return TrackModel.findById(foundTemplate.assetGroupId).exec();

              case 11:
                assetGroup = _context13.sent;

                if (!assetGroup) {
                  _context13.next = 17;
                  break;
                }

                assetGroup.templateCreated = undefined;
                _context13.next = 16;
                return assetGroup.save();

              case 16:
                saved = _context13.sent;

              case 17:
                foundTemplate.isRemoved = true;
                _context13.next = 20;
                return foundTemplate.save();

              case 20:
                savedTemplate = _context13.sent;

                resultObj = { value: savedTemplate, status: 200 };
                _context13.next = 25;
                break;

              case 24:
                resultObj = { errorVal: "Not Found", status: 404 };

              case 25:
                _context13.next = 31;
                break;

              case 27:
                _context13.prev = 27;
                _context13.t0 = _context13["catch"](4);

                resultObj = { errorVal: _context13.t0, status: 500 };
                logger.error("deleteWorkPlanTempalte : " + _context13.t0);

              case 31:
                return _context13.abrupt("return", resultObj);

              case 32:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[4, 27]]);
      }));

      function deleteWorkPlanTemplate(_x24) {
        return _ref13.apply(this, arguments);
      }

      return deleteWorkPlanTemplate;
    }()
  }, {
    key: "getUsersTemplates",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(users) {
        var logger, wPlanTemplate, resultObj, parsedUsers, allTemplates, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, user, templates;

        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                logger = ServiceLocator.resolve("logger");
                wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
                resultObj = {};
                _context14.prev = 3;
                parsedUsers = JSON.parse(users);
                allTemplates = [];
                _iteratorNormalCompletion12 = true;
                _didIteratorError12 = false;
                _iteratorError12 = undefined;
                _context14.prev = 9;
                _iterator12 = parsedUsers[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                  _context14.next = 20;
                  break;
                }

                user = _step12.value;
                _context14.next = 15;
                return wPlanTemplate.find({ "user._id": user }).exec();

              case 15:
                templates = _context14.sent;

                allTemplates = [].concat((0, _toConsumableArray3.default)(allTemplates), (0, _toConsumableArray3.default)(templates));

              case 17:
                _iteratorNormalCompletion12 = true;
                _context14.next = 11;
                break;

              case 20:
                _context14.next = 26;
                break;

              case 22:
                _context14.prev = 22;
                _context14.t0 = _context14["catch"](9);
                _didIteratorError12 = true;
                _iteratorError12 = _context14.t0;

              case 26:
                _context14.prev = 26;
                _context14.prev = 27;

                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                  _iterator12.return();
                }

              case 29:
                _context14.prev = 29;

                if (!_didIteratorError12) {
                  _context14.next = 32;
                  break;
                }

                throw _iteratorError12;

              case 32:
                return _context14.finish(29);

              case 33:
                return _context14.finish(26);

              case 34:
                resultObj = { value: allTemplates, status: 200 };
                _context14.next = 41;
                break;

              case 37:
                _context14.prev = 37;
                _context14.t1 = _context14["catch"](3);

                resultObj = { errorVal: _context14.t1, status: 500 };
                logger.error("getUsersTemplates : " + _context14.t1);

              case 41:
                return _context14.abrupt("return", resultObj);

              case 42:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[3, 37], [9, 22, 26, 34], [27,, 29, 33]]);
      }));

      function getUsersTemplates(_x25) {
        return _ref14.apply(this, arguments);
      }

      return getUsersTemplates;
    }()
  }, {
    key: "updateUsersTemplates",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(workplanTemplates, user) {
        var logger, wPlanTemplate, resultObj, templates;
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                logger = ServiceLocator.resolve("logger");
                wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
                resultObj = {}, templates = void 0;
                _context15.prev = 3;

                if (!workplanTemplates[0]) {
                  _context15.next = 8;
                  break;
                }

                _context15.next = 7;
                return wPlanTemplate.updateMany({ _id: workplanTemplates[0] }, { $set: { user: user } });

              case 7:
                templates = _context15.sent;

              case 8:

                resultObj = { value: templates, status: 200 };
                _context15.next = 15;
                break;

              case 11:
                _context15.prev = 11;
                _context15.t0 = _context15["catch"](3);

                resultObj = { errorVal: _context15.t0, status: 500 };
                logger.error("updateUsersTemplates:" + _context15.t0);

              case 15:
                return _context15.abrupt("return", resultObj);

              case 16:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[3, 11]]);
      }));

      function updateUsersTemplates(_x26, _x27) {
        return _ref15.apply(this, arguments);
      }

      return updateUsersTemplates;
    }()
  }, {
    key: "updateTemplatesTempChanges",
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(plantoChange) {
        var logger, wPlanTemplateModel, taskService, resultObj, AssetsModel, template, locationUnit, newTaskToAdd, len, t, savedTemplate, savedUpdatedTemplateUser, wPlanTemplateScheduleModel, wPlanTemplateSchedule, saveResult;
        return _regenerator2.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                logger = ServiceLocator.resolve("logger");
                wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                taskService = ServiceLocator.resolve("TaskService");
                resultObj = {};
                AssetsModel = ServiceLocator.resolve("AssetsModel");
                _context16.prev = 5;
                _context16.next = 8;
                return wPlanTemplateModel.findOne({ _id: plantoChange.workplanTemplateId });

              case 8:
                template = _context16.sent;

                !template.modifications && (template.modifications = {});

                if (!(template && plantoChange.taskToUpdate)) {
                  _context16.next = 34;
                  break;
                }

                _context16.next = 13;
                return AssetsModel.findById(template.lineId);

              case 13:
                locationUnit = _context16.sent;

                if (!locationUnit) {
                  _context16.next = 30;
                  break;
                }

                _context16.next = 17;
                return taskService.calculateTaskData(plantoChange.taskToUpdate, locationUnit);

              case 17:
                plantoChange.taskWithData = _context16.sent;
                newTaskToAdd = true;

                if (plantoChange.taskToUpdate.taskId && template.modifications[plantoChange.date] && template.modifications[plantoChange.date].tasks) {
                  len = template.modifications[plantoChange.date].tasks.length;

                  for (t = 0; t > len; t++) {
                    if (template.modifications[plantoChange.date].tasks[t].taskId == plantoChange.task.taskId) {
                      template.modifications[plantoChange.date].tasks[t] = plantoChange.taskWithData;
                      newTaskToAdd = false;
                    }
                  }
                }
                newTaskToAdd && template.modifications[plantoChange.date] && template.modifications[plantoChange.date].tasks && template.modifications[plantoChange.date].tasks.push(plantoChange.taskWithData);
                newTaskToAdd && !template.modifications[plantoChange.date] && (template.modifications[plantoChange.date] = {});
                newTaskToAdd && !template.modifications[plantoChange.date].tasks && (template.modifications[plantoChange.date].tasks = [plantoChange.taskWithData]);
                template.markModified("modifications");
                _context16.next = 26;
                return template.save();

              case 26:
                savedTemplate = _context16.sent;

                resultObj = { value: savedTemplate, status: 200 };
                _context16.next = 32;
                break;

              case 30:
                console.log();
                logger.error("updateTemplatesTempChanges , location asset of Plan not Found : ");

              case 32:
                _context16.next = 56;
                break;

              case 34:
                if (!template) {
                  _context16.next = 55;
                  break;
                }

                // update the existing modification with new ones
                template.modifications = template.modifications ? template.modifications : {};
                template.modifications[plantoChange.date] && (template.modifications[plantoChange.date] = (0, _extends3.default)({}, template.modifications[plantoChange.date], plantoChange.tempChanges));
                !template.modifications[plantoChange.date] && (template.modifications[plantoChange.date] = plantoChange.tempChanges);
                // to remove temp user change so it is on the assigned user again.
                if (plantoChange.tempChanges.user && plantoChange.tempChanges.user.id === template.user._id) {
                  delete template.modifications[plantoChange.date].user;
                }
                template.markModified("modifications");
                _context16.next = 42;
                return template.save();

              case 42:
                savedUpdatedTemplateUser = _context16.sent;


                // recalculate wPlanTemplteSchedule
                wPlanTemplateScheduleModel = ServiceLocator.resolve("WPlanSchedulesModel");
                _context16.next = 46;
                return wPlanTemplateScheduleModel.findOne({ templateId: savedUpdatedTemplateUser._id }).exec();

              case 46:
                wPlanTemplateSchedule = _context16.sent;

                if (!wPlanTemplateSchedule) {
                  _context16.next = 52;
                  break;
                }

                wPlanTemplateSchedule.toRecalculate = true;
                _context16.next = 51;
                return wPlanTemplateSchedule.save();

              case 51:
                saveResult = _context16.sent;

              case 52:

                resultObj = { value: savedUpdatedTemplateUser, status: 200 };
                _context16.next = 56;
                break;

              case 55:
                resultObj = { errorVal: "Inspection Run Not Found", status: 404 };

              case 56:
                _context16.next = 63;
                break;

              case 58:
                _context16.prev = 58;
                _context16.t0 = _context16["catch"](5);

                resultObj = { errorVal: _context16.t0, status: 500 };
                console.log(_context16.t0);
                logger.error("updateTemplatesTempChanges : " + _context16.t0);

              case 63:
                return _context16.abrupt("return", resultObj);

              case 64:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[5, 58]]);
      }));

      function updateTemplatesTempChanges(_x28) {
        return _ref16.apply(this, arguments);
      }

      return updateTemplatesTempChanges;
    }()
  }, {
    key: "getAllPlansInRange",
    value: function () {
      var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(dateRange, user, lineId) {
        var _this = this;

        var sortCriteria = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { sortBy: { date: "asc" } };
        var beefOut = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        var wPlanTemplateModel, allTemplates, allInspections, adminCheck, subdivisionUser, checkSubdiv, JourneyPlanModel, ApplicationLookupsModel, utils, scheduleService, criteria, inspectionCriteria, _workingDays, workingOffDays, workPlanQuerry, wPlanSchedulesModel, allTemplatesIds, wPlanSchedules, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, template, wpScheduleObj, executedInspections, checkRangeAvailable, rangeToCal, inspections, dirtyCheck, calculatedSchedules, alertService, dateRangeToSave, newWpSchedule, updatedInspections;

        return _regenerator2.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                wPlanTemplateModel = void 0, allTemplates = void 0, allInspections = void 0, adminCheck = void 0, subdivisionUser = void 0, checkSubdiv = void 0, JourneyPlanModel = void 0, ApplicationLookupsModel = void 0, utils = void 0;

                allInspections = [];
                adminCheck = user.isAdmin;
                subdivisionUser = user.subdivision;
                wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                _context18.next = 9;
                return (0, _subdivisionCheck.subdivisionChecker)(user);

              case 9:
                checkSubdiv = _context18.sent;

                utils = ServiceLocator.resolve("utils");
                _context18.prev = 11;
                scheduleService = ServiceLocator.resolve("scheduleService");
                //let criteria = { isRemoved: !true };

                criteria = { isRemoved: !true };
                // let inspectionCriteria = { date: { $gte: new Date(dateRange.from), $lte: new Date(dateRange.to) } };

                inspectionCriteria = {};
                _workingDays = { holidays: [], weekOffDays: [] };
                _context18.next = 18;
                return ApplicationLookupsModel.findOne({ code: "weekdays" }).exec();

              case 18:
                workingOffDays = _context18.sent;

                _workingDays.weekOffDays = workingOffDays.opt2;
                workPlanQuerry = wPlanTemplateModel.find(criteria);

                if (sortCriteria && sortCriteria.sortBy) {
                  workPlanQuerry = workPlanQuerry.sort(sortCriteria.sortBy);
                }
                if (checkSubdiv) {
                  criteria.subdivision = subdivisionUser;
                  inspectionCriteria.subdivision = subdivisionUser;
                }
                if (lineId) {
                  criteria.lineId = lineId;
                }
                if (beefOut) {
                  // eliminate heavy fields
                  workPlanQuerry.select("_id user active isRemoved title foulTime workZone watchmen date subdivision lineId lineName nextInspectionDate startDate inspectionFrequency inspectionType lastInspection");
                }
                _context18.next = 27;
                return workPlanQuerry.exec();

              case 27:
                allTemplates = _context18.sent;

                if (!(allTemplates && allTemplates.length > 0)) {
                  _context18.next = 111;
                  break;
                }

                wPlanSchedulesModel = ServiceLocator.resolve("WPlanSchedulesModel");
                allTemplatesIds = allTemplates.map(function (t) {
                  return t.id;
                });
                _context18.next = 33;
                return wPlanSchedulesModel.find({ templateId: { $in: allTemplatesIds } }).exec();

              case 33:
                wPlanSchedules = _context18.sent;
                _iteratorNormalCompletion13 = true;
                _didIteratorError13 = false;
                _iteratorError13 = undefined;
                _context18.prev = 37;
                _iterator13 = allTemplates[Symbol.iterator]();

              case 39:
                if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
                  _context18.next = 97;
                  break;
                }

                template = _step13.value;
                wpScheduleObj = _lodash2.default.find(wPlanSchedules, { templateId: template.id });


                inspectionCriteria.workplanTemplateId = template._id;
                executedInspections = void 0;

                if (!beefOut) {
                  _context18.next = 50;
                  break;
                }

                _context18.next = 47;
                return JourneyPlanModel.find(inspectionCriteria).select("_id user date title workplanTemplateId lineId lineName startDateTime endDateTime status subdivision").sort(sortCriteria.sortBy).exec();

              case 47:
                executedInspections = _context18.sent;
                _context18.next = 53;
                break;

              case 50:
                _context18.next = 52;
                return JourneyPlanModel.find(inspectionCriteria).sort(sortCriteria.sortBy).exec();

              case 52:
                executedInspections = _context18.sent;

              case 53:
                _context18.next = 55;
                return checkAvailableDateRange(wpScheduleObj, dateRange, utils);

              case 55:
                checkRangeAvailable = _context18.sent;
                rangeToCal = void 0;

                if (checkRangeAvailable.reCal) {
                  rangeToCal = checkRangeAvailable.updatedDateRange;
                }
                inspections = [];
                dirtyCheck = wpScheduleObj ? wpScheduleObj.toRecalculate : true;

                dirtyCheck = dirtyCheck || checkRangeAvailable.reCal;

                if (!dirtyCheck) {
                  _context18.next = 89;
                  break;
                }

                calculatedSchedules = scheduleService.getSchedules(template, template.startDate, executedInspections, rangeToCal ? rangeToCal : dateRange, _workingDays, this.ignoreInspectionsFromSchedulingCase);
                // # check if to update workplan template next expiry and due date.

                this.checkWorkPlanNextDueExpiryDate(template, utils);
                this.checkCurrentTimePeriodUpdate(template, utils);
                alertService = ServiceLocator.resolve("AlertService");

                alertService.recalculateAlertMonitoringByModelId(template.id);
                _context18.next = 69;
                return template.save();

              case 69:
                inspections = calculatedSchedules;

                dateRangeToSave = dateRange;

                checkRangeAvailable.fromUpdated && (dateRangeToSave.from = checkRangeAvailable.updatedDateRange.from);
                checkRangeAvailable.toUpdated && (dateRangeToSave.to = checkRangeAvailable.updatedDateRange.to);
                checkRangeAvailable.todayUpdated && (dateRangeToSave.today = checkRangeAvailable.updatedDateRange.today);

                if (!wpScheduleObj) {
                  _context18.next = 85;
                  break;
                }

                wpScheduleObj.inspectionSchedules = trimRealInspectionDataToID(calculatedSchedules);
                wpScheduleObj.dateRange = dateRangeToSave;
                wpScheduleObj.startDate = template.startDate;
                wpScheduleObj.toRecalculate = false;
                wpScheduleObj.markModified("inspectionSchedules");
                wpScheduleObj.markModified("dateRange");
                _context18.next = 83;
                return wpScheduleObj.save();

              case 83:
                _context18.next = 89;
                break;

              case 85:
                newWpSchedule = new wPlanSchedulesModel({
                  user: template.user,
                  dateRange: dateRangeToSave,
                  startDate: template.startDate,
                  inspectionSchedules: trimRealInspectionDataToID(calculatedSchedules),
                  templateId: template._id,
                  title: template.title,
                  lineId: template.lineId
                });
                _context18.next = 88;
                return newWpSchedule.save();

              case 88:

                wpScheduleObj = newWpSchedule;

              case 89:
                _context18.next = 91;
                return populateInspectionDataToID(wpScheduleObj.inspectionSchedules, JourneyPlanModel);

              case 91:
                updatedInspections = _context18.sent;

                inspections = _lodash2.default.filter(updatedInspections, function () {
                  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(inspec) {
                    return _regenerator2.default.wrap(function _callee17$(_context17) {
                      while (1) {
                        switch (_context17.prev = _context17.next) {
                          case 0:
                            if (inspec.date) {
                              _context17.next = 5;
                              break;
                            }

                            console.log("No Date for this inspection:", inspec);
                            return _context17.abrupt("return", false);

                          case 5:
                            return _context17.abrupt("return", utils.compareTwoDates(dateRange.from, inspec.date, "ISOB") && utils.compareTwoDates(dateRange.to, inspec.date, "ISOA"));

                          case 6:
                          case "end":
                            return _context17.stop();
                        }
                      }
                    }, _callee17, _this);
                  }));

                  return function (_x34) {
                    return _ref18.apply(this, arguments);
                  };
                }());
                // put those filtered inspections with new data
                allInspections = [].concat((0, _toConsumableArray3.default)(allInspections), (0, _toConsumableArray3.default)(inspections));

              case 94:
                _iteratorNormalCompletion13 = true;
                _context18.next = 39;
                break;

              case 97:
                _context18.next = 103;
                break;

              case 99:
                _context18.prev = 99;
                _context18.t0 = _context18["catch"](37);
                _didIteratorError13 = true;
                _iteratorError13 = _context18.t0;

              case 103:
                _context18.prev = 103;
                _context18.prev = 104;

                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                  _iterator13.return();
                }

              case 106:
                _context18.prev = 106;

                if (!_didIteratorError13) {
                  _context18.next = 109;
                  break;
                }

                throw _iteratorError13;

              case 109:
                return _context18.finish(106);

              case 110:
                return _context18.finish(103);

              case 111:
                _context18.next = 116;
                break;

              case 113:
                _context18.prev = 113;
                _context18.t1 = _context18["catch"](11);

                console.log(_context18.t1);

              case 116:
                return _context18.abrupt("return", allInspections);

              case 117:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[11, 113], [37, 99, 103, 111], [104,, 106, 110]]);
      }));

      function getAllPlansInRange(_x31, _x32, _x33) {
        return _ref17.apply(this, arguments);
      }

      return getAllPlansInRange;
    }()
  }, {
    key: "workPlanExecuted",
    value: function () {
      var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(item, wpt_id) {
        var WPTModel, plan, inspection, INSPECTION_DATE, NEXTINSPECTION_DATE, savedPlan, _savedPlan;

        return _regenerator2.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                WPTModel = void 0, plan = void 0, inspection = void 0;


                inspection = item.optParam1;
                WPTModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                _context19.prev = 3;
                _context19.next = 6;
                return WPTModel.findOne({ _id: wpt_id }).exec();

              case 6:
                plan = _context19.sent;

                if (!plan) {
                  _context19.next = 29;
                  break;
                }

                INSPECTION_DATE = new Date(inspection.date);
                NEXTINSPECTION_DATE = new Date(plan.nextInspectionDate);

                if (!(plan.inspectionType == "fixed")) {
                  _context19.next = 17;
                  break;
                }

                if (INSPECTION_DATE >= NEXTINSPECTION_DATE) {
                  plan.nextInspectionDate = new Date(plan.nextInspectionDate.setDate(plan.nextInspectionDate.getDate() + plan.inspectionFrequency));
                  plan.markModified("nextInspectionDate");
                }
                plan.lastInspection = INSPECTION_DATE;
                plan.markModified("lastInspection");
                _context19.next = 16;
                return plan.save();

              case 16:
                savedPlan = _context19.sent;

              case 17:
                if (!(plan.inspectionType == "custom")) {
                  _context19.next = 27;
                  break;
                }

                plan.nextInspectionDate = new Date(plan.nextInspectionDate.setDate(INSPECTION_DATE.getDate() + plan.inspectionFrequency));
                plan.nextInspectionDate.setUTCHours(0, 0, 0, 0);
                console.log(plan.nextInspectionDate);
                plan.lastInspection = INSPECTION_DATE;
                plan.markModified("nextInspectionDate");
                plan.markModified("lastInspection");
                _context19.next = 26;
                return plan.save();

              case 26:
                _savedPlan = _context19.sent;

              case 27:
                _context19.next = 29;
                break;

              case 29:
                _context19.next = 33;
                break;

              case 31:
                _context19.prev = 31;
                _context19.t0 = _context19["catch"](3);

              case 33:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[3, 31]]);
      }));

      function workPlanExecuted(_x35, _x36) {
        return _ref19.apply(this, arguments);
      }

      return workPlanExecuted;
    }()
  }, {
    key: "filterForUser",
    value: function () {
      var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(wpts, user, tzMinutes) {
        var uniqueLocations, assetService, timezoneMap, filteredWpts, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, wpt, inModifications, d, mDate, nextDate, timezone, today;

        return _regenerator2.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                // Use the current day at location —to be inspected—, and ignore the user's current day.
                // Fetch all required timezones once
                uniqueLocations = [];

                wpts.forEach(function (w) {
                  if (!uniqueLocations.includes(w.lineId)) uniqueLocations.push(w.lineId);
                });
                assetService = ServiceLocator.resolve("AssetsService");
                _context20.next = 5;
                return assetService.getTimezones(uniqueLocations);

              case 5:
                timezoneMap = _context20.sent;
                filteredWpts = [];
                _iteratorNormalCompletion14 = true;
                _didIteratorError14 = false;
                _iteratorError14 = undefined;
                _context20.prev = 10;

                for (_iterator14 = wpts[Symbol.iterator](); !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                  wpt = _step14.value;
                  inModifications = false;

                  if (wpt.modifications) {
                    for (d in wpt.modifications) {
                      mDate = (0, _moment2.default)(d, "YYYYMMDD");
                      nextDate = (0, _moment2.default)(wpt.nextExpiryDate);
                      timezone = timezoneMap[wpt.lineId];


                      if (_momentTimezone2.default.tz.zone(timezone)) {
                        today = _momentTimezone2.default.tz(new Date().toISOString().slice(0, 10), timezone);


                        if (today >= mDate && today <= nextDate && wpt.modifications[d].user && wpt.modifications[d].user.email && wpt.modifications[d].user.email === user.email) {
                          //console.log("date falls withtin Range")
                          inModifications = true;
                        }
                      } else {}
                      // todo: error timezone invalid

                      //console.log('date in wpt.modifications', d);
                    }
                  }
                  if (wpt && wpt.user && user && (wpt.user.email === user.email || wpt.user.email === user.teamLead || inModifications)) {
                    filteredWpts.push(wpt);
                  }
                }

                _context20.next = 18;
                break;

              case 14:
                _context20.prev = 14;
                _context20.t0 = _context20["catch"](10);
                _didIteratorError14 = true;
                _iteratorError14 = _context20.t0;

              case 18:
                _context20.prev = 18;
                _context20.prev = 19;

                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                  _iterator14.return();
                }

              case 21:
                _context20.prev = 21;

                if (!_didIteratorError14) {
                  _context20.next = 24;
                  break;
                }

                throw _iteratorError14;

              case 24:
                return _context20.finish(21);

              case 25:
                return _context20.finish(18);

              case 26:
                return _context20.abrupt("return", filteredWpts);

              case 27:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[10, 14, 18, 26], [19,, 21, 25]]);
      }));

      function filterForUser(_x37, _x38, _x39) {
        return _ref20.apply(this, arguments);
      }

      return filterForUser;
    }()
  }, {
    key: "ignoreInspectionsFromSchedulingCase",
    value: function ignoreInspectionsFromSchedulingCase(inspection, template) {
      var toIgnore = false;
      if (inspection && inspection.tasks && inspection.tasks.length > 0 && (inspection.tasks[0].inspectionType !== "Required Inspection" || inspection.tasks[0].inspectionTypeTag !== "required")) {
        toIgnore = true;
      }
      return toIgnore;
    }
  }, {
    key: "checkWorkPlanNextDueExpiryDate",
    value: function checkWorkPlanNextDueExpiryDate(template, utils) {
      if (template.updatedNextDates && (!utils.compareTwoDates(template.nextExpiryDate, template.updatedNextDates.nextExpiryDate, "IA") || !utils.compareTwoDates(template.nextDueDate, template.updatedNextDates.nextDueDate, "IA"))) {
        template.nextExpiryDate = template.updatedNextDates.nextExpiryDate;
        template.nextDueDate = template.updatedNextDates.nextDueDate;
        template.updatedNextDates.currentDueDate && (template.currentDueDate = template.updatedNextDates.currentDueDate);
        template.updatedNextDates.currentExpiryDate && (template.currentExpiryDate = template.updatedNextDates.currentExpiryDate);
      }
    }
  }, {
    key: "checkCurrentTimePeriodUpdate",
    value: function checkCurrentTimePeriodUpdate(template, utils) {
      if (template.updatedNextDates && (!utils.compareTwoDates(template.currentPeriodStart, template.updatedNextDates.currentPeriodStart, "ISOA") || !utils.compareTwoDates(template.currentPeriodEnd, template.updatedNextDates.currentPeriodEnd, "ISOA"))) {
        template.currentPeriodStart = template.updatedNextDates.currentPeriodStart;
        template.currentPeriodEnd = template.updatedNextDates.currentPeriodEnd;
      }
    }
  }]);
  return WorkPlanTemplateService;
}();

exports.default = WorkPlanTemplateService;


function nextWorkingDaysAdjusted(currDate, rawNum, workingDays) {
  var adjustedNum = rawNum;

  var _loop = function _loop(i) {
    var newDate = (0, _moment2.default)(currDate).add(i, "days");
    var holiday = _lodash2.default.find(workingDays.holidays, function (item) {
      return (0, _moment2.default)(newDate).format("DDMMYYYY") == (0, _moment2.default)(item).format("DDMMYYYY");
    });
    if (holiday) {
      adjustedNum++;
    } else {
      var day = newDate.format("dddd");
      var offDay = _lodash2.default.find(workingDays.weekOffDays, function (item) {
        return item == day;
      });
      offDay && adjustedNum++;
    }
  };

  for (var i = 0; i <= adjustedNum; i++) {
    _loop(i);
  }
  return adjustedNum;
}

function calculateTimeFrameNextFreq(plan, inspections, currDate, workingDays) {
  var freq = 0;
  var timePeriod = plan.timeFrame == "Week" ? 7 - workingDays.weekOffDays.length : plan.timeFrame == "Month" ? (0, _moment2.default)(currDate).daysInMonth() : (0, _moment2.default)(currDate).isLeapYear() ? 366 : 365;
  var timeAdjustment = plan.timeFrame == "Week" ? "week" : plan.timeFrame == "Month" ? "month" : "year";
  var foundInspections = _lodash2.default.filter(inspections, function (inspec) {
    var DATE_GREATER_THEN_START = (0, _moment2.default)(inspec.date, "YYYYMMDD").isSameOrAfter((0, _moment2.default)(currDate, "YYYYMMDD").startOf(timeAdjustment));
    var DATE_LESS_THEN_END = (0, _moment2.default)(inspec.date, "YYYYMMDD").isSameOrBefore((0, _moment2.default)(currDate, "YYYYMMDD").endOf(timeAdjustment));

    return DATE_GREATER_THEN_START && DATE_LESS_THEN_END;
  });
  var latestInspection = foundInspections.length > 0 && (0, _moment2.default)(foundInspections[foundInspections.length - 1].date).format("YYYYMMDD") !== (0, _moment2.default)(plan.startDate).format("YYYYMMDD") ? foundInspections[foundInspections.length - 1] : null;
  var newFreq = Math.ceil(timePeriod / parseInt(plan.perTime));
  if (latestInspection) {
    // next time period start ( in case if enough inspection exist in this period we need to move to this next time period start)
    var nextTimeStartDate = (0, _moment2.default)(latestInspection.date, "YYYY-MM-DD").add(1, timeAdjustment + "s").startOf(timeAdjustment);
    // the frequency cal based on num of times in time period

    // next inspection in case if it is already beyond nextTimeStartDate
    var nextTimeDate = (0, _moment2.default)(latestInspection.date).add(newFreq, "days");
    // calculate next frequency (for Week it is lastInspection.date) , for year we only check if the next date is holiday/off-day
    if (plan.timeFrame == "Week") {
      freq = nextWorkingDaysAdjusted(latestInspection.date, newFreq, workingDays);
    } else {
      freq = newFreq + nextWorkingDaysAdjusted(nextTimeDate, 0, workingDays);
    }
    // if enough inspections exist (+1 because the next inspection will complete it so we know it will be added on the currentDate) we need to move to nextTime period start.
    if (foundInspections.length >= parseInt(plan.perTime)) {
      var compareCurrentDate = (0, _moment2.default)((0, _moment2.default)(currDate).format("YYYY-MM-DD"));
      var diff = nextTimeStartDate.diff(compareCurrentDate, "days");
      if (new Date(nextTimeDate) < new Date(nextTimeStartDate)) {
        freq = diff + nextWorkingDaysAdjusted(nextTimeStartDate, 0, workingDays);
      }
    } else {
      if (foundInspections.length <= parseInt(plan.perTime) - 1 && nextTimeDate >= nextTimeStartDate) {
        freq = nextWorkingDaysAdjusted(latestInspection.date, plan.minDays ? plan.minDays : 1, workingDays);
      }
    }
  } else {
    // if no inspection found/exist then calculate it normally
    // if (plan.timeFrame == "Week") {
    //   freq = nextWorkingDaysAdjusted(currDate, newFreq, workingDays);
    // } else {
    var nextTimeCurrDate = (0, _moment2.default)(currDate).add(newFreq, "days");
    freq = newFreq + nextWorkingDaysAdjusted(nextTimeCurrDate, 0, workingDays);
    // }
  }

  return freq;
}

function getRailOptions(rOrientation, electrified, electrifiedAsset) {
  var railIssueOptions = ["N/A"];
  if (rOrientation == "NS") {
    railIssueOptions.push("North");
    railIssueOptions.push("South");
  } else if (rOrientation == "EW") {
    railIssueOptions.push("East");
    railIssueOptions.push("West");
  }
  if (electrified && electrifiedAsset == "3rd Rail") {
    railIssueOptions.push("3rd Rail");
    railIssueOptions[0] = "N/A";
  }
  if (electrified && electrifiedAsset == "Catenary Power") {
    railIssueOptions.push("Catenary Power");
    railIssueOptions[0] = "N/A";
  }
  return railIssueOptions;
}

function trimRealInspectionDataToID(inspectionArray) {
  var inspectionArrayLength = inspectionArray.length;
  for (var i = 0; i < inspectionArrayLength; i++) {
    if (inspectionArray[i].id) {
      inspectionArray.splice(i, 1, { _id: inspectionArray[i].id });
    }
  }
  return inspectionArray;
}