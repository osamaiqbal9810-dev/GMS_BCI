"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subdivisionChecker = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var subdivisionChecker = exports.subdivisionChecker = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
    var checkSubdiv, adminCheck, subdivisionUser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            checkSubdiv = void 0, adminCheck = void 0, subdivisionUser = void 0;

            adminCheck = user.isAdmin;
            subdivisionUser = user.subdivision;
            if (!adminCheck && subdivisionUser && subdivisionUser !== "All") checkSubdiv = true;else checkSubdiv = false;
            return _context.abrupt("return", checkSubdiv);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function subdivisionChecker(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }