"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");
var SupportedParamsModel = new Schema({
  type: String,
  name: String,
  min: Number,
  max: Number,
  majorTicks: Array,
  label: String,
  unit: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */
SupportedParamsModel.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});
SupportedParamsModel.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

var supportedParamsModel = mongoose.model("SupportedParams", SupportedParamsModel);
ServiceLocator.register("SupportedParamsModel", supportedParamsModel);
module.exports = supportedParamsModel;