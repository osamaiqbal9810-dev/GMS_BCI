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

var UserGroupService = function () {
  function UserGroupService() {
    (0, _classCallCheck3.default)(this, UserGroupService);
  }

  (0, _createClass3.default)(UserGroupService, [{
    key: "updateGroupPermission",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(group) {
        var resultObj, UserGroupModel, newPermission, objToUpdate, _group;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = {};
                UserGroupModel = ServiceLocator.resolve("UserGroupModel");
                newPermission = new UserGroupModel(group);
                _context.prev = 3;
                _context.next = 6;
                return UserGroupModel.findById(group._id).exec();

              case 6:
                objToUpdate = _context.sent;

                objToUpdate.permissions = group.permissions;
                _context.prev = 8;
                _context.next = 11;
                return objToUpdate.save();

              case 11:
                _group = _context.sent;

                resultObj = { value: _group, status: 200 };
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](8);

                resultObj = { errorVal: _context.t0, status: 500 };

              case 18:
                resultObj = { value: group, status: 200 };
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t1 = _context["catch"](3);

                resultObj = { errorVal: _context.t1, status: 500 };

              case 24:
                return _context.abrupt("return", resultObj);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 21], [8, 15]]);
      }));

      function updateGroupPermission(_x) {
        return _ref.apply(this, arguments);
      }

      return updateGroupPermission;
    }()
  }]);
  return UserGroupService;
}();

exports.default = UserGroupService;