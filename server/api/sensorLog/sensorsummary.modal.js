"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../framework/servicelocator");
let SensorSummary = new Schema({
  timeFrame: String,
  date: Date,
  summaryName: String,
  assetId: String,
  data: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Virtuals
 */
SensorSummary.pre("save", function (next) {
  let now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});

SensorSummary.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

let SensorSummaryModel = mongoose.model("sensorsummary", SensorSummary);
ServiceLocator.register("SensorSummaryModel", SensorSummaryModel);
module.exports = SensorSummaryModel;
