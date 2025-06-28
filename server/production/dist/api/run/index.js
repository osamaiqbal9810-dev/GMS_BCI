"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require("express");
var router = express.Router();
var controller = require("./run.controller");
var isAuthenticated = require("../../auth/auth");
// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");

router.get("/", [isAuthenticated, isAllowed(permitTypes.VIEW_RUN)], controller.all);
router.get("/runLines", [isAuthenticated, isAllowed(permitTypes.VIEW_RUN)], controller.lineRuns);
router.get("/:id", [isAuthenticated, isAllowed(permitTypes.VIEW_RUN)], controller.read);
router.post("/", [isAuthenticated, isAllowed(permitTypes.CREATE_RUN)], controller.create);
router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_RUN)], controller.delete);

// router.post("/:id", [isAuthenticated], isAllowed(permitTypes.CREATE_TRACK), controller.createTemplate);
// router.put("/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_TRACK)], controller.update);

module.exports = router;