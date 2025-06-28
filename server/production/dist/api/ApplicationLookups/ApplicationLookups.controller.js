"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by zqureshi on 10/12/2018.
 */
var _ = require("lodash");
var ServiceLocator = require("../../framework/servicelocator");
var ApplicationLookupsModel = require("./ApplicationLookups.model");
var tenantInfo = require("../../utilities/tenantInfo");

exports.show = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var applicationLookupsService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //console.log('list names:', req.params.lists);
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context.next = 3;
            return applicationLookupsService.getLists(req.params.lists ? req.params.lists : []);

          case 3:
            resultObj = _context.sent;

            res.status(resultObj.status);

            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
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
  ApplicationLookupsModel.findOne({ _id: req.params.id }).exec(function (err, category) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200);
    res.json(category);
  });
};

exports.getRefreshRate = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var applicationLookupsService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context2.next = 3;
            return applicationLookupsService.getRefreshRate();

          case 3:
            resultObj = _context2.sent;

            res.status(resultObj.status);

            if (resultObj.newRefreshTime) res.json(resultObj);else res.json(resultObj.errorVal);

          case 6:
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
exports.getCodes = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var criteria, codes;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            criteria = {};

            if (req.params.listName && req.params.codes) {
              codes = req.params.codes.split(",");

              if (codes && codes.length) {
                criteria.listName = req.params.listName;
                criteria.code = { $in: codes };
              }
            }
            ApplicationLookupsModel.find(criteria).exec(function (err, lists) {
              if (err) {
                return handleError(res, err);
              }
              res.status(200);
              res.json(lists);
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getList = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var applicationLookupsService, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(req.params.listname == "Subdivision")) {
              _context4.next = 11;
              break;
            }

            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context4.next = 4;
            return applicationLookupsService.getSubdivisionService(req.user, req.params.listname);

          case 4:
            result = _context4.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.send(result.errorVal));

          case 8:
            res.json(result.value);
            _context4.next = 12;
            break;

          case 11:
            ApplicationLookupsModel.find({ listName: req.params.listname }).exec(function (err, category) {
              if (err) {
                return handleError(res, err);
              }
              res.status(200);
              res.json(category);
            });

          case 12:
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
exports.getAssetTypeTests = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var applicationLookupsService, resultObj;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context5.next = 3;
            return applicationLookupsService.getAssetTypeTests();

          case 3:
            resultObj = _context5.sent;


            res.status(resultObj.status);

            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
exports.create = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    var applicationLookupsService, resultObj;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context6.next = 3;
            return applicationLookupsService.create(req);

          case 3:
            resultObj = _context6.sent;


            res.status(resultObj.status);

            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res, next) {
    var applicationLookupsService, resultObj;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context7.next = 3;
            return applicationLookupsService.updateList(req.params.id, req.body);

          case 3:
            resultObj = _context7.sent;


            res.status(resultObj.status);

            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.delete = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res, next) {
    var applicationLookupsService, result;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context8.next = 4;
            return applicationLookupsService.deleteOne(req.params.id, req);

          case 4:
            result = _context8.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status === 500)) {
              _context8.next = 8;
              break;
            }

            return _context8.abrupt("return", res.send(result.errorVal));

          case 8:

            res.json(result.value);
            _context8.next = 14;
            break;

          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](0);

            console.log(_context8.t0);

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[0, 11]]);
  }));

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}

exports.updateGeoLogging = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res, next) {
    var applicationLookupsService, result;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context9.next = 3;
            return applicationLookupsService.setGlobalGeoLoggingOption(req.body, req.hostname);

          case 3:
            result = _context9.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context9.next = 7;
              break;
            }

            return _context9.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function (_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

exports.updateLanguage = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res, next) {
    var applicationLookupsService, result;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context10.next = 3;
            return applicationLookupsService.addNewDynamicLanguageWord(req.body);

          case 3:
            result = _context10.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context10.next = 7;
              break;
            }

            return _context10.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function (_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();

exports.editLanguage = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res, next) {
    var applicationLookupsService, result;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context11.next = 3;
            return applicationLookupsService.editDynamicLanguageWord(req.body);

          case 3:
            result = _context11.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context11.next = 7;
              break;
            }

            return _context11.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function (_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();
exports.deleteLanguage = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res, next) {
    var applicationLookupsService, result;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
            _context12.next = 3;
            return applicationLookupsService.deleteDynamicLanguageWord(req.body);

          case 3:
            result = _context12.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context12.next = 7;
              break;
            }

            return _context12.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function (_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();