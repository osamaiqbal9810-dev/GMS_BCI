"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseLatLon = reverseLatLon;
exports.csxDataDemoLatLonCorrection = csxDataDemoLatLonCorrection;
function reverseLatLon(gisData) {
  var newGisData = [];
  gisData.forEach(function (element) {
    var newObj = [element[1], element[0]];
    newGisData.push(newObj);
  });
  return newGisData;
}

function csxDataDemoLatLonCorrection(csxSample) {
  csxSample.features.forEach(function (asset) {
    asset.geometry.coordinates = [[asset.geometry.coordinates[1], asset.geometry.coordinates[0]]];
  });
}