"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require("express");

var controller = require("./userGroup.controller");
var isAuthenticated = require("../../auth/auth");

var router = express.Router();

// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");

router.get("/", isAuthenticated, controller.index);
router.put("/:id", [isAuthenticated, isAllowed(permitTypes.USER_GROUP_UPDATE)], controller.update);

module.exports = router;