"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var AssetsTreeModel = require("./assetsTreeModel");
var ObjectId = require("mongodb").ObjectID;
var turf = require("@turf/turf");

var AssetsTreeService = function () {
  function AssetsTreeService() {
    (0, _classCallCheck3.default)(this, AssetsTreeService);
  }

  (0, _createClass3.default)(AssetsTreeService, [{
    key: "resolveLocation",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(geoJsonCord, milePost, uom) {
        var _geoJsonCord, line, along, coordinates;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _geoJsonCord = geoJsonCord.features ? geoJsonCord.features[0].geometry.coordinates : geoJsonCord.geometry.coordinates;
                line = turf.lineString(_geoJsonCord, { name: "line 1" });
                along = turf.along(line, milePost, { units: uom });
                coordinates = along ? along.geometry.coordinates : [];
                //return coordinates;

                return _context.abrupt("return", [coordinates[1], coordinates[0]]);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resolveLocation(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return resolveLocation;
    }()
  }, {
    key: "createHierarchyTree",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var AssetsModel, AssetsTypeModel, allAssetTypes_Org, allAssetTypesArray, allAssetTypes, allAssets_Org, allAssets, assetsTree, groupedAssets, groupedKeys, groupedLength, count, arrayOfFoundFilledNodes, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, gKey, found, check, obj, newData, savedData, _savedData;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                AssetsModel = void 0;
                AssetsTypeModel = void 0;

                AssetsModel = ServiceLocator.resolve("AssetsModel");
                AssetsTypeModel = ServiceLocator.resolve("AssetTypesModel");
                _context2.next = 6;
                return AssetsTypeModel.find().exec();

              case 6:
                allAssetTypes_Org = _context2.sent;
                allAssetTypesArray = [].concat((0, _toConsumableArray3.default)(allAssetTypes_Org));
                allAssetTypes = {};

                allAssetTypesArray.forEach(function (val) {
                  return allAssetTypes[val.assetType] = {
                    assetType: val.assetType,
                    inspectable: val.inspectable,
                    plannable: val.plannable,
                    location: val.location,
                    assetTypeClassify: val.assetTypeClassify,
                    menuFilter: val.menuFilter,
                    displayName: val.displayName ? val.displayName : val.assetType
                  };
                });

                // try {
                _context2.next = 12;
                return AssetsModel.find({ isRemoved: false }).exec();

              case 12:
                allAssets_Org = _context2.sent;
                allAssets = [].concat((0, _toConsumableArray3.default)(allAssets_Org));
                assetsTree = {};

                if (!allAssets) {
                  _context2.next = 78;
                  break;
                }

                groupedAssets = _lodash2.default.groupBy(allAssets, "parentAsset");
                groupedKeys = Object.keys(groupedAssets);
                _context2.next = 20;
                return this.createHighestLevelTree(groupedAssets["null"], assetsTree, allAssetTypes);

              case 20:
                groupedLength = groupedKeys.length;
                count = 0;
                arrayOfFoundFilledNodes = {};

              case 23:
                if (!(count < groupedLength - 1)) {
                  _context2.next = 56;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 27;
                _iterator = groupedKeys[Symbol.iterator]();

              case 29:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 39;
                  break;
                }

                gKey = _step.value;

                if (!(gKey !== "" && gKey !== "null" && !arrayOfFoundFilledNodes[gKey])) {
                  _context2.next = 36;
                  break;
                }

                _context2.next = 34;
                return this.findAndCreateAssetIdInPosition(gKey, assetsTree, groupedAssets[gKey], allAssetTypes);

              case 34:
                found = _context2.sent;

                if (found) {
                  groupedAssets[gKey] = [];
                  arrayOfFoundFilledNodes[gKey] = {};
                }

              case 36:
                _iteratorNormalCompletion = true;
                _context2.next = 29;
                break;

              case 39:
                _context2.next = 45;
                break;

              case 41:
                _context2.prev = 41;
                _context2.t0 = _context2["catch"](27);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 45:
                _context2.prev = 45;
                _context2.prev = 46;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 48:
                _context2.prev = 48;

                if (!_didIteratorError) {
                  _context2.next = 51;
                  break;
                }

                throw _iteratorError;

              case 51:
                return _context2.finish(48);

              case 52:
                return _context2.finish(45);

              case 53:
                count++;
                _context2.next = 23;
                break;

              case 56:
                _context2.next = 58;
                return AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();

              case 58:
                check = _context2.sent;

                if (check) {
                  _context2.next = 73;
                  break;
                }

                obj = {};


                obj.assetsTreeObj = assetsTree;
                obj.tag = "AssetTree";
                // let newData = new AssetsTreeModel(obj);
                _context2.next = 65;
                return AssetsTreeModel.create(obj);

              case 65:
                newData = _context2.sent;

                newData.assetsTreeObj = assetsTree;
                newData.markModified("assetsTreeObj");
                _context2.next = 70;
                return newData.save();

              case 70:
                savedData = _context2.sent;
                _context2.next = 78;
                break;

              case 73:
                check.assetsTreeObj = assetsTree;
                check.markModified("assetsTreeObj");
                _context2.next = 77;
                return check.save();

              case 77:
                _savedData = _context2.sent;

              case 78:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[27, 41, 45, 53], [46,, 48, 52]]);
      }));

      function createHierarchyTree() {
        return _ref2.apply(this, arguments);
      }

      return createHierarchyTree;
    }()
  }, {
    key: "recursivelyFindAssetId",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id, treeBranch, foundAssetInsideTree, found) {
        var aIds, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, key;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (found) {
                  _context3.next = 42;
                  break;
                }

                aIds = Object.keys(treeBranch);
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 6;
                _iterator2 = aIds[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context3.next = 28;
                  break;
                }

                key = _step2.value;

                if (!found) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", found);

              case 12:
                if (!((0, _typeof3.default)(treeBranch[key]) === "object")) {
                  _context3.next = 24;
                  break;
                }

                if (!(key == id)) {
                  _context3.next = 19;
                  break;
                }

                foundAssetInsideTree[key] = treeBranch[key];
                found = true;
                return _context3.abrupt("return", found);

              case 19:
                _context3.next = 21;
                return this.recursivelyFindAssetId(id, treeBranch[key], foundAssetInsideTree, found);

              case 21:
                found = _context3.sent;

              case 22:
                _context3.next = 25;
                break;

              case 24:
                return _context3.abrupt("return", false);

              case 25:
                _iteratorNormalCompletion2 = true;
                _context3.next = 8;
                break;

              case 28:
                _context3.next = 34;
                break;

              case 30:
                _context3.prev = 30;
                _context3.t0 = _context3["catch"](6);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t0;

              case 34:
                _context3.prev = 34;
                _context3.prev = 35;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 37:
                _context3.prev = 37;

                if (!_didIteratorError2) {
                  _context3.next = 40;
                  break;
                }

                throw _iteratorError2;

              case 40:
                return _context3.finish(37);

              case 41:
                return _context3.finish(34);

              case 42:
                return _context3.abrupt("return", found);

              case 45:
                _context3.prev = 45;
                _context3.t1 = _context3["catch"](0);

                console.log("error in recursivelyFindAssetId : ", _context3.t1);

              case 48:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 45], [6, 30, 34, 42], [35,, 37, 41]]);
      }));

      function recursivelyFindAssetId(_x4, _x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return recursivelyFindAssetId;
    }()
  }, {
    key: "recursivelyFindAssetIdAndFilter",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id, treeBranch, foundAssetInsideTree, found) {
        var aIds, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, key;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (found) {
                  _context4.next = 42;
                  break;
                }

                aIds = Object.keys(treeBranch);
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context4.prev = 6;
                _iterator3 = aIds[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context4.next = 28;
                  break;
                }

                key = _step3.value;

                if (!found) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", found);

              case 12:
                if (!((0, _typeof3.default)(treeBranch[key]) === "object")) {
                  _context4.next = 24;
                  break;
                }

                if (!(key == id)) {
                  _context4.next = 19;
                  break;
                }

                foundAssetInsideTree[key] = treeBranch[key];
                found = true;
                return _context4.abrupt("return", found);

              case 19:
                _context4.next = 21;
                return this.recursivelyFindAssetId(id, treeBranch[key], foundAssetInsideTree, found);

              case 21:
                found = _context4.sent;

              case 22:
                _context4.next = 25;
                break;

              case 24:
                return _context4.abrupt("return", false);

              case 25:
                _iteratorNormalCompletion3 = true;
                _context4.next = 8;
                break;

              case 28:
                _context4.next = 34;
                break;

              case 30:
                _context4.prev = 30;
                _context4.t0 = _context4["catch"](6);
                _didIteratorError3 = true;
                _iteratorError3 = _context4.t0;

              case 34:
                _context4.prev = 34;
                _context4.prev = 35;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 37:
                _context4.prev = 37;

                if (!_didIteratorError3) {
                  _context4.next = 40;
                  break;
                }

                throw _iteratorError3;

              case 40:
                return _context4.finish(37);

              case 41:
                return _context4.finish(34);

              case 42:
                return _context4.abrupt("return", found);

              case 45:
                _context4.prev = 45;
                _context4.t1 = _context4["catch"](0);

                console.log("error in recursivelyFindAssetId : ", _context4.t1);

              case 48:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 45], [6, 30, 34, 42], [35,, 37, 41]]);
      }));

      function recursivelyFindAssetIdAndFilter(_x8, _x9, _x10, _x11) {
        return _ref4.apply(this, arguments);
      }

      return recursivelyFindAssetIdAndFilter;
    }()
  }, {
    key: "findAndCreateAssetIdInPosition",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id, assetsTree, groupedAssets, allAssetTypes) {
        var foundAssetInsideTree, found, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, g_asset, locationParameters, key;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                foundAssetInsideTree = [];
                found = false;
                _context5.next = 4;
                return this.recursivelyFindAssetId(id, assetsTree, foundAssetInsideTree, found);

              case 4:
                found = _context5.sent;

                if (!found) {
                  _context5.next = 25;
                  break;
                }

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context5.prev = 9;

                for (_iterator4 = groupedAssets[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  g_asset = _step4.value;
                  locationParameters = {};
                  key = Object.keys(foundAssetInsideTree)[0];

                  if (foundAssetInsideTree[key].properties.location) {
                    locationParameters = { locationId: id, locationName: foundAssetInsideTree[key].properties.unitId };
                  } else {
                    locationParameters = {
                      locationId: foundAssetInsideTree[key].properties.locationId,
                      locationName: foundAssetInsideTree[key].properties.locationName
                    };
                  }
                  // let assetTypes = allAssetTypes[g_asset.assetType];
                  // if (assetTypes) {
                  // console.log("Key"+key);
                  foundAssetInsideTree[key][g_asset._id] = {
                    properties: (0, _extends3.default)({}, locationParameters)
                  };
                  // } else {
                  //   console.log("Asset Type '" + g_asset.assetType + "' not found");
                  //   assetsTree[g_asset._id] = { properties: {} };
                  // }
                }
                _context5.next = 17;
                break;

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](9);
                _didIteratorError4 = true;
                _iteratorError4 = _context5.t0;

              case 17:
                _context5.prev = 17;
                _context5.prev = 18;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 20:
                _context5.prev = 20;

                if (!_didIteratorError4) {
                  _context5.next = 23;
                  break;
                }

                throw _iteratorError4;

              case 23:
                return _context5.finish(20);

              case 24:
                return _context5.finish(17);

              case 25:
                return _context5.abrupt("return", found);

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[9, 13, 17, 25], [18,, 20, 24]]);
      }));

      function findAndCreateAssetIdInPosition(_x12, _x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
      }

      return findAndCreateAssetIdInPosition;
    }()
  }, {
    key: "createHighestLevelTree",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(pObj, assetsTree, allAssetTypes) {
        var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, obj, assetTypes;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context6.prev = 3;


                for (_iterator5 = pObj[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  obj = _step5.value;
                  assetTypes = allAssetTypes[obj.assetType];


                  if (assetTypes) {
                    assetsTree[obj._id] = {
                      properties: {
                        unitId: obj.unitId,
                        assetType: assetTypes.assetType,
                        inspectable: assetTypes.inspectable,
                        plannable: assetTypes.plannable,
                        location: assetTypes.location,
                        menuFilter: assetTypes.menuFilter,
                        assetTypeClassify: assetTypes.assetTypeClassify,
                        displayName: assetTypes.displayName ? assetTypes.displayName : assetTypes.assetType
                      }
                    };
                  } else {
                    assetsTree[obj._id] = { properties: {} };
                  }
                }
                _context6.next = 11;
                break;

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](3);
                _didIteratorError5 = true;
                _iteratorError5 = _context6.t0;

              case 11:
                _context6.prev = 11;
                _context6.prev = 12;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 14:
                _context6.prev = 14;

                if (!_didIteratorError5) {
                  _context6.next = 17;
                  break;
                }

                throw _iteratorError5;

              case 17:
                return _context6.finish(14);

              case 18:
                return _context6.finish(11);

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 7, 11, 19], [12,, 14, 18]]);
      }));

      function createHighestLevelTree(_x16, _x17, _x18) {
        return _ref6.apply(this, arguments);
      }

      return createHighestLevelTree;
    }()
  }, {
    key: "getAllPlannableLocations",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var user;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getTreeTopMostNodeId();

              case 2:
                _context7.t0 = _context7.sent;
                user = {
                  _id: "admin",
                  assignedLocation: _context7.t0
                };
                _context7.next = 6;
                return this.getPlannableLocations(user);

              case 6:
                return _context7.abrupt("return", _context7.sent);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getAllPlannableLocations() {
        return _ref7.apply(this, arguments);
      }

      return getAllPlannableLocations;
    }()
  }, {
    key: "getPlannableLocations",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(user) {
        var _AssetsTreeModel, AssetModel, assetTypeService, assetTree, resultObj, userAssignedLocation, foundAssetInsideTree, found, treeToArray, key, criteria, _result, plannableLocationTypes, assetsToReturn;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(user && user._id && user.assignedLocation)) {
                  _context8.next = 56;
                  break;
                }

                _AssetsTreeModel = ServiceLocator.resolve("AssetsTreeModel");
                AssetModel = ServiceLocator.resolve("AssetsModel");
                assetTypeService = ServiceLocator.resolve("AssetsTypeService");
                assetTree = void 0, resultObj = { value: {} };
                _context8.prev = 5;
                _context8.next = 8;
                return _AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();

              case 8:
                assetTree = _context8.sent;

                if (!assetTree.assetsTreeObj) {
                  _context8.next = 50;
                  break;
                }

                //   console.log(assetTree.assetsTreeObj);
                userAssignedLocation = user.assignedLocation;
                foundAssetInsideTree = [];
                found = false;
                _context8.next = 15;
                return this.recursivelyFindAssetId(userAssignedLocation, assetTree.assetsTreeObj, foundAssetInsideTree, found);

              case 15:
                found = _context8.sent;
                treeToArray = [];

                if (!found) {
                  _context8.next = 47;
                  break;
                }

                key = Object.keys(foundAssetInsideTree)[0];

                if (foundAssetInsideTree[key]) {
                  treeToArray = convertTreeToFlatArrayKeys(foundAssetInsideTree); //[key]);
                  //resultObj.value.assetTree = foundAssetInsideTree[key];
                  //resultObj.status = 200;
                }

                if (!(treeToArray.length > 0)) {
                  _context8.next = 42;
                  break;
                }

                criteria = { _id: { $in: treeToArray } };
                _context8.next = 24;
                return assetTypeService.getPlannableLocationTypes();

              case 24:
                _result = _context8.sent;
                plannableLocationTypes = _result.value ? _result.value : null;

                if (!(plannableLocationTypes && plannableLocationTypes.length)) {
                  _context8.next = 37;
                  break;
                }

                plannableLocationTypes = plannableLocationTypes.map(function (type, index) {
                  return type.assetType;
                });

                criteria.assetType = plannableLocationTypes;

                // console.log('criteria', criteria);

                _context8.next = 31;
                return AssetModel.find(criteria).exec();

              case 31:
                assetsToReturn = _context8.sent;

                assetsToReturn = assetsToReturn.map(function (asset, index) {
                  return asset._id;
                });
                resultObj.status = 200;
                resultObj.value = assetsToReturn;
                _context8.next = 40;
                break;

              case 37:
                resultObj.status = 200;
                resultObj.value = []; // no plannable location asset types
                console.log("assetsTreeService.getPlannableLocations: No plannable location asset type found");

              case 40:
                _context8.next = 45;
                break;

              case 42:
                resultObj.status = 200;
                resultObj.value = []; // no element in tree
                console.log("assetsTreeService.getPlannableLocations: No element found in tree");

              case 45:
                _context8.next = 50;
                break;

              case 47:
                console.log("assetsTreeService.getPlannableLocations: Location Assigned to User not found in Asset Tree");

                resultObj.status = 200;
                resultObj.value = []; // no plannable location asset types

              case 50:
                _context8.next = 55;
                break;

              case 52:
                _context8.prev = 52;
                _context8.t0 = _context8["catch"](5);

                resultObj = { errorVal: _context8.t0, status: 500 };

              case 55:
                return _context8.abrupt("return", resultObj);

              case 56:
                return _context8.abrupt("return", { errorVal: "assetsTreeService.getPlannableLocations: Invalid user", status: 500 });

              case 57:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[5, 52]]);
      }));

      function getPlannableLocations(_x19) {
        return _ref8.apply(this, arguments);
      }

      return getPlannableLocations;
    }()
  }, {
    key: "getTreeTopMostNodeId",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        var AssetsTreeModel, assetTree, topAsset;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                AssetsTreeModel = ServiceLocator.resolve("AssetsTreeModel");
                assetTree = void 0;
                _context9.next = 4;
                return AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();

              case 4:
                assetTree = _context9.sent;
                topAsset = [].concat((0, _toConsumableArray3.default)(assetTree));

                if (!assetTree.assetsTreeObj) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", Object.keys(assetTree.assetsTreeObj)[0]);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getTreeTopMostNodeId() {
        return _ref9.apply(this, arguments);
      }

      return getTreeTopMostNodeId;
    }()
  }, {
    key: "getAssetTree",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(nodeId) {
        var AssetsTreeModel, assetTree, foundAssetInsideTree, userAssignedLocation, found;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                AssetsTreeModel = ServiceLocator.resolve("AssetsTreeModel");
                assetTree = void 0;
                foundAssetInsideTree = [];
                _context10.prev = 3;
                _context10.next = 6;
                return AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();

              case 6:
                assetTree = _context10.sent;

                if (!assetTree.assetsTreeObj) {
                  _context10.next = 13;
                  break;
                }

                userAssignedLocation = nodeId;
                found = false;
                _context10.next = 12;
                return this.recursivelyFindAssetId(userAssignedLocation, assetTree.assetsTreeObj, foundAssetInsideTree, found);

              case 12:
                found = _context10.sent;

              case 13:
                _context10.next = 18;
                break;

              case 15:
                _context10.prev = 15;
                _context10.t0 = _context10["catch"](3);

                console.error(_context10.t0.toString());

              case 18:
                return _context10.abrupt("return", foundAssetInsideTree);

              case 19:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[3, 15]]);
      }));

      function getAssetTree(_x20) {
        return _ref10.apply(this, arguments);
      }

      return getAssetTree;
    }()
  }, {
    key: "findTreeNode",
    value: function findTreeNode(treeBranch, _id) {
      var aIds = Object.keys(treeBranch);
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = aIds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var key = _step6.value;

          if (key === _id) {
            return treeBranch[key];
          }
          if ((0, _typeof3.default)(treeBranch[key]) === "object") {
            var foundObj = this.findTreeNode(treeBranch[key], _id);
            if (foundObj) {
              return treeBranch[key];
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }, {
    key: "getTreeByUser",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(nodeId) {
        var AssetsTreeModel, resultObj, assetTree, foundAssetInsideTree, found;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                AssetsTreeModel = ServiceLocator.resolve("AssetsTreeModel");
                resultObj = {};
                _context11.prev = 2;
                _context11.next = 5;
                return AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();

              case 5:
                assetTree = _context11.sent;

                resultObj.status = 200;

                foundAssetInsideTree = {};

                if (!assetTree.assetsTreeObj) {
                  _context11.next = 13;
                  break;
                }

                found = false;
                _context11.next = 12;
                return this.recursivelyFindAssetId(nodeId, assetTree.assetsTreeObj, foundAssetInsideTree, found);

              case 12:
                resultObj.value = foundAssetInsideTree;

              case 13:
                _context11.next = 19;
                break;

              case 15:
                _context11.prev = 15;
                _context11.t0 = _context11["catch"](2);

                resultObj = { errroVal: _context11.t0, status: 500 };
                console.log("error in getTreeByUser : ", _context11.t0);

              case 19:
                return _context11.abrupt("return", resultObj);

              case 20:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[2, 15]]);
      }));

      function getTreeByUser(_x21) {
        return _ref11.apply(this, arguments);
      }

      return getTreeByUser;
    }()
  }, {
    key: "getArrayByNode",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(nodeId) {
        var foundAssetInsideTree, key;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                foundAssetInsideTree = [];
                _context12.next = 3;
                return this.getAssetTree(nodeId);

              case 3:
                foundAssetInsideTree = _context12.sent;
                key = Object.keys(foundAssetInsideTree)[0];

                if (foundAssetInsideTree[key]) {
                  foundAssetInsideTree = this.treeToArray(foundAssetInsideTree[key]);
                }
                return _context12.abrupt("return", [nodeId].concat(foundAssetInsideTree));

              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getArrayByNode(_x22) {
        return _ref12.apply(this, arguments);
      }

      return getArrayByNode;
    }()
  }, {
    key: "treeToArray",
    value: function treeToArray(treeBranch) {
      var resultArray = [];
      var aIds = Object.keys(treeBranch);
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = aIds[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var key = _step7.value;

          if (key !== "properties") {
            if ((0, _typeof3.default)(treeBranch[key]) === "object") {
              resultArray.push(key);
              var retArray = this.treeToArray(treeBranch[key]);
              if (retArray) {
                resultArray = resultArray.concat(retArray);
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return resultArray;
    }
  }, {
    key: "findAssetFlat",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(nodeId) {
        var foundAssetInsideTree, key;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                foundAssetInsideTree = [];
                _context13.next = 3;
                return this.getAssetTree(nodeId);

              case 3:
                foundAssetInsideTree = _context13.sent;
                key = Object.keys()[0];

                if (!foundAssetInsideTree[key]) {
                  _context13.next = 7;
                  break;
                }

                return _context13.abrupt("return", convertTreeToFlatArrayKeys(foundAssetInsideTree));

              case 7:
                return _context13.abrupt("return", []);

              case 8:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function findAssetFlat(_x23) {
        return _ref13.apply(this, arguments);
      }

      return findAssetFlat;
    }()
  }, {
    key: "filterTreeGetLineOtherAssets",
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(treeObj, ofilteredTreeArray) {
        var keys, properties, retValue, v, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, key;

        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                //don't itterate track assets
                keys = Object.keys(treeObj);
                properties = treeObj["properties"];
                retValue = false;

                if (!properties) {
                  _context14.next = 10;
                  break;
                }

                retValue = isObjectContain(properties, { assetType: "track" });

                if (!retValue) {
                  _context14.next = 9;
                  break;
                }

                return _context14.abrupt("return", false);

              case 9:
                retValue = true;

              case 10:
                v = void 0;
                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                _context14.prev = 14;
                _iterator8 = keys[Symbol.iterator]();

              case 16:
                if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                  _context14.next = 26;
                  break;
                }

                key = _step8.value;

                if (!(key != "properties")) {
                  _context14.next = 23;
                  break;
                }

                _context14.next = 21;
                return this.filterTreeGetLineOtherAssets(treeObj[key], ofilteredTreeArray);

              case 21:
                v = _context14.sent;

                if (v) {
                  if (key != "0") ofilteredTreeArray.push(key);
                }

              case 23:
                _iteratorNormalCompletion8 = true;
                _context14.next = 16;
                break;

              case 26:
                _context14.next = 32;
                break;

              case 28:
                _context14.prev = 28;
                _context14.t0 = _context14["catch"](14);
                _didIteratorError8 = true;
                _iteratorError8 = _context14.t0;

              case 32:
                _context14.prev = 32;
                _context14.prev = 33;

                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }

              case 35:
                _context14.prev = 35;

                if (!_didIteratorError8) {
                  _context14.next = 38;
                  break;
                }

                throw _iteratorError8;

              case 38:
                return _context14.finish(35);

              case 39:
                return _context14.finish(32);

              case 40:
                return _context14.abrupt("return", retValue);

              case 41:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[14, 28, 32, 40], [33,, 35, 39]]);
      }));

      function filterTreeGetLineOtherAssets(_x24, _x25) {
        return _ref14.apply(this, arguments);
      }

      return filterTreeGetLineOtherAssets;
    }()
  }, {
    key: "filterTreeByProperties",
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(treeObj, propertiesObj, ofilteredTreeArray) {
        var keys, properties, retValue, v, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, key;

        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                keys = Object.keys(treeObj);
                properties = treeObj["properties"];
                retValue = false;


                if (properties) {
                  retValue = isObjectContain(properties, propertiesObj);
                }
                v = void 0;
                _iteratorNormalCompletion9 = true;
                _didIteratorError9 = false;
                _iteratorError9 = undefined;
                _context15.prev = 8;
                _iterator9 = keys[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                  _context15.next = 20;
                  break;
                }

                key = _step9.value;

                if (!(key != "properties")) {
                  _context15.next = 17;
                  break;
                }

                _context15.next = 15;
                return this.filterTreeByProperties(treeObj[key], propertiesObj, ofilteredTreeArray);

              case 15:
                v = _context15.sent;

                if (v) {
                  if (key != "0") ofilteredTreeArray.push(key);
                }

              case 17:
                _iteratorNormalCompletion9 = true;
                _context15.next = 10;
                break;

              case 20:
                _context15.next = 26;
                break;

              case 22:
                _context15.prev = 22;
                _context15.t0 = _context15["catch"](8);
                _didIteratorError9 = true;
                _iteratorError9 = _context15.t0;

              case 26:
                _context15.prev = 26;
                _context15.prev = 27;

                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                  _iterator9.return();
                }

              case 29:
                _context15.prev = 29;

                if (!_didIteratorError9) {
                  _context15.next = 32;
                  break;
                }

                throw _iteratorError9;

              case 32:
                return _context15.finish(29);

              case 33:
                return _context15.finish(26);

              case 34:
                return _context15.abrupt("return", retValue);

              case 35:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[8, 22, 26, 34], [27,, 29, 33]]);
      }));

      function filterTreeByProperties(_x26, _x27, _x28) {
        return _ref15.apply(this, arguments);
      }

      return filterTreeByProperties;
    }()
  }]);
  return AssetsTreeService;
}();

exports.default = AssetsTreeService;


function convertTreeToFlatArrayKeys(tree) {
  var arrayOfKeys = [];
  recursivelyConvertTree(tree, arrayOfKeys);
  return arrayOfKeys;
}
function isObjectContain(objOne, objTwo) {
  return !!(0, _lodash2.default)([objOne]).filter(objTwo).size();
}
function recursivelyConvertTree(treeObj, arrayOfKeys) {
  var keys = Object.keys(treeObj);
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = keys[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var key = _step10.value;

      if (key != "properties") {
        arrayOfKeys.push(ObjectId(key));
        recursivelyConvertTree(treeObj[key], arrayOfKeys);
      }
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10.return) {
        _iterator10.return();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }
}

// for self understanding , not in use
var asset1 = { asset2: asset2, asset10: asset10 };
var asset2 = { asset3: { asset4: { asset5: {}, asset6: {} }, asset7: {} }, asset8: { asset9: {} } };
var asset10 = {
  asset11: { asset12: {}, asset13: { asset14: { asset15: {}, asset16: {} } } },
  asset17: {
    asset18: {},
    asset19: {}
  },
  asset20: {}
};