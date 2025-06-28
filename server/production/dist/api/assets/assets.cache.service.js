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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetsCacheService = function () {
  function AssetsCacheService() {
    (0, _classCallCheck3.default)(this, AssetsCacheService);

    this.assetRetrievalCache = {};
  }

  (0, _createClass3.default)(AssetsCacheService, [{
    key: "addAssetToCache",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id, asset) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.assetRetrievalCache[id] = { asset: asset };

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addAssetToCache(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addAssetToCache;
    }()
  }, {
    key: "removeFromCache",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                delete this.assetRetrievalCache[id];

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function removeFromCache(_x3) {
        return _ref2.apply(this, arguments);
      }

      return removeFromCache;
    }()
  }, {
    key: "resetCache",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.assetRetrievalCache = {};

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resetCache() {
        return _ref3.apply(this, arguments);
      }

      return resetCache;
    }()
  }, {
    key: "getFromCache",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.assetRetrievalCache[id]);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getFromCache(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getFromCache;
    }()
  }]);
  return AssetsCacheService;
}();

exports.default = AssetsCacheService;