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

var SupportedParams = function () {
  function SupportedParams() {
    (0, _classCallCheck3.default)(this, SupportedParams);
  }

  (0, _createClass3.default)(SupportedParams, [{
    key: "getAllParams",

    //devices api
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var resultObj, paramsModel, paramsToReturn, allParams;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = void 0, paramsModel = void 0;

                resultObj = { value: {} };

                _context.prev = 2;

                paramsModel = ServiceLocator.resolve("SupportedParamsModel");
                paramsToReturn = [];
                _context.next = 7;
                return paramsModel.find();

              case 7:
                allParams = _context.sent;

                allParams.map(function (params) {
                  paramsToReturn.push(params);
                });
                resultObj.status = 200;
                resultObj.value.params = paramsToReturn;
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

      function getAllParams() {
        return _ref.apply(this, arguments);
      }

      return getAllParams;
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
                resultObj = void 0, DevicesModel = void 0;

                resultObj = {};
                DevicesModel = ServiceLocator.resolve("DeviceModel");
                _context2.prev = 3;
                newDevice = new DevicesModel(deviceInfo);
                _context2.next = 7;
                return newDevice.save();

              case 7:
                savedDevice = _context2.sent;
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);

                console.log(_context2.t0);
                resultObj = { errorVal: _context2.t0, status: 500 };

              case 14:
                return _context2.abrupt("return", resultObj);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function createDevice(_x) {
        return _ref2.apply(this, arguments);
      }

      return createDevice;
    }()
  }]);
  return SupportedParams;
}();

exports.default = SupportedParams;