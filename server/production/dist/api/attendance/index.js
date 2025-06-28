'use strict';

/**
 * Created by zqureshi on 8/30/2018.
 */
var controller = require('./attendance.controller');
var isAuthenticated = require('../../auth/auth');
var express = require('express');
var router = express.Router();

router.post('/', controller.create);
router.get('/:id', controller.read);
router.get('/custom/:id', controller.customQuery);
router.put('/:id', controller.update);

module.exports = router;