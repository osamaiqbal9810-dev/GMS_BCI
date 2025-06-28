let ServiceLocator = require("../framework/servicelocator");
let utils = require("../utilities/utils");

export default class DataOperaionsLogic {
  constructor(logger) {
    let es = ServiceLocator.resolve("DataOpEventService");
    es.addCallback("JourneyPlan", "BeforeAddOrUpdate", async itm => {
      await this.JUpdateRequestCallback(itm);
    });

    es.addCallback("JourneyPlan", "AddOrUpdateSuccess", itm => {
      // # check if new plan executed then turn flag of template schedules to be calculated again
      let DBService = ServiceLocator.resolve("DBService");
      DBService.checkForTemplateScheduleReCalculateFlag(itm);
    });
    es.addCallback("JourneyPlan", "AddOrUpdateSuccess", itm => {
      // # check if app form is filled , update it in the test schedules.
      let DBService = ServiceLocator.resolve("DBService");
      DBService.checkTestsFormFilling(itm);
    });

    es.addCallback("JourneyPlan", "AddOrUpdateSuccess", itm => {
      this.JPUpdateCallback(itm);
    });
    // stop creating maintenance automatically // es.addCallback('JourneyPlan', 'BeforeAddOrUpdate', itm =>{this.JPUpdateRequestCallback(itm)});
    this.logger = logger;
  }
  async JUpdateRequestCallback(data) {
    let item = data.item;
    let user = data.user;
    let ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");

    try {
      // # check for remedial action resolve case
      let jp = item.optParam1;
      let tasks = jp.tasks ? jp.tasks : [];
      for (let task of tasks) {
        let issues = task && task.issues ? task.issues : [];
        for (let issue of issues) {
          if (issue && issue.remedialAction) {
            // issue has the remedialAction, let's compare and resolve it if required
            let remedialActionResolveIssue = await ApplicationLookupsModel.findOne({ listName: "resolveIssueRemedialAction" }).exec();
            let checkRemedialActionConfig = await ApplicationLookupsModel.findOne({
              listName: "config",
              code: "issueResolveRemedialAction",
            }).exec();
            if (checkRemedialActionConfig.opt2 === false && remedialActionResolveIssue && remedialActionResolveIssue.opt1.length) {
              if (remedialActionResolveIssue.opt1.includes(issue.remedialAction)) {
                issue.status = "Resolved";
              }
            }
          }
        }
      }
    } catch (err) {
      console.log("DataOperationsLogic:JPUpdateRequestCallback, catch:", err.toString());
      this.logger.error(err, err.toString());
    }
  }

  // async JPUpdateRequestCallback(data)
  // {
  //     let item = data.item;
  //     let user = data.user;
  //     let oldJp={};
  //     let maintenanceService = ServiceLocator.resolve('MaintenanceService');

  //     try
  //     {
  //         if(item && item.code && item.code!='')
  //         {
  //             let JPModel = ServiceLocator.resolve("JourneyPlanModel");
  //             oldJp = await JPModel.findOne({_id:item.code}).exec();
  //         }

  //         let additional = utils.substractObjects(item.optParam1, oldJp);
  //         let tasks = additional.tasks ? additional.tasks : [];
  //         for(const task of tasks)
  //         {
  //             let issues = task && task.issues ? task.issues:[];

  //             for(const issue of issues)
  //             {
  //                 if(issue && issue.timeStamp) // new issue being logged, check for creating maintenance
  //                 {
  //                     // if issue.typeOfAction==ImmediateFix then maintenanceState=fixed
  //                     //
  //                     if(issue.priority!="Info")
  //                     {
  //                         //create a maintenance
  //                         await maintenanceService.createNewMaintenance(issue, user, item.code, oldJp.workplanTemplateId ? oldJp.workplanTemplateId : issue.workplanTemplateId ? issue.workplanTemplateId : '' );
  //                     }
  //                     //console.log('new=>', issue.timeStamp, issue.description,{issue});
  //                 }
  //             }
  //         }
  //     }
  //     catch(err)
  //     {
  //         console.log('DataOperationsLogic:JPUpdateRequestCallback, catch:', err.toString());
  //         this.logger.error(err, err.toString());
  //     }
  // }

  JPUpdateCallback(data) {
    let item = data.item;
    let user = data.user;
    //this.logger.info('JPUpdateCallback: code: '+ item.code);
    //console.log('actual cb : code : ' + item.code);
    // check if this jp is new and being created
    try {
      if (item.code == "" || item.code == null) {
        let wptId = item.optParam1.workplanTemplateId; // TODO: Discuss to make sure 'workplanTemplateId' being transmitted

        if (wptId) {
          let workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
          workPlanTemplateService.workPlanExecuted(item, wptId);

          //   let WPTModel = ServiceLocator.resolve("WorkPlanTemplateModel");

          //   WPTModel.findOne({ _id: wptId }).exec((err, wpt) => {
          //     //console.log('WorkplanTemplate: '+ wpt);
          //     if (wpt) {
          //       wpt.lastInspection = new Date();
          //       wpt.nextInspectionDate = new Date();
          //       wpt.nextInspectionDate.setDate(wpt.nextInspectionDate.getDate() + wpt.inspectionFrequency);
          //       wpt.markModified("nextInspectionDate");
          //       wpt.markModified("lastInspection");
          //       wpt.save((err, result) => {
          //         if (err) {
          //           this.logger.error("Error saving inspeciton dates: user:" + user.email + ", err:" + err);
          //           console.log(err);
          //         }
          //       });
          //     } else {
          //       this.logger.warn("wptId: " + wptId + " not found, not updating nextInspectionDate, user:" + user.email);
          //       console.log("wptId: " + wptId + " not found, not updating nextInspectionDate");
          //     }
          //   });
        } else {
          this.logger.warn("workplanTemplateId not included in call to create inspection, user:" + user.email);
        }
      } else {
        // let DBService = ServiceLocator.resolve("DBService");
        // DBService.updateInspectionConditions(item);
        let socketIO = ServiceLocator.resolve("SocketIOService");
        socketIO.inspectionUpdated(item.code);
      }
    } catch (error) {
      console.log(error);
      this.logger.error("catch: err:" + error);
    }
  }
}
