"use strict";

export default class SocketIOService {
  constructor(socketio) {
    this.socketio = socketio;
    this.sockets =  new Map([]);
    socketio.on("connection", (socket) => {
      
      socket.emit("status", { connected: true });
      socket.on("disconnect", () => {
        this.sockets.delete(socket.id);
        console.log(`Disconnected:${socket.id}, counter:${this.sockets.size}`); // false
      });
      this.addSocket(socket);
      console.log(`Connected:${socket.id}, counter:${this.sockets.size}`);
    });
    socketio.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    this.config = {
      trace: false,
    };
    
  }

  addSocket(socket) {
    this.sockets.set(socket.id,socket);
  }
  

  testSocketService() {
    for(const key in this.sockets)
    {
      this.sockets[key].emit("testSocket", "Socket are Communicating");
    }
 
  }

  onDataReceiveFromGateway(data) {
    //console.log(this.sockets);
    this.sockets.forEach((value,key) => {
      value.emit("gateDataReceive", data);
    })
  }
  onNotificationCreate(data) {
   
    this.sockets.forEach((value) => {
      value.emit("triggerNotification", data);
    })
  }

  onAssetStatusChange (data) {
    this.sockets.forEach((value) => {
      value.emit("triggerAssetStatusChange", data);
    })
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
}
