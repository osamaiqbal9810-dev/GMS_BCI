"use strict";
import _ from "lodash";
import moment from "moment";
let mongoose = require("mongoose");
let ServiceLocator = require("../framework/servicelocator");
export default class DatabaseSerivce {
  constructor() {}
  async checkForTemplateScheduleReCalculateFlag(receivedObj) {
    try {
      let item = receivedObj.item;
      let WPlanSchedulesModel = ServiceLocator.resolve("WPlanSchedulesModel");
      let updateReCal = false;
      let toChangeStatusToFinish = false;
      let workplanTemplateId = item.optParam1.workplanTemplateId;
      let jPlan = null;
      if (!item.code) {
        updateReCal = true;
      } else {
        let JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
        let existedJPlan = await JourneyPlanModel.findOne({ _id: item.code });
        if (existedJPlan) {
          workplanTemplateId = existedJPlan.workplanTemplateId;
          jPlan = existedJPlan;
          const newDataInspectionType =
            item.optParam1.tasks &&
            item.optParam1.tasks.length > 0 &&
            item.optParam1.tasks[0].inspectionType &&
            item.optParam1.tasks[0].inspectionType !== existedJPlan.tasks[0].inspectionType;
          const planClosedNow = existedJPlan.status == "In Progress" && item.optParam1.status == "Finished";
          if (newDataInspectionType || planClosedNow) {
            updateReCal = true;
          }
          // if (toChangeStatusToFinish) {
          //   existedJPlan.status = item.optParam1.status;
          //   await existedJPlan.save();
          // }
        }
      }
      if (updateReCal) {
        let wPlanSchedule = await WPlanSchedulesModel.findOne({ templateId: workplanTemplateId }).exec();
        if (wPlanSchedule) {
          wPlanSchedule.toRecalculate = true;
          await wPlanSchedule.save();
        }
        // // # to update next execution date and expiry date on execution

        let wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
        let ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
        let scheduleService = ServiceLocator.resolve("scheduleService");
        let workPlanTemplateService = ServiceLocator.resolve("WorkPlanTemplateService");
        let workingDays = { holidays: [], weekOffDays: [] };
        let workingOffDays = await ApplicationLookupsModel.findOne({ code: "weekdays" }).exec();
        workingDays.weekOffDays = workingOffDays.opt2;

        let template = await wPlanTemplateModel.findOne({ _id: workplanTemplateId }).exec();

        if (template.inspectionFrequencies && template.inspectionFrequencies.length > 0) {
          let freqPeriod;
          freqPeriod = {
            recurNumber: template.inspectionFrequencies[0].recurNumber && parseInt(template.inspectionFrequencies[0].recurNumber),
            recurPeriod: template.inspectionFrequencies[0].recurTimeFrame,
          };
          let dateRange = {
            from: template.currentPeriodStart,
            today: moment(),
            to: moment(template.currentPeriodStart).add(freqPeriod.recurNumber * 2, freqPeriod.recurPeriod),
          };
          let startDate = template.currentPeriodStart;
          let calculatedSchedules = scheduleService.getSchedules(
            template,
            startDate,
            jPlan ? [jPlan] : [],
            dateRange,
            workingDays,
            workPlanTemplateService.ignoreInspectionsFromSchedulingCase,
          );
          let utils = ServiceLocator.resolve("utils");
          await workPlanTemplateService.checkWorkPlanNextDueExpiryDate(template, utils);
          await workPlanTemplateService.checkCurrentTimePeriodUpdate(template, utils);
          let alertService = ServiceLocator.resolve("AlertService");
          alertService.recalculateAlertMonitoringByModelId(template.id);
          await template.save();
        }
      }
    } catch (err) {
      console.log("err in DBService checkForTemplateScheduleReCalculateFlag" + err);
    }
  }
  async checkTestsFormFilling(receivedObj) {
    let item = receivedObj && { ...receivedObj.item };
    let testSchedulesModel = ServiceLocator.resolve("TestSchedulesModel");
    let JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
    let existedJplan = null;
    try {
      if (item.code) {
        existedJplan = await JourneyPlanModel.findOne({ _id: item.code });
      }
      if (item && item.optParam1 && item.optParam1.tasks && item.optParam1.tasks[0] && item.optParam1.tasks[0].units) {
        let unitsLength = item.optParam1.tasks[0].units.length;
        let units = item.optParam1.tasks[0].units;
        for (let u = 0; u < unitsLength; u++) {
          if (units[u].appForms) {
            for (let form of units[u].appForms) {
              if (form.id) {
                let obj = {
                  assetId: existedJplan.tasks[0].units[u].id,
                  lineId: existedJplan ? existedJplan.lineId : item.optParam1.lineId,
                  lineName: existedJplan ? existedJplan.tasks[0].units[0].unitId : item.optParam1.tasks[0].units[0].unitId,
                  assetName: existedJplan.tasks[0].units[u].unitId,
                  testCode: form.id,
                  testDescription: form.name,
                  formData: form.form,
                  inspectionId: existedJplan && existedJplan.id,
                  user: existedJplan && existedJplan.user,
                  date: existedJplan && existedJplan.date,
                  assetType: existedJplan.tasks[0].units[u].assetType,
                  assetMP: existedJplan.tasks[0].units[u].start,
                };

                let exists = await testSchedulesModel
                  .findOne({ assetId: obj.assetId, testCode: form.id, inspectionId: obj.inspectionId })
                  .exec();
                if (exists) {
                  exists.formData = obj.formData;
                  exists.markModified("formData");
                  await exists.save();
                } else {
                  let newTestData = new testSchedulesModel(obj);
                  await newTestData.save();
                }
                //testSchedulesModel.update({ assetId: units[u].id, lineId: obj.lineId, testCode: form.id }, obj, { upsert: true });
              }
            }
          }
        }
      }
    } catch (err) {
      console.log("Error in checkTestsFormFilling: ", err);
    }
  }
  // async updateInspectionConditions(data) {
  //   try {
  //     let ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
  //     let JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
  //     let remedialActionResolveIssue = await ApplicationLookupsModel.findOne({ listName: "resolveIssueRemedialAction" }).exec();
  //     let checkRemedialActionConfig = await ApplicationLookupsModel.findOne({
  //       listName: "config",
  //       code: "issueResolveRemedialAction",
  //     }).exec();
  //     let inspection = data.optParam1;
  //     let inspectionUpdated;
  //     if (inspection && inspection.tasks && inspection.tasks.length > 0) {
  //       for (let task of inspection.tasks) {
  //         if (task.issues && task.issues.length > 0) {
  //           for (let issue of task.issues) {
  //             // check Remedial action to resolve issue
  //             if (
  //               checkRemedialActionConfig.opt2 == false &&
  //               issue.remedialAction &&
  //               remedialActionResolveIssue &&
  //               remedialActionResolveIssue.opt1 &&
  //               remedialActionResolveIssue.opt1.length > 0
  //             ) {
  //               let resolveActionFound = await _.find(remedialActionResolveIssue.opt1, (item) => {
  //                 return item == issue.remedialAction;
  //               });
  //               if (resolveActionFound) {
  //                 issue.status = "Resolved";
  //                 inspectionUpdated = true;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (inspectionUpdated) {
  //       let savedInspection = await JourneyPlanModel.replaceOne({ _id: data.code }, inspection);
  //     }
  //   } catch (err) {
  //     console.log("err in DBService updateInspectionConditions" + err);
  //   }
  // }
}
