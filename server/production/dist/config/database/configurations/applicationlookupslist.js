"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateApplicationLookups = exports.deleteApplicationLookups = exports.createApplicationLookups = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createApplicationLookups = exports.createApplicationLookups = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, al;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = listOfAppLookups[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 12;
              break;
            }

            al = _step.value;
            _context.next = 9;
            return (0, _dbHelperMethods.addIfNotExist)(ApplicationLookupsModel, { listName: al.listName, code: al.code }, al);

          case 9:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:

            (0, _languageSeed.dynamicLanguageToDB)();

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function createApplicationLookups() {
    return _ref.apply(this, arguments);
  };
}();

var deleteApplicationLookups = exports.deleteApplicationLookups = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(list) {
    var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, l2d;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(list && list.length)) {
              _context2.next = 30;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 4;
            _iterator2 = list[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 16;
              break;
            }

            l2d = _step2.value;

            if (!(!l2d.listName || !l2d.code)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("continue", 13);

          case 10:
            console.log("attempting to delete applicaitonlookup: listname:", l2d.listName, "code:", l2d.code);
            _context2.next = 13;
            return ApplicationLookupsModel.deleteOne({ listName: l2d.listName, code: l2d.code });

          case 13:
            _iteratorNormalCompletion2 = true;
            _context2.next = 6;
            break;

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 22:
            _context2.prev = 22;
            _context2.prev = 23;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 25:
            _context2.prev = 25;

            if (!_didIteratorError2) {
              _context2.next = 28;
              break;
            }

            throw _iteratorError2;

          case 28:
            return _context2.finish(25);

          case 29:
            return _context2.finish(22);

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
  }));

  return function deleteApplicationLookups(_x) {
    return _ref2.apply(this, arguments);
  };
}();

//
// provide this function array of {listName:'', code:'', compare:''}
// listName and code identifies the unique entry
// compare contains the field to match, if match fails, the entry will be updated
//


var updateApplicationLookups = exports.updateApplicationLookups = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(list) {
    var _this = this;

    var _loop, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, l2u, _ret;

    return _regenerator2.default.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(list && list.length)) {
              _context4.next = 30;
              break;
            }

            _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(l2u) {
              var item2u, item2compare, f1, f2;
              return _regenerator2.default.wrap(function _loop$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!(!l2u.listName || !l2u.code || !l2u.compare)) {
                        _context3.next = 2;
                        break;
                      }

                      return _context3.abrupt("return", "continue");

                    case 2:
                      _context3.next = 4;
                      return ApplicationLookupsModel.findOne({ listName: l2u.listName, code: l2u.code }).exec();

                    case 4:
                      item2u = _context3.sent;
                      item2compare = listOfAppLookups.find(function (a) {
                        return a.listName === l2u.listName && a.code === l2u.code;
                      });

                      if (!(item2u && item2u[l2u.compare] !== undefined && item2compare && item2compare[l2u.compare] !== undefined)) {
                        _context3.next = 19;
                        break;
                      }

                      ////if(item2u && item2u[l2u.compare] && item2compare && item2compare[l2u.compare])
                      f1 = item2u[l2u.compare];
                      f2 = item2compare[l2u.compare];
                      _context3.prev = 9;

                      if (!(JSON.stringify(f1) !== JSON.stringify(f2))) {
                        _context3.next = 15;
                        break;
                      }

                      item2u[l2u.compare] = item2compare[l2u.compare];
                      item2u.markModified(l2u.compare);
                      _context3.next = 15;
                      return item2u.save();

                    case 15:
                      _context3.next = 19;
                      break;

                    case 17:
                      _context3.prev = 17;
                      _context3.t0 = _context3["catch"](9);

                    case 19:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _loop, _this, [[9, 17]]);
            });
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context4.prev = 5;
            _iterator3 = list[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context4.next = 16;
              break;
            }

            l2u = _step3.value;
            return _context4.delegateYield(_loop(l2u), "t0", 10);

          case 10:
            _ret = _context4.t0;

            if (!(_ret === "continue")) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("continue", 13);

          case 13:
            _iteratorNormalCompletion3 = true;
            _context4.next = 7;
            break;

          case 16:
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t1 = _context4["catch"](5);
            _didIteratorError3 = true;
            _iteratorError3 = _context4.t1;

          case 22:
            _context4.prev = 22;
            _context4.prev = 23;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 25:
            _context4.prev = 25;

            if (!_didIteratorError3) {
              _context4.next = 28;
              break;
            }

            throw _iteratorError3;

          case 28:
            return _context4.finish(25);

          case 29:
            return _context4.finish(22);

          case 30:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, this, [[5, 18, 22, 30], [23,, 25, 29]]);
  }));

  return function updateApplicationLookups(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var _languageSeed = require("../../../dynamicLanguage/languageSeed");

var _dbHelperMethods = require("../dbFunctions/dbHelperMethods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApplicationLookupsModel = require("../../../api/ApplicationLookups/ApplicationLookups.model");

function getHtmlForTable(i) {
  if (i == 0 || i == 1) {
    return '<!DOCTYPE html><html lang="en"><head>  <title>Remedial Action Table</title>  <meta charset="utf-8">  <meta name="viewport" content="width=device-width, initial-scale=1">  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script><style>.center {  text-align: center;}p {font-size:17px;line-height:1.6;margin-bottom:20px;margin-left:5px;margin-right:5px;}</style></head><body><div class="container p-3 my-3 border">  <h2>Remedial Action Table</h2>  <table class="table table-hover" border=1>    <thead>      <tr><th rowspan=2 class="center">Defect</th><th colspan=2 class="center">Lenth of defect (inch(es))</th><th colspan=2 class="center">Percentage of existing rail head cross-sectional area</th><th rowspan=2 class="center">if the defective rail is not replaces or repaired, take the remedial action</th>      </tr>      <tr><th class="center">More than</th><th class="center">But not more than</th><th class="center">Less than</th><th class="center">But not less than</th>      </tr>    </thead>    <tbody>      <tr><td>Compound Fissure</td><td></td><td></td><td>70</td><td>5</td><td>B.</td>      </tr>      <tr><td></td><td></td><td></td><td>100</td><td>70</td><td>A2.</td>      </tr>      <tr><td></td><td></td><td></td><td></td><td>100</td><td>A.</td>      </tr><tr><td>Transverse Fissure</td><td></td><td></td><td>25</td><td>5</td><td>C.</td>      </tr><tr><td>Detail Fracture</td><td></td><td></td><td>60</td><td>25</td><td>D.</td>      </tr><tr><td>Engine Burn Fracture</td><td></td><td></td><td>100</td><td>60</td><td>A2, or [E and H]</td>      </tr><tr><td>Defective Weld</td><td></td><td></td><td></td><td>100</td><td>A, or [E and H].</td>      </tr><tr><td>Bolt Hole Crack</td><td>3/4</td><td>1</td><td></td><td></td><td>H and F.</td>      </tr><tr><td> </td><td>1</td><td>1 1/2</td><td></td><td></td><td>H and G.</td>      </tr><tr><td> </td><td>1</td><td></td><td></td><td></td><td>B.</td>      </tr><tr><td> </td><td>1 1/2</td><td></td><td></td><td></td><td></td>      </tr><tr><td> </td><td>(1)</td><td>(1)</td><td></td><td></td><td>A.</td>      </tr><tr><td>Broken Base </td><td>1</td><td>6</td><td></td><td></td><td>D.</td>      </tr><tr><td> </td><td>6 2</td><td></td><td></td><td></td><td>A, or [E and I].</td>      </tr><tr><td>Ordinary Break </td><td></td><td></td><td></td><td></td><td>A or E.</td>      </tr><tr><td>Damaged Rail </td><td></td><td></td><td></td><td></td><td>C.</td>      </tr><tr><td>Flattened Rail Crushed Head </td><td>Depth > 3/8 and Length >8</td><td></td><td></td><td></td><td>H.</td>      </tr></tbody>  </table><div><div><p><dt>A.<dl> Assign a person designated under 213.7 to visually supervise each operation over the defective rail.</dl></dt></p><dt>A2. <dl>Assign a person designated under 213.7 to make a visual inspection. After a visual inspection, that persion may authorize operation to continue without continuous visual supervision at a maximum of 10 m.p.h for up to 24 hours prior to another such viual inspection or replacement or repair of the rail.</dl></dt><dt>B. <dl>Limit operating speed over defective rail to that as authorized by a person designated under 213.7 a who has at least one year of supervisory experience in railroad track maintenance The operating speed cannot be over 30 mph or the maximum allowable speed under $213.9 for the class of track concerned whichever is lower </dl></dt><dt>C. <dl>Apply joint bars bolted only through the outermost holes to defect within 20 days after it is determined to continue the track in use In the case of Classes 3 through track limit operating speed over defective rail to 30 mph until joint bars are applied thereafter limit speed to 50 mph or the maximum allowable speed under 213.9 the class of track concerned whichever lower When a search for internal rail defects is conducted under 213.237 and defects are discovered in Classes 3 through 5 which require remedial action C the operating speed shall be limited to 50 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower for a period not to exceed 4 days If the defective rail has not been removed from the track or a permanent repair made within 4 days of the discovery limit operating speed over the defective rail to 30 mph until joint bars are applied thereafter limit speed to 50 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower </dl></dt><dt>D. <dl>Apply joint bars bolted only through the outermost holes to defect within 10 days after it is determined to continue the track in use In the case of Classes 3 through 5 track limit operating speed over the defective rail to 30 mph or less as authorized by a person designated under 213.7 a who has at least one year of supervisory experience in railroad track maintenance until joint bars are applied thereafter limit speed to 50 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower </dl></dt><dt>E. <dl>Apply joint bars to defect and bolt in accordance with 213.121 (d) and (e)</dl> </dt><dt>F <dl>Inspect rail 90 days after it is determined to continue the track in use.</dl></dt><dt>G. <dl>Inspect rail 30 days after it is determined to continue the track in use. </dl></dt><dt>H. <dl>Limit operating speed over defective rail to 50 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower </dl></dt><dt>I. <dl>Limit operating speed over defective rail to 30 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower </dl></dt></div></div></body></html>';
  } else {
    return "";
  }
}
var listOfAppLookups = [
// temperature criteria of sensor with respect to types, opt1 and opt2 as minimum temperature and maximum temperature respectively
{
  tenantId: "ps19",
  listName: "temperatureCriteria",
  code: "default",
  description: "freezer criteria of Temperature",
  opt1: -7,
  opt2: 7
}, {
  tenantId: "ps19",
  listName: "temperatureCriteria",
  code: "freezer",
  description: "freezer criteria of Temperature",
  opt1: -7,
  opt2: 7
}, {
  tenantId: "ps19",
  listName: "temperatureCriteria",
  code: "fridge",
  description: "fridge criteria of Temperature",
  opt1: -7,
  opt2: 7
}, {
  tenantId: "ps19",
  listName: "temperatureCriteria",
  code: "refrigerator",
  description: "refrigerator criteria of Temperature",
  opt1: -7,
  opt2: 7
}, {
  tenantId: "ps19",
  listName: "temperatureCriteria",
  code: "chiller",
  description: "chiller criteria of Temperature",
  opt1: -7,
  opt2: 7
}, { tenantId: "ps19", listName: "temperatureCriteria", code: "rack", description: "rack criteria of Temperature", opt1: -7, opt2: 7 },
// humidity criteria of sensor with respect to types, opt1 and opt2 as minimum humidity and maximum humidity respectively
{
  tenantId: "ps19",
  listName: "humidityCriteria",
  code: "default",
  description: "freezer criteria of humidity",
  opt1: 0,
  opt2: 10
}, {
  tenantId: "ps19",
  listName: "humidityCriteria",
  code: "freezer",
  description: "freezer criteria of humidity",
  opt1: 0,
  opt2: 10
}, {
  tenantId: "ps19",
  listName: "humidityCriteria",
  code: "fridge",
  description: "fridge criteria of humidity",
  opt1: 0,
  opt2: 10
}, {
  tenantId: "ps19",
  listName: "humidityCriteria",
  code: "refrigerator",
  description: "refrigerator criteria of humidity",
  opt1: 0,
  opt2: 10
}, {
  tenantId: "ps19",
  listName: "humidityCriteria",
  code: "chiller",
  description: "chiller criteria of humidity",
  opt1: 0,
  opt2: 10
}, { tenantId: "ps19", listName: "humidityCriteria", code: "rack", description: "rack criteria of humidity", opt1: 0, opt2: 10 },
//alert criteria of sensors with respect to sensor types, opt1 as alert time in seconds
{ tenantId: "ps19", listName: "alertCriteria", code: "default", description: "default criteria of alert's sensors", opt1: 600 }, { tenantId: "ps19", listName: "alertCriteria", code: "freezer", description: "alert criteria of freezer sensors", opt1: 600 }, { tenantId: "ps19", listName: "alertCriteria", code: "fridge", description: "alert criteria of  frridge sensors", opt1: 600 }, { tenantId: "ps19", listName: "alertCriteria", code: "refrigerator", description: "alert criteria of refrigerator sensors", opt1: 600 }, { tenantId: "ps19", listName: "alertCriteria", code: "chiller", description: "alert criteria of chiller sensors", opt1: 600 }, { tenantId: "ps19", listName: "alertCriteria", code: "rack", description: "alert criteria of rack sensors", opt1: 600 },
//warning criteria of sensors with respect to sensor types, opt1 as warning count
{ tenantId: "ps19", listName: "warningCriteria", code: "default", description: "default criteria of warning's sensors", opt1: 3 }, { tenantId: "ps19", listName: "warningCriteria", code: "freezer", description: "freezer criteria of warning's sensors", opt1: 3 }, { tenantId: "ps19", listName: "warningCriteria", code: "fridge", description: "fridge criteria of warning's sensors", opt1: 3 }, {
  tenantId: "ps19",
  listName: "warningCriteria",
  code: "refrigerator",
  description: "refrigerator criteria of warning's sensors",
  opt1: 3
}, { tenantId: "ps19", listName: "warningCriteria", code: "chiller", description: "chiller criteria of warning's sensors", opt1: 3 }, { tenantId: "ps19", listName: "warningCriteria", code: "rack", description: "rack criteria of warning's sensors", opt1: 3 },
//offline criteria of sensors with respect to sensor types, opt1 as offline time in second
{ tenantId: "ps19", listName: "offlineCriteria", code: "default", description: "default criteria of offline's sensors", opt1: 900 }, { tenantId: "ps19", listName: "offlineCriteria", code: "freezer", description: "freezer criteria of offline's sensors", opt1: 900 }, { tenantId: "ps19", listName: "offlineCriteria", code: "fridge", description: "fridge criteria of offline's sensors", opt1: 900 }, {
  tenantId: "ps19",
  listName: "offlineCriteria",
  code: "refrigerator",
  description: "refrigerator criteria of offline's sensors",
  opt1: 900
}, { tenantId: "ps19", listName: "offlineCriteria", code: "chiller", description: "chiller criteria of offline's sensors", opt1: 900 }, { tenantId: "ps19", listName: "offfilneCriteria", code: "rack", description: "rack criteria of offline's sensors", opt1: 900 },
//time limit in hours
{ tenantId: "ps19", listName: "timeLimit", code: "time", description: "time limit for get summary in hours", opt1: 24 }, {
  tenantId: "ps19",
  listName: "batteryThreshold",
  code: "battery",
  description: "battery threshold for battery status good or bad",
  opt1: 2200
}, {
  tenantId: "ps19",
  listName: "defrostThreshold",
  code: "defrost",
  description: "defrost threshold for get defrost cycle",
  opt1: 900 //time in seconds
}, {
  tenantId: "ps19",
  listName: "tempUnit",
  code: "unit",
  description: "temperature units F and C ",
  opt1: "C"
}, {
  tenantId: "ps19",
  listName: "batteryVoltageLevels",
  code: "level1",
  description: "Battery Voltage Levels in mV ",
  opt1: 1,
  opt2: 0,
  opt3: 1000
}, {
  tenantId: "ps19",
  listName: "batteryVoltageLevels",
  code: "level2",
  description: "Battery Voltage Levels in mV ",
  opt1: 2,
  opt2: 1001,
  opt3: 1800
}, {
  tenantId: "ps19",
  listName: "batteryVoltageLevels",
  code: "level3",
  description: "Battery Voltage Levels in mV ",
  opt1: 3,
  opt2: 1801,
  opt3: 2600
}, {
  tenantId: "ps19",
  listName: "batteryVoltageLevels",
  code: "level4",
  description: "Battery Voltage Levels in mV ",
  opt1: 4,
  opt2: 2601,
  opt3: 3000
}, {
  tenantId: "ps19",
  listName: "batteryVoltageLevels",
  code: "level5",
  description: "Battery Voltage Levels in mV ",
  opt1: 5,
  opt2: 3001,
  opt3: 3300
}, {
  tenantId: "ps19",
  listName: "rssiLevels",
  code: "level1",
  description: "Sensor Beacon Rssi Levels",
  opt1: 1,
  opt2: -100,
  opt3: -88
}, {
  tenantId: "ps19",
  listName: "rssiLevels",
  code: "level2",
  description: "Sensor Beacon Rssi Levels",
  opt1: 2,
  opt2: -87,
  opt3: -76
}, {
  tenantId: "ps19",
  listName: "rssiLevels",
  code: "level3",
  description: "Sensor Beacon Rssi Levels",
  opt1: 3,
  opt2: -77,
  opt3: -64
}, {
  tenantId: "ps19",
  listName: "rssiLevels",
  code: "level4",
  description: "Sensor Beacon Rssi Levels",
  opt1: 4,
  opt2: -65,
  opt3: -52
}, {
  tenantId: "ps19",
  listName: "rssiLevels",
  code: "level5",
  description: "Sensor Beacon Rssi Levels",
  opt1: 5,
  opt2: -51,
  opt3: -40
}, {
  tenantId: "ps19",
  listName: "defrostTolerance",
  code: "time",
  description: "defrost Tolerance in minutes",
  opt1: 5
}];