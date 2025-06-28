import { dynamicLanguageToDB } from "../../../dynamicLanguage/languageSeed.js";
import { addIfNotExist } from "../dbFunctions/dbHelperMethods.js";
let devicesAsAssets = require("../../../api/assets/devices.model");


let listOfSupportedDevices = [
    {
        type: "GENSET",
        name: "Decision-Maker 3000 Generator Set Controller",
        modelInfo: {
            Make: "Kohler",
            Model: "Decision-Maker 3000",
            Variant: null
        },
        registers: {
            genStatus: {
                addr: 1470,
                qty: 1,
                decoder: {
                    func: "map",
                    values: {
                        0: "Off",
                        1: "Cranking",
                        2: "Crank Pause",
                        3: "Idle",
                        4: "Running",
                        5: "Cooldown",
                        6: "Stopping",
                        7: "Shutdown",
                        8: "Test Loaded",
                        9: "TestUnloaded",
                        10: "Exer Diagn",
                        11: "Exer Loaded",
                        12: "Priming",
                        13: "ECM powered",
                        14: "Fault Cldn",
                        15: "Standby",
                        16: "Preheat"
                    }
                }
            },
            Va: {
                addr: 1341,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            Vb: {
                addr: 1343,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            Vc: {
                addr: 1345,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            Ia: {
                addr: 1349,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            Ib: {
                addr: 1351,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            Ic: {
                addr: 1353,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            freq: {
                addr: 1357,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            generatedEnergy: {
                addr: 1511,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            coolantTemp: {
                addr: 1102,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            coolantPressure: {
                addr: 1113,
                qty: 1
            },
            engineOilLevel: {
                addr: 1103,
                qty: 1
            },
            engineOilPressure: {
                addr: 1101,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            engineOilTemp: {
                addr: 1114,
                qty: 1
            },
            engineSpeed: {
                addr: 1099,
                qty: 1
            },
            batteryVoltage: {
                addr: 1106,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            fuelLevel: {
                addr: 1105,
                qty: 1
            },
            fuelTemp: {
                addr: 1108,
                qty: 1
            },
            fuelPressure: {
                addr: 1109,
                qty: 1
            },
            controllerOpTime: {
                addr: 1503,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            engineTotalTime: {
                addr: 1505,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            engineTimeLoaded: {
                addr: 1507,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            engineTotalStarts: {
                addr: 1509,
                qty: 2
            },
            modBusProductId : {
                addr: 9998,
                qty: 1
            }
        }
    },
    {
        type: "ATS",
        name: "MPAC 1000 ATS Controller",
        modelInfo: {
            Make: "Kohler",
            Model: "MPAC 1000",
            Variant: null
        },
        registers: {
            systemOverview: {
                addr: 1470,
                qty: 1,
                decoder: {
                    func: "objectDecoder",
                    props: {
                        prefSrc: {
                            decoder: "map",
                            mask: 4,
                            shift: 2,
                            values: {
                                0: "Source1",
                                1: "Source2"
                            }
                        },
                        prefSrcAvail: {
                            decoder: "map",
                            mask: 8192,
                            shift: 13,
                            values: {
                                0: "Yes",
                                1: "No"
                            }
                        },
                        standbySrcAvail: {
                            decoder: "map",
                            mask: 16384,
                            shift: 14,
                            values: {
                                0: "Yes",
                                1: "No"
                            }
                        }
                    }
                }
            },
            srcA_V1: {
                addr: 1,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            srcA_V2: {
                addr: 2,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            srcA_V3: {
                addr: 3,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            srcB_V1: {
                addr: 4,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            srcB_V2: {
                addr: 5,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            srcB_V3: {
                addr: 6,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            srcA_Freq: {
                addr: 13,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            srcB_Freq: {
                addr: 14,
                qty: 1,
                decoder: {
                    func: "divide",
                    divisor: 10
                }
            },
            lastOutageTime: {
                addr: 1009,
                qty: 1
            },
            lastOutageDate: {
                addr: 1010,
                qty: 1,
                decoder: {
                    func: "getDate",
                    params: {
                        day: {
                            decoder: "map",
                            mask: 31
                        },
                        month: {
                            decoder: "map",
                            mask: 480,
                            shift: 5
                        },
                        year: {
                            decoder: "map",
                            mask: 65024,
                            shift: 9
                        }
                    }
                }
            },
            lastOutageDuration: {
                addr: 1011,
                qty: 2,
                decoder: {
                    func: "divide",
                    divisor: 2
                }
            },
            switchTrasferTotal: {
                addr: 1311,
                qty: 1
            },
            modBusProductId: {
                addr: 9998,
                qty: 1
            }
        }
    }
];

export async function createSupportedDevices() {
  for (const sd of listOfSupportedDevices) {
    await addIfNotExist(SupportedDevices, { type: sd.type, name: sd.name }, sd);
  }

  dynamicLanguageToDB();
 }
// export async function deletelistOfSupportedParams(list) {
//   if (list && list.length) {
//     for (let l2d of list) {
//       if (!l2d.listName || !l2d.code) continue;
//       console.log("attempting to delete applicaitonlookup: listname:", l2d.listName, "code:", l2d.code);
//       await ApplicationLookupsModel.deleteOne({ listName: l2d.listName, code: l2d.code });
//     }
//   }
// }

//
// provide this function array of {listName:'', code:'', compare:''}
// listName and code identifies the unique entry
// compare contains the field to match, if match fails, the entry will be updated
//
// export async function updateApplicationLookups(list) {
//   if (list && list.length) {
//     for (let l2u of list) {
//       if (!l2u.listName || !l2u.code || !l2u.compare) continue;
//       let item2u = await ApplicationLookupsModel.findOne({ listName: l2u.listName, code: l2u.code }).exec();
//       let item2compare = listOfAppLookups.find((a) => {
//         return a.listName === l2u.listName && a.code === l2u.code;
//       });
//       if (item2u && item2u[l2u.compare] !== undefined && item2compare && item2compare[l2u.compare] !== undefined) {
//         ////if(item2u && item2u[l2u.compare] && item2compare && item2compare[l2u.compare])
//         let f1 = item2u[l2u.compare];
//         let f2 = item2compare[l2u.compare];
//         try {
//           if (JSON.stringify(f1) !== JSON.stringify(f2)) {
//             item2u[l2u.compare] = item2compare[l2u.compare];
//             item2u.markModified(l2u.compare);
//             await item2u.save();
//           }
//         } catch (err) {}
//       }
//     }
//   }
// }
