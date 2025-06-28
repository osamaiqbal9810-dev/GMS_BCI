"use strict";

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

var _validatePermission = require("../../middlewares/validatePermission");

var _validatePermission2 = _interopRequireDefault(_validatePermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./Maintenance.controller");
var isAuthenticated = require("../../auth/auth");
var express = require("express");
var router = express.Router();

// Permission Validation

router.get("/", [isAuthenticated, (0, _validatePermission2.default)(permitTypes.READ_MAINTENANCE)], controller.all);
router.get("/multiLines", [isAuthenticated, (0, _validatePermission2.default)(permitTypes.READ_MAINTENANCE)], controller.multiLine);
router.get("/:id", [isAuthenticated, (0, _validatePermission2.default)(permitTypes.READ_MAINTENANCE)], controller.show);
router.post("/", [isAuthenticated, (0, _validatePermission2.default)(permitTypes.CREATE_MAINTENANCE)], controller.createWeb);
//router.post("/issue",[isAuthenticated, isAllowed(permitTypes.CREATE_MAINTENANCE)], controller.createByIssue);
//router.get('/pull/:z/', [isAuthenticated], controller.pull);
//router.get('/pull/:z/:timestamp/', [isAuthenticated], controller.pull);
//router.get('/:listName/:timestamp', [isAuthenticated], controller.show);
router.put("/:id", [isAuthenticated, (0, _validatePermission2.default)(permitTypes.UPDATE_MAINTENANCE)], controller.updateWeb);

module.exports = router;