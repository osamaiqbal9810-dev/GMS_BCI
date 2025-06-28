/**
 * Created by zqureshi on 11/8/2017.
 */
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

var _turf = require("@turf/turf");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();
var User = require("../../api/user/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../../config/environment/index");
var tenantInfo = require("../../utilities/tenantInfo");
var ServiceLocator = require("../../framework/servicelocator");


var loginUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var tenantId;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = tenantInfo.getTenantId(req.hostname);

            //console.log(tenantId);
            //let user= await User.findOne({tenantId:'ps19'}).populate({path:'userGroup',populate :{path: 'permissions'}}).exec();

            User.findOne({ tenantId: tenantId, email: req.body.user.email }, function (err, result) {
              var _this = this;

              if (err) return res.send({ "Error on the server.": err });
              if (!result) {
                res.status(403);
                return res.send("No user found.");
              }
              if (result.isRemoved) {
                res.status(404);
                return res.send("No user found.");
              }
              if (!result.active) {
                res.status(403);
                return res.send("User is not active");
              }
              var passwordIsValid = bcrypt.compareSync(req.body.user.password, result.hashedPassword);
              
              if (!passwordIsValid) {
                res.status(401);
                return res.send("Invalid Password");
              }
              var token = jwt.sign({ userId: result._id }, config.secrets.session, {
                //   expiresIn: 86400, // expires in 24 hours
              });
              var userHoursModel = ServiceLocator.resolve("UserHours");

              //===== result.userHours will not work becuase userHours attribute not added in user model =====//
              userHoursModel.findOne({ userId: result._id }, function (err, userHoursDoc) {
                if (userHoursDoc) {
                  result.userHours = userHoursDoc;
                }

                var AssetsModel = ServiceLocator.resolve("AssetsModel");

                AssetsModel.findOne({ _id: result.assignedLocation }, function () {
                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, assignedLocation) {
                    var notificationService, notifications;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (assignedLocation) {
                              result.assignedLocationName = assignedLocation.unitId;
                            }

                            // Pull user notifications
                            notificationService = ServiceLocator.resolve("NotificationService");
                            _context.next = 4;
                            return notificationService.pullNotificationForUser(result._id);

                          case 4:
                            notifications = _context.sent;
                            return _context.abrupt("return", res.send({ result: result, token: token, notifications: notifications }));

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x4, _x5) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              });

              //return res.send({result, token, permissions: permitTypes});
            }).populate({
              path: "userGroup",
              select: ["name", "isAdmin", "level", "group_id"],
              populate: { path: "permissions", select: ["resource", "action", "name"] }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function loginUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

router.post("/", loginUser);
module.exports = router;