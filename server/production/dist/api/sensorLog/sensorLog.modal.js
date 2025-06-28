"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");
var SensorLog = new Schema({
  date: Date,
  sensorId: String,
  assetId: String,
  gateWayMac: String,
  location: String,
  data: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */
SensorLog.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});

SensorLog.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

var SensorLogModel = mongoose.model("sensorlog", SensorLog);
ServiceLocator.register("SensorLogModel", SensorLogModel);
module.exports = SensorLogModel;