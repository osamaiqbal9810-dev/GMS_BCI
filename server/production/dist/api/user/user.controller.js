"use strict";

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _permissions = require("../../config/permissions");

var permitTypes = _interopRequireWildcard(_permissions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This Controller deals with all functionalities of User
var userService = require("./user.service");
var User = require("./user.model");
var UserGroup = require("../userGroup/userGroup.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var config = require("../../config/environment/index");
var nodemailer = require("nodemailer");
var async = require("async");
//EmailService
var emailService = require("../../service/EmailService");
var isAllowed = require("../../middlewares/validatePermission");
var _ = require("lodash");
var tenantInfo = require("../../utilities/tenantInfo");
var ServiceLocator = require("../../framework/servicelocator");
// Permission registration
// End
//var permitTypes= require('../../config/permissions').default;
//let permissions = require("../permission/permission.controller");
/* permissions.register({
    user: [permitTypes.CREATE_USER, permitTypes.READ_USER, permitTypes.UPDATE_USER, permitTypes.DELETE_USER, permitTypes.VIEW_USER],
});
 */var validationError = function validationError(res, err) {
  return res.status(422).json(err);
};
/** 
 * Get User Info
 * 
*/
exports.getUserInfo = function (req, res) {

  var user = {
    name: req.user.name,
    email: req.user.email
  };

  res.status(200).json(user);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var criteria, ids, assetService, assetIds, agg;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!_.find(req.user.userGroup.permissions, {
              resource: "USER",
              action: "view"
            })) {
              _context.next = 11;
              break;
            }

            criteria = {};
            ids = [];
            assetService = ServiceLocator.resolve("AssetsService");
            _context.next = 6;
            return assetService.getFilteredAssetsIds(req.user, { location: true }, true);

          case 6:
            assetIds = _context.sent;


            if (assetIds && assetIds.assetIds && assetIds.assetIds.length > 0) {
              ids = assetIds.assetIds;

              if (ids && ids.length) ids = ids.map(function (x) {
                return x.toString();
              });

              criteria.assignedLocation = { $in: ids };
            }

            agg = User.aggregate().lookup({
              from: "usergroups",
              let: { groupId: "$userGroup", userId: "$_id" },
              pipeline: [{
                $match: {
                  $expr: {
                    $or: [{
                      $and: [{ $eq: ["$_id", "$$groupId"] }, {
                        $gt: ["$level", req.user.userGroup.level]
                      }]
                    }, { $eq: [req.user._id, "$$userId"] }]
                  }
                }
              }],
              as: "userGroupObj"
            }).match((0, _extends3.default)({
              userGroupObj: { $ne: [] },
              isRemoved: { $ne: true },
              isAdmin: { $in: [false, req.user.isAdmin] }
            }, criteria), "-password -isRemoved").exec(function (err, users) {
              var filteredUsers = [];
              var adminCheck = req.user.isAdmin;
              var subdivisionUser = req.user.subdivision;
              if (!adminCheck && subdivisionUser) {
                users.forEach(function (user) {
                  if (subdivisionUser == user.subdivision) {
                    filteredUsers.push(user);
                  }
                });
              } else {
                filteredUsers = users;
              }
              if (err) {
                return handleError(res, err);
              }
              res.status(200);
              res.json(filteredUsers);
            });
            _context.next = 12;
            break;

          case 11:
            User.find({ $and: [{ _id: req.user._id }, { isRemoved: { $ne: true } }] }, "-password -isRemoved", function (err, users) {
              if (err) {
                return handleError(res, err);
              }
              res.status(200);
              res.json(users);
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  User.findOne({
    $and: [{ email: req.body.user.email }, { tenantId: tenantInfo.getTenantId(req.hostname) }]
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      var newUser = new User(req.body.user);
      var tenantId = tenantInfo.getTenantId(req.hostname);
      newUser.tenantId = tenantId;
      newUser.active = true;

      newUser.save(function (err, user) {
        if (err) return handleError(res, err);
        //let token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.status(200);
        return res.json(user);
      });
    } else {
      req.body.user.isRemoved = false;
      req.body.user.active = true;
      User.findOneAndUpdate({ _id: user._id }, { $set: req.body.user }, { upsert: true, new: true }, function (err, user) {
        if (err) return next(err);
        res.status(200);
        return res.json(user);
      });
    }
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return handleError(res, err);
    if (!user) {
      res.status(401);
      return res.send("Unauthorized");
    }
    var userHoursModel = ServiceLocator.resolve("UserHours");
    userHoursModel.findOne({ userId: user._id }, function (err, userHoursDoc) {
      if (err) return handleError(res, err);
      if (userHoursDoc) {
        user.userHours = userHoursDoc;
      }
      res.json(user);
    });
  });
};

/**
 * Update an existing user
 */
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  User.findById(req.params.id, function (err, user) {
    if (err) return handleError(res, err);
    if (!user) {
      res.status(404);
      return res.send("User not found");
    }
    // user.firstName = req.body.firstName;
    // user.lastName = req.body.lastName;
    user.name = req.body.name;
    user.department = req.body.department;
    user.subdivision = req.body.subdivision;
    user.phone = req.body.phone;
    user.mobile = req.body.mobile;
    user.address = req.body.address;
    user.group_id = req.body.group_id;
    user.group_name = req.body.group_name;
    user.assignedLocation = req.body.assignedLocation;
    user.assignedLocationName = req.body.assignedLocationName;
    user.genericEmail = req.body.genericEmail;
    user.userGroups = req.body.userGroups;
    user.tempUnit = req.body.tempUnit;
    if (req.body.userGroup) {
      user.userGroup = req.body.userGroup;
    }
    user.active = req.body.status;
    user.save(function (err, user) {
      if (err) {
        return handleError(res, err);
      }

      if (req.body.userWorkPlans && req.body.assignUserToWorkPlan) {
        var WorkPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
        WorkPlanTemplateService.updateUsersTemplates(req.body.userWorkPlans, req.body.assignUserToWorkPlan);
      }
      res.status(200);
      return res.json(user);
    });
  });
};

exports.logoutUser = function (req, res, next) {
  res.status(200);
  return res.json("LogOut Successful");
};
/**
 * Update an existing user
 */
exports.forgotPassword = function (req, res, next) {
  async.waterfall([function (done) {
    crypto.randomBytes(20, function (err, buf) {
      var token = buf.toString("hex");
      done(err, token);
    });
  }, function (token, done) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) {
        res.status(404);
        return res.send("not found");

        // req.flash('error', 'No account with that email address exists.');
        // return res.redirect('/forgot');
      }
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      user.save(function (err) {
        done(err, token, user);
      });
    });
  }, function (token, user, done) {
    var mailOptions = {
      to: user.email,
      subject: "Password Reset Link",
      html: "<p>You are receiving this because you (or someone else) has requested to reset the password of your account.</p><br/>" + "<p>Please click on the following link, or paste this into your browser to complete the process:</p>" + "<p>" + config.server_comm_protocol + "://" + config.ip + ":" + config.port +
      // "<p>https://" + config.ip + ":" + config.port +
      "/confirmreset/" + token + "</p>" + "<a href='" + config.server_comm_protocol + "://" + config.ip + ":" + config.port +
      // "<a href='https://" + config.ip + ":" + config.port +
      "/confirmreset/" + token + "'> Click Here </a>" + "<h3>If you did not request, please ignore this email and your password will remain unchanged.</h3>" + "<p>Thank You</p>" + "<p>TIMPS Team</p>"
    };
    emailService(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500);
        return res.json(err);
      }
      //console.log("Email Sent");
      //console.log("Message sent: %s", info.messageId);
      return res.json("Email Sent!");
    });
  }], function (err) {
    if (err) {
      res.status(500);
      return res.json(err);
    }
  });
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
};

exports.verifyPassReset = function (req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  }, function (err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      res.status(403);
      return res.send("Password reset token is invalid or has expired.");
      //return res.redirect('/forgot');
    }
    return res.json(user);
  });
};
/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  var _this = this;

  User.findOne({ _id: req.params.id }, function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(err, user) {
      var WorkPlanTemplateService, userids, wpts;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!err) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", handleError(res, err));

            case 2:
              if (user) {
                _context2.next = 5;
                break;
              }

              res.status(404);
              return _context2.abrupt("return", res.json("User Not Found"));

            case 5:
              if (!user.isAdmin) {
                _context2.next = 8;
                break;
              }

              res.status(500);
              return _context2.abrupt("return", res.json("Admin user can not be deleted"));

            case 8:
              WorkPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
              userids = [user._id];
              _context2.next = 12;
              return WorkPlanTemplateService.getUsersTemplates(JSON.stringify(userids));

            case 12:
              wpts = _context2.sent;

              if (!(wpts.value && wpts.value.length && wpts.value.length > 0)) {
                _context2.next = 17;
                break;
              }

              //res.status(500).send('Cannot delete user with assigned inspections');
              res.statusMessage = "Cannot delete user with assigned inspections";
              res.status(400).end();
              return _context2.abrupt("return", res);

            case 17:

              user.isRemoved = true;
              user.save(function (err, user) {
                if (err) {
                  return next(err);
                }
                res.status(200);
                return res.json(user);
              });

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

/**
 * Change a users password
 */
// exports.changePassword = function (req, res, next) {
//     let userId = req.params.id;
//     let oldPass = String(req.body.oldPassword);
//     let newPass = String(req.body.newPassword);

//     User.findById(userId, function (err, user) {
//         if (err) return next(err);
//         if (!user) {
//             res.status(404);
//             return res.send('User not found');
//         }
//         if (user.authenticate(oldPass)) {
//             user.password = newPass;
//             user.save(function (err) {
//                 if (err) return next(err);
//                 res.status(200);
//                 return res.send('Password updated');
//             });
//         } else {
//             res.status(403);
//             return res.send('Forbidden');
//         }
//     });
// };

// Change User Password By Admin also by using for forgot password logic

exports.changePassword = function (req, res, next) {
  var userId = req.params.id;
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (err) return handleError(res, err);
    if (!user) {
      res.status(404);
      return res.send("User not found");
    }
    user.password = newPass;
    User.update({ _id: userId }, { $set: { hashedPassword: user.hashedPassword } }, function (err, user) {
      if (err) return next(err);
      res.status(200);
      return res.json("Password updated");
    });

    // user.set({ hashedPassword:  user.hashedPassword });
    // user.save(function(err) {
    //   if (err) return next(err);
    //   res.status(200);
    //   return res.json("Password updated");
    // });
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, "-salt -hashedPassword", function (err, user) {
    // don't ever give out the password or salt
    if (err) return handleError(res, err);
    if (!user) return res.status(401).send("Unauthorized");
    res.json(user);
  });
};

function handleError(res, err) {
  res.status(500);
  return res.send(err);
}
/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect("/");
};

exports.removeTeamMembers = function (req, res, next) {
  User.findById(req.params.id, function (err, teamLead) {
    if (err) return handleError(res, err);
    if (!teamLead) {
      res.status(404);
      return res.send("Supervisor not found");
    }

    // teamLead.team = _.difference(teamLead.team, req.body.newTeamMembers);
    var newTeam = _.cloneDeep(teamLead.team);
    _.remove(newTeam, function (team) {
      return team.email == req.body.userToDelete;
    });
    teamLead.team = newTeam;
    User.findOne({
      $and: [{ email: req.body.userToDelete }, { tenantId: tenantInfo.getTenantId(req.hostname) }]
    }, function (err, user) {
      if (user) {
        user.teamLead = "";
        user.save();
      }
      return;
    });

    teamLead.save(function (err, teamLead) {
      if (err) {
        return handleError(res, err);
      }
      res.status(200);
      return res.json(teamLead);
    });
  });
};

exports.updateTeam = function (req, res, next) {
  User.findById(req.params.id, function (err, teamLead) {
    if (err) return handleError(res, err);
    if (!teamLead) {
      res.status(404);
      return res.send("Supervisor not found");
    }

    teamLead.team = [].concat((0, _toConsumableArray3.default)(teamLead.team), (0, _toConsumableArray3.default)(req.body.newTeamMembers));
    req.body.newTeamMembers.forEach(function (member) {
      User.findOne({
        $and: [{ email: member.email }, { tenantId: tenantInfo.getTenantId(req.hostname) }]
      }, function (err, user) {
        if (user) {
          user.teamLead = req.body.email;
          user.save();
        }
        return;
      });
    });
    teamLead.save(function (err, teamLead) {
      if (err) {
        return handleError(res, err);
      }
      res.status(200);
      return res.json(teamLead);
    });
  });
};