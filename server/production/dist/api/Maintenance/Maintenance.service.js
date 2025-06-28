"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var MaintenanceModel = require("./Maintenance.model");
var ObjectId = require("mongodb").ObjectID;
var _ = require("lodash");

var MaintenanceService = function () {
  function MaintenanceService() {
    (0, _classCallCheck3.default)(this, MaintenanceService);
  }

  (0, _createClass3.default)(MaintenanceService, [{
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
    key: "workOrderNumberCreator",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var utils, ment1, mrcode;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                utils = ServiceLocator.resolve("utils");
                _context.next = 3;
                return MaintenanceModel.find().sort({ workOrderNumber: -1 }).limit(1).exec();

              case 3:
                ment1 = _context.sent;
                mrcode = "MWO#0001";

                if (ment1 && ment1.length > 0 && ment1[0].workOrderNumber) mrcode = ment1[0].workOrderNumber;

                mrcode = this.makeNewCode("MWO", "#", 1, 4, mrcode);

                return _context.abrupt("return", mrcode);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function workOrderNumberCreator() {
        return _ref.apply(this, arguments);
      }

      return workOrderNumberCreator;
    }()
  }, {
    key: "maintainenceReqNumberCreator",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var utils, ment1, mrcode;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                utils = ServiceLocator.resolve("utils");
                _context2.next = 3;
                return MaintenanceModel.find().sort({ mrNumber: -1 }).limit(1).exec();

              case 3:
                ment1 = _context2.sent;
                mrcode = "MR#0001";

                if (ment1 && ment1.length > 0 && ment1[0].mrNumber) mrcode = ment1[0].mrNumber;

                mrcode = this.makeNewCode("MR", "#", 1, 4, mrcode);

                return _context2.abrupt("return", mrcode);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function maintainenceReqNumberCreator() {
        return _ref2.apply(this, arguments);
      }

      return maintainenceReqNumberCreator;
    }()
  }, {
    key: "createNewMaintenanceFromIssue",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(issue, user, inspection) {
        var maintenanceCreated, inspectionId, wPlanTemplate, utils, assetService, inspectionRun, newMrCode, wpt, lineId, lineasset, lineName, subdivision, maint1, start, end, savedMaintenance;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                maintenanceCreated = null;
                _context3.prev = 1;

                if (!(issue && user && issue.planId)) {
                  _context3.next = 31;
                  break;
                }

                //inspectionRun)
                inspectionId = issue.planId; //

                wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
                utils = ServiceLocator.resolve("utils");
                assetService = ServiceLocator.resolve("AssetsService");
                inspectionRun = inspection.workplanTemplateId;
                _context3.next = 10;
                return this.maintainenceReqNumberCreator();

              case 10:
                newMrCode = _context3.sent;
                _context3.next = 13;
                return wPlanTemplate.findOne({ _id: inspectionRun }).exec();

              case 13:
                wpt = _context3.sent;
                lineId = wpt.lineId;
                _context3.next = 17;
                return assetService.find(lineId);

              case 17:
                lineasset = _context3.sent;

                lineasset = lineasset.value ? lineasset.value : null;
                lineName = lineasset ? lineasset.unitId : "";
                _context3.next = 22;
                return this.getLineSubdivision(lineId);

              case 22:
                subdivision = _context3.sent;


                // subdivision: wpt.subdivision ? wpt.subdivision : inspection.subdivision ? inspection.subdivision : '';

                maint1 = {
                  tenantId: user.tenantId,
                  lineId: lineId,
                  lineName: lineName ? lineName : "",
                  mrNumber: newMrCode,
                  description: issue.description,
                  images: issue.imgList ? [].concat((0, _toConsumableArray3.default)(issue.imgList)) : [],
                  voices: issue.voiceList ? [].concat((0, _toConsumableArray3.default)(issue.voiceList)) : [],
                  coordinates: issue.location,
                  location: this.addLocation([], issue.location, "GPS"),
                  markedOnSite: issue.marked,
                  priority: issue.priority,
                  asset: issue.unit,
                  sourceType: "app-issue",
                  createdBy: { id: user.id, name: user.name, email: user.email },
                  inspectionRun: inspectionRun,
                  inspection: inspectionId,
                  timestamp: issue.timeStamp,
                  status: "New",
                  defectCodes: issue.defectCodes,
                  attributes: {},
                  maintenanceType: issue.maintenanceType ? issue.maintenanceType : "other",
                  subdivision: subdivision
                };

                if (issue.startMP && issue.endMP) {
                  start = utils.toFixed(issue.startMP);
                  end = utils.toFixed(issue.endMP);

                  maint1.location.push({ start: start, end: end, type: "Milepost" });
                }
                _context3.next = 27;
                return MaintenanceModel.create(maint1);

              case 27:
                savedMaintenance = _context3.sent;

                if (savedMaintenance) {
                  maintenanceCreated = savedMaintenance;
                }
                _context3.next = 31;
                break;

              case 31:
                _context3.next = 37;
                break;

              case 33:
                _context3.prev = 33;
                _context3.t0 = _context3["catch"](1);

                maintenanceCreated = null;
                console.log("maintenance.service.createNewMaintenance error:", _context3.t0.toString());

              case 37:
                return _context3.abrupt("return", maintenanceCreated);

              case 38:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 33]]);
      }));

      function createNewMaintenanceFromIssue(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return createNewMaintenanceFromIssue;
    }()
    //"createNewMaintenance" NOT BEING USER ANYMORE , instead 'createNewMaintenanceFromIssue' is being used now
    // async createNewMaintenance(
    //   issue,
    //   user, // inspection,  inspectionRun, //create new maintenance based on an issue
    // ) {
    //   let resultObj = { value: "Ok", status: 200 };

    //   try {
    //     if (issue && user && issue.planId) {
    //       //inspectionRun)
    //       let inspectionId = issue.planId; //
    //       let jpModel = ServiceLocator.resolve("JourneyPlanModel");
    //       let wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    //       let utils = ServiceLocator.resolve("utils");
    //       let inspection = await jpModel.findOne({ _id: inspectionId }).exec();
    //       let inspectionRun = inspection.workplanTemplateId;
    //       let newMrCode = await this.maintainenceReqNumberCreator();

    //       let wpt = await wPlanTemplate.findOne({ _id: inspectionRun }).exec();
    //       let lineId = wpt.lineId;

    //       let subdivision = await this.getLineSubdivision(lineId);

    //       // subdivision: wpt.subdivision ? wpt.subdivision : inspection.subdivision ? inspection.subdivision : '';

    //       let maint1 = {
    //         tenantId: user.tenantId,
    //         lineId: lineId,
    //         lineName: wpt.lineName ? wpt.lineName : "",
    //         mrNumber: newMrCode,
    //         description: issue.description,
    //         images: issue.imgList ? [...issue.imgList] : [],
    //         voices: issue.voiceList ? [...issue.voiceList] : [],
    //         coordinates: issue.location,
    //         location: this.addLocation([], issue.location, "GPS"),
    //         markedOnSite: issue.marked,
    //         priority: issue.priority,
    //         asset: issue.unit,
    //         sourceType: "app-issue",
    //         createdBy: { id: user.id, name: user.name, email: user.email },
    //         inspectionRun: inspectionRun,
    //         inspection: inspectionId,
    //         timestamp: issue.timeStamp,
    //         status: "New",
    //         defectCodes: issue.defectCodes,
    //         attributes: {},
    //         maintenanceType: issue.maintenanceType ? issue.maintenanceType : "other",
    //         subdivision: subdivision,
    //       };
    //       if (issue.startMP && issue.endMP) {
    //         let start = utils.toFixed(issue.startMP);
    //         let end = utils.toFixed(issue.endMP);
    //         maint1.location.push({ start: start, end: end, type: "Milepost" });
    //       }

    //       MaintenanceModel.create(maint1, (err, result) => {
    //         if (err) {
    //           console.log("error creating new maintenance based on issue");
    //           // todo error log
    //           return;
    //         }
    //         if (result) {
    //           // update issue to include MR. reference and change issue's status.
    //           const [jIndex, tIndex, iIndex] = issue.index.split("-");
    //           inspection.tasks[tIndex].issues[iIndex].status = "Resolved";
    //           inspection.tasks[tIndex].issues[iIndex].mrNumber = result.mrNumber;
    //           inspection.tasks[tIndex].issues[iIndex].maintenanceId = result._id;

    //           inspection.markModified("tasks");
    //           inspection.save();
    //         }
    //       });
    //     } else {
    //       /*todo log*/
    //     }
    //   } catch (err) {
    //     resultObj = { errorVal: err.toString(), status: 500 };
    //     console.log("maintenance.service.createNewMaintenance error:", err.toString());
    //   }

    //   return resultObj;
    // }

  }, {
    key: "getAll",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(user) {
        var resultObj, maintenances, criteria, assetService, assetIds, ids;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resultObj = { status: 500, errorVal: "default" };
                _context4.prev = 1;
                maintenances = [];
                criteria = {};
                assetService = ServiceLocator.resolve("AssetsService");
                _context4.next = 7;
                return assetService.getFilteredAssetsIds(user, { plannable: true }, true);

              case 7:
                assetIds = _context4.sent;

                if (!(assetIds && assetIds.assetIds && assetIds.assetIds.length > 0)) {
                  _context4.next = 14;
                  break;
                }

                ids = assetIds.assetIds;


                criteria.lineId = { $in: ids };
                _context4.next = 13;
                return MaintenanceModel.find(criteria);

              case 13:
                maintenances = _context4.sent;

              case 14:

                resultObj = { value: maintenances, status: 200 };
                _context4.next = 21;
                break;

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](1);

                resultObj = { errorVal: _context4.t0.toString(), status: 500 };
                console.log("maintenance.service.getAll.catch", _context4.t0.toString());

              case 21:
                return _context4.abrupt("return", resultObj);

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 17]]);
      }));

      function getAll(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "get",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id, user) {
        var resultObj, criteria, maintenance, s;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                resultObj = {}, criteria = { _id: id };

                // if (!user.isAdmin) criteria.subdivision = user.subdivision;

                _context5.prev = 1;
                _context5.next = 4;
                return MaintenanceModel.findOne(criteria);

              case 4:
                maintenance = _context5.sent;
                s = 0;

                resultObj = { value: maintenance, status: 200 };
                _context5.next = 13;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);

                resultObj = { errorVal: _context5.t0.toString(), status: 500 };
                console.log("maintenance.service.get.catch", _context5.t0.toString());

              case 13:
                return _context5.abrupt("return", resultObj);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 9]]);
      }));

      function get(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "addLocation",
    value: function addLocation(loc, loc2Add, type) {
      if (loc2Add instanceof Array) {
        console.log("maintenance service, location parse error: ", loc2Add, "type:", type);
      } else if (typeof loc2Add === "string" || loc2Add instanceof String) {
        if (type === "GPS") {
          // if GPS then a location should be lat, long
          var locations = loc2Add.split(",");

          var start = { lat: locations[0], lon: locations[1] },
              end = { lat: locations[0], lon: locations[1] };

          if (locations.length > 2) {
            console.log("maintenance service, location parse error: ", loc2Add, "type:", type);
            if (locations.length == 4) {
              end = { lat: locations[2], lon: locations[3] };
            }
          } else {
            start = { lat: locations[0], lon: locations[1] };
            end = { lat: locations[0], lon: locations[1] };
          }
          loc.push({
            start: start,
            end: end,
            type: type
          });
        } else {
          console.log("maintenance service, location parse error: ", loc2Add, "type:", type);
        }
      }

      return loc;
    }
  }, {
    key: "createFromWeb",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(mntnce, user) {
        var resultObj, utils, copyMntnce, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, l1, newMntnce, savedMntnce;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                resultObj = void 0;
                utils = ServiceLocator.resolve("utils");
                _context6.prev = 2;
                copyMntnce = (0, _extends3.default)({}, mntnce);

                copyMntnce.status = mntnce.status || "New";
                copyMntnce.sourceType = "web-issue";
                _context6.next = 8;
                return this.maintainenceReqNumberCreator();

              case 8:
                copyMntnce.mrNumber = _context6.sent;

                copyMntnce.createdBy = { id: user._id.toString(), name: user.name, email: user.email };

                // if (!copyMntnce.subdivision || copyMntnce.subdivision === "") {
                //   copyMntnce.subdivision = await this.getLineSubdivision(copyMntnce.lineId);
                // }

                if (!(copyMntnce.location && copyMntnce.location.length)) {
                  _context6.next = 30;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context6.prev = 14;

                for (_iterator = copyMntnce.location[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  l1 = _step.value;

                  if (l1.type === "Milepost") {
                    l1.start = utils.toFixed(l1.start);
                    l1.end = utils.toFixed(l1.end);
                  }
                }
                _context6.next = 22;
                break;

              case 18:
                _context6.prev = 18;
                _context6.t0 = _context6["catch"](14);
                _didIteratorError = true;
                _iteratorError = _context6.t0;

              case 22:
                _context6.prev = 22;
                _context6.prev = 23;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 25:
                _context6.prev = 25;

                if (!_didIteratorError) {
                  _context6.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context6.finish(25);

              case 29:
                return _context6.finish(22);

              case 30:
                newMntnce = new MaintenanceModel(copyMntnce);
                _context6.next = 33;
                return newMntnce.save();

              case 33:
                savedMntnce = _context6.sent;

                resultObj = { value: savedMntnce, status: 200 };
                _context6.next = 41;
                break;

              case 37:
                _context6.prev = 37;
                _context6.t1 = _context6["catch"](2);

                resultObj = { errorVal: _context6.t1.toString(), status: 500 };
                console.log("maintenance.service.createFromWeb.catch", _context6.t1.toString());

              case 41:
                return _context6.abrupt("return", resultObj);

              case 42:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 37], [14, 18, 22, 30], [23,, 25, 29]]);
      }));

      function createFromWeb(_x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return createFromWeb;
    }()
  }, {
    key: "updateFromWeb",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(mntnce) {
        var resultObj, mntnceToUpdate, utils, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, l1, updatedMntnce;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                resultObj = void 0;
                _context7.prev = 1;
                _context7.next = 4;
                return MaintenanceModel.findOne({ _id: mntnce._id }).exec();

              case 4:
                mntnceToUpdate = _context7.sent;

                if (!mntnceToUpdate) {
                  _context7.next = 43;
                  break;
                }

                // if (mntnceToUpdate.status === "New") {
                //   if (mntnce.dueDate && mntnce.assignedTo && mntnce.priority) {
                //     mntnceToUpdate.dueDate = mntnce.dueDate;
                //     mntnceToUpdate.assignedTo = mntnce.assignedTo;
                //     mntnceToUpdate.priority = mntnce.priority;

                //     // assign workOrderNumber
                //     mntnceToUpdate.workOrderNumber = await this.workOrderNumberCreator();
                //     // change status
                //     mntnceToUpdate.status = "Planned";

                //     mntnceToUpdate.markModified("dueDate");
                //     mntnceToUpdate.markModified("assignedTo");
                //   }
                // }

                if (mntnceToUpdate.status === "New" || mntnceToUpdate.status === "Planning" || mntnceToUpdate.status === "Planned" || mntnceToUpdate.status === "In Progress") {
                  // allow change of estimate for In Progress status maintenances
                  if (mntnce.estimate && mntnce.estimate.length >= 0) {
                    mntnceToUpdate.estimate = _.cloneDeep(mntnce.estimate);
                    mntnceToUpdate.estimateHistoryRecord = _.cloneDeep(mntnce.estimateHistoryRecord);

                    if (mntnceToUpdate.status === "New") mntnceToUpdate.status = "Planning";
                    mntnceToUpdate.markModified("estimate");
                    mntnceToUpdate.markModified("status");
                  }

                  if (mntnceToUpdate.status === "New") {
                    mntnceToUpdate.workOrderNumber = mntnce.workOrderNumber;
                    mntnceToUpdate.executionDate = mntnce.executionDate;
                    mntnceToUpdate.closedDate = mntnce.closedDate;

                    //mntnceToUpdate.status = mntnce.status; // do not update status from front-end. It should only be changed by server

                    mntnceToUpdate.markModified("status");
                    mntnceToUpdate.markModified("executionDate");
                    mntnceToUpdate.markModified("workOrderNumber");
                    mntnceToUpdate.markModified("closedDate");
                  }

                  mntnceToUpdate.priority = mntnce.priority;
                  mntnceToUpdate.markModified("priority");
                }
                // if (mntnceToUpdate.status === "Planned" && mntnce.executionDate) {
                //   mntnceToUpdate.executionDate = mntnce.executionDate;
                //   mntnceToUpdate.markModified("executionDate");

                //   mntnceToUpdate.status = "In Progress";
                // }

                // if (mntnceToUpdate.status === "In Progress" && mntnce.closedDate) {
                //   mntnceToUpdate.closedDate = mntnce.closedDate;
                //   mntnceToUpdate.markModified("closedDate");

                //   mntnceToUpdate.status = "Closed";
                // }

                // no need to update following
                if (mntnce.description) {
                  mntnceToUpdate.description = mntnce.description;
                  mntnceToUpdate.markModified("description");
                }

                if (mntnce.location && mntnce.sourceType !== 'app-issue') {
                  mntnceToUpdate.location = mntnce.location;
                  mntnceToUpdate.markModified("location");
                }

                if (mntnce.maintenanceType) {
                  mntnceToUpdate.maintenanceType = mntnce.maintenanceType;
                  mntnceToUpdate.markModified("maintenanceType");
                }

                if (mntnce.documents) {
                  mntnceToUpdate.documents = mntnce.documents;
                  mntnceToUpdate.markModified("documents");
                }

                if (mntnce.images) {
                  mntnceToUpdate.images = mntnce.images;
                  mntnceToUpdate.markModified("images");
                }

                if (mntnce.voices) {
                  mntnceToUpdate.voices = mntnce.voices;
                  mntnceToUpdate.markModified("voices");
                }

                if (!mntnce.location) {
                  _context7.next = 37;
                  break;
                }

                if (!(mntnce.location && mntnce.location.length)) {
                  _context7.next = 35;
                  break;
                }

                utils = ServiceLocator.resolve("utils");
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context7.prev = 19;

                for (_iterator2 = mntnce.location[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  l1 = _step2.value;

                  if (l1.type === "Milepost") {
                    l1.start = utils.toFixed(l1.start);
                    l1.end = utils.toFixed(l1.end);
                  }
                }
                _context7.next = 27;
                break;

              case 23:
                _context7.prev = 23;
                _context7.t0 = _context7["catch"](19);
                _didIteratorError2 = true;
                _iteratorError2 = _context7.t0;

              case 27:
                _context7.prev = 27;
                _context7.prev = 28;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 30:
                _context7.prev = 30;

                if (!_didIteratorError2) {
                  _context7.next = 33;
                  break;
                }

                throw _iteratorError2;

              case 33:
                return _context7.finish(30);

              case 34:
                return _context7.finish(27);

              case 35:

                mntnceToUpdate.location = mntnce.location;
                mntnceToUpdate.markModified("location");

              case 37:
                _context7.next = 39;
                return mntnceToUpdate.save();

              case 39:
                updatedMntnce = _context7.sent;

                resultObj = { value: updatedMntnce, status: 200 };
                _context7.next = 44;
                break;

              case 43:
                resultObj = { errorVal: "Not Found", status: 404 };

              case 44:
                _context7.next = 50;
                break;

              case 46:
                _context7.prev = 46;
                _context7.t1 = _context7["catch"](1);

                resultObj = { errorVal: _context7.t1.toString(), status: 500 };
                console.log("maintenanc.service.updateFromWeb.catch", _context7.t1.toString());

              case 50:
                return _context7.abrupt("return", resultObj);

              case 51:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 46], [19, 23, 27, 35], [28,, 30, 34]]);
      }));

      function updateFromWeb(_x9) {
        return _ref7.apply(this, arguments);
      }

      return updateFromWeb;
    }()
  }, {
    key: "multiLineMaintenance",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(lines) {
        var resultObj, maintenances, criteria;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                resultObj = {}, maintenances = void 0;
                _context8.prev = 1;
                criteria = { lineId: { $in: lines } };
                _context8.next = 5;
                return MaintenanceModel.find(criteria);

              case 5:
                maintenances = _context8.sent;

                resultObj = { value: maintenances, status: 200 };
                _context8.next = 13;
                break;

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](1);

                resultObj = { errorVal: _context8.t0.toString(), status: 500 };
                console.log("maintenance.service.multiLineMaintenance.catch", _context8.t0.toString());

              case 13:
                return _context8.abrupt("return", resultObj);

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 9]]);
      }));

      function multiLineMaintenance(_x10) {
        return _ref8.apply(this, arguments);
      }

      return multiLineMaintenance;
    }()
  }, {
    key: "getLineSubdivision",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(lineId) {
        var AssetsModel, line;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                AssetsModel = ServiceLocator.resolve("AssetsModel");
                _context9.next = 4;
                return AssetsModel.findOne({ _id: lineId }).exec();

              case 4:
                line = _context9.sent;

                if (!(!line || !line.subdivision || line.subdivision === "")) {
                  _context9.next = 8;
                  break;
                }

                // todo: log
                console.log("Error while getting subdivision: lineId:", lineId);
                return _context9.abrupt("return", "");

              case 8:
                return _context9.abrupt("return", line.subdivision);

              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9["catch"](0);

                console.log("maintenance.service.getLineSubdivision.catch:", _context9.t0.toString());

              case 14:
                return _context9.abrupt("return", "");

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 11]]);
      }));

      function getLineSubdivision(_x11) {
        return _ref9.apply(this, arguments);
      }

      return getLineSubdivision;
    }()
  }, {
    key: "setWorkOrderNumber",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(maintenanceList, workOrderNumber) {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;

                if (!(maintenanceList && maintenanceList.length)) {
                  _context10.next = 4;
                  break;
                }

                _context10.next = 4;
                return MaintenanceModel.update({ mrNumber: { $in: maintenanceList } }, { workOrderNumber: workOrderNumber }, { multi: true });

              case 4:
                _context10.next = 9;
                break;

              case 6:
                _context10.prev = 6;
                _context10.t0 = _context10["catch"](0);

                console.log("maintenance.service.setWorkOrderNumber.catch:", _context10.t0.toString());

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 6]]);
      }));

      function setWorkOrderNumber(_x12, _x13) {
        return _ref10.apply(this, arguments);
      }

      return setWorkOrderNumber;
    }()
  }, {
    key: "getByMRNoList",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(MrNoList, user) {
        var beefOut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var resultObj, maintenances, criteria, query;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                resultObj = { errorVal: "default", status: 500 }, maintenances = void 0;
                _context11.prev = 1;
                criteria = { mrNumber: { $in: MrNoList } };
                query = MaintenanceModel.find(criteria);


                if (beefOut) query.select("_id location description mrNumber priority createdAt createdBy maintenanceType");

                _context11.next = 7;
                return query.exec();

              case 7:
                maintenances = _context11.sent;

                resultObj = { value: maintenances, status: 200 };
                _context11.next = 15;
                break;

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11["catch"](1);

                resultObj = { errorVal: _context11.t0.toString(), status: 500 };
                console.log("maintenance.service.getByMRNoList.catch", _context11.t0.toString());

              case 15:
                return _context11.abrupt("return", resultObj);

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[1, 11]]);
      }));

      function getByMRNoList(_x15, _x16) {
        return _ref11.apply(this, arguments);
      }

      return getByMRNoList;
    }()
  }, {
    key: "setMRsFields",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(maintenanceList, valuesObj) {
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;

                if (!(maintenanceList && maintenanceList.length)) {
                  _context12.next = 4;
                  break;
                }

                _context12.next = 4;
                return MaintenanceModel.update({ mrNumber: { $in: maintenanceList } }, valuesObj, { multi: true });

              case 4:
                _context12.next = 9;
                break;

              case 6:
                _context12.prev = 6;
                _context12.t0 = _context12["catch"](0);

                console.log("maintenance.service.setMRsFields.catch:", _context12.t0.toString());

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 6]]);
      }));

      function setMRsFields(_x17, _x18) {
        return _ref12.apply(this, arguments);
      }

      return setMRsFields;
    }()
  }]);
  return MaintenanceService;
}();

var maintenanceService = new MaintenanceService();
ServiceLocator.register("MaintenanceService", maintenanceService);
module.exports = maintenanceService;