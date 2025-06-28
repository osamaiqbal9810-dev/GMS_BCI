"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isJSON = exports.isJSON = function isJSON(str) {
  var toReturnObj = "";
  try {
    var json = JSON.parse(str);
    if (Object.prototype.toString.call(json).slice(8, -1) !== "Object") {
      return false;
    }
    toReturnObj = json;
  } catch (e) {
    return false;
  }
  return toReturnObj;
};