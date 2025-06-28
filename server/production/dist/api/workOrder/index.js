"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./WorkOrder.controller");
var isAuthenticated = require("../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");
router.get("/", [isAuthenticated, isAllowed(permitTypes.READ_WORKORDER)], controller.all);
router.get("/multiLines", [isAuthenticated, isAllowed(permitTypes.READ_WORKORDER)], controller.multiLine);
router.get("/notStarted", [isAuthenticated, isAllowed(permitTypes.READ_WORKORDER)], controller.notStarted);
router.get("/:id", [isAuthenticated, isAllowed(permitTypes.READ_WORKORDER)], controller.show);
router.post("/", [isAuthenticated, isAllowed(permitTypes.CREATE_WORKORDER)], controller.create);
router.post("/mr", [isAuthenticated, isAllowed(permitTypes.CREATE_WORKORDER)], controller.createByMaintenanceRequest);
router.put("/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_WORKORDER)], controller.update);
router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_WORKORDER)], controller.delete);

module.exports = router;