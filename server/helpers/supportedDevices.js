let ServiceLocator = require("../framework/servicelocator");
let fuelLevelArray = [];
let fuelLevelArrayFlag = false;
class SupportedDeviceHelperClass {

  constructor() {
  };

  divide(value, divisor) {
    return value / divisor;
  }
  map(value, values) {
    return values.hasOwnProperty(value) ? values[value] : value;
  }
  objectDecoder(val, props) {

    let obj = {};
    for (const prop in props) {
      let { decoder, mask, shift, values } = props[prop];
      let maskedValue = mask ? mask & val : val;
      let shiftedValue = shift ? maskedValue >> shift : maskedValue;

      decoder === "map" && (obj[prop] = this.map(shiftedValue, values));
    }
    return obj;
  }

  dataValidity(lastUpdate, interpretedData, param) {
    let currentTime = new Date();
    let diff = (currentTime - lastUpdate) / 60000;
    if (diff <= 2) {
      interpretedData = {
        ...interpretedData,
        [param]: {
          ...interpretedData[param],
          missed: true
        }
      }
    }
    else {
      interpretedData = {
        ...interpretedData,
        [param]: {
          ...interpretedData[param],
          missed: true,
          valid: false
        }
      }
    }
    return interpretedData;
  }

  commFailureValidity(state) {

    let validityFlag = true;
    Object.keys(state).forEach((param) => {
      if (state[param].hasOwnProperty('valid')) {
        validityFlag = state[param].valid == false ? false : true;
      }
    })

    return validityFlag;
  }
  async interpretData(data, suppDevice, prevState, deviceModel, asset) {
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    let devices = await deviceModel.find().exec();
    let spDevice = await devices.find(({ _id }) => _id == suppDevice._id);
    //  let asset = await AssetModel.find({ _id: assetId }).exec();
    // if (asset.length > 0) {
    //   asset = asset[0];
    // }
    spDevice = spDevice.registers;
    let interpretedData = {};
    if (prevState !== undefined) {
      interpretedData = { ...prevState };
    }
    if (Object.keys(data).length !== 0) {
      Object.keys(data).forEach(async (param) => {
        if (data[param].hasOwnProperty('error') == false) {
          if (spDevice.hasOwnProperty(param)) {
            if (data[param].hasOwnProperty('val')) {
              let { val } = data[param];
              let lastUpdated = new Date();
              if (data[param].qty == 2 && val.length === data[param].qty) {
                let upperByte = val[0].toString(16);
                let lowerByte = val[1].toString(16);
                let lowerUpper = upperByte + "" + lowerByte;
                let lowerUpperInt = parseInt(lowerUpper, 16);
                val = lowerUpperInt;
              }


              let { decoder } = spDevice[param];
              if (decoder && data[param].hasOwnProperty("val")) {
                let { func, divisor, values, props } = decoder;
                if (func == "divide") {
                  if (param == "coolantTemp") {
                    // celcius to fahrenheit
                    // Formula: value * 9/5 + 32
                    let coolantVal = this.divide(val, divisor);
                    let coolantValToFahrenheit = (coolantVal * 9 / 5) + 32;
                    interpretedData[param] = {
                      value: coolantValToFahrenheit.toFixed(2),
                      valid: true,
                      missed: false,
                      lastUpdated: lastUpdated
                    };
                  }
                  else if (param == "engineOilPressure") {
                    // Kpa to psi
                    // Formula: value/ 6.895
                    let oilPressureVal = this.divide(val, divisor);
                    let oilValPSI = oilPressureVal / 6.895;
                    interpretedData[param] = {
                      value: oilValPSI.toFixed(2),
                      valid: true,
                      missed: false,
                      lastUpdated: lastUpdated
                    };
                  }
                  else {
                    interpretedData[param] = {
                      value: this.divide(val, divisor),
                      valid: true,
                      missed: false,
                      lastUpdated: lastUpdated
                    };
                  }
                }
                else if (func == "map") {
                  interpretedData[param] = {
                    value: this.map(val, values),
                    valid: true,
                    missed: false,
                    lastUpdated: lastUpdated
                  };
                }
                else if (func == "objectDecoder") {
                  interpretedData[param] = {
                    value: this.objectDecoder(val, props),
                    valid: true,
                    missed: false,
                    lastUpdated: lastUpdated
                  };
                }
              }
              else {
                if (!decoder && data[param].qty === 1) {

                  if (param == "fuelLevel" && asset) {
                    let fuelArray = [];
                    let average = "N/A";
                    if (asset.fuelLevelArray.length > 0) {
                      fuelLevelArray = asset.fuelLevelArray;
                    }
                    if (fuelLevelArray.length < 10) {
                      fuelLevelArray.push(val[0]);
                      AssetModel.updateOne({ _id: asset._id }, { $set: { fuelLevelArray: fuelLevelArray } }).exec();
                      //asset.fuelLevelArray = fuelLevelArray;
                      interpretedData[param] = {
                        value: average,
                        valid: true,
                        missed: false,
                        lastUpdated: lastUpdated
                      }

                    }
                    else if (fuelLevelArray.length == 10) {

                      if (asset.fuelLevelFlag == true) {
                        fuelLevelArray[0] = val[0];
                      }
                      let sum = 0;
                      //console.log(fuelLevelArray);
                      fuelLevelArray.forEach((value) => {
                        sum = sum + value;
                      })

                      average = sum / fuelLevelArray.length;
                      average = average.toFixed(2);

                      let arrayLength = fuelLevelArray.length - 1;
                      for (let i = arrayLength; i > 0; i--) {
                        fuelLevelArray[i] = fuelLevelArray[i - 1];
                      }
                      fuelLevelArray[0] = 0;
                      AssetModel.updateOne({ _id: asset._id }, { $set: { fuelLevelArray: fuelLevelArray, fuelLevelFlag: true } }).exec();
                      // console.log(average);
                      interpretedData[param] = {
                        value: average,
                        valid: true,
                        missed: false,
                        lastUpdated: lastUpdated
                      }
                    }
                  }
                  else {
                    interpretedData[param] = {
                      value: val[0],
                      valid: true,
                      missed: false,
                      lastUpdated: lastUpdated
                    }
                  }
                }
                else {
                  interpretedData[param] = {
                    value: val,
                    valid: true,
                    missed: false,
                    lastUpdated: lastUpdated
                  }
                }
              }

            }
            else {
              if (interpretedData[param] !== undefined) {
                if (interpretedData[param].hasOwnProperty('lastUpdated')) {
                  let lastUpdate = interpretedData[param].lastUpdated;
                  interpretedData = this.dataValidity(lastUpdate, interpretedData, param)
                }
              }
            }
          }
        }
        else {
          if (interpretedData[param] !== undefined) {
            if (interpretedData[param].hasOwnProperty('lastUpdated')) {
              let lastUpdate = interpretedData[param].lastUpdated;
              interpretedData = this.dataValidity(lastUpdate, interpretedData, param)
            }
          }
        }

      })

    }
    else {
      if (interpretedData !== undefined) {
        Object.keys(interpretedData).forEach((param) => {
          if (interpretedData[param] !== undefined) {
            let lastUpdate = interpretedData[param].hasOwnProperty('lastUpdated') ? interpretedData[param].lastUpdated : '';
            interpretedData = lastUpdate !== '' ? this.dataValidity(lastUpdate, interpretedData, param) : '';
          }
        }
        )
      }

      // for comm failure
      //   let NotificationService = ServiceLocator.resolve("NotificationService");
      //   let AssetsModel = ServiceLocator.resolve("AssetsModel");


      //   let commFailure = this.commFailureValidity(prevState);
      //  // console.log('Comm Failure '+ commFailure);
      //   if(!commFailure){
      //     let secondValidity = true;
      //     //setTimeout(async function(){
      //       let assets = await AssetsModel.find().exec();
      //       let asset = assets.find(({_id})=> _id == assetId);
      //         let {state} = asset || {};
      //         if(state !== undefined || state !== null)
      //         {
      //           Object.keys(state).forEach((param)=>{
      //            if([param !== 'systemOverview'])
      //            {
      //             if(prevState[param].hasOwnProperty('valid') && state[param].hasOwnProperty('valid')){
      //               if(prevState[param].valid == state[param].valid)
      //               {
      //                 secondValidity == true;
      //               }
      //               else
      //               {
      //                 secondValidity == false;
      //               }
      //             }
      //            }

      //           })

      //           if(secondValidity == false)
      //           {
      //             let secondCommFailureValidity = this.commFailureValidity(state);
      //             if(!secondCommFailureValidity)
      //             {
      //               NotificationService.createCommFailureNotification(assetId,suppDevice.type)
      //             }
      //           }
      //         }


      //     // }, 20000)
      //   }


    }
    // console.log(interpretedData);
    return interpretedData;
  }
}

export const SupportedDeviceHelpers = new SupportedDeviceHelperClass();
