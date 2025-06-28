"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require("express");
var router = express.Router();
var controller = require("./voiceAssistant.controller");
var isAuthenticated = require("../../auth/auth");
// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");

router.get("/getsummary/", [isAuthenticated], controller.getSummary);
router.get("/getsensorstatus/:deviceType/:num", [isAuthenticated], controller.getSensorStatus);
router.get("/getsensortemp/:deviceType/:num", [isAuthenticated], controller.getSensorTemperaure);
router.get("/getsensorhumidity/:deviceType/:num", [isAuthenticated], controller.getSensorHumidity);
router.get("/getsensorbattery/:deviceType/:num", [isAuthenticated], controller.getSensorBattery);

module.exports = router;