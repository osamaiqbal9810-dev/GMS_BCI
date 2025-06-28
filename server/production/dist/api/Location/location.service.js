"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assets = require("../assets/assets.modal");

var _assets2 = _interopRequireDefault(_assets);

var _assetTypes = require("../assetTypes/assetTypes.model");

var _assetTypes2 = _interopRequireDefault(_assetTypes);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");

var LocationService = function () {
  function LocationService() {
    (0, _classCallCheck3.default)(this, LocationService);
  }

  (0, _createClass3.default)(LocationService, [{
    key: "getLocations",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(template) {
        var resultObj, locationsTypes, assetsLocations, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, loc, als;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = void 0;
                _context.prev = 1;

                if (!(template == "railRoad")) {
                  _context.next = 38;
                  break;
                }

                _context.next = 5;
                return _assetTypes2.default.find({ location: true }).exec();

              case 5:
                locationsTypes = _context.sent;
                assetsLocations = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 10;
                _iterator = locationsTypes[Symbol.iterator]();

              case 12:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 21;
                  break;
                }

                loc = _step.value;
                _context.next = 16;
                return _assets2.default.find({ assetType: loc.assetType, isRemoved: !true }).exec();

              case 16:
                als = _context.sent;

                assetsLocations = [].concat((0, _toConsumableArray3.default)(assetsLocations), (0, _toConsumableArray3.default)(als));

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
                resultObj = { value: { assetTypes: locationsTypes, assets: assetsLocations }, status: 200 };
                _context.next = 39;
                break;

              case 38:
                resultObj = { errorVal: "Template Logic not found", status: 404 };

              case 39:
                _context.next = 44;
                break;

              case 41:
                _context.prev = 41;
                _context.t1 = _context["catch"](1);

                resultObj = { errorVal: _context.t1.toString(), status: 500 };

              case 44:
                return _context.abrupt("return", resultObj);

              case 45:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 41], [10, 23, 27, 35], [28,, 30, 34]]);
      }));

      function getLocations(_x) {
        return _ref.apply(this, arguments);
      }

      return getLocations;
    }()
  }, {
    key: "updateLocations",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id, body) {
        var resultObj, assetsTreeService, majorGeoAType, company, minorGeoAType, locationAType, createTreeCheck, assetType, parentAssetType, index, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, pAllowed;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = void 0;
                _context2.prev = 1;

                if (!body.checkBoxChange) {
                  _context2.next = 46;
                  break;
                }

                assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
                _context2.next = 6;
                return _assetTypes2.default.findOne({ _id: body.assetTypes.majorGeoType._id }).exec();

              case 6:
                majorGeoAType = _context2.sent;
                _context2.next = 9;
                return _assetTypes2.default.findOne({ _id: majorGeoAType.parentAssetType }).exec();

              case 9:
                company = _context2.sent;
                _context2.next = 12;
                return _assetTypes2.default.findOne({ _id: body.assetTypes.minorGeoType._id }).exec();

              case 12:
                minorGeoAType = _context2.sent;
                _context2.next = 15;
                return _assetTypes2.default.findOne({ _id: body.assetTypes.locationIdentifier._id }).exec();

              case 15:
                locationAType = _context2.sent;
                _context2.next = 18;
                return this.changeAssetsLevel({ majorGeoAType: majorGeoAType, minorGeoAType: minorGeoAType, locationAType: locationAType }, {
                  majorGeoAType: body.assetTypes.majorGeoType,
                  minorGeoAType: body.assetTypes.minorGeoType,
                  locationAType: body.assetTypes.locationIdentifier
                });

              case 18:
                createTreeCheck = _context2.sent;

                if (!(majorGeoAType.plannable != body.assetTypes.majorGeoType.plannable)) {
                  _context2.next = 23;
                  break;
                }

                if (body.assetTypes.majorGeoType.plannable) {
                  company.menuFilter = true;
                } else {
                  company.menuFilter = false;
                }
                _context2.next = 23;
                return company.save();

              case 23:
                majorGeoAType.plannable = body.assetTypes.majorGeoType.plannable;
                minorGeoAType.plannable = body.assetTypes.minorGeoType.plannable;
                locationAType.plannable = body.assetTypes.locationIdentifier.plannable;
                majorGeoAType.menuFilter = body.assetTypes.majorGeoType.menuFilter;
                minorGeoAType.menuFilter = body.assetTypes.minorGeoType.menuFilter;
                locationAType.menuFilter = body.assetTypes.locationIdentifier.menuFilter;

                _context2.next = 31;
                return company.save();

              case 31:
                _context2.next = 33;
                return majorGeoAType.save();

              case 33:
                _context2.next = 35;
                return minorGeoAType.save();

              case 35:
                _context2.next = 37;
                return locationAType.save();

              case 37:
                _context2.t0 = createTreeCheck;

                if (!_context2.t0) {
                  _context2.next = 41;
                  break;
                }

                _context2.next = 41;
                return assetsTreeService.createHierarchyTree();

              case 41:
                _context2.next = 43;
                return this.getLocations("railRoad");

              case 43:
                resultObj = _context2.sent;
                _context2.next = 83;
                break;

              case 46:
                _context2.next = 48;
                return _assetTypes2.default.findOne({ _id: body._id }).exec();

              case 48:
                assetType = _context2.sent;
                _context2.next = 51;
                return _assetTypes2.default.findOne({ _id: assetType.parentAssetType });

              case 51:
                parentAssetType = _context2.sent;
                index = -1;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 56;

                for (_iterator2 = parentAssetType.allowedAssetTypes[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  pAllowed = _step2.value;

                  index++;
                  if (pAllowed == assetType.assetType) parentAssetType.allowedAssetTypes[index] = body.assetType;
                }

                _context2.next = 64;
                break;

              case 60:
                _context2.prev = 60;
                _context2.t1 = _context2["catch"](56);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t1;

              case 64:
                _context2.prev = 64;
                _context2.prev = 65;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 67:
                _context2.prev = 67;

                if (!_didIteratorError2) {
                  _context2.next = 70;
                  break;
                }

                throw _iteratorError2;

              case 70:
                return _context2.finish(67);

              case 71:
                return _context2.finish(64);

              case 72:
                _context2.next = 74;
                return _assets2.default.updateMany({ assetType: assetType.assetType }, { $set: { assetType: body.assetType } });

              case 74:
                assetType.assetType = body.assetType;
                parentAssetType.markModified("allowedAssetTypes");
                _context2.next = 78;
                return parentAssetType.save();

              case 78:
                _context2.next = 80;
                return assetType.save();

              case 80:
                _context2.next = 82;
                return this.getLocations("railRoad");

              case 82:
                resultObj = _context2.sent;

              case 83:
                _context2.next = 88;
                break;

              case 85:
                _context2.prev = 85;
                _context2.t2 = _context2["catch"](1);

                console.log("Error in updateLocations: " + _context2.t2.toString());

              case 88:
                return _context2.abrupt("return", resultObj);

              case 89:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 85], [56, 60, 64, 72], [65,, 67, 71]]);
      }));

      function updateLocations(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return updateLocations;
    }()
  }, {
    key: "changeAssetsLevel",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(prevAssetType, newAssetType) {
        var createTreeAgainCheck, keys, levelATypes, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, key, newAssetTypePlannable, notSameAsPrev, isNewPlannable, assets, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, asset, checkLocationAsset, parentLocationAsset, parentAsset;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                createTreeAgainCheck = true;
                keys = Object.keys(prevAssetType);
                levelATypes = {
                  majorGeoAType: 1,
                  minorGeoAType: 2,
                  locationAType: 3
                };
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 6;
                _iterator3 = keys[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context3.next = 59;
                  break;
                }

                key = _step3.value;
                newAssetTypePlannable = newAssetType[key].plannable == true;
                notSameAsPrev = prevAssetType[key].plannable != newAssetType[key].plannable;
                isNewPlannable = newAssetTypePlannable && notSameAsPrev;

                if (!isNewPlannable) {
                  _context3.next = 56;
                  break;
                }

                _context3.next = 16;
                return _assets2.default.find().exec();

              case 16:
                assets = _context3.sent;
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context3.prev = 20;
                _iterator4 = assets[Symbol.iterator]();

              case 22:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context3.next = 42;
                  break;
                }

                asset = _step4.value;
                checkLocationAsset = false;
                parentLocationAsset = false;

                if (asset.assetType == newAssetType.majorGeoAType.assetType || asset.assetType == newAssetType.minorGeoAType.assetType || asset.assetType == newAssetType.locationAType.assetType) {
                  checkLocationAsset = true;
                }
                _context3.next = 29;
                return _lodash2.default.find(assets, { id: asset.parentAsset });

              case 29:
                parentAsset = _context3.sent;


                if (asset.parentAsset && parentAsset && (parentAsset.assetType == newAssetType.majorGeoAType.assetType || parentAsset.assetType == newAssetType.minorGeoAType.assetType || parentAsset.assetType == newAssetType.locationAType.assetType)) {
                  parentLocationAsset = true;
                }

                if (!(asset.parentAsset && !checkLocationAsset && parentLocationAsset)) {
                  _context3.next = 39;
                  break;
                }

                if (!asset.levels[levelATypes[key]]) {
                  _context3.next = 39;
                  break;
                }

                asset.parentAsset = asset.levels[levelATypes[key].toString()];
                asset.levels.currentLevel = levelATypes[key];
                asset.markModified("levels");
                _context3.next = 38;
                return asset.save();

              case 38:
                createTreeAgainCheck = true;

              case 39:
                _iteratorNormalCompletion4 = true;
                _context3.next = 22;
                break;

              case 42:
                _context3.next = 48;
                break;

              case 44:
                _context3.prev = 44;
                _context3.t0 = _context3["catch"](20);
                _didIteratorError4 = true;
                _iteratorError4 = _context3.t0;

              case 48:
                _context3.prev = 48;
                _context3.prev = 49;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 51:
                _context3.prev = 51;

                if (!_didIteratorError4) {
                  _context3.next = 54;
                  break;
                }

                throw _iteratorError4;

              case 54:
                return _context3.finish(51);

              case 55:
                return _context3.finish(48);

              case 56:
                _iteratorNormalCompletion3 = true;
                _context3.next = 8;
                break;

              case 59:
                _context3.next = 65;
                break;

              case 61:
                _context3.prev = 61;
                _context3.t1 = _context3["catch"](6);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t1;

              case 65:
                _context3.prev = 65;
                _context3.prev = 66;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 68:
                _context3.prev = 68;

                if (!_didIteratorError3) {
                  _context3.next = 71;
                  break;
                }

                throw _iteratorError3;

              case 71:
                return _context3.finish(68);

              case 72:
                return _context3.finish(65);

              case 73:
                return _context3.abrupt("return", createTreeAgainCheck);

              case 74:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 61, 65, 73], [20, 44, 48, 56], [49,, 51, 55], [66,, 68, 72]]);
      }));

      function changeAssetsLevel(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return changeAssetsLevel;
    }()
  }]);
  return LocationService;
}();

exports.default = LocationService;