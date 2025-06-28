"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createSupportedParams = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createSupportedParams = exports.createSupportedParams = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, sd;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 3;
                        _iterator = listOfSupportedParams[Symbol.iterator]();

                    case 5:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 12;
                            break;
                        }

                        sd = _step.value;
                        _context.next = 9;
                        return (0, _dbHelperMethods.addIfNotExist)(SupportedParamsModel, { name: sd.name, type: sd.type }, sd);

                    case 9:
                        _iteratorNormalCompletion = true;
                        _context.next = 5;
                        break;

                    case 12:
                        _context.next = 18;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t0 = _context["catch"](3);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 18:
                        _context.prev = 18;
                        _context.prev = 19;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 21:
                        _context.prev = 21;

                        if (!_didIteratorError) {
                            _context.next = 24;
                            break;
                        }

                        throw _iteratorError;

                    case 24:
                        return _context.finish(21);

                    case 25:
                        return _context.finish(18);

                    case 26:

                        (0, _languageSeed.dynamicLanguageToDB)();

                    case 27:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    }));

    return function createSupportedParams() {
        return _ref.apply(this, arguments);
    };
}();
// export async function deletelistOfSupportedParams(list) {
//   if (list && list.length) {
//     for (let l2d of list) {
//       if (!l2d.listName || !l2d.code) continue;
//       console.log("attempting to delete applicaitonlookup: listname:", l2d.listName, "code:", l2d.code);
//       await ApplicationLookupsModel.deleteOne({ listName: l2d.listName, code: l2d.code });
//     }
//   }
// }

//
// provide this function array of {listName:'', code:'', compare:''}
// listName and code identifies the unique entry
// compare contains the field to match, if match fails, the entry will be updated
//
// export async function updateApplicationLookups(list) {
//   if (list && list.length) {
//     for (let l2u of list) {
//       if (!l2u.listName || !l2u.code || !l2u.compare) continue;
//       let item2u = await ApplicationLookupsModel.findOne({ listName: l2u.listName, code: l2u.code }).exec();
//       let item2compare = listOfAppLookups.find((a) => {
//         return a.listName === l2u.listName && a.code === l2u.code;
//       });
//       if (item2u && item2u[l2u.compare] !== undefined && item2compare && item2compare[l2u.compare] !== undefined) {
//         ////if(item2u && item2u[l2u.compare] && item2compare && item2compare[l2u.compare])
//         let f1 = item2u[l2u.compare];
//         let f2 = item2compare[l2u.compare];
//         try {
//           if (JSON.stringify(f1) !== JSON.stringify(f2)) {
//             item2u[l2u.compare] = item2compare[l2u.compare];
//             item2u.markModified(l2u.compare);
//             await item2u.save();
//           }
//         } catch (err) {}
//       }
//     }
//   }
// }


var _languageSeed = require("../../../dynamicLanguage/languageSeed");

var _dbHelperMethods = require("../dbFunctions/dbHelperMethods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SupportedParamsModel = require("../../../api/SupportedParams/params.model");

var listOfSupportedParams = [{
    label: "Status",
    type: "GENSET",
    name: "genStatus",
    unit: null
}, {
    label: "Engine RPM",
    min: 0,
    max: 10,
    majorTicks: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    type: "GENSET",
    name: "engineSpeed",
    unit: "RPM"
}, {
    label: "Va",
    min: 0,
    max: 500,
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    type: "GENSET",
    name: "Va",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Vb",
    min: 0,
    max: 500,
    type: "GENSET",
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    name: "Vb",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Vc",
    min: 0,
    max: 500,
    type: "GENSET",
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    name: "Vc",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Ia",
    min: 0,
    max: 300,
    type: "GENSET",
    majorTicks: ['0', '50', '100', '150', '200', '250', '300'],
    name: "Ia",
    unit: {
        short: "A",
        long: "Amps"
    }
}, {
    label: "Ib",
    min: 0,
    max: 300,
    type: "GENSET",
    majorTicks: ['0', '50', '100', '150', '200', '250', '300'],
    name: "Ib",
    unit: {
        short: "A",
        long: "Amps"
    }
}, {
    label: "Ic",
    min: 0,
    max: 300,
    type: "GENSET",
    majorTicks: ['0', '50', '100', '150', '200', '250', '300'],
    name: "Ic",
    unit: {
        short: "A",
        long: "Amps"
    }
}, {
    label: "Frequency",
    min: 0,
    max: 100,
    majorTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    type: "GENSET",
    name: "freq",
    unit: "Hz"
}, {
    label: "Generated Energy",
    type: "GENSET",
    name: "generatedEnergy",
    unit: "kW-h"
}, {
    label: "Coolant Temperature",
    min: 0,
    max: 200,
    majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
    type: "GENSET",
    name: "coolantTemp",
    unit: "C"
}, {
    label: "Coolant Pressure",
    min: 0,
    max: 200,
    majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
    type: "GENSET",
    name: "coolantPressure",
    unit: "kPa"
}, {
    label: "Engine Oil Level",
    min: 0,
    max: 100,
    type: "GENSET",
    name: "engineOilLevel",
    majorTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    unit: "%"
}, {
    label: "Engine Oil Pressure",
    min: 0,
    max: 200,
    majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
    type: "GENSET",
    name: "engineOilPressure",
    unit: "kPa"
}, {
    label: "Engine Oil Temperature",
    min: 0,
    max: 200,
    majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
    type: "GENSET",
    name: "engineOilTemp",
    unit: "C"
}, {
    label: "Battery Voltage",
    min: 0,
    max: 30,
    majorTicks: ['0', '5', '10', '15', '20', '25', '30'],
    type: "GENSET",
    name: "batteryVoltage",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Fuel Level",
    min: 0,
    max: 100,
    type: "GENSET",
    name: "fuelLevel",
    majorTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    unit: "%"
}, {
    label: "Fuel Temperature",
    min: 0,
    max: 200,
    majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
    type: "GENSET",
    name: "fuelTemp",
    unit: "C"
}, {
    label: "Fuel Pressure",
    min: 0,
    max: 200,
    majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200'],
    type: "GENSET",
    name: "fuelPressure",
    unit: "kPa"
}, {
    label: "Controller Operational Time",
    type: "GENSET",
    name: "controllerOpTime",
    unit: {
        short: "h",
        long: "hours"
    }
}, {
    label: "Engine Total Running Time",
    type: "GENSET",
    name: "engineTotalTime",
    unit: {
        short: "h",
        long: "hours"
    }
}, {
    label: "Engine Total Running Time Loaded",
    type: "GENSET",
    name: "engineTimeLoaded",
    unit: {
        short: "h",
        long: "hours"
    }
}, {
    label: "Engine Total Starts",
    type: "GENSET",
    name: "engineTotalStarts",
    unit: null
}, {
    label: "Overview",
    min: 0,
    max: 500,
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    type: "ATS",
    name: "systemOverview",
    unit: null
}, {
    label: "Va",
    min: 0,
    max: 500,
    type: "ATS",
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    name: "srcA_V1",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Vb",
    min: 0,
    max: 500,
    type: "ATS",
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    name: "srcA_V2",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Vc",
    min: 0,
    max: 500,
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    type: "ATS",
    name: "srcA_V3",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Va",
    min: 0,
    max: 500,
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    type: "ATS",
    name: "srcB_V1",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Vb",
    min: 0,
    max: 500,
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    type: "ATS",
    name: "srcB_V2",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Vc",
    min: 0,
    max: 500,
    majorTicks: ['0', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500'],
    type: "ATS",
    name: "srcB_V3",
    unit: {
        short: "V",
        long: "Volts"
    }
}, {
    label: "Source A Frequency",
    min: 0,
    max: 100,
    majorTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    type: "ATS",
    name: "srcA_Freq",
    unit: "Hz"
}, {
    label: "Source B Frequency",
    min: 0,
    max: 100,
    majorTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    type: "ATS",
    name: "srcB_Freq",
    unit: "Hz"
}, {
    label: "Last Outage Time",
    type: "ATS",
    name: "lastOutageTime",
    unit: {
        short: "m",
        long: "minutes"
    }
}, {
    label: "Last Outage Date",
    type: "ATS",
    name: "lastOutageDate",
    unit: null
}, {
    label: "Last Outage Duration",
    type: "ATS",
    name: "lastOutageDuration",
    unit: {
        short: "m",
        long: "minutes"
    }
}, {
    label: "Total Switch Transfer",
    type: "ATS",
    name: "switchTrasferTotal",
    unit: null
}];