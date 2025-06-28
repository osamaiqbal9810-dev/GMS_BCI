//File name: modbusService.js
//Description: this file contains modbusService class
const { OBJECT_REGISTERS_READ_TIMEOUT, TCP_CONN_TIMEOUT, TCP_RETRY } = require('./Configurations');
const modbusStreaam = require('modbus-stream');
const { ERROR_CODES } = require('./error-codes');
const { FUNCTION_CODES } = require('./function-code');
const { disconnect } = require('pm2');

//The ModbusService class encapsulates modbus-stream library functionality 
//and interface function called by host
module.exports = class ModbusService {

    constructor(callback) {
        this.connection = undefined;  
        this.res = {};
        this.busy = false;
        this.timer = null;
        this.assetId = "";
        this.callback = callback;
        //following variables contains information of pervious connection  
        this.previous_ip = "127.0.0.0";
        this.previous_port = 0;
        this.previous_slaveAddr = 1;
        this.previous_funcCode = 3;
        this.previous_connection = undefined;
        this.errCounter =0;

    }
    //this function send tcp connection request to modbus stream
    //parameter: tcp-ip, tcp-port
    async connect(ipAddr, port) {
        return new Promise((resolve, reject) => {
            //call modbus-stream's tcp connection function, pass tcp_retries and connection timeout as argument
            modbusStreaam.tcp.connect(port, ipAddr, { debug: null, retry: TCP_RETRY, connectTimeout: TCP_CONN_TIMEOUT }, (err, connection) => {
                if (err) {  // call reject callback if error occures
                    this.busy = false;
                    reject(err)
                } else {
                    //cal resolved callback on connection establishment
                    resolve(connection)
                    //console.log("Connection established.");
                }
            })
        })

    }
    //this function creates and initalizes response object and addes assetId into object
    createEmptyResponse() {
        return {
            assetId: this.assetId,
            failureCount: 0,
            timedout: false,
            error: null,
            data: {},
        };
    }
    //read register is global inerface fucntion, it is called based when host wants
    // to read registes of generator or ats
    // parameter: object that contains information of ip, port and register information   
    async readRegisters(req) {
        if (this.busy) {
            //return incase some request already under process
            //console.log("Request already under process");
            return;
        }
        //console.log("New Request");
        this.busy = true; //lock request untill proceeded or some critical error occures
        // collect ip, port and slave address information from requested object
        let { ip, port, slaveAddr} = req.settings;
        let { registers, assetId } = req;
        this.assetId = assetId;
        // initalize response object and intialize with assetId
        this.response = this.createEmptyResponse();
        try {
            //console.log("requested ip - " + ip + "- " + port + ", previous_ip - " + this.previous_ip + "- " + this.previous_port)
            if ((this.connection == undefined) || (this.previous_ip != ip) || (this.previous_port != port)) {
                try {
                    //console.log("connecting with ip - " + ip + " port: " + port);
                    this.previous_ip = ip;
                    this.previous_port = port;
                    //send tcp connection request and wait untill connection established
                    this.connection = await this.connect(ip, port);
                    //register connection establish event callback
                    this.connection.on("connection", () => {
                        //console.log("on connection event");
                    });
                    //register socket close event callback
                    this.connection.on("close", () => {
                        //console.log("socket closed");
                        //terminate tcp stream
                        this.connection && this.connection.transport.stream.destroy();
                        //initialize connetion handler
                        this.connection = undefined;
                        this.previous_connection=undefined;
                    });
                    //register socket error event callback
                    this.connection.on("error", (error) => {
                        this.response = this.createEmptyResponse();
                        //terminate tcp stream
                        this.connection && this.connection.transport.stream.destroy();
                        //initialize connetion handler
                        this.connection = undefined;
                        this.previous_connection= undefined;
                        // get error code and error message and pass it to response object
                        this.response.error = this.getErrorInfo({
                            code: error.errno,
                            message: error.code
                        });
                     
                        //send response object to host
                        this.callback(this.response);
                        //console.log(`Socket error occured: code=${error.errno}, msg=${error.code}`);
                    });
                } catch (error) { //handle connection based exception
                    //add error information into response object
                    this.response.error = this.getErrorInfo(error);
                    //send response object to host
                    this.callback(this.response);
                    //console.log(`Error while connecing to the server: ${error}`)
                    //terminate tcp stream
                    this.connection && this.connection.transport.stream.destroy();
                    //initialize connetion handler
                    this.connection = undefined;
                    return;
                }

            }
            else {
                //console.log("connection already exists");
            }
            // close request if connection is not established stil
            if (!this.connection) { return; }
            //initialize data and error counter from response object that was created already.
            let { data, failureCount } = this.response;
            // create promise object for timer to read modbus registers timeout
            let timeoutPromise = new Promise((resolve, reject) => {
                //set timer period defined inside configurations.js
                this.timer = setTimeout(resolve, OBJECT_REGISTERS_READ_TIMEOUT, "timedout");
            })
            //create 'readDataPromise' promise object to read registers, it returns with 
            //resolve callback on successfull and rejected on error
            let {funcCode } = req.settings;
            let readDataPromise = new Promise(async (resolve, reject) => {
                let keys = Object.keys(registers);
                let err = null;
                //read each modbus register addressed in requested object.  
                for (let ind = 0; ind < keys.length; ind++) {
                    if (err) { break; } //incase socket error occured, break and don't read next registers
                    const paramKey = keys[ind];
                    const { qty, addr } = registers[paramKey];
                    data[paramKey] = { qty: qty };
                    if (qty > 0) {
                        try {
                            //read modbus register, it returns values requested in qty
                            data[paramKey].val = await this.readModbusRegisters(this.connection,
                                slaveAddr, addr, qty, funcCode);
                        } catch (error) {
                            //handle exception on read modbus register 
                            data[paramKey].error = {
                                code: error.code,
                                message: error.message
                            };
                            failureCount++; //increament error counter
                            //console.log(`error in ${req.assetId}: ${JSON.stringify(error)}`)
                            //pass error codes to reject callback as argument
                            switch (error.code) {
                                case ERROR_CODES.IllegalFunction:
                                case ERROR_CODES.GatewayTargetDeviceFailedToRespond:
                                case ERROR_CODES.ECLOSED:
                                    err = error;
                                    break;
                                default:
                                    break;
                            }

                        }
                    }
                }
                if (err) {
                    reject(err); //incase error call reject 
                }
                else {
                    resolve("success"); //on successfull, call resolve
                }
            })
            // check either tcp repond successfully, or timedout
            Promise.race([timeoutPromise, readDataPromise]).then(result => {
                if (result === "success") {
                    //resolve when read request performed successfully
                    clearTimeout(this.timer);
                    this.response.failureCount = failureCount;
                } else if (result === "timedout") {
                    //response when timer is timedout
                    //console.log("Request timedout");
                    this.response.timedout = true;
                }
                this.callback(this.response); // call callback function to return response object
                this.busy = false;

            }).catch((error) => {
                //incase error occure, close socket and send response object to host through callback     
                this.busy = false;
                this.connection && this.connection.transport.stream.destroy();
                this.connection = undefined;
                this.response.error = this.getErrorInfo(error);
                this.callback(this.response);
                //console.log(JSON.stringify(error));
            })
        } catch (error) { //handle connection exception   
            this.busy = false;
            this.connection && this.connection.transport.stream.destroy();
            this.previous_connection = undefined;
            this.connection = undefined;
            this.response.error = this.getErrorInfo(error);
            this.callback(this.response);
            //console.log(`error in connection ${req.assetId}: ${JSON.stringify(error)}`)
        }
    }
    //returns error code and description
    getErrorInfo(error) {
        return {
            code: error.code,
            message: error.message
        };
    }
    //Modbus read register
    //parameters: tcp connection, 
    //            slave address, 
    //            register address,
    //             number of registers to read,
    //             function code (read holding register, read input register ...)
    readModbusRegisters(connection, slaveAddr, regAddr, regCount, functionCode) {
        let err;
        //creat promise to read register from modbus-stream library
        return new Promise((resolve, reject) => {
            //read holding regiter through modbus-stream library
            if (functionCode === FUNCTION_CODES.READ_HOLDING_REGISTERS) {
                connection.readHoldingRegisters({ address: regAddr, quantity: regCount, extra: { unitId: slaveAddr } }, (err, res) => {
                    if (err) {
                        //retrun if error occure while reading
                        reject(err);
                    } else {
                        let values = [];
                        for (var index = regAddr; index < (regAddr + regCount); index++) {
                            values.push(res.response.data[index - regAddr].readUint16BE(0));
                        }
                        //return data received
                        resolve(values);
                    }
                });
            }
            //read input regiter through modbus-stream library 
            else if (functionCode == FUNCTION_CODES.READ_INPUT_REGISTER) {
                connection.readInputRegisters({ address: regAddr, quantity: regCount, extra: { unitId: slaveAddr } }, (err, res) => {
                    if (err) {
                        //retrun if error occure while reading
                        reject(err);
                    } else {
                        let values = [];
                        for (var index = regAddr; index < (regAddr + regCount); index++) {
                            values.push(res.response.data[index - regAddr].readUint16BE(0));
                        }
                        //return data received
                        resolve(values);
                    }
                });

            }
            //read discrete input regiters through modbus-stream library 
            else if (functionCode == FUNCTION_CODES.READ_DISCRETE_INPUTS) {
                connection.readDiscreteInputs({ address: regAddr, quantity: regCount, extra: { unitId: slaveAddr } }, (err, res) => {
                    if (err) {
                        //retrun if error occure while reading
                        reject(err);
                    } else {
                        let values = [];
                        for (var index = regAddr; index < (regAddr + regCount); index++) {
                            values.push(res.response.data[index - regAddr].readUint16BE(0));
                        }
                        //return data received
                        resolve(values);
                    }
                });

            } else {
                //retrun with illegalFunction error if fuction code is not handeled above 
                reject({
                    code: ERROR_CODES.IllegalFunction,
                    message: ERROR_CODES[ERROR_CODES.IllegalFunction]
                })
            }

        });

    }

};