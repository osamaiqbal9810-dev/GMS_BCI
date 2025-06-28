import * as permitTypes from "../../config/permissions.js";
import isAllowed from "../../middlewares/validatePermission.js";
let controller = require("./Events.controller");
let isAuthenticated = require("../../auth/auth");
let express = require("express");
let router = express.Router();

// Permission Validation

router.get("/", [isAuthenticated], controller.loggedInUserNotifications);
router.put("/:id", [isAuthenticated], controller.update);
router.delete("/:id", [isAuthenticated], controller.delete);

module.exports = router;
