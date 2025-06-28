"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require('../../framework/servicelocator');

var ListSchema = new Schema({
    listName: String,
    settings: String,
    description: String,
    owner: String,
    tenantId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

ListSchema.pre("save", function (next) {
    var now = new Date();
    if (this) {
        this.updatedAt = now;
        if (!this.createdAt) {
            this.createdAt = now;
        }
    }
    next();
});
ListSchema.pre("update", function (next) {
    this.update = { $set: { updatedAt: Date.now() } };
    next();
});

module.exports = mongoose.model("List", ListSchema);