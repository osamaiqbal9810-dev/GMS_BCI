"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");
var Reports = new Schema({
  data: { type: Object, default: null },
  tag: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */
Reports.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});
Reports.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

var ReportsModel = mongoose.model("reports", Reports);
ServiceLocator.register("ReportModel", ReportsModel);
module.exports = ReportsModel;