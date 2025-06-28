'use strict';

var _permissions = require('../../config/permissions');

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var controller = require('./list.controller'); /**
                                                * Created by zqureshi on 10/12/2018.
                                                */

var isAuthenticated = require('../../auth/auth');
var express = require('express');
var router = express.Router();

// Permission Validation
var isAllowed = require('../../middlewares/validatePermission');

//var  permitTypes =require('../../config/permissions').default;

router.get('/pull/:z/', [isAuthenticated], controller.pull);
router.get('/pull/:z/:timestamp/', [isAuthenticated], controller.pull);
router.get('/summary/', controller.summary); //todo add [isAuthenticated]
router.get('/:listName/:z/:timestamp/', [isAuthenticated], controller.show);
router.get('/:listName/:z/', [isAuthenticated], controller.show);

//router.get('/:listName/:timestamp', [isAuthenticated], controller.show);
//router.put('/:id', [isAuthenticated], controller.update);

module.exports = router;