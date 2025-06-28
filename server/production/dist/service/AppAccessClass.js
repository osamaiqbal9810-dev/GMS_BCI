"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _assetTypes = require("../api/assetTypes/assetTypes.model");

var _assetTypes2 = _interopRequireDefault(_assetTypes);

var _permissionRoles = require("../config/database/permissionRoles");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _dbHelperMethods = require("../config/database/dbFunctions/dbHelperMethods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserGroup = require("../api/userGroup/userGroup.model");
var GroupPermission = require("../api/permission/permission.model");

var AppAccessService = function () {
  function AppAccessService() {
    (0, _classCallCheck3.default)(this, AppAccessService);

    this.assetTypeAccessPermission = [{ name: "SYSTEM_ACCESS_ASSETTYPE_TIMPS", resource: "SYSTEM_ACCESS", action: "ASSETTYPE_TIMPS" }, { name: "SYSTEM_ACCESS_ASSETTYPE_SCIM", resource: "SYSTEM_ACCESS", action: "ASSETTYPE_SCIM" }, { name: "SYSTEM_ACCESS_ASSETTYPE_BRIDGE", resource: "SYSTEM_ACCESS", action: "ASSETTYPE_BRIDGE" }];
    this.systemUserGroups = [{ group_id: "manager", name: "Management", permissions: [], isAdmin: false, level: 1, category: "Role" }, { group_id: "supervisor", name: "Track Manager", permissions: [], isAdmin: false, level: 2, category: "Role" }, { group_id: "inspector", name: "Inspector", permissions: [], isAdmin: false, level: 3, category: "Role" }, {
      group_id: "trackSwitch",
      name: "Track And Switch",
      permissions: this.assetTypeAccessPermission[0].name,
      isAdmin: false,
      level: 4,
      category: "Department"
    }, {
      group_id: "signalCrossing",
      name: "Signal And Crossing",
      permissions: this.assetTypeAccessPermission[1].name,
      isAdmin: false,
      level: 4,
      category: "Department"
    }, {
      group_id: "bridge",
      name: "Bridge",
      permissions: this.assetTypeAccessPermission[2].name,
      isAdmin: false,
      level: 4,
      category: "Department"
    }];
    this.relations = [{ assetType: "track", permission: this.assetTypeAccessPermission[0].name }, { assetType: "Switch", permission: this.assetTypeAccessPermission[0].name }, { assetType: "Signal", permission: this.assetTypeAccessPermission[1].name }, { assetType: "Crossing", permission: this.assetTypeAccessPermission[1].name }, { assetType: "Bridge", permission: this.assetTypeAccessPermission[2].name }];
  }

  (0, _createClass3.default)(AppAccessService, [{
    key: "getPermissions",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(permType) {
        var permissions, permissionAry, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, perm, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _perm, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _perm2, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _perm3;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return GroupPermission.find({}).exec();

              case 2:
                permissions = _context.sent;
                // get all permissions
                permissionAry = [];


                if (permType == "All") {
                  permissionAry = _lodash2.default.map(permissions, function (item) {
                    return item._id;
                  });
                }

                if (!(permType == "inspector")) {
                  _context.next = 25;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 9;

                for (_iterator = permissions[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  perm = _step.value;

                  if (_lodash2.default.find(_permissionRoles.inspectorPermissions, { name: perm.name })) {
                    permissionAry.push(perm._id);
                  }
                  if (_lodash2.default.find(this.assetTypeAccessPermission, { name: perm.name })) {
                    permissionAry.push(perm._id);
                  }
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
                if (!(permType == "trackSwitch")) {
                  _context.next = 45;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 29;

                for (_iterator2 = permissions[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _perm = _step2.value;

                  if (!_lodash2.default.find([this.assetTypeAccessPermission[1], this.assetTypeAccessPermission[2]], { name: _perm.name })) {
                    permissionAry.push(_perm._id);
                  }
                }
                _context.next = 37;
                break;

              case 33:
                _context.prev = 33;
                _context.t1 = _context["catch"](29);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t1;

              case 37:
                _context.prev = 37;
                _context.prev = 38;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 40:
                _context.prev = 40;

                if (!_didIteratorError2) {
                  _context.next = 43;
                  break;
                }

                throw _iteratorError2;

              case 43:
                return _context.finish(40);

              case 44:
                return _context.finish(37);

              case 45:
                if (!(permType == "signalCrossing")) {
                  _context.next = 65;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 49;

                for (_iterator3 = permissions[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _perm2 = _step3.value;

                  if (!_lodash2.default.find([this.assetTypeAccessPermission[0], this.assetTypeAccessPermission[2]], { name: _perm2.name })) {
                    permissionAry.push(_perm2._id);
                  }
                }
                _context.next = 57;
                break;

              case 53:
                _context.prev = 53;
                _context.t2 = _context["catch"](49);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t2;

              case 57:
                _context.prev = 57;
                _context.prev = 58;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 60:
                _context.prev = 60;

                if (!_didIteratorError3) {
                  _context.next = 63;
                  break;
                }

                throw _iteratorError3;

              case 63:
                return _context.finish(60);

              case 64:
                return _context.finish(57);

              case 65:
                if (!(permType == "bridge")) {
                  _context.next = 85;
                  break;
                }

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context.prev = 69;

                for (_iterator4 = permissions[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  _perm3 = _step4.value;

                  if (!_lodash2.default.find([this.assetTypeAccessPermission[0], this.assetTypeAccessPermission[1]], { name: _perm3.name })) {
                    permissionAry.push(_perm3._id);
                  }
                }
                _context.next = 77;
                break;

              case 73:
                _context.prev = 73;
                _context.t3 = _context["catch"](69);
                _didIteratorError4 = true;
                _iteratorError4 = _context.t3;

              case 77:
                _context.prev = 77;
                _context.prev = 78;

                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }

              case 80:
                _context.prev = 80;

                if (!_didIteratorError4) {
                  _context.next = 83;
                  break;
                }

                throw _iteratorError4;

              case 83:
                return _context.finish(80);

              case 84:
                return _context.finish(77);

              case 85:
                return _context.abrupt("return", permissionAry);

              case 86:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 13, 17, 25], [18,, 20, 24], [29, 33, 37, 45], [38,, 40, 44], [49, 53, 57, 65], [58,, 60, 64], [69, 73, 77, 85], [78,, 80, 84]]);
      }));

      function getPermissions(_x) {
        return _ref.apply(this, arguments);
      }

      return getPermissions;
    }()
  }, {
    key: "initializeDbOperation",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(customRelations, customPermissions, customGroup) {
        var permissionsToCheck, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, per, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, group, aTypeRelations, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, rel, aType;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // create / update Permissions
                permissionsToCheck = customPermissions ? customPermissions : this.assetTypeAccessPermission;
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context2.prev = 4;
                _iterator5 = permissionsToCheck[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context2.next = 13;
                  break;
                }

                per = _step5.value;
                _context2.next = 10;
                return (0, _dbHelperMethods.addIfNotExist)(GroupPermission, per, per);

              case 10:
                _iteratorNormalCompletion5 = true;
                _context2.next = 6;
                break;

              case 13:
                _context2.next = 19;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](4);
                _didIteratorError5 = true;
                _iteratorError5 = _context2.t0;

              case 19:
                _context2.prev = 19;
                _context2.prev = 20;

                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                  _iterator5.return();
                }

              case 22:
                _context2.prev = 22;

                if (!_didIteratorError5) {
                  _context2.next = 25;
                  break;
                }

                throw _iteratorError5;

              case 25:
                return _context2.finish(22);

              case 26:
                return _context2.finish(19);

              case 27:
                if (customGroup) {
                  _context2.next = 68;
                  break;
                }

                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                _context2.prev = 31;
                _iterator6 = this.systemUserGroups[Symbol.iterator]();

              case 33:
                if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                  _context2.next = 54;
                  break;
                }

                group = _step6.value;

                if (!(group.category == "Role")) {
                  _context2.next = 45;
                  break;
                }

                if (!(group.group_id == "inspector")) {
                  _context2.next = 42;
                  break;
                }

                _context2.next = 39;
                return this.getPermissions(group.group_id);

              case 39:
                group.permissions = _context2.sent;
                _context2.next = 45;
                break;

              case 42:
                _context2.next = 44;
                return this.getPermissions("All");

              case 44:
                group.permissions = _context2.sent;

              case 45:
                if (!(group.category == "Department")) {
                  _context2.next = 49;
                  break;
                }

                _context2.next = 48;
                return this.getPermissions(group.group_id);

              case 48:
                group.permissions = _context2.sent;

              case 49:
                _context2.next = 51;
                return (0, _dbHelperMethods.UpdateOrAddIfNotExist)(UserGroup, group, group, { group_id: group.group_id });

              case 51:
                _iteratorNormalCompletion6 = true;
                _context2.next = 33;
                break;

              case 54:
                _context2.next = 60;
                break;

              case 56:
                _context2.prev = 56;
                _context2.t1 = _context2["catch"](31);
                _didIteratorError6 = true;
                _iteratorError6 = _context2.t1;

              case 60:
                _context2.prev = 60;
                _context2.prev = 61;

                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }

              case 63:
                _context2.prev = 63;

                if (!_didIteratorError6) {
                  _context2.next = 66;
                  break;
                }

                throw _iteratorError6;

              case 66:
                return _context2.finish(63);

              case 67:
                return _context2.finish(60);

              case 68:
                // update assetType
                aTypeRelations = customRelations ? customRelations : this.relations;
                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                _context2.prev = 72;
                _iterator7 = aTypeRelations[Symbol.iterator]();

              case 74:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                  _context2.next = 86;
                  break;
                }

                rel = _step7.value;
                _context2.next = 78;
                return _assetTypes2.default.findOne({ assetType: rel.assetType });

              case 78:
                aType = _context2.sent;

                if (!aType) {
                  _context2.next = 83;
                  break;
                }

                aType.accessPermission = rel.permission;
                _context2.next = 83;
                return aType.save();

              case 83:
                _iteratorNormalCompletion7 = true;
                _context2.next = 74;
                break;

              case 86:
                _context2.next = 92;
                break;

              case 88:
                _context2.prev = 88;
                _context2.t2 = _context2["catch"](72);
                _didIteratorError7 = true;
                _iteratorError7 = _context2.t2;

              case 92:
                _context2.prev = 92;
                _context2.prev = 93;

                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }

              case 95:
                _context2.prev = 95;

                if (!_didIteratorError7) {
                  _context2.next = 98;
                  break;
                }

                throw _iteratorError7;

              case 98:
                return _context2.finish(95);

              case 99:
                return _context2.finish(92);

              case 100:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 15, 19, 27], [20,, 22, 26], [31, 56, 60, 68], [61,, 63, 67], [72, 88, 92, 100], [93,, 95, 99]]);
      }));

      function initializeDbOperation(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return initializeDbOperation;
    }()
  }]);
  return AppAccessService;
}();

exports.default = AppAccessService;