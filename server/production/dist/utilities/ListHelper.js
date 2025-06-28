"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var mongoose = require("mongoose");
var ServiceLocator = require("../framework/servicelocator");
var utils = require("../utilities/utils");
var moment = require('moment');

var ListHelper = function () {
  function ListHelper(logger) {
    (0, _classCallCheck3.default)(this, ListHelper);

    this.logger = logger;
  }
  // let listModel = {
  //      tenantId = 0,
  //      listName = "",
  //      code = "",
  //      description = "",
  //      optParam1 = "",
  //      optParam2 = ""
  //  };

  (0, _createClass3.default)(ListHelper, [{
    key: "getList",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(listname, timestamp, settings, user, tz, callbacks) {
        var _this = this;

        var filter, fieldMap, limit, sort, projection, customFilter, settingsObj, parsedLimit, modelName, listModel, isSortEmpty, isProjectionEmpty, query;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                timestamp = this.transformTimestamp(timestamp.toString());

                filter = { updatedAt: { $gt: timestamp } };
                fieldMap = {};
                limit = 0;
                sort = {};
                projection = {}; // used to filter attributes

                customFilter = {};

                if (!(settings && settings != "")) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 10;
                return this.processCriteria(settings, user, tz);

              case 10:
                settingsObj = _context2.sent;

                filter = Object.assign(filter, settingsObj.criteria);
                fieldMap = Object.assign(fieldMap, settingsObj.fieldMap);
                if (settingsObj.hasOwnProperty("limit")) {
                  parsedLimit = Number.parseInt(settingsObj.limit, 10);

                  if (Number.isNaN(parsedLimit)) {
                    this.logger.warn(listName + ": limit parameter was not parsed, ignoring the limit");
                    console.log(listName + ": limit parameter was not parsed, ignoring the limit");
                  } else {
                    limit = parsedLimit;
                  }
                }

                if (settingsObj.hasOwnProperty("sort")) {
                  sort = Object.assign(sort, settingsObj.sort);
                }
                if (settingsObj.hasOwnProperty("project")) {
                  projection = Object.assign(projection, settingsObj.project);
                }
                if (settingsObj.hasOwnProperty("customFilter")) {
                  customFilter = Object.assign(customFilter, settingsObj.customFilter);
                }

              case 17:
                modelName = listname + "Model";
                listModel = ServiceLocator.resolve(modelName);

                if (listModel) {
                  _context2.next = 24;
                  break;
                }

                console.log("Could not find the model named:" + modelName);
                this.logger.error("Could not find the model named:" + modelName);
                callbacks.success([]);
                return _context2.abrupt("return");

              case 24:
                //console.log('getList', modelName);

                isSortEmpty = Object.keys(sort).length == 0;
                isProjectionEmpty = Object.keys(projection).length == 0;
                query = listModel.find(filter, isProjectionEmpty ? null : projection);


                if (limit > 0 && !isSortEmpty) {
                  query = listModel.find(filter, isProjectionEmpty ? null : projection).limit(limit).sort(sort);
                } else if (limit <= 0 && !isSortEmpty) {
                  query = listModel.find(filter, isProjectionEmpty ? null : projection).sort(sort);
                } else if (isSortEmpty && limit > 0) {
                  query = listModel.find(filter, isProjectionEmpty ? null : projection).limit(limit);
                }

                query.exec(function () {
                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, data) {
                    var itemsList, module;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (err) {
                              _this.logger.error("Error reading data: " + err.description);
                              callbacks.fail("error:" + err.description);
                            }

                            if (!data) {
                              _context.next = 11;
                              break;
                            }

                            itemsList = [];

                            if (!(customFilter && customFilter.module && customFilter.func)) {
                              _context.next = 9;
                              break;
                            }

                            module = ServiceLocator.resolve(customFilter.module);

                            if (!(module && module[customFilter.func])) {
                              _context.next = 9;
                              break;
                            }

                            _context.next = 8;
                            return module[customFilter.func](data, user, tz);

                          case 8:
                            data = _context.sent;

                          case 9:

                            data.forEach(function (element) {
                              var codeValue = "";
                              var descriptionValue = "";
                              var optParam2Value = "";

                              codeValue = _this.getValueNested(element._doc, fieldMap.code);
                              descriptionValue = _this.getValueNested(element._doc, fieldMap.description);
                              optParam2Value = _this.getValueNested(element._doc, fieldMap.optParam2);

                              var item = {
                                tenantId: user.tenantId,
                                listName: listname,
                                code: codeValue, // element._id.toString(),
                                description: descriptionValue, // timestamp,
                                optParam1: JSON.stringify(element._doc),
                                optParam2: optParam2Value
                              };

                              itemsList.push(item);
                            });

                            callbacks.success(itemsList);

                          case 11:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x7, _x8) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getList(_x, _x2, _x3, _x4, _x5, _x6) {
        return _ref.apply(this, arguments);
      }

      return getList;
    }()
  }, {
    key: "getValueNested",
    value: function getValueNested(obj, field) {
      if (obj) if (field) {
        if (field.includes(".") && field.split(".").length == 2) {
          var memberName = field.split(".")[0];
          field = field.split(".")[1];
          if (!obj.hasOwnProperty(memberName)) {
            return "";
          }
          obj = obj[memberName];
        }

        if (obj && obj.hasOwnProperty(field)) {
          return obj[field];
        }
      }
      return "";
    }
  }, {
    key: "getDirectList",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(listname, timestamp, settings, user, tz, callbacks) {
        var _this2 = this;

        var filter, fieldMap, limit, sort, customFilter, settingsObj, parsedLimit, modelName, listModel, query;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                timestamp = this.transformTimestamp(timestamp.toString());

                filter = { updatedAt: { $gt: timestamp } };
                fieldMap = {};
                limit = 0;
                sort = {};
                customFilter = {};

                if (!(settings != "")) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 9;
                return this.processCriteria(settings, user, tz);

              case 9:
                settingsObj = _context4.sent;

                filter = Object.assign(filter, settingsObj.criteria);
                fieldMap = Object.assign(fieldMap, settingsObj.fieldMap);

                if (settingsObj.hasOwnProperty("limit")) {
                  parsedLimit = Number.parseInt(settingsObj.limit, 10);

                  if (Number.isNaN(parsedLimit)) {
                    console.log(listName + ": limit parameter was not parsed, ignoring the limit");
                    this.logger.warn(listName + ": limit parameter was not parsed, ignoring the limit");
                  } else {
                    limit = parsedLimit;
                  }
                }

                if (settingsObj.hasOwnProperty("sort")) {
                  sort = Object.assign(sort, settingsObj.sort);
                }

                if (settingsObj.hasOwnProperty("customFilter")) {
                  customFilter = Object.assign(customFilter, settingsObj.customFilter);
                }

              case 15:
                modelName = listname + "Model";
                listModel = ServiceLocator.resolve(modelName);

                if (listModel) {
                  _context4.next = 22;
                  break;
                }

                console.log("Could not find the model named:" + modelName);
                this.logger.error("Could not find the model named:" + modelName);
                callbacks.success([]);
                return _context4.abrupt("return");

              case 22:
                //console.log('getDirectList', modelName);
                query = listModel.find(filter);


                if (limit > 0 && sort != {}) {
                  query = listModel.find(filter).limit(limit).sort(sort);
                } else if (limit <= 0 && sort != {}) {
                  query = listModel.find(filter).sort(sort);
                } else if (sort == {} && limit > 0) {
                  query = listModel.find(filter).limit(limit);
                }

                query.find(filter).exec(function () {
                  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(err, data) {
                    var module, itemsList;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (err) {
                              _this2.logger.error("Error: " + err.description);
                              callbacks.fail("error:" + err.description);
                            }

                            if (!data) {
                              _context3.next = 11;
                              break;
                            }

                            if (!(customFilter && customFilter.module && customFilter.func)) {
                              _context3.next = 8;
                              break;
                            }

                            module = ServiceLocator.resolve(customFilter.module);

                            if (!(module && module[customFilter.func])) {
                              _context3.next = 8;
                              break;
                            }

                            _context3.next = 7;
                            return module[customFilter.func](data, user, tz);

                          case 7:
                            data = _context3.sent;

                          case 8:
                            itemsList = [];

                            data.forEach(function (element) {
                              itemsList.push(element._doc);
                            });

                            callbacks.success(itemsList);

                          case 11:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this2);
                  }));

                  return function (_x15, _x16) {
                    return _ref4.apply(this, arguments);
                  };
                }());

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getDirectList(_x9, _x10, _x11, _x12, _x13, _x14) {
        return _ref3.apply(this, arguments);
      }

      return getDirectList;
    }()
  }, {
    key: "convertErrorToStr",
    value: function convertErrorToStr(err) {
      var str = "[";
      str += err && err.name ? err.name : "";

      if (err && err.errors) {
        var errs = Object.keys(err.errors);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = errs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            if (e) str += "{" + e + "}=>";
            if (err.errors[e]) str += err.errors[e];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      if (err && err.message) {
        str += "message: " + err.message;
      }
      if (err && err.stack) {
        str += "stack: " + err.stack;
      }

      str += "]";
      return str;
    }
  }, {
    key: "handleError",
    value: function handleError(text, err) {
      var displayConsole = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var str = text;
      str += this.convertErrorToStr(err);
      this.logger.error(str);

      if (displayConsole) console.log(str);
    }
  }, {
    key: "addOrUpdate",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(item, callbacks) {
        var _this3 = this;

        var modelName, listModel, filterObj, itm;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                modelName = item.listName + "Model";
                listModel = ServiceLocator.resolve(modelName);

                if (listModel) {
                  _context5.next = 6;
                  break;
                }

                this.logger.error("addOrUpdate: Model not found: " + modelName);
                callbacks.fail("error: no model found");
                return _context5.abrupt("return");

              case 6:
                if (!(item.code == "" || item.code == null)) {
                  _context5.next = 16;
                  break;
                }

                if (!(item.description === "" || item.description == null)) {
                  _context5.next = 12;
                  break;
                }

                listModel.create(item.optParam1, function (err, result) {
                  if (err) {
                    // this.logger.error("Error creating listname:" + item.listName);
                    // console.log(err);
                    _this3.handleError("Error creating item" + JSON.stringify(item.optParam1) + " listname:" + item.listName, err, true);
                    callbacks.fail(err);
                    return;
                  }
                  callbacks.success("success");
                });
                return _context5.abrupt("return");

              case 12:
                filterObj = JSON.parse(item.description);

                listModel.findOne(filterObj, function (err, itms) {
                  var itm = null;
                  if (!itms) {
                    itm = listModel.create(item.optParam1, function (err, result) {
                      if (err) {
                        //this.logger.error("Error creating listname:" + item.listName);
                        _this3.handleError("Error creating item" + JSON.stringify(item.optParam1) + " listname:" + item.listName, err, true);
                        //console.log(err);
                        callbacks.fail(err);
                        return;
                      }
                      callbacks.success("success");
                    });

                    return;
                  } else {
                    itm = itms;
                  }

                  if (err || !itm) {

                    _this3.handleError("could not find item to update listName: " + item.listName + ", id:" + item.code, err, true);
                    callbacks.fail(err);
                    return "could not find the item to update";
                  }
                  itm = utils.mergeDeep(itm, item.optParam1);
                  if ((0, _typeof3.default)(item.optParam1) == "object") {
                    for (var key in item.optParam1) {
                      itm.markModified(key);
                    }
                  }

                  itm.save(function (err, result) {
                    if (err) {
                      _this3.handleError("could not save item to listName: " + item.listName + ", id:" + item.code, err, true);
                      callbacks.fail(err);
                      return;
                    }
                    callbacks.success("success");
                  });

                  return;
                });

              case 14:
                _context5.next = 25;
                break;

              case 16:
                _context5.next = 18;
                return listModel.findById(item.code).exec();

              case 18:
                itm = _context5.sent;

                if (itm) {
                  _context5.next = 23;
                  break;
                }

                this.handleError("could not find item to update listName: " + item.listName + ", id:" + item.code, {}, true);
                callbacks.fail({});
                return _context5.abrupt("return", "could not find the item to update");

              case 23:

                itm = utils.mergeDeep(itm, item.optParam1);

                // if (typeof item.optParam1 === "object") {
                //   for (const key in item.optParam1) {
                //     itm.markModified(key);
                //   }
                // }

                listModel.findByIdAndUpdate(item.code, itm, function (err, result) {
                  if (err) {
                    _this3.handleError("could not save item, listName: " + item.listName + ", id:" + item.code, err, true);
                    callbacks.fail(err);
                    return;
                  }

                  callbacks.success("success");
                  return;
                });

                // listModel.findById(item.code, (err, itm) => {
                //   if (err || !itm) 
                //   {
                //     this.handleError("could not find item to update listName: " + item.listName + ", id:" + item.code, err, true);
                //     return "could not find the item to update";
                //   }

                //   itm = utils.mergeDeep(itm, item.optParam1);
                //   if (typeof item.optParam1 === "object") {
                //     for (const key in item.optParam1) {
                //       itm.markModified(key);
                //     }
                //   }

                //   itm.save((err, result) => {
                //     if (err) {
                //       // this.logger.error(
                //       //   "could not save item, listName: " +
                //       //     item.listName +
                //       //     ", id:" +
                //       //     item.code +
                //       //     ", err:" +
                //       //     err
                //       // );
                //       // console.log(err);
                //       this.handleError("could not save item, listName: " + item.listName + ", id:" + item.code, err, true);
                //     }
                //   });
                //   callbacks.success("success");
                //   return;
                // });

              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addOrUpdate(_x18, _x19) {
        return _ref5.apply(this, arguments);
      }

      return addOrUpdate;
    }()
  }, {
    key: "processCriteria",
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(criteria, user, tz) {
        var today, currentDate, str, obj;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                today = new Date();
                //let startedsod = new Date(0); //
                //let roadmasterid = user.roadmasterid;

                today.setTime(today.getTime() + tz * 60 * 1000);

                today.setUTCHours(0);
                today.setMinutes(0);
                today.setSeconds(0, 0);

                currentDate = moment(today).format('YYYYMMDD');

                if (!(criteria === undefined || !criteria)) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", null);

              case 8:

                // Discontinued using SOD
                // // see if this criteria needs startedsod then get it
                // if (criteria.indexOf("<startedsod>") > -1) {
                //   let SODModel = ServiceLocator.resolve("SODModel");
                //   // get last SOD
                //   let sod = await SODModel.findOne({ employee: user.email }).sort({
                //     day: -1
                //   });
                //   if (sod && !sod.hasOwnProperty("end")) {
                //     // if this day is not ended then use this day
                //     startedsod = sod.day;
                //   }
                // }

                str = criteria.replace("<username>", user.name);

                str = str.replace(/<useremail>/g, user.email);
                str = str.replace("<userid>", user._id);
                str = str.replace("<today>", today.toISOString());
                //str = str.replace("<startedsod>", startedsod.toISOString());
                str = str.replace("<teamLeadEmail>", user.teamLead);
                str = str.replace("<currentDate>", currentDate);
                obj = JSON.parse(str);
                return _context6.abrupt("return", obj);

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function processCriteria(_x20, _x21, _x22) {
        return _ref6.apply(this, arguments);
      }

      return processCriteria;
    }()
  }, {
    key: "transformTimestamp",
    value: function transformTimestamp(timestamp) {
      if (timestamp == "") {
        timestamp = "1-1-2001";
      }
      if (timestamp.length < 17 || timestamp.length > 17) {
        //timestamp.includes("-") || timestamp.includes(":"))
        return timestamp;
      }
      var newTimestamp = "";
      newTimestamp = timestamp.substr(0, 4) + "-" + // yyyy
      timestamp.substr(4, 2) + "-" + // MM
      timestamp.substr(6, 2) + " " + // dd
      timestamp.substr(8, 2) + ":" + // HH
      timestamp.substr(10, 2) + ":" + // mm
      timestamp.substr(12, 2) + ":" + // ss
      timestamp.substr(14, 3); //milliseconds

      return newTimestamp;
    }
  }, {
    key: "reverseTransformTimestamp",
    value: function reverseTransformTimestamp(timestamp) {
      if (timestamp instanceof Date) {
        var newTimestamp = "";
        newTimestamp = timestamp.getFullYear().toString() + utils.assure2Digits((timestamp.getMonth() + 1).toString()) + utils.assure2Digits(timestamp.getDate().toString()) + utils.assure2Digits(timestamp.getHours().toString()) + utils.assure2Digits(timestamp.getMinutes().toString()) + utils.assure2Digits(timestamp.getSeconds().toString()) + utils.assure3Digits(timestamp.getMilliseconds().toString());

        return newTimestamp;
      }

      return "";
    }
  }]);
  return ListHelper;
}();

exports.default = ListHelper;