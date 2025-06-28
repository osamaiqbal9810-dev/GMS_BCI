'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TenantSchema = new Schema({
    tenantId: { type: String, lowercase: true, unique: true, required: true },
    name: String,
    active: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
    config: { maxSessionTime: { type: Number } }, // maxSessionTime is in minutes
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

/**
 * Virtuals
 */

// Public profile information
TenantSchema.pre('save', function (next) {
    var now = new Date();
    if (this) {
        this.updatedAt = now;
        if (!this.createdAt) {
            this.createdAt = now;
        }
    }
    next();
});
TenantSchema.pre('update', function (next) {
    this.update = { '$set': { updatedAt: Date.now() } };
    next();
});

module.exports = mongoose.model('Tenant', TenantSchema);