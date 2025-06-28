"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../framework/servicelocator");

let NotificationSchema = new Schema({
  targetAsset:String,
  ackFlag: {
    type: Boolean,
    default:false
  },
  type:String,
  status:{ type: String, default: 'unsent'   },
  code:Number,
  pushNotification:{
    SMS:Boolean,
    Email:Boolean,
    Audiable:Boolean,
    visual:Boolean
  },
  messageInfo: Object,
  ackAt: { type: Date, default: null },
  isRemoved: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let notificationModel = mongoose.model("Notification", NotificationSchema);
ServiceLocator.register("NotificationModel", notificationModel);
module.exports = notificationModel;
