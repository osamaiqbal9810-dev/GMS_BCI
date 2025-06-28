"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServiceLocator = require("../../../framework/servicelocator");

var JourneyPlan = new Schema((_ref = {
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
  serverObject: Object
}, (0, _defineProperty3.default)(_ref, "safetyBriefing", Object), (0, _defineProperty3.default)(_ref, "createdAt", { type: Date, default: Date.now }), (0, _defineProperty3.default)(_ref, "updatedAt", { type: Date, default: Date.now }), _ref));

JourneyPlan.pre("save", function (next) {
  var now = new Date();
  if (this) {
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
  }
  next();
});

JourneyPlan.pre("update", function (next) {
  this.update = { $set: { updatedAt: Date.now() } };
  next();
});

module.exports = mongoose.model("JourneyPlan", JourneyPlan);
var jpModel = mongoose.model("JourneyPlan", JourneyPlan);
ServiceLocator.register("JourneyPlanModel", jpModel);

module.exports = jpModel;