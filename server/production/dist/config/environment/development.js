"use strict";

// Development specific configuration
// ==================================

module.exports = {
  // MongoDB connection options

  mongo: {
    //uri: "mongodb://localhost:27017/RMSNode2", //mine
    //uri: "mongodb://localhost:27017/RMSNode", //mine
    //  uri: "mongodb://localhost:27017/RMSNodeTest", //mine
    uri: "mongodb://127.0.0.1:27017/RMSNodeTest1" //mine
    //uri: "mongodb://localhost:27017/RMSNodeDB", //mine
    //uri: "mongodb://localhost:27017/RMSNodeTest2", //mine
    // uri: "mongodb+srv://dbUser:dbUserPassword@rms-cluster.hbuqy.mongodb.net/rms-web-app?retryWrites=true&w=majority"  // Cloud (MongoDB Atlas) - Used only for Azure Deployment
  },

  seedDB: true,
  defaultData: {
    tenant: {
      id: "ps19",
      desc: "Powersoft19",
      name: "Powersoft19 Rail Group"
    },
    email: "admin@gms.com",
    pass: "admin",
    adminGroup: { id: "admin", desc: "Administrator" }
  }
};