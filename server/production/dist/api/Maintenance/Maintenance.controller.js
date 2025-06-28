"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Maintenance = require("./Maintenance.service");

var _Maintenance2 = _interopRequireDefault(_Maintenance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var MaintenanceModel = require("./Maintenance.model");

exports.all = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var resultObj, maintenanceService;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            resultObj = { status: 500, errorVal: "default" };
            _context.prev = 1;
            maintenanceService = ServiceLocator.resolve("MaintenanceService");
            _context.next = 5;
            return maintenanceService.getAll(req.user);

          case 5:
            resultObj = _context.sent;
            _context.next = 13;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

            resultObj.status = 500;
            resultObj.errorVal = _context.t0.toString();
            console.log("Maintenance.controller.all.catch:", _context.t0.toString());

          case 13:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 8]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.show = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var maintenanceService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            maintenanceService = ServiceLocator.resolve("MaintenanceService");
            resultObj = { status: 500, errorVal: "default" };
            _context2.prev = 2;
            _context2.next = 5;
            return maintenanceService.get(req.params.id, req.user);

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

exports.createWeb = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var resultObj, maintenanceService;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            resultObj = void 0, maintenanceService = void 0;

            resultObj = { status: 500, errorVal: "default" };
            maintenanceService = ServiceLocator.resolve("MaintenanceService");
            _context3.prev = 3;
            _context3.next = 6;
            return maintenanceService.createFromWeb(req.body.maintenance, req.user);

          case 6:
            resultObj = _context3.sent;
            _context3.next = 14;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](3);

            resultObj.status = 500;
            resultObj.errorVal = _context3.t0.toString();
            console.log("create Maintenance error", _context3.t0.toString());

          case 14:
            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 9]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

// exports.createByIssue = async function(req, res, next)
// {
//   let resultObj, maintenanceService;
//   resultObj = { status: 500, errorVal: "default" };
//   maintenanceService = ServiceLocator.resolve("MaintenanceService");

//   try
//   {
//     //resultObj = await maintenanceService.createFromWeb(req.body.maintenance, req.user);
//     resultObj = await maintenanceService.createNewMaintenance(req.body.issuesReport, req.user);
//     //console.log('createByIssue', req.body.issuesReport);
//     //resultObj.status=200;

//   }
//   catch (err)
//   {
//     resultObj.status = 500;
//     resultObj.errorVal = err.toString();
//     console.log("create Maintenance by issue error", err.toString());
//   }

//   res.status(resultObj.status);
//   if (resultObj.value) res.json(resultObj.value);
//   else res.json(resultObj.errorVal);
// };

exports.updateWeb = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var resultObj, maintenanceService;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            resultObj = void 0, maintenanceService = void 0;

            resultObj = { status: 500, errorVal: "default" };
            maintenanceService = ServiceLocator.resolve("MaintenanceService");
            _context4.prev = 3;
            _context4.next = 6;
            return maintenanceService.updateFromWeb(req.body);

          case 6:
            resultObj = _context4.sent;
            _context4.next = 14;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](3);

            resultObj.status = 500;
            resultObj.errorVal = _context4.t0.toString();
            console.log("update Maintenance error", _context4.t0.toString());

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
exports.multiLine = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var maintenanceService, resultObj, lines;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            maintenanceService = ServiceLocator.resolve("MaintenanceService");
            resultObj = { status: 500, errorVal: "default" };
            lines = [];

            if (req.query.lines) {
              lines = JSON.parse(req.query.lines);
            }
            _context5.prev = 4;
            _context5.next = 7;
            return maintenanceService.multiLineMaintenance(lines);

          case 7:
            resultObj = _context5.sent;
            _context5.next = 15;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](4);

            resultObj.status = 500;
            resultObj.errorVal = _context5.t0.toString();
            console.log("catch", _context5.t0.toString());

          case 15:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[4, 10]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}