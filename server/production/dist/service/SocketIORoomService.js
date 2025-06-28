"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceLocator = require("../framework/servicelocator");

var SocketIOService = function () {
  function SocketIOService(socketio) {
    (0, _classCallCheck3.default)(this, SocketIOService);

    this.socketio = socketio;
    // handle incoming connections from clients
    this.socketio.sockets.on('connection', function (socket) {
      // once a client has connected, we expect to get a ping from them saying what room they want to join
      socket.on('room', function (room) {
        socket.join(room);
      });

      socket.on('notificationReceived', function (notificationId) {

        var notificationService = ServiceLocator.resolve('NotificationService');

        notificationService.updateStatus(notificationId, 'unread');
      });
    });
  }

  (0, _createClass3.default)(SocketIOService, [{
    key: "sendMessageToRoom",
    value: function sendMessageToRoom(room, data) {
      this.socketio.sockets.in(room).emit('notification', data);
    }
  }]);
  return SocketIOService;
}();

exports.default = SocketIOService;