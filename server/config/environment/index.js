"use strict";

let path = require("path");
let _ = require("lodash");
require('dotenv').config();
function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
}
// All configurations will extend these options
// ============================================

let all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + "/../../.."),

  uploads: path.join(path.normalize(__dirname + "/../../.."), "server/uploads"),
  uploadPath: path.join(
    path.normalize(__dirname + "/../../.."),
    "server/uploads/images"
  ),
  thumbnailsPath: path.join(
    path.normalize(__dirname + "/../../.."),
    "server/uploads/thumbnails"
  ),
  audioPath: path.join(
    path.normalize(__dirname + "../../../.."),
    "server/uploads/audio"
  ),
  assetImages: path.join(
    path.normalize(__dirname + "../../../.."),
    "server/uploads/assetImages"
  ),
  assetDocuments: path.join(
    path.normalize(__dirname + "../../../.."),
    "server/uploads/assetDocuments"
  ),
  giTestForms: path.join(
    path.normalize(__dirname + "../../../.."),
    "server/uploads/giTestForms"
  ),

  client_id: "PS19-OAUTH2-SERVER-bhbjbfjsdbfj",
    
  // Server port
  port: process.env.PORT || 6003, // For Production -> 443

  // Server IP
  ip: process.env.IP || "127.0.0.1", // For Production -> 52.170.16.195

  server_comm_protocol: process.env.COMM_PROTOCOL || "http", // For Production -> "https"
  
  // Domain Name
  domain_name: "brcgenset.eastus.cloudapp.azure.com",

  // Should we populate the DB with sample data?
  //seedDB: true, // this should come from enviornment specific configuraiton such as "development.js" or "production.js"

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: "pms-secret-word",
  },

  // List of user roles
  userRoles: ["guest", "user", "admin"],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true,
      },
    },
  },
  email: {
    provider: "gmail",
   user: "gensettool@gmail.com",
   //user: "osamaiqbalcs@gmail.com",
   //pass: "socbvbpxvlyyzizu",
   pass: "pgbdfmjptbxptlko",
   
    errors: {
      no_recipient: "The message must have at least one recipient.",
    },
  },
  // email: {
  //   provider: "smtp-mail.outlook.com",
  //   user: "gensettool@outlook.com",
  //   pass: "123Welcome#",
  //   errors: {
  //     no_recipient: "The message must have at least one recipient.",
  //   },
  // },
};

// Export the config object based on the NODE_ENV
// ==============================================
//module.exports =all;

module.exports = _.merge(
  all,
  require("./" + (process.env.NODE_ENV || "development") + ".js") || {}
);
