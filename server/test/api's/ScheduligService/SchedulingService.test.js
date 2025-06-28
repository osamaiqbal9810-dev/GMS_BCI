//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
//let ApplicationLookups = require("../../../api/ApplicationLookups/ApplicationLookups.model");
//import WPlanTemplatesModelMock from "../../../mocks/api/wPlanTemplate/wPlanTemplateMock.model";
// let WPlanTemplatesModelMockInstance = new WPlanTemplatesModelMock();
// let ServiceLocator = require("../../../framework/servicelocator");
// import WPlanTemplateService from "../../../timps/api/wPlanTemplate/wPlanTemplate.service";
// let getSubdivisionService = require("../../../api/ApplicationLookups/ApplicationLookups.service").getSubdivisionService;
// import { data_01, data_01_Result, data_02, data_02_Result, data_03, data_03_Result } from "./dataFile";
// import "babel-polyfill";
import SchedulerService from "../../../service/SchedulerService";
import _ from 'lodash';

//Require the dev-dependencies
let chai = require("chai");
// let chaiHttp = require("chai-http");
// //let app = require("../../../app");
let should = chai.should();
const assert = require("chai").assert;

//Utils
//import { permChecker } from "../../../utilities/permCheck";

describe("-Scheduling Service-", () => {
    it("Should schedule two inspections for two per week", async ()=>{
        let schService = new SchedulerService();
        //const frameTypes=['Day','Week', 'Month', 'Year']
        let template={
            startDate:new Date("2020-07-31T05:00:00.000Z"),
            minDays: 3,
            inspectionFrequencies:[{freq:2, timeFrameNumber:1, timeFrame:'Week', recurNumber: 1, recurTimeFrame:'Week', maxInterval: 7}],
            };
        let executions=[{name:'1st', date:new Date("2020-08-09 15:51:38")}, {name:'2nd', date:new Date("2020-08-09 16:27:47")}, {name:'3rd', date:new Date("2020-09-09 19:55:53")},
        {name:'4th', date:new Date("2020-09-10 15:14:06")}, {name:'5th', date:new Date("2020-09-10 15:14:06")}];
        let dateRange={from: new Date('2020-09-1 00:00:00'), to:new Date('2020-09-30 00:00:00'), today: new Date()};
        let workingDays=[];
        let result;
        try{       
        
        result = schService.getSchedules(template, executions, dateRange, workingDays);
        }
        catch(err)
        {
            console.log('error, ',err);
        }

        assert.isAtLeast(result.length, executions.length,"All executions were not included");
        console.log('results', result.length);

    });

    it("Should skip inspections if already performed", async ()=>{
        let schService = new SchedulerService();
        //const frameTypes=['Day','Week', 'Month', 'Year']
        let template={
            startDate:new Date("2020-08-01T05:00:00.000Z"),
            minDays: 2,
            inspectionFrequencies:[{freq:2, timeFrameNumber:1, timeFrame:'Week', recurNumber: 1, recurTimeFrame:'Week', maxInterval: 7}],
            };
        let executions=[{name:'1st', date:new Date("2020-08-02 15:51:38"), status:"executed"}, {name:'2nd', date:new Date("2020-08-06 16:27:47"), status:"executed"},
                        {name:'3rd', date:new Date("2020-08-10 19:55:53"), status:"executed"}, {name:'4th', date:new Date("2020-08-13 13:14:06"), status:"executed"}];
        let dateRange={from: new Date('2020-08-01 00:00:00'), to:new Date('2020-09-01 00:00:00'), today: new Date('2020-08-14 14:00:00')};
        let workingDays=[];
        let result;
        try{       
        result = schService.getSchedules(template, executions, dateRange, workingDays);

        console.log('Total results', result.length);
        let sorted = _.sortBy(result, 'date');
        let count = 1;
        for(let inspection of sorted)
        {
            console.log('Inspection', count++, ' at:', inspection.date, inspection.status);
        }
        }
        catch(err)
        {
            console.log('error ', err);
        }
        
        assert.isAtLeast(result.length, executions.length,"All executions were not included");
        assert.equal(result.length, executions.length+4, "Total inspections should be equal to executed + 4");
    });

});