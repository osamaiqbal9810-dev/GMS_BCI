"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserGroup = require("./userGroup.model");
var async = require("async");
var ServiceLocator = require("../../framework/servicelocator");

exports.index = function (req, res) {
  if (req.user.isAdmin) {
    UserGroup.find().exec(function (err, userGroup) {
      if (err) {
        return handleError(res, err);
      }
      res.status(200);
      res.json(userGroup);
    });
  } else {
    UserGroup.find({ level: { $gte: req.user.userGroup.level } }).exec(function (err, userGroup) {
      if (err) {
        return handleError(res, err);
      }
      res.status(200);
      res.json(userGroup);
    });
  }
};

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}

exports.update = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var userGroupService, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userGroupService = ServiceLocator.resolve("UserGroupService");
            _context.next = 3;
            return userGroupService.updateGroupPermission(req.body);

          case 3:
            result = _context.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
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