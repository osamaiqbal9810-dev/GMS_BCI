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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var tenantInfo = require("../../utilities/tenantInfo");

var ApplicationLookupsService = function () {
  function ApplicationLookupsService() {
    (0, _classCallCheck3.default)(this, ApplicationLookupsService);
  }

  (0, _createClass3.default)(ApplicationLookupsService, [{
    key: "getSubdivisionService",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user, listName) {
        var resultObj, ApplicationLookupsModel, obj, _obj;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resultObj = {};
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                _context.prev = 2;

                if (!(user.subdivision == "" || user.subdivision == "All" || user.isAdmin)) {
                  _context.next = 11;
                  break;
                }

                _context.next = 6;
                return ApplicationLookupsModel.find({ listName: listName }).exec();

              case 6:
                obj = _context.sent;


                resultObj.status = 200;
                resultObj.value = obj;
                _context.next = 16;
                break;

              case 11:
                _context.next = 13;
                return ApplicationLookupsModel.find({ listName: listName, description: user.subdivision }).exec();

              case 13:
                _obj = _context.sent;

                resultObj.status = 200;
                resultObj.value = _obj;

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](2);

                resultObj = { errorVal: e, status: 500 };

              case 21:
                return _context.abrupt("return", resultObj);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 18]]);
      }));

      function getSubdivisionService(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getSubdivisionService;
    }()
  }, {
    key: "getRefreshRate",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var resultObj, ApplicationLookupsModel, lookUps, refreshRate;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                resultObj = {};
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                _context2.next = 4;
                return ApplicationLookupsModel.find().exec();

              case 4:
                lookUps = _context2.sent;
                _context2.next = 7;
                return lookUps.find(function (_ref3) {
                  var listName = _ref3.listName;
                  return listName == "RefreshRate";
                });

              case 7:
                refreshRate = _context2.sent;

                if (refreshRate) {
                  resultObj = { newRefreshTime: refreshRate.opt1, status: 200 };
                } else {
                  resultObj = { status: 200 };
                }
                return _context2.abrupt("return", resultObj);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getRefreshRate() {
        return _ref2.apply(this, arguments);
      }

      return getRefreshRate;
    }()
  }, {
    key: "setGlobalGeoLoggingOption",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(globalGeoLogging, hostName) {
        var resultObj, ApplicationLookupsModel, obj, savedObj, newObj, newApplicationLookups, tenantId, savedCreatedList;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                resultObj = {};
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                _context3.prev = 2;

                if (!globalGeoLogging.id) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 6;
                return ApplicationLookupsModel.findById(globalGeoLogging.id).exec();

              case 6:
                obj = _context3.sent;

                if (!obj) {
                  _context3.next = 15;
                  break;
                }

                obj.opt1 = globalGeoLogging.opt1;
                _context3.next = 11;
                return obj.save();

              case 11:
                savedObj = _context3.sent;

                resultObj = { value: savedObj, status: 200 };
                _context3.next = 16;
                break;

              case 15:
                resultObj = { errorVal: "Not Found", status: 404 };

              case 16:
                _context3.next = 27;
                break;

              case 18:
                delete globalGeoLogging.id;

                newObj = {
                  description: "Global Logging of Geo Location of  User",
                  opt1: globalGeoLogging.opt1,
                  listName: globalGeoLogging.listName
                };
                newApplicationLookups = new ApplicationLookupsModel(newObj);
                tenantId = tenantInfo.getTenantId(hostName);

                newApplicationLookups.tenantId = tenantId;
                _context3.next = 25;
                return newApplicationLookups.save();

              case 25:
                savedCreatedList = _context3.sent;

                resultObj = { value: savedCreatedList, status: 200 };

              case 27:
                _context3.next = 32;
                break;

              case 29:
                _context3.prev = 29;
                _context3.t0 = _context3["catch"](2);

                resultObj = { errorVal: _context3.t0, status: 500 };

              case 32:
                return _context3.abrupt("return", resultObj);

              case 33:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 29]]);
      }));

      function setGlobalGeoLoggingOption(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return setGlobalGeoLoggingOption;
    }()
  }, {
    key: "addNewDynamicLanguageWord",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(langWord) {
        var resultObj, ApplicationLookupsModel, langs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, DyLang, langChk, savedLang;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resultObj = {};
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                _context4.prev = 2;
                _context4.next = 5;
                return ApplicationLookupsModel.find({
                  $or: [{ listName: "DynamicLanguage_en" }, { listName: "DynamicLanguage_es" }, { listName: "DynamicLanguage_fr" }]
                }).exec();

              case 5:
                langs = _context4.sent;

                //console.log(langs)
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 9;
                _iterator = langs[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 33;
                  break;
                }

                DyLang = _step.value;
                langChk = DyLang.listName;
                _context4.t0 = langChk;
                _context4.next = _context4.t0 === "DynamicLanguage_en" ? 17 : _context4.t0 === "DynamicLanguage_es" ? 19 : _context4.t0 === "DynamicLanguage_fr" ? 21 : 23;
                break;

              case 17:
                DyLang.opt1[langWord.key] = { en: langWord.en };
                return _context4.abrupt("break", 25);

              case 19:
                DyLang.opt1[langWord.key] = { es: langWord.es };
                return _context4.abrupt("break", 25);

              case 21:
                DyLang.opt1[langWord.key] = { fr: langWord.fr };
                return _context4.abrupt("break", 25);

              case 23:
                null;
                return _context4.abrupt("break", 25);

              case 25:

                DyLang.markModified("opt1");
                _context4.next = 28;
                return DyLang.save();

              case 28:
                savedLang = _context4.sent;

                resultObj = { value: "Saved", status: 200 };

              case 30:
                _iteratorNormalCompletion = true;
                _context4.next = 11;
                break;

              case 33:
                _context4.next = 39;
                break;

              case 35:
                _context4.prev = 35;
                _context4.t1 = _context4["catch"](9);
                _didIteratorError = true;
                _iteratorError = _context4.t1;

              case 39:
                _context4.prev = 39;
                _context4.prev = 40;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 42:
                _context4.prev = 42;

                if (!_didIteratorError) {
                  _context4.next = 45;
                  break;
                }

                throw _iteratorError;

              case 45:
                return _context4.finish(42);

              case 46:
                return _context4.finish(39);

              case 47:
                _context4.next = 52;
                break;

              case 49:
                _context4.prev = 49;
                _context4.t2 = _context4["catch"](2);

                console.log(_context4.t2);

              case 52:
                return _context4.abrupt("return", resultObj);

              case 53:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 49], [9, 35, 39, 47], [40,, 42, 46]]);
      }));

      function addNewDynamicLanguageWord(_x5) {
        return _ref5.apply(this, arguments);
      }

      return addNewDynamicLanguageWord;
    }()
  }, {
    key: "editDynamicLanguageWord",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(langWord) {
        var resultObj, ApplicationLookupsModel, langs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, DyLang, langChk, savedLang;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                resultObj = {};
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                _context5.prev = 2;
                _context5.next = 5;
                return ApplicationLookupsModel.find({
                  $or: [{ listName: "DynamicLanguage_en" }, { listName: "DynamicLanguage_es" }, { listName: "DynamicLanguage_fr" }]
                }).exec();

              case 5:
                langs = _context5.sent;

                //console.log(langs)
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context5.prev = 9;
                _iterator2 = langs[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context5.next = 33;
                  break;
                }

                DyLang = _step2.value;
                langChk = DyLang.listName;
                _context5.t0 = langChk;
                _context5.next = _context5.t0 === "DynamicLanguage_en" ? 17 : _context5.t0 === "DynamicLanguage_es" ? 19 : _context5.t0 === "DynamicLanguage_fr" ? 21 : 23;
                break;

              case 17:
                DyLang.opt1[langWord.key] = { en: langWord.en };
                return _context5.abrupt("break", 25);

              case 19:
                DyLang.opt1[langWord.key] = { es: langWord.es };
                return _context5.abrupt("break", 25);

              case 21:
                DyLang.opt1[langWord.key] = { fr: langWord.fr };
                return _context5.abrupt("break", 25);

              case 23:
                null;
                return _context5.abrupt("break", 25);

              case 25:

                DyLang.markModified("opt1");
                _context5.next = 28;
                return DyLang.save();

              case 28:
                savedLang = _context5.sent;

                resultObj = { value: "Edited", status: 200 };

              case 30:
                _iteratorNormalCompletion2 = true;
                _context5.next = 11;
                break;

              case 33:
                _context5.next = 39;
                break;

              case 35:
                _context5.prev = 35;
                _context5.t1 = _context5["catch"](9);
                _didIteratorError2 = true;
                _iteratorError2 = _context5.t1;

              case 39:
                _context5.prev = 39;
                _context5.prev = 40;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 42:
                _context5.prev = 42;

                if (!_didIteratorError2) {
                  _context5.next = 45;
                  break;
                }

                throw _iteratorError2;

              case 45:
                return _context5.finish(42);

              case 46:
                return _context5.finish(39);

              case 47:
                _context5.next = 52;
                break;

              case 49:
                _context5.prev = 49;
                _context5.t2 = _context5["catch"](2);

                console.log(_context5.t2);

              case 52:
                return _context5.abrupt("return", resultObj);

              case 53:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 49], [9, 35, 39, 47], [40,, 42, 46]]);
      }));

      function editDynamicLanguageWord(_x6) {
        return _ref6.apply(this, arguments);
      }

      return editDynamicLanguageWord;
    }()
  }, {
    key: "deleteDynamicLanguageWord",
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(langWord) {
        var resultObj, ApplicationLookupsModel, langs, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, DyLang, langChk, savedLang;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                resultObj = {};
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                _context6.prev = 2;
                _context6.next = 5;
                return ApplicationLookupsModel.find({
                  $or: [{ listName: "DynamicLanguage_en" }, { listName: "DynamicLanguage_es" }]
                }).exec();

              case 5:
                langs = _context6.sent;

                //console.log(langs)

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context6.prev = 9;
                _iterator3 = langs[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context6.next = 31;
                  break;
                }

                DyLang = _step3.value;
                langChk = DyLang.listName;
                _context6.t0 = langChk;
                _context6.next = _context6.t0 === "DynamicLanguage_en" ? 17 : _context6.t0 === "DynamicLanguage_es" ? 19 : 21;
                break;

              case 17:
                delete DyLang.opt1[langWord.key];
                return _context6.abrupt("break", 23);

              case 19:
                delete DyLang.opt1[langWord.key];
                return _context6.abrupt("break", 23);

              case 21:
                null;
                return _context6.abrupt("break", 23);

              case 23:
                DyLang.markModified("opt1");
                _context6.next = 26;
                return DyLang.save();

              case 26:
                savedLang = _context6.sent;

                resultObj = { value: "Deleted", status: 200 };

              case 28:
                _iteratorNormalCompletion3 = true;
                _context6.next = 11;
                break;

              case 31:
                _context6.next = 37;
                break;

              case 33:
                _context6.prev = 33;
                _context6.t1 = _context6["catch"](9);
                _didIteratorError3 = true;
                _iteratorError3 = _context6.t1;

              case 37:
                _context6.prev = 37;
                _context6.prev = 38;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 40:
                _context6.prev = 40;

                if (!_didIteratorError3) {
                  _context6.next = 43;
                  break;
                }

                throw _iteratorError3;

              case 43:
                return _context6.finish(40);

              case 44:
                return _context6.finish(37);

              case 45:
                _context6.next = 50;
                break;

              case 47:
                _context6.prev = 47;
                _context6.t2 = _context6["catch"](2);

                console.log(_context6.t2);

              case 50:
                return _context6.abrupt("return", resultObj);

              case 51:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 47], [9, 33, 37, 45], [38,, 40, 44]]);
      }));

      function deleteDynamicLanguageWord(_x7) {
        return _ref7.apply(this, arguments);
      }

      return deleteDynamicLanguageWord;
    }()
  }, {
    key: "getLists",
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(liststr) {
        var criteria, resultObj, ApplicationLookupsModel, remedialActionHook, lists, applicationlookups;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                criteria = {};
                resultObj = { errorVal: "default", status: 500 };
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                remedialActionHook = ServiceLocator.resolve("RemedialActionListHook");
                _context7.prev = 4;

                if (liststr && liststr != "") {
                  lists = liststr.split(",");

                  if (lists && lists.length) {
                    criteria.listName = { $in: lists };
                  }
                }

                _context7.next = 8;
                return ApplicationLookupsModel.find(criteria);

              case 8:
                applicationlookups = _context7.sent;


                applicationlookups = remedialActionHook.processRequiredLists(applicationlookups); // process this list as required for remedial action

                resultObj = { value: applicationlookups, status: 200 };
                _context7.next = 17;
                break;

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](4);

                resultObj = { errorVal: _context7.t0.toString(), status: 500 };
                console.log("applicationlookups.service.getlists.catch", _context7.t0.toString());

              case 17:
                return _context7.abrupt("return", resultObj);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[4, 13]]);
      }));

      function getLists(_x8) {
        return _ref8.apply(this, arguments);
      }

      return getLists;
    }()
  }, {
    key: "updateList",
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(id, body) {
        var ApplicationLookupsModel, remedialActionHook, listField;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                remedialActionHook = ServiceLocator.resolve("RemedialActionListHook");

                // if (body.applicationlookups.listName === remedialActionHook.getRemedialActionListName()) {
                //   let result = await remedialActionHook.updateList(body.applicationlookups);
                //   return result;
                // }

                _context8.next = 5;
                return ApplicationLookupsModel.findOne({ _id: id });

              case 5:
                listField = _context8.sent;

                if (!listField) {
                  _context8.next = 14;
                  break;
                }

                listField.description = body.applicationlookups.description;
                listField.code = body.applicationlookups.code;

                if (body.applicationlookups.hasOwnProperty("opt1")) {
                  listField.opt1 = body.applicationlookups.opt1;
                  listField.markModified("opt1");
                }
                if (body.applicationlookups.hasOwnProperty("opt2")) {
                  listField.opt2 = body.applicationlookups.opt2;
                  listField.markModified("opt2");
                }

                _context8.next = 13;
                return listField.save();

              case 13:
                return _context8.abrupt("return", { status: 200, value: listField });

              case 14:
                return _context8.abrupt("return", { status: 404, errorVal: "Item not found" });

              case 17:
                _context8.prev = 17;
                _context8.t0 = _context8["catch"](0);

                console.log("applicationlookups.service.updateList.catch:", _context8.t0.toString());
                return _context8.abrupt("return", { status: 500, errorVal: _context8.t0.toString() });

              case 21:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 17]]);
      }));

      function updateList(_x9, _x10) {
        return _ref9.apply(this, arguments);
      }

      return updateList;
    }()
  }, {
    key: "create",
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req) {
        var ApplicationLookupsModel, remedialActionHook, result, newApplicationLookups, tenantId, lk1, code, recode, newvalue;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                remedialActionHook = ServiceLocator.resolve("RemedialActionListHook");

                if (!(req.body.applicationlookups.listName === remedialActionHook.getRemedialActionListName())) {
                  _context9.next = 8;
                  break;
                }

                _context9.next = 6;
                return remedialActionHook.create(req.body.applicationlookups);

              case 6:
                result = _context9.sent;
                return _context9.abrupt("return", result);

              case 8:
                newApplicationLookups = new ApplicationLookupsModel(req.body.applicationlookups);
                tenantId = tenantInfo.getTenantId(req.hostname);

                newApplicationLookups.tenantId = tenantId;

                if (newApplicationLookups.code) {
                  _context9.next = 18;
                  break;
                }

                _context9.next = 14;
                return ApplicationLookupsModel.find({ listName: newApplicationLookups.listName }).sort({ code: -1 }).limit(1).exec();

              case 14:
                lk1 = _context9.sent;
                code = newApplicationLookups.listName + "-1";


                if (lk1 && lk1.length > 0 && lk1[0] && lk1[0].code) {
                  recode = lk1[0].code.split("-").length > 1 ? lk1[0].code.split("-")[1] : lk1[0].code.split("-");


                  if (!isNaN(parseInt(recode))) {
                    code = newApplicationLookups.listName + "-" + (parseInt(recode) + 1);
                  }
                }

                newApplicationLookups.code = code;

              case 18:
                _context9.next = 20;
                return newApplicationLookups.save();

              case 20:
                newvalue = _context9.sent;
                return _context9.abrupt("return", { status: 200, value: newvalue });

              case 24:
                _context9.prev = 24;
                _context9.t0 = _context9["catch"](0);

                console.log("applicationlookups.service.create", _context9.t0.toString());
                return _context9.abrupt("return", { status: 500, errVal: _context9.t0.toString() });

              case 28:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 24]]);
      }));

      function create(_x11) {
        return _ref10.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "deleteOne",
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(id, req) {
        var ApplicationLookupsModel, remedialActionHook, result;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                remedialActionHook = ServiceLocator.resolve("RemedialActionListHook");

                if (!id.startsWith(remedialActionHook.idprefix)) {
                  _context10.next = 8;
                  break;
                }

                _context10.next = 6;
                return remedialActionHook.deleteOne(req.body.description);

              case 6:
                result = _context10.sent;
                return _context10.abrupt("return", result);

              case 8:
                _context10.next = 10;
                return ApplicationLookupsModel.deleteOne({ _id: id });

              case 10:
                return _context10.abrupt("return", { status: 200, value: "" });

              case 13:
                _context10.prev = 13;
                _context10.t0 = _context10["catch"](0);
                return _context10.abrupt("return", { status: 500, errorVal: _context10.t0.toString() });

              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 13]]);
      }));

      function deleteOne(_x12, _x13) {
        return _ref11.apply(this, arguments);
      }

      return deleteOne;
    }()
  }, {
    key: "getAssetTypeTests",
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        var ApplicationLookupsModel, resultObj, tests;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                resultObj = {};
                _context11.prev = 2;
                _context11.next = 5;
                return ApplicationLookupsModel.find({ listName: "appForms", "opt2.config": { $exists: true } }).exec();

              case 5:
                tests = _context11.sent;

                resultObj.value = tests;
                resultObj.status = 200;
                _context11.next = 14;
                break;

              case 10:
                _context11.prev = 10;
                _context11.t0 = _context11["catch"](2);

                resultObj = { errorVal: _context11.t0.toString(), status: 500 };
                console.log("applicationlookups.service.getlists.catch", _context11.t0.toString());

              case 14:
                return _context11.abrupt("return", resultObj);

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[2, 10]]);
      }));

      function getAssetTypeTests() {
        return _ref12.apply(this, arguments);
      }

      return getAssetTypeTests;
    }()
  }, {
    key: "getAllList",
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(criteria) {
        var ApplicationLookupsModel, resultObj, applicationlookups;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                resultObj = { errorVal: "default", status: 500 };
                _context12.prev = 2;
                _context12.next = 5;
                return ApplicationLookupsModel.find(criteria);

              case 5:
                applicationlookups = _context12.sent;

                resultObj = { value: applicationlookups, status: 200 };
                _context12.next = 12;
                break;

              case 9:
                _context12.prev = 9;
                _context12.t0 = _context12["catch"](2);

                resultObj = { value: _context12.t0, status: 500 };

              case 12:
                return _context12.abrupt("return", resultObj);

              case 13:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[2, 9]]);
      }));

      function getAllList(_x14) {
        return _ref13.apply(this, arguments);
      }

      return getAllList;
    }()
  }]);
  return ApplicationLookupsService;
}();

exports.default = ApplicationLookupsService;
//exports.getSubdivisionService = getSubdivisionService;