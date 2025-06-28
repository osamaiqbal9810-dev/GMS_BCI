"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateConfigurations = exports.addConfigurations = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var addConfigurations = exports.addConfigurations = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(addConfigs) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, config;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (addConfigs) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt("return");

                    case 2:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 5;
                        _iterator = appLookupConfigurations[Symbol.iterator]();

                    case 7:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 14;
                            break;
                        }

                        config = _step.value;
                        _context.next = 11;
                        return (0, _dbHelperMethods.addIfNotExist)(ApplicationLookupsModel, { listName: config.listName, code: config.code, description: config.description }, config);

                    case 11:
                        _iteratorNormalCompletion = true;
                        _context.next = 7;
                        break;

                    case 14:
                        _context.next = 20;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context["catch"](5);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 20:
                        _context.prev = 20;
                        _context.prev = 21;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 23:
                        _context.prev = 23;

                        if (!_didIteratorError) {
                            _context.next = 26;
                            break;
                        }

                        throw _iteratorError;

                    case 26:
                        return _context.finish(23);

                    case 27:
                        return _context.finish(20);

                    case 28:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[5, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function addConfigurations(_x) {
        return _ref.apply(this, arguments);
    };
}();

var updateConfigurations = exports.updateConfigurations = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(updateConfigs, appName) {
        var _this = this;

        var configs, _loop, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, config, filter, update, _filter, _update;

        return _regenerator2.default.wrap(function _callee2$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (updateConfigs) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt("return");

                    case 2:
                        _context3.next = 4;
                        return ApplicationLookupsModel.find({ listName: "config", "opt1.group": { $exists: false } });

                    case 4:
                        configs = _context3.sent;
                        _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(config) {
                            var cfg;
                            return _regenerator2.default.wrap(function _loop$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            if (config.opt1.group) {
                                                _context2.next = 8;
                                                break;
                                            }

                                            cfg = appLookupConfigurations.find(function (c) {
                                                return c.code === config.code;
                                            });

                                            if (!(cfg && cfg.opt1)) {
                                                _context2.next = 8;
                                                break;
                                            }

                                            config.opt1.group = cfg.opt1.group;
                                            config.opt1.sortid = cfg.opt1.sortid;
                                            config.markModified("opt1");
                                            _context2.next = 8;
                                            return config.save();

                                        case 8:
                                        case "end":
                                            return _context2.stop();
                                    }
                                }
                            }, _loop, _this);
                        });
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context3.prev = 9;
                        _iterator2 = configs[Symbol.iterator]();

                    case 11:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context3.next = 17;
                            break;
                        }

                        config = _step2.value;
                        return _context3.delegateYield(_loop(config), "t0", 14);

                    case 14:
                        _iteratorNormalCompletion2 = true;
                        _context3.next = 11;
                        break;

                    case 17:
                        _context3.next = 23;
                        break;

                    case 19:
                        _context3.prev = 19;
                        _context3.t1 = _context3["catch"](9);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context3.t1;

                    case 23:
                        _context3.prev = 23;
                        _context3.prev = 24;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 26:
                        _context3.prev = 26;

                        if (!_didIteratorError2) {
                            _context3.next = 29;
                            break;
                        }

                        throw _iteratorError2;

                    case 29:
                        return _context3.finish(26);

                    case 30:
                        return _context3.finish(23);

                    case 31:
                        if (!(appName === "SCIM")) {
                            _context3.next = 38;
                            break;
                        }

                        filter = {
                            $and: [{ listName: "config" }, { code: { $in: ["appinspectiontype", "appweathercondition", "appmpinput", "apptraversetrack", "appinspectiontype", "appdefaultasset", "appraildirection"] } }]
                        };
                        update = { $set: { opt2: false } };
                        _context3.next = 36;
                        return ApplicationLookupsModel.updateMany(filter, update, function (err, doc) {
                            if (err) {
                                console.log("Error updating config for SCIM: " + err);
                            }
                        });

                    case 36:
                        _context3.next = 43;
                        break;

                    case 38:
                        if (!(appName === "TIMPS")) {
                            _context3.next = 43;
                            break;
                        }

                        _filter = {
                            $and: [{ listName: "config" }, { code: { $in: ["appinspectiontype", "appweathercondition", "appmpinput", "apptraversetrack", "appinspectiontype", "appdefaultasset", "appraildirection"] } }]
                        };
                        _update = { $set: { opt2: true } };
                        _context3.next = 43;
                        return ApplicationLookupsModel.updateMany(_filter, _update, function (err, doc) {
                            if (err) {
                                console.log("Error updating config for TIMPS: " + err);
                            }
                        });

                    case 43:
                        _context3.next = 45;
                        return applyHiddenConfig(appName);

                    case 45:
                        _context3.next = 47;
                        return checkAndUpdateConfigDescription(["issueResolveRemedialAction", "appraildirection", "traversby"]);

                    case 47:
                        _context3.next = 49;
                        return updateIndividualConfigurations([{ listName: "config", code: "issueResolveRemedialAction", compare: "opt2" }]);

                    case 49:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee2, this, [[9, 19, 23, 31], [24,, 26, 30]]);
    }));

    return function updateConfigurations(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var checkAndUpdateConfigDescription = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(configlist) {
        var _this2 = this;

        var configsToMod, _loop2, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, cfg;

        return _regenerator2.default.wrap(function _callee3$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        if (!(configlist && configlist.length)) {
                            _context5.next = 31;
                            break;
                        }

                        _context5.next = 3;
                        return ApplicationLookupsModel.find({ listName: "config", code: { $in: configlist } });

                    case 3:
                        configsToMod = _context5.sent;

                        if (!(configsToMod && configsToMod.length)) {
                            _context5.next = 31;
                            break;
                        }

                        _loop2 = /*#__PURE__*/_regenerator2.default.mark(function _loop2(cfg) {
                            var defCfg;
                            return _regenerator2.default.wrap(function _loop2$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:
                                            defCfg = appLookupConfigurations.find(function (c) {
                                                return c.code === cfg.code;
                                            });

                                            if (!(defCfg && defCfg.description != cfg.description)) {
                                                _context4.next = 6;
                                                break;
                                            }

                                            cfg.description = defCfg.description;
                                            cfg.markModified("description");
                                            _context4.next = 6;
                                            return cfg.save();

                                        case 6:
                                        case "end":
                                            return _context4.stop();
                                    }
                                }
                            }, _loop2, _this2);
                        });
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context5.prev = 9;
                        _iterator3 = configsToMod[Symbol.iterator]();

                    case 11:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context5.next = 17;
                            break;
                        }

                        cfg = _step3.value;
                        return _context5.delegateYield(_loop2(cfg), "t0", 14);

                    case 14:
                        _iteratorNormalCompletion3 = true;
                        _context5.next = 11;
                        break;

                    case 17:
                        _context5.next = 23;
                        break;

                    case 19:
                        _context5.prev = 19;
                        _context5.t1 = _context5["catch"](9);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context5.t1;

                    case 23:
                        _context5.prev = 23;
                        _context5.prev = 24;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 26:
                        _context5.prev = 26;

                        if (!_didIteratorError3) {
                            _context5.next = 29;
                            break;
                        }

                        throw _iteratorError3;

                    case 29:
                        return _context5.finish(26);

                    case 30:
                        return _context5.finish(23);

                    case 31:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee3, this, [[9, 19, 23, 31], [24,, 26, 30]]);
    }));

    return function checkAndUpdateConfigDescription(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var applyHiddenConfig = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(appName) {
        var hiddenConfigs, filter, update, _filter2, _update2, hiddenconfigcodes, configsToHide, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, cfsth;

        return _regenerator2.default.wrap(function _callee4$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        hiddenConfigs = appLookupConfigurations.filter(function (c) {
                            return c.opt1.hide;
                        });

                        if (!(appName === 'SCIM')) {
                            _context6.next = 8;
                            break;
                        }

                        filter = {
                            $and: [{ listName: "config" }, { code: { $in: ["appraildirection", "appdefaultasset", "appinspectiontype", "postsign", "distancesign", "temperaturesign", "traversby"] } }]
                        };
                        update = { $set: { 'opt1.hide': true } };
                        _context6.next = 6;
                        return ApplicationLookupsModel.updateMany(filter, update, function (err, doc) {
                            if (err) {
                                console.log("Error updating config for SCIM config update: " + err);
                            }
                        });

                    case 6:
                        _context6.next = 16;
                        break;

                    case 8:
                        // For hiding the Sign configs
                        _filter2 = {
                            $and: [{ listName: "config" }, { code: { $in: ["postsign", "distancesign", "temperaturesign"] } }]
                        };
                        _update2 = { $set: { 'opt1.hide': true } };
                        _context6.next = 12;
                        return ApplicationLookupsModel.updateMany(_filter2, _update2, function (err, doc) {
                            if (err) {
                                console.log("Error updating config for TIMPS config update: " + err);
                            }
                        });

                    case 12:
                        // For displaying configs for TIMPS
                        _filter2 = {
                            $and: [{ listName: "config" }, { code: { $in: ["appraildirection", "appdefaultasset", "appinspectiontype", "traversby"] } }]
                        };
                        _update2 = { $set: { 'opt1.hide': false } };
                        _context6.next = 16;
                        return ApplicationLookupsModel.updateMany(_filter2, _update2, function (err, doc) {
                            if (err) {
                                console.log("Error updating config for TIMPS config update: " + err);
                            }
                        });

                    case 16:
                        if (!hiddenConfigs.length) {
                            _context6.next = 50;
                            break;
                        }

                        hiddenconfigcodes = hiddenConfigs.map(function (hc) {
                            return hc.code;
                        });
                        _context6.next = 20;
                        return ApplicationLookupsModel.find({ listName: "config", code: { $in: hiddenconfigcodes }, $or: [{ "opt1.hide": { $exists: false } }, { "opt1.hide": false }] });

                    case 20:
                        configsToHide = _context6.sent;

                        if (!(configsToHide && configsToHide.length)) {
                            _context6.next = 50;
                            break;
                        }

                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context6.prev = 25;
                        _iterator4 = configsToHide[Symbol.iterator]();

                    case 27:
                        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                            _context6.next = 36;
                            break;
                        }

                        cfsth = _step4.value;

                        cfsth.opt1.hide = true;
                        cfsth.markModified("opt1");
                        _context6.next = 33;
                        return cfsth.save();

                    case 33:
                        _iteratorNormalCompletion4 = true;
                        _context6.next = 27;
                        break;

                    case 36:
                        _context6.next = 42;
                        break;

                    case 38:
                        _context6.prev = 38;
                        _context6.t0 = _context6["catch"](25);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context6.t0;

                    case 42:
                        _context6.prev = 42;
                        _context6.prev = 43;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 45:
                        _context6.prev = 45;

                        if (!_didIteratorError4) {
                            _context6.next = 48;
                            break;
                        }

                        throw _iteratorError4;

                    case 48:
                        return _context6.finish(45);

                    case 49:
                        return _context6.finish(42);

                    case 50:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee4, this, [[25, 38, 42, 50], [43,, 45, 49]]);
    }));

    return function applyHiddenConfig(_x5) {
        return _ref4.apply(this, arguments);
    };
}();
//
// provide this function array of {listName:'', code:'', compare:''}
// listName and code identifies the unique entry
// compare contains the field to match, if match fails, the entry will be updated
//


var updateIndividualConfigurations = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(list) {
        var _this3 = this;

        var _loop3, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, l2u, _ret3;

        return _regenerator2.default.wrap(function _callee5$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        if (!(list && list.length)) {
                            _context8.next = 30;
                            break;
                        }

                        _loop3 = /*#__PURE__*/_regenerator2.default.mark(function _loop3(l2u) {
                            var item2u, item2compare, f1, f2;
                            return _regenerator2.default.wrap(function _loop3$(_context7) {
                                while (1) {
                                    switch (_context7.prev = _context7.next) {
                                        case 0:
                                            if (!(!l2u.listName || !l2u.code || !l2u.compare)) {
                                                _context7.next = 2;
                                                break;
                                            }

                                            return _context7.abrupt("return", "continue");

                                        case 2:
                                            _context7.next = 4;
                                            return ApplicationLookupsModel.findOne({ listName: l2u.listName, code: l2u.code }).exec();

                                        case 4:
                                            item2u = _context7.sent;
                                            item2compare = appLookupConfigurations.find(function (a) {
                                                return a.listName === l2u.listName && a.code === l2u.code;
                                            });

                                            if (!(item2u && item2u[l2u.compare] !== undefined && item2compare && item2compare[l2u.compare] !== undefined)) {
                                                _context7.next = 19;
                                                break;
                                            }

                                            f1 = item2u[l2u.compare];
                                            f2 = item2compare[l2u.compare];
                                            _context7.prev = 9;

                                            if (!(JSON.stringify(f1) !== JSON.stringify(f2))) {
                                                _context7.next = 15;
                                                break;
                                            }

                                            item2u[l2u.compare] = item2compare[l2u.compare];
                                            item2u.markModified(l2u.compare);
                                            _context7.next = 15;
                                            return item2u.save();

                                        case 15:
                                            _context7.next = 19;
                                            break;

                                        case 17:
                                            _context7.prev = 17;
                                            _context7.t0 = _context7["catch"](9);

                                        case 19:
                                        case "end":
                                            return _context7.stop();
                                    }
                                }
                            }, _loop3, _this3, [[9, 17]]);
                        });
                        _iteratorNormalCompletion5 = true;
                        _didIteratorError5 = false;
                        _iteratorError5 = undefined;
                        _context8.prev = 5;
                        _iterator5 = list[Symbol.iterator]();

                    case 7:
                        if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                            _context8.next = 16;
                            break;
                        }

                        l2u = _step5.value;
                        return _context8.delegateYield(_loop3(l2u), "t0", 10);

                    case 10:
                        _ret3 = _context8.t0;

                        if (!(_ret3 === "continue")) {
                            _context8.next = 13;
                            break;
                        }

                        return _context8.abrupt("continue", 13);

                    case 13:
                        _iteratorNormalCompletion5 = true;
                        _context8.next = 7;
                        break;

                    case 16:
                        _context8.next = 22;
                        break;

                    case 18:
                        _context8.prev = 18;
                        _context8.t1 = _context8["catch"](5);
                        _didIteratorError5 = true;
                        _iteratorError5 = _context8.t1;

                    case 22:
                        _context8.prev = 22;
                        _context8.prev = 23;

                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }

                    case 25:
                        _context8.prev = 25;

                        if (!_didIteratorError5) {
                            _context8.next = 28;
                            break;
                        }

                        throw _iteratorError5;

                    case 28:
                        return _context8.finish(25);

                    case 29:
                        return _context8.finish(22);

                    case 30:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee5, this, [[5, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function updateIndividualConfigurations(_x6) {
        return _ref5.apply(this, arguments);
    };
}();

var _dbHelperMethods = require("../dbFunctions/dbHelperMethods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApplicationLookupsModel = require("../../../api/ApplicationLookups/ApplicationLookups.model");

var appLookupConfigurations = [{
    tenantId: "ps19",
    listName: "config",
    code: "switchAlertDaysBeforeMonthEnd",
    description: "Switch Alert Days",
    opt1: { type: "number", placeholder: "Days before month switch state should be alert", cols: 12, group: "Common", sortid: 1, hide: true },
    opt2: 7
}, {
    tenantId: "ps19",
    listName: "config",
    code: "mpstart",
    description: "Milepost Start Limit",
    opt1: { type: "number", placeholder: "Start", cols: 12, group: "Common", sortid: 2 },
    opt2: 0
}, {
    tenantId: "ps19",
    listName: "config",
    code: "mpend",
    description: "Milepost End Limit",
    opt1: { type: "number", placeholder: "End", cols: 12, group: "Common", sortid: 3 },
    opt2: 2000
}, {
    tenantId: "ps19",
    listName: "config",
    code: "mpprefix",
    description: "Milepost Prefix",
    opt1: { type: "text", placeholder: "Prefix", cols: 12, hide: true, group: "Common", sortid: 4 },
    opt2: ""
}, {
    tenantId: "ps19",
    listName: "config",
    code: "temperaturesign",
    description: "Use the temperature sign i.e (F: Fahrenheit, C: Celsius)",
    opt1: {
        type: "select",
        placeholder: "",
        options: ["F", "C"],
        cols: 12,
        group: "Units", sortid: 5
    },
    opt2: "F"
}, {
    tenantId: "ps19",
    listName: "config",
    code: "distancesign",
    description: "Use the distance sign i.e (M: Miles, K: Kilometers)",
    opt1: {
        type: "select",
        placeholder: "",
        options: ["M", "K"],
        cols: 12,
        group: "Units", sortid: 6
    },
    opt2: "M"
}, {
    tenantId: "ps19",
    listName: "config",
    code: "postsign",
    description: "Use the sign posts i.e (MP: Milepost, KP: Kilometre Post)",
    opt1: {
        type: "select",
        placeholder: "",
        options: ["MP", "KP"],
        cols: 12,
        group: "Units", sortid: 7
    },
    opt2: "MP"
}, {
    tenantId: "ps19",
    listName: "config",
    code: "weekstartday",
    description: "Start Of Week",
    opt1: {
        type: "select",
        placeholder: "",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        cols: 12,
        group: "Scheduling", sortid: 8
    },
    opt2: "Monday"
}, {
    tenantId: "ps19",
    listName: "config",
    code: "appmpinput",
    description: "Force Input Start/End Milepost on Mobile App",
    opt1: { type: "bool", cols: 12, group: "Mobile App", sortid: 9, hide: true },
    opt2: true
}, {
    tenantId: "ps19",
    listName: "config",
    code: "apptraversetrack",
    description: "Force Input Traverse Track on Mobile App",
    opt1: { type: "bool", cols: 12, group: "Mobile App", sortid: 10, hide: true },
    opt2: true
}, {
    tenantId: "ps19",
    listName: "config",
    code: "issueResolveRemedialAction",
    description: "Ignore Remedial Action From Mobile App", //"Review Remedial Action Before Resolving Issue",
    opt1: { type: "bool", cols: 12, group: "Common", sortid: 11, hide: true },
    opt2: false
}, {
    tenantId: "ps19",
    listName: "config",
    code: "holidays",
    description: "Holidays",
    opt1: { type: "date", cols: 12, group: "Common", sortid: 18, hide: true },
    opt2: []
}, {
    tenantId: "ps19",
    listName: "config",
    code: "weekdays",
    description: "Working Week days",
    opt1: {
        type: "AssetSelection",
        cols: 12,
        showHeadersLabels: true,
        opt1headerTitle: "Working Week Days",
        opt2headerTitle: "Off Week Days",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        group: "Scheduling", sortid: 12
    },
    opt2: []
}, {
    tenantId: "ps19",
    listName: "config",
    code: "apptaskviewbypass",
    description: "Force app to use single clock for Inspection",
    opt1: {
        type: "bool",
        cols: 12,
        group: "Mobile App", sortid: 13
    },
    opt2: false
}, {
    tenantId: "ps19",
    listName: "config",
    code: "appraildirection",
    description: "Allow selection of rail direction in Mobile app (if available)",
    opt1: {
        type: "bool",
        cols: 12,
        group: "Mobile App", sortid: 14
    },
    opt2: true
}, {
    tenantId: "ps19",
    listName: "config",
    code: "appdefaultasset",
    description: "Force Mobile app to select Main Track as default asset",
    opt1: {
        type: "bool",
        cols: 12,
        group: "Mobile App", sortid: 15
    },
    opt2: true
}, {
    tenantId: "ps19",
    listName: "config",
    code: "appinspectiontype",
    description: "Allow Inspector to select Inspection type before starting",
    opt1: {
        type: "bool",
        cols: 12,
        group: "Mobile App", sortid: 16
    },
    opt2: true
}, {
    tenantId: "ps19",
    listName: "config",
    code: "appweathercondition",
    description: "Allow inspector to add weather condition before starting inspection",
    opt1: {
        type: "bool",
        cols: 12,
        group: "Mobile App", sortid: 17, hide: true
    },
    opt2: true
}, {
    tenantId: "ps19",
    listName: "config",
    code: "traversby",
    description: "Default traverse by",
    opt1: {
        type: "select",
        placeholder: "",
        options: ["Hi-Rail", "Walking"],
        cols: 12,
        group: "Mobile App",
        sortid: 18
    },
    opt2: "Hi-Rail"
}];