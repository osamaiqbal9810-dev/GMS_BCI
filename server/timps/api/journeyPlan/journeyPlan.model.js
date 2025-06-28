"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../../framework/servicelocator");

let JourneyPlan = new Schema({
  supervisor: String,
  user: { id: String, name: String, email: String },
  date: Date,
  title: String,
  subdivision: String,
  roadMaster: { id: String, name: String, email: String },
  lineId: String,
  lineName: String,
  //   tasks:[{taskId: String,
  //     taskDate: String,
  //     startLocation:[String],
  //     endLocation:[String],
  //     startTime: String,
  //     endTime: String,
  //     status: String,
  //     title: String,
  //     desc: String,
  //     notes: String,
  //     imgs: [String],
  //     units: [{id: String, unitId:String, track_id: String}],
  //     reports:[{
  //         reportId: String,
  //     category: String,
  // trackId: String,
  // description: String,
  // location:[String],
  // marked: Boolean,
  // priority: String,
  // timeStamp: String,
  // imgList:[String]}]
  // }],
  safetyBriefing: Object,
  workplanTemplateId: String,
  tasks: Array,
  startDateTime: String,
  startLocation: String,
  endDateTime: String,
  endLocation: String,
  status: String,
  serverObject: Object,
  safetyBriefing: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

JourneyPlan.pre("save", function(next) {
  let now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});

JourneyPlan.pre("update", function(next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

module.exports = mongoose.model("JourneyPlan", JourneyPlan);
let jpModel = mongoose.model("JourneyPlan", JourneyPlan);
ServiceLocator.register("JourneyPlanModel", jpModel);

module.exports = jpModel;
