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

var _config = require("../../template/config");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var ObjectId = require("mongodb").ObjectID;
var turf = require("@turf/turf");

var DeviceService = function () {
  function DeviceService() {
    (0, _classCallCheck3.default)(this, DeviceService);
  }

  (0, _createClass3.default)(DeviceService, [{
    key: "getAllDevices",

    //devices api
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var resultObj, DeviceModel, assetsToReturn, allAssets;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = void 0, DeviceModel = void 0;

                resultObj = { value: {} };

                _context.prev = 2;

                DeviceModel = ServiceLocator.resolve("DeviceModel");
                assetsToReturn = [];
                _context.next = 7;
                return DeviceModel.find();

              case 7:
                allAssets = _context.sent;

                allAssets.map(function (asset) {
                  assetsToReturn.push(asset);
                });
                resultObj.status = 200;
                resultObj.value.assetsList = assetsToReturn;
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);

                resultObj = { errorVal: _context.t0, status: 500 };

              case 16:
                return _context.abrupt("return", resultObj);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 13]]);
      }));

      function getAllDevices() {
        return _ref.apply(this, arguments);
      }

      return getAllDevices;
    }()
  }, {
    key: "createDevice",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(deviceInfo) {
        var resultObj, DevicesModel, newDevice, savedDevice;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log(deviceInfo);
                resultObj = void 0, DevicesModel = void 0;

                resultObj = {};
                DevicesModel = ServiceLocator.resolve("DeviceModel");
                _context2.prev = 4;
                newDevice = new DevicesModel(deviceInfo);
                _context2.next = 8;
                return newDevice.save();

              case 8:
                savedDevice = _context2.sent;
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](4);

                console.log(_context2.t0);
                resultObj = { errorVal: _context2.t0, status: 500 };

              case 15:
                return _context2.abrupt("return", resultObj);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 11]]);
      }));

      function createDevice(_x) {
        return _ref2.apply(this, arguments);
      }

      return createDevice;
    }()
  }, {
    key: "find",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
        var resultObj, deviceModel, device;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = void 0, deviceModel = void 0;

                deviceModel = ServiceLocator.resolve("DeviceModel");
                _context3.prev = 2;

                if (!id) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 6;
                return deviceModel.findById(id).exec();

              case 6:
                device = _context3.sent;

                resultObj = { value: device, status: 200 };

              case 8:
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);

                resultObj = { errorVal: _context3.t0.toString(), status: 500 };

              case 13:
                return _context3.abrupt("return", resultObj);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      function find(_x2) {
        return _ref3.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "updateAsset",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(asset) {
        var resultObj, deviceModel, savedAsset, query;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resultObj = void 0, deviceModel = void 0, savedAsset = void 0;

                deviceModel = ServiceLocator.resolve("DeviceModel");

                _context4.prev = 2;
                query = { _id: asset._id };
                _context4.next = 6;
                return deviceModel.findOneAndUpdate(query, asset, {
                  upsert: true
                }).exec();

              case 6:
                savedAsset = _context4.sent;


                resultObj = { value: savedAsset, status: 200 };
                _context4.next = 13;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](2);

                resultObj = { errorVal: _context4.t0.toString(), status: 500 };

              case 13:
                return _context4.abrupt("return", resultObj);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 10]]);
      }));

      function updateAsset(_x3) {
        return _ref4.apply(this, arguments);
      }

      return updateAsset;
    }()
  }, {
    key: "deleteAsset",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id) {
        var deviceModel, result, assetsToDelete;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                deviceModel = ServiceLocator.resolve("DeviceModel");
                result = { errorVal: "default", status: 200 };
                _context5.prev = 2;

                if (!id) {
                  _context5.next = 18;
                  break;
                }

                _context5.next = 6;
                return deviceModel.findById(id).exec();

              case 6:
                assetsToDelete = _context5.sent;

                if (!assetsToDelete) {
                  _context5.next = 14;
                  break;
                }

                assetsToDelete.isRemoved = true;
                _context5.next = 11;
                return deviceModel.save();

              case 11:

                result.status = 200;
                _context5.next = 16;
                break;

              case 14:
                result.status = 404;
                result.errorVal = "Device not found";

              case 16:
                _context5.next = 20;
                break;

              case 18:
                result.status = 404;
                result.errorVal = "Missing id parameter";

              case 20:
                _context5.next = 27;
                break;

              case 22:
                _context5.prev = 22;
                _context5.t0 = _context5["catch"](2);

                console.log(" err:", _context5.t0.toString());
                result.status = 500;
                result.errorVal = "Internal Server Error: " + _context5.t0.toString(); // todo log the error string and send back only 'Internal Server Error'

              case 27:
                return _context5.abrupt("return", result);

              case 28:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 22]]);
      }));

      function deleteAsset(_x4) {
        return _ref5.apply(this, arguments);
      }

      return deleteAsset;
    }()
  }]);
  return DeviceService;
}();

exports.default = DeviceService;