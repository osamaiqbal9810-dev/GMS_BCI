"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assetsTreeModel = require("../assetsTree/assetsTreeModel");

var _assetsTreeModel2 = _interopRequireDefault(_assetsTreeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var assetsModal = require("./assets.modal");
exports.all = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            AssetsService = ServiceLocator.resolve("AssetsService");
            //let resultObj = await AssetsService.getAllAssetsLamp(req.user);

            _context.next = 3;
            return AssetsService.getUserLampAssets(req.user, req.query);

          case 3:
            resultObj = _context.sent;

            if (!resultObj.errorVal) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

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

exports.genAts = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            AssetsService = ServiceLocator.resolve("AssetsService");
            //let resultObj = await AssetsService.getAllAssetsLamp(req.user);

            _context2.next = 3;
            return AssetsService.getDevices(req.user, req.query);

          case 3:
            resultObj = _context2.sent;

            if (!resultObj.errorVal) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj);

          case 8:
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

exports.getAts = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            AssetsService = ServiceLocator.resolve("AssetsService");
            //let resultObj = await AssetsService.getAllAssetsLamp(req.user);

            _context3.next = 3;
            return AssetsService.getAtsdevices(req.user, req.query);

          case 3:
            resultObj = _context3.sent;

            if (!resultObj.errorVal) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj);

          case 8:
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

exports.getInspectableAssets = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            AssetsService = ServiceLocator.resolve("AssetsService");
            _context4.next = 3;
            return AssetsService.getInspectableAssets(req.user, "AssetsModel", "_id");

          case 3:
            resultObj = _context4.sent;

            if (!resultObj.errorVal) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.create = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            AssetsService = ServiceLocator.resolve("AssetsService");
            resultObj = void 0; //= await AssetsService.createAssetsLamp(req.body.asset);

            if (!(req.body.asset.wizard && req.body.asset.wizard == true)) {
              _context5.next = 8;
              break;
            }

            _context5.next = 5;
            return AssetsService.createAssetsLampWizard(req.body.asset);

          case 5:
            resultObj = _context5.sent;
            _context5.next = 11;
            break;

          case 8:
            _context5.next = 10;
            return AssetsService.createAssetsLamp(req.body.asset);

          case 10:
            resultObj = _context5.sent;

          case 11:
            if (!resultObj.errorVal) {
              _context5.next = 13;
              break;
            }

            return _context5.abrupt("return", res.send(resultObj.errorVal));

          case 13:
            res.status(200);
            res.json(resultObj.value);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

exports.assignDevice = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            AssetsService = ServiceLocator.resolve("AssetsService");
            resultObj = void 0; //= await AssetsService.createAssetsLamp(req.body.asset);

            _context6.next = 4;
            return AssetsService.assignDevice(req.body);

          case 4:
            resultObj = _context6.sent;

            if (!resultObj.errorVal) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.send(resultObj.errorVal));

          case 7:
            res.status(200);
            res.json(resultObj.value);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
exports.find = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            AssetsService = ServiceLocator.resolve("AssetsService");
            _context7.next = 3;
            return AssetsService.find(req.params.id);

          case 3:
            resultObj = _context7.sent;

            if (!resultObj.errorVal) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getFloorAndSensors = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
    var AssetsService, resultObj;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            //console.log(req.body);
            AssetsService = ServiceLocator.resolve("AssetsService");
            _context8.next = 3;
            return AssetsService.getFloorAndSensors(req.params.id);

          case 3:
            resultObj = _context8.sent;

            if (!resultObj.errorVal) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.send(resultObj.errorVal));

          case 6:
            res.status(200);
            res.json(resultObj.value);

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function (_x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getParentLinesWithSelf = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res, next) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            _context9.next = 3;
            return assetService.getParentLinesWithSelf(req.user, req.body.criteria);

          case 3:
            resultObj = _context9.sent;
            // TODO: pass filter such as, Railroad, Division, Subdivision

            res.status(resultObj.status);

            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function (_x22, _x23, _x24) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getParentLines = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res, next) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            _context10.next = 3;
            return assetService.getParentLines(req.user);

          case 3:
            resultObj = _context10.sent;
            // TODO: pass filter such as, Railroad, Division, Subdivision

            res.status(resultObj.status);

            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function (_x25, _x26, _x27) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getAssetsForLine = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res, next) {
    var assetService, resultObj, lineName;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            resultObj = {};

            if (!(req.query && req.query.lineName)) {
              _context11.next = 16;
              break;
            }

            _context11.prev = 3;
            lineName = req.query.lineName;
            _context11.next = 7;
            return assetService.getAssetsForLine(lineName, req.user);

          case 7:
            resultObj = _context11.sent;
            _context11.next = 14;
            break;

          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](3);

            resultObj.status = 500;
            resultObj.errVal = _context11.t0;

          case 14:
            _context11.next = 18;
            break;

          case 16:
            resultObj.status = 404;
            resultObj.errorVal = "Missing parameter, lineName";

          case 18:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 20:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this, [[3, 10]]);
  }));

  return function (_x28, _x29, _x30) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getAssetTypeAssets = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(req, res, next) {
    var assetService, assetObj, resultObj;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            assetObj = JSON.parse(req.params.assetObj);
            _context12.next = 4;
            return assetService.getAssetTypeAssets(assetObj);

          case 4:
            resultObj = _context12.sent;

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function (_x31, _x32, _x33) {
    return _ref12.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(req, res, next) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            _context13.next = 3;
            return assetService.updateAsset(req.body);

          case 3:
            resultObj = _context13.sent;

            console.log(resultObj);
            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function (_x34, _x35, _x36) {
    return _ref13.apply(this, arguments);
  };
}();

exports.updateSettings = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(req, res, next) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            _context14.next = 3;
            return assetService.updateSettings(req.params.id, req.body);

          case 3:
            resultObj = _context14.sent;

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function (_x37, _x38, _x39) {
    return _ref14.apply(this, arguments);
  };
}();
exports.updateMultipleAssets = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(req, res, next) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            _context15.next = 3;
            return assetService.updateMultipleAsset(req.body);

          case 3:
            resultObj = _context15.sent;

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 6:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function (_x40, _x41, _x42) {
    return _ref15.apply(this, arguments);
  };
}();
exports.delete = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(req, res, next) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            _context16.next = 3;
            return assetService.deleteAsset(req.params.id);

          case 3:
            resultObj = _context16.sent;

            res.status(resultObj.status);

            if (resultObj.value) {
              res.json(resultObj.value);
            } else {
              res.json(resultObj.errorVal);
            }

          case 6:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function (_x43, _x44, _x45) {
    return _ref16.apply(this, arguments);
  };
}();
exports.multiLine = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(req, res, next) {
    var assetService, resultObj, lines;
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            resultObj = { status: 500, errorVal: "default" };
            lines = [];

            if (req.query.lines) {
              lines = JSON.parse(req.query.lines);
            }
            _context17.prev = 4;
            _context17.next = 7;
            return assetService.multiLineAssets(lines);

          case 7:
            resultObj = _context17.sent;
            _context17.next = 15;
            break;

          case 10:
            _context17.prev = 10;
            _context17.t0 = _context17["catch"](4);

            resultObj.status = 500;
            resultObj.errorVal = _context17.t0.toString();
            console.log("catch", _context17.t0.toString());

          case 15:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 17:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, this, [[4, 10]]);
  }));

  return function (_x46, _x47, _x48) {
    return _ref17.apply(this, arguments);
  };
}();

exports.getLocationSetup = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(req, res) {
    var locationService, resultObj;
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            locationService = ServiceLocator.resolve("LocationService");
            _context18.next = 3;
            return locationService.getLocations(req.params.id);

          case 3:
            resultObj = _context18.sent;

            res.status(resultObj.status);
            if (resultObj.value) {
              res.json(resultObj.value);
            } else {
              res.json(resultObj.errorVal);
            }

          case 6:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function (_x49, _x50) {
    return _ref18.apply(this, arguments);
  };
}();

exports.updateLocationSetup = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(req, res) {
    var locationService, resultObj;
    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            locationService = ServiceLocator.resolve("LocationService");
            _context19.next = 3;
            return locationService.updateLocations(req.params.id, req.body);

          case 3:
            resultObj = _context19.sent;

            res.status(resultObj.status);
            if (resultObj.value) {
              res.json(resultObj.value);
            } else {
              res.json(resultObj.errorVal);
            }

          case 6:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, this);
  }));

  return function (_x51, _x52) {
    return _ref19.apply(this, arguments);
  };
}();

exports.getUnAssignedAssets = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(req, res) {
    var assetService, resultObj;
    return _regenerator2.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            assetService = ServiceLocator.resolve("AssetsService");
            _context20.next = 3;
            return assetService.getUnAssignedAssets();

          case 3:
            resultObj = _context20.sent;

            res.status(resultObj.status);
            if (resultObj.value) {
              res.json(resultObj.value);
            } else {
              res.json(resultObj.errorVal);
            }

          case 6:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, this);
  }));

  return function (_x53, _x54) {
    return _ref20.apply(this, arguments);
  };
}();

exports.getAssetTree = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(req, res) {
    var AssetsTreeService, resultObj;
    return _regenerator2.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            AssetsTreeService = ServiceLocator.resolve("AssetsTreeService");
            _context21.next = 3;
            return AssetsTreeService.getTreeByUser(req.user.assignedLocation);

          case 3:
            resultObj = _context21.sent;

            res.status(resultObj.status);
            if (resultObj.value) {
              res.json(resultObj.value);
            } else {
              res.json(resultObj.errorVal);
            }

          case 6:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, this);
  }));

  return function (_x55, _x56) {
    return _ref21.apply(this, arguments);
  };
}();