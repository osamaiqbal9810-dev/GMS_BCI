'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ServiceLocator = require('../../framework/servicelocator');

var GroupPermissionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    resource: { type: String, default: 'NA' },
    action: { type: String, lowercase: true, required: true, default: 'read' }, // c . u . r . d
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */

GroupPermissionSchema.pre('save', function (next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

GroupPermissionSchema.pre('update', function (next) {
    this.update = { '$set': { updatedAt: Date.now() } };
    next();
});

var model = mongoose.model('GroupPermission', GroupPermissionSchema);
ServiceLocator.register('PermissionModel', model);
module.exports = model;