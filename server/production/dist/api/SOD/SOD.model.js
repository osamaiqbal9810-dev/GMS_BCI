"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require('../../framework/servicelocator');

var SODSchema = new Schema({
    employee: String,
    location: String,
    endLocation: String,
    day: Date,
    start: Date,
    end: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

SODSchema.pre("save", function (next) {
    var now = new Date();
    if (this) {
        this.updatedAt = now;
        if (!this.createdAt) {
            this.createdAt = now;
        }
    }
    next();
});
SODSchema.pre("update", function (next) {
    this.update = { $set: { updatedAt: Date.now() } };
    next();
});

var model = mongoose.model("SOD", SODSchema);
ServiceLocator.register('SODModel', model);
module.exports = model;