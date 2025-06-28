"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var addorUpdate = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var _this = this;

    var itemCount, listHelper, DOValidator, DOEventService;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            itemCount = 0;
            listHelper = ServiceLocator.resolve("ListHelper");
            DOValidator = ServiceLocator.resolve("DataOpValidationService");
            DOEventService = ServiceLocator.resolve("DataOpEventService");


            req.body.forEach(function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(element) {
                var docObj, skip, item, prevItemCopy, vr;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        docObj = JSON.parse(element.optParam1.toString());
                        skip = false;
                        item = {
                          listName: element.listname,
                          code: element.code,
                          description: element.desc,
                          optParam1: docObj,
                          optParam2: element.optParam2
                        };
                        prevItemCopy = _.cloneDeep(item);
                        _context3.next = 6;
                        return DOValidator.validatemsgListRequest(item, req.user);

                      case 6:
                        vr = _context3.sent;

                        if (!(vr.valid === true)) {
                          _context3.next = 14;
                          break;
                        }

                        if (vr.hasOwnProperty("newObj") && vr.newObj != null) {
                          item = vr.newObj;
                          console.log("validator proposed changes in object: " + vr.newObj);
                        }

                        _context3.next = 11;
                        return DOEventService.trigger(item.listName, "BeforeAddOrUpdate", {
                          item: item,
                          user: req.user
                        });

                      case 11:

                        listHelper.addOrUpdate(item, {
                          success: function () {
                            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(r1) {
                              return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      _context.next = 2;
                                      return DOEventService.trigger(item.listName, "AddOrUpdateSuccess", {
                                        item: prevItemCopy,
                                        user: req.user
                                      });

                                    case 2:
                                      itemCount++;

                                      if (!(itemCount >= req.body.length)) {
                                        _context.next = 6;
                                        break;
                                      }

                                      res.status(200);
                                      return _context.abrupt("return", res.json(r1));

                                    case 6:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee, _this);
                            }));

                            function success(_x5) {
                              return _ref3.apply(this, arguments);
                            }

                            return success;
                          }(),
                          fail: function () {
                            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(r1) {
                              return _regenerator2.default.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.next = 2;
                                      return DOEventService.trigger(item.listName, "AddOrUpdateFailed", {
                                        item: item,
                                        user: req.user
                                      });

                                    case 2:
                                      itemCount++;

                                      if (!(itemCount >= req.body.length)) {
                                        _context2.next = 6;
                                        break;
                                      }

                                      res.status(200);
                                      return _context2.abrupt("return", res.json(r1));

                                    case 6:
                                    case "end":
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2, _this);
                            }));

                            function fail(_x6) {
                              return _ref4.apply(this, arguments);
                            }

                            return fail;
                          }()
                        });
                        _context3.next = 19;
                        break;

                      case 14:
                        console.log(item.listName + " validation failed but returning success");
                        itemCount++;

                        if (!(itemCount >= req.body.length)) {
                          _context3.next = 19;
                          break;
                        }

                        res.status(200);
                        return _context3.abrupt("return", res.json("success"));

                      case 19:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());

            // Todo return response

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function addorUpdate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by zqureshi on 10/12/2018.
 */
//let Task = require("./task.model");
var _ = require("lodash");
var ServiceLocator = require("../../framework/servicelocator");

exports.addOrUpdate = addorUpdate;

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}