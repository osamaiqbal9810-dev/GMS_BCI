"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require("express");
var router = express.Router();
var controller = require("./sensorReport.controller");
var isAuthenticated = require("../../auth/auth");
// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");

router.post("/", /*[isAuthenticated],*/controller.getSensorReport);

module.exports = router;