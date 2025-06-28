"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeRailsAssetType = exports.setAssetTypesDisplayNameProperty = exports.setAssetTypesToInspectable = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var setAssetTypesToInspectable = exports.setAssetTypesToInspectable = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(execute, system) {
    var assetTypesToInspectable, assetTypes, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, aType, foundAType;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!system) {
              _context.next = 39;
              break;
            }

            if (!execute) {
              _context.next = 37;
              break;
            }

            assetTypesToInspectable = system == "TIMPS" ? assetTypesListForInspectable : assetTypesForSCIMInspectable;
            _context.next = 5;
            return _assetTypes2.default.find().exec();

          case 5:
            assetTypes = _context.sent;

            if (!assetTypes) {
              _context.next = 36;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;
            _iterator = assetTypes[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 21;
              break;
            }

            aType = _step.value;
            foundAType = _lodash2.default.find(assetTypesToInspectable, { assetType: aType.assetType });

            aType.inspectable = foundAType ? foundAType.inspectable : false;

            _context.next = 18;
            return aType.save();

          case 18:
            _iteratorNormalCompletion = true;
            _context.next = 12;
            break;

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
            console.log("Updated " + assetTypes.length + " inspectable value");

          case 36:
            recreateAssetTree();

          case 37:
            _context.next = 40;
            break;

          case 39:
            console.log("Please identify TIMPS or SCIM in method setAssetTypesToInspectable for its execution");

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[10, 23, 27, 35], [28,, 30, 34]]);
  }));

  return function setAssetTypesToInspectable(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var setAssetTypesDisplayNameProperty = exports.setAssetTypesDisplayNameProperty = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(execute) {
    var assetTypes, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, aType;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!execute) {
              _context2.next = 35;
              break;
            }

            _context2.next = 3;
            return _assetTypes2.default.find().exec();

          case 3:
            assetTypes = _context2.sent;

            if (!assetTypes) {
              _context2.next = 35;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 8;
            _iterator2 = assetTypes[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 19;
              break;
            }

            aType = _step2.value;

            !aType.displayName && (aType.displayName = aType.assetType);
            aType.displayName = aType.displayName.charAt(0).toUpperCase() + aType.displayName.slice(1);
            _context2.next = 16;
            return aType.save();

          case 16:
            _iteratorNormalCompletion2 = true;
            _context2.next = 10;
            break;

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](8);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 25:
            _context2.prev = 25;
            _context2.prev = 26;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 28:
            _context2.prev = 28;

            if (!_didIteratorError2) {
              _context2.next = 31;
              break;
            }

            throw _iteratorError2;

          case 31:
            return _context2.finish(28);

          case 32:
            return _context2.finish(25);

          case 33:
            recreateAssetTree();
            console.log("Updated " + assetTypes.length + " display name and capitalized first letter");

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[8, 21, 25, 33], [26,, 28, 32]]);
  }));

  return function setAssetTypesDisplayNameProperty(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var removeRailsAssetType = exports.removeRailsAssetType = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(execute) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!execute) {
              _context3.next = 7;
              break;
            }

            console.log("Executing Removal Method for Rails related assetTypes and assets");
            _context3.next = 4;
            return _assetTypes2.default.remove({ $or: [{ assetType: "Rail" }, { assetType: "rail" }] }).exec();

          case 4:
            _context3.next = 6;
            return _assets2.default.remove({ $or: [{ assetType: "Rail" }, { assetType: "rail" }] }).exec();

          case 6:
            recreateAssetTree();

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function removeRailsAssetType(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _assetTypes = require("../../../api/assetTypes/assetTypes.model");

var _assetTypes2 = _interopRequireDefault(_assetTypes);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _assets = require("../../../api/assets/assets.modal");

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../../framework/servicelocator");

function recreateAssetTree() {
  var assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
  assetsTreeService.createHierarchyTree();
}

var assetTypesListForInspectable = [{ assetType: "track", inspectable: true }, { assetType: "Switch", inspectable: true }, { assetType: "Yard", inspectable: true }, { assetType: "CWR Track", inspectable: true }, { assetType: "Side Track", inspectable: true }, { inspectable: true, assetType: "Yard" }, { inspectable: true, assetType: "Derail" }];

var assetTypesForSCIMInspectable = [{ assetType: "Signal", inspectable: true }, { assetType: "Bridge", inspectable: true }, { assetType: "Crossing", inspectable: true }, { assetType: "Station", inspectable: true },
// {
//   inspectable: true,
//   assetType: "Yard",
// },
// {
//   inspectable: true,
//   assetType: "Derail",
// },
{
  inspectable: true,
  assetType: "Intermediate"
}, {
  inspectable: true,
  assetType: "Dragging equipment detector"
}, {
  inspectable: true,
  assetType: "Wheel impact load detector"
}, {
  inspectable: true,
  assetType: "Land slide detector"
}, {
  inspectable: true,
  assetType: "T-bogie/ bogies geometry"
}, {
  inspectable: true,
  assetType: "Repeater"
}, {
  inspectable: true,
  assetType: "Accoustic bearing detector"
}, {
  inspectable: true,
  assetType: "Hot Box detector"
}, {
  inspectable: true,
  assetType: "Wheel profile"
}, {
  inspectable: true,
  assetType: "Interlocking"
},
// {
//     inspectable : true,
//     assetType : "Switch"
// },
{
  inspectable: true,
  assetType: "Control Point"
}, { inspectable: true, assetType: "Weather Station" }];