"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _sensorsummary = require("./sensorsummary.modal");

var _sensorsummary2 = _interopRequireDefault(_sensorsummary);

var _sensorLog = require("./sensorLog.modal");

var _sensorLog2 = _interopRequireDefault(_sensorLog);

var _sensorReport = require("../sensorReport/sensorReport.modal");

var _sensorReport2 = _interopRequireDefault(_sensorReport);

var _sensorconfig = require("../../config/sensorconfig");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");


exports.getSensorLog = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var SensorLogService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            SensorLogService = ServiceLocator.resolve("SensorLogService");
            _context.next = 3;
            return SensorLogService.getAllSensorLogs(req.query.id);

          case 3:
            resultObj = _context.sent;

            if (!resultObj.errorVal) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(resultObj.status);
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
exports.getAllSensorLog = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var SensorLogService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            SensorLogService = ServiceLocator.resolve("SensorLogService");
            _context2.next = 3;
            return SensorLogService.getAllDeviceLogs();

          case 3:
            resultObj = _context2.sent;

            if (!resultObj.errorVal) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(resultObj.status);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.receiveSensorLog = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var sensorLogService, resultObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sensorLogService = ServiceLocator.resolve("SensorLogService");
            //console.log(sensorLogService);

            _context3.next = 3;
            return sensorLogService.sensorLogReceive(req.body);

          case 3:
            resultObj = _context3.sent;

            if (!resultObj.errorVal) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getFloorStates = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var sensorLogService, resultObj;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sensorLogService = ServiceLocator.resolve("SensorLogService");
            // console.log(sensorLogService);

            _context4.next = 3;
            return sensorLogService.getFloorStateSummary(req);

          case 3:
            resultObj = _context4.sent;

            if (!resultObj.errorVal) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getFloorStatesHourlySummary = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var sensorLogService, resultObj;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            sensorLogService = ServiceLocator.resolve("SensorLogService");
            // console.log(sensorLogService);

            _context5.next = 3;
            return sensorLogService.getSummaryHours(_sensorconfig.timeLimit.hour);

          case 3:
            resultObj = _context5.sent;

            if (!resultObj.errorVal) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getSensorHourlySummary = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var sensorLogService, resultObj;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            sensorLogService = ServiceLocator.resolve("SensorLogService");
            // console.log(sensorLogService);

            _context6.next = 3;
            return sensorLogService.getSensorSummary(req.params.id);

          case 3:
            resultObj = _context6.sent;

            if (!resultObj.errorVal) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.detectSensorDefrostCycles = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var sensorLogService, resultObj;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            sensorLogService = ServiceLocator.resolve("SensorLogService");
            _context7.next = 3;
            return sensorLogService.detectDefrostCycles(req.params.id);

          case 3:
            resultObj = _context7.sent;

            if (!resultObj.errorVal) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getSensorReport = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
    var sensorLogService, resultObj;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            sensorLogService = ServiceLocator.resolve("SensorLogService");
            _context8.next = 3;
            return sensorLogService.getSensorReport(req.body);

          case 3:
            resultObj = _context8.sent;

            if (!resultObj.errorVal) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();