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

var _utils = require("../../utilities/utils");

var _utils2 = _interopRequireDefault(_utils);

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");

var SensorReportService = function () {
  function SensorReportService() {
    (0, _classCallCheck3.default)(this, SensorReportService);
  }

  (0, _createClass3.default)(SensorReportService, [{
    key: "getSensorReport",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(body) {
        var SensorReportModel, assetsModel, ApplicationLookupsService, criteriaList, resultObj, params, assets, deviceInfo, appLookupCriteria, appLookUpList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, criteria, sensorReport, reportData;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // console.log(body);
                SensorReportModel = ServiceLocator.resolve("SensorReportModel");
                assetsModel = ServiceLocator.resolve("AssetsModel");
                ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
                criteriaList = {};
                resultObj = {};
                _context.prev = 5;

                // Added because we need to include this full day
                params = { assetId: body.assetId, startTime: body.startTime, endTime: (0, _momentTimezone2.default)(body.endTime).add(1, "days") };

                // console.log("new params = " + JSON.stringify(params));

                _context.next = 9;
                return assetsModel.find({ _id: params.assetId });

              case 9:
                assets = _context.sent;
                deviceInfo = { deviceName: "NA", currTemp: "NA", currHumidity: "NA", currState: "NA", deviceType: "NA", idealTemperature: { min: "NA", max: "NA" } };

                if (assets.length == 1) {
                  deviceInfo.deviceName = assets[0].attributes.sensorName;
                  deviceInfo.currTemp = assets[0].attributes.data.temperature;
                  deviceInfo.currHumidity = assets[0].attributes.data.humidity;
                  deviceInfo.currState = assets[0].attributes.state;
                  deviceInfo.deviceType = assets[0].attributes.deviceType;
                  // deviceInfo.idealTemperature = 
                }

                appLookupCriteria = deviceInfo.deviceType ? {
                  $and: [{ listName: { $ne: "offlineCriteria" } }, { $or: [{ code: deviceInfo.deviceType }] }]
                } : { $and: [{ listName: { $ne: "offlineCriteria" } }, { $or: [{ code: "default" }] }] };
                _context.next = 15;
                return ApplicationLookupsService.getAllList(appLookupCriteria);

              case 15:
                appLookUpList = _context.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 19;

                for (_iterator = appLookUpList.value[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  item = _step.value;

                  criteriaList[item.listName] = item;
                }

                _context.next = 27;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](19);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 27:
                _context.prev = 27;
                _context.prev = 28;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 30:
                _context.prev = 30;

                if (!_didIteratorError) {
                  _context.next = 33;
                  break;
                }

                throw _iteratorError;

              case 33:
                return _context.finish(30);

              case 34:
                return _context.finish(27);

              case 35:
                deviceInfo.idealTemperature.min = criteriaList["temperatureCriteria"].opt1;
                deviceInfo.idealTemperature.max = criteriaList["temperatureCriteria"].opt2;

                criteria = {
                  $and: [{ assetId: params.assetId }, { date: { $gt: params.startTime, $lte: params.endTime } }]
                };
                _context.next = 40;
                return SensorReportModel.find(criteria).sort({ date: 1 }).exec();

              case 40:
                sensorReport = _context.sent;

                //console.log(sensorReport);
                reportData = this.reportDataFormater(sensorReport);

                reportData.generatedDate = (0, _momentTimezone2.default)().toISOString();
                reportData.deviceInfo = deviceInfo;
                resultObj.value = reportData;
                console.log(reportData);
                _context.next = 52;
                break;

              case 48:
                _context.prev = 48;
                _context.t1 = _context["catch"](5);

                resultObj.errorVal = _context.t1;
                resultObj.status = 500;

              case 52:
                return _context.abrupt("return", resultObj);

              case 53:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 48], [19, 23, 27, 35], [28,, 30, 34]]);
      }));

      function getSensorReport(_x) {
        return _ref.apply(this, arguments);
      }

      return getSensorReport;
    }()
  }, {
    key: "reportDataFormater",
    value: function reportDataFormater(reportData) {
      var resObject = { report: { days: [] } };
      if (reportData && reportData.length > 0) {

        var sensorGroupData = this.groupByDate(reportData);
        //console.log(sensorGroupData);

        var HOURS_IN_A_DAY = 24;
        var NO_OF_DURATIONS = 6; // todo: fetch from configurations 
        var single_duration_time = HOURS_IN_A_DAY / NO_OF_DURATIONS;
        // Create Hour durations
        sensorGroupData.forEach(function (dailyData) {
          var dayObj = { day: "", date: "", durations: [] };
          // get date in string
          dayObj.date = _lodash2.default.cloneDeep((0, _momentTimezone2.default)(dailyData.date).format('DD/MM/YYYY'));
          // get day in string
          dayObj.day = _lodash2.default.cloneDeep((0, _momentTimezone2.default)(dailyData.date).format("dddd"));

          var _loop = function _loop(i) {
            var duration_start = (0, _momentTimezone2.default)(dailyData.date).startOf('day').add(single_duration_time * i, "hours");
            var duration_end = (0, _momentTimezone2.default)(dailyData.date).startOf('day').add(single_duration_time * (i + 1), "hours");
            var duration = duration_start.format("hh:mm A") + " to " + duration_end.format("hh:mm A");
            var durationObj = { duration: duration };
            // iterate through all possible properties (todo: update following list if news sensors or attributes get added in future)
            var properties = ["temperature", "humidity"];
            properties.forEach(function (property) {
              durationObj[property] = { min: "NA", max: "NA", avg: "NA" };
              var count = 0;
              var avg = 0;
              var sum = 0;
              var min = +1000000;
              var max = -1000000;
              dailyData.data.forEach(function (singleday) {
                var date = (0, _momentTimezone2.default)(singleday.date);
                var data = singleday.data;
                if (data.hasOwnProperty(property)) {
                  if (date > duration_start && date <= duration_end) {

                    if (data[property].min < min) {
                      min = data[property].min;
                    }
                    if (data[property].max > max) {
                      max = data[property].max;
                    }
                    sum += data[property].avg;
                    count += 1;
                    if (count > 0) {
                      avg = sum / count;
                    }
                  }
                }
                if (min != 1000000 && max != -1000000) {
                  durationObj[property] = { min: min.toFixed(2), max: max.toFixed(2), avg: avg.toFixed(2) };
                }
              });
            });
            dayObj.durations.push(durationObj);
          };

          for (var i = 0; i < NO_OF_DURATIONS; i++) {
            _loop(i);
          }

          // add day's report object 
          resObject.report.days.push(dayObj);
        });
      }
      // console.log(resObject);
      return resObject;
    }
  }, {
    key: "groupByDate",
    value: function groupByDate(data) {
      var groupByDateData = [];
      var groupByObj = { date: "", data: [] };
      var count = 0;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var ele = _step2.value;

          if (count == 0) {
            groupByObj = { date: (0, _momentTimezone2.default)(ele.date).startOf("day"), data: [] };
          }
          if ((0, _momentTimezone2.default)(groupByObj.date).isSame(ele.date, "date")) {
            groupByObj.data.push(ele);
            count += 1;
          } else if ((0, _momentTimezone2.default)(groupByObj.date).isSame((0, _momentTimezone2.default)(ele.date).subtract(1, "days"), "date") && (0, _momentTimezone2.default)(ele.date).hour() == 0) {
            count = 0;
            groupByObj.data.push(ele);
            groupByDateData.push(_lodash2.default.cloneDeep(groupByObj));
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (count > 0) {
        groupByDateData.push(_lodash2.default.cloneDeep(groupByObj));
      }
      return groupByDateData;
    }
  }]);
  return SensorReportService;
}();

exports.default = SensorReportService;