"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./ApplicationLookups.controller"); /**
                                                              * Created by zqureshi on 10/12/2018.
                                                              */

var isAuthenticated = require("../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");

//var  permitTypes =require('../../config/permissions').default;

router.get("/", [isAuthenticated], controller.show);
router.get("/refreshTime", [isAuthenticated], controller.getRefreshRate);
router.get("/assetTypeTests", [isAuthenticated], controller.getAssetTypeTests);
router.get("/:lists", [isAuthenticated], controller.show);
router.get("/getlist/:listname", [isAuthenticated], controller.getList);
router.get("/:listName/:codes", [isAuthenticated], controller.getCodes);
router.get("/:id", [isAuthenticated], controller.find);
router.put("/globalGeoLogging", [isAuthenticated], controller.updateGeoLogging);
router.post("/language", [isAuthenticated], controller.updateLanguage);
router.put("/languageedit", [isAuthenticated], controller.editLanguage);
router.delete("/languagedelete", [isAuthenticated], controller.deleteLanguage);
router.put("/:id", [isAuthenticated], controller.update);
router.post("/", [isAuthenticated], controller.create);
router.delete("/:id", [isAuthenticated], controller.delete);

module.exports = router;