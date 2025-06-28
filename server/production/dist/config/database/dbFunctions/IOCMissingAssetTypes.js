"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAssetTypesForIOC = exports.addIOCMissingAssetTypes = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var addIOCMissingAssetTypes = exports.addIOCMissingAssetTypes = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(execute) {
    var change, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, aType, aTypeToAdd, checkExist, newAType;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!execute) {
              _context.next = 39;
              break;
            }

            change = false;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;
            _iterator = IOCAssetTypesList[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 25;
              break;
            }

            aType = _step.value;
            aTypeToAdd = (0, _extends3.default)({}, aTypeGeneric);

            aTypeToAdd.assetType = aType;

            _context.next = 13;
            return _assetTypes2.default.findOne({ assetType: aType });

          case 13:
            checkExist = _context.sent;

            if (checkExist) {
              _context.next = 22;
              break;
            }

            _context.next = 17;
            return _assetTypes2.default.create(aTypeToAdd);

          case 17:
            newAType = _context.sent;
            _context.next = 20;
            return newAType.save();

          case 20:
            change = true;
            console.log("Created for IOC assetType :  " + aType);

          case 22:
            _iteratorNormalCompletion = true;
            _context.next = 7;
            break;

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 34:
            _context.prev = 34;

            if (!_didIteratorError) {
              _context.next = 37;
              break;
            }

            throw _iteratorError;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(31);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 27, 31, 39], [32,, 34, 38]]);
  }));

  return function addIOCMissingAssetTypes(_x) {
    return _ref.apply(this, arguments);
  };
}();

var removeAssetTypesForIOC = exports.removeAssetTypesForIOC = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(execute) {
    var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, aType;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!execute) {
              _context2.next = 28;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 4;
            _iterator2 = iocAssetTypeToRemove[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 14;
              break;
            }

            aType = _step2.value;
            _context2.next = 10;
            return _assetTypes2.default.deleteOne({ assetType: aType });

          case 10:
            console.log("Removed if it existed for IOC assetType : " + aType);

          case 11:
            _iteratorNormalCompletion2 = true;
            _context2.next = 6;
            break;

          case 14:
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 20:
            _context2.prev = 20;
            _context2.prev = 21;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 23:
            _context2.prev = 23;

            if (!_didIteratorError2) {
              _context2.next = 26;
              break;
            }

            throw _iteratorError2;

          case 26:
            return _context2.finish(23);

          case 27:
            return _context2.finish(20);

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 16, 20, 28], [21,, 23, 27]]);
  }));

  return function removeAssetTypesForIOC(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _assets = require("../../../api/assets/assets.modal");

var _assets2 = _interopRequireDefault(_assets);

var _assetTypes = require("../../../api/assetTypes/assetTypes.model");

var _assetTypes2 = _interopRequireDefault(_assetTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../../framework/servicelocator");

var aTypeGeneric = {
  lampAttributes: [],
  timpsAttributes: null,
  diagnosticAttributes: null,
  inspectionInstructions: "{}",
  inspectionForms: "{}",
  inspectionFormsObj: null,
  defectCodes: null,
  defectCodesObj: null,
  inspectable: true,
  plannable: false,
  location: false,
  menuFilter: false,
  allowedAssetTypes: [],
  parentAssetType: null,
  accessPermission: null,
  assetTypeClassify: "point",
  assetType: ""
};

var IOCAssetTypesList = ["Frog", "Hot wheel detector"];
var iocAssetTypeToRemove = ["3rd Rail", "Catenary Power", "Signal", "Interlocking", "Yard", "yard"];