"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var WorkOrderModel = require("./WorkOrder.model");

exports.all = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var workorderService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            workorderService = ServiceLocator.resolve("WorkOrderService");
            resultObj = { status: 500, errorVal: "default" };
            _context.prev = 2;
            _context.next = 5;
            return workorderService.getAll(req.user);

          case 5:
            resultObj = _context.sent;
            _context.next = 13;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);

            resultObj.status = 500;
            resultObj.errorVal = _context.t0.toString();
            console.log("WorkOrder.controller.all.catch", _context.t0.toString());

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
exports.notStarted = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var workorderService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            workorderService = ServiceLocator.resolve("WorkOrderService");
            resultObj = { status: 500, errorVal: "default" };
            _context2.prev = 2;
            _context2.next = 5;
            return workorderService.getNotStarted(req.user);

          case 5:
            resultObj = _context2.sent;
            _context2.next = 13;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);

            resultObj.status = 500;
            resultObj.errorVal = _context2.t0.toString();
            console.log("WorkOrder.controller.all.catch", _context2.t0.toString());

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
exports.show = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var workorderService, resultObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            workorderService = ServiceLocator.resolve("WorkOrderService");
            resultObj = { status: 500, errorVal: "default" };
            _context3.prev = 2;
            _context3.next = 5;
            return workorderService.get(req.params.id, req.user);

          case 5:
            resultObj = _context3.sent;
            _context3.next = 13;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](2);

            resultObj.status = 500;
            resultObj.errorVal = _context3.t0.toString();
            console.log("WorkOrder.controller.show.catch", _context3.t0.toString());

          case 13:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[2, 8]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.create = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var resultObj, workorderService;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            resultObj = void 0;

            resultObj = { status: 500, errorVal: "default" };
            workorderService = ServiceLocator.resolve("WorkOrderService");
            _context4.prev = 3;
            _context4.next = 6;
            return workorderService.create(req.body.workorder, req.user);

          case 6:
            resultObj = _context4.sent;
            _context4.next = 14;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](3);

            resultObj.status = 500;
            resultObj.errorVal = _context4.t0.toString();
            console.log("workorder.controller.create.catch", _context4.t0.toString());

          case 14:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[3, 9]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createByMaintenanceRequest = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var resultObj, workorderService;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            resultObj = void 0;

            resultObj = { status: 500, errorVal: "default" };
            workorderService = ServiceLocator.resolve("WorkOrderService");
            _context5.prev = 3;
            _context5.next = 6;
            return workorderService.createByMaintenanceRequest(req.body.maintenanceRequest, req.user);

          case 6:
            resultObj = _context5.sent;
            _context5.next = 14;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](3);

            resultObj.status = 500;
            resultObj.errorVal = _context5.t0.toString();
            console.log("workorder.controller.createByMaintenanceRequest.catch", _context5.t0.toString());

          case 14:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[3, 9]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    var resultObj, workorderService;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            resultObj = void 0;

            resultObj = { status: 500, errorVal: "default" };
            workorderService = ServiceLocator.resolve("WorkOrderService");
            _context6.prev = 3;
            _context6.next = 6;
            return workorderService.update(req.body, req.user);

          case 6:
            resultObj = _context6.sent;
            _context6.next = 14;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](3);

            resultObj.status = 500;
            resultObj.errorVal = _context6.t0.toString();
            console.log("workorder.controller.update.catch", _context6.t0.toString());

          case 14:
            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[3, 9]]);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
exports.delete = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res, next) {
    var resultObj, workorderService;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            resultObj = void 0;

            resultObj = { status: 500, errorVal: "default" };
            workorderService = ServiceLocator.resolve("WorkOrderService");
            _context7.prev = 3;
            _context7.next = 6;
            return workorderService.delete(req.params.id, req.user);

          case 6:
            resultObj = _context7.sent;
            _context7.next = 14;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](3);

            resultObj.status = 500;
            resultObj.errorVal = _context7.t0.toString();
            console.log("workorder.controller.delete.catch", _context7.t0.toString());

          case 14:
            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[3, 9]]);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
exports.multiLine = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res, next) {
    var workorderService, resultObj, lines;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            workorderService = ServiceLocator.resolve("WorkOrderService");
            resultObj = { status: 500, errorVal: "default" };
            lines = [];

            if (req.query.lines) {
              lines = JSON.parse(req.query.lines);
            }

            _context8.prev = 4;
            _context8.next = 7;
            return workorderService.multiLineMaintenance(lines);

          case 7:
            resultObj = _context8.sent;
            _context8.next = 15;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](4);

            resultObj.status = 500;
            resultObj.errorVal = _context8.t0.toString();
            console.log("workorder.controller.multiLine.catch", _context8.t0.toString());

          case 15:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[4, 10]]);
  }));

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}