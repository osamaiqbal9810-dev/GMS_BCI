"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assetsTreeModel = require("../assetsTree/assetsTreeModel");

var _assetsTreeModel2 = _interopRequireDefault(_assetsTreeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var devicesModal = require("./params.model");

exports.create = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var deviceService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            deviceService = ServiceLocator.resolve("SupportedParams");
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
    var paramsService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            paramsService = ServiceLocator.resolve("SupportedParams");
            //let resultObj = await AssetsService.getAllAssetsLamp(req.user);

            _context2.next = 3;
            return paramsService.getAllParams();

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