"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _sensorReport = require("./sensorReport.modal");

var _sensorReport2 = _interopRequireDefault(_sensorReport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");


exports.getSensorReport = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var SensorReportService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            SensorReportService = ServiceLocator.resolve("SensorReportService");
            _context.next = 3;
            return SensorReportService.getSensorReport(req.body);

          case 3:
            resultObj = _context.sent;

            if (!resultObj.errorVal) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();