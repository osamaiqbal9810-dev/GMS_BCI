"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");

var RunService = function () {
  function RunService() {
    (0, _classCallCheck3.default)(this, RunService);
  }

  (0, _createClass3.default)(RunService, [{
    key: "getRuns",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(lineId, user) {
        var resultObj, runModel, runList, criteria, assetService, assetIds;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = {}, runModel = ServiceLocator.resolve("RunModel"), runList = void 0;
                _context.prev = 1;

                //runlist = runModel.find({ runLine: lineId });
                criteria = {};
                assetService = ServiceLocator.resolve("AssetsService");
                _context.next = 6;
                return assetService.getFilteredAssetsIds(user, { plannable: true }, true);

              case 6:
                assetIds = _context.sent;

                criteria.runLineID = { $in: assetIds.assetIds };
                _context.next = 10;
                return runModel.find((0, _extends3.default)({ isRemoved: false }, criteria)).exec();

              case 10:
                runList = _context.sent;

                resultObj = { value: runList, status: 200 };
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);

                resultObj = { errorVal: _context.t0, status: _context.t0.status };

              case 17:
                return _context.abrupt("return", resultObj);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 14]]);
      }));

      function getRuns(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getRuns;
    }()
  }, {
    key: "getLineRun",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(lineId) {
        var resultObj, runModel, runList;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = {}, runModel = ServiceLocator.resolve("RunModel"), runList = void 0;
                _context2.prev = 1;
                _context2.next = 4;
                return runModel.find({ runLineID: lineId, isRemoved: false }).exec();

              case 4:
                runList = _context2.sent;

                resultObj = { value: runList, status: 200 };
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);

                resultObj = { errorVal: _context2.t0, status: _context2.t0.status };

              case 11:
                return _context2.abrupt("return", resultObj);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      function getLineRun(_x3) {
        return _ref2.apply(this, arguments);
      }

      return getLineRun;
    }()
  }, {
    key: "findSingleRun",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
        var resultObj, runModel, runSingle;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = {}, runModel = ServiceLocator.resolve("RunModel"), runSingle = void 0;
                _context3.prev = 1;
                _context3.next = 4;
                return runModel.findById(id).exec();

              case 4:
                runSingle = _context3.sent;

                resultObj = { value: runSingle, status: 200 };
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);

                resultObj = { errorVal: _context3.t0, status: _context3.t0.status };

              case 11:
                return _context3.abrupt("return", resultObj);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function findSingleRun(_x4) {
        return _ref3.apply(this, arguments);
      }

      return findSingleRun;
    }()
  }, {
    key: "createRun",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(run) {
        var resultObj, runModel, runNew, savedRun;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resultObj = {}, runModel = ServiceLocator.resolve("RunModel"), runNew = void 0, savedRun = void 0;
                _context4.prev = 1;

                runNew = new runModel(run);
                _context4.next = 5;
                return runNew.save();

              case 5:
                savedRun = _context4.sent;

                resultObj = { value: savedRun, status: 200 };
                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);

                resultObj = { errorVal: _context4.t0, status: _context4.t0.status };

              case 12:
                return _context4.abrupt("return", resultObj);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 9]]);
      }));

      function createRun(_x5) {
        return _ref4.apply(this, arguments);
      }

      return createRun;
    }()
  }, {
    key: "createRunRange",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(run_id, runRange) {
        var resultObj, runModel, runUpdated, savedRun, run, updatedRun;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                resultObj = {}, runModel = ServiceLocator.resolve("RunModel"), runUpdated = void 0, savedRun = void 0;
                _context5.prev = 1;
                _context5.next = 4;
                return runModel.findById(run_id).exec();

              case 4:
                run = _context5.sent;

                if (!run) {
                  _context5.next = 14;
                  break;
                }

                run.runRange.push(runRange);
                run.markModified("runRange");

                _context5.next = 10;
                return run.save();

              case 10:
                updatedRun = _context5.sent;

                resultObj = { value: updatedRun, status: 200 };
                _context5.next = 15;
                break;

              case 14:
                resultObj = { errorVal: "Run Not Found", status: 400 };

              case 15:
                _context5.next = 21;
                break;

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](1);

                console.log("Error In createRange : " + _context5.t0);
                resultObj = { errorVal: _context5.t0, status: _context5.t0.status };

              case 21:
                return _context5.abrupt("return", resultObj);

              case 22:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 17]]);
      }));

      function createRunRange(_x6, _x7) {
        return _ref5.apply(this, arguments);
      }

      return createRunRange;
    }()
  }, {
    key: "updateRunRange",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(runId, rangeId, rangeDataToUpdate) {
        var resultObj, runModel, runUpdated, savedRun, run, index, range, r, updatedRun, workPlanTemplateService;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                resultObj = {}, runModel = ServiceLocator.resolve("RunModel"), runUpdated = void 0, savedRun = void 0;
                _context6.prev = 1;
                _context6.next = 4;
                return runModel.findById(runId).exec();

              case 4:
                run = _context6.sent;

                if (!run) {
                  _context6.next = 24;
                  break;
                }

                //run.runRange.push(runRange);
                index = -1;
                range = run.runRange.find(function (r, i) {
                  index = i;
                  return r.id === rangeId;
                });

                if (!(index == -1 || !range)) {
                  _context6.next = 12;
                  break;
                }

                resultObj = { errorVal: "Id:" + rangeId + " range not found", status: 400 };
                _context6.next = 22;
                break;

              case 12:
                r = Object.assign(run.runRange[index], rangeDataToUpdate);
                // r.geoJsonCord = rangeDataToUpdate.geoJsonCord;
                // r.start = rangeDataToUpdate.start;
                // r.end = rangeDataToUpdate.end;
                // r.mpStart = rangeDataToUpdate.mpStart;
                // r.mpEnd = rangeDataToUpdate.mpEnd;

                run.runRange[index] = r;

                run.markModified("runRange");
                _context6.next = 17;
                return run.save();

              case 17:
                updatedRun = _context6.sent;
                workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
                _context6.next = 21;
                return workPlanTemplateService.updateWorkplanTemplatesForRunRange(updatedRun.runRange[index]);

              case 21:

                resultObj = { value: updatedRun, status: 200 };

              case 22:
                _context6.next = 25;
                break;

              case 24:
                resultObj = { errorVal: "Run Not Found", status: 400 };

              case 25:
                _context6.next = 31;
                break;

              case 27:
                _context6.prev = 27;
                _context6.t0 = _context6["catch"](1);

                console.log("run.service.updateRunRange.catch" + _context6.t0);
                resultObj = { errorVal: _context6.t0, status: _context6.t0.status };

              case 31:
                return _context6.abrupt("return", resultObj);

              case 32:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 27]]);
      }));

      function updateRunRange(_x8, _x9, _x10) {
        return _ref6.apply(this, arguments);
      }

      return updateRunRange;
    }()
  }, {
    key: "getLineRuns",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var resultObj, runModel, runList;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                resultObj = {}, runModel = ServiceLocator.resolve("RunModel"), runList = void 0;
                _context7.prev = 1;
                _context7.next = 4;
                return runModel.find({}).exec();

              case 4:
                runList = _context7.sent;

                resultObj = { value: runList, status: 200 };
                _context7.next = 11;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](1);

                resultObj = { errorVal: _context7.t0, status: _context7.t0.status };

              case 11:
                return _context7.abrupt("return", resultObj);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 8]]);
      }));

      function getLineRuns() {
        return _ref7.apply(this, arguments);
      }

      return getLineRuns;
    }()
  }]);
  return RunService;
}();

exports.default = RunService;