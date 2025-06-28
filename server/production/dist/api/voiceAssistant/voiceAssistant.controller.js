"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");


exports.getSummary = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var VoiceAssistantService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
            _context.next = 3;
            return VoiceAssistantService.extractSensorsSummary(req);

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

exports.getSensorStatus = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var VoiceAssistantService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
            _context2.next = 3;
            return VoiceAssistantService.extractSensorStatus(req.user, req.params.deviceType, req.params.num);

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

exports.getSensorTemperaure = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var VoiceAssistantService, resultObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
            _context3.next = 3;
            return VoiceAssistantService.extractSensorTemperature(req.user, req.params.deviceType, req.params.num);

          case 3:
            resultObj = _context3.sent;

            if (!resultObj.errorVal) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(resultObj.status);
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

exports.getSensorHumidity = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var VoiceAssistantService, resultObj;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
            _context4.next = 3;
            return VoiceAssistantService.extractSensorHumidity(req.user, req.params.deviceType, req.params.num);

          case 3:
            resultObj = _context4.sent;

            if (!resultObj.errorVal) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(resultObj.status);
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

exports.getSensorBattery = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var VoiceAssistantService, resultObj;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            VoiceAssistantService = ServiceLocator.resolve("VoiceAssistantService");
            _context5.next = 3;
            return VoiceAssistantService.extractSensorBattery(req.user, req.params.deviceType, req.params.num);

          case 3:
            resultObj = _context5.sent;

            if (!resultObj.errorVal) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(resultObj.status);
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