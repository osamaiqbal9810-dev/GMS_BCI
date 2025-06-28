// "use strict";
// let mongoose = require("mongoose");
// let Schema = mongoose.Schema;
// let ServiceLocator = require("../../framework/servicelocator");
// let SensorLog = new Schema({
//   date: Date,
//   sensorId: String,
//   assetId: String,
//   gateWayMac: String,
//   location: String,
//   data: Object,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// /**
//  * Virtuals
//  */
// SensorLog.pre("save", function (next) {
//   let now = new Date();
//   if (this) {
//     this.updatedAt = now;
//     if (!this.createdAt) {
//       this.createdAt = now;
//     }
//   }
//   next();
// });

// SensorLog.pre("update", function (next) {
//   this.update = { $set: { updatedAt: Date.now() } };
//   next();
// });

// let SensorLogModel = mongoose.model("sensorlog", SensorLog);
// ServiceLocator.register("SensorLogModel", SensorLogModel);
// module.exports = SensorLogModel;
