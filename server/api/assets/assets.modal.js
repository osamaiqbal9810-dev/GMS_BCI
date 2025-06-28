"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../framework/servicelocator");
let Assets = new Schema({
  subdivision: String,
  start: {
    type: Number,
    set: function (n) {
      return n.toFixed(2);
    },
  },
  end: {
    type: Number,
    set: function (n) {
      return n.toFixed(2);
    },
  },
  name: String,
  assetLength: {
    type: Number,
    set: function (n) {
      return n.toFixed(2);
    },
  },
  coordinates: Array,
  fuelLevelArray:Array,
  fuelLevelFlag:{ type: Boolean, default: false },
  //fuelNotifFlag: { type: Object, default: { notifFlag30: false, notifFlag20: false, notifFlag10: false } },
  notifFlag30:{ type: Boolean, default: false },
  notifFlag20:{ type: Boolean, default: false },
  notifFlag10:{ type: Boolean, default: false },
  unitId: String,
  description: String,
  assetType: String,
  railRoad: String,
  inspectable: { type: Boolean, default: false },
  frequency: Number,
  attributes: Object,
  settings: Object,
  suppDevice: Object,
  commStatus: { type: Boolean, default: false },
  errorTimerStarted: { type: Boolean, default: false },
  commFailureCount: { type: Number, default: 0 },
  state: Object,
  systemAttributes: Object,
  parentAsset: { type: String, default: null },
  images: Array,
  documents: Array,
  childAsset: Array,
  lineId: String,
  trackId: String,
  timeZone: String,
  levels: { type: Object, default: { 1: null, 2: null, 3: null, currentLevel: null } },
  isRemoved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Virtuals
 */
Assets.pre("save", function (next) {
  let now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});
Assets.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

let AssetsModel = mongoose.model("assets", Assets);
ServiceLocator.register("AssetsModel", AssetsModel);
module.exports = AssetsModel;
