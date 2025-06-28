"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createDatabase = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var assetsTreeService;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return createTenant();

          case 2:
            _context.next = 4;
            return createPermissions();

          case 4:
            _context.next = 6;
            return createUserGroups();

          case 6:
            _context.next = 8;
            return createUsers();

          case 8:
            _context.next = 10;
            return (0, _supportedParamsList.createSupportedParams)();

          case 10:
            _context.next = 12;
            return (0, _supportedDevicesList.createSupportedDevices)();

          case 12:
            _context.next = 14;
            return createListsForApp();

          case 14:
            _context.next = 16;
            return updateExistingDBLocationAssetTypeAttribute(false);

          case 16:
            _context.next = 18;
            return (0, _configurations.addConfigurations)(false);

          case 18:
            _context.next = 20;
            return createAssets("railroad");

          case 20:
            _context.next = 22;
            return appAccessService.initializeDbOperation();

          case 22:
            _context.next = 24;
            return setAssignedLocationToUsers(true);

          case 24:
            _context.next = 26;
            return updateOldDatabase(false);

          case 26:
            _context.next = 28;
            return updatePermissionsOfUserGroups(false);

          case 28:
            _context.next = 30;
            return (0, _configurations.updateConfigurations)(false, "SCIM");

          case 30:
            _context.next = 32;
            return updateInspectionAndTemplates(false);

          case 32:
            _context.next = 34;
            return updateAssetTypesMakeTrackLowestInspectable(false);

          case 34:
            assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
            _context.next = 37;
            return assetsTreeService.createHierarchyTree();

          case 37:
            _context.next = 39;
            return (0, _dbAnalyzerMethod.dbAnalyzerMethod)(false, false);

          case 39:
            _context.next = 41;
            return addCWRTrackAssetType(false);

          case 41:
            _context.next = 43;
            return updateInspectionFrequenciesTemplates(false);

          case 43:
            _context.next = 45;
            return (0, _assetTypesChangesOct.setAssetTypesToInspectable)(false, "SCIM");

          case 45:
            _context.next = 47;
            return (0, _assetTypesChangesOct.setAssetTypesDisplayNameProperty)(false);

          case 47:
            _context.next = 49;
            return (0, _assetTypesChangesOct.removeRailsAssetType)(false);

          case 49:
            _context.next = 51;
            return (0, _applicationlookupslist.deleteApplicationLookups)([{ listName: "appForms", code: "form3" }, { listName: "appForms", code: "form4" }, { listName: "remedialAction", code: "trackOOS" }, { listName: "remedialAction", code: "temporaryFix" }, { listName: "remedialAction", code: "slowOrderApplied" }, { listName: "remedialAction", code: "fixed" }]);

          case 51:
            _context.next = 53;
            return updateApplicationLookupsPrev(false);

          case 53:
            _context.next = 55;
            return (0, _IOCMissingAssetTypes.removeAssetTypesForIOC)(false);

          case 55:
            _context.next = 57;
            return (0, _IOCMissingAssetTypes.addIOCMissingAssetTypes)(false);

          case 57:
            _context.next = 59;
            return addMissingIssueIdsInJourneyPlans(false);

          case 59:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createDatabase() {
    return _ref.apply(this, arguments);
  };
}();

var createTenant = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _dbHelperMethods.addIfNotExist)(Tenant, { tenantId: "ps19" }, {
              active: true,
              isDefault: true,
              tenantId: "ps19",
              name: "Powersoft19 Rail Group"
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function createTenant() {
    return _ref2.apply(this, arguments);
  };
}();

var createPermissions = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, per;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 3;
            _iterator = _permissionRoles.permissionsToAdd[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 12;
              break;
            }

            per = _step.value;
            _context3.next = 9;
            return (0, _dbHelperMethods.addIfNotExist)(GroupPermission, per, per);

          case 9:
            _iteratorNormalCompletion = true;
            _context3.next = 5;
            break;

          case 12:
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 18:
            _context3.prev = 18;
            _context3.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context3.prev = 21;

            if (!_didIteratorError) {
              _context3.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context3.finish(21);

          case 25:
            return _context3.finish(18);

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function createPermissions() {
    return _ref3.apply(this, arguments);
  };
}();

var createUserGroups = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var permissions, permissionAry, inspectorPermissionArray, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, perm, groupsToAdd, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, grp;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return GroupPermission.find({}).exec();

          case 2:
            permissions = _context4.sent;
            // get all permissions
            permissionAry = _.map(permissions, function (item) {
              return item._id;
            });
            inspectorPermissionArray = [];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context4.prev = 8;

            for (_iterator2 = permissions[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              perm = _step2.value;

              if (_.find(_permissionRoles.inspectorPermissions, { name: perm.name })) {
                inspectorPermissionArray.push(perm._id);
              }
            }
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](8);
            _didIteratorError2 = true;
            _iteratorError2 = _context4.t0;

          case 16:
            _context4.prev = 16;
            _context4.prev = 17;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 19:
            _context4.prev = 19;

            if (!_didIteratorError2) {
              _context4.next = 22;
              break;
            }

            throw _iteratorError2;

          case 22:
            return _context4.finish(19);

          case 23:
            return _context4.finish(16);

          case 24:
            groupsToAdd = [{
              group_id: config.defaultData.adminGroup.id,
              name: config.defaultData.adminGroup.desc,
              permissions: permissionAry,
              isAdmin: true,
              level: 0,
              category: "Role"
            }];
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context4.prev = 28;
            _iterator3 = groupsToAdd[Symbol.iterator]();

          case 30:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context4.next = 37;
              break;
            }

            grp = _step3.value;
            _context4.next = 34;
            return (0, _dbHelperMethods.UpdateOrAddIfNotExist)(UserGroup, grp, grp, {
              group_id: grp.group_id
            });

          case 34:
            _iteratorNormalCompletion3 = true;
            _context4.next = 30;
            break;

          case 37:
            _context4.next = 43;
            break;

          case 39:
            _context4.prev = 39;
            _context4.t1 = _context4["catch"](28);
            _didIteratorError3 = true;
            _iteratorError3 = _context4.t1;

          case 43:
            _context4.prev = 43;
            _context4.prev = 44;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 46:
            _context4.prev = 46;

            if (!_didIteratorError3) {
              _context4.next = 49;
              break;
            }

            throw _iteratorError3;

          case 49:
            return _context4.finish(46);

          case 50:
            return _context4.finish(43);

          case 51:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[8, 12, 16, 24], [17,, 19, 23], [28, 39, 43, 51], [44,, 46, 50]]);
  }));

  return function createUserGroups() {
    return _ref4.apply(this, arguments);
  };
}();

var createUsers = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var tenantId, username, email, adminUG, usersToAdd, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, usr;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            tenantId = "ps19";
            username = "admin";
            email = "admin@gms.com";
            _context5.next = 5;
            return UserGroup.findOne({ isAdmin: true });

          case 5:
            adminUG = _context5.sent;

            if (adminUG) {
              _context5.next = 9;
              break;
            }

            console.log("error: createDatabase: createUsers: cannot find admin user group");
            return _context5.abrupt("return");

          case 9:
            usersToAdd = [{
              name: username,
              tenantId: tenantId,
              email: email,
              password: "admin",
              isAdmin: true,
              userGroup: adminUG._id,
              group_id: adminUG.group_id,
             genericEmail: "gensettool@gmail.com",
             //genericEmail: "osamaiqbalcs@gmail.com",
              department: "administration",
              mobile: "+1455555645"
            }];
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context5.prev = 13;
            _iterator4 = usersToAdd[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context5.next = 22;
              break;
            }

            usr = _step4.value;
            _context5.next = 19;
            return (0, _dbHelperMethods.addIfNotExist)(User, { name: username, email: email }, usr);

          case 19:
            _iteratorNormalCompletion4 = true;
            _context5.next = 15;
            break;

          case 22:
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](13);
            _didIteratorError4 = true;
            _iteratorError4 = _context5.t0;

          case 28:
            _context5.prev = 28;
            _context5.prev = 29;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 31:
            _context5.prev = 31;

            if (!_didIteratorError4) {
              _context5.next = 34;
              break;
            }

            throw _iteratorError4;

          case 34:
            return _context5.finish(31);

          case 35:
            return _context5.finish(28);

          case 36:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[13, 24, 28, 36], [29,, 31, 35]]);
  }));

  return function createUsers() {
    return _ref5.apply(this, arguments);
  };
}();

var createAssets = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var usersToAdd;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            usersToAdd = {
              asset: {
                assetType: 'RefreshTime',
                attributes: {
                  refreshTime: 60000,
                  unitId: 60000
                }
              }
            };
            _context6.next = 3;
            return (0, _dbHelperMethods.addIfNotExist)(AssetsModel, usersToAdd);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function createAssets() {
    return _ref6.apply(this, arguments);
  };
}();

var createListsForApp = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _dbHelperMethods.addIfNotExist)(ListModel, { listName: "user", tenantId: "ps19" }, {
              listName: "user",
              settings: '{"criteria": {"email": "<useremail>"}, "fieldMap":{"code":"email", "description": "name"}}',
              owner: null,
              tenantId: "ps19"
            });

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function createListsForApp() {
    return _ref7.apply(this, arguments);
  };
}();

var createAssets = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(template == "railroad")) {
              _context8.next = 5;
              break;
            }

            _context8.next = 3;
            return (0, _railRoadLocationsTemplate.railRoadLocationsTemplate)();

          case 3:
            _context8.next = 23;
            break;

          case 5:
            if (!(template == "septa")) {
              _context8.next = 10;
              break;
            }

            _context8.next = 8;
            return addSEPTAData();

          case 8:
            _context8.next = 23;
            break;

          case 10:
            if (!(template == "minneapolis")) {
              _context8.next = 15;
              break;
            }

            _context8.next = 13;
            return addMinneapolisData();

          case 13:
            _context8.next = 23;
            break;

          case 15:
            if (!(template == "ferromex")) {
              _context8.next = 20;
              break;
            }

            _context8.next = 18;
            return addFerromexAssets();

          case 18:
            _context8.next = 23;
            break;

          case 20:
            if (!(template == "RioTinto")) {
              _context8.next = 23;
              break;
            }

            _context8.next = 23;
            return RioTinto();

          case 23:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function createAssets() {
    return _ref8.apply(this, arguments);
  };
}();

var addCWRTrackAssetType = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(execute) {
    var cwrTrack, criteria, allLocations, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, a;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (execute) {
              _context9.next = 2;
              break;
            }

            return _context9.abrupt("return");

          case 2:
            cwrTrack = {
              assetType: "CWR Track",
              assetTypeClassify: "linear",
              lampAttributes: _assetTypeAttributes.LampAttributes["track"],
              timpsAttributes: { code: "0032", description: "CWR Track" },
              //defectCodes: defectCodes,
              inspectionInstructions: _assetTypeAttributes.inspectionInstructions,
              //inspectionForms: trackInspForm,
              plannable: false,
              inspectable: true,
              location: false,
              defectCodesObj: _defectCodes.defectCodes,
              inspectionFormsObj: JSON.parse(_assetTypeAttributes.trackInspForm),
              allowedAssetTypes: ["rail", "3rd Rail", "Switch", "Crossing", "Signal", "Station"]
            };
            _context9.next = 5;
            return (0, _dbHelperMethods.addIfNotExist)(AssetsTypeModel, { assetType: cwrTrack.assetType }, cwrTrack);

          case 5:
            // add this asset type to the possible children of all locations that have parent
            criteria = {
              $and: [{ location: true }, { parentAssetType: { $exists: true, $ne: null } }]
            };
            _context9.next = 8;
            return AssetsTypeModel.find(criteria);

          case 8:
            allLocations = _context9.sent;

            if (!(allLocations && allLocations.length)) {
              _context9.next = 39;
              break;
            }

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context9.prev = 13;
            _iterator5 = allLocations[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
              _context9.next = 25;
              break;
            }

            a = _step5.value;

            if (!(a.allowedAssetTypes && a.allowedAssetTypes.length && !a.allowedAssetTypes.includes(cwrTrack.assetType))) {
              _context9.next = 22;
              break;
            }

            a.allowedAssetTypes.push(cwrTrack.assetType);
            a.markModified("allowedAssetTypes");
            _context9.next = 22;
            return a.save();

          case 22:
            _iteratorNormalCompletion5 = true;
            _context9.next = 15;
            break;

          case 25:
            _context9.next = 31;
            break;

          case 27:
            _context9.prev = 27;
            _context9.t0 = _context9["catch"](13);
            _didIteratorError5 = true;
            _iteratorError5 = _context9.t0;

          case 31:
            _context9.prev = 31;
            _context9.prev = 32;

            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }

          case 34:
            _context9.prev = 34;

            if (!_didIteratorError5) {
              _context9.next = 37;
              break;
            }

            throw _iteratorError5;

          case 37:
            return _context9.finish(34);

          case 38:
            return _context9.finish(31);

          case 39:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this, [[13, 27, 31, 39], [32,, 34, 38]]);
  }));

  return function addCWRTrackAssetType(_x2) {
    return _ref9.apply(this, arguments);
  };
}();

var updatePermissionsOfUserGroups = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(execute) {
    var permissions, permissionAry, inspectorPermissionArray, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, perm;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!execute) {
              _context10.next = 35;
              break;
            }

            _context10.next = 3;
            return GroupPermission.find({}).exec();

          case 3:
            permissions = _context10.sent;
            // get all permissions
            permissionAry = _.map(permissions, function (item) {
              return item._id;
            });
            inspectorPermissionArray = [];
            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context10.prev = 9;

            for (_iterator6 = permissions[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              perm = _step6.value;

              if (_.find(_permissionRoles.inspectorPermissions, { name: perm.name })) {
                inspectorPermissionArray.push(perm._id);
              }
            }
            _context10.next = 17;
            break;

          case 13:
            _context10.prev = 13;
            _context10.t0 = _context10["catch"](9);
            _didIteratorError6 = true;
            _iteratorError6 = _context10.t0;

          case 17:
            _context10.prev = 17;
            _context10.prev = 18;

            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }

          case 20:
            _context10.prev = 20;

            if (!_didIteratorError6) {
              _context10.next = 23;
              break;
            }

            throw _iteratorError6;

          case 23:
            return _context10.finish(20);

          case 24:
            return _context10.finish(17);

          case 25:
            _context10.next = 27;
            return (0, _dbHelperMethods.update)(UserGroup, { group_id: "supervisor" }, "permissions", permissionAry);

          case 27:
            _context10.next = 29;
            return (0, _dbHelperMethods.update)(UserGroup, { group_id: "manager" }, "permissions", permissionAry);

          case 29:
            _context10.next = 31;
            return (0, _dbHelperMethods.update)(UserGroup, { group_id: "admin" }, "permissions", permissionAry);

          case 31:
            _context10.next = 33;
            return (0, _dbHelperMethods.update)(UserGroup, { group_id: "supervisor", name: "Road Master" }, "name", "Track Manager");

          case 33:
            _context10.next = 35;
            return (0, _dbHelperMethods.update)(UserGroup, { group_id: "inspector" }, "permissions", inspectorPermissionArray);

          case 35:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this, [[9, 13, 17, 25], [18,, 20, 24]]);
  }));

  return function updatePermissionsOfUserGroups(_x3) {
    return _ref10.apply(this, arguments);
  };
}();

var setAssignedLocationToUsers = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(execute) {
    var location;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (execute) {
              _context11.next = 2;
              break;
            }

            return _context11.abrupt("return");

          case 2:
            _context11.next = 4;
            return AssetModel.findOne({
              parentAsset: null,
              assetType: "Company"
            });

          case 4:
            location = _context11.sent;

            if (!location) {
              _context11.next = 12;
              break;
            }

            _context11.next = 8;
            return updateToAddMissingField(User, "assignedLocation", location._id, null, true);

          case 8:
            _context11.next = 10;
            return updateToAddMissingField(User, "assignedLocationName", location.unitId, null, true);

          case 10:
            _context11.next = 13;
            break;

          case 12:
            console.log("database.js.updateOldDatabase.assignAlluserstoTopLocation: location does not exist");

          case 13:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function setAssignedLocationToUsers(_x4) {
    return _ref11.apply(this, arguments);
  };
}();

var updateOldDatabase = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(execute) {
    var _this = this;

    var location, assets2Mod, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, a1, or1, or2, criteria, trackAssetsWithAttributes, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, _a, _dirty, assettypesToMod, dirty, e, item, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, at, allLocations, childAssetTypes, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, a, parentAT, depth, levelsToAdd, plannableLocation, _loop, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _at, assetTypeTemplate, addedAT, plannableLocationAssettype, plat, plannableLocations, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, pl, trackAssets, primaryTrack, maxLength, longest, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, ta, length;

    return _regenerator2.default.wrap(function _callee12$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (execute) {
              _context13.next = 2;
              break;
            }

            return _context13.abrupt("return");

          case 2:

            console.log("Executing update Old Database Function");
            //await renameField(Maintenance, {}, { mwoNumber: "mrNumber" }); // no longer required as there is no older databases in the field
            // let permissions = await GroupPermission.find({}).exec(); // get all permissions
            // let permissionAry = _.map(permissions, (item) => item._id);
            // let inspectorPermissionArray = [];
            // for (let perm of permissions) {
            //   if (_.find(inspectorPermissions, { name: perm.name })) {
            //     inspectorPermissionArray.push(perm._id);
            //   }
            // }
            // await update(UserGroup, { group_id: "supervisor" }, "permissions", permissionAry); // update permissions
            // await update(UserGroup, { group_id: "manager" }, "permissions", permissionAry); // update permissions
            // await update(UserGroup, { group_id: "admin" }, "permissions", permissionAry); // update permissions
            // await update(UserGroup, { group_id: "supervisor", name: "Road Master" }, "name", "Track Manager"); // change supervisor's name, from t 'Road Master' to 'Track Manager'
            // await update(UserGroup, { group_id: "inspector" }, "permissions", inspectorPermissionArray);

            // await updateToAddSubdivisionUsingLineId(Maintenance);
            // await updateToAddSubdivisionUsingLineId(WorkPlanTemplateModel);
            // await updateToAddSubdivisionUsingLineId(JourneyPlanModel);

            _context13.next = 5;
            return updateToAddMissingField(WorkPlanTemplateModel, "nextInspectionDate", "createdAt");

          case 5:
            _context13.next = 7;
            return updateToAddMissingField(WorkPlanTemplateModel, "startDate", "createdAt");

          case 7:
            _context13.next = 9;
            return updateToAddMissingField(WorkPlanTemplateModel, "inspectionFrequency", "dayFreq");

          case 9:
            _context13.next = 11;
            return updateToAddMissingField(WorkPlanTemplateModel, "inspectionType", "fixed", null, true);

          case 11:
            _context13.next = 13;
            return AssetModel.findOne({
              parentAsset: null,
              assetType: "Company"
            });

          case 13:
            location = _context13.sent;

            if (!location) {
              _context13.next = 21;
              break;
            }

            _context13.next = 17;
            return updateToAddMissingField(User, "assignedLocation", location._id, null, true);

          case 17:
            _context13.next = 19;
            return updateToAddMissingField(User, "assignedLocationName", location.unitId, null, true);

          case 19:
            _context13.next = 22;
            break;

          case 21:
            console.log("database.js.updateOldDatabase.assignAlluserstoTopLocation: location does not exist");

          case 22:
            _context13.next = 24;
            return AssetModel.find({
              $or: [{ assetType: "track" }, { assetType: "Station" }]
            });

          case 24:
            assets2Mod = _context13.sent;
            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context13.prev = 28;
            _iterator7 = assets2Mod[Symbol.iterator]();

          case 30:
            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
              _context13.next = 40;
              break;
            }

            a1 = _step7.value;

            if (!(!a1.parentAsset || a1.parentAsset === "")) {
              _context13.next = 37;
              break;
            }

            a1.parentAsset = a1.lineId;
            _context13.next = 36;
            return a1.save();

          case 36:
            console.log("Updated asset", a1.unitId, "to have parentAsset");

          case 37:
            _iteratorNormalCompletion7 = true;
            _context13.next = 30;
            break;

          case 40:
            _context13.next = 46;
            break;

          case 42:
            _context13.prev = 42;
            _context13.t0 = _context13["catch"](28);
            _didIteratorError7 = true;
            _iteratorError7 = _context13.t0;

          case 46:
            _context13.prev = 46;
            _context13.prev = 47;

            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }

          case 49:
            _context13.prev = 49;

            if (!_didIteratorError7) {
              _context13.next = 52;
              break;
            }

            throw _iteratorError7;

          case 52:
            return _context13.finish(49);

          case 53:
            return _context13.finish(46);

          case 54:

            // Remove "trackType" and "class" from track asset "attributes" field
            // Rename "trackNumber" to "Local Track Name"
            // Rename "trackOrientation" to "railOrientation" and switch it's value EW to NS and vice-versa

            // get all track assets with required attributes
            or1 = {}, or2 = {};

            or1["assetType"] = "track";
            or1["attributes.trackType"] = { $exists: true };
            or2["assetType"] = "track";
            or2["attributes.trackOrientation"] = { $exists: true };
            criteria = { $or: [or1, or2] };
            _context13.next = 62;
            return AssetModel.find(criteria);

          case 62:
            trackAssetsWithAttributes = _context13.sent;
            _iteratorNormalCompletion8 = true;
            _didIteratorError8 = false;
            _iteratorError8 = undefined;
            _context13.prev = 66;
            _iterator8 = trackAssetsWithAttributes[Symbol.iterator]();

          case 68:
            if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
              _context13.next = 84;
              break;
            }

            _a = _step8.value;

            if (!_a.attributes) {
              _context13.next = 81;
              break;
            }

            _dirty = false;


            if (_a.attributes.trackType) {
              delete _a.attributes.trackType;
              _dirty = true;
            }

            if (_a.attributes.class) {
              delete _a.attributes.class;
              _dirty = true;
            }

            if (_a.attributes.trackNumber) {
              _a.attributes["Local Track Name"] = _a.attributes.trackNumber;
              delete _a.attributes.trackNumber;
              _dirty = true;
            }

            if (_a.attributes.trackOrientation) {
              _a.attributes["railOrientation"] = _a.attributes.trackOrientation == "NS" ? "EW" : "NS";
              delete _a.attributes.trackOrientation;
              _dirty = true;
            }

            if (!_dirty) {
              _context13.next = 81;
              break;
            }

            _a.markModified("attributes");
            _context13.next = 80;
            return _a.save();

          case 80:
            console.log("Updated asset", _a.unitId, " to rename trackNumber to LocalTrackName and delete trackType and class attributes");

          case 81:
            _iteratorNormalCompletion8 = true;
            _context13.next = 68;
            break;

          case 84:
            _context13.next = 90;
            break;

          case 86:
            _context13.prev = 86;
            _context13.t1 = _context13["catch"](66);
            _didIteratorError8 = true;
            _iteratorError8 = _context13.t1;

          case 90:
            _context13.prev = 90;
            _context13.prev = 91;

            if (!_iteratorNormalCompletion8 && _iterator8.return) {
              _iterator8.return();
            }

          case 93:
            _context13.prev = 93;

            if (!_didIteratorError8) {
              _context13.next = 96;
              break;
            }

            throw _iteratorError8;

          case 96:
            return _context13.finish(93);

          case 97:
            return _context13.finish(90);

          case 98:
            // change in existing assetTypes collection
            criteria = { assetType: "track" };
            _context13.next = 101;
            return AssetsTypeModel.find(criteria);

          case 101:
            assettypesToMod = _context13.sent;

            if (!(assettypesToMod && assettypesToMod[0])) {
              _context13.next = 110;
              break;
            }

            dirty = false;

            if (assettypesToMod[0].lampAttributes && assettypesToMod[0].lampAttributes.length) {
              e = assettypesToMod[0].lampAttributes.findIndex(function (a) {
                return a.name === "trackType";
              });

              if (e > -1) {
                assettypesToMod[0].lampAttributes.splice(e, 1);
                dirty = true;
              }
              e = assettypesToMod[0].lampAttributes.findIndex(function (a) {
                return a.name === "class";
              });
              if (e > -1) {
                assettypesToMod[0].lampAttributes.splice(e, 1);
                dirty = true;
              }

              e = assettypesToMod[0].lampAttributes.findIndex(function (a) {
                return a.name === "railOrientation";
              });
              if (e === -1) {
                assettypesToMod[0].lampAttributes.push({
                  name: "railOrientation",
                  order: 1
                });
                dirty = true;
              }

              item = assettypesToMod[0].lampAttributes.find(function (a) {
                return a.name === "trackNumber";
              });

              if (item) {
                item.name = "Local Track Name";
                item.order = 2;
                dirty = true;
              }

              item = assettypesToMod[0].lampAttributes.find(function (a) {
                return a.name === "Local Track Name" && a.order === 1;
              });
              if (item) {
                item.order = 2;
                dirty = true;
              }
            }

            if (!dirty) {
              _context13.next = 110;
              break;
            }

            assettypesToMod[0].markModified("lampAttributes");
            _context13.next = 109;
            return assettypesToMod[0].save();

          case 109:
            console.log("Updated assetType track to adjust fields");

          case 110:

            // update defectCodes in all asset types where it doesn't match
            criteria = { defectCodesObj: { $exists: true, $ne: null } };
            _context13.next = 113;
            return AssetsTypeModel.find(criteria);

          case 113:
            assettypesToMod = _context13.sent;

            if (!(assettypesToMod && assettypesToMod.length)) {
              _context13.next = 146;
              break;
            }

            _iteratorNormalCompletion9 = true;
            _didIteratorError9 = false;
            _iteratorError9 = undefined;
            _context13.prev = 118;
            _iterator9 = assettypesToMod[Symbol.iterator]();

          case 120:
            if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
              _context13.next = 132;
              break;
            }

            at = _step9.value;

            if (!(JSON.stringify(at.defectCodesObj).search(defectToFind) !== -1)) {
              _context13.next = 129;
              break;
            }

            at.defectCodesObj = _defectCodes.defectCodes;
            at.markModified("defectCodesObj");
            if (at.defectCodes) {
              at.defectCodes = _defectCodes.defectCodes;
              at.markModified("defectCodes");
            }
            console.log("Updated assettype", at.assetType, "to have new defect codes.");
            _context13.next = 129;
            return at.save();

          case 129:
            _iteratorNormalCompletion9 = true;
            _context13.next = 120;
            break;

          case 132:
            _context13.next = 138;
            break;

          case 134:
            _context13.prev = 134;
            _context13.t2 = _context13["catch"](118);
            _didIteratorError9 = true;
            _iteratorError9 = _context13.t2;

          case 138:
            _context13.prev = 138;
            _context13.prev = 139;

            if (!_iteratorNormalCompletion9 && _iterator9.return) {
              _iterator9.return();
            }

          case 141:
            _context13.prev = 141;

            if (!_didIteratorError9) {
              _context13.next = 144;
              break;
            }

            throw _iteratorError9;

          case 144:
            return _context13.finish(141);

          case 145:
            return _context13.finish(138);

          case 146:

            // update existing databases where new location scheme doesn't exist
            // activate if following conditions are not fulfilled
            //   exists an attribute named parentAssetType in assettypes collection
            //   exists a Parent Company AssetType that is (location(!plannable), allowedAssetType has 1 location child, )
            //   exists child of parent (Company) that has 2 further children and one of parent or child must be 'plannable locaiton'
            // upon activation do the following:
            //    find the level of hierarchy exists among assettypes
            //    add missing number of asset types and make them only 'location' (not plannable)
            //    add 'parentAssetType' field to make 2 way hierarchy

            criteria = {
              location: true,
              $or: [{ parentAssetType: { $exists: false } }, { parentAssetType: null }]
            };
            _context13.next = 149;
            return AssetsTypeModel.find(criteria);

          case 149:
            allLocations = _context13.sent;

            if (!(allLocations && allLocations.length)) {
              _context13.next = 236;
              break;
            }

            // only move forward if existing db has some locations that doesn't have 'parentAssetType' field
            childAssetTypes = [];
            //console.log('all locations', allLocations);

            _iteratorNormalCompletion10 = true;
            _didIteratorError10 = false;
            _iteratorError10 = undefined;
            _context13.prev = 155;
            for (_iterator10 = allLocations[Symbol.iterator](); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              a = _step10.value;

              if (a.allowedAssetTypes && a.allowedAssetTypes.length) {
                //console.log('type', a.assetType, 'children', a.allowedAssetTypes );
                childAssetTypes = childAssetTypes.concat(a.allowedAssetTypes);
              }
            }
            //console.log('all children ats:', childAssetTypes);
            _context13.next = 163;
            break;

          case 159:
            _context13.prev = 159;
            _context13.t3 = _context13["catch"](155);
            _didIteratorError10 = true;
            _iteratorError10 = _context13.t3;

          case 163:
            _context13.prev = 163;
            _context13.prev = 164;

            if (!_iteratorNormalCompletion10 && _iterator10.return) {
              _iterator10.return();
            }

          case 166:
            _context13.prev = 166;

            if (!_didIteratorError10) {
              _context13.next = 169;
              break;
            }

            throw _iteratorError10;

          case 169:
            return _context13.finish(166);

          case 170:
            return _context13.finish(163);

          case 171:
            if (!childAssetTypes.length) {
              _context13.next = 236;
              break;
            }

            parentAT = allLocations.find(function (a) {
              return !childAssetTypes.includes(a.assetType);
            });

            if (!parentAT) {
              _context13.next = 236;
              break;
            }

            //console.log('top parent:', parentAT.assetType);
            depth = findAssetTypeDepth(allLocations, parentAT);

            if (!(depth > 1 && depth < 4)) {
              _context13.next = 235;
              break;
            }

            // add number of missing asset types if depth is less than 4
            levelsToAdd = 4 - depth;
            plannableLocation = allLocations.find(function (a) {
              return a.plannable;
            });

            if (!plannableLocation) {
              _context13.next = 232;
              break;
            }

            console.log("Required levels to be added:", levelsToAdd);
            console.log("Plannable Location Asset Type:", plannableLocation.assetType);

            // add parentAssetType parameter
            _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(_at) {
              var parent;
              return _regenerator2.default.wrap(function _loop$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      parent = allLocations.find(function (at1) {
                        return at1.allowedAssetTypes.includes(_at.assetType);
                      });


                      if (parent) _at.parentAssetType = parent._id;else _at.parentAssetType = null;

                      _at.markModified("parentAssetType");
                      _context12.next = 5;
                      return _at.save();

                    case 5:
                    case "end":
                      return _context12.stop();
                  }
                }
              }, _loop, _this);
            });
            _iteratorNormalCompletion11 = true;
            _didIteratorError11 = false;
            _iteratorError11 = undefined;
            _context13.prev = 185;
            _iterator11 = allLocations[Symbol.iterator]();

          case 187:
            if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
              _context13.next = 193;
              break;
            }

            _at = _step11.value;
            return _context13.delegateYield(_loop(_at), "t4", 190);

          case 190:
            _iteratorNormalCompletion11 = true;
            _context13.next = 187;
            break;

          case 193:
            _context13.next = 199;
            break;

          case 195:
            _context13.prev = 195;
            _context13.t5 = _context13["catch"](185);
            _didIteratorError11 = true;
            _iteratorError11 = _context13.t5;

          case 199:
            _context13.prev = 199;
            _context13.prev = 200;

            if (!_iteratorNormalCompletion11 && _iterator11.return) {
              _iterator11.return();
            }

          case 202:
            _context13.prev = 202;

            if (!_didIteratorError11) {
              _context13.next = 205;
              break;
            }

            throw _iteratorError11;

          case 205:
            return _context13.finish(202);

          case 206:
            return _context13.finish(199);

          case 207:
            assetTypeTemplate = {
              assetType: "",
              assetTypeClassify: "point",
              lampAttributes: [],
              timpsAttributes: {},
              defectCodes: [],
              inspectionInstructions: "",
              inspectionForms: "",
              plannable: false,
              inspectable: false,
              menuFilter: false,
              location: true,
              allowedAssetTypes: []
            };

            if (!(levelsToAdd == 1)) {
              _context13.next = 215;
              break;
            }

            assetTypeTemplate.assetType = "Location Identifier";
            assetTypeTemplate.allowedAssetTypes = plannableLocation.allowedAssetTypes;
            assetTypeTemplate.parentAssetType = plannableLocation._id;
            _context13.next = 214;
            return AssetsTypeModel.create(assetTypeTemplate);

          case 214:
            console.log("added 1 asset type: ", assetTypeTemplate.assetType);

          case 215:
            if (!(levelsToAdd == 2)) {
              _context13.next = 230;
              break;
            }

            //
            console.log("added 2 asset types");
            assetTypeTemplate.assetType = "Minor Geographical Identifier";
            assetTypeTemplate.allowedAssetTypes = plannableLocation.allowedAssetTypes;
            assetTypeTemplate.parentAssetType = plannableLocation._id;
            _context13.next = 222;
            return AssetsTypeModel.create(assetTypeTemplate);

          case 222:
            addedAT = _context13.sent;

            console.log(assetTypeTemplate.assetType);

            assetTypeTemplate.assetType = "Location Identifier";
            assetTypeTemplate.allowedAssetTypes = [].concat((0, _toConsumableArray3.default)(plannableLocation.allowedAssetTypes), ["Minor Geographical Identifier"]);
            assetTypeTemplate.parentAssetType = addedAT._id;
            _context13.next = 229;
            return AssetsTypeModel.create(assetTypeTemplate);

          case 229:
            console.log(assetTypeTemplate.assetType);

          case 230:
            _context13.next = 233;
            break;

          case 232:
            console.log("Seed.AssetTypeHierarchy.Logic.Error: No plannable location");

          case 233:
            _context13.next = 236;
            break;

          case 235:
            if (depth <= 1) console.log("Seed.AssetTypeHierarchy.Logic.Error: asset type depth is <= 1.", depth);

          case 236:
            //else console.log('all location asset types returned 0');

            // See in all plannable locations if there is no primary track then
            //    make the longest track primary

            criteria = { location: true, plannable: true };
            _context13.next = 239;
            return AssetsTypeModel.find(criteria);

          case 239:
            plannableLocationAssettype = _context13.sent;

            if (!(plannableLocationAssettype && plannableLocationAssettype.length && plannableLocationAssettype[0])) {
              _context13.next = 318;
              break;
            }

            plat = plannableLocationAssettype[0].assetType;

            criteria = { assetType: plat };
            _context13.next = 245;
            return AssetModel.find(criteria);

          case 245:
            plannableLocations = _context13.sent;

            if (!(plannableLocations && plannableLocations.length)) {
              _context13.next = 315;
              break;
            }

            _iteratorNormalCompletion12 = true;
            _didIteratorError12 = false;
            _iteratorError12 = undefined;
            _context13.prev = 250;
            _iterator12 = plannableLocations[Symbol.iterator]();

          case 252:
            if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
              _context13.next = 299;
              break;
            }

            pl = _step12.value;

            criteria = { assetType: "track", parentAsset: pl._id };
            _context13.next = 257;
            return AssetModel.find(criteria);

          case 257:
            trackAssets = _context13.sent;

            if (!(trackAssets && trackAssets.length)) {
              _context13.next = 295;
              break;
            }

            primaryTrack = trackAssets.find(function (ta) {
              return ta.attributes && ta.attributes.primaryTrack;
            });
            //console.log(' location', pl.unitId, 'primary track', primaryTrack?primaryTrack.unitId: 'no');

            if (primaryTrack) {
              _context13.next = 293;
              break;
            }

            console.log("Seed.UpdateOldDatabase No primary track found in", pl.unitId, " setting one");
            maxLength = 0, longest = null;
            _iteratorNormalCompletion13 = true;
            _didIteratorError13 = false;
            _iteratorError13 = undefined;
            _context13.prev = 266;

            for (_iterator13 = trackAssets[Symbol.iterator](); !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              ta = _step13.value;
              length = ta.end - ta.start;

              if (length > maxLength) {
                maxLength = length;
                longest = ta;
              }
            }

            _context13.next = 274;
            break;

          case 270:
            _context13.prev = 270;
            _context13.t6 = _context13["catch"](266);
            _didIteratorError13 = true;
            _iteratorError13 = _context13.t6;

          case 274:
            _context13.prev = 274;
            _context13.prev = 275;

            if (!_iteratorNormalCompletion13 && _iterator13.return) {
              _iterator13.return();
            }

          case 277:
            _context13.prev = 277;

            if (!_didIteratorError13) {
              _context13.next = 280;
              break;
            }

            throw _iteratorError13;

          case 280:
            return _context13.finish(277);

          case 281:
            return _context13.finish(274);

          case 282:
            if (!(longest && longest._id)) {
              _context13.next = 293;
              break;
            }

            longest.attributes["primaryTrack"] = true;
            longest.markModified("attributes");
            _context13.next = 287;
            return longest.save();

          case 287:
            if (!(pl.start !== longest.start || pl.end !== longest.end)) {
              _context13.next = 293;
              break;
            }

            pl.start = longest.start;
            pl.end = longest.end;
            pl.length = longest.length;
            _context13.next = 293;
            return pl.save();

          case 293:
            _context13.next = 296;
            break;

          case 295:
            console.log("no track asset ");

          case 296:
            _iteratorNormalCompletion12 = true;
            _context13.next = 252;
            break;

          case 299:
            _context13.next = 305;
            break;

          case 301:
            _context13.prev = 301;
            _context13.t7 = _context13["catch"](250);
            _didIteratorError12 = true;
            _iteratorError12 = _context13.t7;

          case 305:
            _context13.prev = 305;
            _context13.prev = 306;

            if (!_iteratorNormalCompletion12 && _iterator12.return) {
              _iterator12.return();
            }

          case 308:
            _context13.prev = 308;

            if (!_didIteratorError12) {
              _context13.next = 311;
              break;
            }

            throw _iteratorError12;

          case 311:
            return _context13.finish(308);

          case 312:
            return _context13.finish(305);

          case 313:
            _context13.next = 316;
            break;

          case 315:
            console.log("no plannable location asset");

          case 316:
            _context13.next = 319;
            break;

          case 318:
            console.log("no plannable location asset type");

          case 319:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee12, this, [[28, 42, 46, 54], [47,, 49, 53], [66, 86, 90, 98], [91,, 93, 97], [118, 134, 138, 146], [139,, 141, 145], [155, 159, 163, 171], [164,, 166, 170], [185, 195, 199, 207], [200,, 202, 206], [250, 301, 305, 313], [266, 270, 274, 282], [275,, 277, 281], [306,, 308, 312]]);
  }));

  return function updateOldDatabase(_x5) {
    return _ref12.apply(this, arguments);
  };
}();

var updateApplicationLookupsPrev = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(execute) {
    return _regenerator2.default.wrap(function _callee13$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (!execute) {
              _context14.next = 3;
              break;
            }

            _context14.next = 3;
            return (0, _applicationlookupslist.updateApplicationLookups)([{
              listName: "resolveIssueRemedialAction",
              code: "resolveIssuesOnRemedialAction",
              compare: "opt1"
            }, {
              listName: "remedialAction",
              code: "01 slowOrderApplied",
              compare: "opt1"
            }, { listName: "appForms", code: "form1", compare: "opt1" }, { listName: "AppPullList", code: "25", compare: "opt2" }]);

          case 3:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee13, this);
  }));

  return function updateApplicationLookupsPrev(_x6) {
    return _ref13.apply(this, arguments);
  };
}();

var updateInspectionAndTemplates = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
    var templates, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, temp, index, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, task, inspections, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, inspection, i, _iteratorNormalCompletion17, _didIteratorError17, _iteratorError17, _iterator17, _step17, _task;

    return _regenerator2.default.wrap(function _callee14$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return WorkPlanTemplateModel.find().exec();

          case 3:
            templates = _context15.sent;
            _iteratorNormalCompletion14 = true;
            _didIteratorError14 = false;
            _iteratorError14 = undefined;
            _context15.prev = 7;
            _iterator14 = templates[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
              _context15.next = 87;
              break;
            }

            temp = _step14.value;
            index = 0;
            _iteratorNormalCompletion15 = true;
            _didIteratorError15 = false;
            _iteratorError15 = undefined;
            _context15.prev = 15;

            for (_iterator15 = temp.tasks[Symbol.iterator](); !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
              task = _step15.value;

              if (temp.runRanges[index]) {
                task.runStart = temp.runRanges[index].mpStart;
                task.runEnd = temp.runRanges[index].mpEnd;
              }
              index++;
            }
            _context15.next = 23;
            break;

          case 19:
            _context15.prev = 19;
            _context15.t0 = _context15["catch"](15);
            _didIteratorError15 = true;
            _iteratorError15 = _context15.t0;

          case 23:
            _context15.prev = 23;
            _context15.prev = 24;

            if (!_iteratorNormalCompletion15 && _iterator15.return) {
              _iterator15.return();
            }

          case 26:
            _context15.prev = 26;

            if (!_didIteratorError15) {
              _context15.next = 29;
              break;
            }

            throw _iteratorError15;

          case 29:
            return _context15.finish(26);

          case 30:
            return _context15.finish(23);

          case 31:
            _context15.next = 33;
            return JourneyPlanModel.find({
              workplanTemplateId: temp.id
            }).exec();

          case 33:
            inspections = _context15.sent;
            _iteratorNormalCompletion16 = true;
            _didIteratorError16 = false;
            _iteratorError16 = undefined;
            _context15.prev = 37;
            _iterator16 = inspections[Symbol.iterator]();

          case 39:
            if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
              _context15.next = 67;
              break;
            }

            inspection = _step16.value;
            i = 0;
            _iteratorNormalCompletion17 = true;
            _didIteratorError17 = false;
            _iteratorError17 = undefined;
            _context15.prev = 45;

            for (_iterator17 = inspection.tasks[Symbol.iterator](); !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
              _task = _step17.value;

              if (temp.runRanges[i]) {
                _task.runStart = temp.runRanges[i].mpStart;
                _task.runEnd = temp.runRanges[i].mpEnd;
              }
              i++;
            }
            _context15.next = 53;
            break;

          case 49:
            _context15.prev = 49;
            _context15.t1 = _context15["catch"](45);
            _didIteratorError17 = true;
            _iteratorError17 = _context15.t1;

          case 53:
            _context15.prev = 53;
            _context15.prev = 54;

            if (!_iteratorNormalCompletion17 && _iterator17.return) {
              _iterator17.return();
            }

          case 56:
            _context15.prev = 56;

            if (!_didIteratorError17) {
              _context15.next = 59;
              break;
            }

            throw _iteratorError17;

          case 59:
            return _context15.finish(56);

          case 60:
            return _context15.finish(53);

          case 61:
            inspection.markModified("tasks");
            _context15.next = 64;
            return inspection.save();

          case 64:
            _iteratorNormalCompletion16 = true;
            _context15.next = 39;
            break;

          case 67:
            _context15.next = 73;
            break;

          case 69:
            _context15.prev = 69;
            _context15.t2 = _context15["catch"](37);
            _didIteratorError16 = true;
            _iteratorError16 = _context15.t2;

          case 73:
            _context15.prev = 73;
            _context15.prev = 74;

            if (!_iteratorNormalCompletion16 && _iterator16.return) {
              _iterator16.return();
            }

          case 76:
            _context15.prev = 76;

            if (!_didIteratorError16) {
              _context15.next = 79;
              break;
            }

            throw _iteratorError16;

          case 79:
            return _context15.finish(76);

          case 80:
            return _context15.finish(73);

          case 81:
            temp.markModified("tasks");
            _context15.next = 84;
            return temp.save();

          case 84:
            _iteratorNormalCompletion14 = true;
            _context15.next = 9;
            break;

          case 87:
            _context15.next = 93;
            break;

          case 89:
            _context15.prev = 89;
            _context15.t3 = _context15["catch"](7);
            _didIteratorError14 = true;
            _iteratorError14 = _context15.t3;

          case 93:
            _context15.prev = 93;
            _context15.prev = 94;

            if (!_iteratorNormalCompletion14 && _iterator14.return) {
              _iterator14.return();
            }

          case 96:
            _context15.prev = 96;

            if (!_didIteratorError14) {
              _context15.next = 99;
              break;
            }

            throw _iteratorError14;

          case 99:
            return _context15.finish(96);

          case 100:
            return _context15.finish(93);

          case 101:
            _context15.next = 106;
            break;

          case 103:
            _context15.prev = 103;
            _context15.t4 = _context15["catch"](0);

            console.log("err in updateInspectionAndTemplates() : " + _context15.t4);

          case 106:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee14, this, [[0, 103], [7, 89, 93, 101], [15, 19, 23, 31], [24,, 26, 30], [37, 69, 73, 81], [45, 49, 53, 61], [54,, 56, 60], [74,, 76, 80], [94,, 96, 100]]);
  }));

  return function updateInspectionAndTemplates() {
    return _ref14.apply(this, arguments);
  };
}();

var updateToAddSubdivisionUsingLineId = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(model) {
    return _regenerator2.default.wrap(function _callee15$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return updateToAddMissingField(model, "subdivision", "lineId", getLineSubdivision);

          case 2:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee15, this);
  }));

  return function updateToAddSubdivisionUsingLineId(_x8) {
    return _ref15.apply(this, arguments);
  };
}();

var getLineSubdivision = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(lineId) {
    var line;
    return _regenerator2.default.wrap(function _callee16$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return AssetModel.findOne({ _id: lineId }).exec();

          case 3:
            line = _context17.sent;

            if (!(!line || !line.subdivision || line.subdivision === "")) {
              _context17.next = 7;
              break;
            }

            // todo: log
            console.log("Error while getting subdivision: lineId:", lineId);
            return _context17.abrupt("return", "");

          case 7:
            return _context17.abrupt("return", line.subdivision);

          case 10:
            _context17.prev = 10;
            _context17.t0 = _context17["catch"](0);

            console.log("maintenance.service.getLineSubdivision.catch:", _context17.t0.toString());

          case 13:
            return _context17.abrupt("return", "");

          case 14:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee16, this, [[0, 10]]);
  }));

  return function getLineSubdivision(_x9) {
    return _ref16.apply(this, arguments);
  };
}();

var updateToAddMissingField = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(model, fieldName, fieldToUse) {
    var applyFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var immediate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    var criteria, records, _iteratorNormalCompletion18, _didIteratorError18, _iteratorError18, _iterator18, _step18, rec;

    return _regenerator2.default.wrap(function _callee17$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            criteria = {};

            criteria[fieldName] = { $exists: false };

            _context18.next = 5;
            return model.find(criteria);

          case 5:
            records = _context18.sent;
            _iteratorNormalCompletion18 = true;
            _didIteratorError18 = false;
            _iteratorError18 = undefined;
            _context18.prev = 9;
            _iterator18 = records[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done) {
              _context18.next = 31;
              break;
            }

            rec = _step18.value;

            if (!immediate) {
              _context18.next = 17;
              break;
            }

            rec[fieldName] = fieldToUse;
            _context18.next = 24;
            break;

          case 17:
            if (!applyFunction) {
              _context18.next = 23;
              break;
            }

            _context18.next = 20;
            return applyFunction(rec[fieldToUse]);

          case 20:
            rec[fieldName] = _context18.sent;
            _context18.next = 24;
            break;

          case 23:
            rec[fieldName] = rec[fieldToUse];

          case 24:
            rec.markModified(fieldName);
            _context18.next = 27;
            return rec.save();

          case 27:
            console.log("seed: added missing field: ", fieldName, rec[fieldName].toString(), "to", model.modelName, "using:", fieldToUse, "=", rec[fieldToUse] ? rec[fieldToUse].toString() : "", rec._id.toString());

          case 28:
            _iteratorNormalCompletion18 = true;
            _context18.next = 11;
            break;

          case 31:
            _context18.next = 37;
            break;

          case 33:
            _context18.prev = 33;
            _context18.t0 = _context18["catch"](9);
            _didIteratorError18 = true;
            _iteratorError18 = _context18.t0;

          case 37:
            _context18.prev = 37;
            _context18.prev = 38;

            if (!_iteratorNormalCompletion18 && _iterator18.return) {
              _iterator18.return();
            }

          case 40:
            _context18.prev = 40;

            if (!_didIteratorError18) {
              _context18.next = 43;
              break;
            }

            throw _iteratorError18;

          case 43:
            return _context18.finish(40);

          case 44:
            return _context18.finish(37);

          case 45:
            _context18.next = 50;
            break;

          case 47:
            _context18.prev = 47;
            _context18.t1 = _context18["catch"](0);

            console.log("database.js.updateToAddMissingField.catch", model.modelName, _context18.t1.toString());

          case 50:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee17, this, [[0, 47], [9, 33, 37, 45], [38,, 40, 44]]);
  }));

  return function updateToAddMissingField(_x12, _x13, _x14) {
    return _ref17.apply(this, arguments);
  };
}();

var updateExistingDBLocationAssetTypeAttribute = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(execute) {
    var LocationTypes, locTypesCountUpdated, locAssetUpdated, _iteratorNormalCompletion19, _didIteratorError19, _iteratorError19, _iterator19, _step19, loc, locationAssets, _iteratorNormalCompletion20, _didIteratorError20, _iteratorError20, _iterator20, _step20, locAsset, _iteratorNormalCompletion21, _didIteratorError21, _iteratorError21, _iterator21, _step21, lampKey;

    return _regenerator2.default.wrap(function _callee18$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            if (!execute) {
              _context19.next = 88;
              break;
            }

            _context19.next = 3;
            return AssetsTypeModel.find({ location: true }).exec();

          case 3:
            LocationTypes = _context19.sent;
            locTypesCountUpdated = 0;
            locAssetUpdated = 0;
            _iteratorNormalCompletion19 = true;
            _didIteratorError19 = false;
            _iteratorError19 = undefined;
            _context19.prev = 9;
            _iterator19 = LocationTypes[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done) {
              _context19.next = 72;
              break;
            }

            loc = _step19.value;

            if (!(loc.assetType !== "Company")) {
              _context19.next = 69;
              break;
            }

            loc.lampAttributes = _assetTypeAttributes.LampAttributes.line;
            loc.timpsAttributes = { code: "0001", description: "line" };
            _context19.next = 18;
            return AssetModel.find({
              assetType: loc.assetType
            }).exec();

          case 18:
            locationAssets = _context19.sent;
            _iteratorNormalCompletion20 = true;
            _didIteratorError20 = false;
            _iteratorError20 = undefined;
            _context19.prev = 22;
            _iterator20 = locationAssets[Symbol.iterator]();

          case 24:
            if (_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done) {
              _context19.next = 52;
              break;
            }

            locAsset = _step20.value;

            if (locAsset.attributes) {
              _context19.next = 47;
              break;
            }

            _iteratorNormalCompletion21 = true;
            _didIteratorError21 = false;
            _iteratorError21 = undefined;
            _context19.prev = 30;

            for (_iterator21 = loc.lampAttributes[Symbol.iterator](); !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
              lampKey = _step21.value;

              !locAsset.attributes && (locAsset.attributes = {});
              locAsset.attributes[lampKey.name] = "";
            }
            _context19.next = 38;
            break;

          case 34:
            _context19.prev = 34;
            _context19.t0 = _context19["catch"](30);
            _didIteratorError21 = true;
            _iteratorError21 = _context19.t0;

          case 38:
            _context19.prev = 38;
            _context19.prev = 39;

            if (!_iteratorNormalCompletion21 && _iterator21.return) {
              _iterator21.return();
            }

          case 41:
            _context19.prev = 41;

            if (!_didIteratorError21) {
              _context19.next = 44;
              break;
            }

            throw _iteratorError21;

          case 44:
            return _context19.finish(41);

          case 45:
            return _context19.finish(38);

          case 46:
            locAssetUpdated++;

          case 47:
            _context19.next = 49;
            return locAsset.save();

          case 49:
            _iteratorNormalCompletion20 = true;
            _context19.next = 24;
            break;

          case 52:
            _context19.next = 58;
            break;

          case 54:
            _context19.prev = 54;
            _context19.t1 = _context19["catch"](22);
            _didIteratorError20 = true;
            _iteratorError20 = _context19.t1;

          case 58:
            _context19.prev = 58;
            _context19.prev = 59;

            if (!_iteratorNormalCompletion20 && _iterator20.return) {
              _iterator20.return();
            }

          case 61:
            _context19.prev = 61;

            if (!_didIteratorError20) {
              _context19.next = 64;
              break;
            }

            throw _iteratorError20;

          case 64:
            return _context19.finish(61);

          case 65:
            return _context19.finish(58);

          case 66:
            locTypesCountUpdated++;
            _context19.next = 69;
            return loc.save();

          case 69:
            _iteratorNormalCompletion19 = true;
            _context19.next = 11;
            break;

          case 72:
            _context19.next = 78;
            break;

          case 74:
            _context19.prev = 74;
            _context19.t2 = _context19["catch"](9);
            _didIteratorError19 = true;
            _iteratorError19 = _context19.t2;

          case 78:
            _context19.prev = 78;
            _context19.prev = 79;

            if (!_iteratorNormalCompletion19 && _iterator19.return) {
              _iterator19.return();
            }

          case 81:
            _context19.prev = 81;

            if (!_didIteratorError19) {
              _context19.next = 84;
              break;
            }

            throw _iteratorError19;

          case 84:
            return _context19.finish(81);

          case 85:
            return _context19.finish(78);

          case 86:
            console.log(locTypesCountUpdated + " Location Asset Types attributes types updated ");
            console.log(locAssetUpdated + " Location Asset attribute updated ");

          case 88:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee18, this, [[9, 74, 78, 86], [22, 54, 58, 66], [30, 34, 38, 46], [39,, 41, 45], [59,, 61, 65], [79,, 81, 85]]);
  }));

  return function updateExistingDBLocationAssetTypeAttribute(_x15) {
    return _ref18.apply(this, arguments);
  };
}();

var updateAssetTypesMakeTrackLowestInspectable = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(execute) {
    var trackAssetType, _iteratorNormalCompletion22, _didIteratorError22, _iteratorError22, _iterator22, _step22, allowedTrackItem, aItem;

    return _regenerator2.default.wrap(function _callee19$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            if (!execute) {
              _context20.next = 37;
              break;
            }

            _context20.next = 3;
            return AssetsTypeModel.findOne({
              assetType: "track"
            }).exec();

          case 3:
            trackAssetType = _context20.sent;

            if (!trackAssetType) {
              _context20.next = 37;
              break;
            }

            _iteratorNormalCompletion22 = true;
            _didIteratorError22 = false;
            _iteratorError22 = undefined;
            _context20.prev = 8;
            _iterator22 = trackAssetType.allowedAssetTypes[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done) {
              _context20.next = 23;
              break;
            }

            allowedTrackItem = _step22.value;
            _context20.next = 14;
            return AssetsTypeModel.findOne({
              assetType: allowedTrackItem
            }).exec();

          case 14:
            aItem = _context20.sent;

            if (!aItem) {
              _context20.next = 20;
              break;
            }

            aItem.inspectable = false;
            _context20.next = 19;
            return aItem.save();

          case 19:
            console.log("AssetType " + aItem.assetType + " changed to not inspectable");

          case 20:
            _iteratorNormalCompletion22 = true;
            _context20.next = 10;
            break;

          case 23:
            _context20.next = 29;
            break;

          case 25:
            _context20.prev = 25;
            _context20.t0 = _context20["catch"](8);
            _didIteratorError22 = true;
            _iteratorError22 = _context20.t0;

          case 29:
            _context20.prev = 29;
            _context20.prev = 30;

            if (!_iteratorNormalCompletion22 && _iterator22.return) {
              _iterator22.return();
            }

          case 32:
            _context20.prev = 32;

            if (!_didIteratorError22) {
              _context20.next = 35;
              break;
            }

            throw _iteratorError22;

          case 35:
            return _context20.finish(32);

          case 36:
            return _context20.finish(29);

          case 37:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee19, this, [[8, 25, 29, 37], [30,, 32, 36]]);
  }));

  return function updateAssetTypesMakeTrackLowestInspectable(_x16) {
    return _ref19.apply(this, arguments);
  };
}();

var updateInspectionFrequenciesTemplates = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(execute) {
    var freqObj, templates, _iteratorNormalCompletion23, _didIteratorError23, _iteratorError23, _iterator23, _step23, temps, freqObject;

    return _regenerator2.default.wrap(function _callee20$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            freqObj = {
              freq: 1,
              timeFrame: "Month",
              timeFrameNumber: 1,
              recurNumber: 1,
              recurTimeFrame: "Month",
              maxInterval: 0,
              minDays: 0
            };

            if (!execute) {
              _context21.next = 40;
              break;
            }

            _context21.next = 4;
            return WorkPlanTemplateModel.find().exec();

          case 4:
            templates = _context21.sent;
            _iteratorNormalCompletion23 = true;
            _didIteratorError23 = false;
            _iteratorError23 = undefined;
            _context21.prev = 8;
            _iterator23 = templates[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done) {
              _context21.next = 26;
              break;
            }

            temps = _step23.value;

            if (!(!temps.inspectionFrequencies || temps.inspectionFrequencies.length == 0)) {
              _context21.next = 23;
              break;
            }

            freqObject = (0, _extends3.default)({}, freqObj);

            temps.perTime && (freqObject.freq = temps.perTime);
            temps.minDays && (freqObject.minDays = temps.minDays);
            temps.timeFrame && (freqObj.timeFrame = temps.timeFrame);
            temps.timeFrame && (freqObj.recurTimeFrame = temps.timeFrame);
            temps.inspectionFrequencies = [freqObject];
            temps.markModified("inspectionFrequencies");
            _context21.next = 22;
            return temps.save();

          case 22:
            console.log("updating : ", temps);

          case 23:
            _iteratorNormalCompletion23 = true;
            _context21.next = 10;
            break;

          case 26:
            _context21.next = 32;
            break;

          case 28:
            _context21.prev = 28;
            _context21.t0 = _context21["catch"](8);
            _didIteratorError23 = true;
            _iteratorError23 = _context21.t0;

          case 32:
            _context21.prev = 32;
            _context21.prev = 33;

            if (!_iteratorNormalCompletion23 && _iterator23.return) {
              _iterator23.return();
            }

          case 35:
            _context21.prev = 35;

            if (!_didIteratorError23) {
              _context21.next = 38;
              break;
            }

            throw _iteratorError23;

          case 38:
            return _context21.finish(35);

          case 39:
            return _context21.finish(32);

          case 40:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee20, this, [[8, 28, 32, 40], [33,, 35, 39]]);
  }));

  return function updateInspectionFrequenciesTemplates(_x17) {
    return _ref20.apply(this, arguments);
  };
}();

var addMissingIssueIdsInJourneyPlans = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(execute) {
    var journeyPlans, jIndex, isUpdateIndex, tIndex, iIndex;
    return _regenerator2.default.wrap(function _callee21$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            if (!execute) {
              _context22.next = 18;
              break;
            }

            _context22.next = 3;
            return JourneyPlanModel.find({}).exec();

          case 3:
            journeyPlans = _context22.sent;

            if (!(journeyPlans && journeyPlans.length)) {
              _context22.next = 18;
              break;
            }

            jIndex = 0;

          case 6:
            if (!(jIndex < journeyPlans.length)) {
              _context22.next = 18;
              break;
            }

            isUpdateIndex = null;

            // Check if journey plan have tasks

            if (journeyPlans[jIndex].tasks && journeyPlans[jIndex].tasks.length) {
              for (tIndex = 0; tIndex < journeyPlans[jIndex].tasks.length; tIndex++) {
                // Check if tasks have issues.
                if (journeyPlans[jIndex].tasks[tIndex].issues && journeyPlans[jIndex].tasks[tIndex].issues.length) {
                  for (iIndex = 0; iIndex < journeyPlans[jIndex].tasks[tIndex].issues.length; iIndex++) {
                    // Check if issues don't have issues id
                    if (!journeyPlans[jIndex].tasks[tIndex].issues[iIndex].issueId) {
                      journeyPlans[jIndex].tasks[tIndex].issues[iIndex].issueId = (0, _UUID.guid)();
                      isUpdateIndex = jIndex;
                    }
                  }
                }
              }
            }

            // If journey plan to be updated.

            if (!(isUpdateIndex !== null)) {
              _context22.next = 15;
              break;
            }

            journeyPlans[jIndex].markModified("tasks");
            _context22.next = 13;
            return journeyPlans[jIndex].save();

          case 13:
            isUpdateIndex = null;
            console.log("updating issues of : ", journeyPlans[jIndex]);

          case 15:
            jIndex++;
            _context22.next = 6;
            break;

          case 18:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee21, this);
  }));

  return function addMissingIssueIdsInJourneyPlans(_x18) {
    return _ref21.apply(this, arguments);
  };
}();

// await createWorkplanTemplates();
// await createJourneyPlans();
// await createRuns();
// await createMaintenances();


var _railRoadLocationsTemplate = require("../../template/railRoadLocationsTemplate");

var _permissionRoles = require("./permissionRoles");

var _assetTypeAttributes = require("../../template/assetTypeAttributes");

var _dbHelperMethods = require("./dbFunctions/dbHelperMethods");

var _dbAnalyzerMethod = require("../../dbAnalyzer/dbAnalyzerMethod");

var _defectCodes = require("./defectCodes");

var _configurations = require("./configurations/configurations");

var _applicationlookupslist = require("./configurations/applicationlookupslist");

var _supportedParamsList = require("./configurations/supportedParamsList");

var _supportedDevicesList = require("./configurations/supportedDevicesList");

var _assetTypesChangesOct = require("./dbFunctions/assetTypesChangesOct2020");

var _IOCMissingAssetTypes = require("./dbFunctions/IOCMissingAssetTypes");

var _UUID = require("../../utilities/UUID");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require("lodash");
var UserGroup = require("../../api/userGroup/userGroup.model");
var GroupPermission = require("../../api/permission/permission.model");
var Tenant = require("../../api/tenant/tenant.model");
var User = require("../../api/user/user.model");
var config = require("../environment/index");
var ListModel = require("../../api/list/list.model");
var ApplicationLookupsModel = require("../../api/ApplicationLookups/ApplicationLookups.model");
var SODModel = require("../../api/SOD/SOD.model");

var AssetModel = require("../../api/assets/assets.modal");
var JourneyPlanModel = require("../../timps/api/journeyPlan/journeyPlan.model");
var WorkPlanTemplateModel = require("../../timps/api/wPlanTemplate/wPlanTemplate.model");
var Maintenance = require("../../api/Maintenance/Maintenance.model");
var AssetsTypeModel = require("../../api/assetTypes/assetTypes.model.js");
var ServiceLocator = require("../../framework/servicelocator");

//import {addFerromexAssets} from "../../utilities/FerromexAssets";
//import { addLampAssetsForNHSLT1, trackAssetPopulateNSHL, lampNHSLAssets } from "../../utilities/nhslTracksAssetPopulate";

var appAccessService = ServiceLocator.resolve("AppAccessService");
//Assigning the word that if defect code contain such word then it will update the whole object
var defectToFind = "trainig";

module.exports.createDatabase = createDatabase;

function findAssetTypeDepth(allLocations, parentAT) {
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (parentAT.allowedAssetTypes && parentAT.allowedAssetTypes.length) {
    var _loop2 = function _loop2(i) {
      //console.log('finding ', parentAT.allowedAssetTypes[i]);
      var at = allLocations.find(function (a) {
        return a.assetType === parentAT.allowedAssetTypes[i];
      });

      if (at) {
        var d = findAssetTypeDepth(allLocations, at, max + 1);
        //console.log('type:', at.assetType, 'depth', d);
        if (d > max) {
          max = d;
        }
      }
      //else console.log('Not found ');
    };

    for (var i = 0; i < parentAT.allowedAssetTypes.length; i++) {
      _loop2(i);
    }
  }

  return max;
}