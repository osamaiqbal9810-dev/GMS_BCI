"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var GpsLogModel = require("./GpsLog.model");

exports.all = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var GpsLogService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            GpsLogService = ServiceLocator.resolve("GpsLogService");
            resultObj = { status: 500, errorVal: "default" };
            _context.prev = 2;
            _context.next = 5;
            return GpsLogService.getAll(req.user, req.params.line ? req.params.line : "");

          case 5:
            resultObj = _context.sent;
            _context.next = 13;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);

            resultObj.status = 500;
            resultObj.errorVal = _context.t0.toString();
            console.log("catch", _context.t0.toString());

          case 13:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.show = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var GpsLogService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            GpsLogService = ServiceLocator.resolve("GpsLogService");
            resultObj = { status: 500, errorVal: "default" };
            _context2.prev = 2;
            _context2.next = 5;
            return GpsLogService.get(req.params.id, req.user);

          case 5:
            resultObj = _context2.sent;
            _context2.next = 13;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);

            resultObj.status = 500;
            resultObj.errorVal = _context2.t0.toString();
            console.log("cathc", _context2.t0.toString());

          case 13:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 8]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}