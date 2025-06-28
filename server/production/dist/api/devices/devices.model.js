"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");
var device = new Schema({
  type: String,
  name: String,
  modelInfo: Object,
  registers: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */
device.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});
device.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

var DeviceModel = mongoose.model("supportedDevices", device);
ServiceLocator.register("DeviceModel", DeviceModel);
module.exports = DeviceModel;