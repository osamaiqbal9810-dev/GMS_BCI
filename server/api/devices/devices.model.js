"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../framework/servicelocator");
let device = new Schema({
  type: String,
  name: String,
  modelInfo: Object,
  registers: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Virtuals
 */
 device.pre("save", function (next) {
  let now = new Date();
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

let DeviceModel = mongoose.model("supportedDevices", device);
ServiceLocator.register("DeviceModel", DeviceModel);
module.exports = DeviceModel;
