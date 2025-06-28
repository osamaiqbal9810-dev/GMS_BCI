"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../framework/servicelocator");

let ApplicationLookupsSchema = new Schema({
  tenantId: String,
  listName: String,
  code: String,
  description: String,
  name:String,
  type:String,
  threshold:String,
  max:Number,
  eventType:Number,
  opt1: {},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ApplicationLookupsSchema.pre("save", function (next) {
  let now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});
ApplicationLookupsSchema.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

let model = mongoose.model("ApplicationLookups", ApplicationLookupsSchema);
ServiceLocator.register("ApplicationLookupsModel", model);
module.exports = model;
