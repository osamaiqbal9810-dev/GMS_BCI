"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./GpsLog.controller");
var isAuthenticated = require("../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");
router.get("/:line", [isAuthenticated, isAllowed(permitTypes.READ_MAINTENANCE)], controller.all);
router.get("/line/:id", [isAuthenticated, isAllowed(permitTypes.READ_MAINTENANCE)], controller.show);
//router.get('/pull/:z/', [isAuthenticated], controller.pull);
//router.get('/pull/:z/:timestamp/', [isAuthenticated], controller.pull);
//router.get('/:listName/:timestamp', [isAuthenticated], controller.show);
//router.put('/:id', [isAuthenticated], controller.update);

module.exports = router;