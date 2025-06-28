"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbAnalyzerMethod = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var dbAnalyzerMethod = exports.dbAnalyzerMethod = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(execute, fix, mode, actions) {
    var iterateOn, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, func, report, index, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, singleRes;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!execute) {
              _context.next = 61;
              break;
            }

            console.log("-- Running Database Analyzer --");
            console.log("");
            _context.prev = 3;
            iterateOn = actions ? actions : _dbAnalyzerActions.funcs;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = iterateOn[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 42;
              break;
            }

            func = _step.value;
            _context.next = 14;
            return func.method(func.fix == false || func.fix == true ? func.fix : fix);

          case 14:
            report = _context.sent;

            if (!report.error) {
              _context.next = 19;
              break;
            }

            console.log("Error While Testing " + _analyzerArguments.argsMeaning[func.name] + ": " + report.error);
            _context.next = 39;
            break;

          case 19:
            //  console.log(argsMeaning[func.name] + " : " + report.result + report.fixed ? ", Fixed : " + report.fixed : "");
            //console.log("");
            index = 0;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 23;

            for (_iterator2 = report.resultsArray[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              singleRes = _step2.value;

              singleRes.index += index;
              //  if ((mode == 1 && singleRes.result) || (mode == 2 && !singleRes.result) || !mode) showIndividualReport(singleRes);
            }
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](23);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 34:
            _context.prev = 34;

            if (!_didIteratorError2) {
              _context.next = 37;
              break;
            }

            throw _iteratorError2;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(31);

          case 39:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 42:
            _context.next = 48;
            break;

          case 44:
            _context.prev = 44;
            _context.t1 = _context["catch"](8);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 48:
            _context.prev = 48;
            _context.prev = 49;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 51:
            _context.prev = 51;

            if (!_didIteratorError) {
              _context.next = 54;
              break;
            }

            throw _iteratorError;

          case 54:
            return _context.finish(51);

          case 55:
            return _context.finish(48);

          case 56:
            _context.next = 61;
            break;

          case 58:
            _context.prev = 58;
            _context.t2 = _context["catch"](3);

            console.log("Error performing Analysis on Database : " + _context.t2);

          case 61:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 58], [8, 44, 48, 56], [23, 27, 31, 39], [32,, 34, 38], [49,, 51, 55]]);
  }));

  return function dbAnalyzerMethod(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _dbAnalyzerActions = require("./dbAnalyzerActions");

var _analyzerArguments = require("./analyzerArguments");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showIndividualReport(singleRes) {
  console.log(singleRes.index + " - id: " + singleRes.id + ", name: " + singleRes.name + ", result: " + singleRes.result + singleRes.fixed ? ", Fixed : " + singleRes.fixed : "");
  console.log("");
}