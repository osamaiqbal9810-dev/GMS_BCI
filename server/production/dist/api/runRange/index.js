"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require("express");
var router = express.Router();
var controller = require("./runRange.controller");
var isAuthenticated = require("../../auth/auth");
// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");

// router.get("/", [isAuthenticated], controller.all);
// router.get("/:id", [isAuthenticated], controller.read);
router.post("/", [isAuthenticated, isAllowed(permitTypes.CREATE_RUN_RANGE)], controller.create);
// router.post("/:id", [isAuthenticated], isAllowed(permitTypes.CREATE_TRACK), controller.createTemplate);
router.put("/:id", [isAuthenticated, isAllowed(permitTypes.CREATE_RUN_RANGE)], controller.update);
// router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_TRACK)], controller.delete);

module.exports = router;