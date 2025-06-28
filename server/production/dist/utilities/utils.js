"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require("lodash");
var ServiceLocator = require("../framework/servicelocator");

var utils = function () {
  function utils() {
    (0, _classCallCheck3.default)(this, utils);
  }

  (0, _createClass3.default)(utils, [{
    key: "ensureFolderExists",
    value: function ensureFolderExists(dir) {
      var fs = require("fs");
      if (!fs.existsSync(dir)) {
        // fs.mkdirSync(dir);
      }
    }
  }, {
    key: "assure2Digits",
    value: function assure2Digits(str) {
      var newstr = str;
      if (str.length == 1) {
        newstr = "0" + newstr;
      }

      return newstr;
    }
  }, {
    key: "assure3Digits",
    value: function assure3Digits(str) {
      var newstr = str;
      if (str.length == 1) {
        newstr = "00" + newstr;
      } else if (str.length == 2) {
        newstr = "0" + newstr;
      }

      return newstr;
    }
  }, {
    key: "assureDigits",
    value: function assureDigits(numberOfDigits, str) // append 0's at start of a numbered string
    {
      var newstr = str;
      if (str.length < numberOfDigits) {
        newstr = "0".repeat(numberOfDigits - str.length) + newstr;
      }

      return newstr;
    }
  }, {
    key: "mergeDeep",
    value: function mergeDeep(target, source) {
      if ((typeof target === "undefined" ? "undefined" : (0, _typeof3.default)(target)) == "object" && (typeof source === "undefined" ? "undefined" : (0, _typeof3.default)(source)) == "object" && !(source instanceof Array)) {
        if (source["__replace"] && source["__replace"] == true) {
          target = _.cloneDeep(source);
        } else {
          for (var key in source) {
            if (source[key] === null && (target[key] === undefined || target[key] === null)) {
              target[key] = null;
            } else if (source[key] instanceof Array) {
              var sKey = key;
              if (sKey.charAt(0) == "*") {
                sKey = key.slice(1);
                target[sKey] = _.cloneDeep(source[key]);
              } else {
                if (!target[sKey]) target[sKey] = [];
                target[key] = this.mergeDeep(target[key], source[key]);
              }

              // //concatenate arrays
              // target[key] = target[key].concat(source[key]);
              //target[key] = this.mergeDeep(target[key], source[key]);
            } else if ((0, _typeof3.default)(source[key]) == "object") {
              if (!target[key]) target[key] = {};
              if (source[key]["__replace"] && source[key]["__replace"] == true)
                ////this.mergeDeep(target[key], source[key], true);
                target[key] = _.cloneDeep(source[key]);else target[key] = this.mergeDeep(target[key], source[key]);
            } else {
              target[key] = source[key];
            }
          }
        }
      } else if (source instanceof Array) {
        //if(target.length == source.length)
        var j = 0;
        for (var i = 0; i < source.length; i++) {
          if (!target[j]) {
            target[j] = source[i] instanceof Array ? [] : (0, _typeof3.default)(source[i]) == "object" ? {} : source[i];
          } else if (source[i] == null) {
            target.splice(j, 1);
            j--;
          }
          if (j >= 0) target[j] = this.mergeDeep(target[i], source[j]);
          j++;
        }
      }
      return target;
    }
  }, {
    key: "substractObjects",
    value: function substractObjects(source, dest) {
      var difference = {};

      if ((typeof source === "undefined" ? "undefined" : (0, _typeof3.default)(source)) == "object") {
        //&& typeof dest == "object")   //&& !(source instanceof Array
        for (var key in source) {
          if ((0, _typeof3.default)(source[key]) == "object") {
            // && !(source[key] instanceof Array))
            var diff = this.substractObjects(source[key], !dest || dest == undefined ? {} : dest[key]);
            if (diff != {}) {
              difference[key] = source[key] instanceof Array ? [] : {};
              difference[key] = Object.assign(source[key] instanceof Array ? [] : {}, diff);
            }
          } else if (!dest || dest[key] == undefined || source[key] != dest[key]) {
            difference[key] = source[key];
          }
        }
      }
      return difference;
    }
  }, {
    key: "toFixed",
    value: function toFixed(value) // default percision nnnnn.nn
    {
      var decimalPlaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      var retValue = value;
      if (value && decimalPlaces) {
        if (typeof value !== "string" && typeof value !== "number") {
          // console.log('utils.toPrecision: bad argument type while parsing for fixed :', value);
          value = value.toString();
        }

        if (typeof value === "string") {
          retValue = parseFloat(value);
          if (isNaN(retValue)) {
            retValue = 0;
            // console.log('utils.toPrecision: bad number in while parsing for fixed :', value);
          }
        }

        retValue = +retValue.toFixed(decimalPlaces);
      }

      return parseFloat(retValue);
    }
  }, {
    key: "convertErrorToStr",
    value: function convertErrorToStr(err) {
      var str = "[";
      str += err && err.name ? err.name : "";

      if (err && err.errors) {
        var errs = Object.keys(err.errors);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = errs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            if (e) str += "{" + e + "}=>";
            if (err.errors[e]) str += err.errors[e];
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
      }
      if (err && err.message) {
        str += "message: " + err.message;
      }
      if (err && err.stack) {
        str += "stack: " + err.stack;
      }

      str += "]";
      return str;
    }
  }, {
    key: "handleMongoDbError",
    value: function handleMongoDbError(err) {
      var logger = ServiceLocator.resolve("logger");
      var str = "Mongodb Connection Error:";
      str += this.convertErrorToStr(err);
      logger.error(str);

      console.log(str);
    }
  }, {
    key: "compareTwoDates",
    value: function compareTwoDates(d1, d2, method) {
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
  }, {
    key: "checkSameDates",
    value: function checkSameDates(d1, d2) {
      var result = void 0;
      result = (0, _moment2.default)((0, _moment2.default)(d1).format("YYYY-MM-DD")).isSame((0, _moment2.default)((0, _moment2.default)(d2).format("YYYY-MM-DD")));
      return result;
    }
  }, {
    key: "getRandomInt",
    value: function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
  }, {
    key: "cToF",
    value: function cToF(cTemp) {
      var cToFahr = (parseFloat(cTemp) * 9 / 5 + 32).toFixed(2);
      return cToFahr;
    }
  }, {
    key: "fToC",
    value: function fToC(fTemp) {
      var fToCel = ((parseFloat(fTemp) - 32) * 5 / 9).toFixed(2);
      return fToCel;
    }
  }, {
    key: "getSensorLevel",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(value, criteria) {
        var level, ApplicationLookupsService, appLookUpList, min, max;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                level = 1;
                _context.prev = 1;
                ApplicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
                _context.next = 5;
                return ApplicationLookupsService.getAllList(criteria);

              case 5:
                appLookUpList = _context.sent;

                if (appLookUpList) {
                  min = appLookUpList.value[0].opt2;
                  max = appLookUpList.value[appLookUpList.value.length - 1].opt3;

                  if (value < min) {
                    value = min;
                  }
                  if (value > max) {
                    value = max;
                  }
                  appLookUpList.value.forEach(function (element) {
                    if (value >= element.opt2 && value <= element.opt3) {
                      level = element.opt1;
                    }
                  });
                }
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);

                console.log(_context.t0);

              case 12:
                return _context.abrupt("return", level);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      function getSensorLevel(_x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return getSensorLevel;
    }()
  }, {
    key: "getSensorVoltageLevel",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(voltage) {
        var criteria, level;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                criteria = { listName: "batteryVoltageLevels" };
                _context2.next = 3;
                return this.getSensorLevel(voltage, criteria);

              case 3:
                level = _context2.sent;
                return _context2.abrupt("return", level);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSensorVoltageLevel(_x4) {
        return _ref2.apply(this, arguments);
      }

      return getSensorVoltageLevel;
    }()
  }, {
    key: "getSensorRssiLevel",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(rssi) {
        var criteria, level;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (rssi > 0) {
                  rssi *= -1;
                }
                criteria = { listName: "rssiLevels" };
                _context3.next = 4;
                return this.getSensorLevel(rssi, criteria);

              case 4:
                level = _context3.sent;
                return _context3.abrupt("return", level);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getSensorRssiLevel(_x5) {
        return _ref3.apply(this, arguments);
      }

      return getSensorRssiLevel;
    }()
  }]);
  return utils;
}();

var util = new utils();
ServiceLocator.register("utils", util);
module.exports = util;