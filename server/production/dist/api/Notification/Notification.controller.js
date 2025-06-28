"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");

exports.loggedInUserNotifications = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var notificationService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            notificationService = ServiceLocator.resolve("NotificationService");
            resultObj = { status: 500, errorVal: "default" };
            _context.prev = 2;
            _context.next = 5;
            return notificationService.pullNotificationForUser(req.user._id);

          case 5:
            resultObj.value = _context.sent;

            resultObj.status = 200;
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);

            resultObj.status = 500;
            resultObj.errorVal = _context.t0.toString();
            console.log("Notification.controller.all.catch", _context.t0.toString());

          case 14:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, notificationId, status, notificationService, resultObj;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, notificationId = _req$body.notificationId, status = _req$body.status;
            notificationService = ServiceLocator.resolve("NotificationService");
            resultObj = { status: 500, errorVal: "default" };
            _context2.prev = 3;
            _context2.next = 6;
            return notificationService.updateStatus(notificationId, status);

          case 6:
            resultObj = _context2.sent;
            _context2.next = 14;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](3);

            resultObj.status = 500;
            resultObj.errorVal = _context2.t0.toString();
            console.log("Notification.controller.all.catch", _context2.t0.toString());

          case 14:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj);else res.json(resultObj.errorVal);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[3, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.delete = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var _id, notificationService, resultObj;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.body._id;
            notificationService = ServiceLocator.resolve("NotificationService");
            resultObj = { status: 500, errorVal: "default" };
            _context3.prev = 3;
            _context3.next = 6;
            return notificationService.delete(_id);

          case 6:
            resultObj = _context3.sent;
            _context3.next = 14;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](3);

            resultObj.status = 500;
            resultObj.errorVal = _context3.t0.toString();
            console.log("Notification.controller.all.catch", _context3.t0.toString());

          case 14:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj);else res.json(resultObj.errorVal);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();