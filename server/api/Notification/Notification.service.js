let ServiceLocator = require("../../framework/servicelocator");
const NotificationModel = require('./Notification.model');
const emailService = require('./../../service/EmailService');
import ApplicationLookupsModel from '../ApplicationLookups/ApplicationLookups.model.js';
import moment from "moment-timezone.js";
let fuelLevelFluctuations = 0;
let prevFuelAvg = 0;
let fuelLevelArray = [];
let fuelLevelArrayFlag = false;
class NotificationService {
  constructor() {
    this.logger = ServiceLocator.resolve("logger");
  }
  async findDevicesAlerts(id) {
    let resultObj = { value: {} };
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    let NotificationModel = ServiceLocator.resolve("NotificationModel");
    let notifications = await NotificationModel.find({ ackFlag: false }).sort({ createdAt: -1 }).exec();
   
    let alertsArray = [];
    let reportingArray = [];
    try {
      if (id) {
        let assets = await AssetModel.find({}).exec();
        let devices = assets.filter(({ parentAsset, isRemoved }) => parentAsset == id && isRemoved == false);
       
        if (devices.length > 0) {
          devices.forEach((device) => {
            let alert = notifications.filter(({ targetAsset }) => targetAsset == device._id);
            if (alert && alert.length > 0) {
              alert = alert.slice(0,50);
              alert.forEach((alrt) => {
                alertsArray.push(alrt);
              })
            }
          });
          if (alertsArray.length > 0) {
            let sortInDesc = alertsArray.sort((a, b) => {
              return b.createdAt - a.createdAt;
            })
            sortInDesc = sortInDesc.slice(0, 50);

            sortInDesc.length > 0 ? reportingArray.push(sortInDesc) : null;
          }
          resultObj.value.alerts = reportingArray;
        }
      }
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }
  //find alerts
  async findAlerts(id) {
    let resultObj = { value: {} };
    let alertsArray = [];
    let notifications = await NotificationModel.find({ targetAsset: id, ackFlag: false }).exec();
    try {
      if (notifications) {
        notifications.forEach((notif) => {
          if (notif && notif.messageInfo) {
            if (notif.messageInfo && notif.messageInfo.code) {
              if (notif.messageInfo.code == 404) {
                alertsArray.push(notif);
              }
            }
          }
        })
        resultObj.value.alerts = alertsArray;
      }
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }
  async updateAssetFuelFlag(assetId, state, notifFlag) {
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    if (assetId != null) {
      try {
        AssetModel.updateOne({ _id: assetId }, { $set: { [notifFlag]: state } }).exec();
      } catch (error) {
        console.log("updateAssetFuelFlag " + error);
      }
    }
  }

  async createNotification(assetId, prevState, data) {

    let LookUpsModel = ServiceLocator.resolve('ApplicationLookupsModel');
    let lookupsData = await LookUpsModel.find().exec();
    if (data !== undefined && lookupsData) {
      Object.keys(data).forEach(async (param) => {
        if (param == "systemOverview") {
          let { value } = data[param] || undefined;
          if (value !== undefined) {
            Object.keys(value).forEach((val) => {

              if (val !== "prefSrc") {
                let atsParam = lookupsData.filter(({ name }) => name === val);

                if (atsParam !== undefined && prevState !== undefined) {

                  for (let parameter in atsParam) {

                    if (data[param] !== undefined && prevState[param] !== undefined) {

                      if (data[param].hasOwnProperty('value') && prevState[param].hasOwnProperty('value')) {
                        if (data[param].value[val] !== prevState[param].value[val]) {
                          value[val] == atsParam[parameter].threshold ? this.saveATSNotification(atsParam[parameter], assetId, value) : ''
                        }
                      }
                    }
                  }
                }
              }
            })
          }
        }
        else {
          let paramInfo = lookupsData.find(({ name }) => name === param);
          let AssetModel = ServiceLocator.resolve("AssetsModel");
          let asset = await AssetModel.find({ _id: assetId }).exec();
          if (asset.length > 0) {
            asset = asset[0];
          }
          if (paramInfo !== undefined && prevState !== undefined && data !== undefined) {
            if (data.hasOwnProperty(param) && prevState.hasOwnProperty(param)) {
              if (data[param].hasOwnProperty('value') && prevState[param].hasOwnProperty('value')) {
                if (param == "fuelLevel") {
                  if (data[param].value <= 10) {
                    if ((prevState[param].value > data[param].value) && (asset.notifFlag10 == false)) {
                      this.saveNotification(paramInfo, assetId, "10%");
                      await this.updateAssetFuelFlag(assetId, true, "notifFlag10");
                      
                    }
                  }
                  else if (data[param].value <= 20) {

                    if ((prevState[param].value > data[param].value) && (asset.notifFlag20 == false)) {
                      this.saveNotification(paramInfo, assetId, "20%");
                      await this.updateAssetFuelFlag(assetId, true, "notifFlag20");
                      
                    }
                  }
                  else if (data[param].value <= 30) {
                    if ((prevState[param].value > data[param].value) && (asset.notifFlag30 == false)) {
                      this.saveNotification(paramInfo, assetId, "30%");
                      await this.updateAssetFuelFlag(assetId, true, "notifFlag30");
                      
                    }
                  }

                  if (data[param].value >= 11) {
                    await this.updateAssetFuelFlag(assetId, false, "notifFlag10");
                  } 
                  if (data[param].value >= 21) {
                    await this.updateAssetFuelFlag(assetId, false, "notifFlag20");
                  } 
                  if (data[param].value >= 31) {
                    await this.updateAssetFuelFlag(assetId, false, "notifFlag30");
                  }

                }
                if (data[param].value !== prevState[param].value) {

                  if (paramInfo.type == "GENSET" && param !== 'batteryVoltage' && param !== "coolantTemp" && param !== 'engineSpeed' && param !== 'batteryVoltage' && param !== "engineOilTemp" && param !== "fuelTemp" && param !== "engineOilPressure" && param !== "coolantPressure" && param !== "fuelPressure" && param !== "engineOilLevel") {

                    if (param == "genStatus") {
                      paramInfo = lookupsData.filter(({ name }) => name === param);
                      for (let parameter in paramInfo) {
                        if (data[param].value == paramInfo[parameter].threshold) {
                          this.saveNotification(paramInfo[parameter], assetId)
                        }
                      }

                    }
                  }
                  // else if (paramInfo.type == "GENSET" && param === "coolantTemp") {
                  //   data[param].value > paramInfo.threshold ? this.saveNotification(paramInfo, assetId) : ''

                  // }
                }
              }
            }
          }

        }
      })
    }
  }
  async saveNotification(paramInfo, assetId, msgValue = null) {
    try {
      let EventsModel = ServiceLocator.resolve('EventsModel');
      let events = await EventsModel.find().exec();
      let event = events.find(({ code }) => code == paramInfo.eventType);
      let NotificationModel = ServiceLocator.resolve('NotificationModel');
      let SocketIOService = ServiceLocator.resolve("SocketIOService");

      if (event !== undefined) {
        let notificationData = {
          targetAsset: assetId,
          type: event.type,
          code: event.code,
          priority: event.priority,
          pushNotification: event.pushNotification,
          messageInfo: {
            title: event.messageInfo.title,
            message: event.messageInfo.message
          }
        }
        if (msgValue !== null && paramInfo.name == "fuelLevel") {
          notificationData.messageInfo.message = notificationData.messageInfo.message + " " + msgValue;
        }
        let notify = new NotificationModel(notificationData);
        let saved = await notify.save();
        SocketIOService.onNotificationCreate(saved);
      }
    } catch (error) {
      console.log("saveNotification " + error);
    }
  }
  async mainOnGenOn(assetId,notificationData)
  {
    let SocketIOService = ServiceLocator.resolve("SocketIOService");
    let notifyGenMainOn = new NotificationModel(notificationData);
    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    let asset = await AssetsModel.findById(assetId).exec();
    if (asset !== undefined) {
      let { state = {} } = asset || undefined;
      if (state !== undefined || state !== null) {
        if (state.hasOwnProperty('systemOverview')) {
          let { value = {} } = state.systemOverview || undefined;
          if (value !== undefined || value !== null) {
            let { prefSrc, prefSrcAvail, standbySrcAvail } = value || undefined;
            if (prefSrcAvail !== undefined || prefSrcAvail !== null && standbySrcAvail !== undefined || standbySrcAvail !== null) {
              if (prefSrcAvail == 'Yes' && standbySrcAvail == 'Yes') {
                let savedMainGen = await notifyGenMainOn.save();
                SocketIOService.onNotificationCreate(savedMainGen);
              }
            }
          }
        }
      }
    }
  }

  async mainOffGenOff(assetId,notificationData)
  {
    let SocketIOService = ServiceLocator.resolve("SocketIOService");
    let notifyGenMainOFF = new NotificationModel(notificationData);
    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    let asset = await AssetsModel.findById(assetId).exec();
    if (asset !== undefined) {
      let { state = {} } = asset || undefined;
      if (state !== undefined || state !== null) {
        if (state.hasOwnProperty('systemOverview')) {
          let { value = {} } = state.systemOverview || undefined;
          if (value !== undefined || value !== null) {
            let { prefSrc, prefSrcAvail, standbySrcAvail } = value || undefined;
            if (prefSrcAvail !== undefined || prefSrcAvail !== null && standbySrcAvail !== undefined || standbySrcAvail !== null) {
              if (prefSrcAvail == 'No' && standbySrcAvail == 'No') {
                let savedMainGenOFF = await notifyGenMainOFF.save();
                SocketIOService.onNotificationCreate(savedMainGenOFF);
              }
            }
          }
        }
      }
    }
  }
  async saveATSNotification(paramInfo, assetId, state) {
    try {
      let engineCoolDown = 60000;
      let backupMain = 60000;
      let mainOFF = 60000;
      let backupOn = 60000;
      let EventsModel = ServiceLocator.resolve('EventsModel');
      let events = await EventsModel.find().exec();
      let event = events.find(({ code }) => code == paramInfo.eventType);
      let coolDownTime = await ApplicationLookupsModel.find({ eventType: 1 }).exec();

      let backupMainTime = await ApplicationLookupsModel.find({ eventType: 2 }).exec();
      let mainOFFTime = await ApplicationLookupsModel.find({ eventType: 3 }).exec();
      let backupOnTime = await ApplicationLookupsModel.find({ eventType: 4 }).exec();

      if (coolDownTime.length > 0) {
        engineCoolDown = coolDownTime[0].opt1;
      }
      if (backupMainTime.length > 0) {
        backupMain = backupMainTime[0].opt1;
      }
      if (mainOFFTime.length > 0) {
        mainOFF = mainOFFTime[0].opt1;
      }
      if (backupOnTime.length > 0) {
        backupOn = backupOnTime[0].opt1;
      }
      let NotificationModel = ServiceLocator.resolve('NotificationModel');
      let SocketIOService = ServiceLocator.resolve("SocketIOService");
      if (event !== undefined) {
        let notificationData = {
          targetAsset: assetId,
          type: event.type,
          code: event.code,
          priority: event.priority,
          pushNotification: event.pushNotification,
          status: 'unsent',
          messageInfo: {
            title: event.messageInfo.title,
            message: event.messageInfo.message
          }
        }

        let notify = new NotificationModel(notificationData);

        if (event.code !== 10009) {
          setTimeout(async function () {
            let saved = await notify.save();
            SocketIOService.onNotificationCreate(saved);
          }, 8000)
        }
        // Main ON and Gen is also ON Alert
        if (paramInfo.eventType == 10002 && state.standbySrcAvail == "Yes" || paramInfo.eventType == 10003 && state.prefSrcAvail == "Yes") {

          let eventGenMain = events.find(({ code }) => code == 10009);
          let notificationData = {
            targetAsset: assetId,
            type: eventGenMain.type,
            code: eventGenMain.code,
            priority: eventGenMain.priority,
            pushNotification: eventGenMain.pushNotification,
            status: 'unsent',
            messageInfo: {
              title: eventGenMain.messageInfo.title,
              message: eventGenMain.messageInfo.message
            }
          }
          let timeout1 = (assetId,notificationData) => {setTimeout( () => {
              this.mainOnGenOn(assetId,notificationData);
          }, engineCoolDown)}
          timeout1(assetId,notificationData);
        }

        // Main OFF and Gen OFF Alert

        if (paramInfo.eventType == 10001 && state.standbySrcAvail == "No" || paramInfo.eventType == 10004 && state.prefSrcAvail == "No") {

          let eventGenMain = events.find(({ code }) => code == 100018);
          let notificationData = {
            targetAsset: assetId,
            type: eventGenMain.type,
            code: eventGenMain.code,
            priority: eventGenMain.priority,
            pushNotification: eventGenMain.pushNotification,
            status: 'unsent',
            messageInfo: {
              title: eventGenMain.messageInfo.title,
              message: eventGenMain.messageInfo.message
            }
          }
          let timeout2 = (assetId,notificationData) => {setTimeout( () => {
            this.mainOffGenOff(assetId,notificationData);
          }, backupMain)}
          timeout2(assetId,notificationData);
        }

        // // Main Off for more than defined time
        // if (paramInfo.eventType == 10001 && state.prefSrcAvail == "No") {

        //   let eventGenMain = events.find(({ code }) => code == 100019);
        //   let notificationData = {
        //     targetAsset: assetId,
        //     type: eventGenMain.type,
        //     code: eventGenMain.code,
        //     priority: eventGenMain.priority,
        //     pushNotification: eventGenMain.pushNotification,
        //     status: 'unsent',
        //     messageInfo: {
        //       title: eventGenMain.messageInfo.title,
        //       message: eventGenMain.messageInfo.message
        //     }
        //   }
        //   setTimeout(async function () {
        //     let notifyGenMainOFF = new NotificationModel(notificationData);
        //     let AssetsModel = ServiceLocator.resolve("AssetsModel");
        //     let asset = await AssetsModel.findById(assetId).exec();
        //     if (asset !== undefined) {
        //       let { state = {} } = asset || undefined;
        //       if (state !== undefined || state !== null) {
        //         if (state.hasOwnProperty('systemOverview')) {
        //           let { value = {} } = state.systemOverview || undefined;
        //           if (value !== undefined || value !== null) {
        //             let { prefSrc, prefSrcAvail, standbySrcAvail } = value || undefined;
        //             if (prefSrcAvail !== undefined || prefSrcAvail !== null) {
        //               if (prefSrcAvail == 'No') {
        //                 let savedMainGenOFF = await notifyGenMainOFF.save();
        //                 SocketIOService.onNotificationCreate(savedMainGenOFF);
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }, mainOFF)
        // }
        // BackUp ON for more than defined time

        // if (paramInfo.eventType == 10003 && state.standbySrcAvail == "Yes") {

        //   let eventGenMain = events.find(({ code }) => code == 100020);
        //   let notificationData = {
        //     targetAsset: assetId,
        //     type: eventGenMain.type,
        //     code: eventGenMain.code,
        //     priority: eventGenMain.priority,
        //     pushNotification: eventGenMain.pushNotification,
        //     status: 'unsent',
        //     messageInfo: {
        //       title: eventGenMain.messageInfo.title,
        //       message: eventGenMain.messageInfo.message
        //     }
        //   }
        //   setTimeout(async function () {
        //     let notifyGenMainOFF = new NotificationModel(notificationData);
        //     let AssetsModel = ServiceLocator.resolve("AssetsModel");
        //     let asset = await AssetsModel.findById(assetId).exec();
        //     if (asset !== undefined) {
        //       let { state = {} } = asset || undefined;
        //       if (state !== undefined || state !== null) {
        //         if (state.hasOwnProperty('systemOverview')) {
        //           let { value = {} } = state.systemOverview || undefined;
        //           if (value !== undefined || value !== null) {
        //             let { prefSrc, prefSrcAvail, standbySrcAvail } = value || undefined;
        //             if (standbySrcAvail !== undefined || standbySrcAvail !== null) {
        //               if (standbySrcAvail == 'Yes') {
        //                 let savedMainGenOFF = await notifyGenMainOFF.save();
        //                 SocketIOService.onNotificationCreate(savedMainGenOFF);
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }, backupOn)
        // }
      }
    } catch (error) {
      console.log("saveATSNotification " + error);
    }
  }
  async createCommFailureNotification(assetId, code, description, deviceType) {
    try {
      let EventsModel = ServiceLocator.resolve('EventsModel');
      let events = await EventsModel.find().exec();
      let SocketIOService = ServiceLocator.resolve("SocketIOService");
      let AssetModel = ServiceLocator.resolve("AssetsModel");
      let event;
      if (deviceType == "GENSET") {
        event = events.find(({ code }) => code == 100012);
      }
      else if (deviceType == "ATS") {
        event = events.find(({ code }) => code == 100013);
      }

      if (event !== undefined) {
        let notificationData = {
          targetAsset: assetId,
          type: event.type,
          code: event.code,
          priority: event.priority,
          pushNotification: event.pushNotification,
          status: 'unsent',
          messageInfo: {
            title: event.messageInfo.title,
            message: event.messageInfo.message,
            code: code,
            description: description
          }
        }

        let notify = new NotificationModel(notificationData);
        let saved = await notify.save();
        AssetModel.updateOne({ _id: assetId }, { $set: { commStatus: true } }).exec();
        SocketIOService.onNotificationCreate(saved);
      }
    } catch (error) {
      conosle.log("createCommFailureNotification " + error);
    }
  }
  async createGatewayCommFailureNotification(device) {
    let resultObj = {};
    if (device) {
      try {
        let EventsModel = ServiceLocator.resolve('EventsModel');
        let NotificationModel = ServiceLocator.resolve('NotificationModel');

        let existingNotif = await NotificationModel.find({ targetAsset: device._id, ackFlag: false }).exec();
        let foundFlag = false;
        if (existingNotif && existingNotif.length > 0) {
          existingNotif.forEach((notif) => {
            if (notif && notif.messageInfo && notif.messageInfo.code == 404) {
              foundFlag = true;
            }
          })
        }
        if (!foundFlag) {
          let events = await EventsModel.find().exec();
          let SocketIOService = ServiceLocator.resolve("SocketIOService");
          let AssetModel = ServiceLocator.resolve("AssetsModel");
          let event;
          if (device.suppDevice.type == "GENSET") {
            event = events.find(({ code }) => code == 100012);
          }
          else if (device.suppDevice.type == "ATS") {
            event = events.find(({ code }) => code == 100013);
          }

          if (event !== undefined) {
            let notificationData = {
              targetAsset: device._id,
              type: event.type,
              code: event.code,
              priority: event.priority,
              pushNotification: event.pushNotification,
              status: 'unsent',
              messageInfo: {
                title: "Comm Failure",
                message: "Gateway connection failed",
                code: 404,
                description: "Gateway connection failed"
              }
            }

            let notify = new NotificationModel(notificationData);
            let saved = await notify.save();
            resultObj.value = saved;
            AssetModel.updateOne({ _id: device._id }, { $set: { commStatus: true } }).exec();
            SocketIOService.onNotificationCreate(saved);
          }
        } else {
          resultObj.errorVal = "An unacknowlegded 404 notif already exist";
        }
      } catch (error) {
        console.log("createCommFailureNotification " + error);
      }
    }
  }
  async createCommRestoreNotification(assetId, deviceType) {
    try {
      let EventsModel = ServiceLocator.resolve('EventsModel');
      let events = await EventsModel.find().exec();
      let SocketIOService = ServiceLocator.resolve("SocketIOService");
      let AssetModel = ServiceLocator.resolve("AssetsModel");
      let event;
      if (deviceType == "GENSET") {
        event = events.find(({ code }) => code == 100015);
      }
      else if (deviceType == "ATS") {
        event = events.find(({ code }) => code == 100014);
      }

      if (event !== undefined) {
        let notificationData = {
          targetAsset: assetId,
          type: event.type,
          code: event.code,
          priority: event.priority,
          pushNotification: event.pushNotification,
          status: 'unsent',
          messageInfo: {
            title: event.messageInfo.title,
            message: event.messageInfo.message
          }
        }

        let notify = new NotificationModel(notificationData);
        let saved = await notify.save();
        AssetModel.updateOne({ _id: assetId }, { $set: { commStatus: false } }).exec();
        SocketIOService.onNotificationCreate(saved);
      }
    } catch (error) {
      console.log("createCommRestoreNotification " + error);
    }
  }

  async getUsersEmailList() {
    var alertEmails = [];
    let UserModel = ServiceLocator.resolve("userModel");
    try {
      let users = await UserModel.find().exec();
      if (users) {
        for (let i = 0; i < users.length; i++) {
          let user = users[i];
          if (user.alerts.email == true) {
            if (user.genericEmail) {
              alertEmails.push(user.genericEmail);
            }
          }
        }
      }
      return alertEmails;
    } catch (error) {
      console.log("getUsersEmailList " + error);
    }

  }
  async sendNewNotifications() {
    try {
      const emailList = await this.getUsersEmailList();
      let AssetModel = ServiceLocator.resolve("AssetsModel");
      let ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
      const SocketIORoomService = ServiceLocator.resolve('SocketIORoomService');
      const notifications = await NotificationModel.find({ status: 'unsent' }).exec();
      const timeZoneItem = await ApplicationLookupsModel.findOne({listName:"emailTimezone"}).exec();
      let timeZone = null;
      if(timeZoneItem)
      {
        timeZone = timeZoneItem.opt1;
      }
      let assets = await AssetModel.find().exec();
      // console.log(assets);
      let alertAsset;
      notifications.forEach(async notify => {
        if (assets && notify) {
          let alertDevice = assets.find(({ _id }) => _id == notify.targetAsset);
          if (alertDevice) {
            alertAsset = assets.find(({ _id }) => _id == alertDevice.parentAsset);
          }
        }
        const { title, messageInfo, createdAt } = notify || undefined;
        const { Email, SMS, Audiable } = notify.pushNotification || undefined;
        if (messageInfo !== undefined && Email !== undefined) {
          if (Email == true && emailList.length > 0) {
            this.sendEmail(messageInfo.title, messageInfo.message, alertAsset, createdAt, emailList, timeZone).then(() => {
              this.updateSendStatus(notify);
            }).catch((err) => {
              console.log('Notification email sending failed', err);
              //this.updateSendStatus(notify);
            });
          }
        }

      })
      return { success: true, message: 'Notification created' };
    } catch (error) {
      console.log("sendNewNotifications " + error)
    }
  }
  async updateSendStatus(data) {

    try {
      if (data) {
        let notification = await NotificationModel.findById(data._id);
        if (notification) {
          notification.status = "sent"
          await notification.save();
          console.log("send notif success");
          return { success: true, message: 'Notification updated', status: 200 };
        }
      }
    } catch (error) {
      console.log("updateSendStatus " + error);
    }
  }
  async sendEmail(title, message, alertAsset, createdTime, email, timezone) {
    //console.log(email);
    if (email.length > 0 && alertAsset) {
      return new Promise((resolve, reject) => {
        let desiredTimeZone = "US/Central";
        if(timezone) {
          desiredTimeZone = timezone;
        }
        let createdAt = moment(createdTime);
        let timeStamp =  createdAt.tz(desiredTimeZone).format("MM-DD-YYYY hh:mm:ss")+" "+desiredTimeZone;

        let mailOptions = {
          to: email,
          subject: title,
          html: `
          <div style="border:1px solid black; box-shadow: 0px 0px 8px grey">
          <div style="text-align:center; background:#1B1464; height:90px">
            <img src="cid:logo" style="height:90px" />
            </div>
          <div style="margin:10px">
            <p><b style="font-size: 16px">${message}</b></p>
            <p><b>Time:${timeStamp}</b></p>
            <p><b>Location:${alertAsset.name}</b></p>
            <div><b>This email is auto generated and is intended for your information only. Please do not reply to this email.</b></div>
            <h3><b>TekTracking Team</b></h4>
          </div>
          </div>
        `,
          attachments: [{
            filename: 'logo.png',
            path: '../../GMS/server/public/images/logo.png',
            cid: 'logo' //same cid value as in the html img src
          }]
        };

        emailService(mailOptions, (err, info) => {
          // console.log(mailOptions.to);
          if (err) {
            //console.log(err);
            reject(new Error(err));
          }

          resolve({ success: true });
        });
      })
    }
  }

  async updateStatus(data) {
    try {
      let notification = await NotificationModel.findById(data._id);
      //console.log(notification);
      if (notification) {
        notification.ackFlag = data.ackFlag;
        notification.ackAt = data.ackAt;
        let savedNotification = await notification.save();

        return { success: true, message: 'Notification updated', value: savedNotification, status: 200 };
      }
    }
    catch (error) {
      console.log("Update Alert Status " + error)
    }
  }

  async acknowledgeAll(ackData) {
    let resultObj = {};
    try {
      for (let alert in ackData) {
        let notification = await NotificationModel.findById(ackData[alert]._id);
        if (notification) {
          notification.ackFlag = true;
          notification.ackAt = new Date();
          let saved = await notification.save();
        }
      }
      resultObj.value = 'Notification updated';
    }
    catch (error) {
      console.log("Acknowledge All: " + error);
      resultObj = { errorVal: error.toString(), status: 500 };
    }
    return resultObj;
  }
  async pullNotificationForUser(userId) {
    const notifications = await NotificationModel.find({ destination: userId, isRemoved: false, notificationType: 'web' }).sort({ createdAt: 'desc' }).exec();

    notifications.forEach(async (notification) => {
      if (notification.status === 'new') {
        notification.status = 'unread';

        await notification.save();
      }
    });

    return notifications;
  }
    async delete3MonthOldNotif() {

    var currentDate = new Date();
    var oldDate = moment(currentDate).subtract(3, 'months').toDate();
    
    if (oldDate) {
      NotificationModel.deleteMany({ createdAt: { $lte: oldDate } }).then(function () {
        //  console.log("Three months old notifications deleted"); // Success
      }).catch(function (error) {
        console.log(error); // Failure
      });
    }
  }

  //     async delete(_id) {
  //       const notification = await NotificationModel.findById(_id);

  //       if (notification) {
  //         notification.isRemoved = true;

  //         await notification.save();

  //         return {success: true, value: 'Notification deleted', status: 200};

  //       } else {
  //         return {success: false, value: "Notfication deletion delete", status: 500};

  //       }
  //     }
}

export default NotificationService;
