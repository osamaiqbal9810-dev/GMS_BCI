"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _UUID = require("../../utilities/UUID");

var _isJson = require("../../utilities/isJson.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");

// dependsOn:
var WorkplanTemplateService = function () {
  function WorkplanTemplateService(logger, validationUtil) {
    (0, _classCallCheck3.default)(this, WorkplanTemplateService);

    this.logger = logger;
    this.validation = validationUtil;
    this.verbose = false;
    this.assetGroupSample = {
      _id: "5c4cca5f5b20771958108476",
      units: [{
        assetType: "Signal",
        start: "1",
        end: "1",
        length: "0",
        id: "7f04880a-83c9-1f22-3ab9-0c0f32aac468",
        unitId: "CSX Signal",
        coordinates: [-77.5547058130188, 43.1468624754564, 0],
        railRoad: "CSX"
      }, {
        assetType: "Signal",
        start: "2",
        end: "2",
        length: "0",
        id: "8982e745-928c-3603-5683-8eca8b4e741b",
        unitId: "CSX Signal",
        coordinates: [-77.5547058130188, 43.1468624754564, 0],
        railRoad: "CSX"
      }, {
        assetType: "Signal",
        start: "3",
        end: "3",
        length: "0",
        id: "f2490474-eacd-9d0a-0bc8-0e8c7a292c74",
        unitId: "CSX Intermediate Signal",
        coordinates: [-77.5158936663373, 43.1259120129687, 0],
        railRoad: "CSX"
      }, {
        assetType: "Overpass",
        start: "4",
        end: "4",
        length: "0",
        id: "ab9431f3-742d-d846-10be-0675b0d7071f",
        unitId: "Washington Street Railroad Overpass",
        coordinates: [-77.4891553047852, 43.1159563904727, 0],
        railRoad: "CSX"
      }, {
        assetType: "Bridge",
        start: "5",
        end: "5",
        length: "0",
        id: "2c22dce6-eab9-3fc8-3cb7-eeffe1068f0b",
        unitId: "East Rochester Railroad Bridge",
        coordinates: [-77.4789952702009, 43.1131637905881, 0],
        railRoad: "CSX"
      }, {
        assetType: "Crossing",
        start: "6",
        end: "6",
        length: "0",
        id: "e9da452f-1123-3ba9-22ea-7ad78c8e839c",
        unitId: "O,Conor Road at Grade Crossing",
        coordinates: [-77.4590747968518, 43.1076568466413, 0],
        railRoad: "CSX"
      }, {
        assetType: "Crossing",
        start: "7",
        end: "7",
        length: "0",
        id: "18ae2b87-e22c-fd42-0153-d820835263ef",
        unitId: "Fairport Village at Grade Crossing",
        coordinates: [-77.4418839019453, 43.1032645770197, 0],
        railRoad: "CSX"
      }, {
        assetType: "Rail",
        start: "0",
        end: "6",
        length: "7",
        unitId: "Track-CSX-002",
        id: "e4bbfac6-652a-bff4-e28a-dc24ef9223b6",
        coordinates: [],
        railRoad: "CSX"
      }],
      coordinates: [],
      isRemoved: false,
      subdivision: "Albany Subdivision",
      trackType: "Main Line",
      start: "0",
      end: "6",
      length: "7",
      trafficType: "Freight",
      trackId: "Rail-CSX-002",
      mp_prefix: "CSX",
      weight: "",
      class: "",
      createdAt: { $date: "2019-01-26T21:00:15.116Z" },
      updatedAt: { $date: "2019-01-26T21:00:15.119Z" },
      __v: 0
    };
  }

  (0, _createClass3.default)(WorkplanTemplateService, [{
    key: "buildWorkplanTemplate",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(assetGroup, user) {
        var workplantemplate, trackname, subdivision, applicationLookupModel, classObjFreq, classResult, jsonFreq, units;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                workplantemplate = {};

                if (!this.validation.ensureContains(assetGroup, "_id", "start", "end", "class")) {
                  _context.next = 29;
                  break;
                }

                trackname = this.validation.getOptional(assetGroup, "trackId");
                subdivision = this.validation.getOptional(assetGroup, "subdivision");
                applicationLookupModel = ServiceLocator.resolve("ApplicationLookupsModel");
                classObjFreq = 0;
                _context.prev = 6;
                _context.next = 9;
                return applicationLookupModel.findOne({ listName: "Class", description: assetGroup.class });

              case 9:
                classResult = _context.sent;
                jsonFreq = (0, _isJson.isJSON)(classResult.opt1);

                if (jsonFreq) {
                  classObjFreq = JSON.parse(classResult.opt1).frequency;
                }
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](6);

                this.logger.error("Error Retreiving Class in ApplicaitonLookup: " + _context.t0);

              case 17:
                workplantemplate.inspectionFrequency = classObjFreq;
                workplantemplate.title = "Inspect " + trackname + " : " + assetGroup.start + " to " + assetGroup.end;
                workplantemplate.subdivision = subdivision;
                workplantemplate.class = assetGroup.class;
                workplantemplate.date = new Date();
                if (user) {
                  workplantemplate.user = { id: user._id, name: user.name, email: user.email };
                }
                units = [];

                assetGroup.units.forEach(function (element) {
                  var unit = {
                    id: element.id,
                    unitId: element.unitId,
                    track_id: assetGroup._id,
                    assetType: element.assetType,
                    coordinates: element.coordinates
                  };
                  units.push(unit);
                });

                workplantemplate.tasks = [{
                  title: workplantemplate.title,
                  desc: workplantemplate.title,
                  notes: "Perform inspection",
                  units: units,
                  imgs: null,
                  taskId: (0, _UUID.guid)()
                }];
                //workplantemplate.user;
                workplantemplate.assetGroupId = assetGroup._id;
                _context.next = 31;
                break;

              case 29:
                workplantemplate = false;
                this.logger.error('Could not find all required fields in "AssetGroup": ' + JSON.stringify(assetGroup));

              case 31:
                return _context.abrupt("return", workplantemplate);

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 14]]);
      }));

      function buildWorkplanTemplate(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return buildWorkplanTemplate;
    }()
  }, {
    key: "test",
    value: function test() {
      var wpt = this.buildWorkplanTemplate(this.assetGroupSample);

      this.logger.info("WorkplanTemplate: " + JSON.stringify(wpt));
    }
  }]);
  return WorkplanTemplateService;
}();

exports.default = WorkplanTemplateService;