import _ from "lodash";
import { guid } from "../../../utilities/UUID.js";
import momentTz from "moment-timezone";
import moment from "moment";
var ObjectId = require("mongodb").ObjectID;
let ServiceLocator = require("../../../framework/servicelocator");
import { subdivisionChecker } from "../../../apiUtils/subdivisionCheck";
import { objectTypeIndexer } from "babel-types";
import { workingDays } from "../../../template/workingdays";
let turf = require("@turf/turf");

class WorkPlanTemplateService {
  async getAssetsByLine(lineId, assetType) {
    let assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
    //let assetArray = assetsTreeService.findAssetFlat(lineId);
    let assetArray = [];
    //console.log(assetsTreeService);
    let assetTreeObj = await assetsTreeService.getAssetTree(lineId);
    await assetsTreeService.filterTreeByProperties(assetTreeObj, {}, assetArray);
    let assetsModel = ServiceLocator.resolve("AssetsModel");
    let criteria = {};
    criteria._id = { $in: assetArray };
    if (assetType) {
      criteria.assetType = assetType;
    }
    let assetArray1 = await assetsModel.find(criteria).sort({ start: "asc" }).exec();
    return [...assetArray1];
  }
  async getOtherAssetsByLine(lineId, assetType) {
    let assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
    //let assetArray = assetsTreeService.findAssetFlat(lineId);
    let assetArray = [];
    //console.log(assetsTreeService);
    let treeObj = await assetsTreeService.getAssetTree(lineId);
    await assetsTreeService.filterTreeGetLineOtherAssets(treeObj, assetArray);
    let assetsModel = ServiceLocator.resolve("AssetsModel");
    let criteria = {};
    criteria._id = { $in: assetArray };
    if (assetType) {
      criteria.assetType = assetType;
    }
    let assetArray1 = await assetsModel.find(criteria).sort({ start: "asc" }).exec();
    return [...assetArray1];
  }
  async getCoordinatesArray(coordinates, geoJsonCord, start, end, startOffset = 0, uom = "miles") {
    if (
      coordinates &&
      coordinates.length > 0 &&
      coordinates[0][0] != "" &&
      coordinates[0][1] != "" &&
      coordinates[1][0] != "" &&
      coordinates[1][1] != ""
    ) {
      return coordinates;
    }
    let assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
    let _coordinates = [];
    //console.log(geoJsonCord);
    let _start = start,
      _end = end;

    if (_start >= startOffset) _start -= startOffset;

    if (_end >= startOffset) _end -= startOffset;

    let startCords = await assetsTreeService.resolveLocation(geoJsonCord, _start, uom);
    let endCords = await assetsTreeService.resolveLocation(geoJsonCord, _end, uom);
    _coordinates.push(startCords);
    _coordinates.push(endCords);
    return _coordinates;
  }
  async createAndFillRunRange(lineAsset, runRange) {
    let runModel, run, runRangeFull, mpStart, mpEnd, utils, rangeCords, geoJsonCord, lineGeodata, uom;
    runModel = ServiceLocator.resolve("RunModel");
    utils = ServiceLocator.resolve("utils");
    mpStart = utils.toFixed(+runRange.runStart);
    mpEnd = utils.toFixed(+runRange.runEnd);
    rangeCords = { geoJsonCord: "", start: mpStart, end: mpEnd };
    geoJsonCord = JSON.parse(lineAsset.attributes.geoJsonCord);
    lineGeodata = turf.lineString(geoJsonCord.features[0].geometry.coordinates, { name: "line 1" });
    uom = this.getUnitOfMeasurements(lineAsset);
    // if mpStart and and mpEnd are 0 , it causes error that coordinates must be an array of two or more posiitons
    let endGeoJsonMP = mpEnd - mpStart; // substract start offset to make the ranges 0 based lengths
    let startGeoJsonMP = 0;

    rangeCords.geoJsonCord = turf.lineSliceAlong(lineGeodata, startGeoJsonMP, endGeoJsonMP, { units: uom });
    rangeCords.start = turf.along(lineGeodata, startGeoJsonMP, { units: uom });
    rangeCords.end = turf.along(lineGeodata, endGeoJsonMP, { units: uom });

    runRangeFull = {
      id: guid(),
      runId: runRange.runId,
      runDescription: runRange.runId,
      mpStart: mpStart,
      mpEnd: mpEnd,
      lineId: lineAsset._id,
      lineName: lineAsset.unitId,
      ...rangeCords,
    };

    try {
      run = await runModel.findOne({ runLineID: lineAsset._id }).exec();
      if (run) {
        if (runRange.updated) {
          let existingRangeIndex = _.findIndex(run.runRange, { id: runRange.id });
          run.runRange[existingRangeIndex] = runRangeFull;
        } else {
          run.runRange.push(runRangeFull);
        }
        run.markModified(runRange);
      } else {
        run = new runModel({
          runLineID: lineAsset._id,
          runId: runRange.runId,
          runLineName: lineAsset.unitId,
          lineStart: lineAsset.start,
          lineEnd: lineAsset.end,
          runRange: [runRangeFull],
        });
      }
      await run.save();
    } catch (err) {
      console.log("error in createAndFillRunRange : " + err);
    }
    let ranges = [runRangeFull];
    return ranges;
  }
  async fillRunRangesData(runRanges) {
    let RunService = ServiceLocator.resolve("LineRunService");
    let rranges = [];

    if (runRanges && runRanges.length && runRanges[0] && runRanges[0].geoJsonCord)
      // already a filled list no need to go to database
      return runRanges;

    if (runRanges && runRanges.length) {
      for (let rr of runRanges) {
        let run = await RunService.findSingleRun(rr.runParentId);
        run = run && run.value ? run.value : { runRange: [] };
        for (let _rrange of run.runRange) {
          if (_rrange.id === rr.id) {
            rranges.push(_rrange);
          }
        }
      }
    }

    return rranges;
  }

  getUnitOfMeasurements(lineAsset) {
    let uom = "miles";
    if (
      lineAsset &&
      lineAsset.systemAttributes &&
      lineAsset.systemAttributes.milepostUnit &&
      lineAsset.systemAttributes.milepostUnit.value &&
      typeof lineAsset.systemAttributes.milepostUnit.value === "string"
    ) {
      uom = lineAsset.systemAttributes.milepostUnit.value;
    }
    return uom;
  }

  async createWorkplanTemplate(jPlan) {
    //console.log("createWorkplanTemplate Func");
    let resultObj, assetService, AssetsModel, wPlanTemplate, assetsTreeService;
    resultObj = {};
    wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    assetService = ServiceLocator.resolve("AssetsService");
    assetsTreeService = ServiceLocator.resolve("AssetsTreeService");

    AssetsModel = ServiceLocator.resolve("AssetsModel");
    let lineAsset = await AssetsModel.findOne({ _id: jPlan.lineId }).exec();
    if (jPlan && jPlan.runRanges && jPlan.runRanges.length > 0 && (jPlan.runRanges[0].isNew || jPlan.runRanges[0].isUpdated)) {
      jPlan.runRanges = await this.createAndFillRunRange(lineAsset, jPlan.runRanges[0]);
    } else if (jPlan && jPlan.runRanges && jPlan.runRanges.length > 0) {
      jPlan.runRanges = await this.fillRunRangesData(jPlan.runRanges); // convert Ids to full data
    }

    //try {
    //let lineAssets = await this.getAssetsByLine(jPlan.lineId);
    let assetArray = jPlan.inspectionAssets || [];
    let criteria = {};
    criteria._id = { $in: assetArray };

    let lineAssets;
    if (jPlan.inspectionAssets) {
      lineAssets = await AssetsModel.find(criteria).exec();
    } else {
      lineAssets = await this.getOtherAssetsByLine(jPlan.lineId);
    }

    //console.log(lineAssets);
    /*
      let lineAssets = await AssetsModel.find({ lineId: jPlan.lineId })
        .sort({ start: "asc" })
        .exec();*/
    let copyJPlan = jPlan.id ? jPlan : { ...jPlan };
    //console.log(copyJPlan);
    let tasks = [];
    if (jPlan.inspectionAssets && jPlan.inspectionAssets.length > 0) {
      for (let _run of jPlan.runRanges) {
        let _task = {
          title: "",
          desc: "Perform Inspection",
          notes: "Default Inspection Notes",
          units: [],
          imgs: null,
          taskId: guid(),
          startLoc: _run.start,
          endLoc: _run.end,
          lineCords: _run.geoJsonCord,
          runId: _run.runId,
          runStart: _run.mpStart,
          runEnd: _run.mpEnd,
        };
        _task.title = _run.runDescription;
        let lineAssetsArrary = [...lineAssets];
        let assetListToAdd = [];
        let runStart = _run.mpStart || _run.mpStart == 0 ? parseFloat(_run.mpStart) : null;
        let runEnd = _run.mpEnd || _run.mpEnd == 0 ? parseFloat(_run.mpEnd) : null;
        let uom = this.getUnitOfMeasurements(lineAsset);

        let _coordinatesArray = await this.getCoordinatesArray(
          [
            ["", ""],
            ["", ""],
          ],
          _run.geoJsonCord,
          runStart,
          runEnd,
          lineAsset.start,
          uom,
        );
        let _lineAssetToPush = {
          start: lineAsset.start,
          end: lineAsset.end,
          unitId: lineAsset.unitId,
          coordinates: _coordinatesArray,
          assetType: lineAsset.assetType,
          id: lineAsset._id.toString(),
          runId: _run.runId,
          run_id: _run.id,
          track_id: lineAsset.trackId,
          parent_id: lineAsset.parentAsset,
          attributes: {
            showDirection: false,
          },
        };
        assetListToAdd.push(_lineAssetToPush);
        let longestAsset = { id: "", start: "", end: "" };
        let primaryTrackFound = null;
        for (let i = 0, l = lineAssetsArrary.length; i < l; i++) {
          if (
            (lineAssetsArrary[i].start >= runStart && lineAssetsArrary[i].end <= runEnd) ||
            (lineAssetsArrary[i].start >= runStart && lineAssetsArrary[i].start <= runEnd) ||
            (lineAssetsArrary[i].end >= runStart && lineAssetsArrary[i].end <= runEnd) ||
            (runStart >= lineAssetsArrary[i].start && runEnd <= lineAssetsArrary[i].end)
          ) {
            let uom = this.getUnitOfMeasurements(lineAsset);

            _coordinatesArray = await this.getCoordinatesArray(
              lineAssetsArrary[i].coordinates,
              _run.geoJsonCord,
              lineAssetsArrary[i].start,
              lineAssetsArrary[i].end,
              lineAsset.start,
              uom,
            );
            if (!primaryTrackFound) {
              if (longestAsset.id) {
                let prevLongest = longestAsset.end - longestAsset.start;
                let nowAssetLongest = lineAssetsArrary[i].end - lineAssetsArrary[i].start;
                nowAssetLongest > prevLongest &&
                  (longestAsset = { id: lineAssetsArrary[i].id, start: lineAssetsArrary[i].start, end: lineAssetsArrary[i].end });
              } else {
                lineAssetsArrary[i].start !== lineAssetsArrary[i].end &&
                  (longestAsset = { id: lineAssetsArrary[i].id, start: lineAssetsArrary[i].start, end: lineAssetsArrary[i].end });
              }
              lineAssetsArrary[i].attributes && lineAssetsArrary[i].attributes.primaryTrack && (primaryTrackFound = lineAssetsArrary[i].id);
            }
            let toMerge = { attributes: {} };
            if (lineAssetsArrary[i].assetType == "track") {
              toMerge.attributes.showDirection = true;
              if (lineAssetsArrary[i].attributes && lineAssetsArrary[i].attributes.railOrientation) {
                toMerge.attributes.railOrientation = lineAssetsArrary[i].attributes.railOrientation;
                toMerge.attributes.railOptions = getRailOptions(
                  lineAssetsArrary[i].attributes.railOrientation,
                  lineAssetsArrary[i].attributes.electrified,
                  lineAssetsArrary[i].attributes.electrifiedAssetType,
                );
              } else {
                toMerge.attributes.railOptions = ["N/A", "North", "East", "South", "West"];
              }
            } else {
              toMerge.attributes.showDirection = false;
            }
            _lineAssetToPush = {
              start: lineAssetsArrary[i].start,
              end: lineAssetsArrary[i].end,
              unitId: lineAssetsArrary[i].unitId,
              coordinates: _coordinatesArray,
              assetType: lineAssetsArrary[i].assetType,
              id: lineAssetsArrary[i]._id.toString(),
              runId: _run.runId,
              run_id: _run.id,
              track_id: lineAssetsArrary[i].trackId,
              parent_id: lineAssetsArrary[i].parentAsset,
              ...toMerge,
            };
            assetListToAdd.push(_lineAssetToPush);
          }
        }
        let primaryTrackAssetIndex = _.findIndex(assetListToAdd, { id: primaryTrackFound ? primaryTrackFound : longestAsset.id });
        if (primaryTrackAssetIndex > -1) {
          !assetListToAdd[primaryTrackAssetIndex].attributes && (assetListToAdd[primaryTrackAssetIndex].attributes = {});
          assetListToAdd[primaryTrackAssetIndex].attributes.primaryTrack = true;
        }
        _task.units = assetListToAdd;
        tasks.push(_task);
        copyJPlan.inspecitonRun = _run.runId;
      }
    } else {
      for (let run of jPlan.runRanges) {
        let task = {
          title: "",
          desc: "Perform Inspection",
          notes: "Default Inspection Notes",
          units: [],
          imgs: null,
          taskId: guid(),
          startLoc: run.start,
          endLoc: run.end,
          lineCords: run.geoJsonCord,
          runId: run.runId,
        };
        let filteredAssets = [];
        // let startComma = task.title ? "," : "";
        // task.title = task.title + startComma + run.runDescription;
        task.title = run.runDescription;
        let runStart = run.mpStart || run.mpStart == 0 ? parseFloat(run.mpStart) : null;
        let runEnd = run.mpEnd || run.mpEnd == 0 ? parseFloat(run.mpEnd) : null;
        let startIndex = -1; // _.findIndex(lineAssets, { start: runStart });
        let endIndex = -1; //_.findLastIndex(lineAssets, { start: runEnd });

        for (let i = 0; i < lineAssets.length; i++) {
          if (lineAssets[i].start >= runStart) {
            startIndex = i;
            break;
          }
        }
        if (startIndex != -1) {
          for (let i = startIndex; i < lineAssets.length; i++) {
            if (lineAssets[i].start >= runEnd) {
              endIndex = i;
              break;
            }
          }
          if (endIndex === -1) endIndex = lineAssets.length - 1;
        }
        let isOtherAssets = run && run.tracks ? run.tracks.includes("others") : null;
        if (isOtherAssets) {
          //console.log(startIndex, endIndex);
          //push line asset also
          let uom = this.getUnitOfMeasurements(lineAsset);
          let coordinatesArray = await this.getCoordinatesArray(
            [
              ["", ""],
              ["", ""],
            ],
            run.geoJsonCord,
            runStart,
            runEnd,
            lineAsset.start,
            uom,
          );
          let lineAssetToPush = {
            start: lineAsset.start,
            end: lineAsset.end,
            unitId: lineAsset.unitId,
            coordinates: coordinatesArray,
            assetType: lineAsset.assetType,
            id: lineAsset._id.toString(),
            runId: run.runId,
            run_id: run.id,
            track_id: lineAsset.trackId,
            parent_id: lineAsset.parentAsset,
          };
          filteredAssets.push(lineAssetToPush);
          //
          if (startIndex > -1 && endIndex > -1) {
            for (let i = startIndex; i <= endIndex; i++) {
              let uom = this.getUnitOfMeasurements(lineAssets[i]);

              let coordinatesArray = await this.getCoordinatesArray(
                lineAssets[i].coordinates,
                run.geoJsonCord,
                lineAssets[i].start,
                lineAssets[i].end,
                lineAsset.start,
                uom,
              );
              let assetToPush = {
                start: lineAssets[i].start,
                end: lineAssets[i].end,
                unitId: lineAssets[i].unitId,
                coordinates: coordinatesArray,
                assetType: lineAssets[i].assetType,
                id: lineAssets[i]._id.toString(),
                runId: run.runId,
                run_id: run.id,
                track_id: lineAssets[i].trackId,
                parent_id: lineAssets[i].parentAsset,
              };
              filteredAssets.push(assetToPush);
            }
          }
        }
        //let lineTrackAssets = await AssetsModel.find({ lineId: jPlan.lineId, assetType: "track" });
        //let lineTrackAssets = await this.getAssetsByLine(jPlan.lineId);
        if (run && run.tracks) {
          for (let track of run.tracks) {
            if (track != "others") {
              let trackAssetsObj = await this.getAssetsByLine(track);
              let trackAssets = [...trackAssetsObj];
              let trackAsset = await AssetsModel.findOne({ _id: track });
              let runStart = run.mpStart || run.mpStart == 0 ? parseFloat(run.mpStart) : null;
              let runEnd = run.mpEnd || run.mpEnd == 0 ? parseFloat(run.mpEnd) : null;
              //let startIndex = _.findIndex(trackAssets, { start: runStart });
              //let endIndex = _.findLastIndex(trackAssets, { start: runEnd });
              //console.log(trackAssets);
              //console.log(startIndex, endIndex);

              let uom = this.getUnitOfMeasurements(lineAsset);

              let _coordinatesArray = await this.getCoordinatesArray(
                trackAsset.coordinates,
                run.geoJsonCord,
                trackAsset.start,
                trackAsset.end,
                lineAsset.start,
                uom,
              );

              let trackAssetToPush = {
                start: trackAsset.start,
                end: trackAsset.end,
                unitId: trackAsset.unitId,
                coordinates: _coordinatesArray,
                assetType: trackAsset.assetType,
                id: trackAsset._id.toString(),
                runId: run.runId,
                run_id: run.id,
                track_id: trackAsset._id,
                parent_id: trackAsset.parentAsset,
              };
              filteredAssets.push(trackAssetToPush);
              startIndex = 0;
              endIndex = trackAssets.length;

              for (let i = 0; i < trackAssets.length; i++) {
                let trackAsset = trackAssets[i];
                if (
                  (trackAsset.start >= runStart && trackAsset.end <= runEnd) ||
                  (trackAsset.end >= runStart && trackAsset.end <= runEnd) ||
                  (trackAsset.start <= runStart && trackAsset.end >= runEnd)
                ) {
                  let uom = this.getUnitOfMeasurements(lineAsset);

                  let _coordinatesArray = await this.getCoordinatesArray(
                    trackAssets[i].coordinates,
                    run.geoJsonCord,
                    trackAssets[i].start,
                    trackAssets[i].end,
                    lineAsset.start,
                    uom,
                  );

                  let assetToPush = {
                    start: trackAssets[i].start,
                    end: trackAssets[i].end,
                    unitId: trackAssets[i].unitId,
                    coordinates: _coordinatesArray,
                    assetType: trackAssets[i].assetType,
                    id: trackAssets[i]._id.toString(),
                    runId: run.runId,
                    run_id: run.id,
                    track_id: trackAssets[i].trackId,
                    parent_id: trackAssets[i].parentAsset,
                  };
                  filteredAssets.push(assetToPush);
                }
              }
            }
          }
        }
        //console.log(filteredAssets);
        task.units = filteredAssets;
        tasks.push(task);
        copyJPlan.inspecitonRun = run.runId;
      }
    }

    copyJPlan.tasks = tasks;

    // apply plannable location asset's timezone to the startDate to make it 00:00 AM of local time to that particular location
    if (lineAsset && lineAsset.attributes && lineAsset.attributes.timezone) {
      let timezone = lineAsset.attributes.timezone;
      // console.log('applying timezone', timezone,' to inspection plan', copyJPlan.title, 'current startDate:', copyJPlan.startDate);
      if (momentTz.tz.zone(timezone)) {
        // verify if the timezone id is valid, todo: validate copyJPlan.startDate too.
        let dayBasedLocalDate = momentTz.tz(new Date(copyJPlan.startDate).toISOString().slice(0, 10), timezone).toDate();
        copyJPlan.startDate = dayBasedLocalDate;
        // console.log('new time:', copyJPlan.startDate);
      } else {
        console.log("could not found timezone id", timezone);
      }
    } else {
      // todo: log warning here
      console.log(
        "wPlanTemplate.service.createWorkplanTemplate: Warning: Time zone information not available for",
        lineAsset.unitId,
        " using UTC for",
        copyJPlan.title,
      );
    }

    if (!copyJPlan.nextInspectionDate || copyJPlan.nextInspectionDate < copyJPlan.startDate) {
      copyJPlan.nextInspectionDate = copyJPlan.startDate;
    }

    let newWorkPlan = copyJPlan.id ? copyJPlan : new wPlanTemplate(copyJPlan);
    let savedWorkPlan = await newWorkPlan.save();

    resultObj = { value: savedWorkPlan, status: 200 };
    // let startArray = [];
    // for (let asset of filteredAssets) {
    //   startArray.push(asset.start);
    // }
    // console.log(startArray);
    //} catch (error) {
    //  resultObj = { errorVal: error, status: 500 };
    //}
    return resultObj;
  }
  filterHeavyComps(templates) {
    if (templates && templates.length) {
      for (let template of templates) {
        if (template.tasks && template.tasks.length) {
          for (let task of template.tasks) {
            if (task.lineCords) delete task.lineCords; // remove lineCords as they can be heavy and cause problem in transfer from frontend to backend later
          }
        }
      }
    }
    return templates;
  }
  async getWorkplanTemplates(user) {
    let resultObj = {};
    let wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    let logger = ServiceLocator.resolve("logger");

    let criteria = { isRemoved: !true };
    let assetService = ServiceLocator.resolve("AssetsService");

    let assetIds = await assetService.getFilteredAssetsIds(user, { plannable: true }, true);

    if (assetIds && assetIds.assetIds && assetIds.assetIds.length > 0) {
      let ids = assetIds.assetIds;

      criteria.lineId = { $in: ids };
    }

    //let permCheckUtil = ServiceLocator.resolve("permissionChecker");
    //   if (permCheckUtil(user.userGroup.permissions, "WORKPLAN" , "self_workplans_templates")) {
    if (user.group_id == "supervisor") {
      try {
        let templates = wPlanTemplate.find(criteria).sort({ sort_id: "desc", nextInspectionDate: "asc" });
        let execValue = await templates.exec();
        execValue = this.filterHeavyComps(execValue);

        resultObj = { value: execValue, status: 200 };
      } catch (err) {
        console.log(err);
        logger.error("getWorkplanTemplates: supervisor: find user error:" + err);
        resultObj = { errorVal: err, status: 500 };
      }
      return resultObj;
    } else {
      if (user.subdivision == "" || user.subdivision == "All" || user.isAdmin) {
        try {
          let templates = wPlanTemplate.find(criteria).sort({ sort_id: "desc", nextInspectionDate: "asc", "user.email": "desc" });
          let execValue = await templates.exec();

          execValue = this.filterHeavyComps(execValue);

          resultObj = { value: execValue, status: 200 };
        } catch (err) {
          resultObj = { errorVal: err, status: 500 };
          logger.error("getWorkplanTemplates: all subdivision or admin: find user error:" + err);
        }
        return resultObj;
      } else {
        try {
          const templates = wPlanTemplate
            .find({ subdivision: user.subdivision, isRemoved: !true })
            .sort({ sort_id: "desc", nextInspectionDate: "asc", "user.email": "desc" });
          let execValue = await templates.exec();

          execValue = this.filterHeavyComps(execValue);

          resultObj = { value: execValue, status: 200 };
        } catch (err) {
          resultObj = { errorVal: err, status: 500 };
          logger.error("getWorkplanTemplates: otherusers: find user error:" + err);
        }
        return resultObj;
      }
    }
    return resultObj;
  }
  async getWptIdsForRange(rangeId) {
    let ids = [];
    try {
      let wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
      let rangeWPlans = await wPlanTemplateModel.aggregate([
        { $unwind: "$runRanges" },
        { $match: { "runRanges.id": rangeId } },
        { $project: { _id: true } },
      ]); //{'isRemoved': false}
      ids = rangeWPlans.map((v) => {
        return v._id.toString();
      });
    } catch (err) {
      console.log("wPlanTemplate.service.getWptIdsForRange.catch: ", err.toString());
    }

    return ids;
  }
  async updateWorkplanTemplatesForRunRange(updatedRange) {
    let wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
    // Find workplantemplates that used the range
    // Iterate tasks, if !task.type || task.type !== 'special' reprocess the task.units to have assets in the  WPT.runRanges(after replacing new range)
    //
    try {
      //console.log({updatedRange});
      let ids = await this.getWptIdsForRange(updatedRange.id);
      //console.log('ids:', ids);
      let wpts = await wPlanTemplateModel.find({ _id: { $in: ids } });
      //console.log('wpts:', wpts);

      for (let wpt of wpts) {
        let index = -1;
        let r = wpt.runRanges.find((v, i) => {
          index = i;
          return v.id === updatedRange.id;
        });
        //console.log('old range:', {r});
        wpt.runRanges[index] = updatedRange;
        wpt.markModified("runRanges");

        for (let task of wpt.tasks) {
          if (!task.type || task.type !== "special") {
            //console.log('old units:', task.units);
            let unitsArray = await this.getRangesAssets(wpt.runRanges, "track1,track2", "Switch,Crossing"); // trackUnitIds, assetTypes); // get all assets for now, pass this info through wpt
            let unitsToPush = [];
            for (let u of unitsArray) {
              let unit = {
                start: u.start,
                end: u.end,
                unitId: u.unitId,
                coordinates: u.coordinates,
                assetType: u.assetType,
                id: u._id.toString(),
                runId: u.runId,
                run_id: u.run_id,
                track_id: u.trackId,
                parent_id: u.parentAsset,
              };
              unitsToPush.push(unit);
            }
            task.units = unitsToPush;

            //console.log('new units:', task.units);
            wpt.markModified("tasks");
            wpt.save();
          }
        }
      }
    } catch (err) {
      console.log("wPlanTemplate.service.updateWorkplanTemplatesForRunRange.catch:", err.toString());
    }
  }

  async getRangesAssets(
    ranges,
    tracknames,
    assetTypes, // ranges: [{id:'', mpStart:0, mpEnd:0, lineId:''}], tracknames:'track1,track2', assetTypes:'Switch,Crossing' or 'Other Assets'
  ) {
    let assetService = ServiceLocator.resolve("AssetsService");
    let assetModel = ServiceLocator.resolve("AssetsModel");

    let ids = [];
    let orArray = [],
      rCondition = [];

    if (tracknames && tracknames.length > 0) {
      let arr = tracknames.split(",");
      ids = await assetService.getAssetIdsForUnitIds(arr);
    }

    if (ids.length > 0) {
      orArray.push({ _id: { $in: ids } }); // track themselves
      orArray.push({ trackId: { $in: ids } }); // track childern
    }

    if (assetTypes) {
      if (assetTypes.includes("Other Assets")) {
        // all inspectable assets other than track
        orArray.push({ assetType: { $ne: "track" } });
      } // otherwise its an array of assettypes to get
      else {
        let ats = assetTypes.split(",");
        orArray.push({ assetType: { $in: ats } });
      }
    }

    for (let range of ranges) {
      rCondition.push({ $and: [{ start: { $gte: range.mpStart } }, { start: { $lte: range.mpEnd } }, { lineId: range.lineId }] });
    }

    let criteria = { $and: [{ $or: orArray }, { isRemoved: false }, ...rCondition] }; // combine all criterion
    //console.log('criteria:', JSON.stringify(criteria));
    let res = await assetModel.find(criteria);

    return res;
  }
  async sortTemplates(user, body) {
    let resultObj = {};
    let objKeys = Object.keys(body);
    let wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    let logger = ServiceLocator.resolve("logger");
    var plan;
    for (plan in body) {
      try {
        if (!plan.nextInspectionDate || plan.nextInspectionDate < plan.startDate) {
          plan.nextInspectionDate = plan.startDate;
        }

        let templates = wPlanTemplate.findByIdAndUpdate(body[plan]._id, body[plan]);
        let execValue = await templates.exec();
        resultObj = { value: execValue, status: 200 };
      } catch (err) {
        resultObj = { errorVal: err, status: 500 };
        logger.error("sortTemplates: error:" + err);
      }
    }
    return resultObj;
  }

  async updateTemplateOnAssetGroupUpdate(assetGroup) {
    let resultObj = {};
    let wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    let logger = ServiceLocator.resolve("logger");

    try {
      let templateQuery = wPlanTemplate.findOne({ assetGroupId: assetGroup._id });
      let template = await templateQuery.exec();
      if (template) {
        let unitsNew = [];
        assetGroup.units.forEach((element) => {
          let unitSingle = {
            id: element.id,
            unitId: element.unitId,
            track_id: assetGroup._id,
            assetType: element.assetType,
            coordinates: element.coordinates,
          };
          unitsNew.push(unitSingle);
        });
        template.tasks[0].units = unitsNew;
        template.markModified("tasks");
        try {
          let updatedtemplatetemplate = await template.save();
          resultObj = { value: updatedtemplatetemplate, status: 200 };
        } catch (err) {
          console.log(err);
          logger.error("updateTemplateOnAssetGroupUpdate: saving template error:" + err);
          resultObj = { errorVal: err, status: 500 };
        }
      }
    } catch (err) {
      resultObj = { errorVal: err, status: 500 };
      logger.error("updateTemplateOnAssetGroupUpdate: error:" + err);
    }
    return resultObj;
  }

  async deleteWorkPlanTemplate(templateId) {
    let resultObj = {};
    // find the template of given id
    let wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    let logger = ServiceLocator.resolve("logger");
    let TrackModel = ServiceLocator.resolve("TrackModel");
    try {
      let foundTemplate = await wPlanTemplate.findOne({ _id: templateId, isRemoved: !true }).exec();
      if (foundTemplate) {
        let assetGroup = await TrackModel.findById(foundTemplate.assetGroupId).exec();
        if (assetGroup) {
          assetGroup.templateCreated = undefined;
          let saved = await assetGroup.save();
        }
        foundTemplate.isRemoved = true;
        let savedTemplate = await foundTemplate.save();
        resultObj = { value: savedTemplate, status: 200 };
      } else {
        resultObj = { errorVal: "Not Found", status: 404 };
      }
    } catch (error) {
      resultObj = { errorVal: error, status: 500 };
      logger.error("deleteWorkPlanTempalte : " + error);
    }
    return resultObj;
  }
  async getUsersTemplates(users) {
    let logger = ServiceLocator.resolve("logger");
    let wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    let resultObj = {};
    try {
      let parsedUsers = JSON.parse(users);
      let allTemplates = [];
      for (let user of parsedUsers) {
        let templates = await wPlanTemplate.find({ "user._id": user }).exec();
        allTemplates = [...allTemplates, ...templates];
      }
      resultObj = { value: allTemplates, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error, status: 500 };
      logger.error("getUsersTemplates : " + error);
    }

    return resultObj;
  }

  async updateUsersTemplates(workplanTemplates, user) {
    let logger = ServiceLocator.resolve("logger");
    let wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    let resultObj = {},
      templates;
    try {
      if (workplanTemplates[0]) {
        templates = await wPlanTemplate.updateMany({ _id: workplanTemplates[0] }, { $set: { user } });
      }

      resultObj = { value: templates, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error, status: 500 };
      logger.error("updateUsersTemplates:" + error);
    }

    return resultObj;
  }

  async updateTemplatesTempChanges(plantoChange) {
    let logger = ServiceLocator.resolve("logger");
    let wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
    let taskService = ServiceLocator.resolve("TaskService");
    let resultObj = {};
    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    try {
      //console.log(plantoChange);
      let template = await wPlanTemplateModel.findOne({ _id: plantoChange.workplanTemplateId });
      !template.modifications && (template.modifications = {});
      if (template && plantoChange.taskToUpdate) {
        // if special task is modified then calculate that task properly.
        let locationUnit = await AssetsModel.findById(template.lineId);
        if (locationUnit) {
          plantoChange.taskWithData = await taskService.calculateTaskData(plantoChange.taskToUpdate, locationUnit);
          let newTaskToAdd = true;
          if (
            plantoChange.taskToUpdate.taskId &&
            template.modifications[plantoChange.date] &&
            template.modifications[plantoChange.date].tasks
          ) {
            let len = template.modifications[plantoChange.date].tasks.length;
            for (let t = 0; t > len; t++) {
              if (template.modifications[plantoChange.date].tasks[t].taskId == plantoChange.task.taskId) {
                template.modifications[plantoChange.date].tasks[t] = plantoChange.taskWithData;
                newTaskToAdd = false;
              }
            }
          }
          newTaskToAdd &&
            template.modifications[plantoChange.date] &&
            template.modifications[plantoChange.date].tasks &&
            template.modifications[plantoChange.date].tasks.push(plantoChange.taskWithData);
          newTaskToAdd && !template.modifications[plantoChange.date] && (template.modifications[plantoChange.date] = {});
          newTaskToAdd &&
            !template.modifications[plantoChange.date].tasks &&
            (template.modifications[plantoChange.date].tasks = [plantoChange.taskWithData]);
          template.markModified("modifications");
          let savedTemplate = await template.save();
          resultObj = { value: savedTemplate, status: 200 };
        } else {
          console.log();
          logger.error("updateTemplatesTempChanges , location asset of Plan not Found : ");
        }
      } else if (template) {
        // update the existing modification with new ones
        template.modifications = template.modifications ? template.modifications : {};
        template.modifications[plantoChange.date] &&
          (template.modifications[plantoChange.date] = { ...template.modifications[plantoChange.date], ...plantoChange.tempChanges });
        !template.modifications[plantoChange.date] && (template.modifications[plantoChange.date] = plantoChange.tempChanges);
        // to remove temp user change so it is on the assigned user again.
        if (plantoChange.tempChanges.user && plantoChange.tempChanges.user.id === template.user._id) {
          delete template.modifications[plantoChange.date].user;
        }
        template.markModified("modifications");
        let savedUpdatedTemplateUser = await template.save();

        // recalculate wPlanTemplteSchedule
        let wPlanTemplateScheduleModel = ServiceLocator.resolve("WPlanSchedulesModel");
        let wPlanTemplateSchedule = await wPlanTemplateScheduleModel.findOne({ templateId: savedUpdatedTemplateUser._id }).exec();
        if (wPlanTemplateSchedule) {
          wPlanTemplateSchedule.toRecalculate = true;
          let saveResult = await wPlanTemplateSchedule.save();
        }

        resultObj = { value: savedUpdatedTemplateUser, status: 200 };
      }
      //  console.log("template", template);
      else {
        resultObj = { errorVal: "Inspection Run Not Found", status: 404 };
      }
    } catch (error) {
      resultObj = { errorVal: error, status: 500 };
      console.log(error);
      logger.error("updateTemplatesTempChanges : " + error);
    }

    return resultObj;
  }

  async getAllPlansInRange(dateRange, user, lineId, sortCriteria = { sortBy: { date: "asc" } }, beefOut = false) {
    let wPlanTemplateModel,
      allTemplates,
      allInspections,
      adminCheck,
      subdivisionUser,
      checkSubdiv,
      JourneyPlanModel,
      ApplicationLookupsModel,
      utils;
    allInspections = [];
    adminCheck = user.isAdmin;
    subdivisionUser = user.subdivision;
    wPlanTemplateModel = ServiceLocator.resolve("WorkPlanTemplateModel");
    JourneyPlanModel = ServiceLocator.resolve("JourneyPlanModel");
    ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
    checkSubdiv = await subdivisionChecker(user);
    utils = ServiceLocator.resolve("utils");
    try {
      let scheduleService = ServiceLocator.resolve("scheduleService");
      //let criteria = { isRemoved: !true };
      let criteria = { isRemoved: !true };
      // let inspectionCriteria = { date: { $gte: new Date(dateRange.from), $lte: new Date(dateRange.to) } };
      let inspectionCriteria = {};
      let workingDays = { holidays: [], weekOffDays: [] };
      let workingOffDays = await ApplicationLookupsModel.findOne({ code: "weekdays" }).exec();
      workingDays.weekOffDays = workingOffDays.opt2;
      let workPlanQuerry = wPlanTemplateModel.find(criteria);
      if (sortCriteria && sortCriteria.sortBy) {
        workPlanQuerry = workPlanQuerry.sort(sortCriteria.sortBy);
      }
      if (checkSubdiv) {
        criteria.subdivision = subdivisionUser;
        inspectionCriteria.subdivision = subdivisionUser;
      }
      if (lineId) {
        criteria.lineId = lineId;
      }
      if (beefOut) {
        // eliminate heavy fields
        workPlanQuerry.select(
          "_id user active isRemoved title foulTime workZone watchmen date subdivision lineId lineName nextInspectionDate startDate inspectionFrequency inspectionType lastInspection",
        );
      }
      allTemplates = await workPlanQuerry.exec();

      if (allTemplates && allTemplates.length > 0) {
        let wPlanSchedulesModel = ServiceLocator.resolve("WPlanSchedulesModel");
        let allTemplatesIds = allTemplates.map((t) => t.id);
        let wPlanSchedules = await wPlanSchedulesModel.find({ templateId: { $in: allTemplatesIds } }).exec();

        for (let template of allTemplates) {
          let wpScheduleObj = _.find(wPlanSchedules, { templateId: template.id });

          inspectionCriteria.workplanTemplateId = template._id;
          let executedInspections;
          if (beefOut)
            executedInspections = await JourneyPlanModel.find(inspectionCriteria)
              .select("_id user date title workplanTemplateId lineId lineName startDateTime endDateTime status subdivision")
              .sort(sortCriteria.sortBy)
              .exec();
          else executedInspections = await JourneyPlanModel.find(inspectionCriteria).sort(sortCriteria.sortBy).exec();
          let checkRangeAvailable = await checkAvailableDateRange(wpScheduleObj, dateRange, utils);
          let rangeToCal;
          if (checkRangeAvailable.reCal) {
            rangeToCal = checkRangeAvailable.updatedDateRange;
          }
          let inspections = [];
          let dirtyCheck = wpScheduleObj ? wpScheduleObj.toRecalculate : true;
          dirtyCheck = dirtyCheck || checkRangeAvailable.reCal;
          if (dirtyCheck) {
            let calculatedSchedules = scheduleService.getSchedules(
              template,
              template.startDate,
              executedInspections,
              rangeToCal ? rangeToCal : dateRange,
              workingDays,
              this.ignoreInspectionsFromSchedulingCase,
            );
            // # check if to update workplan template next expiry and due date.
            this.checkWorkPlanNextDueExpiryDate(template, utils);
            this.checkCurrentTimePeriodUpdate(template, utils);
            let alertService = ServiceLocator.resolve("AlertService");
            alertService.recalculateAlertMonitoringByModelId(template.id);
            await template.save();
            inspections = calculatedSchedules;

            let dateRangeToSave = dateRange;
            checkRangeAvailable.fromUpdated && (dateRangeToSave.from = checkRangeAvailable.updatedDateRange.from);
            checkRangeAvailable.toUpdated && (dateRangeToSave.to = checkRangeAvailable.updatedDateRange.to);
            checkRangeAvailable.todayUpdated && (dateRangeToSave.today = checkRangeAvailable.updatedDateRange.today);
            if (wpScheduleObj) {
              wpScheduleObj.inspectionSchedules = trimRealInspectionDataToID(calculatedSchedules);
              wpScheduleObj.dateRange = dateRangeToSave;
              wpScheduleObj.startDate = template.startDate;
              wpScheduleObj.toRecalculate = false;
              wpScheduleObj.markModified("inspectionSchedules");
              wpScheduleObj.markModified("dateRange");
              await wpScheduleObj.save();
            } else {
              let newWpSchedule = new wPlanSchedulesModel({
                user: template.user,
                dateRange: dateRangeToSave,
                startDate: template.startDate,
                inspectionSchedules: trimRealInspectionDataToID(calculatedSchedules),
                templateId: template._id,
                title: template.title,
                lineId: template.lineId,
              });
              await newWpSchedule.save();

              wpScheduleObj = newWpSchedule;
            }
          }
          let updatedInspections = await populateInspectionDataToID(wpScheduleObj.inspectionSchedules, JourneyPlanModel);
          inspections = _.filter(updatedInspections, async (inspec) => {
            if (!inspec.date) {
              console.log("No Date for this inspection:", inspec);
              return false;
            } else {
              return utils.compareTwoDates(dateRange.from, inspec.date, "ISOB") && utils.compareTwoDates(dateRange.to, inspec.date, "ISOA");
            }
          });
          // put those filtered inspections with new data
          allInspections = [...allInspections, ...inspections];
        }
      }
    } catch (error) {
      console.log(error);
    }
    return allInspections;
  }
  async workPlanExecuted(item, wpt_id) {
    let WPTModel, plan, inspection;

    inspection = item.optParam1;
    WPTModel = ServiceLocator.resolve("WorkPlanTemplateModel");
    try {
      plan = await WPTModel.findOne({ _id: wpt_id }).exec();
      if (plan) {
        const INSPECTION_DATE = new Date(inspection.date);
        const NEXTINSPECTION_DATE = new Date(plan.nextInspectionDate);
        if (plan.inspectionType == "fixed") {
          if (INSPECTION_DATE >= NEXTINSPECTION_DATE) {
            plan.nextInspectionDate = new Date(
              plan.nextInspectionDate.setDate(plan.nextInspectionDate.getDate() + plan.inspectionFrequency),
            );
            plan.markModified("nextInspectionDate");
          }
          plan.lastInspection = INSPECTION_DATE;
          plan.markModified("lastInspection");
          let savedPlan = await plan.save();
        }
        if (plan.inspectionType == "custom") {
          plan.nextInspectionDate = new Date(plan.nextInspectionDate.setDate(INSPECTION_DATE.getDate() + plan.inspectionFrequency));
          plan.nextInspectionDate.setUTCHours(0, 0, 0, 0);
          console.log(plan.nextInspectionDate);
          plan.lastInspection = INSPECTION_DATE;
          plan.markModified("nextInspectionDate");
          plan.markModified("lastInspection");
          let savedPlan = await plan.save();
        }
      } else {
        // log the error for not finding the existing plan with given _id
      }
    } catch (error) {
      //To do add logger error
    }
  }

  async filterForUser(
    wpts,
    user,
    tzMinutes, // this function is called from listHelper based on criteria.customFilter in ApplicationLookups in database
  ) {
    // Use the current day at location —to be inspected—, and ignore the user's current day.
    // Fetch all required timezones once
    let uniqueLocations = [];
    wpts.forEach((w) => {
      if (!uniqueLocations.includes(w.lineId)) uniqueLocations.push(w.lineId);
    });
    let assetService = ServiceLocator.resolve("AssetsService");
    let timezoneMap = await assetService.getTimezones(uniqueLocations);

    let filteredWpts = [];
    for (let wpt of wpts) {
      let inModifications = false;
      if (wpt.modifications) {
        for (let d in wpt.modifications) {
          let mDate = moment(d, "YYYYMMDD");
          let nextDate = moment(wpt.nextExpiryDate);
          let timezone = timezoneMap[wpt.lineId];

          if (momentTz.tz.zone(timezone)) {
            let today = momentTz.tz(new Date().toISOString().slice(0, 10), timezone);

            if (
              today >= mDate &&
              today <= nextDate &&
              wpt.modifications[d].user &&
              wpt.modifications[d].user.email &&
              wpt.modifications[d].user.email === user.email
            ) {
              //console.log("date falls withtin Range")
              inModifications = true;
            }
          } else {
            // todo: error timezone invalid
          }
          //console.log('date in wpt.modifications', d);
        }
      }
      if (wpt && wpt.user && user && (wpt.user.email === user.email || wpt.user.email === user.teamLead || inModifications)) {
        filteredWpts.push(wpt);
      }
    }

    return filteredWpts;
  }
  ignoreInspectionsFromSchedulingCase(inspection, template) {
    let toIgnore = false;
    if (
      inspection &&
      inspection.tasks &&
      inspection.tasks.length > 0 &&
      (inspection.tasks[0].inspectionType !== "Required Inspection" || inspection.tasks[0].inspectionTypeTag !== "required")
    ) {
      toIgnore = true;
    }
    return toIgnore;
  }

  checkWorkPlanNextDueExpiryDate(template, utils) {
    if (
      template.updatedNextDates &&
      (!utils.compareTwoDates(template.nextExpiryDate, template.updatedNextDates.nextExpiryDate, "IA") ||
        !utils.compareTwoDates(template.nextDueDate, template.updatedNextDates.nextDueDate, "IA"))
    ) {
      template.nextExpiryDate = template.updatedNextDates.nextExpiryDate;
      template.nextDueDate = template.updatedNextDates.nextDueDate;
      template.updatedNextDates.currentDueDate && (template.currentDueDate = template.updatedNextDates.currentDueDate);
      template.updatedNextDates.currentExpiryDate && (template.currentExpiryDate = template.updatedNextDates.currentExpiryDate);
    }
  }
  checkCurrentTimePeriodUpdate(template, utils) {
    if (
      template.updatedNextDates &&
      (!utils.compareTwoDates(template.currentPeriodStart, template.updatedNextDates.currentPeriodStart, "ISOA") ||
        !utils.compareTwoDates(template.currentPeriodEnd, template.updatedNextDates.currentPeriodEnd, "ISOA"))
    ) {
      template.currentPeriodStart = template.updatedNextDates.currentPeriodStart;
      template.currentPeriodEnd = template.updatedNextDates.currentPeriodEnd;
    }
  }
}

export default WorkPlanTemplateService;

async function getInspectionsOfTemplate(plan, exec_inspections, dateRange, workingDays) {
  let inspections = [];
  let inspectionsBeforePlanDate = [];
  const DATE_FILTER_TO = new Date(dateRange.to);
  const FREQUENCY = plan.inspectionFrequency;
  const DATE_FILTER_FROM = new Date(dateRange.from);
  const DATE_FILTER_TODAY = new Date(dateRange.today);
  let c_exec_inspections = [...exec_inspections];
  // cases
  /*
  check for both cases if fixed or custom inspections.
  */
  try {
    // 1.1 start the iteration from the start date till we fell into the date range
    let dateToCheck = plan.startDate;
    //  add any inspection before start date of the template plan
    for (let inspec of c_exec_inspections) {
      if (inspec.date < plan.startDate && inspec.date > DATE_FILTER_FROM) {
        inspectionsBeforePlanDate.push(inspec);
      }
    }

    // Check Both cases when frequency is greater then 0
    if (FREQUENCY > 0 || (plan.timeFrame && plan.perTime)) {
      while (dateToCheck && dateToCheck <= DATE_FILTER_TO) {
        let tempDate = new Date(dateToCheck);
        let freqNum = plan.inspectionType == "custom" ? plan.maxAllowable : FREQUENCY;
        let timePeriod =
          plan.timeFrame == "Week"
            ? 7 - workingDays.weekOffDays.length
            : plan.timeFrame == "Month"
            ? moment(dateToCheck).daysInMonth()
            : moment(dateToCheck).isLeapYear()
            ? 366
            : 365;
        let newFreq = Math.ceil(timePeriod / parseInt(plan.perTime));

        let nextDateToCheck = new Date(moment(nextDateToCheck ? nextDateToCheck : dateToCheck).add(newFreq, "days"));
        let next_nextInspectionCheck = nextDateToCheck;
        const CHECK_DATE_IN_RANGE = dateToCheck >= DATE_FILTER_FROM;
        const CHECK_DATE_BEFORE_TODAY = dateToCheck < DATE_FILTER_TODAY;
        const NEXT_CHECK_DATE_BEFORE_TODAY = next_nextInspectionCheck < DATE_FILTER_TODAY;
        // Case :- the dateToCheck falls in the range of the query date , it make sure the date is still in the past , including the next possible inspection to check if its  missed or overdue.
        if (CHECK_DATE_IN_RANGE && CHECK_DATE_BEFORE_TODAY) {
          let exists = false;
          for (let inspec of c_exec_inspections) {
            if (inspec.date < next_nextInspectionCheck && inspec.date >= plan.startDate) {
              if (!inspec.added) {
                inspections.push(inspec);
                inspec.added = true;
                if (plan.inspectionType == "custom") {
                  nextDateToCheck = new Date(inspec.date);
                }
              }
              // _.remove(c_exec_inspections, { _id: inspec._id });

              exists = true;
            }
          }
          if (!exists) {
            if (NEXT_CHECK_DATE_BEFORE_TODAY && !plan.isRemoved) {
              let missedInspection = await foreCastedInspectionObjectGet(plan, dateToCheck, "Missed");
              inspections.push(missedInspection);
            } else {
              if (!plan.isRemoved) {
                let overdueInspection = await foreCastedInspectionObjectGet(plan, dateToCheck, "Overdue");
                inspections.push(overdueInspection);
                if (plan.modifications) {
                  let momentDate = moment.utc(dateToCheck.getTime()).format("YYYYMMDD");
                  let futureChange_date = plan.modifications[momentDate];
                  if (futureChange_date && futureChange_date.user) {
                    overdueInspection.temp_user = futureChange_date.user;
                  }
                }
              }
            }
          }
        }
        // Case :- the inspection will be in the future so forecast it
        else if (CHECK_DATE_IN_RANGE && !CHECK_DATE_BEFORE_TODAY) {
          let inspFound = false;
          if (dateToCheck < DATE_FILTER_TO) {
            for (let inspec of c_exec_inspections) {
              if (!inspec.added) {
                if (inspec.date < next_nextInspectionCheck && inspec.date >= plan.startDate) {
                  inspections.push(inspec);
                  inspec.added = true;
                  if (plan.inspectionType == "custom") {
                    nextDateToCheck = new Date(inspec.date);
                  }
                }
                // _.remove(c_exec_inspections, { _id: inspec._id });

                inspFound = true;
              }
            }
          }
          if (!plan.isRemoved && !inspFound) {
            let futureInspection = await foreCastedInspectionObjectGet(plan, dateToCheck, "Future Inspection");

            if (plan.modifications) {
              let momentDate = moment.utc(dateToCheck.getTime()).format("YYYYMMDD");
              let futureChange_date = plan.modifications[momentDate];
              if (futureChange_date && futureChange_date.user) {
                futureInspection.temp_user = futureChange_date.user;
              }
            }

            inspections.push(futureInspection);
          }
        }
        let adjustedFreq = plan.timeFrame
          ? calculateTimeFrameNextFreq(plan, inspections, dateToCheck, workingDays)
          : nextWorkingDaysAdjusted(dateToCheck, freqNum, workingDays);
        dateToCheck = new Date(moment(dateToCheck).add(adjustedFreq, "days"));
      }
      for (let inspec of c_exec_inspections) {
        if (!inspec.added && inspec.date >= DATE_FILTER_FROM && inspec.date <= DATE_FILTER_TO) {
          inspections.push(inspec);
          inspec.added = true;
        }
      }
    } else {
      // Inspections template that have 0 frequency.
      for (let inspec of c_exec_inspections) {
        if (inspec.date > DATE_FILTER_FROM && inspec.date < DATE_FILTER_TO) {
          inspections.push(inspec);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  return [...inspectionsBeforePlanDate, ...inspections];
}
async function foreCastedInspectionObjectGet(c_plan, date, status) {
  let inspection = {
    user: c_plan.user,
    tasks: c_plan.tasks,
    date: new Date(date.getTime()),
    title: c_plan.title,
    workplanTemplateId: c_plan._id,
    lineId: c_plan.lineId,
    lineName: c_plan.lineName,
    status: status,
  };
  return inspection;
}

function nextWorkingDaysAdjusted(currDate, rawNum, workingDays) {
  let adjustedNum = rawNum;

  for (let i = 0; i <= adjustedNum; i++) {
    let newDate = moment(currDate).add(i, "days");
    let holiday = _.find(workingDays.holidays, (item) => {
      return moment(newDate).format("DDMMYYYY") == moment(item).format("DDMMYYYY");
    });
    if (holiday) {
      adjustedNum++;
    } else {
      let day = newDate.format("dddd");
      let offDay = _.find(workingDays.weekOffDays, (item) => {
        return item == day;
      });
      offDay && adjustedNum++;
    }
  }
  return adjustedNum;
}

function calculateTimeFrameNextFreq(plan, inspections, currDate, workingDays) {
  let freq = 0;
  let timePeriod =
    plan.timeFrame == "Week"
      ? 7 - workingDays.weekOffDays.length
      : plan.timeFrame == "Month"
      ? moment(currDate).daysInMonth()
      : moment(currDate).isLeapYear()
      ? 366
      : 365;
  let timeAdjustment = plan.timeFrame == "Week" ? "week" : plan.timeFrame == "Month" ? "month" : "year";
  let foundInspections = _.filter(inspections, (inspec) => {
    let DATE_GREATER_THEN_START = moment(inspec.date, "YYYYMMDD").isSameOrAfter(moment(currDate, "YYYYMMDD").startOf(timeAdjustment));
    let DATE_LESS_THEN_END = moment(inspec.date, "YYYYMMDD").isSameOrBefore(moment(currDate, "YYYYMMDD").endOf(timeAdjustment));

    return DATE_GREATER_THEN_START && DATE_LESS_THEN_END;
  });
  let latestInspection =
    foundInspections.length > 0 &&
    moment(foundInspections[foundInspections.length - 1].date).format("YYYYMMDD") !== moment(plan.startDate).format("YYYYMMDD")
      ? foundInspections[foundInspections.length - 1]
      : null;
  let newFreq = Math.ceil(timePeriod / parseInt(plan.perTime));
  if (latestInspection) {
    // next time period start ( in case if enough inspection exist in this period we need to move to this next time period start)
    let nextTimeStartDate = moment(latestInspection.date, "YYYY-MM-DD")
      .add(1, timeAdjustment + "s")
      .startOf(timeAdjustment);
    // the frequency cal based on num of times in time period

    // next inspection in case if it is already beyond nextTimeStartDate
    let nextTimeDate = moment(latestInspection.date).add(newFreq, "days");
    // calculate next frequency (for Week it is lastInspection.date) , for year we only check if the next date is holiday/off-day
    if (plan.timeFrame == "Week") {
      freq = nextWorkingDaysAdjusted(latestInspection.date, newFreq, workingDays);
    } else {
      freq = newFreq + nextWorkingDaysAdjusted(nextTimeDate, 0, workingDays);
    }
    // if enough inspections exist (+1 because the next inspection will complete it so we know it will be added on the currentDate) we need to move to nextTime period start.
    if (foundInspections.length >= parseInt(plan.perTime)) {
      let compareCurrentDate = moment(moment(currDate).format("YYYY-MM-DD"));
      let diff = nextTimeStartDate.diff(compareCurrentDate, "days");
      if (new Date(nextTimeDate) < new Date(nextTimeStartDate)) {
        freq = diff + nextWorkingDaysAdjusted(nextTimeStartDate, 0, workingDays);
      }
    } else {
      if (foundInspections.length <= parseInt(plan.perTime) - 1 && nextTimeDate >= nextTimeStartDate) {
        freq = nextWorkingDaysAdjusted(latestInspection.date, plan.minDays ? plan.minDays : 1, workingDays);
      }
    }
  } else {
    // if no inspection found/exist then calculate it normally
    // if (plan.timeFrame == "Week") {
    //   freq = nextWorkingDaysAdjusted(currDate, newFreq, workingDays);
    // } else {
    let nextTimeCurrDate = moment(currDate).add(newFreq, "days");
    freq = newFreq + nextWorkingDaysAdjusted(nextTimeCurrDate, 0, workingDays);
    // }
  }

  return freq;
}

function getRailOptions(rOrientation, electrified, electrifiedAsset) {
  let railIssueOptions = ["N/A"];
  if (rOrientation == "NS") {
    railIssueOptions.push("North");
    railIssueOptions.push("South");
  } else if (rOrientation == "EW") {
    railIssueOptions.push("East");
    railIssueOptions.push("West");
  }
  if (electrified && electrifiedAsset == "3rd Rail") {
    railIssueOptions.push("3rd Rail");
    railIssueOptions[0] = "N/A";
  }
  if (electrified && electrifiedAsset == "Catenary Power") {
    railIssueOptions.push("Catenary Power");
    railIssueOptions[0] = "N/A";
  }
  return railIssueOptions;
}

async function checkAvailableDateRange(wpScheduleObj, dateRange, utils) {
  let checkObjToReturnWithDate = {
    reCal: false,
    updatedDateRange: dateRange,
    fromUpdated: false,
    toUpdated: false,
    todayUpdated: false,
  };
  if (wpScheduleObj) {
    if (utils.compareTwoDates(dateRange.from, wpScheduleObj.dateRange.from, "IB")) {
      checkObjToReturnWithDate.updatedDateRange.from = dateRange.from;
      checkObjToReturnWithDate.reCal = true;
      checkObjToReturnWithDate.fromUpdated = true;
    }
    if (utils.compareTwoDates(dateRange.to, wpScheduleObj.dateRange.to, "IA")) {
      checkObjToReturnWithDate.updatedDateRange.to = dateRange.to;
      checkObjToReturnWithDate.reCal = true;
      checkObjToReturnWithDate.toUpdated = true;
    }
    if (!utils.checkSameDates(moment(dateRange.today), moment(wpScheduleObj.dateRange.today))) {
      checkObjToReturnWithDate.updatedDateRange.today = new Date(moment(dateRange.today).startOf("d"));
      checkObjToReturnWithDate.reCal = true;
      checkObjToReturnWithDate.todayUpdated = true;
    }
  } else {
    checkObjToReturnWithDate.reCal = true;
  }
  return checkObjToReturnWithDate;
}

function trimRealInspectionDataToID(inspectionArray) {
  let inspectionArrayLength = inspectionArray.length;
  for (let i = 0; i < inspectionArrayLength; i++) {
    if (inspectionArray[i].id) {
      inspectionArray.splice(i, 1, { _id: inspectionArray[i].id });
    }
  }
  return inspectionArray;
}
async function populateInspectionDataToID(schedules, Jmodel) {
  let inspectionArrayLength = schedules.length;
  for (let i = 0; i < inspectionArrayLength; i++) {
    if (schedules[i]._id) {
      let inspection = await Jmodel.findOne({ _id: schedules[i]._id });
      if (inspection) {
        schedules[i] = inspection;
      }
    }
  }
  return schedules;
}
