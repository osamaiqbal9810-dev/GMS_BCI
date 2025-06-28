"use strict";
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ServiceLocator = require("../../framework/servicelocator");
let TilesModel = new Schema({
 assetId:String,
 status:String,
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
});

TilesModel.pre("save", function (next) {
    let now = new Date();
    if (this) {
      this.updatedAt = now;
      if (!this.createdAt) {
        this.createdAt = now;
      }
    }
    next();
  });
TilesModel.pre("update", function (next) {
    this.update = { $set: { updatedAt: Date.now() } };
    next();
  });

let tilesModel = mongoose.model("Tiles", TilesModel);
ServiceLocator.register("TilesModel", tilesModel);
module.exports = tilesModel;
