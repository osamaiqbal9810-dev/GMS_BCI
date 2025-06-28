"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.tracks_Transformation_From_KmlJSON_DBTracks = tracks_Transformation_From_KmlJSON_DBTracks;

var _Centerline = require("./Centerline");

var _MilePosts = require("./MilePosts");

var _UUID = require("../UUID");

var _bridges = require("./bridges");

var _crossings = require("./crossings");

var _diamonds = require("./diamonds");

var _switches = require("./switches");

var _whistlepost = require("./whistlepost");

var _signals = require("./signals");

var _culvets = require("./culvets");

var _signs = require("./signs");

var _helper = require("./helper");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tracks_Transformation_From_KmlJSON_DBTracks() {
  // let latLon = {
  //   lon: tracks.features[0].geometry.coordinates[0][0][0] * 100000000000000,
  //   lat: tracks.features[0].geometry.coordinates[0][0][1] * 100000000000000
  // }
  // let newlatLon = {
  //   x1: tracks.features[0].geometry.coordinates[0][0][0] + 0.0000000000005,
  //   x2: tracks.features[0].geometry.coordinates[0][0][0] - 0.0000000000005,
  //   y1: tracks.features[0].geometry.coordinates[0][0][1] + 0.0000000000005,
  //   y2: tracks.features[0].geometry.coordinates[0][0][1] - 0.0000000000005
  // }
  // // console.log(latLon)
  // // console.log(newlatLon)
  var distanceUnit = 0.00500000000005;
  var updatedTracksGuid = [];
  var foundMilepost = [];
  var notFoundMilePost = [];
  var uniquePosts = {};
  var MainLineMilePost = _lodash2.default.cloneDeep(_MilePosts.milePosts);
  var milePostDuplicateCount = 0;

  var unique = [];
  MainLineMilePost.features.forEach(function (post) {
    var railroad = (0, _helper.fieldFromDescription)("railroad", post.properties.description);
    if (!railroad || railroad == "") {
      railroad = "SCFE";
    }
    var nameSplit = post.properties.Name.split(" ");
    var name = nameSplit[0];
    var found = false;
    unique.forEach(function (uniqueVal) {
      if (uniqueVal.name == name) {
        found = true;
      }
    });
    if (!found) {
      unique.push({ name: name, railroad: railroad });
    }
  });

  // console.log(unique)
  MainLineMilePost.features.forEach(function (milePost) {
    if (milePost.added) {
      milePostDuplicateCount++;
    }
    var milePostFlag = false;
    var newlatLon = {
      x1: milePost.geometry.coordinates[0] + distanceUnit,
      x2: milePost.geometry.coordinates[0] - distanceUnit,
      y1: milePost.geometry.coordinates[1] + distanceUnit,
      y2: milePost.geometry.coordinates[1] - distanceUnit
    };
    _Centerline.tracks.features.forEach(function (track, index) {
      track.sortId = index;
      track.railRoad = (0, _helper.fieldFromDescription)("railroad", track.properties.description);
      // if (track.properties.Name == 'Mainline') {
      var flag = { guid: null, val: false };

      track.geometry.coordinates[0].forEach(function (coordinate) {
        var latLon = {
          x: coordinate[0],
          y: coordinate[1]
        };

        if (latLon.x > newlatLon.x2 && latLon.x < newlatLon.x1 && latLon.y > newlatLon.y2 && latLon.y < newlatLon.y1) {
          var railroad = (0, _helper.fieldFromDescription)("railroad", track.properties.description);
          //// console.log(railroad)
          if (!railroad || railroad == "") {
            //  // console.log('empty Found')
            railroad = "Unnamed";
          }
          var milePostPrefix = milePost.properties.Name.split(" ");
          var uniqueResult = _lodash2.default.find(unique, { railroad: railroad, name: milePostPrefix[0] });
          var checkRailRoad = false;

          if (milePostPrefix[0] == "SCFEC") {
            // console.log('SCFEC FOUND')
          }
          if (uniqueResult) {
            checkRailRoad = milePost.properties.Name.includes(railroad);
          }
          if (milePostPrefix[0] == "FEC") {
            if (milePostPrefix[0] == "FEC" && railroad == "SCFE") {
              checkRailRoad = true;
            }
          }
          if (checkRailRoad && !milePost.added) {
            var newGuid = (0, _UUID.guid)();
            flag.val = true;
            milePost.added = true;
            if (!track.guid) {
              flag.guid = newGuid;
              milePost.trackGuid = newGuid;
            } else {
              milePost.trackGuid = track.guid;
              var mpAlreadyExist = _lodash2.default.find(uniquePosts[milePost.trackGuid], function (milepost) {
                return milePost.properties.Name == milepost.properties.Name;
              });
              if (!mpAlreadyExist) {
                uniquePosts[milePost.trackGuid].push(milePost);
              }
            }
            milePostFlag = true;
            return;
          }
        }
      });

      if (flag.val && flag.guid && milePostFlag) {
        track.guid = flag.guid;
        updatedTracksGuid.push(track);
        uniquePosts[flag.guid] = [milePost];
        return;
      } else if (flag.val && milePostFlag) {
        return;
      }
      //    }
    });

    if (!milePostFlag) {
      notFoundMilePost.push(milePost);
    } else {
      foundMilepost.push(milePost);
    }
  });
  // // console.log('Updated Tracks')
  // // console.log(tracks)
  // let latLon = {
  //   x: 1000,
  //   y: 500
  // }

  // let newlatLon = {
  //   x1: 1200,
  //   x2: 800,
  //   y1: 700,
  //   y2: 300
  // }
  // if (latLon.x > newlatLon.x2 && latLon.x < newlatLon.x1 && latLon.y > newlatLon.y2 && latLon.y < newlatLon.y1) {
  //   // console.log('found')
  // }
  // console.log('milePostDuplicateCount : ' + milePostDuplicateCount)
  // console.log('foundMilepost')
  // console.log(foundMilepost)
  // console.log('notFoundMilePost')
  // console.log(notFoundMilePost)
  // console.log('uniquePosts')
  // console.log(uniquePosts)
  var uniquePostskeys = Object.keys(uniquePosts);
  // console.log(uniquePostskeys.length)

  uniquePostskeys.forEach(function (key) {
    var smallestVal = null;
    var greatestVal = null;
    var name = "";

    var Mp = uniquePosts[key][0].properties.Name.split(" ");
    var nameMP = Mp[0];

    uniquePosts[key].forEach(function (post) {
      var str = post.properties.Name;
      var split = str.split(" ");
      name = split[0];

      if (name == "USSCF") {
        //  // console.log(post)
      }
      if (name == nameMP) {
        if (split[1] == 0) {
          // // console.log('Found 0')
          // // console.log(post)
          // // console.log(uniquePosts[key])
        }
        if (smallestVal) {
          if (split[1] < smallestVal) {
            smallestVal = split[1];
          }
        } else {
          smallestVal = split[1];
        }
        if (greatestVal) {
          if (split[1] > greatestVal) {
            greatestVal = split[1];
          }
        } else {
          greatestVal = split[1];
        }
      }
    });
    if (smallestVal == 0) {}
    //    // console.log(uniquePosts[key])

    // Update Track INFO from Milepost
    var result = _lodash2.default.find(updatedTracksGuid, function (track) {
      return track.guid == key;
    });
    if (result) {
      if (nameMP == "USSCF") {
        //// console.log('USSCF')
      }
      result.startEnd = { start: smallestVal, end: greatestVal };
      result.length = greatestVal - smallestVal;
      result.trackId = name + " " + smallestVal + "-" + greatestVal;
      result.MP_PREFIX = name;
      result.units = [];
    }
  });

  // console.log('updated tracks with Assets')
  // console.log(updatedTracksGuid)
  var mergedTracks = mergeTracksWithRails(updatedTracksGuid);

  getAssetFromProperties(_bridges.bridges, mergedTracks);
  getAssetFromProperties(_crossings.crossings, mergedTracks);
  getAssetFromProperties(_diamonds.diamonds, mergedTracks);
  getAssetFromDescription(_switches.switches, mergedTracks, "switches");
  getAssetFromDescription(_whistlepost.whistlePost, mergedTracks, "whistle post");
  getAssetFromDescription(_signals.signals, mergedTracks, "signals");
  getAssetFromDescription(_culvets.culvets, mergedTracks, "culvets");
  getAssetFromDescription(_signs.signs, mergedTracks, "signs");
  var finalTrackData = finishedTracksforDataBase(mergedTracks);
  return finalTrackData;
}

function mergeTracksWithRails(tracksData) {
  var updatedTracksMerged = [];
  var sortedData = _lodash2.default.sortBy(tracksData, [function (track) {
    return parseInt(track.startEnd.start);
  }]);
  // console.log('sortedData')
  // console.log(sortedData)
  sortedData.forEach(function (track) {
    var exists = _lodash2.default.find(updatedTracksMerged, { MP_PREFIX: track.MP_PREFIX });
    var unit = {
      assetType: "rail",
      start: track.startEnd.start,
      end: track.startEnd.end,
      id: (0, _UUID.guid)(),
      length: parseInt(track.startEnd.end) - parseInt(track.startEnd.start),
      unitId: track.trackId,
      coordinates: track.geometry.coordinates[0],
      railRoad: track.railRoad,
      altitudeMode: track.properties.altitudeMode
    };
    if (exists) {
      exists.startEnd.end = track.startEnd.end;

      exists.geometry.coordinates[0] = [].concat((0, _toConsumableArray3.default)(exists.geometry.coordinates[0]), (0, _toConsumableArray3.default)(track.geometry.coordinates[0]));

      exists.units.push(unit);
      exists.trackId = track.MP_PREFIX + " " + exists.startEnd.start + "-" + track.startEnd.end;

      exists.length = track.startEnd.end - exists.startEnd.start;
    } else {
      track.units.push(unit);
      updatedTracksMerged.push(track);
    }
  });
  return updatedTracksMerged;
}

function finishedTracksforDataBase(tracksUpdated) {
  var dbTracks = [];
  tracksUpdated.forEach(function (dataTrack) {
    var track = {
      subdivision: "US-Sugar",
      trackType: dataTrack.properties.Name,
      start: dataTrack.startEnd.start,
      end: dataTrack.startEnd.end,
      length: dataTrack.length.toString(),
      trafficType: "Unknown",
      weight: "",
      class: "",
      trackId: dataTrack.trackId,
      units: dataTrack.units,
      coordinates: dataTrack.geometry.coordinates[0],
      mp_prefix: dataTrack.MP_PREFIX
    };
    dbTracks.push(track);
  });
  // console.log("TRACKS FOR DB");
  // console.log(dbTracks);
  return dbTracks;
}

function getAssetFromProperties(assetTypeData, tracksData) {
  var tracksWithAsset = [];
  var foundAsset = [];
  var count = 0;
  assetTypeData.features.forEach(function (asset) {
    tracksData.forEach(function (track) {
      var assetMilePost = asset.properties.MP_Number;
      if (asset.properties.MP_Prefix == track.MP_PREFIX) {
        if (parseFloat(assetMilePost) > parseFloat(track.startEnd.start) && parseFloat(assetMilePost) < parseFloat(track.startEnd.end)) {
          var railRoad = asset.properties.Railroad;
          if (!railRoad) {
            railRoad = asset.properties.RR;
          }
          var unit = {
            assetType: assetTypeData.name.toLowerCase(),
            start: asset.properties.MP_Number,
            end: asset.properties.MP_Number,
            length: "0",
            id: (0, _UUID.guid)(),
            unitId: asset.properties.Name + "-" + asset.properties.MP_Number,
            coordinates: asset.geometry.coordinates,
            railRoad: railRoad,
            altitudeMode: asset.properties.altitudeMode
          };
          track.units.push(unit);
          count++;
          tracksWithAsset.push(track);
          foundAsset.push(asset);
        }
      }
    });
  });
  // console.log('Tracks With : ' + assetTypeData.name)
  // console.log(tracksWithAsset)
  // console.log(assetTypeData.name)
  // console.log(foundAsset)
}

function getAssetFromDescription(assetTypeData, tracksData, assetName) {
  if (assetName == "switches") {
    // console.log('breakPoint')
  }
  var assetWithoutMP = [];
  var tracksWithAsset = [];
  var foundAsset = [];
  var count = 0;
  assetTypeData.features.forEach(function (asset) {
    var assetMilePost = (0, _helper.fieldFromDescription)("MP_Number", asset.properties.description);
    var railRoad = (0, _helper.fieldFromDescription)("railroad", asset.properties.description);
    if (!assetMilePost && assetMilePost.trim() == "") {
      assetWithoutMP.push(asset);
    }
    tracksData.forEach(function (track) {
      if ((0, _helper.fieldFromDescription)("MP_Prefix", asset.properties.description) == track.MP_PREFIX) {
        if (parseFloat(assetMilePost) > parseFloat(track.startEnd.start) && parseFloat(assetMilePost) < parseFloat(track.startEnd.end)) {
          if (!railRoad) {
            railRoad = (0, _helper.fieldFromDescription)("RR", asset.properties.description);
          }
          var unit = {
            assetType: assetName,
            start: assetMilePost,
            end: assetMilePost,
            length: "0",
            id: (0, _UUID.guid)(),
            unitId: assetName + "-" + assetMilePost,
            coordinates: asset.geometry.coordinates,
            railRoad: railRoad

            //altitudeMode: asset.properties.altitudeMode
          };
          track.units.push(unit);
          asset.found = true;
          count++;
          tracksWithAsset.push(track);
          foundAsset.push(asset);
        }
      }
    });
  });

  // console.log('Tracks With : ' + assetName)
  // console.log(tracksWithAsset)
  // console.log(assetName)
  // console.log(foundAsset)
  // console.log('assets Without MP NUMBER')
  // console.log(assetWithoutMP)
}