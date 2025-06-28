"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../../framework/servicelocator");

exports.create = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var taskService, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            taskService = ServiceLocator.resolve("TaskService");
            _context.next = 3;
            return taskService.createTask(req.body.journeyPlanTask);

          case 3:
            result = _context.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status >= 400 && result.status <= 600)) {
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
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var taskService, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            taskService = ServiceLocator.resolve("TaskService");
            _context2.next = 3;
            return taskService.updateTask(req.body, req.params.id);

          case 3:
            result = _context2.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status >= 400 && result.status <= 600)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.delete = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var taskService, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            taskService = ServiceLocator.resolve("TaskService");
            _context3.next = 3;
            return taskService.deleteTask(req.body, req.params.id);

          case 3:
            result = _context3.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status >= 400 && result.status <= 600)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();