"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permChecker = undefined;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var permChecker = exports.permChecker = function permChecker(permArray, resource, action) {
  var check = false;
  check = _lodash2.default.find(permArray, {
    resource: resource,
    action: action
  });
  return check;
}; // NOT IN USE