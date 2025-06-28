"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");

var AlertSchema = new Schema({
  cronJobId: {
    type: String,
    unique: true
  },
  destinations: Array,
  event: {
    type: String,
    enum: ['before', 'after', 'exact'],
    default: 'exact'
  },
  eventExactDate: Date,
  timeDifference: String,
  alertTime: String,
  unitOfTime: String,
  reference: {
    modelId: String,
    model: String,
    field: String,
    fieldDisplayText: String
  },
  type: {
    type: Array
  },
  title: { type: String },
  message: { type: String },
  status: {
    type: String,
    enum: ['new', 'unread', 'read'],
    default: 'new'
  },
  retry: { type: Boolean },
  timezone: String,
  retryCount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

var alert = mongoose.model("Alert", AlertSchema);
ServiceLocator.register("AlertModel", alert);
module.exports = alert;