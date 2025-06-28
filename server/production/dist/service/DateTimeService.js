"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimeService = function () {
  function DateTimeService() {
    (0, _classCallCheck3.default)(this, DateTimeService);

    this.nowTime = null;
  }

  (0, _createClass3.default)(DateTimeService, [{
    key: "getNowTime",
    value: function getNowTime() {
      var tToReturn = null;
      if (this.nowTime) {
        tToReturn = this.nowTime;
        this.nowTime = null;
      } else {
        tToReturn = Date.now();
      }
      return tToReturn;
    }
  }, {
    key: "setNowTime",
    value: function setNowTime(t) {
      this.nowTime = t;
    }
  }]);
  return DateTimeService;
}();

exports.default = DateTimeService;