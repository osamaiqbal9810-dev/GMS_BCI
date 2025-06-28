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

var RemedialActionListHook = function () {
    function RemedialActionListHook() {
        (0, _classCallCheck3.default)(this, RemedialActionListHook);

        this.remedialActionListName = 'remedialAction';
        this.listItemCodeName = '01 slowOrderApplied';
        this.opt1ObjectEntryId = 'slowOrderSpeedRestict';
        this.codeprefix = 'code-';
        this.idprefix = 'id-';
    }

    (0, _createClass3.default)(RemedialActionListHook, [{
        key: "getRemedialActionListName",
        value: function getRemedialActionListName() {
            return this.remedialActionListName;
        }
    }, {
        key: "processRequiredLists",
        value: function processRequiredLists(lists) {
            var _this = this;

            // process to get listName:remedialAction, use only list in opt1 of code: slowOrderApplied, opt1 has list of objects. desired object's "id" field equals slowOrderSpeedRestict
            var desiredList = lists.filter(function (l) {
                return l.listName === _this.remedialActionListName && l.code === _this.listItemCodeName;
            });
            var listtoreplace = [];
            if (desiredList.length) {
                var opt1Entry = desiredList[0] && desiredList[0].opt1 && desiredList[0].opt1.length ? desiredList[0].opt1.filter(function (l) {
                    return l.id === _this.opt1ObjectEntryId;
                }) : null;
                listtoreplace = opt1Entry && opt1Entry[0] && opt1Entry[0].options;
            }
            if (listtoreplace && lists.length) // replace remedialAction 
                {
                    lists = lists.filter(function (l) {
                        return l.listName !== _this.remedialActionListName;
                    });
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = listtoreplace[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var l = _step.value;

                            lists.push({ _id: this.idprefix + l, listName: this.remedialActionListName, code: this.codeprefix + l, description: l });
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
            return lists;
        }
    }, {
        key: "updateList",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(body) {
                var result, ApplicationLookupsModel, rField;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                result = { status: 500, errorVal: 'default' };
                                _context.prev = 1;
                                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                                _context.next = 5;
                                return ApplicationLookupsModel.findOne({ listName: this.remedialActionListName, code: this.listItemCodeName });

                            case 5:
                                rField = _context.sent;

                                if (rField) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt("return", { status: 500, value: 'remedial action slow order code not found' });

                            case 8:
                                rField.opt1 = this.updateSlowOrderList(rField.opt1, body.code.slice(this.codeprefix.length), body.description);
                                rField.markModified('opt1');
                                _context.next = 12;
                                return rField.save();

                            case 12:
                                result.value = _context.sent;

                                result.status = 200;
                                _context.next = 20;
                                break;

                            case 16:
                                _context.prev = 16;
                                _context.t0 = _context["catch"](1);

                                result.errorVal = _context.t0.toString();
                                console.log('remedialactiolisthook.updatelist.catch:', _context.t0.toString());

                            case 20:
                                return _context.abrupt("return", result);

                            case 21:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 16]]);
            }));

            function updateList(_x) {
                return _ref.apply(this, arguments);
            }

            return updateList;
        }()
    }, {
        key: "create",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(body) {
                var ApplicationLookupsModel, rField, r;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                ApplicationLookupsModel = ServiceLocator.resolve('ApplicationLookupsModel');
                                _context2.next = 3;
                                return ApplicationLookupsModel.findOne({ listName: this.remedialActionListName, code: this.listItemCodeName });

                            case 3:
                                rField = _context2.sent;

                                if (rField) {
                                    _context2.next = 6;
                                    break;
                                }

                                return _context2.abrupt("return", { status: 500, value: 'remedial action slow order code not found' });

                            case 6:
                                rField.opt1 = this.insertSlowOrderList(rField.opt1, body.description);
                                rField.markModified('opt1');
                                _context2.next = 10;
                                return rField.save();

                            case 10:
                                r = _context2.sent;
                                return _context2.abrupt("return", { status: 200, value: r });

                            case 12:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function create(_x2) {
                return _ref2.apply(this, arguments);
            }

            return create;
        }()
    }, {
        key: "deleteOne",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(item) {
                var ApplicationLookupsModel, rField;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
                                _context3.next = 3;
                                return ApplicationLookupsModel.findOne({ listName: this.remedialActionListName, code: this.listItemCodeName });

                            case 3:
                                rField = _context3.sent;

                                if (rField) {
                                    _context3.next = 6;
                                    break;
                                }

                                return _context3.abrupt("return", { status: 500, value: 'remedial action slow order code not found' });

                            case 6:
                                rField.opt1 = this.deleteSlowOrderList(rField.opt1, item);
                                rField.markModified('opt1');
                                _context3.next = 10;
                                return rField.save();

                            case 10:
                                return _context3.abrupt("return", { status: 200, value: "" });

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function deleteOne(_x3) {
                return _ref3.apply(this, arguments);
            }

            return deleteOne;
        }()
    }, {
        key: "updateSlowOrderList",
        value: function updateSlowOrderList(opt1, prevValue, newValue) {
            var _this2 = this;

            var entry = opt1.find(function (itm) {
                return itm.id === _this2.opt1ObjectEntryId;
            });
            var index = entry.options.findIndex(function (itm) {
                return itm === prevValue;
            });
            entry.options.splice(index, 1, newValue);
            return opt1;
        }
    }, {
        key: "insertSlowOrderList",
        value: function insertSlowOrderList(opt1, newValue) {
            var _this3 = this;

            var entry = opt1.find(function (itm) {
                return itm.id === _this3.opt1ObjectEntryId;
            });
            entry.options.push(newValue);
            return opt1;
        }
    }, {
        key: "deleteSlowOrderList",
        value: function deleteSlowOrderList(opt1, valueToDelete) {
            var _this4 = this;

            var entry = opt1.find(function (itm) {
                return itm.id === _this4.opt1ObjectEntryId;
            });
            var index = entry.options.findIndex(function (itm) {
                return itm === valueToDelete;
            });
            if (index >= 0) entry.options.splice(index, 1);
            return opt1;
        }
    }]);
    return RemedialActionListHook;
}();

;
exports.default = RemedialActionListHook;