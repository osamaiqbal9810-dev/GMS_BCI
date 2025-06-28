'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupportedDeviceHelpers = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SupportedDeviceHelperClass = function () {
  function SupportedDeviceHelperClass() {
    (0, _classCallCheck3.default)(this, SupportedDeviceHelperClass);
  }

  (0, _createClass3.default)(SupportedDeviceHelperClass, [{
    key: 'divide',
    value: function divide(value, divisor) {
      return value / divisor;
    }
  }, {
    key: 'map',
    value: function map(value, values) {
      return values.hasOwnProperty(value) ? values[value] : value;
    }
  }, {
    key: 'objectDecoder',
    value: function objectDecoder(val, props) {

      var obj = {};
      for (var prop in props) {
        var _props$prop = props[prop],
            decoder = _props$prop.decoder,
            mask = _props$prop.mask,
            shift = _props$prop.shift,
            values = _props$prop.values;

        var maskedValue = mask ? mask & val : val;
        var shiftedValue = shift ? maskedValue >> shift : maskedValue;

        decoder === "map" && (obj[prop] = this.map(shiftedValue, values));
      }
      return obj;
    }
  }, {
    key: 'dataValidity',
    value: function dataValidity(lastUpdate, interpretedData, param) {
      var currentTime = new Date();
      var diff = (currentTime - lastUpdate) / 60000;
      if (diff <= 5) {
        interpretedData = (0, _extends5.default)({}, interpretedData, (0, _defineProperty3.default)({}, param, (0, _extends5.default)({}, interpretedData[param], {
          missed: true
        })));
      } else {
        interpretedData = (0, _extends5.default)({}, interpretedData, (0, _defineProperty3.default)({}, param, (0, _extends5.default)({}, interpretedData[param], {
          missed: true,
          valid: false
        })));
      }
      return interpretedData;
    }
  }, {
    key: 'interpretData',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data, suppDevice, prevState, deviceModel) {
        var _this = this;

        var devices, spDevice, interpretedData;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return deviceModel.find().exec();

              case 2:
                devices = _context.sent;
                _context.next = 5;
                return devices.find(function (_ref2) {
                  var _id = _ref2._id;
                  return _id == suppDevice._id;
                });

              case 5:
                spDevice = _context.sent;

                spDevice = spDevice.registers;
                interpretedData = prevState;

                Object.keys(data).forEach(function (param) {
                  if (data[param].hasOwnProperty('error') == false) {
                    if (spDevice.hasOwnProperty(param)) {
                      if (data[param].hasOwnProperty('val')) {
                        var val = data[param].val;

                        var lastUpdated = new Date();
                        if (data[param].qty == 2 && val.length === data[param].qty) {
                          var upperByte = val[0].toString(16);
                          var lowerByte = val[1].toString(16);
                          var lowerUpper = upperByte + "" + lowerByte;
                          var lowerUpperInt = parseInt(lowerUpper, 16);
                          val = lowerUpperInt;
                        }

                        var decoder = spDevice[param].decoder;

                        if (decoder && data[param].hasOwnProperty("val")) {
                          var func = decoder.func,
                              divisor = decoder.divisor,
                              values = decoder.values,
                              props = decoder.props;

                          if (func == "divide") {

                            interpretedData[param] = {
                              value: _this.divide(val, divisor),
                              valid: true,
                              missed: false,
                              lastUpdated: lastUpdated
                            };
                          } else if (func == "map") {
                            interpretedData[param] = {
                              value: _this.map(val, values),
                              valid: true,
                              missed: false,
                              lastUpdated: lastUpdated
                            };
                          } else if (func == "objectDecoder") {
                            interpretedData[param] = {
                              value: _this.objectDecoder(val, props),
                              valid: true,
                              missed: false,
                              lastUpdated: lastUpdated
                            };
                          }
                        } else {
                          if (!decoder && data[param].qty === 1) {
                            interpretedData[param] = {
                              value: val[0],
                              valid: true,
                              missed: false,
                              lastUpdated: lastUpdated
                            };
                          } else {
                            interpretedData[param] = {
                              value: val,
                              valid: true,
                              missed: false,
                              lastUpdated: lastUpdated
                            };
                          }
                        }
                      }
                    }
                  } else {
                    var lastUpdate = interpretedData[param].lastUpdated;
                    interpretedData = _this.dataValidity(lastUpdate, interpretedData, param);
                  }
                });
                return _context.abrupt('return', interpretedData);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function interpretData(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return interpretData;
    }()
  }]);
  return SupportedDeviceHelperClass;
}();

var SupportedDeviceHelpers = exports.SupportedDeviceHelpers = new SupportedDeviceHelperClass();