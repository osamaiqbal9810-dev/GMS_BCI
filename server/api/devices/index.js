import * as permitTypes from "../../config/permissions.js";
let express = require("express");
let router = express.Router();
let controller = require("./devices.controller");
let isAuthenticated = require("../../auth/auth");
// Permission Validation
let isAllowed = require("../../middlewares/validatePermission");

//var  permitTypes =require('../../config/permissions').default;
router.post("/", [isAuthenticated], controller.create);
router.get("/", [isAuthenticated],controller.all);
router.get("/:id", [isAuthenticated],controller.find);
router.put("/:id", [isAuthenticated], controller.update);
router.delete("/:id", [isAuthenticated], controller.delete);
module.exports = router;
