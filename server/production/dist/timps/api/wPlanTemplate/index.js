"use strict";

var _permissions = require("../../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./wPlanTemplate.controller");
var isAuthenticated = require("../../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation
var isAllowed = require("../../../middlewares/validatePermission");

//var  permitTypes =require('../../config/permissions').default;

router.get("/", [isAuthenticated, isAllowed(permitTypes.READ_WORKPLAN)], controller.all);
router.get("/userstemplate/:users", [isAuthenticated, isAllowed(permitTypes.READ_WORKPLAN)], controller.usersTemplate);
router.get("/:id", [isAuthenticated, isAllowed(permitTypes.READ_WORKPLAN)], controller.find);
router.post("/", [isAuthenticated, isAllowed(permitTypes.CREATE_WORKPLAN)], controller.create);
router.put("/", [isAuthenticated, isAllowed(permitTypes.WORKPLAN_SORTING)], controller.updateTemplatesPlanPrioritySorting);
router.put("/updatefutureInspection", [isAuthenticated, isAllowed(permitTypes.UPDATE_WORKPLAN)], controller.updateTemplatesTempChanges);
router.put("/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_WORKPLAN)], controller.update);
router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_WORKPLAN)], controller.delete);

module.exports = router;