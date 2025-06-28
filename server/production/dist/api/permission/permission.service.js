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

var ServiceLocator = require("../../framework/servicelocator");

var PermissionService = function () {
  function PermissionService() {
    (0, _classCallCheck3.default)(this, PermissionService);
  }

  (0, _createClass3.default)(PermissionService, [{
    key: "getAllPermissions",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var resultObj, PermissionModel, permission;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = {};
                PermissionModel = ServiceLocator.resolve("PermissionModel");
                _context.prev = 2;
                _context.next = 5;
                return PermissionModel.find().exec();

              case 5:
                permission = _context.sent;

                resultObj = { value: permission, status: 200 };
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);

                resultObj = { errorVal: _context.t0, status: 500 };

              case 12:
                return _context.abrupt("return", resultObj);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function getAllPermissions() {
        return _ref.apply(this, arguments);
      }

      return getAllPermissions;
    }()
  }, {
    key: "createPermission",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(permission) {
        var resultObj, PermissionModel, newPermission, _permission;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = {};
                PermissionModel = ServiceLocator.resolve("PermissionModel");
                newPermission = new PermissionModel(permission);
                _context2.prev = 3;
                _context2.next = 6;
                return newPermission.save();

              case 6:
                _permission = _context2.sent;

                resultObj = { value: _permission, status: 200 };
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);

                resultObj = { errorVal: _context2.t0, status: 500 };

              case 13:
                return _context2.abrupt("return", resultObj);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function createPermission(_x) {
        return _ref2.apply(this, arguments);
      }

      return createPermission;
    }()
  }, {
    key: "updatePermission",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(permission) {
        var resultObj, PermissionModel, newPermission, objToUpdate, _permission2;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = {};
                PermissionModel = ServiceLocator.resolve("PermissionModel");
                newPermission = new PermissionModel(permission);
                _context3.prev = 3;
                _context3.next = 6;
                return PermissionModel.findById(permission._id).exec();

              case 6:
                objToUpdate = _context3.sent;

                objToUpdate.resource = permission.resource;
                objToUpdate.action = permission.action;
                objToUpdate.name = permission.name;
                _context3.prev = 10;
                _context3.next = 13;
                return objToUpdate.save();

              case 13:
                _permission2 = _context3.sent;

                resultObj = { value: _permission2, status: 200 };
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](10);

                resultObj = { errorVal: _context3.t0, status: 500 };

              case 20:
                resultObj = { value: permission, status: 200 };
                _context3.next = 26;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t1 = _context3["catch"](3);

                resultObj = { errorVal: _context3.t1, status: 500 };

              case 26:
                return _context3.abrupt("return", resultObj);

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 23], [10, 17]]);
      }));

      function updatePermission(_x2) {
        return _ref3.apply(this, arguments);
      }

      return updatePermission;
    }()
  }]);
  return PermissionService;
}();

exports.default = PermissionService;