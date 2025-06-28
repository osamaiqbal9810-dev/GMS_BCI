"use strict";

var _permissions = require("../../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

var _validatePermission = require("../../../middlewares/validatePermission");

var _validatePermission2 = _interopRequireDefault(_validatePermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require("./workPlanTemplateTask.controller");
var isAuthenticated = require("../../../auth/auth");
var express = require("express");
var router = express.Router();

//var  permitTypes =require('../../config/permissions').default;
router.post("/", [isAuthenticated, (0, _validatePermission2.default)(permitTypes.CREATE_INSPECTION_TASK)], controller.create);
router.put("/:id", [isAuthenticated, (0, _validatePermission2.default)(permitTypes.UPDATE_INSPECTION_TASK)], controller.update);
router.delete("/:id", [isAuthenticated, (0, _validatePermission2.default)(permitTypes.DELETE_INSPECTION_TASK)], controller.delete);

module.exports = router;