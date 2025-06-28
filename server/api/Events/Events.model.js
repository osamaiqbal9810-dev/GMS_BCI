"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../framework/servicelocator");

let EventsSchema = new Schema({
  name: String,
  type: String,
  code: Number,
  priority:Number,
  pushNotification:{
    SMS:Boolean,
    Email:Boolean,
    Audiable:Boolean,
    visual:Boolean
  },
  messageInfo:Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let eventsModel = mongoose.model("Events", EventsSchema);
ServiceLocator.register("EventsModel", eventsModel);
module.exports = eventsModel;
