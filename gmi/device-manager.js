
import apiService from './api.js';
import cp from 'child_process';
import Configurations from './configurations.js';

class DeviceManager {
    refreshTime = 6000; //in milliseconds. 
    
    deviceMap = {};
    driverMap = new Map();
    timerInstance = null;

    /////////////////////////////////////////////////
    //To initialize
    //last edited on 30-05-2022
    /////////////////////////////////////////////////
    constructor(){
        console.log('Gateway App started');
        //console.log('Initializing device manager');
        //console.log(new Date());
        this.refreshTime = 5000; //in milliseconds.
        this.timerInstance = setInterval( this.getRefreshTime.bind(this), this.refreshTime);
    };

    getRefreshTime(){
        //console.log(this.refreshTime);
        //console.log(new Date());
        
        this.getDevicesMap();

        //TODO: Change Path
        apiService.get( `${Configurations.getRefreshTimePath}`,
            (res) => {
                if (res.newRefreshTime !== this.refreshTime){
                    this.refreshTime = res.newRefreshTime;
                    clearInterval(this.timerInstance);
                    this.timerInstance = setInterval( this.getRefreshTime.bind(this), this.refreshTime);
                }
            }
        )  
        
    };


    getDevicesMap(){
        //console.log("getDevicesMap");
        
        //TODO: Change Path
        apiService.get( `${Configurations.getMemoryMapPath}`,
            this.processDevicesMap.bind(this)
        )  
        
    };

    processDevicesMap(devices){
        // remove devices if any
        let removeables = [];
        let newDevicesKeys = devices.map(device => device.assetId);
        for (const deviceId of Object.keys(this.deviceMap)) {
            if (!newDevicesKeys.includes(deviceId)) {
                removeables.push(deviceId);
            }
        }
        removeables.forEach((deviceId) => {
            if (this.deviceMap.hasOwnProperty(deviceId))
            {
                let { childRef } = this.deviceMap[deviceId];
                if (childRef) {
                    // stop forked process against 
                    //childRef.kill();
                    let exitRequest = { 
                        command: "exit"
                    }
                    childRef.send(exitRequest);
                }
                delete this.deviceMap[deviceId];
            }
        });

        // update old/new devices
        devices.forEach(device => {
            let devId = device.assetId;
            // if this a new device
            let isNewDevice = !this.deviceMap.hasOwnProperty(devId);
        
            if (isNewDevice) {
        
                // create new process for this new device
                let forkedProcess = this.createProcess(devId);

                // adding device attributes and driver process instance for this new process 
                this.deviceMap[devId] = {
                    settings: device.settings,
                    registers: device.registers,
                    childRef: forkedProcess
                };
            }
            else {
                // this is an existing device
                // updating device settings for this device
                if (!this.deviceMap[devId].childRef) {
                    // recreate
                    this.deviceMap[devId].childRef = this.createProcess(devId);
                }
                this.deviceMap[devId] = {
                    ...this.deviceMap[devId],
                    settings: device.settings,
                    registers: device.registers
                };
            }
            
            //sending read registers request to relevant child process
            let request = { 
                command: "read-registers",
                assetId: devId,
                settings: device.settings,
                registers: device.registers
            }
            let {childRef} = this.deviceMap[devId];
            childRef && childRef.send(request);

            //console.log(request);

        });
    }

    createProcess(devId) {
        // create new process for this new device
        let forkedProcess = cp.fork(`${Configurations.childProcessPath}`);

        // listener for data response from child process
        forkedProcess.on('message', (res)=> {
            if (res && res.command === "read-reg-res") {
                // console.log(`recieving message code in parent process: ${msg.val}`);   
                //console.log(`RES: ${JSON.stringify(res)} for ${devId}`);
                //ToDo: Add function that will send data to GMS web Server
                apiService.post(`${Configurations.postDeviceData}`, res);
            }
        });

        forkedProcess.on('exit', (code)=>{
            //console.log(`driver for device id ${devId} stoped with error code ${code}`);
            if (code && this.deviceMap.hasOwnProperty(devId)) {
                this.deviceMap[devId].childRef = null;
            }
        });

        return forkedProcess;
    }
};



export const deviceManager = new DeviceManager();