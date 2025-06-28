"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");

var AssetsTypeService = function () {
  function AssetsTypeService() {
    (0, _classCallCheck3.default)(this, AssetsTypeService);

    this.AssetTypesModel = ServiceLocator.resolve("AssetTypesModel");
    this.logger = ServiceLocator.resolve("logger");
  }

  (0, _createClass3.default)(AssetsTypeService, [{
    key: "get_AssetTypes",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var resultObj, assetTypes;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = {};
                _context.prev = 1;
                _context.next = 4;
                return this.AssetTypesModel.find().exec();

              case 4:
                assetTypes = _context.sent;

                resultObj = { value: assetTypes, status: 200 };
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                resultObj = { errorVal: _context.t0, status: 500 };
                this.logger.error("get_AssetTypes : " + _context.t0);

              case 12:
                return _context.abrupt("return", resultObj);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function get_AssetTypes() {
        return _ref.apply(this, arguments);
      }

      return get_AssetTypes;
    }()
  }, {
    key: "update_assetTypes",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(form) {
        var resultObj, assetTypeToUpdate, typeOfField, savedAssetType;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = {};
                _context2.prev = 1;
                _context2.next = 4;
                return this.AssetTypesModel.findOne({ _id: form._id }).exec();

              case 4:
                assetTypeToUpdate = _context2.sent;


                if (form.formType === "Add") {
                  typeOfField = (0, _typeof3.default)(assetTypeToUpdate[form.fieldToUpdate]);


                  if (typeOfField === 'object' && Array.isArray(assetTypeToUpdate[form.fieldToUpdate])) {
                    assetTypeToUpdate[form.fieldToUpdate].push((0, _extends3.default)({}, form.formData));
                  } else if (typeOfField === 'object') {
                    assetTypeToUpdate[form.fieldToUpdate] = (0, _extends3.default)({}, assetTypeToUpdate[form.fieldToUpdate], form.formData);
                  }

                  assetTypeToUpdate.markModified(form.fieldToUpdate);
                }

                _context2.next = 8;
                return assetTypeToUpdate.save();

              case 8:
                savedAssetType = _context2.sent;


                // let query = { _id: form._id };
                // let savedAssetType = await this.AssetTypesModel.findOneAndUpdate(query, assetTypeToUpdate, {
                //     upsert: true,
                // }).exec();

                resultObj = { value: savedAssetType, status: 200 };
                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);

                resultObj = { errorVal: _context2.t0, status: 500 };
                this.logger.error("get_AssetTypes : " + _context2.t0);

              case 16:
                return _context2.abrupt("return", resultObj);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 12]]);
      }));

      function update_assetTypes(_x) {
        return _ref2.apply(this, arguments);
      }

      return update_assetTypes;
    }()
  }, {
    key: "create_assetTypes",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(form) {
        var resultObj, newAssetType, saveAssetType;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = { value: "Ok", status: 200 };
                newAssetType = new this.AssetTypesModel(form.assetType);
                _context3.prev = 2;
                _context3.next = 5;
                return newAssetType.save();

              case 5:
                saveAssetType = _context3.sent;


                resultObj = { value: saveAssetType, status: 200 };
                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);

                resultObj = { errorVal: _context3.t0.toString(), status: 500 };
                console.log("maintenance.service.createNewAssetType error:", _context3.t0.toString());

              case 13:
                return _context3.abrupt("return", resultObj);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
      }));

      function create_assetTypes(_x2) {
        return _ref3.apply(this, arguments);
      }

      return create_assetTypes;
    }()
  }, {
    key: "getPlannableLocationTypes",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var resultObj, assetTypes;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resultObj = {};
                _context4.prev = 1;
                _context4.next = 4;
                return this.AssetTypesModel.find({ $and: [{ location: true }, { plannable: true }] }).exec();

              case 4:
                assetTypes = _context4.sent;

                resultObj = { value: assetTypes, status: 200 };
                _context4.next = 12;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);

                resultObj = { errorVal: _context4.t0, status: 500 };
                this.logger.error("assetTypes.service.getPlannableLocationTypes:" + _context4.t0);

              case 12:
                return _context4.abrupt("return", resultObj);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
      }));

      function getPlannableLocationTypes() {
        return _ref4.apply(this, arguments);
      }

      return getPlannableLocationTypes;
    }()
  }]);
  return AssetsTypeService;
}();

exports.default = AssetsTypeService;