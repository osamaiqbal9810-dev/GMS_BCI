"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _isJson = require("../../../utilities/isJson");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../../framework/servicelocator");

var turf = require("@turf/turf");

var TaskService = function () {
  function TaskService() {
    (0, _classCallCheck3.default)(this, TaskService);
  }

  (0, _createClass3.default)(TaskService, [{
    key: "getUnitOfMeasurements",
    value: function getUnitOfMeasurements(lineAsset) {
      var uom = "miles";
      if (lineAsset && lineAsset.systemAttributes && lineAsset.systemAttributes.milepostUnit && lineAsset.systemAttributes.milepostUnit.value && typeof lineAsset.systemAttributes.milepostUnit.value === "string") {
        uom = lineAsset.systemAttributes.milepostUnit.value;
      }
      return uom;
    }
  }, {
    key: "createTask",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(receievedObj) {
        var resultObj, taskBelongTo, modelFind, wPlanModel, journeyPlanModel, AssetsModel, plan, locationUnit, taskToPush, updatedPlan;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = {};
                taskBelongTo = receievedObj.type;
                modelFind = void 0;
                wPlanModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                journeyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
                AssetsModel = ServiceLocator.resolve("AssetsModel");

                if (taskBelongTo == "WorkPlan") {
                  modelFind = wPlanModel;
                }
                if (taskBelongTo == "JourneyPlan") {
                  modelFind = journeyPlanModel;
                }

                if (!modelFind) {
                  _context.next = 42;
                  break;
                }

                _context.prev = 9;
                _context.next = 12;
                return modelFind.findById(receievedObj.templateId).exec();

              case 12:
                plan = _context.sent;

                if (!plan) {
                  _context.next = 34;
                  break;
                }

                _context.next = 16;
                return AssetsModel.findById(plan.lineId);

              case 16:
                locationUnit = _context.sent;

                if (!locationUnit) {
                  _context.next = 22;
                  break;
                }

                _context.next = 20;
                return this.calculateTaskData(receievedObj.task, locationUnit);

              case 20:
                taskToPush = _context.sent;

                plan.tasks.push(taskToPush);

              case 22:
                plan.markModified("tasks");
                _context.prev = 23;
                _context.next = 26;
                return plan.save();

              case 26:
                updatedPlan = _context.sent;

                resultObj = { value: updatedPlan, status: 200 };
                _context.next = 34;
                break;

              case 30:
                _context.prev = 30;
                _context.t0 = _context["catch"](23);

                console.log("Error At Saving Plan In createTask : " + _context.t0);
                resultObj = { errorVal: _context.t0, status: 400 }; //err.status };

              case 34:
                _context.next = 40;
                break;

              case 36:
                _context.prev = 36;
                _context.t1 = _context["catch"](9);

                console.log("Error At Finding Plan In createTask : " + _context.t1);
                resultObj = { errorVal: _context.t1, status: 400 }; //error.status };

              case 40:
                _context.next = 44;
                break;

              case 42:
                console.log("Code Error in task.service.js : WorkPlan or JourneyPlan model isnt specified");
                resultObj = { errorVal: 'Internal server error', status: 500 };

              case 44:
                return _context.abrupt("return", resultObj);

              case 45:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 36], [23, 30]]);
      }));

      function createTask(_x) {
        return _ref.apply(this, arguments);
      }

      return createTask;
    }()
  }, {
    key: "updateTask",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(receievedObjTask, templateId) {
        var resultObj, taskBelongTo, modelFind, wPlanModel, journeyPlanModel, plan, resultIndex, updatedPlan;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = {};
                taskBelongTo = receievedObjTask.type;
                modelFind = void 0;
                wPlanModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                journeyPlanModel = ServiceLocator.resolve("JourneyPlanModel");

                if (taskBelongTo == "WorkPlan") {
                  modelFind = wPlanModel;
                }
                if (taskBelongTo == "JourneyPlan") {
                  modelFind = journeyPlanModel;
                }

                if (!modelFind) {
                  _context2.next = 39;
                  break;
                }

                _context2.prev = 8;
                _context2.next = 11;
                return modelFind.findById(templateId).exec();

              case 11:
                plan = _context2.sent;

                if (!plan) {
                  _context2.next = 31;
                  break;
                }

                resultIndex = _lodash2.default.findIndex(plan.tasks, { taskId: receievedObjTask.task.taskId });

                if (!(resultIndex >= 0)) {
                  _context2.next = 30;
                  break;
                }

                plan.tasks[resultIndex] = receievedObjTask.task;
                plan.markModified("tasks");
                _context2.prev = 17;
                _context2.next = 20;
                return plan.save();

              case 20:
                updatedPlan = _context2.sent;

                resultObj = { value: updatedPlan, status: 200 };
                _context2.next = 28;
                break;

              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](17);

                console.log("Error At Saving Plan In createTask : " + _context2.t0);
                resultObj = { errorVal: _context2.t0, status: _context2.t0.status };

              case 28:
                _context2.next = 31;
                break;

              case 30:
                resultObj = { errorVal: "Task Not Found In WorkPlan : " + plan._id, status: 404 };

              case 31:
                _context2.next = 37;
                break;

              case 33:
                _context2.prev = 33;
                _context2.t1 = _context2["catch"](8);

                console.log("Error At Finding Plan In createTask : " + _context2.t1);
                resultObj = { errorVal: _context2.t1, status: _context2.t1.status };

              case 37:
                _context2.next = 41;
                break;

              case 39:
                console.log("Code Error in task.service.js : WorkPlan or JourneyPlan model isnt specified");
                resultObj = { errorVal: "Server Error ", status: 500 };

              case 41:
                return _context2.abrupt("return", resultObj);

              case 42:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 33], [17, 24]]);
      }));

      function updateTask(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return updateTask;
    }()
  }, {
    key: "deleteTask",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(receievedObjTask, templateId) {
        var resultObj, taskBelongTo, modelFind, wPlanModel, journeyPlanModel, plan, resultIndex, updatedPlan;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = {};
                taskBelongTo = receievedObjTask.type;
                modelFind = void 0;
                wPlanModel = ServiceLocator.resolve("WorkPlanTemplateModel");
                journeyPlanModel = ServiceLocator.resolve("JourneyPlanModel");

                if (taskBelongTo == "WorkPlan") {
                  modelFind = wPlanModel;
                }
                if (taskBelongTo == "JourneyPlan") {
                  modelFind = journeyPlanModel;
                }

                if (!modelFind) {
                  _context3.next = 39;
                  break;
                }

                _context3.prev = 8;
                _context3.next = 11;
                return modelFind.findById(templateId).exec();

              case 11:
                plan = _context3.sent;

                if (!plan) {
                  _context3.next = 31;
                  break;
                }

                resultIndex = _lodash2.default.findIndex(plan.tasks, { taskId: receievedObjTask.task.taskId });

                if (!(resultIndex >= 0)) {
                  _context3.next = 30;
                  break;
                }

                _lodash2.default.remove(plan.tasks, { taskId: receievedObjTask.task.taskId });
                plan.markModified("tasks");
                _context3.prev = 17;
                _context3.next = 20;
                return plan.save();

              case 20:
                updatedPlan = _context3.sent;

                resultObj = { value: updatedPlan, status: 200 };
                _context3.next = 28;
                break;

              case 24:
                _context3.prev = 24;
                _context3.t0 = _context3["catch"](17);

                console.log("Error At Saving Plan In createTask : " + _context3.t0);
                resultObj = { errorVal: _context3.t0, status: _context3.t0.status };

              case 28:
                _context3.next = 31;
                break;

              case 30:
                resultObj = { errorVal: "Task Not Found In WorkPlan : " + plan._id, status: 404 };

              case 31:
                _context3.next = 37;
                break;

              case 33:
                _context3.prev = 33;
                _context3.t1 = _context3["catch"](8);

                console.log("Error At Finding Plan In createTask : " + _context3.t1);
                resultObj = { errorVal: _context3.t1, status: _context3.t1.status };

              case 37:
                _context3.next = 41;
                break;

              case 39:
                console.log("Code Error in task.service.js : WorkPlan or JourneyPlan model isnt specified");
                resultObj = { errorVal: "Server Error ", status: 500 };

              case 41:
                return _context3.abrupt("return", resultObj);

              case 42:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 33], [17, 24]]);
      }));

      function deleteTask(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return deleteTask;
    }()
  }, {
    key: "calculateTaskData",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(task, locationUnit) {
        var _unitForTask;

        var workPlanTemplateService, taskToReturn, unitForTask, locationGeoJsonParsed, uom, coordinatesStartEnd, lineGeodata, specialLocationStart, specialLocationEnd;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
                taskToReturn = (0, _extends3.default)({}, task);
                unitForTask = (_unitForTask = {
                  id: locationUnit._id,
                  unitId: locationUnit.unitId,
                  start: locationUnit.start,
                  end: locationUnit.end,
                  coordinates: locationUnit.coordinates,
                  parent_id: locationUnit.parentAsset
                }, (0, _defineProperty3.default)(_unitForTask, "unitId", locationUnit.unitId), (0, _defineProperty3.default)(_unitForTask, "assetType", locationUnit.assetType), _unitForTask);
                locationGeoJsonParsed = (0, _isJson.isJSON)(locationUnit.attributes.geoJsonCord) ? JSON.parse(locationUnit.attributes.geoJsonCord) : null;
                // unit start end calculation

                uom = this.getUnitOfMeasurements(locationUnit);
                _context4.next = 7;
                return workPlanTemplateService.getCoordinatesArray([["", ""], ["", ""]], locationGeoJsonParsed, locationUnit.start, locationUnit.end, locationUnit.start, uom);

              case 7:
                coordinatesStartEnd = _context4.sent;

                unitForTask.coordinates = coordinatesStartEnd;
                // location milepost coordinates
                lineGeodata = turf.lineString(locationGeoJsonParsed.features[0].geometry.coordinates, { name: "line 1" });
                specialLocationStart = task.locationSpecial && task.locationSpecial.start ? parseFloat(task.locationSpecial.start) : 0;
                specialLocationEnd = task.locationSpecial && task.locationSpecial.end ? parseFloat(task.locationSpecial.end) : 0;

                taskToReturn.locationSpecial.lineCords = turf.lineSliceAlong(lineGeodata, specialLocationStart, specialLocationEnd, {
                  units: uom
                });
                taskToReturn.lineCords = lineGeodata;
                taskToReturn.startLoc = turf.along(lineGeodata, specialLocationStart, { units: uom });
                taskToReturn.endLoc = turf.along(lineGeodata, specialLocationEnd, { units: uom });
                taskToReturn.units.push(unitForTask);
                return _context4.abrupt("return", taskToReturn);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function calculateTaskData(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return calculateTaskData;
    }()
  }]);
  return TaskService;
}();

exports.default = TaskService;