"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDbTracksCSXSample = getDbTracksCSXSample;

var _csxData = require("./csxData");

var _csxDataT = require("./csxDataT2");

var _UUID = require("../UUID");

var _latlonCorrection = require("../latlonCorrection");

function getDbTracksCSXSample() {
  var tracks = [];
  (0, _latlonCorrection.csxDataDemoLatLonCorrection)(_csxData.csxTrack1Sample);
  var newCsxT1Cord = (0, _latlonCorrection.reverseLatLon)(_csxData.csxTrack1Cords);
  (0, _latlonCorrection.csxDataDemoLatLonCorrection)(_csxDataT.csxTrack2Sample);
  var newCsxT2Cord = (0, _latlonCorrection.reverseLatLon)(_csxDataT.csxTrack2Cords);
  var trackOne = addTrack(_csxData.csxTrack1Sample, 1, newCsxT1Cord);
  var trackTwo = addTrack(_csxDataT.csxTrack2Sample, 2, newCsxT2Cord);
  //console.log("Db Tracks");
  tracks = [trackOne, trackTwo];
  //console.log((tracks = [trackOne, trackTwo]));
  return tracks;
}
function addTrack(tracks, tNum, csxTrackCords) {
  var units = [];

  var possibleAssetTypes = ["Crossing", "Bridge", "Access Point", "Switch", "Derail", "Xing", "Signal", "Overpass"];
  tracks.features.forEach(function (asset, index) {
    var assetTypeName = "";
    possibleAssetTypes.forEach(function (atype) {
      var assetTypeFound = asset.properties.name.search(atype);
      if (assetTypeFound >= 0) {
        assetTypeName = atype;
        return;
      }
    });
    var unit = {
      assetType: assetTypeName,
      start: (index + 1).toString(),
      end: (index + 1).toString(),
      length: "0",
      id: (0, _UUID.guid)(),
      unitId: asset.properties.name,
      coordinates: asset.geometry.coordinates,
      railRoad: "CSX"
    };
    units.push(unit);
  });
  var railUnit = {
    assetType: "Rail",
    start: "0",
    end: (tracks.features.length - 1).toString(),
    length: tracks.features.length.toString(),
    unitId: "Track-CSX-00" + tNum,
    id: (0, _UUID.guid)(),
    coordinates: csxTrackCords ? csxTrackCords : [],
    railRoad: "CSX"
  };
  units.push(railUnit);
  var trackForDb = {
    subdivision: "Albany Subdivision",
    trackType: "Main Line",
    start: "0",
    end: (tracks.features.length - 1).toString(),
    length: tracks.features.length.toString(),
    trafficType: "Freight",
    trackId: "Rail-CSX-00" + tNum,
    units: units,
    coordinates: [],
    mp_prefix: "CSX",
    weight: "",
    class: ""
  };
  return trackForDb;
}