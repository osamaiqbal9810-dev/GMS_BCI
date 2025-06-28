"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _workingdays = require("../template/workingdays");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchedulerService = function () {
  function SchedulerService() {
    (0, _classCallCheck3.default)(this, SchedulerService);
  }

  (0, _createClass3.default)(SchedulerService, [{
    key: "getSchedules",
    value: function getSchedules(template, startDate, executed_schedules, dateRange, workingDays, ignoreExecutionsMethod) {
      var config = {
        expiryDateToStartNextScheduleAtStartOfPeriod: false,
        adjustOffDays: false,
        moveNextScheduleToTodayIfPossible: true,
        showFutureScheduleOnDueDate: true,
        removeSchedulesBeforeDateRangeFrom: false, // not implemented yet
        minDaysGapBetweenTimePeriodsInFutureSchedules: true,
        singleUpcomingSchedule: true
      };
      var inspections = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = template.inspectionFrequencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var scheduleFreq = _step.value;

          if (scheduleFreq.freq > 0) {
            inspections = [].concat((0, _toConsumableArray3.default)(inspections), (0, _toConsumableArray3.default)(this.getScheduleOfFreq(template, executed_schedules, dateRange, workingDays, scheduleFreq, config, startDate, ignoreExecutionsMethod)));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return inspections;
    }
  }, {
    key: "getScheduleOfFreq",
    value: function getScheduleOfFreq(template, executed_schedules, dateRange, workingDays, freqOption, config, startDate, ignoreExecutionsMethod) {
      freqOption.timeFrame = templateTimeFrame[freqOption.timeFrame];
      freqOption.recurTimeFrame = templateTimeFrame[freqOption.recurTimeFrame];
      freqOption.freq = parseInt(freqOption.freq);
      freqOption.timeFrameNumber = parseInt(freqOption.timeFrameNumber);
      freqOption.recurNumber = parseInt(freqOption.recurNumber);
      freqOption.maxInterval = freqOption.maxInterval && parseInt(freqOption.maxInterval);
      freqOption.minDays = freqOption.minDays && parseInt(freqOption.minDays);

      var DATE_FILTER_TO = new Date(dateRange.to);
      var DATE_FILTER_FROM = new Date(dateRange.from);
      var DATE_FILTER_TODAY = new Date(dateRange.today);
      var exec_schedules = [].concat((0, _toConsumableArray3.default)(executed_schedules));

      // # check if minDays are 0 then make sure its set to 1
      var minDaysBeforeNextSchedule = freqOption.minDays ? freqOption.minDays + 1 : 1;

      // # all executions to return
      var allSchedulesToReturn = [];

      // # if it is starting at a date greater then our maximum desired date then it wont show
      if (startDate <= DATE_FILTER_TO) {
        var currentDatePoint = new Date(startDate);
        //   let prevDatePoint;
        // # get in the current time period of template
        var nextTimePeriodStart = currentDatePoint;

        while (nextTimePeriodStart < DATE_FILTER_FROM) {
          // console.log("while loop F1");
          nextTimePeriodStart = getNextTimePeriod(nextTimePeriodStart, freqOption);
          // prevDatePoint = new Date(currentDatePoint);
          // currentDatePoint = nextTimePeriodStart;
        }
        // # filter executed_schedules in the two time period we have (current or one before it)

        var filteredSchedules = [];
        //let prevPeriodSchedules = [];
        var lengthOfExecutedSchedules = exec_schedules.length;
        for (var es = 0; es < lengthOfExecutedSchedules; es++) {
          if (exec_schedules[es].date >= currentDatePoint) {
            filteredSchedules.push(exec_schedules[es]);
          } else if (compareTwoDates(exec_schedules[es].date, template.startDate, "ISOB") && compareTwoDates(exec_schedules[es].date, DATE_FILTER_FROM, "ISOA") && compareTwoDates(exec_schedules[es].date, DATE_FILTER_TO, "ISOB")) {
            //  # dumb include schedules executed before start date ( in case start date can be edited) but the date should be in our range
            allSchedulesToReturn.push(exec_schedules[es]);
          }
        }
        var lengthOfFilteredSchedules = filteredSchedules.length;
        // # end of time Period to check the time period in which enough inspection are needed or executed , also to calculate expiry date
        var endOfTimePeriod = getEndTimePeriod(currentDatePoint, freqOption);
        var shedsInCurrentTimePeriod = [];
        var templateSchedules = [];

        // # this section will basically add the executed schedules along with missed ones from our date range time period.
        for (var e = 0; e < lengthOfFilteredSchedules; e++) {
          // # Check if any schedule to be calculated before moving to time period of current executed schedule
          while (filteredSchedules[e].date > endOfTimePeriod) {
            // console.log("while loop F2");
            var expiryDate = calculateExpiryDate(shedsInCurrentTimePeriod, minDaysBeforeNextSchedule, endOfTimePeriod, freqOption, config, workingDays);
            if (expiryDate < DATE_FILTER_TODAY) {
              var missedSchedule = foreCastedInspectionObjectGet(template, expiryDate, "Missed");
              shedsInCurrentTimePeriod.push(missedSchedule);
            }
            if (shedsInCurrentTimePeriod.length >= freqOption.freq) {
              // # if we have enough then lets move to next period
              var _nextTimePeriodStart = getNextTimePeriod(currentDatePoint, freqOption);
              endOfTimePeriod = getEndTimePeriod(_nextTimePeriodStart, freqOption);
              currentDatePoint = _nextTimePeriodStart;
              templateSchedules = [].concat((0, _toConsumableArray3.default)(templateSchedules), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
              allSchedulesToReturn = [].concat((0, _toConsumableArray3.default)(allSchedulesToReturn), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
              shedsInCurrentTimePeriod = [];
            }
          }
          var pushed = false;
          // # we check if we can push our executed schedule , otherwise add a missed one in current time period
          while (!pushed) {
            // console.log("while loop F3");
            var _expiryDate = calculateExpiryDate(shedsInCurrentTimePeriod, minDaysBeforeNextSchedule, endOfTimePeriod, freqOption, config, workingDays);
            if (compareTwoDates(filteredSchedules[e].date, _expiryDate, "IA")) {
              var _missedSchedule = foreCastedInspectionObjectGet(template, _expiryDate, "Missed");
              shedsInCurrentTimePeriod.push(_missedSchedule);
            } else {
              var toIgnore = ignoreExecutionsMethod && ignoreExecutionsMethod(filteredSchedules[e], template);
              if (toIgnore) {
                allSchedulesToReturn.push(filteredSchedules[e]);
              } else {
                shedsInCurrentTimePeriod.push(filteredSchedules[e]);
              }
              filteredSchedules[e].pushed = true;
              pushed = true;
            }
          }
        }
        // # all executed schedules are added now we will be adding missed if we are before today or upcoming if we are in future based on config amount of upcoming
        var afterEndOfRange = false;
        // # check if we are ready to move to next period in case we have enough inspection in current one
        if (shedsInCurrentTimePeriod.length > 0 && shedsInCurrentTimePeriod.length >= freqOption.freq) {
          var _nextTimePeriodStart2 = getNextTimePeriod(currentDatePoint, freqOption);
          endOfTimePeriod = getEndTimePeriod(_nextTimePeriodStart2, freqOption);
          currentDatePoint = _nextTimePeriodStart2;
          //   adjustedDate = moment(shedsInCurrentTimePeriod[shedsInCurrentTimePeriod.length - 1].date).add(minDaysBeforeNextSchedule, "days");
          templateSchedules = [].concat((0, _toConsumableArray3.default)(templateSchedules), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
          allSchedulesToReturn = [].concat((0, _toConsumableArray3.default)(allSchedulesToReturn), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
          shedsInCurrentTimePeriod = [];
          // # if next period goes beyond filter range then no need to iterate
          // if (moment(moment(nextTimePeriodStart).format("YYYY-MM-DD")).isAfter(moment(moment(DATE_FILTER_TO).format("YYYY-MM-DD")))) {
          //   afterEndOfRange = true;
          // }
          _nextTimePeriodStart2 > DATE_FILTER_TO && (afterEndOfRange = true);
        }
        var firstFutureSchedule = false;
        while (!afterEndOfRange) {
          // console.log("while loop F4");
          if (shedsInCurrentTimePeriod.length < freqOption.freq) {
            var expiryDateToCheck = calculateExpiryDate(shedsInCurrentTimePeriod, minDaysBeforeNextSchedule, endOfTimePeriod, freqOption, config, workingDays);
            // if max interval is given then calculate it
            if (freqOption.maxInterval) {
              var maxIntervalExpiryDate = nextMaxIntervalExpiryDate(shedsInCurrentTimePeriod, templateSchedules, currentDatePoint, freqOption);
              if (maxIntervalExpiryDate) {
                var maxExpiryDateIsBefore = compareTwoDates(maxIntervalExpiryDate, expiryDateToCheck, "IB");
                maxExpiryDateIsBefore && (expiryDateToCheck = maxIntervalExpiryDate);
              }
            }
            if (compareTwoDates(expiryDateToCheck, (0, _moment2.default)(DATE_FILTER_TODAY).startOf("day"), "IB")) {
              var _missedSchedule2 = foreCastedInspectionObjectGet(template, expiryDateToCheck, "Missed");
              shedsInCurrentTimePeriod.push(_missedSchedule2);
            } else if (compareTwoDates(expiryDateToCheck, DATE_FILTER_TO, "ISOB") || compareTwoDates(expiryDateToCheck, endOfTimePeriod, "ISOB")) {
              var futureSchedule = foreCastedInspectionObjectGet(template, expiryDateToCheck, "Future Inspection");
              // # set future schedules to their due dates instead of expiry
              calculateDueDate(futureSchedule, currentDatePoint, shedsInCurrentTimePeriod, templateSchedules, config, freqOption);
              var momentDate = futureSchedule.dueDate ? _moment2.default.utc(new Date(futureSchedule.dueDate).getTime()).format("YYYYMMDD") : _moment2.default.utc(new Date(futureSchedule.date).getTime()).format("YYYYMMDD");
              var futureChange_date = template.modifications && template.modifications[momentDate];
              if (futureChange_date && futureChange_date.user) {
                futureSchedule.temp_user = futureChange_date.user;
              }

              // # check next inspection due today
              if (config.moveNextScheduleToTodayIfPossible) {
                updateNextScheduleDueToToday(futureSchedule, DATE_FILTER_TODAY, shedsInCurrentTimePeriod, templateSchedules, currentDatePoint, freqOption);
              }
              shedsInCurrentTimePeriod.push(futureSchedule);

              if (!firstFutureSchedule) {
                firstFutureSchedule = true;
                template.updatedNextDates = {
                  nextDueDate: futureSchedule.dueDate,
                  nextExpiryDate: futureSchedule.expiryDate
                };
                template.nextDueDate && (template.updatedNextDates.currentDueDate = template.nextDueDate);
                template.nextExpiryDate && (template.updatedNextDates.currentExpiryDate = template.nextExpiryDate);
                if (compareTwoDates(currentDatePoint, DATE_FILTER_TODAY, "ISOB")) {
                  template.updatedNextDates.currentPeriodStart = currentDatePoint;
                  template.updatedNextDates.currentPeriodEnd = endOfTimePeriod;
                }
              }
            } else {
              templateSchedules = [].concat((0, _toConsumableArray3.default)(templateSchedules), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
              allSchedulesToReturn = [].concat((0, _toConsumableArray3.default)(allSchedulesToReturn), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
              shedsInCurrentTimePeriod = [];
              afterEndOfRange = true;
            }
          }
          if (shedsInCurrentTimePeriod.length == freqOption.freq) {
            var _nextTimePeriodStart3 = getNextTimePeriod(currentDatePoint, freqOption);
            endOfTimePeriod = getEndTimePeriod(_nextTimePeriodStart3, freqOption);
            currentDatePoint = _nextTimePeriodStart3;

            templateSchedules = [].concat((0, _toConsumableArray3.default)(templateSchedules), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
            allSchedulesToReturn = [].concat((0, _toConsumableArray3.default)(allSchedulesToReturn), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
            shedsInCurrentTimePeriod = [];
            // get only current time period schedules
            firstFutureSchedule && (afterEndOfRange = true);
          } // # if next period goes beyond filter range then no need to iterate
          if (currentDatePoint > DATE_FILTER_TO || shedsInCurrentTimePeriod.length > freqOption.freq) {
            templateSchedules = [].concat((0, _toConsumableArray3.default)(templateSchedules), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
            allSchedulesToReturn = [].concat((0, _toConsumableArray3.default)(allSchedulesToReturn), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
            shedsInCurrentTimePeriod = [];
            currentDatePoint > DATE_FILTER_TO && (afterEndOfRange = true);
          }
          // limit it to only 1 schedule
          if (firstFutureSchedule && config.singleUpcomingSchedule) {
            allSchedulesToReturn = [].concat((0, _toConsumableArray3.default)(allSchedulesToReturn), (0, _toConsumableArray3.default)(shedsInCurrentTimePeriod));
            shedsInCurrentTimePeriod = [];
            afterEndOfRange = true;
          }
        }
      }

      return allSchedulesToReturn;
    }
  }]);
  return SchedulerService;
}();

exports.default = SchedulerService;

function foreCastedInspectionObjectGet(c_plan, date, status) {
  var inspection = {
    user: c_plan.user,
    tasks: c_plan.tasks,
    date: new Date(date).toISOString(),
    title: c_plan.title,
    workplanTemplateId: c_plan._id,
    lineId: c_plan.lineId,
    lineName: c_plan.lineName,
    status: status
  };
  return inspection;
}

function getNextTimePeriod(currentDatePoint, freqOption) {
  var nextTimePeriodStart = (0, _moment2.default)(currentDatePoint).add(freqOption.recurNumber, freqOption.recurTimeFrame);
  return nextTimePeriodStart;
}

function getEndTimePeriod(datePoint, freqOption) {
  var date = (0, _moment2.default)((0, _moment2.default)(datePoint).add(freqOption.timeFrameNumber, freqOption.timeFrame)).subtract(1, "minutes");
  return date;
}

var templateTimeFrame = {
  Week: "w",
  Month: "M",
  Year: "y",
  Day: "d"
};

function calculateExpiryDate(shedsInCurrentTimePeriod, minDaysBeforeNextSchedule, timePeriod, freqOption, config, workingDays) {
  var subtractVal = minDaysBeforeNextSchedule;
  if (config.expiryDateToStartNextScheduleAtStartOfPeriod) {
    subtractVal = minDaysBeforeNextSchedule * (freqOption.freq - shedsInCurrentTimePeriod.length);
  } else {
    subtractVal = minDaysBeforeNextSchedule * (freqOption.freq - shedsInCurrentTimePeriod.length - 1);
  }

  return config.adjustOffDays ? reverseWorkingDaysAdjust((0, _moment2.default)(timePeriod).subtract(subtractVal, "days"), workingDays) : (0, _moment2.default)(timePeriod).subtract(subtractVal, "days");
}

// not tested implementation
function nextWorkingDaysAdjusted(currDate, rawNum, workingDays, reverse) {
  var adjustedNum = rawNum;

  var _loop = function _loop(i) {
    var newDate = reverse ? (0, _moment2.default)(currDate).subtract(i, "days") : (0, _moment2.default)(currDate).add(i, "days");
    var holiday = _lodash2.default.find(workingDays.holidays, function (item) {
      return (0, _moment2.default)(newDate).format("DDMMYYYY") == (0, _moment2.default)(item).format("DDMMYYYY");
    });
    if (holiday) {
      reverse ? adjustedNum-- : adjustedNum++;
    } else {
      var day = newDate.format("dddd");
      var offDay = _lodash2.default.find(workingDays.weekOffDays, function (item) {
        return item == day;
      });
      offDay && reverse ? adjustNum-- : adjustedNum++;
    }
  };

  for (var i = reverse ? adjustedNum : 0; reverse ? i >= 0 : i <= adjustedNum; reverse ? i-- : i++) {
    _loop(i);
  }
  return adjustedNum;
}

function reverseWorkingDaysAdjust(currDate, workingDays) {
  var foundWorkingDay = false;
  var newDate = currDate;
  while (!foundWorkingDay) {
    var holiday = _lodash2.default.find(workingDays.holidays, function (item) {
      return (0, _moment2.default)(newDate).format("DDMMYYYY") == (0, _moment2.default)(item).format("DDMMYYYY");
    });
    if (holiday) {
      newDate = (0, _moment2.default)(newDate).subtract(1, "days");
    } else {
      (function () {
        var day = newDate.format("dddd");
        var offDay = _lodash2.default.find(workingDays.weekOffDays, function (item) {
          return item == day;
        });
        if (offDay) {
          newDate = (0, _moment2.default)(newDate).subtract(1, "days");
        } else {
          foundWorkingDay = true;
        }
      })();
    }
  }
  return newDate;
}

function updateNextScheduleDueToToday(futureSchedule, DATE_FILTER_TODAY, shedsInCurrentTimePeriod, templateSchedules, currentTimePeriod, freqOption) {
  // # expiry date of current next upcoming inspection and move it to today.
  var foundToday = void 0;
  var result = getLastDateOfScheduleWithTimePeriodChange(shedsInCurrentTimePeriod, templateSchedules);
  // # to check if last inspection date is not today.
  var timeperiodChangeCheck = result.timePeriodChange ? compareTwoDates(currentTimePeriod, DATE_FILTER_TODAY, "IB") : true;
  var dateToCheckAgainst = result.dateOfLastSchedule ? result.dateOfLastSchedule : futureSchedule.dueDate;
  foundToday = timeperiodChangeCheck && (0, _moment2.default)((0, _moment2.default)(dateToCheckAgainst).format("YYYY-MM-DD")).isBefore((0, _moment2.default)(DATE_FILTER_TODAY).format("YYYY-MM-DD"));
  if (foundToday) {
    if (!futureSchedule.dueDate) {
      futureSchedule.expiryDate = futureSchedule.date;
    }
    //TODO: if today is also within due date by adding min days
    var todayDueDate = new Date();
    var timeZone = (0, _moment2.default)(futureSchedule.date).tz();
    if (timeZone) {
      todayDueDate = new Date((0, _moment2.default)().tz(timeZone));
    } else {
      todayDueDate = new Date();
    }
    var dueDateOfSchedule = futureSchedule.dueDate;
    !dueDateOfSchedule && (dueDateOfSchedule = (0, _moment2.default)(dateToCheckAgainst).add(freqOption.minDays, "days"));
    if (compareTwoDates(todayDueDate, dueDateOfSchedule, "IA")) {
      futureSchedule.date = todayDueDate;
    }
  }
}
function calculateDueDate(schedule, currentTimePeriod, shedsInCurrentTimePeriod, templateSchedules, config, freqOption) {
  var result = getLastDateOfScheduleWithTimePeriodChange(shedsInCurrentTimePeriod, templateSchedules, {
    freqOption: freqOption,
    currentTimePeriod: currentTimePeriod
  });
  var dateOfLastSchedule = result.dateOfLastSchedule;
  var timePeriodChange = result.timePeriodChange;
  var dateToDue = void 0;
  if (dateOfLastSchedule) {
    var daysToAdd = config.minDaysGapBetweenTimePeriodsInFutureSchedules && freqOption.minDays > 0 ? freqOption.minDays + 1 : 1;
    dateToDue = (0, _moment2.default)(dateOfLastSchedule).add(daysToAdd, "days");
    if (timePeriodChange && compareTwoDates(dateToDue, currentTimePeriod, "IB")) {
      dateToDue = currentTimePeriod;
    }
  } else {
    dateToDue = currentTimePeriod;
  }
  if (dateToDue) {
    // # save as due date so it can be checked on later on to know if we are already on due date and not expiry date in date field
    schedule.expiryDate = schedule.date;
    schedule.dueDate = dateToDue && (0, _moment2.default)(dateToDue).format();
    if (config.showFutureScheduleOnDueDate) {
      schedule.date = new Date(dateToDue);
    }
  }
}

function getLastElementOfArray(arr) {
  return arr[arr.length - 1];
}

function nextMaxIntervalExpiryDate(shedsInCurrentTimePeriod, templateSchedules, currentTimePeriod, freqOption) {
  var maxExpiryDate = null;
  var result = getLastDateOfScheduleWithTimePeriodChange(shedsInCurrentTimePeriod, templateSchedules);
  var dateOfLastSchedule = result.dateOfLastSchedule;
  var timePeriodChange = result.timePeriodChange;
  // # if time period change it means we calculate expiry date of next schedule based on max interval
  if (dateOfLastSchedule) {
    // # ignore if we are on latest schedule in frequency or if we frequency is only 1
    var shedsLength = shedsInCurrentTimePeriod.length;
    var ignoreCheckMaxIntervalWithinTimePeriod = timePeriodChange == true ? false : freqOption.freq == 1 || shedsLength == freqOption.freq;
    if (!ignoreCheckMaxIntervalWithinTimePeriod) {
      maxExpiryDate = (0, _moment2.default)(dateOfLastSchedule).add(freqOption.maxInterval, "days");
      var checkIfStillInLastPeriod = compareTwoDates(maxExpiryDate, currentTimePeriod, "IB");
      checkIfStillInLastPeriod && (maxExpiryDate = null);
    }
  }
  return maxExpiryDate;
}

function getLastDateOfScheduleWithTimePeriodChange(shedsInCurrentTimePeriod, templateSchedules, lastTimePeriodScheduleCondition) {
  var result = void 0,
      timePeriodChange = void 0,
      dateOfLastSchedule = void 0;
  if (shedsInCurrentTimePeriod.length > 0) {
    var sc = getLastElementOfArray(shedsInCurrentTimePeriod);
    dateOfLastSchedule = sc.expiryDate ? sc.expiryDate : sc.date;
  } else if (templateSchedules.length > 0) {
    var tsc = getLastElementOfArray(templateSchedules);
    // only check if we have lastTimePeriodScheduleCondition object that has template and currentTimePeriod ( we do this one only for min days time period change check)
    if (lastTimePeriodScheduleCondition) {
      var freqOption = lastTimePeriodScheduleCondition.freqOption;
      var currentTimePeriod = lastTimePeriodScheduleCondition.currentTimePeriod;
      if (tsc && compareTwoDates((0, _moment2.default)(tsc.date).add(freqOption.minDays ? freqOption.minDays : 0, "days"), currentTimePeriod, "ISOA")) {
        dateOfLastSchedule = tsc.expiryDate ? tsc.expiryDate : tsc.date;
        timePeriodChange = true;
      }
    } else {
      // else if we are testing max interval then we need last schedule anyhow
      dateOfLastSchedule = tsc.expiryDate ? tsc.expiryDate : tsc.date;
      timePeriodChange = true;
    }
  }
  result = {
    timePeriodChange: timePeriodChange,
    dateOfLastSchedule: dateOfLastSchedule
  };
  return result;
}

function compareTwoDates(d1, d2, method) {
  var result = void 0;
  switch (method) {
    case "ISOB":
      result = (0, _moment2.default)((0, _moment2.default)(d1).format("YYYY-MM-DD")).isSameOrBefore((0, _moment2.default)((0, _moment2.default)(d2).format("YYYY-MM-DD")));
      break;
    case "IB":
      result = (0, _moment2.default)((0, _moment2.default)(d1).format("YYYY-MM-DD")).isBefore((0, _moment2.default)((0, _moment2.default)(d2).format("YYYY-MM-DD")));
      break;
    case "ISOA":
      result = (0, _moment2.default)((0, _moment2.default)(d1).format("YYYY-MM-DD")).isSameOrAfter((0, _moment2.default)((0, _moment2.default)(d2).format("YYYY-MM-DD")));
      break;
    case "IA":
      result = (0, _moment2.default)((0, _moment2.default)(d1).format("YYYY-MM-DD")).isAfter((0, _moment2.default)((0, _moment2.default)(d2).format("YYYY-MM-DD")));
      break;
    default:
      break;
  }
  return result;
}