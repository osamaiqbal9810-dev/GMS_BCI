"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require('../../framework/servicelocator');

var ApplicationResourcesSchema = new Schema({
    tenantId: String,
    listName: String,
    code: String,
    description: String,
    opt1: {},
    opt2: {},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

ApplicationResourcesSchema.pre("save", function (next) {
    var now = new Date();
    if (this) {
        this.updatedAt = now;
        if (!this.createdAt) {
            this.createdAt = now;
        }
    }
    next();
});
ApplicationResourcesSchema.pre("update", function (next) {
    this.update = { $set: { updatedAt: Date.now() } };
    next();
});

var model = mongoose.model('ApplicationResources', ApplicationResourcesSchema);
ServiceLocator.register('ApplicationResourcesModel', model);
module.exports = model;