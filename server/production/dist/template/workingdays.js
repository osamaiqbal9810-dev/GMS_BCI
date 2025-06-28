"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workingDays = undefined;

var _momentTimezone = require("moment-timezone");

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var workingDays = exports.workingDays = {
  weekOffDays: ["Saturday", "Sunday"],
  holidays: []
};