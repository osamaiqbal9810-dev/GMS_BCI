"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _permissions = require("../../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isAuthenticated = require("../../../auth/auth");
var express = require("express");
var router = express.Router();
var wPlanSchedules = require("./wPlanSchedules.model");
// Permission Validation
var isAllowed = require("../../../middlewares/validatePermission");

//var  permitTypes =require('../../config/permissions').default;

router.get("/", [isAuthenticated, isAllowed(permitTypes.READ_WORKPLAN)], getAllOfTemplate);

module.exports = router;

function getAllOfTemplate(templateId) {
  wPlanSchedules.find().exec(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, plan) {
      var plans, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getplans(req.user, plan);

            case 2:
              plans = _context.sent;

              if (!err) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", handleError(res, err));

            case 5:
              data = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 9;

              for (_iterator = plans[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                p = _step.value;

                data = [].concat((0, _toConsumableArray3.default)(data), [plans.inspectionSchedules]);
              }
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](9);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 17:
              _context.prev = 17;
              _context.prev = 18;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 20:
              _context.prev = 20;

              if (!_didIteratorError) {
                _context.next = 23;
                break;
              }

              throw _iteratorError;

            case 23:
              return _context.finish(20);

            case 24:
              return _context.finish(17);

            case 25:
              res.status(200);
              res.json(data);

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[9, 13, 17, 25], [18,, 20, 24]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}