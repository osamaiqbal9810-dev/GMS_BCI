"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../../framework/servicelocator");

exports.getReportFilter = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var testScheduleService, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            testScheduleService = ServiceLocator.resolve("TestScheduleService");
            _context.next = 3;
            return testScheduleService.getReportFilter(req.query);

          case 3:
            result = _context.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();