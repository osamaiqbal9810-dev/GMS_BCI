"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

var _validatePermission = require("../../middlewares/validatePermission");

var _validatePermission2 = _interopRequireDefault(_validatePermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./Notification.controller");
var isAuthenticated = require("../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation

router.get("/", [isAuthenticated], controller.loggedInUserNotifications);
router.put("/:id", [isAuthenticated], controller.update);
router.delete("/:id", [isAuthenticated], controller.delete);

module.exports = router;