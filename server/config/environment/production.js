/**
 * Created by zqureshi on 11/2/2017.
 */
"use strict";

// Production specific configuration
// ==================================

module.exports = {
  // MongoDB connection options
  mongo: {
    // uri: 'mongodb://localhost/iot-dev'
    // uri: 'mongodb://sa:welcome@ds021289.mlab.com:21289/railgroup-dev'
    uri: "mongodb://localhost:27017/GMSDB",
  },
  seedDB: true,
  defaultData: {
    tenant: {
      id: "ps19",
      desc: "Powersoft19",
      name: "Powersoft19 Rail Group",
    },
    email: "admin@gms.com",
    alerts:{
      sms: {type: Boolean, default:false},
      email: {type: Boolean, default:true}
    },
    pass: "admin",
    adminGroup: { id: "admin", desc: "Administrator" },
  },
};
