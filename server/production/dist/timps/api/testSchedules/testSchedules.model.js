"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../../framework/servicelocator");

var testSchedules = new Schema({
  user: { _id: String, name: String, email: String },
  date: Date,
  lineId: String,
  //testId: String,
  assetId: String,
  assetType: String,
  assetMP: String,
  lineName: String,
  assetName: String,
  testCode: String,
  testDescription: String,
  formData: { type: Object, default: null },
  inspectionId: String,
  dueDate: Date,
  expiryDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

testSchedules.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});

testSchedules.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

module.exports = mongoose.model("TestSchedules", testSchedules);
var testSchedulesModel = mongoose.model("TestSchedules", testSchedules);
ServiceLocator.register("TestSchedulesModel", testSchedulesModel);

module.exports = testSchedulesModel;