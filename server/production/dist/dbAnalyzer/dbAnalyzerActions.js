"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.funcs = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var analyzePlannableLocationsTimeZone = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fix) {
    var report, plannableAtype, plannableAssets, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, asset;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            report = { resultsArray: [] };
            _context.prev = 1;
            _context.next = 4;
            return _assetTypes2.default.findOne({ plannable: true, location: true });

          case 4:
            plannableAtype = _context.sent;

            if (!plannableAtype) {
              _context.next = 53;
              break;
            }

            _context.next = 8;
            return _assets2.default.find({ assetType: plannableAtype.assetType });

          case 8:
            plannableAssets = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;
            _iterator = plannableAssets[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 37;
              break;
            }

            asset = _step.value;

            if (!(asset.attributes && asset.attributes.timezone && typeof asset.attributes.timezone == "string")) {
              _context.next = 21;
              break;
            }

            report.result = true;
            report.resultsArray.push({ id: asset.id, name: asset.unitId, result: true });
            _context.next = 34;
            break;

          case 21:
            if (!fix) {
              _context.next = 32;
              break;
            }

            !asset.attributes && (asset.attributes = {});
            asset.attributes.timezone = "EST5EDT";
            asset.markModified("attributes");
            _context.next = 27;
            return asset.save();

          case 27:
            report.resultsArray.push({ id: asset.id, name: asset.unitId, result: true, fixed: true });
            report.fixed = true;
            report.result = true;
            _context.next = 34;
            break;

          case 32:
            report.resultsArray.push({ id: asset.id, name: asset.unitId, result: false });
            report.result = false;

          case 34:
            _iteratorNormalCompletion = true;
            _context.next = 14;
            break;

          case 37:
            _context.next = 43;
            break;

          case 39:
            _context.prev = 39;
            _context.t0 = _context["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 43:
            _context.prev = 43;
            _context.prev = 44;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 46:
            _context.prev = 46;

            if (!_didIteratorError) {
              _context.next = 49;
              break;
            }

            throw _iteratorError;

          case 49:
            return _context.finish(46);

          case 50:
            return _context.finish(43);

          case 51:
            _context.next = 55;
            break;

          case 53:
            console.log("Fatal Error : NO Plannable Asset Type Location Exist");
            report.error = "Fatal Error : NO Plannable Asset Type Location Exist";

          case 55:
            _context.next = 61;
            break;

          case 57:
            _context.prev = 57;
            _context.t1 = _context["catch"](1);

            console.log("Error in analyzePlannableLocationsTimeZone : " + _context.t1);
            report.error = _context.t1;

          case 61:
            console.log(report);
            return _context.abrupt("return", report);

          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 57], [12, 39, 43, 51], [44,, 46, 50]]);
  }));

  return function analyzePlannableLocationsTimeZone(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _assets = require("../api/assets/assets.modal");

var _assets2 = _interopRequireDefault(_assets);

var _assetTypes = require("../api/assetTypes/assetTypes.model");

var _assetTypes2 = _interopRequireDefault(_assetTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var funcs = exports.funcs = [{
  name: "F0",
  method: analyzePlannableLocationsTimeZone
}];