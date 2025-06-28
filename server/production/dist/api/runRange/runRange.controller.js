"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var turf = require("@turf/turf");
function getUnitOfMeasurements(lineAsset) {
  var uom = "miles";
  if (lineAsset && lineAsset.systemAttributes && lineAsset.systemAttributes.milepostUnit && lineAsset.systemAttributes.milepostUnit.value && typeof lineAsset.systemAttributes.milepostUnit.value === "string") {
    uom = lineAsset.systemAttributes.milepostUnit.value;
  }
  return uom;
}
exports.create = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var RunService, AssetsModel, utils, resultObj, lineId, mpStart, mpEnd, range, line, geoJsonCord, uom, lineGeodata, getLineRuns, run, runCreated;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            RunService = ServiceLocator.resolve("LineRunService");
            AssetsModel = ServiceLocator.resolve("AssetsModel");
            utils = ServiceLocator.resolve("utils");
            resultObj = {};
            _context.prev = 4;
            lineId = req.body.runDetail.range.lineId;
            mpStart = utils.toFixed(+req.body.runDetail.range.mpStart);
            mpEnd = utils.toFixed(+req.body.runDetail.range.mpEnd);
            range = { geoJsonCord: "", start: "", end: "" };

            range = Object.assign(range, req.body.runDetail.range);

            _context.next = 12;
            return AssetsModel.findById(req.body.runDetail.range.lineId);

          case 12:
            line = _context.sent;
            geoJsonCord = JSON.parse(line.attributes.geoJsonCord);
            uom = getUnitOfMeasurements(line);

            // console.log(geoJsonCord);

            lineGeodata = turf.lineString(geoJsonCord.features[0].geometry.coordinates, { name: "line 1" });


            if (line.start <= mpStart) mpStart -= line.start;else console.log("runRange.controller.create: error: start milepost is less than start of plannable location"); // error log todo

            if (line.start <= mpEnd) mpEnd -= line.start;else console.log("runRange.controller.create: error: end milepost is less than start of plannable location"); // error log todo

            // if mpStart and and mpEnd are 0 , it causes error that coordinates must be an array of two or more posiitons
            range.geoJsonCord = turf.lineSliceAlong(lineGeodata, mpStart, mpEnd, { units: uom });
            range.start = turf.along(lineGeodata, mpStart, { units: uom });
            range.end = turf.along(lineGeodata, mpEnd, { units: uom });

            if (!req.body.runDetail.run_id) {
              _context.next = 27;
              break;
            }

            _context.next = 24;
            return RunService.createRunRange(req.body.runDetail.run_id, range);

          case 24:
            resultObj = _context.sent;
            _context.next = 51;
            break;

          case 27:
            range.lineName = line.unitId;
            range.runDescription = range.runId;
            _context.next = 31;
            return RunService.getLineRun(line._id);

          case 31:
            getLineRuns = _context.sent;

            console.log(getLineRuns);

            if (!(getLineRuns && getLineRuns.value.length > 0)) {
              _context.next = 39;
              break;
            }

            _context.next = 36;
            return RunService.createRunRange(getLineRuns.value[0]._id, range);

          case 36:
            resultObj = _context.sent;
            _context.next = 51;
            break;

          case 39:
            run = {
              runLineID: line._id,
              runName: line.unitId,
              runId: line.unitId,
              runLineName: line.unitId,
              lineStart: line.start,
              lineEnd: line.end
            };
            _context.next = 42;
            return RunService.createRun(run);

          case 42:
            runCreated = _context.sent;

            if (runCreated.errorVal) {
              _context.next = 49;
              break;
            }

            _context.next = 46;
            return RunService.createRunRange(runCreated.value._id, range);

          case 46:
            resultObj = _context.sent;
            _context.next = 51;
            break;

          case 49:
            resultObj.status = runCreated.status;
            resultObj.errorVal = runCreated.errorVal;

          case 51:
            _context.next = 57;
            break;

          case 53:
            _context.prev = 53;
            _context.t0 = _context["catch"](4);

            console.log(_context.t0);
            resultObj.errorVal = _context.t0.toString();

          case 57:

            if (resultObj.errorVal) {
              //return res.send(resultObj.errorVal);
              resultObj.value = resultObj.errorVal;
            }

            res.status(200);
            res.json(resultObj.value);

          case 60:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 53]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.update = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var RunService, AssetsModel, utils, resultObj, lineId, mpStart, mpEnd, range, line, geoJsonCord, lineGeodata, uom;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            RunService = ServiceLocator.resolve("LineRunService");
            AssetsModel = ServiceLocator.resolve("AssetsModel");
            utils = ServiceLocator.resolve("utils");
            resultObj = {};
            _context2.prev = 4;
            lineId = req.body.runDetail.range.lineId;
            mpStart = utils.toFixed(+req.body.runDetail.range.mpStart);
            mpEnd = utils.toFixed(+req.body.runDetail.range.mpEnd);
            range = { geoJsonCord: "", start: mpStart, end: mpEnd };

            range = Object.assign(range, req.body.runDetail.range);

            _context2.next = 12;
            return AssetsModel.findById(req.body.runDetail.range.lineId);

          case 12:
            line = _context2.sent;
            geoJsonCord = JSON.parse(line.attributes.geoJsonCord);
            lineGeodata = turf.lineString(geoJsonCord.features[0].geometry.coordinates, { name: "line 1" });
            uom = getUnitOfMeasurements(line);
            // if mpStart and and mpEnd are 0 , it causes error that coordinates must be an array of two or more posiitons

            mpEnd -= mpStart; // substract start offset to make the ranges 0 based lengths
            mpStart = 0;

            range.geoJsonCord = turf.lineSliceAlong(lineGeodata, mpStart, mpEnd, { units: uom });
            range.start = turf.along(lineGeodata, mpStart, { units: uom });
            range.end = turf.along(lineGeodata, mpEnd, { units: uom });

            _context2.next = 23;
            return RunService.updateRunRange(req.body.runDetail.run_id, req.params.id, range);

          case 23:
            resultObj = _context2.sent;
            _context2.next = 30;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2["catch"](4);

            console.log("runRange.controller.update.catch", _context2.t0);
            resultObj.errorVal = _context2.t0.toString();

          case 30:

            if (resultObj.errorVal) {
              //return res.send(resultObj.errorVal);
              resultObj.value = resultObj.errorVal;
            }

            res.status(200);
            res.json(resultObj.value);

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 26]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();