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

var _testSchedules = require("./testSchedules.model");

var _testSchedules2 = _interopRequireDefault(_testSchedules);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestScheduleService = function () {
  function TestScheduleService() {
    (0, _classCallCheck3.default)(this, TestScheduleService);
  }

  (0, _createClass3.default)(TestScheduleService, [{
    key: "getReportFilter",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(query) {
        var resultObj, dateRange, criteria, testsData, _criteria, _testsData, dataToReturn, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, data, outObj, alreadyExists;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = {};
                dateRange = null;


                if (query.dateRange) {
                  dateRange = JSON.parse(query.dateRange);
                }

                _context.prev = 3;

                if (!(query.testCode && query.assetId && dateRange)) {
                  _context.next = 12;
                  break;
                }

                criteria = {
                  date: { $gte: new Date(dateRange.from), $lte: new Date(dateRange.to) },
                  assetId: query.assetId,
                  testCode: query.testCode
                };
                _context.next = 8;
                return _testSchedules2.default.find(criteria).exec();

              case 8:
                testsData = _context.sent;

                resultObj = { status: 200, value: testsData };
                _context.next = 52;
                break;

              case 12:
                if (!dateRange) {
                  _context.next = 51;
                  break;
                }

                _criteria = { date: { $gte: new Date(dateRange.from), $lte: new Date(dateRange.to) } };
                _context.next = 16;
                return _testSchedules2.default.find(_criteria).exec();

              case 16:
                _testsData = _context.sent;

                if (!_testsData) {
                  _context.next = 49;
                  break;
                }

                dataToReturn = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 22;
                _iterator = _testsData[Symbol.iterator]();

              case 24:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 34;
                  break;
                }

                data = _step.value;
                outObj = {
                  id: data.id,
                  assetId: data.assetId,
                  assetName: data.assetName,
                  lineId: data.lineId,
                  lineName: data.lineName,
                  testCode: data.testCode,
                  testDescription: data.testDescription,
                  assetType: data.assetType,
                  assetMP: data.assetMP
                };
                _context.next = 29;
                return _lodash2.default.find(dataToReturn, { assetId: data.assetId, testCode: data.testCode });

              case 29:
                alreadyExists = _context.sent;

                if (!alreadyExists) {
                  dataToReturn.unshift(outObj);
                }

              case 31:
                _iteratorNormalCompletion = true;
                _context.next = 24;
                break;

              case 34:
                _context.next = 40;
                break;

              case 36:
                _context.prev = 36;
                _context.t0 = _context["catch"](22);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 40:
                _context.prev = 40;
                _context.prev = 41;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 43:
                _context.prev = 43;

                if (!_didIteratorError) {
                  _context.next = 46;
                  break;
                }

                throw _iteratorError;

              case 46:
                return _context.finish(43);

              case 47:
                return _context.finish(40);

              case 48:
                resultObj = { status: 200, value: dataToReturn };

              case 49:
                _context.next = 52;
                break;

              case 51:
                resultObj = { errorVal: "no date range provided", status: 404 };

              case 52:
                _context.next = 58;
                break;

              case 54:
                _context.prev = 54;
                _context.t1 = _context["catch"](3);

                console.log("Error in getReportFilter ", _context.t1);
                resultObj = { errorVal: _context.t1, status: 500 };

              case 58:
                return _context.abrupt("return", resultObj);

              case 59:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 54], [22, 36, 40, 48], [41,, 43, 47]]);
      }));

      function getReportFilter(_x) {
        return _ref.apply(this, arguments);
      }

      return getReportFilter;
    }()
    //   async createTestSchedules(workplan) {
    //     let assets, applicationLookupsService, fixedAssetTypes, lineAsset, assetTypeTests;
    //     assets = workplan && workplan.tasks && workplan.tasks[0] && workplan.tasks[0].units;
    //     if (assets) {
    //       applicationLookupsService = ServiceLocator.resolve("ApplicationLookupsService");
    //       fixedAssetTypes = await AssetsTypeModel.find({ assetTypeClassify: "point" }).exec();
    //       lineAsset = await AssetsModel.find({ _id: workplan.lineId });
    //       let testsResult = applicationLookupsService.getAssetTypeTests;
    //       if (testsResult.value) {
    //         // if tests exist then we proceed
    //         assetTypeTests = testsResult.value;
    //         for (let asset of assets) {
    //           // see if asset is fixed one
    //           let fixedAsset = _.find(fixedAssetTypes, { assetType: asset.assetType });
    //           if (fixedAsset) {
    //             // get the tests linked to this asset assetType
    //             let assetTests = _.filter(assetTypeTests, test => {
    //               let found = null;
    //               if (test.opt2 && test.opt2.config) {
    //                 found = _.find(test.opt2.config, { assetType: asset.assetType });
    //               }
    //               return found;
    //             });
    //             // NOT COMPLETED , DISCUSSION REQUIRED
    //           }
    //         }
    //       }
    //     }
    //   }

  }]);
  return TestScheduleService;
}();

exports.default = TestScheduleService;