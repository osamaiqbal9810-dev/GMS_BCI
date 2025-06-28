/**
 * Created by zqureshi on 8/30/2018.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
    userId: { type: String, required: true },
    checkInTime: { type: String },
    checkInStatus: { type: String },
    checkInLocation: [{ type: String }],
    checkInIP: { type: String },
    checkOutTime: { type: String },
    checkOutStatus: { type: String },
    checkOutLocation: [{ type: String }],
    checkOutIP: { type: String },
    checkOutReason: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */
AttendanceSchema.pre('save', function (next) {
    var now = new Date();
    if (undefined) {
        undefined.updatedAt = now;
        if (!undefined.createdAt) {
            undefined.createdAt = now;
        }
    }
    next();
});
AttendanceSchema.pre('update', function (next) {
    this.update = { '$set': { updatedAt: Date.now() } };
    next();
});

module.exports = mongoose.model('Attendance', AttendanceSchema);