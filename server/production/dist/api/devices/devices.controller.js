"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assetsTreeModel = require("../assetsTree/assetsTreeModel");

var _assetsTreeModel2 = _interopRequireDefault(_assetsTreeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var devicesModal = require("./devices.model");

exports.create = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var deviceService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            deviceService = ServiceLocator.resolve("DeviceService");
            resultObj = void 0;
            _context.next = 4;
            return deviceService.createDevice(req.body);

          case 4:
            resultObj = _context.sent;

            if (!resultObj.errorVal) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.send(resultObj.errorVal));

          case 7:
            res.status(200);
            res.json(resultObj.value);

          case 9:
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

exports.all = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var deviceService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            deviceService = ServiceLocator.resolve("DeviceService");
            //let resultObj = await AssetsService.getAllAssetsLamp(req.user);

            _context2.next = 3;
            return deviceService.getAllDevices();

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

exports.find = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            AssetsService = ServiceLocator.resolve("DeviceService");
            _context3.next = 3;
            return AssetsService.find(req.params.id);

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

  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            assetService = ServiceLocator.resolve("DeviceService");
            _context4.next = 3;
            return assetService.updateAsset(req.body);

          case 3:
            resultObj = _context4.sent;

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.delete = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            assetService = ServiceLocator.resolve("DeviceService");
            _context5.next = 3;
            return assetService.deleteAsset(req.params.id);

          case 3:
            resultObj = _context5.sent;

            res.status(resultObj.status);

            if (resultObj.value) {
              res.json(resultObj.value);
            } else {
              res.json(resultObj.errorVal);
            }

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();