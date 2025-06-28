'use strict';

var User = require('../api/user/user.model');
var _ = require('lodash');

function isAllowed(permission) {
    return function (req, res, next) {
        //next();
        //return ;
        var permissions = req.user.userGroup.permissions || [];
        if (_.find(permissions, { resource: permission.resource, action: permission.action })) {
            //if (_.includes(req.user.permissions, permission)) {
            next();
        } else {
            res.status(403);
            return res.send("You don't have permission");
        }
    };
}
module.exports = isAllowed;