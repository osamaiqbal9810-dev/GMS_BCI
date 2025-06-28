import * as permitTypes from "../../config/permissions.js";
import isAllowed from "../../middlewares/validatePermission.js";
let controller = require("./Notification.controller");
let isAuthenticated = require("../../auth/auth");
let express = require("express");
let router = express.Router();

// Permission Validation    

router.get("/", [isAuthenticated], controller.loggedInUserNotifications);
router.get("/:id", [isAuthenticated], controller.ackAlerts);
router.get("/find/:id", [isAuthenticated], controller.find);
router.post("/ackAll", [isAuthenticated], controller.ackAll);
router.post("/createCommFailure", [isAuthenticated], controller.createCommFailure);
router.put("/:id", [isAuthenticated], controller.update);
router.delete("/:id", [isAuthenticated], controller.delete);

module.exports = router;
