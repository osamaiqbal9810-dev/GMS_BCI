"use strict";

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyPlan = require("./journeyPlan.model");
var ServiceLocator = require("../../../framework/servicelocator");

// async function getplanController(req, res, next) {
//   JourneyPlan.find().exec(async function(err, plan) {
//     let plans = await getplans(req.user, plan);
//     if (err) {
//       return handleError(res, err);
//     }
//     res.status(200);
//     res.json(plans);
//   });
// }
exports.multiLine = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var joureyPlanService, resultObj, lines;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            joureyPlanService = ServiceLocator.resolve("JourneyPlanService");
            resultObj = { status: 500, errorVal: "default" };
            lines = [];

            if (req.query.lines) {
              lines = JSON.parse(req.query.lines);
            }
            _context.prev = 4;
            _context.next = 7;
            return joureyPlanService.multiLinePlans(lines);

          case 7:
            resultObj = _context.sent;
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);

            resultObj.status = 500;
            resultObj.errorVal = _context.t0.toString();
            console.log("catch", _context.t0.toString());

          case 15:

            res.status(resultObj.status);
            if (resultObj.value) res.json(resultObj.value);else res.json(resultObj.errorVal);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.all = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var joureyPlanService, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            joureyPlanService = ServiceLocator.resolve("JourneyPlanService");
            _context2.next = 3;
            return joureyPlanService.getJourneyPlansAll(req.user, req.query);

          case 3:
            result = _context2.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.report = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var joureyPlanService, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            joureyPlanService = ServiceLocator.resolve("JourneyPlanService");
            _context3.next = 3;
            return joureyPlanService.getJourneyPlansFind(req.user, req.query);

          case 3:
            result = _context3.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getIssues = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var journeyPlansService, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            journeyPlansService = ServiceLocator.resolve("JourneyPlanService");
            _context4.next = 3;
            return journeyPlansService.getAllIssues(req.query);

          case 3:
            result = _context4.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

// async function getplans(user, plans) {
//   let filteredWorkPlans = [];
//   let adminCheck = user.isAdmin;
//   let subdivisionUser = user.subdivision;
//   if (!adminCheck && subdivisionUser) {
//     var jplan;
//     for (jplan in plans) {
//       let checkplan = plans[jplan];
//       let UserModel = ServiceLocator.resolve("userModel");
//       let userFound = await UserModel.findOne({ _id: checkplan.user.id }).exec();
//       if (userFound) {
//         if (subdivisionUser == userFound.subdivision) {
//           filteredWorkPlans.push(checkplan);
//         }
//       }
//     }
//   } else {
//     filteredWorkPlans = plans;
//   }
//   return filteredWorkPlans;
// }

exports.find = function (req, res, next) {
  JourneyPlan.findOne({ _id: req.params.id }).exec(function (err, plan) {
    if (err) {
      return handleError(res, err);
    }
    if (!plan) {
      res.status(404);
      return res.send("Plan not found");
    }
    res.status(200);
    return res.json(plan._doc);
  });
};

exports.create = function (req, res, next) {
  console.log(req.body.journeyPlan);
  var newJourneyPlan = new JourneyPlan(req.body.journeyPlan);
  newJourneyPlan.supervisor = req.user._id;
  newJourneyPlan.save(function (err, plan) {
    if (err) return handleError(res, err);
    res.status(200);
    return res.json(plan);
  });
};
exports.update = function (req, res, next) {
  JourneyPlan.findOne({ _id: req.params.id }).exec(function (err, plan) {
    if (err) {
      return handleError(res, err);
    }
    plan.user = req.body.user;
    plan.date = req.body.date;
    plan.title = req.body.title;
    // plan.tasks = req.body.tasks;
    plan.subdivision = req.body.subdivision;
    if (plan.tasks && plan.tasks.length > 0 && req.body.tasks && req.body.tasks.length > 0) {
      plan.tasks[0].includeInFRAReport = req.body.tasks[0].includeInFRAReport;
      plan.markModified('tasks');
    }
    plan.save(function (err, plan) {
      if (err) {
        return next(err);
      }
      res.status(200);
      return res.json(plan);
    });
  });
};
exports.delete = function (req, res, next) {
  JourneyPlan.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      return handleError(res, err);
    }
    res.status(200);
    return res.json(true);
  });
};

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}

exports.updateIssue = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var joureyPlanService, result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            joureyPlanService = ServiceLocator.resolve("JourneyPlanService");
            _context5.next = 3;
            return joureyPlanService.updateIssue(req.body.issuesReport, req.user);

          case 3:
            result = _context5.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500)) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.send(result.errorVal));

          case 7:
            res.json(result.value);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.issueWorkorder = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    var joureyPlanService, workorderService, _req$body, issuesReport, workorder, result, _issuesReport$issue$i, _issuesReport$issue$i2, jIndex, tIndex, iIndex, mrNumber, woResult;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            joureyPlanService = ServiceLocator.resolve("JourneyPlanService");
            workorderService = ServiceLocator.resolve("WorkOrderService");
            _req$body = req.body, issuesReport = _req$body.issuesReport, workorder = _req$body.workorder;
            _context6.next = 5;
            return joureyPlanService.updateIssue(issuesReport, req.user);

          case 5:
            result = _context6.sent;
            _issuesReport$issue$i = issuesReport.issue.index.split("-"), _issuesReport$issue$i2 = (0, _slicedToArray3.default)(_issuesReport$issue$i, 3), jIndex = _issuesReport$issue$i2[0], tIndex = _issuesReport$issue$i2[1], iIndex = _issuesReport$issue$i2[2];
            mrNumber = result.value.tasks[tIndex].issues[iIndex].mrNumber;

            if (mrNumber) workorder.maintenanceRequests.push(mrNumber);

            _context6.next = 11;
            return workorderService.create(workorder, req.user);

          case 11:
            woResult = _context6.sent;

            res.status(result.status);

            if (!(result.errorVal && result.status == 500 || woResult.errorVal && woResult.status == 500)) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", res.send(result.errorVal));

          case 15:
            res.json({ issueReport: result.value, workorder: woResult.value });

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();