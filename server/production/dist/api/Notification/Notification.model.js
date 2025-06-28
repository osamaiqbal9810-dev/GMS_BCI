"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../framework/servicelocator");

var NotificationSchema = new Schema({
  destination: String,
  title: { type: String },
  message: { type: String },
  alertId: { type: String },
  userId: String,
  notificationType: {
    type: String,
    enum: ['email', 'sms', 'web', 'mobile'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['new', 'unread', 'read', 'sent', 'failed'],
    default: 'new'
  },
  isRemoved: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

var notificationModel = mongoose.model("Notification", NotificationSchema);
ServiceLocator.register("NotificationModel", notificationModel);
module.exports = notificationModel;