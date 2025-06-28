"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require("express");
var router = express.Router();
var controller = require("./assets.controller");
var isAuthenticated = require("../../auth/auth");
// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");

//var  permitTypes =require('../../config/permissions').default;
router.get("/location/:id", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getLocationSetup);
router.get("/getAssetTypesAsset/:assetObj", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getAssetTypeAssets);
router.get("/getLines", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getParentLines);
router.post("/getLinesWithSelf", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getParentLinesWithSelf);
router.get("/getAssetsForLine", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getAssetsForLine);
router.get("/getInspectableAssets", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getInspectableAssets);
router.get("/getUnAssignedAssets", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getUnAssignedAssets);
router.get("/getAssetTree", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getAssetTree);
router.get("/", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.all);
router.get("/getGenAts", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.genAts);
router.get("/getAts", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getAts);
router.get("/multiLines", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.multiLine);
// router.get("/:line", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.all);
router.get("/floor/:id", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getFloorAndSensors);
router.get("/:id", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.find);
router.post("/", [isAuthenticated], isAllowed(permitTypes.CREATE_ASSET), controller.create);
router.post("/assignDevice", [isAuthenticated], isAllowed(permitTypes.CREATE_ASSET), controller.assignDevice);
// router.post("/:id", [isAuthenticated], isAllowed(permitTypes.CREATE_ASSET), controller.createTemplate);
router.put("/multi", [isAuthenticated, isAllowed(permitTypes.UPDATE_ASSET)], controller.updateMultipleAssets);
router.put("/location/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_ASSET)], controller.updateLocationSetup);

router.put("/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_ASSET)], controller.update);
router.put("/updateSettings/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_ASSET)], controller.updateSettings);
router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_ASSET)], controller.delete);
module.exports = router;