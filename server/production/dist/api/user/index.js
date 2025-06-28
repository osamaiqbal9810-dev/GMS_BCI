"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./user.controller");
var isAuthenticated = require("../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation
var isAllowed = require("../../middlewares/validatePermission");

//var  permitTypes =require('../../config/permissions').default;

router.get("/", [isAuthenticated, isAllowed(permitTypes.VIEW_USER)], controller.index);
router.get("/me", [isAuthenticated], controller.me);
router.get("/userinfo", [isAuthenticated], controller.getUserInfo);
router.get("/reset/:token", controller.verifyPassReset);
router.get("/:id", [isAuthenticated, isAllowed(permitTypes.READ_USER)], controller.show);
router.put("/teamupdate/:id", [isAuthenticated], controller.updateTeam);
router.put("/teamremovemembers/:id", [isAuthenticated], controller.removeTeamMembers);
router.put("/:id/password", controller.changePassword);
router.put("/:id/", [isAuthenticated, isAllowed(permitTypes.UPDATE_USER)], controller.update);
router.put("/logout/:id", controller.logoutUser);
router.post("/", [isAuthenticated, isAllowed(permitTypes.CREATE_USER)], controller.create);
router.post("/forgot", controller.forgotPassword);
router.delete("/:id", [isAuthenticated, isAllowed(permitTypes.DELETE_USER)], controller.destroy);

module.exports = router;