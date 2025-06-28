"use strict";

var journeyPlan_route = require("./api/journeyPlan/index");
var workPlanTemplateTask_route = require("./api/workPlanTemplateTask/index");
var journeyPlanTask_route = require("./api/journeyPlanTask/index");
var api_routes = require("../routes/api-routes");
var track_route = require("./api/track/index");
var wPlanSchedules_route = require("./api/wPlanSchedules/index");
var workPlanTemplate_route = require("./api/wPlanTemplate/index");
var testSchedule_route = require("./api/testSchedules/index");
module.exports = function () {
  api_routes.use("/journeyPlan", journeyPlan_route);
  api_routes.use("/track", track_route);
  api_routes.use("/workPlanTemplate", workPlanTemplate_route);
  api_routes.use("/workPlanTemplateTask", workPlanTemplateTask_route);
  api_routes.use("/journeyPlanTask", journeyPlanTask_route);
  api_routes.use("/wPlanSchedules", wPlanSchedules_route);
  api_routes.use("/testSchedule", testSchedule_route);
};