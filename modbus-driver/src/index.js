//File name: index.js
//Description: Functions in this file provides modbus-driver interface with
//             other external applications

const ModbusService = require('./modbusService')

//Sending data to parent process
const readRegRes = (res) => {
    // read registers response
    process.connected && process.send({
        command: "read-reg-res",
        data: res
    });
    //test code
    // console.log("device register response object: " + JSON.stringify(res));
};

const modbusService = new ModbusService(readRegRes);

//listening to parent process
process.on("message", (req) => {
    if (req && req.command === "read-registers") {
        try {
            modbusService.readRegisters(req);
        }
        catch (error) {
            console.error(`error occured ${error}`);
        }
    }
    //for closing child process
    else if (req && req.command === "exit") {
        try {
            //modbusService.closeTCPConnection();
            process.exit();
        }
        catch (error) {
            console.error(`error occured ${error}`);
        }
    }
    else {
        console.error(`unknown request received from the parent process = ${JSON.stringify(req)}`);
    }
});


//////////////////////  test code ///////////////////////////////////////
//  const { DeviceDataReq, DeviceDataReq2,DeviceDataReq3 } = require('./dummyData')
// //const {SerialConfig,SERIAL_CONFIG_SETTINGS} = require('./serialConfig')
// // const serialConfig = new SerialConfig();
// // let confData = serialConfig.initSerialSettings(115200, SERIAL_CONFIG_SETTINGS.NO_DATA_BITS_8, SERIAL_CONFIG_SETTINGS.PARITY_OFF, SERIAL_CONFIG_SETTINGS.PARITY_NONE,SERIAL_CONFIG_SETTINGS.NO_OF_STOP_BITS_1);
// // console.log('configuration data: '+ confData);
// let object_requested = 1;
// //modbusService.readRegisters(DeviceDataReq1);
// var registerReadTimeout = setInterval(function () {
//     //console.log('read device Registers');
//     // Send this Request periodically until no response is received
//     console.log("object_requested: " +object_requested);
//     if (object_requested === 1) {
//         modbusService.readRegisters(DeviceDataReq1);

//     } else if(object_requested === 2 ) {
//         modbusService.readRegisters(DeviceDataReq2);
//     }
//     else if(object_requested === 3 ){
//         modbusService.readRegisters(DeviceDataReq3);
//     }
//     else{
//         modbusService.readRegisters(DeviceDataReq4);

//     }
//     if(++object_requested >4 ){
        
//        object_requested = 1;
//     }
   
// }, 5000);


