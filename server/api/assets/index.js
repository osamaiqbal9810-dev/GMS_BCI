import * as permitTypes from "../../config/permissions.js";
let express = require("express");
let router = express.Router();
let controller = require("./assets.controller");
let isAuthenticated = require("../../auth/auth");
// Permission Validation
let isAllowed = require("../../middlewares/validatePermission");

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
router.get("/getGenAts",  controller.genAts);
router.get("/getAts", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getAts);
router.get("/multiLines", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.multiLine);
// router.get("/:line", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.all);
router.get("/floor/:id", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.getFloorAndSensors);
router.get("/:id", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.find);
router.get("/devicesAtLocation/:id", [isAuthenticated, isAllowed(permitTypes.READ_ASSET)], controller.findDevicesPerLocation);
router.post("/", [isAuthenticated], isAllowed(permitTypes.CREATE_ASSET), controller.create);

router.post("/assignDevice", [isAuthenticated], isAllowed(permitTypes.CREATE_ASSET), controller.assignDevice);
// router.post("/:id", [isAuthenticated], isAllowed(permitTypes.CREATE_ASSET), controller.createTemplate);
router.put("/multi", [isAuthenticated, isAllowed(permitTypes.UPDATE_ASSET)], controller.updateMultipleAssets);
router.put("/location/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_ASSET)], controller.updateLocationSetup);

router.put("/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_ASSET)], controller.update);
router.put("/updateSettings/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_ASSET)], controller.updateSettings);
router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_ASSET)], controller.delete);
module.exports = router;
