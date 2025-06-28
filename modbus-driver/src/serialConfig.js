//File name: serialConfig.js
//Description: this file contains serial configuration class 
class SerialConfig {

    constructor() {
        this.serilSettingData = [];
    }

    initSerialSettings(baudRate,dataBits, parityType, parityStatus, stopBit) {
        let configByte;
        //add header into serial stream array
        this.serilSettingData.push(85, 170, 85); //0x55, 0xAA, 0X55
        //add baud rate bytes
        this.serilSettingData.push(((baudRate >> 16) & 255), ((baudRate >> 8) & 255), (baudRate & 255));
        // console.log("serial config data: " + this.serilSettingData);
        //create configuration byte based on serial data bits, parity type, parity status and no. of stop bits
        configByte = this.calculateConfigByte(dataBits, parityType, parityStatus, stopBit);
        //add configByte into serialSetting serialData array
        this.serilSettingData.push(configByte);
        //calclate crc of serialData  array
        let crc = this.serilSettingData[3] + this.serilSettingData[4] + this.serilSettingData[5]+this.serilSettingData[6];
        crc = crc & 255;
        //add crc byte to serialData array
        this.serilSettingData.push(crc);

        // console.log("serial config data: " + this.serilSettingData);
        //this.printHexValues();
        //console.log(this.serilSettingData.toString('hex'));
        let strConfig = Buffer.from(this.serilSettingData).toString('hex').toUpperCase();
        //console.log("Serial configuration buffer: "+strConfig);
        
        return this.serilSettingData;
    }
     //this function constructs configuration byte based on serial data bits, 
     //parity type, parity status and no. of stop bits
    calculateConfigByte(dataBits, parityType, parityStatus, stopBit){
        let confByte=0;
        let b =2;
        //console.log(confByte != b);
        confByte = dataBits; 
        confByte |= stopBit<<2;
        confByte |= parityType<<3;
        confByte |= parityStatus<<4;

        return confByte; 
    }

    printHexValues(){
        // for(let index=0;index<8;index++){
        //     hexNumber = parseInt(hexString, 16);
        //     console.log(this.serilSettingData[index].toString('hex'));
        // }
    }
}

SERIAL_CONFIG_SETTINGS = {
    //parity types
    PARITY_NONE: 0,
    PARITY_EVEN: 1,
    PARITY_MARK: 2,
    PARITY_SPACE: 3,
    //parity status
    PARITY_OFF: 0,
    PARITY_ON: 1,
    //number of stop bits
    NO_OF_STOP_BITS_1: 0,
    NO_OF_STOP_BITS_2: 1,
    //number of bits in data byte
    NO_DATA_BITS_5: 0,
    NO_DATA_BITS_6: 1,
    NO_DATA_BITS_7: 2,
    NO_DATA_BITS_8: 3
}
// export serilconfig class and SERIAL_CONFIG_SETTING object
module.exports.SerialConfig=SerialConfig;
module.exports.SERIAL_CONFIG_SETTINGS=SERIAL_CONFIG_SETTINGS;


