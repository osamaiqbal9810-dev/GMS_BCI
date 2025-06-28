// //During the test the env variable is set to test
// process.env.NODE_ENV = "test";

// let mongoose = require("mongoose");
// //let ApplicationLookups = require("../../../api/ApplicationLookups/ApplicationLookups.model");
// import WPlanTemplatesModelMock from "../../../mocks/api/wPlanTemplate/wPlanTemplateMock.model";
// let WPlanTemplatesModelMockInstance = new WPlanTemplatesModelMock();
// let ServiceLocator = require("../../../framework/servicelocator");
// import WPlanTemplateService from "../../../api/wPlanTemplate/wPlanTemplate.service";
// // let getSubdivisionService = require("../../../api/ApplicationLookups/ApplicationLookups.service").getSubdivisionService;
// import { data_01, data_01_Result, data_02, data_02_Result, data_03, data_03_Result } from "./dataFile";
// import "babel-polyfill";

// //Require the dev-dependencies
// let chai = require("chai");
// // let chaiHttp = require("chai-http");
// // //let app = require("../../../app");
// let should = chai.should();
// const assert = require("chai").assert;

// //Utils
// //import { permChecker } from "../../../utilities/permCheck";

// describe("-WPlanTemplate-", () => {
//   describe("WPlanTemplate Service", () => {
//     describe("Get Service Functionality", () => {
//       // ServiceLocator.register("permissionChecker", permChecker);
//       it("data_01 - it should get sorted templates of that roadmaster.", async () => {
//         // let user = {
//         //   userGroup: {
//         //     permissions: [
//         //       { action: "self_workplans_templates", name: "WORKPLANS SELF", resource: "WORKPLAN ", _id: "5c6ac05b311b654ac4dde312" },
//         //     ],
//         //   },
//         //   email: "sortsuper@timps.com",
//         // };
//         let user = { group_id: "supervisor", email: "sortsuper@timps.com" };
//         WPlanTemplatesModelMockInstance.setData(data_01);
//         WPlanTemplatesModelMockInstance.setSortedData(data_01_Result);
//         ServiceLocator.register("WorkPlanTemplateModel", WPlanTemplatesModelMockInstance);
//         let wPlanTemplateService = new WPlanTemplateService();
//         let result = await wPlanTemplateService.get_Workplan_Templates(user);
//         let correctResult = data_01_Result;

//         assert.equal(result.value, correctResult);
//       });
//       it("data_02 - it should get templates grouped by roadmasters of the given subdivsion.", async () => {
//         //   let user = { userGroup: { permissions: [] }, subdivision: "Lahore Subdivision", email: "sortsuper@timps.com" };
//         let user = { subdivision: "Lahore Subdivision", email: "sortsuper@timps.com" };
//         WPlanTemplatesModelMockInstance.setData(data_02);
//         WPlanTemplatesModelMockInstance.setSortedData(data_02_Result);
//         ServiceLocator.register("WorkPlanTemplateModel", WPlanTemplatesModelMockInstance);
//         let wPlanTemplateService = new WPlanTemplateService();
//         let result = await wPlanTemplateService.get_Workplan_Templates(user);
//         let correctResult = data_02_Result;

//         assert.equal(result.value, correctResult);
//       });
//       it("data_03 - it should get sorted templates grouped by roadmasters of the  all subdivsions.", async () => {
//         //     let user = { userGroup: { permissions: [] }, subdivision: "All", email: "sortsuper@timps.com" };
//         let user = { subdivision: "All", email: "sortsuper@timps.com" };
//         WPlanTemplatesModelMockInstance.setData(data_03);
//         WPlanTemplatesModelMockInstance.setSortedData(data_03_Result);
//         ServiceLocator.register("WorkPlanTemplateModel", WPlanTemplatesModelMockInstance);
//         let wPlanTemplateService = new WPlanTemplateService();
//         let result = await wPlanTemplateService.get_Workplan_Templates(user);
//         let correctResult = data_03_Result;
//         assert.equal(result.value, correctResult);
//       });
//     });
//   });
// });
"use strict";