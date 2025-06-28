"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");
var AssetsTree = new Schema({
  assetsTreeObj: { type: Object, default: null },
  tag: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */
AssetsTree.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});
AssetsTree.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

var AssetsTreeModel = mongoose.model("assetsTree", AssetsTree);
ServiceLocator.register("AssetsTreeModel", AssetsTreeModel);
module.exports = AssetsTreeModel;