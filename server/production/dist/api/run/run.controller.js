"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var runModal = require("./run.model");
exports.all = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var RunService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //console.log("Assets Controller all ");
            RunService = ServiceLocator.resolve("LineRunService");
            _context.next = 3;
            return RunService.getRuns(req.query.lineName, req.user);

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

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.create = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var RunService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            RunService = ServiceLocator.resolve("LineRunService");
            _context2.next = 3;
            return RunService.createRun(req.body.runNumber);

          case 3:
            resultObj = _context2.sent;

            if (!resultObj.errorVal) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.read = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var RunService, resultObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            RunService = ServiceLocator.resolve("LineRunService");
            _context3.next = 3;
            return RunService.findSingleRun(req.params.id);

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

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.lineRuns = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var RunService, resultObj;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //console.log("Assets Controller all ");
            RunService = ServiceLocator.resolve("LineRunService");
            _context4.next = 3;
            return RunService.getLineRuns();

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

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.delete = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var RunService, resultObj, runToRemove;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            RunService = ServiceLocator.resolve("LineRunService");
            _context5.next = 3;
            return RunService.findSingleRun(req.params.id);

          case 3:
            resultObj = _context5.sent;

            if (!resultObj.errorVal) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            runToRemove = resultObj.value;

            if (!runToRemove) {
              res.status(404);
              res.json("Not found");
            } else {
              if (!runToRemove.runRanges || runToRemove.runRanges.length === 0) {
                runToRemove.isRemoved = true;
                runToRemove.save(function () {
                  res.status(200);
                  res.json("Success");
                });
                /*       runToRemove.remove(()=>{
                  res.status(200);
                  res.json('Success');
                });
                */
              } else {
                res.status(500);
                res.json("Run not empty");
              }
            }

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();