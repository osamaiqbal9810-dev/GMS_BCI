"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetTypeModel = require("./assetTypes.model");
var ServiceLocator = require("../../framework/servicelocator");

exports.all = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var assetsTypeService, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assetsTypeService = ServiceLocator.resolve("AssetsTypeService");
            _context.next = 3;
            return assetsTypeService.get_AssetTypes();

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

exports.find = function (req, res, next) {
  // JourneyPlan.findOne({ _id: req.params.id , isRemoved : !true }).exec(function(err, plan) {
  //   if (err) {
  //     return handleError(res, err);
  //   }
  //   res.status(200);
  //   res.json(plan);
  // });
};

exports.create = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var resultObj, assetsTypeService;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            resultObj = { status: 500, errorVal: 'default' };
            assetsTypeService = ServiceLocator.resolve("AssetsTypeService");
            _context2.prev = 2;
            _context2.next = 5;
            return assetsTypeService.create_assetTypes(req.body);

          case 5:
            resultObj = _context2.sent;
            _context2.next = 13;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);

            resultObj.status = 500;
            resultObj.errorVal = _context2.t0.toString();
            console.log('create assetType error');

          case 13:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 8]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var resultObj, assetsTypeService;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            resultObj = { status: 500, errorVal: 'default' };
            assetsTypeService = ServiceLocator.resolve("AssetsTypeService");
            _context3.prev = 2;
            _context3.next = 5;
            return assetsTypeService.update_assetTypes(req.body);

          case 5:
            resultObj = _context3.sent;
            _context3.next = 13;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](2);

            resultObj.status = 500;
            resultObj.errorVal = _context3.t0.toString();
            console.log('update assetType error');

          case 13:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

            // JourneyPlan.findOne({ _id: req.params.id }).exec(function(err, plan) {
            //   if (err) {
            //     return handleError(res, err);
            //   }
            //   plan.user = req.body.user;
            //   plan.title = req.body.title;
            //   plan.tasks = req.body.tasks;
            //   plan.subdivision = req.body.subdivision;
            //   plan.save(function(err, plan) {
            //     if (err) {
            //       return next(err);
            //     }
            //     res.status(200);
            //     return res.json(plan);
            //   });
            // });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[2, 8]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.delete = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();