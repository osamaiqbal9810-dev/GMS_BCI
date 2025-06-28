"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by zqureshi on 5/25/2018.
 */
// User's permissions
var READ_USER = exports.READ_USER = { resource: "USER", action: "read" };
var CREATE_USER = exports.CREATE_USER = { resource: "USER", action: "create" };
var UPDATE_USER = exports.UPDATE_USER = { resource: "USER", action: "update" };
var DELETE_USER = exports.DELETE_USER = { resource: "USER", action: "delete" };
var VIEW_USER = exports.VIEW_USER = { resource: "USER", action: "view" };
var USER_GROUP_UPDATE = exports.USER_GROUP_UPDATE = { resource: "USER", action: "group_update" };

// Sidebar Permissions
var VIEW_SETUP = exports.VIEW_SETUP = { resource: "SETUP", action: "view" };

// Track Permission
var READ_TRACK = exports.READ_TRACK = { resource: "TRACK", action: "read" };
var CREATE_TRACK = exports.CREATE_TRACK = { resource: "TRACK", action: "create" };
var UPDATE_TRACK = exports.UPDATE_TRACK = { resource: "TRACK", action: "update" };
var DELETE_TRACK = exports.DELETE_TRACK = { resource: "TRACK", action: "delete" };
var VIEW_TRACK = exports.VIEW_TRACK = { resource: "TRACK", action: "view" };

// Work Plan Permission
var READ_WORKPLAN = exports.READ_WORKPLAN = { resource: "WORKPLAN", action: "read" };
var CREATE_WORKPLAN = exports.CREATE_WORKPLAN = { resource: "WORKPLAN", action: "create" };
var UPDATE_WORKPLAN = exports.UPDATE_WORKPLAN = { resource: "WORKPLAN", action: "update" };
var DELETE_WORKPLAN = exports.DELETE_WORKPLAN = { resource: "WORKPLAN", action: "delete" };
var VIEW_WORKPLAN = exports.VIEW_WORKPLAN = { resource: "WORKPLAN", action: "view" };
var WORKPLAN_SORTING = exports.WORKPLAN_SORTING = { resource: "WORKPLAN", action: "plan_sort" };
var CREATE_INSPECTION_TASK = exports.CREATE_INSPECTION_TASK = { resource: "INSPECTION TASK", action: "create" };
var UPDATE_INSPECTION_TASK = exports.UPDATE_INSPECTION_TASK = { resource: "INSPECTION TASK", action: "update" };
var DELETE_INSPECTION_TASK = exports.DELETE_INSPECTION_TASK = { resource: "INSPECTION TASK", action: "delete" };
var VIEW_INSPECTION_TEMP_WORKER = exports.VIEW_INSPECTION_TEMP_WORKER = { resource: "INSPECTION TEMP WORKER", action: "view" };

// Maintenance Permissions
var READ_MAINTENANCE = exports.READ_MAINTENANCE = { resource: "MAINTENANCE", action: "read" };
var CREATE_MAINTENANCE = exports.CREATE_MAINTENANCE = { resource: "MAINTENANCE", action: "create" };
var UPDATE_MAINTENANCE = exports.UPDATE_MAINTENANCE = { resource: "MAINTENANCE", action: "update" };
var DELETE_MAINTENANCE = exports.DELETE_MAINTENANCE = { resource: "MAINTENANCE", action: "delete" };
var VIEW_MAINTENANCE = exports.VIEW_MAINTENANCE = { resource: "MAINTENANCE", action: "view" };
var VIEW_MAINTENANCE_DETAIL = exports.VIEW_MAINTENANCE_DETAIL = { resource: "MAINTENANCE DETAIL", action: "view" };
var VIEW_MAINTENANCE_WORKORDER = exports.VIEW_MAINTENANCE_WORKORDER = { resource: "MAINTENANCE WORK ORDER", action: "view" };
var CREATE_MAINTENANCE_ADD_ESTIMATE = exports.CREATE_MAINTENANCE_ADD_ESTIMATE = { resource: "MAINTENANCE ADD ESTIMATE", action: "create" };
var VIEW_MAINTENANCE_CHANGE_LOG = exports.VIEW_MAINTENANCE_CHANGE_LOG = { resource: "MAINTENANCE CHANGE LOG ", action: "view" };
var UPDATE_MAINTENANCE_ESTIMATE = exports.UPDATE_MAINTENANCE_ESTIMATE = { resource: "MAINTENANCE ESTIMATE", action: "update" };
var DELETE_MAINTENANCE_ESTIMATE = exports.DELETE_MAINTENANCE_ESTIMATE = { resource: "MAINTENANCE ESTIMATE", action: "delete" };

// WorkOrder Permissions
var READ_WORKORDER = exports.READ_WORKORDER = { resource: "WORKORDER", action: "read" };
var CREATE_WORKORDER = exports.CREATE_WORKORDER = { resource: "WORKORDER", action: "create" };
var UPDATE_WORKORDER = exports.UPDATE_WORKORDER = { resource: "WORKORDER", action: "update" };
var DELETE_WORKORDER = exports.DELETE_WORKORDER = { resource: "WORKORDER", action: "delete" };
var VIEW_WORKORDER = exports.VIEW_WORKORDER = { resource: "WORKORDER", action: "view" };
var VIEW_WORKORDER_GIS = exports.VIEW_WORKORDER_GIS = { resource: "WORKORDER GIS", action: "view" };
var UPDATE_WORKORDER_EXECUTE = exports.UPDATE_WORKORDER_EXECUTE = { resource: "WORKORDER EXECUTE", action: "update" };
var UPDATE_WORKORDER_CLOSE = exports.UPDATE_WORKORDER_CLOSE = { resource: "WORKORDER CLOSE", action: "update" };

// Dashboard Permissions
var VIEW_DASHBOARD = exports.VIEW_DASHBOARD = { resource: "DASHBOARD", action: "view" };

// Issue Permissions
var VIEW_ISSUE = exports.VIEW_ISSUE = { resource: "ISSUE", action: "view" };
var MR_CREATE_ISSUE = exports.MR_CREATE_ISSUE = { resource: "ISSUE MR", action: "create" };
var UPDATE_ISSUE_CLOSE = exports.UPDATE_ISSUE_CLOSE = { resource: "ISSUE CLOSE", action: "update" };
var UPDATE_ISSUE_REASON = exports.UPDATE_ISSUE_REASON = { resource: "ISSUE REASON", action: "update" };
var UPDATE_ISSUE = exports.UPDATE_ISSUE = { resource: "ISSUE", action: "update" };
var VIEW_ISSUE_REASON = exports.VIEW_ISSUE_REASON = { resource: "ISSUE REASON", action: "view" };
var VIEW_ISSUE_MR = exports.VIEW_ISSUE_MR = { resource: "ISSUE MR", action: "view" };

// ASSET Permissions
var CREATE_ASSET = exports.CREATE_ASSET = { resource: "ASSET", action: "create" };
var DELETE_ASSET = exports.DELETE_ASSET = { resource: "ASSET", action: "delete" };
var VIEW_ASSET = exports.VIEW_ASSET = { resource: "ASSET", action: "view" };
var UPDATE_ASSET = exports.UPDATE_ASSET = { resource: "ASSET", action: "update" };
var READ_ASSET = exports.READ_ASSET = { resource: "ASSET", action: "read" };
var LOCATIONS_VIEW = exports.LOCATIONS_VIEW = { resource: "LOCATION", action: "view" };
// DEVICE Permissions
var CREATE_DEVICE = exports.CREATE_DEVICE = { resource: "DEVICE", action: "create" };
var READ_DEVICE = exports.READ_DEVICE = { resource: "DEVICE", action: "read" };
// TEAM Permissions
var CREATE_TEAM = exports.CREATE_TEAM = { resource: "TEAM", action: "create" };
var VIEW_TEAM = exports.VIEW_TEAM = { resource: "TEAM", action: "view" };
var DELETE_TEAM = exports.DELETE_TEAM = { resource: "TEAM", action: "delete" };

// RUN Permissions
var CREATE_RUN = exports.CREATE_RUN = { resource: "RUN", action: "create" };
var VIEW_RUN = exports.VIEW_RUN = { resource: "RUN", action: "view" };
var DELETE_RUN = exports.DELETE_RUN = { resource: "RUN", action: "delete" };
var CREATE_RUN_RANGE = exports.CREATE_RUN_RANGE = { resource: "RUN RANGE", action: "create" };

// List permissions
var CREATE_SETUP_LIST_DATA = exports.CREATE_SETUP_LIST_DATA = { resource: "SETUP LIST DATA", action: "create" };

// Application lookups
var APPLICATIONLOOKUPS_VIEW = exports.APPLICATIONLOOKUPS_VIEW = { resource: "APPLICATIONLOOKUP", action: "view" };