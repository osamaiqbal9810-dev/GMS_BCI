"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var WorkOrderModel = require("./WorkOrder.model");
var UserModel = require("../user/user.model");
var ObjectId = require("mongodb").ObjectID;
var _ = require("lodash");

var WorkOrderService = function () {
  function WorkOrderService() {
    (0, _classCallCheck3.default)(this, WorkOrderService);
  }

  (0, _createClass3.default)(WorkOrderService, [{
    key: "makeNewCode",
    value: function makeNewCode(prefix, separator, startNumber, length, currentMax) {
      var utils = ServiceLocator.resolve("utils");
      //let number = 1, len = 4;
      var mcode = prefix + separator + utils.assureDigits(length, startNumber); //"MR#0001";

      //if (ment1 && ment1.length > 0 && ment1[0].mrNumber) mwocode = ment1[0].mrNumber;
      if (currentMax && typeof currentMax == "string" && currentMax.length > length) {
        mcode = currentMax;
      }

      if (mcode.includes(separator) && parseInt(mcode.split(separator)[1]) != NaN) {
        var s = mcode.split(separator)[1];
        length = s.length;
        startNumber = parseInt(s);
        if (startNumber.toString().length < (startNumber + 1).toString().length && s[0] != "0") length++;

        startNumber++;
      }

      var newCode = prefix + separator + utils.assureDigits(length, startNumber.toString());

      return newCode;
    }
  }, {
    key: "createNewMWONumber",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var utils, wo1, mwocode;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                utils = ServiceLocator.resolve("utils");
                _context.next = 3;
                return WorkOrderModel.find().sort({ mwoNumber: -1 }).limit(1).exec();

              case 3:
                wo1 = _context.sent;
                mwocode = "MWO#0001";

                if (wo1 && wo1.length > 0 && wo1[0].mwoNumber) mwocode = wo1[0].mwoNumber;

                mwocode = this.makeNewCode("MWO", "#", 1, 4, mwocode);

                return _context.abrupt("return", mwocode);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createNewMWONumber() {
        return _ref.apply(this, arguments);
      }

      return createNewMWONumber;
    }()
  }, {
    key: "create",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(workOrder, user) {
        var resultObj, newMwoCode, assignedUser, mwo1, result, maintenanceService;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = { value: "default", status: 200 };
                _context2.prev = 1;

                if (!workOrder.mwoNumber) {
                  _context2.next = 5;
                  break;
                }

                resultObj = { errorVal: "mwoNumber already assigned, cannot create WO", status: 500 };
                return _context2.abrupt("return", resultObj);

              case 5:
                if (!(workOrder.locationId && workOrder.locationName && user)) {
                  _context2.next = 34;
                  break;
                }

                _context2.next = 8;
                return this.createNewMWONumber();

              case 8:
                newMwoCode = _context2.sent;
                assignedUser = {};

                if (!(workOrder.assignedTo !== undefined && workOrder.assignedTo.id)) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 13;
                return UserModel.findOne({ _id: workOrder.assignedTo.id });

              case 13:
                assignedUser = _context2.sent;

                assignedUser = { id: assignedUser._id, name: assignedUser.name, email: assignedUser.email };

              case 15:
                mwo1 = {
                  tenantId: user.tenantId,
                  locationId: workOrder.locationId,
                  locationName: workOrder.locationName,
                  estimate: workOrder.estimate,
                  description: workOrder.description ? workOrder.description : "",
                  maintenanceRequests: workOrder.maintenanceRequests ? workOrder.maintenanceRequests : [],
                  priority: workOrder.priority,
                  dueDate: workOrder.dueDate,
                  createdBy: { id: user._id, name: user.name, email: user.email },
                  assignedTo: assignedUser,

                  status: workOrder.dueDate ? "Planned" : "New",
                  mwoNumber: newMwoCode
                };

                if (!mwo1.dueDate) {
                  _context2.next = 20;
                  break;
                }

                _context2.next = 19;
                return this.applyTimezone(mwo1.dueDate, workOrder.locationId);

              case 19:
                mwo1.dueDate = _context2.sent;

              case 20:
                _context2.next = 22;
                return WorkOrderModel.create(mwo1);

              case 22:
                result = _context2.sent;

                if (!result) {
                  _context2.next = 31;
                  break;
                }

                maintenanceService = ServiceLocator.resolve("MaintenanceService");

                if (!(mwo1.maintenanceRequests.length > 0)) {
                  _context2.next = 31;
                  break;
                }

                _context2.next = 28;
                return maintenanceService.setWorkOrderNumber(mwo1.maintenanceRequests, mwo1.mwoNumber);

              case 28:
                if (!(mwo1.status !== "New")) {
                  _context2.next = 31;
                  break;
                }

                _context2.next = 31;
                return maintenanceService.setMRsFields(mwo1.maintenanceRequests, { status: mwo1.status, dueDate: mwo1.dueDate });

              case 31:
                resultObj = { value: result, status: 200 };
                _context2.next = 35;
                break;

              case 34:
                resultObj = { errorVal: "locationId, locationName and user are required", status: 500 };

              case 35:
                _context2.next = 41;
                break;

              case 37:
                _context2.prev = 37;
                _context2.t0 = _context2["catch"](1);

                resultObj = { errorVal: _context2.t0.toString(), status: 500 };
                console.log("workorder.service.create.catch:", _context2.t0.toString());

              case 41:
                return _context2.abrupt("return", resultObj);

              case 42:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 37]]);
      }));

      function create(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return create;
    }()

    // async createByMaintenanceRequest(maintenanceRequest, user) {
    //   let resultObj = { value: "Ok", status: 200 };

    //   try {
    //     if (maintenanceRequest && maintenanceRequest.mrCode) {
    //       let newMwoCode = await this.createNewMWONumber();
    //       let locationId = maintenanceRequest.lineId;
    //       let locationName = maintenanceRequest.lineName;

    //       let mwo1 = {
    //         tenantId: maintenanceRequest.tenantId ? maintenanceRequest.tenantId : user.tenantId,
    //         locationId: locationId,
    //         locationName: locationName,
    //         description: "",
    //         maintenanceRequests: [maintenanceRequest.mrNumber],
    //         priority: maintenanceRequest.priority,

    //         createdBy: { id: user._id, name: user.name, email: user.email },

    //         status: "New",
    //         mwoNumber: newMwoCode,
    //       };

    //       let result = await WorkOrderModel.create(mwo1);
    //       if (result) {
    //         // Change MaintenanceRequest's status to 'WorkOrderCreated'
    //         maintenanceRequest.status = "WorkOrderCreated";
    //         maintenanceRequest.workOrderId = result._id;
    //         // maintenanceRequest.save(); // would this be a model ?
    //       }
    //       resultObj = { value: result, status: 200 };
    //     } else {
    //       resultObj = { value: "Invalid maintenance request", status: 404 };
    //     }
    //   } catch (err) {
    //     resultObj = { errorVal: err.toString(), status: 500 };
    //     console.log("workorder.service.createByMaintenanceRequest.catch:", err.toString());
    //   }

    //   return resultObj;
    // }

  }, {
    key: "getAll",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(user) {
        var resultObj, criteria, assetsService, assetIds, workOrders;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = { errorVal: "default", status: 500 };
                _context3.prev = 1;
                criteria = {}; //{ lineId: lineid };
                // let assetTreeService = ServiceLocator.resolve("AssetsTreeService");
                // let result = await assetTreeService.getPlannableLocations(user);
                // let plannableLocations = result.value ? result.value : [];

                assetsService = ServiceLocator.resolve("AssetsService");
                _context3.next = 6;
                return assetsService.getFilteredAssetsIds(user, { plannable: true, location: true }, true);

              case 6:
                assetIds = _context3.sent;


                if (assetIds.assetIds) {
                  criteria.locationId = { $in: assetIds.assetIds };
                }

                _context3.next = 10;
                return WorkOrderModel.find(criteria);

              case 10:
                workOrders = _context3.sent;

                resultObj = { value: workOrders, status: 200 };
                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](1);

                resultObj = { errorVal: _context3.t0.toString(), status: 500 };
                console.log("workorder.service.getAll.catch", _context3.t0.toString());

              case 18:
                return _context3.abrupt("return", resultObj);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 14]]);
      }));

      function getAll(_x3) {
        return _ref3.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getNotStarted",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(user) {
        var resultObj, criteria, assetTreeService, result, plannableLocations, workOrders;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resultObj = { errorVal: "default", status: 500 };
                _context4.prev = 1;
                criteria = { status: { $in: ["New", "Planned"] } }; //{ lineId: lineid };

                assetTreeService = ServiceLocator.resolve("AssetsTreeService");
                _context4.next = 6;
                return assetTreeService.getPlannableLocations(user);

              case 6:
                result = _context4.sent;
                plannableLocations = result.value ? result.value : [];


                criteria.locationId = { $in: plannableLocations };
                _context4.next = 11;
                return WorkOrderModel.find(criteria);

              case 11:
                workOrders = _context4.sent;

                resultObj = { value: workOrders, status: 200 };
                _context4.next = 19;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](1);

                resultObj = { errorVal: _context4.t0.toString(), status: 500 };
                console.log("workorder.service.getAll.catch", _context4.t0.toString());

              case 19:
                return _context4.abrupt("return", resultObj);

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 15]]);
      }));

      function getNotStarted(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getNotStarted;
    }()
  }, {
    key: "get",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id, user) {
        var resultObj, criteria, assetTreeService, maintenanceService, result, plannableLocations, workorder, res;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                resultObj = { errorVal: "default", status: 500 }, criteria = { _id: id };
                _context5.prev = 1;
                assetTreeService = ServiceLocator.resolve("AssetsTreeService");
                maintenanceService = ServiceLocator.resolve("MaintenanceService");
                _context5.next = 6;
                return assetTreeService.getPlannableLocations(user);

              case 6:
                result = _context5.sent;
                plannableLocations = result.value ? result.value : [];


                criteria.locationId = { $in: plannableLocations };

                _context5.next = 11;
                return WorkOrderModel.findOne(criteria);

              case 11:
                workorder = _context5.sent;
                _context5.next = 14;
                return maintenanceService.getByMRNoList(workorder.maintenanceRequests, user, true);

              case 14:
                res = _context5.sent;


                if (res && res.value) workorder.maintenanceRequests = res.value;

                resultObj = { value: workorder, status: 200 };
                _context5.next = 23;
                break;

              case 19:
                _context5.prev = 19;
                _context5.t0 = _context5["catch"](1);

                resultObj = { errorVal: _context5.t0.toString(), status: 500 };
                console.log("workorder.service.get.catch", _context5.t0.toString());

              case 23:
                return _context5.abrupt("return", resultObj);

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 19]]);
      }));

      function get(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(workOrder, user) {
        var resultObj, woToUpdate, mrsToInclude, mrsToExclude, maintenanceService, estimateToInclude, estimateToExclude, _maintenanceService, desiredStatus, _maintenanceService2, _desiredStatus, _maintenanceService3, _desiredStatus2, _maintenanceService4, assignedUser, updatedWo;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                resultObj = { errorVal: "default", status: 500 };
                _context6.prev = 1;
                woToUpdate = null;

                if (!workOrder._id) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 6;
                return WorkOrderModel.findOne({ _id: workOrder._id }).exec();

              case 6:
                woToUpdate = _context6.sent;
                _context6.next = 12;
                break;

              case 9:
                _context6.next = 11;
                return WorkOrderModel.findOne({ mwoNumber: workOrder.mwoNumber }).exec();

              case 11:
                woToUpdate = _context6.sent;

              case 12:
                if (!woToUpdate) {
                  _context6.next = 80;
                  break;
                }

                if (!(workOrder.maintenanceRequests && Array.isArray(workOrder.maintenanceRequests))) {
                  _context6.next = 24;
                  break;
                }

                // set old maintenanceRequests free, and set new maintenanceRequests to this WO
                mrsToInclude = _.difference(workOrder.maintenanceRequests, woToUpdate.maintenanceRequests);
                mrsToExclude = _.difference(woToUpdate.maintenanceRequests, workOrder.maintenanceRequests);
                maintenanceService = ServiceLocator.resolve("MaintenanceService");

                if (!(mrsToInclude.length > 0)) {
                  _context6.next = 20;
                  break;
                }

                _context6.next = 20;
                return maintenanceService.setWorkOrderNumber(mrsToInclude, workOrder.mwoNumber);

              case 20:
                if (!(mrsToExclude.length > 0)) {
                  _context6.next = 23;
                  break;
                }

                _context6.next = 23;
                return maintenanceService.setWorkOrderNumber(mrsToExclude, null);

              case 23:

                woToUpdate.maintenanceRequests = workOrder.maintenanceRequests;

                // console.log('exclude', mrsToExclude, ' - ', 'include:', mrsToInclude);

              case 24:
                if (!(workOrder.maintenanceRequests && Array.isArray(workOrder.maintenanceRequests))) {
                  _context6.next = 35;
                  break;
                }

                // set old estimate free, and set new estimate to this WO
                estimateToInclude = _.difference(workOrder.estimate, woToUpdate.estimate);
                estimateToExclude = _.difference(woToUpdate.estimate, workOrder.estimate);
                _maintenanceService = ServiceLocator.resolve("MaintenanceService");

                if (!(estimateToInclude.length > 0)) {
                  _context6.next = 31;
                  break;
                }

                _context6.next = 31;
                return _maintenanceService.setWorkOrderNumber(estimateToInclude, workOrder.mwoNumber);

              case 31:
                if (!(estimateToExclude.length > 0)) {
                  _context6.next = 34;
                  break;
                }

                _context6.next = 34;
                return _maintenanceService.setWorkOrderNumber(estimateToExclude, null);

              case 34:

                woToUpdate.estimate = workOrder.estimate;

                // console.log('exclude', estimateToExclude, ' - ', 'include:', estimateToInclude);

              case 35:
                if (!((woToUpdate.status === "New" || woToUpdate.status === "Planned") && workOrder.dueDate)) {
                  _context6.next = 46;
                  break;
                }

                // if dueDate, assignedTo and priority are added, change status to 'Planned'
                desiredStatus = "Planned";
                _context6.next = 39;
                return this.applyTimezone(workOrder.dueDate, woToUpdate.locationId);

              case 39:
                woToUpdate.dueDate = _context6.sent;

                woToUpdate.status = desiredStatus;

                _maintenanceService2 = ServiceLocator.resolve("MaintenanceService");
                _context6.next = 44;
                return _maintenanceService2.setMRsFields(woToUpdate.maintenanceRequests, { status: desiredStatus, dueDate: workOrder.dueDate });

              case 44:
                _context6.next = 66;
                break;

              case 46:
                if (!(woToUpdate.status === "Planned" && workOrder.executionDate)) {
                  _context6.next = 57;
                  break;
                }

                // set execution date
                // set status to 'InProgress'
                _desiredStatus = "In Progress";
                _context6.next = 50;
                return this.applyTimezone(workOrder.executionDate, woToUpdate.locationId);

              case 50:
                woToUpdate.executionDate = _context6.sent;

                woToUpdate.status = _desiredStatus;

                _maintenanceService3 = ServiceLocator.resolve("MaintenanceService");
                _context6.next = 55;
                return _maintenanceService3.setMRsFields(woToUpdate.maintenanceRequests, {
                  status: _desiredStatus,
                  executionDate: workOrder.executionDate
                });

              case 55:
                _context6.next = 66;
                break;

              case 57:
                if (!(woToUpdate.status === "In Progress" && workOrder.closedDate)) {
                  _context6.next = 66;
                  break;
                }

                // set closedDate and status='Closed'
                _desiredStatus2 = "Closed";
                _context6.next = 61;
                return this.applyTimezone(workOrder.closedDate, woToUpdate.locationId);

              case 61:
                woToUpdate.closedDate = _context6.sent;


                woToUpdate.status = _desiredStatus2;
                _maintenanceService4 = ServiceLocator.resolve("MaintenanceService");
                _context6.next = 66;
                return _maintenanceService4.setMRsFields(woToUpdate.maintenanceRequests, {
                  status: _desiredStatus2,
                  closedDate: workOrder.closedDate
                });

              case 66:

                if (workOrder.description && workOrder.description !== "" && woToUpdate.description !== workOrder.description) woToUpdate.description = workOrder.description;

                if (workOrder.priority && workOrder.priority !== "" && woToUpdate.priority !== workOrder.priority) woToUpdate.priority = workOrder.priority;

                assignedUser = {};

                if (!(workOrder.assignedTo !== undefined && workOrder.assignedTo.id)) {
                  _context6.next = 74;
                  break;
                }

                _context6.next = 72;
                return UserModel.findOne({ _id: workOrder.assignedTo.id });

              case 72:
                assignedUser = _context6.sent;

                woToUpdate.assignedTo = { id: assignedUser._id, name: assignedUser.name, email: assignedUser.email };

              case 74:
                _context6.next = 76;
                return woToUpdate.save();

              case 76:
                updatedWo = _context6.sent;

                resultObj = { value: updatedWo, status: 200 };
                _context6.next = 81;
                break;

              case 80:
                resultObj = { errorVal: "Not Found", status: 404 };

              case 81:
                _context6.next = 87;
                break;

              case 83:
                _context6.prev = 83;
                _context6.t0 = _context6["catch"](1);

                resultObj = { errorVal: _context6.t0.toString(), status: 500 };
                console.log("workorder.service.update.catch", _context6.t0.toString());

              case 87:
                return _context6.abrupt("return", resultObj);

              case 88:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 83]]);
      }));

      function update(_x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(id, user) {
        var resultObj, criteria, woToDelete, maintenanceService, res;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                resultObj = { errorVal: "default", status: 500 }, criteria = { _id: id };
                _context7.prev = 1;
                _context7.next = 4;
                return WorkOrderModel.findOne(criteria);

              case 4:
                woToDelete = _context7.sent;

                if (!woToDelete) {
                  _context7.next = 15;
                  break;
                }

                maintenanceService = ServiceLocator.resolve("MaintenanceService");
                _context7.next = 9;
                return maintenanceService.setWorkOrderNumber(woToDelete.maintenanceRequests, null);

              case 9:
                _context7.next = 11;
                return WorkOrderModel.remove(criteria);

              case 11:
                res = _context7.sent;

                resultObj = { value: res, status: 200 };
                _context7.next = 16;
                break;

              case 15:
                resultObj = { errorVal: "Could not find the workorder", status: 404 };

              case 16:
                _context7.next = 22;
                break;

              case 18:
                _context7.prev = 18;
                _context7.t0 = _context7["catch"](1);

                resultObj = { errorVal: _context7.t0.toString(), status: 500 };
                console.log("workorder.service.delete.catch", _context7.t0.toString());

              case 22:
                return _context7.abrupt("return", resultObj);

              case 23:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 18]]);
      }));

      function _delete(_x9, _x10) {
        return _ref7.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "applyTimezone",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(date, locationId) {
        var assetService, timezone, dayBasedLocalDate;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // apply plannable location asset's timezone to the startDate to make it 00:00 AM of local time to that particular location
                assetService = ServiceLocator.resolve("AssetsService");
                _context8.next = 3;
                return assetService.getTimezone(locationId);

              case 3:
                timezone = _context8.sent;

                if (!timezone) {
                  _context8.next = 13;
                  break;
                }

                if (!_momentTimezone2.default.tz.zone(timezone)) {
                  _context8.next = 10;
                  break;
                }

                // verify if the timezone id is valid, todo: validate date too.
                dayBasedLocalDate = _momentTimezone2.default.tz(new Date(date).toISOString().slice(0, 10), timezone).toDate();
                return _context8.abrupt("return", dayBasedLocalDate);

              case 10:
                console.log("could not found timezone id", timezone);

              case 11:
                _context8.next = 14;
                break;

              case 13:
                // todo: log warning here
                console.log("WorkOrder.service.applyTimezone: Warning: Time zone information not available for", locationId, " using UTC");

              case 14:
                return _context8.abrupt("return", date);

              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function applyTimezone(_x11, _x12) {
        return _ref8.apply(this, arguments);
      }

      return applyTimezone;
    }()
  }]);
  return WorkOrderService;
}();

exports.default = WorkOrderService;