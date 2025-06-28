"use strict";

var _permissions = require("../../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./journeyPlan.controller");
var isAuthenticated = require("../../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation
var isAllowed = require("../../../middlewares/validatePermission");

router.get("/multiLines", [isAuthenticated, isAllowed(permitTypes.READ_WORKPLAN)], controller.multiLine);
router.get("/issue", [isAuthenticated, isAllowed(permitTypes.VIEW_ISSUE)], controller.getIssues);
router.get("/:id", [isAuthenticated, isAllowed(permitTypes.READ_WORKPLAN)], controller.find);
router.get("/", [isAuthenticated, isAllowed(permitTypes.READ_WORKPLAN)], controller.all);
router.get("/report/:id", [isAuthenticated, isAllowed(permitTypes.READ_WORKPLAN)], controller.report);
router.post("/issue", [isAuthenticated, isAllowed(permitTypes.UPDATE_ISSUE)], controller.updateIssue);
router.put("/issue/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_ISSUE)], controller.updateIssue);
router.post("/issueWorkorder", [isAuthenticated, isAllowed(permitTypes.UPDATE_ISSUE)], controller.issueWorkorder);
router.post("/", [isAuthenticated, isAllowed(permitTypes.CREATE_WORKPLAN)], controller.create);
router.put("/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_WORKPLAN)], controller.update);
router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_WORKPLAN)], controller.delete);

module.exports = router;