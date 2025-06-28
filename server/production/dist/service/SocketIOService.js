"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var counter = 0;

var SocketIOService = function () {
  function SocketIOService(socketio) {
    var _this = this;

    (0, _classCallCheck3.default)(this, SocketIOService);

    this.socketio = socketio;
    this.sockets = [];
    //this.stackData = [];
    //this.isTimerMeet = false;
    socketio.on("connection", function (socket) {
      console.log("Connected:" + ++counter);
      socket.emit("status", { connected: true });
      _this.addSocket(socket);
    });
    socketio.on("connect_error", function (err) {
      console.log("connect_error due to " + err.message);
    });

    this.config = {
      trace: false
    };
  }

  (0, _createClass3.default)(SocketIOService, [{
    key: "addSocket",
    value: function addSocket(socket) {

      this.sockets.push(socket);
    }
  }, {
    key: "testSocketService",
    value: function testSocketService() {
      this.sockets.forEach(function (socket) {

        socket.emit("testSocket", "Socket are Communicating");
      });
    }
  }, {
    key: "onDataReceiveFromGateway",
    value: function onDataReceiveFromGateway(data) {
      this.sockets.forEach(function (socket) {
        socket.emit("gateDataReceive", data);
      });
    }

    // emitData() {
    // 	this.sockets.forEach((socket) => {
    // 		socket.emit('livedata', this.stackData);
    // 	});
    // 	this.stackData = [];
    // }

    // updateLiveData(deviceid, data, context) {
    // 	if (!context.isTimerMeet) {
    // 		context.isTimerMeet = true;
    // 		setInterval(function () {
    // 			context.emitData();
    // 		}, 5000);
    // 	}
    // 	context.stackData.push({deviceid: deviceid, data: data});
    // }

    // getCallback() {
    // 	let callbackfunction = (deviceId, liveDataPacket) =>
    // 		this.updateLiveData(deviceId, liveDataPacket, this);

    // 	return callbackfunction;
    // }

    // eventLogged(tags)
    // {
    // 	this.sockets.forEach((socket)=>{
    // 		socket.emit('EventLog', tags);
    // 	});

    // }
    // deviceStateUpdated(deviceId)
    // {
    // 	// console.log('socket.io: device status changed: '+ deviceId);
    // 	this.sockets.forEach((socket)=>{
    // 		socket.emit('DeviceStateUpdated', deviceId);
    // 	});
    // }
    // deviceRestarting(deviceId)
    // {
    // 	this.sockets.forEach((socket)=>{
    // 		socket.emit('DeviceRestarting', deviceId);
    // 	});
    // }
    // deviceDataUpdated(deviceId)
    // {
    // 	// console.log('socket.io: device status changed: '+ deviceId);
    // 	this.sockets.forEach((socket)=>{
    // 		socket.emit('DeviceDataUpdated', deviceId);
    // 	});

    // }

    // logDownloadAlert(deviceId, name)
    // {
    // //	console.log('socketIO: log progress '+ deviceId + ' ' + percentage + ' '+ name );
    // 	this.sockets.forEach((socket) => {
    // 		socket.emit('LogDownloadAlert', {deviceId, name});
    // 	});
    // }
    // remoteConfigReceived(deviceId, status)
    // {
    // }
    // firmwareProgress(deviceId, percentage, status, id='')
    // {
    // 	if(this.config && this.config.trace)
    // 	{
    // 		console.log('socketIO: firmware progress '+ deviceId + ' ' + percentage + ' '+ status );
    // 	}

    // 	this.sockets.forEach((socket) => {
    // 		socket.emit('FirmwareProgress', {deviceId, percentage, status, id});
    // 	});
    // }
    // configReceived(deviceId)
    // {
    // 	this.sockets.forEach((socket)=>{
    // 		socket.emit('ConfigReceived', deviceId);
    // 	});
    // }
    // configSetOnDevice(deviceId)
    // {
    // 	this.sockets.forEach((socket)=>{
    // 		socket.emit('ConfigSetOnDevice', deviceId);
    // 	});
    // }
    // userStatusChanged(userId)
    // {
    // }
    // deviceLogListSynced(deviceId)
    // {
    // 	this.sockets.forEach((socket)=>{
    // 		socket.emit('DeviceLogListSynced', deviceId);
    // 	});
    // }
    // logDownloadProgress(deviceId, name, percentage)
    // {
    // 	if(this.config && this.config.trace)
    // 	{
    // 		console.log('socketIO: log progress '+ deviceId + ' ' + percentage + ' '+ name );
    // 	}
    // 	this.sockets.forEach((socket) => {
    // 		socket.emit('LogDownloadProgress', {deviceId, percentage, name});
    // 	});
    // }

  }]);
  return SocketIOService;
}();

exports.default = SocketIOService;