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

var wPlanTemplateApiModelMock = function () {
  function wPlanTemplateApiModelMock() {
    (0, _classCallCheck3.default)(this, wPlanTemplateApiModelMock);

    this.data = null;

    this.sortedData = null;
  }

  (0, _createClass3.default)(wPlanTemplateApiModelMock, [{
    key: "setData",
    value: function setData(data) {
      this.data = data;
    }
  }, {
    key: "setSortedData",
    value: function setSortedData(sortedData) {
      this.sortedData = sortedData;
    }
  }, {
    key: "sort",
    value: function sort(sortCriteria) {
      return this;
    }
  }, {
    key: "find",
    value: function find(obj, sortCallBack) {
      return this;
    }
  }, {
    key: "exec",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(obj, sortCallBack) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.sortedData);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function exec(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return exec;
    }()
  }]);
  return wPlanTemplateApiModelMock;
}();

exports.default = wPlanTemplateApiModelMock;