"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateOrAddIfNotExist = exports.renameField = exports.update = exports.addIfNotExist = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var addIfNotExist = exports.addIfNotExist = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(model, criteria, newEntry) {
    var entry;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (model) {
              _context.next = 3;
              break;
            }

            console.log("model not valid, exitting");
            return _context.abrupt("return");

          case 3:
            if (!(!criteria || criteria == {})) {
              _context.next = 6;
              break;
            }

            console.log("Only one entry should be added, provide criteria");
            return _context.abrupt("return");

          case 6:
            if (newEntry) {
              _context.next = 9;
              break;
            }

            console.log("Entry to add is null");
            return _context.abrupt("return");

          case 9:
            _context.prev = 9;
            _context.next = 12;
            return model.findOne(criteria).exec();

          case 12:
            entry = _context.sent;

            if (entry) {
              _context.next = 17;
              break;
            }

            console.log("adding entry ", newEntry);
            _context.next = 17;
            return model.create(newEntry);

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](9);

            console.log("addIfNotExist in dbHelperMethods.js, err:", _context.t0.toString());

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 19]]);
  }));

  return function addIfNotExist(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var update = exports.update = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(model, query, key, value) {
    var rec;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return model.findOne(query);

          case 3:
            rec = _context2.sent;

            if (rec) {
              rec[key] = value;
              rec.save(function (v) {
                console.log("Seed: done update", model.modelName, "set", key, "=", value, "where", query);
              });
            }
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            console.log("udpate ", model ? model.modelName ? model.modelName : "bad Model" : "null model", " caugth error: ", _context2.t0.toString());

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function update(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var renameField = exports.renameField = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(model, criteria, renameObject) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // this function change field name for existing data
            // db.getCollection('maintenances').updateMany({},{$rename: {"mwoNumber": "mrNumber"}})
            try {
              //let r =  await model.updateMany(criteria, {$rename: {oldName, newName}});
              model.update(criteria, { $rename: renameObject }, { multi: true }, function (err, blocks) {
                if (err) {
                  console.log(err.toString());
                  return;
                }
                console.log("rename ", model.modelName, "field: ", renameObject);
              });
            } catch (err) {
              console.log("renameField in dbHelperMethods.js, err:", err.toString());
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function renameField(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var UpdateOrAddIfNotExist = exports.UpdateOrAddIfNotExist = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(model, criteria, newEntry, updateCriteria) {
    var entry;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (model) {
              _context4.next = 3;
              break;
            }

            console.log("model not valid, exiting");
            return _context4.abrupt("return");

          case 3:
            if (!(!criteria || criteria == {})) {
              _context4.next = 6;
              break;
            }

            console.log("Only one entry should be added, provide criteria");
            return _context4.abrupt("return");

          case 6:
            if (newEntry) {
              _context4.next = 9;
              break;
            }

            console.log("Entry to add is null");
            return _context4.abrupt("return");

          case 9:
            _context4.prev = 9;
            entry = null;
            _context4.next = 13;
            return model.findOne(criteria).exec();

          case 13:
            entry = _context4.sent;

            if (!(!entry && updateCriteria)) {
              _context4.next = 18;
              break;
            }

            _context4.next = 17;
            return model.findOneAndUpdate(updateCriteria, newEntry);

          case 17:
            entry = _context4.sent;

          case 18:
            if (entry) {
              _context4.next = 21;
              break;
            }

            _context4.next = 21;
            return model.create(newEntry);

          case 21:
            _context4.next = 26;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](9);

            console.log("UpdateOrAddIfNotExist in dbHelperMethods.js, err:", _context4.t0.toString());

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[9, 23]]);
  }));

  return function UpdateOrAddIfNotExist(_x11, _x12, _x13, _x14) {
    return _ref4.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }