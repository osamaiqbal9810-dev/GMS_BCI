"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../framework/servicelocator");
let SensorReport = new Schema({
  date: Date,
  assetId: String,
  timeFrame:String,
  data: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Virtuals
 */
SensorReport.pre("save", function (next) {
  let now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});

SensorReport.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

let SensorReportModel = mongoose.model("sensorreport", SensorReport);
ServiceLocator.register("SensorReportModel", SensorReportModel);
module.exports = SensorReportModel;
