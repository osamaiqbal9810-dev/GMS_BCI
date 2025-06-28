"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");

var WorkOrderSchema = new Schema({
  tenantId: String,
  locationId: String, // alternate to lineId in previous design
  locationName: String, // to shortlist only for a specific line
  description: String, // set from frontend entered by user
  maintenanceRequests: Array, // store reference to multiple maintenance requests
  estimate: Array, // Store estimates of selected maintenance
  priority: String,

  createdBy: { id: String, name: String, email: String }, // createdby: user
  assignedTo: { id: String, name: String, email: String }, // assigned to user
  attributes: Object, // store additional attributes

  status: String, // status: New/Scheduled/Completed etc.
  mwoNumber: String,

  dueDate: Date, // planned date
  executionDate: Date,
  closedDate: Date,
  subdivision: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

WorkOrderSchema.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});
WorkOrderSchema.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

var mmodel = mongoose.model("WorkOrder", WorkOrderSchema);
ServiceLocator.register("WorkOrderModel", mmodel);
module.exports = mmodel;