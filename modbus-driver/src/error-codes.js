//File name: error-codes.js
//Description: this file contains tcp and modbus error codes and their description 
exports.ERROR_CODES = {
    1: "IllegalFunction", 
    2: 'IllegalDataAddress',
    3: 'IllegalDataValue',
    4: 'ServerDeviceFailure',
    5: 'Aknowledge',
    6: 'ServerDeviceBusy',
    7: 'NegativeAcknowledge',
    8: 'MemoryParityError',
    10: 'GatewayPathUnavailable',
    11: 'GatewayTargetDeviceFailedToRespond',
    //-4077: 'ECONNRESET',
    "IllegalFunction": 1,
    'IllegalDataAddress': 2,
    'IllegalDataValue': 3,
    'ServerDeviceFailure': 4,
    'Aknowledge': 5,
    'ServerDeviceBusy': 6,
    'NegativeAcknowledge': 7,
    'MemoryParityError': 8,
    'GatewayPathUnavailable': 10,
    'GatewayTargetDeviceFailedToRespond': 11,
    'ECLOSED': 'ECLOSED'
    //ECONNRESET: -4077
}

