'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../../framework/servicelocator");
var NotificationModel = require('./Notification.model');
var emailService = require('./../../service/EmailService');

var NotificationService = function () {
  function NotificationService() {
    (0, _classCallCheck3.default)(this, NotificationService);

    this.logger = ServiceLocator.resolve("logger");
  }

  (0, _createClass3.default)(NotificationService, [{
    key: 'createFromAlert',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (data && data.destinations && data.destinations.length) {
                  data.destinations.forEach(function () {
                    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(destination) {
                      var notification;
                      return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              data.destination = destination;

                              notification = new NotificationModel(data);
                              _context.next = 4;
                              return notification.save();

                            case 4:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, _this);
                    }));

                    return function (_x2) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                }

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createFromAlert(_x) {
        return _ref.apply(this, arguments);
      }

      return createFromAlert;
    }()
  }, {
    key: 'sendNewNotifications',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _this2 = this;

        var SocketIORoomService;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                SocketIORoomService = ServiceLocator.resolve('SocketIORoomService');


                NotificationModel.find({ status: 'new' }, function (err, notifications) {
                  notifications.forEach(function () {
                    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(notify) {
                      var title, message, destination, userModel, user;
                      return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              title = notify.title, message = notify.message, destination = notify.destination;
                              _context3.t0 = notify.notificationType;
                              _context3.next = _context3.t0 === 'email' ? 4 : _context3.t0 === 'sms' ? 10 : _context3.t0 === 'mobile' ? 12 : 14;
                              break;

                            case 4:
                              userModel = ServiceLocator.resolve('userModel');
                              _context3.next = 7;
                              return userModel.findById(destination).exec();

                            case 7:
                              user = _context3.sent;

                              // Send notification to email
                              _this2.sendEmail(title, message, user.genericEmail).then(function () {
                                _this2.updateStatus(notify._id, 'sent');
                              }).catch(function (err) {
                                console.log('Notification email sending failed', err);
                                _this2.updateStatus(notify._id, 'failed');
                              });
                              return _context3.abrupt('break', 15);

                            case 10:
                              // Send notification to sms 
                              console.log('Mobile messaging notification not implemented yet, Notification.service.sendNewNotifications');
                              return _context3.abrupt('break', 15);

                            case 12:
                              // Send notification to mobile (push notification)
                              console.log('Mobile push notification not implemented yet, Notification.service.sendNewNotifications');
                              return _context3.abrupt('break', 15);

                            case 14:
                              SocketIORoomService.sendMessageToRoom(notify.destination, { notificationId: notify._id, title: notify.title, message: notify.message });

                            case 15:
                            case 'end':
                              return _context3.stop();
                          }
                        }
                      }, _callee3, _this2);
                    }));

                    return function (_x3) {
                      return _ref4.apply(this, arguments);
                    };
                  }());
                });

                return _context4.abrupt('return', { success: true, message: 'Notification created' });

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sendNewNotifications() {
        return _ref3.apply(this, arguments);
      }

      return sendNewNotifications;
    }()
  }, {
    key: 'sendEmail',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(title, message, email) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', new Promise(function (resolve, reject) {
                  var mailOptions = {
                    to: email,
                    subject: title,
                    html: '\n        <p>' + message + '</p></br></br>\n          <div><b>This email is auto generated and is intended for your information only. Please do not reply to this email.</b></div>\n          <h3><b>TekTracking Team</b></h4>\n        '
                  };

                  emailService(mailOptions, function (err, info) {
                    if (err) {
                      console.log(err);
                      reject(new Error(err));
                    }

                    resolve({ success: true });
                  });
                }));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function sendEmail(_x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return sendEmail;
    }()
  }, {
    key: 'updateStatus',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(notificationId, status) {
        var notification;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return NotificationModel.findById(notificationId);

              case 2:
                notification = _context6.sent;


                notification.status = status;

                _context6.next = 6;
                return notification.save();

              case 6:
                return _context6.abrupt('return', { success: true, message: 'Notification updated', status: 200 });

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateStatus(_x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return updateStatus;
    }()
  }, {
    key: 'pullNotificationForUser',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(userId) {
        var _this3 = this;

        var notifications;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return NotificationModel.find({ destination: userId, isRemoved: false, notificationType: 'web' }).sort({ createdAt: 'desc' }).exec();

              case 2:
                notifications = _context8.sent;


                notifications.forEach(function () {
                  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(notification) {
                    return _regenerator2.default.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            if (!(notification.status === 'new')) {
                              _context7.next = 4;
                              break;
                            }

                            notification.status = 'unread';

                            _context7.next = 4;
                            return notification.save();

                          case 4:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, _this3);
                  }));

                  return function (_x10) {
                    return _ref8.apply(this, arguments);
                  };
                }());

                return _context8.abrupt('return', notifications);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function pullNotificationForUser(_x9) {
        return _ref7.apply(this, arguments);
      }

      return pullNotificationForUser;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(_id) {
        var notification;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return NotificationModel.findById(_id);

              case 2:
                notification = _context9.sent;

                if (!notification) {
                  _context9.next = 10;
                  break;
                }

                notification.isRemoved = true;

                _context9.next = 7;
                return notification.save();

              case 7:
                return _context9.abrupt('return', { success: true, value: 'Notification deleted', status: 200 });

              case 10:
                return _context9.abrupt('return', { success: false, value: "Notfication deletion delete", status: 500 });

              case 11:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _delete(_x11) {
        return _ref9.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return NotificationService;
}();

exports.default = NotificationService;