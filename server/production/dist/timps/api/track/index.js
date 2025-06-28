"use strict";

var _permissions = require("../../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./track.controller");
var isAuthenticated = require("../../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation
var isAllowed = require("../../../middlewares/validatePermission");

//var  permitTypes =require('../../config/permissions').default;

router.get("/", [isAuthenticated, isAllowed(permitTypes.READ_TRACK)], controller.all);
router.get("/:id", [isAuthenticated, isAllowed(permitTypes.READ_TRACK)], controller.find);
router.post("/", [isAuthenticated], isAllowed(permitTypes.CREATE_TRACK), controller.create);
router.post("/:id", [isAuthenticated], isAllowed(permitTypes.CREATE_TRACK), controller.createTemplate);
router.put("/:id", [isAuthenticated, isAllowed(permitTypes.UPDATE_TRACK)], controller.update);
router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_TRACK)], controller.delete);

module.exports = router;