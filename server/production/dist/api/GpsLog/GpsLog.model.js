"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");

var GpsLogSchema = new Schema({
  tenantId: String,
  id: { type: String, required: true }, //
  description: String, // set from issue or text entered by user
  employee: String,
  hourId: { type: Number },
  tzOffset: { type: Number },
  data: Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

GpsLogSchema.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});
GpsLogSchema.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});
var model = mongoose.model("GpsLog", GpsLogSchema);
ServiceLocator.register("GpsLogModel", model);

module.exports = model;