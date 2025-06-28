"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _SchedulerService = require("../../../service/SchedulerService");

var _SchedulerService2 = _interopRequireDefault(_SchedulerService);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//During the test the env variable is set to test
process.env.NODE_ENV = "test";

var mongoose = require("mongoose");
//let ApplicationLookups = require("../../../api/ApplicationLookups/ApplicationLookups.model");
//import WPlanTemplatesModelMock from "../../../mocks/api/wPlanTemplate/wPlanTemplateMock.model";
// let WPlanTemplatesModelMockInstance = new WPlanTemplatesModelMock();
// let ServiceLocator = require("../../../framework/servicelocator");
// import WPlanTemplateService from "../../../timps/api/wPlanTemplate/wPlanTemplate.service";
// let getSubdivisionService = require("../../../api/ApplicationLookups/ApplicationLookups.service").getSubdivisionService;
// import { data_01, data_01_Result, data_02, data_02_Result, data_03, data_03_Result } from "./dataFile";
// import "babel-polyfill";


//Require the dev-dependencies
var chai = require("chai");
// let chaiHttp = require("chai-http");
// //let app = require("../../../app");
var should = chai.should();
var assert = require("chai").assert;

//Utils
//import { permChecker } from "../../../utilities/permCheck";

describe("-Scheduling Service-", function () {
    it("Should schedule two inspections for two per week", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var schService, template, executions, dateRange, workingDays, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        schService = new _SchedulerService2.default();
                        //const frameTypes=['Day','Week', 'Month', 'Year']

                        template = {
                            startDate: new Date("2020-07-31T05:00:00.000Z"),
                            minDays: 3,
                            inspectionFrequencies: [{ freq: 2, timeFrameNumber: 1, timeFrame: 'Week', recurNumber: 1, recurTimeFrame: 'Week', maxInterval: 7 }]
                        };
                        executions = [{ name: '1st', date: new Date("2020-08-09 15:51:38") }, { name: '2nd', date: new Date("2020-08-09 16:27:47") }, { name: '3rd', date: new Date("2020-09-09 19:55:53") }, { name: '4th', date: new Date("2020-09-10 15:14:06") }, { name: '5th', date: new Date("2020-09-10 15:14:06") }];
                        dateRange = { from: new Date('2020-09-1 00:00:00'), to: new Date('2020-09-30 00:00:00'), today: new Date() };
                        workingDays = [];
                        result = void 0;

                        try {

                            result = schService.getSchedules(template, executions, dateRange, workingDays);
                        } catch (err) {
                            console.log('error, ', err);
                        }

                        assert.isAtLeast(result.length, executions.length, "All executions were not included");
                        console.log('results', result.length);

                    case 9:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));

    it("Should skip inspections if already performed", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var schService, template, executions, dateRange, workingDays, result, sorted, count, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, inspection;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        schService = new _SchedulerService2.default();
                        //const frameTypes=['Day','Week', 'Month', 'Year']

                        template = {
                            startDate: new Date("2020-08-01T05:00:00.000Z"),
                            minDays: 2,
                            inspectionFrequencies: [{ freq: 2, timeFrameNumber: 1, timeFrame: 'Week', recurNumber: 1, recurTimeFrame: 'Week', maxInterval: 7 }]
                        };
                        executions = [{ name: '1st', date: new Date("2020-08-02 15:51:38"), status: "executed" }, { name: '2nd', date: new Date("2020-08-06 16:27:47"), status: "executed" }, { name: '3rd', date: new Date("2020-08-10 19:55:53"), status: "executed" }, { name: '4th', date: new Date("2020-08-13 13:14:06"), status: "executed" }];
                        dateRange = { from: new Date('2020-08-01 00:00:00'), to: new Date('2020-09-01 00:00:00'), today: new Date('2020-08-14 14:00:00') };
                        workingDays = [];
                        result = void 0;
                        _context2.prev = 6;

                        result = schService.getSchedules(template, executions, dateRange, workingDays);

                        console.log('Total results', result.length);
                        sorted = _lodash2.default.sortBy(result, 'date');
                        count = 1;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 14;

                        for (_iterator = sorted[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            inspection = _step.value;

                            console.log('Inspection', count++, ' at:', inspection.date, inspection.status);
                        }
                        _context2.next = 22;
                        break;

                    case 18:
                        _context2.prev = 18;
                        _context2.t0 = _context2["catch"](14);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 22:
                        _context2.prev = 22;
                        _context2.prev = 23;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 25:
                        _context2.prev = 25;

                        if (!_didIteratorError) {
                            _context2.next = 28;
                            break;
                        }

                        throw _iteratorError;

                    case 28:
                        return _context2.finish(25);

                    case 29:
                        return _context2.finish(22);

                    case 30:
                        _context2.next = 35;
                        break;

                    case 32:
                        _context2.prev = 32;
                        _context2.t1 = _context2["catch"](6);

                        console.log('error ', _context2.t1);

                    case 35:

                        assert.isAtLeast(result.length, executions.length, "All executions were not included");
                        assert.equal(result.length, executions.length + 4, "Total inspections should be equal to executed + 4");

                    case 37:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[6, 32], [14, 18, 22, 30], [23,, 25, 29]]);
    })));
});