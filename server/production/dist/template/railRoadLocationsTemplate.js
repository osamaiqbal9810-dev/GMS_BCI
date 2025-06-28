"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.railRoadLocationsTemplate = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var railRoadLocationsTemplate = exports.railRoadLocationsTemplate = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var aTypes, locGeo, atrr, majGeo, minGeo, sensorObj, gatewayObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _assetTypes2.default.find().exec();

          case 2:
            aTypes = _context.sent;
            locGeo = void 0;

            if (!(aTypes.length == 0)) {
              _context.next = 20;
              break;
            }

            console.log("No Asset Types Exist, creating locations");
            _context.next = 8;
            return _assetTypes2.default.create(railRoad);

          case 8:
            atrr = _context.sent;
            _context.next = 11;
            return _assets2.default.create(company);

          case 11:
            _context.next = 13;
            return _assetTypes2.default.create((0, _extends3.default)({}, majorGeographical, { parentAssetType: atrr._id }));

          case 13:
            majGeo = _context.sent;
            _context.next = 16;
            return _assetTypes2.default.create((0, _extends3.default)({}, minorGeographical, { parentAssetType: majGeo._id }));

          case 16:
            minGeo = _context.sent;
            _context.next = 19;
            return _assetTypes2.default.create((0, _extends3.default)({}, locationIdentifier, { parentAssetType: minGeo._id }));

          case 19:
            locGeo = _context.sent;

          case 20:
            sensorObj = (0, _extends3.default)({}, Sensor, { parentAssetType: locGeo && locGeo.id });
            gatewayObj = (0, _extends3.default)({}, Gateway, { parentAssetType: locGeo && locGeo.id });
            _context.next = 24;
            return addIfNotExist(_assetTypes2.default, { assetType: Sensor.assetType }, sensorObj);

          case 24:
            _context.next = 26;
            return addIfNotExist(_assetTypes2.default, { assetType: Gateway.assetType }, gatewayObj);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function railRoadLocationsTemplate() {
    return _ref.apply(this, arguments);
  };
}();

var addIfNotExist = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(model, criteria, newEntry) {
    var entry;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (model) {
              _context2.next = 3;
              break;
            }

            console.log("model not valid, exitting");
            return _context2.abrupt("return");

          case 3:
            if (!(!criteria || criteria == {})) {
              _context2.next = 6;
              break;
            }

            console.log("Only one entry should be added, provide criteria");
            return _context2.abrupt("return");

          case 6:
            if (newEntry) {
              _context2.next = 9;
              break;
            }

            console.log("Entry to add is null");
            return _context2.abrupt("return");

          case 9:
            _context2.prev = 9;
            _context2.next = 12;
            return model.findOne(criteria).exec();

          case 12:
            entry = _context2.sent;

            if (entry) {
              _context2.next = 16;
              break;
            }

            _context2.next = 16;
            return model.create(newEntry);

          case 16:
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](9);

            console.log("addIfNotExist in Septa-Location.js, err:", _context2.t0.toString());

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[9, 18]]);
  }));

  return function addIfNotExist(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _assetTypes = require("../api/assetTypes/assetTypes.model");

var _assetTypes2 = _interopRequireDefault(_assetTypes);

var _assets = require("../api/assets/assets.modal");

var _assets2 = _interopRequireDefault(_assets);

var _assetTypeAttributes = require("./assetTypeAttributes");

var _defectCodes = require("../config/database/defectCodes");

var _config = require("./config");

var _DefectCodes = require("./DefectCodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var company = {
  inspectable: false,
  parentAsset: null,
  images: [],
  documents: [],
  childAsset: [],
  isRemoved: false,
  unitId: "Organization",
  description: "",
  assetType: "Company",
  frequency: "",
  attributes: {}
};

var railRoad = {
  assetType: "Company",
  assetTypeClassify: "point",
  lampAttributes: [],
  timpsAttributes: {},
  defectCodes: [],
  inspectionInstructions: "",
  inspectionForms: "",
  plannable: false,
  inspectable: false,
  location: true,
  menuFilter: false,
  allowedAssetTypes: ["Location"],
  parentAssetType: null
};
var majorGeographical = {
  assetType: "Location",
  assetTypeClassify: "point",
  lampAttributes: _assetTypeAttributes.LampAttributes["line"],
  timpsAttributes: { code: "0001", description: "line" },
  defectCodes: [],
  inspectionInstructions: "",
  inspectionForms: "",
  plannable: false,
  inspectable: false,
  menuFilter: false,
  location: true,
  allowedAssetTypes: ["Store"]
};
var minorGeographical = {
  assetType: "Store",
  assetTypeClassify: "point",
  lampAttributes: _assetTypeAttributes.LampAttributes["line"],
  timpsAttributes: { code: "0001", description: "line" },
  defectCodes: [],
  inspectionInstructions: "",
  inspectionForms: "",
  plannable: false,
  inspectable: false,
  menuFilter: true,
  location: true,
  allowedAssetTypes: ["Floor"]
};
var locationIdentifier = {
  assetType: "Floor",
  assetTypeClassify: "point",
  lampAttributes: _assetTypeAttributes.LampAttributes["Floor"],
  timpsAttributes: { code: "0001", description: "line" },
  defectCodes: [],
  inspectionInstructions: "",
  inspectionForms: "",
  plannable: true,
  inspectable: false,
  location: true,
  menuFilter: false,
  allowedAssetTypes: ["Sensor", "Gateway"]
};
var Sensor = {
  assetType: "Generator",
  assetTypeClassify: "point",
  lampAttributes: _assetTypeAttributes.LampAttributes["Sensor"],
  timpsAttributes: { code: "0001", description: "Sensor" },
  defectCodes: null,
  inspectionInstructions: "",
  inspectionForms: null,
  plannable: false,
  inspectable: true,
  location: false,
  defectCodesObj: null,
  inspectionFormsObj: null,
  allowedAssetTypes: []
};
var Gateway = {
  assetType: "ATS",
  assetTypeClassify: "point",
  lampAttributes: _assetTypeAttributes.LampAttributes["Gateway"],
  timpsAttributes: { code: "0002", description: "Gateway" },
  defectCodes: null,
  inspectionInstructions: "",
  inspectionForms: null,
  plannable: false,
  inspectable: true,
  location: false,
  defectCodesObj: null,
  inspectionFormsObj: null,
  allowedAssetTypes: []
};