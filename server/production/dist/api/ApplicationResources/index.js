"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./ApplicationResources.controller"); /**
                                                                * Created by zqureshi on 10/12/2018.
                                                                */

var isAuthenticated = require("../../auth/auth");
var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var config = require("../../config/environment");

// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");
//var  permitTypes =require('../../config/permissions').default;

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, config.uploadPath);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var audioStorage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, config.audioPath);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
// asset image and asset document
var assetImgStorage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, config.assetImages);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var uploadAssetImg = multer({ storage: assetImgStorage });

var assetDocStorage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, config.assetDocuments);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var uploadAssetDoc = multer({ storage: assetDocStorage });

var uploadAudio = multer({ storage: audioStorage });
router.get("/", [isAuthenticated], controller.show);
router.get("/showAssetImgs", [isAuthenticated], controller.showAssetImgs);
router.get("/showAssetDocuments", [isAuthenticated], controller.showAssetDocuments);
router.post("/uploadsingle", upload.single("file"), controller.uploadSingle);
router.post("/upload", upload.any(), controller.upload);
router.post("/uploadaudio", uploadAudio.any(), controller.uploadAudio);
// Asset images and document uploads
router.post("/uploadassetimage", uploadAssetImg.single("file"), controller.uploadAssetImage);
router.post("/uploadassetdocument", uploadAssetDoc.single("file"), controller.uploadAssetDocument);

module.exports = router;