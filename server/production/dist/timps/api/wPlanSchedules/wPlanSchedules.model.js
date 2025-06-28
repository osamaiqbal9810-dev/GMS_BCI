"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../../framework/servicelocator");

var wPlanSchedules = new Schema({
  user: { _id: String, name: String, email: String },
  startDate: Date,
  lineId: String,
  title: String,
  inspectionSchedules: Array,
  templateId: String,
  toRecalculate: { type: Boolean, default: false },
  dateRange: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

wPlanSchedules.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});

wPlanSchedules.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

module.exports = mongoose.model("WPlanSchedules", wPlanSchedules);
var wpSchedulesModel = mongoose.model("WPlanSchedules", wPlanSchedules);
ServiceLocator.register("WPlanSchedulesModel", wpSchedulesModel);

module.exports = wpSchedulesModel;