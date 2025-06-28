"use strict";

/**
 * Created by zqureshi on 10/12/2018.
 */
var _ = require("lodash");
var fs = require("fs");
var config = require("../../config/environment");
var path = require("path");
// let thumb = require('node-thumbnail').thumb;
// let Jimp = require('jimp');

var ServiceLocator = require("../../framework/servicelocator");
//let ApplicationResourcesModel = require("./ApplicationResouces.model");

exports.show = function (req, res, next) {
  fs.readdir(config.uploadPath, function (err, items) {
    if (items === undefined) {
      items = [];
    }
    items = items.filter(function (value, index, arr) {
      return value != "thumbnails";
    });
    res.status(200);
    res.json(items);
  });
};

exports.showAssetImgs = function (req, res, next) {
  fs.readdir(config.assetImages, function (err, items) {
    if (items === undefined) {
      items = [];
    }
    items = items.filter(function (value, index, arr) {
      return value != "thumbnails";
    });
    res.status(200);
    res.json(items);
  });
};

exports.showAssetDocuments = function (req, res, next) {
  fs.readdir(config.assetDocuments, function (err, items) {
    if (items === undefined) {
      items = [];
    }
    res.status(200);
    res.json(items);
  });
};

exports.upload = function (req, res, next) {
  var files = req.files;
  for (var i = 0; i < files.length; i++) {
    var fileObj = files[i];
    if (fileObj) {
      var file = fileObj.path;
      var s = fs.ReadStream(file);
      s.on("data", function (d) {});
      s.on("end", function () {
        var tnHelper = ServiceLocator.resolve("ThumbnailHelper");
        tnHelper.syncThumbnails(config.uploadPath, config.thumbnailsPath, {}, {
          success: function success(m) {
            //console.log(".");// + m); //thumbnail success: 
          },
          error: function error(m) {
            //console.log(".");//+ m); //thumbnail error:  // todo: log through logger in file
          }
        });
        res.status(201);
        return res.json("saved");
      });
    }
  }
};
exports.uploadAudio = function (req, res, next) {
  var files = req.files;
  for (var i = 0; i < files.length; i++) {
    var fileObj = files[i];
    if (fileObj) {
      var file = fileObj.path;
      var s = fs.ReadStream(file);
      s.on("data", function (d) {});
      s.on("end", function () {
        res.status(201);
        return res.json("saved");
      });
    }
  }
};

exports.uploadSingle = function (req, res, next) {
  var file = req.file;

  if (file) {
    var s = fs.ReadStream(file.path);
    s.on("data", function (d) {});
    s.on("end", function () {
      var tnHelper = ServiceLocator.resolve("ThumbnailHelper");
      tnHelper.syncThumbnails(config.uploadPath, config.thumbnailsPath, {}, {
        success: function success(m) {
          //console.log(".");//+ m); //thumbnail success: 
        },
        error: function error(m) {
          //console.log(".");// + m); //thumbnail error: // todo: log throguh logger in file.
        }
      });
      res.status(201);
      return res.json("saved");
    });
  }
};
exports.uploadAssetImage = function (req, res, next) {
  var file = req.file;

  if (file) {
    var s = fs.ReadStream(file.path);
    s.on("data", function (d) {});
    s.on("end", function () {
      // let tnHelper = ServiceLocator.resolve("ThumbnailHelper");
      // tnHelper.syncThumbnails(
      //   config.uploadPath,
      //   config.thumbnailsPath,
      //   {},
      //   {
      //     success: m => {
      //       console.log("thumbnail success: " + m);
      //     },
      //     error: m => {
      //       console.log("thumbnail error: " + m);
      //     },
      //   },
      // );
      res.status(201);
      return res.json("saved");
    });
  }
};
exports.uploadAssetDocument = function (req, res, next) {
  var file = req.file;

  if (file) {
    var s = fs.ReadStream(file.path);
    s.on("data", function (d) {});
    s.on("end", function () {
      res.status(201);
      return res.json("saved");
    });
  }
};

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}