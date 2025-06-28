import { templateSettings } from "../../template/config.js";
import _, { floor } from "lodash.js";
let ServiceLocator = require("../../framework/servicelocator");
var ObjectId = require("mongodb").ObjectID;
var turf = require("@turf/turf");
class AssetsService {
  async getInspectableAssets(user) {
    // modelToFetch = "MaintenanceModel";
    // KeyToSearch = "lineId";
    let AssetsModel, assetsResultObj, treeToArray;
    assetsResultObj = { value: {} };

    try {
      AssetsModel = ServiceLocator.resolve("AssetsModel");

      treeToArray = await this.getFilteredAssetsIds(user, { inspectable: true }, true);
      if (treeToArray.assetIds && treeToArray.assetIds.length > 0) {
        let criteria = { _id: { $in: treeToArray.assetIds } };
        let data = await AssetsModel.find(criteria).exec();

        assetsResultObj.status = 200;
        assetsResultObj.value.assets = data;
      }
    } catch (err) {
      assetsResultObj = { errorVal: err, status: 500 };
    }

    return assetsResultObj;
  }

  async getFilteredAssetsIds(user, filterCriteria, userAsset) {
    // modelToFetch = "MaintenanceModel";
    // KeyToSearch = "lineId";
    let AssetsTreeModel, assetTree, resultObj, AssetsTreeService, AssetsModel, AssetTypesModel;
    resultObj = { assetIds: [] };

    try {
      AssetsTreeModel = ServiceLocator.resolve("AssetsTreeModel");
      AssetTypesModel = ServiceLocator.resolve("AssetTypesModel");
      AssetsModel = ServiceLocator.resolve("AssetsModel");
      assetTree = await AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();
      if (assetTree.assetsTreeObj) {
        const USER_ASSET = user.assignedLocation;
        AssetsTreeService = ServiceLocator.resolve("AssetsTreeService");
        let foundAssetInsideTree = [];
        let found = false;
        found = await AssetsTreeService.recursivelyFindAssetIdAndFilter(USER_ASSET, assetTree.assetsTreeObj, foundAssetInsideTree, found);
        let treeToArray = [];
        if (found) {
          if (foundAssetInsideTree[Object.keys(foundAssetInsideTree)[0]]) {
            treeToArray = await convertTreeToFlatArrayKeys(foundAssetInsideTree, filterCriteria); //[Object.keys(foundAssetInsideTree)[0]]

            if (userAsset) {
              let userAssetObject = await AssetsModel.findOne({ _id: user.assignedLocation }).exec();
              let assetType = await AssetTypesModel.findOne({ assetType: userAssetObject.assetType }).exec();
              let critKeys = Object.keys(filterCriteria);
              let criteriaCheck = true;
              for (let key of critKeys) {
                filterCriteria[key] !== assetType[key] && (criteriaCheck = false);
              }
              if (criteriaCheck) {
                treeToArray.push(ObjectId(userAssetObject._id));
              }
            }

            resultObj.assetIds = treeToArray;
          }
        } else {
          console.log("getUserLampAssets: Assigned asset to User is not found in Asset Tree");
        }
      }
    } catch (err) {
      resultObj = { errorVal: err, status: 500 };
    }
    return resultObj;
  }
  async getUserAssetsIds(user) {
    let AssetsTreeModel, assetTree, AssetsModel, AssetsTreeService;
    let assetIds = [];
    try {
      AssetsModel = ServiceLocator.resolve("AssetsModel");
      AssetsTreeModel = ServiceLocator.resolve("AssetsTreeModel");
      assetTree = await AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();
      if (assetTree.assetsTreeObj) {
        const USER_ASSET = user.assignedLocation;
        AssetsTreeService = ServiceLocator.resolve("AssetsTreeService");
        let foundAssetInsideTree = {}; // [];
        let found = false;
        found = await AssetsTreeService.recursivelyFindAssetId(USER_ASSET, assetTree.assetsTreeObj, foundAssetInsideTree, found);
        let treeToArray = [];
        if (found) {
          let key = Object.keys(foundAssetInsideTree)[0];
          if (foundAssetInsideTree[key]) {
            treeToArray = await convertTreeToFlatArrayKeys(foundAssetInsideTree); //[key]);
            assetIds = treeToArray;
          }
        } else {
          console.log("getUserLampAssets: Assigned asset to User is not found in Asset Tree");
        }
      }
    } catch (err) {
      console.log("error in getUserAssetsIds : ", err);
    }
    return assetIds;
  }
  async getUserLampAssets(user, query, additionalCriteria) {
   
    let AssetsTreeModel, assetTree, resultObj, AssetsModel, AssetsTreeService;
    resultObj = { value: {} };
    let location = query.location;

    try {
      AssetsModel = ServiceLocator.resolve("AssetsModel");
      AssetsTreeModel = ServiceLocator.resolve("AssetsTreeModel");
      assetTree = await AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();
     
      if (assetTree.assetsTreeObj) {
        const USER_ASSET = user.assignedLocation;
        AssetsTreeService = ServiceLocator.resolve("AssetsTreeService");
        let foundAssetInsideTree = {}; // [];
        let found = false;
        found = await AssetsTreeService.recursivelyFindAssetId(USER_ASSET, assetTree.assetsTreeObj, foundAssetInsideTree, found);
      
        let treeToArray = [];
        if (found) {
          let key = Object.keys(foundAssetInsideTree)[0];
          
          if (foundAssetInsideTree[key]) {
            treeToArray = await convertTreeToFlatArrayKeys(foundAssetInsideTree); //[key]);
            resultObj.value.assetTree = foundAssetInsideTree; //[key];
            resultObj.status = 200;
          }
          if (treeToArray.length > 0) {
            let criteria = { _id: { $in: treeToArray } };
            additionalCriteria && (criteria = { ...criteria, ...additionalCriteria });
            let AssetTypesService = ServiceLocator.resolve("AssetsTypeService");
            let assetsToReturn = await AssetsModel.find(criteria).exec();
            
            let assetsTypes = await AssetTypesService.get_AssetTypes();

            resultObj.status = 200;
            resultObj.value.assetsList = assetsToReturn;
            resultObj.value.assetsTypes = assetsTypes.value;
          }
        } else {
          console.log("getUserLampAssets: Assigned asset to User is not found in Asset Tree");
        }
      }
    } catch (err) {
      resultObj = { errorVal: err, status: 500 };
    }
    return resultObj;
  }
//devices api
  async getDevices() {
    let supportedDeviceModel, AssetsModel;
    let resultObj = { value: {} };
    let memoryMap = [];
    let assetsToReturn = [];

    try {
      AssetsModel = ServiceLocator.resolve("AssetsModel");
      supportedDeviceModel = ServiceLocator.resolve("DeviceModel");
      let allAssets = await AssetsModel.find({assetType: "device"}).exec();
      allAssets.forEach((asset)=>{
        if(asset.isRemoved === false)
        {
          assetsToReturn.push(asset);
        }
      });
      for(let asset of assetsToReturn)
      {
        let found = await supportedDeviceModel.find({_id: asset.suppDevice._id});
        
        let {registers} = found[0];
          // removing decoder object from registers
        Object.keys(registers).forEach((reg)=>{
          delete registers[reg].decoder;
        });

          let mapObject = {
            assetId: asset._id,
            settings: asset.settings,
            suppDevice: asset.suppDevice,
            registers:registers,
          }
          memoryMap.push(mapObject);
        }
        
        resultObj.status = 200;
        resultObj.value = memoryMap;
    } catch (err) {
      resultObj = { errorVal: err, status: 500 };
    }
    return resultObj;
  }
//ats Api

async getAtsdevices(user, query, additionalCriteria) {
  let supportedDeviceModel,AssetsTreeModel, assetTree, resultObj, AssetsModel, AssetsTreeService;
  resultObj = { value: {} };
  let location = query.location;

  try {
    AssetsModel = ServiceLocator.resolve("AssetsModel");
    AssetsTreeModel = ServiceLocator.resolve("AssetsTreeModel");
    supportedDeviceModel = ServiceLocator.resolve("DeviceModel");
    assetTree = await AssetsTreeModel.findOne({ tag: "AssetTree" }).exec();
    if (assetTree.assetsTreeObj) {
      //   console.log(assetTree.assetsTreeObj);
      const USER_ASSET = user.assignedLocation;
      AssetsTreeService = ServiceLocator.resolve("AssetsTreeService");
      let foundAssetInsideTree = {}; // [];
      let found = false;
      found = await AssetsTreeService.recursivelyFindAssetId(USER_ASSET, assetTree.assetsTreeObj, foundAssetInsideTree, found);
      
      let treeToArray = [];
      let assetsToReturn =[];
      if (found) {
        let key = Object.keys(foundAssetInsideTree)[0];
        if (foundAssetInsideTree[key]) {
          treeToArray = await convertTreeToFlatArrayKeys(foundAssetInsideTree); //[key]);
          resultObj.value.assetTree = foundAssetInsideTree; //[key];
          resultObj.status = 200;
        }
        if (treeToArray.length > 0) {
          let criteria = { _id: { $in: treeToArray } };
          additionalCriteria && (criteria = { ...criteria, ...additionalCriteria });
          let AssetTypesService = ServiceLocator.resolve("AssetsTypeService");
          let allAssets = await AssetsModel.find(criteria).exec();
          let atsList = allAssets.filter(({assetType}) => assetType === "device" );
       
          atsList.forEach((asset)=>{
            if(asset.suppDevice.type == "ATS")
            {
              assetsToReturn.push(asset);
            }
          });

          resultObj.status = 200;
          resultObj = assetsToReturn;
        }
      } else {
        console.log("getUserLampAssets: Assigned asset to User is not found in Asset Tree");
      }
    }
  } catch (err) {
    resultObj = { errorVal: err, status: 500 };
  }
  return resultObj;
}

  async getLineCriteriaByUser(user) {
    let assetTreeService = ServiceLocator.resolve("AssetsTreeService");
    let result = await assetTreeService.getPlannableLocations(user);
    let plannableLocations = result.value ? result.value : [];
    return { $in: plannableLocations };
  }

  async getTimezones(assets) {
    let criteria = { _id: { $in: assets } };
    let assetModel = ServiceLocator.resolve("AssetsModel");
    let assetsCollection = await assetModel.find(criteria).select("_id attributes").exec();
    let assetTimezone = [];
    if (assetsCollection && assetsCollection.length) {
      for (let asset of assetsCollection) {
        if (asset.attributes && asset.attributes.timezone) assetTimezone[asset._id] = asset.attributes.timezone;
        else assetTimezone[asset._id] = "";
      }
    }

    return assetTimezone;
  }

  async getAssetsLamp(requestUser, lineId) {
    let resultObj,
      AssetsModel,
      adminCheck,
      subdivisionUser,
      assetsList,
      criteria = { lineId: lineId };
    /*
      CHANGE: DATE : Nov, 05, 2019
      REASON: 
    */
    criteria.lineId = this.getLineCriteriaByUser(user);

    resultObj = {};
    AssetsModel = ServiceLocator.resolve("AssetsModel");
    adminCheck = requestUser.isAdmin;
    subdivisionUser = requestUser.subdivision;
    try {
      if (!adminCheck && subdivisionUser !== "All") {
        //criteria.subdivision = subdivisionUser;
        assetsList = await AssetsModel.find(criteria).exec();
        resultObj = { value: assetsList, status: 200 };
      } else {
        assetsList = await AssetsModel.find(criteria).exec();
        resultObj = { value: assetsList, status: 200 };
      }
    } catch (e) {
      resultObj = { errorVal: e, status: 500 };
    }
    return resultObj;
  }

  async getAllAssetsLamp(requestUser) {
    let resultObj,
      AssetsModel,
      adminCheck,
      subdivisionUser,
      assetsList,
      criteria = {};
    resultObj = {};
    AssetsModel = ServiceLocator.resolve("AssetsModel");
    adminCheck = requestUser.isAdmin;
    subdivisionUser = requestUser.subdivision;
    try {
      if (!adminCheck && subdivisionUser !== "All") {
        //criteria.subdivision = subdivisionUser;
        assetsList = await AssetsModel.find(criteria).exec();
        resultObj = { value: assetsList, status: 200 };
      } else {
        assetsList = await AssetsModel.find(criteria).exec();
        resultObj = { value: assetsList, status: 200 };
      }
    } catch (e) {
      resultObj = { errorVal: e, status: 500 };
    }
    return resultObj;
  }
  async createAssetsLampWizard(asset) {
    let sampleobj = {
      wizard: true,
      parentAsset: {
        _id: "5e8640addcba88429077afc5",
      },
      trackAssets: [
        {
          unitId: "track 1",
          assetType: "track",
          start: 0,
          end: 13.35,
        },
        {
          unitId: "rail E @track 1",
          assetType: "rail",
          start: 0,
          end: 13.35,
          length: 13.35,
        },
        {
          unitId: "rail W @track 1",
          assetType: "rail",
          start: 0,
          end: 13.35,
          length: 13.35,
        },
        {
          unitId: "3rd Rail @track 1",
          assetType: "rail",
          start: 0,
          end: 13.35,
          length: 13.35,
        },
      ],
      trackData: {
        primaryTrack: true,
        trackNumber: 1,
        description: "track",
        mpStart: 0,
        mpEnd: 13.35,
        electrified: true,
        electValue: "3rdRail",
        railOrientation: "EW",
      },
    };
    let resultObj, AssetsModel, trackAssetObj, parentAsset, trackData, primaryTrack;
    resultObj = {};
    AssetsModel = ServiceLocator.resolve("AssetsModel");

    let utils = ServiceLocator.resolve("utils");

    let AssetsTreeService = ServiceLocator.resolve("AssetsTreeService");
    trackData = asset.trackData;
    let mpStart = utils.toFixed(trackData.mpStart);
    let mpEnd = utils.toFixed(trackData.mpEnd);
    let assetLength = utils.toFixed(trackData.mpEnd - trackData.mpStart);
    let geoJsonCord = asset.geoJsonCord;
    let trackJsonCord = trackData.geoJsonCord ? JSON.stringify(trackData.geoJsonCord) : null;
    try {
      // add track asset
      parentAsset = asset.parentAssetObj._id;
      primaryTrack = trackData.primaryTrack;
      trackAssetObj = {
        coordinates: [],
        inspectable: true,
        parentAsset: parentAsset,
        images: [],
        documents: [],
        childAsset: [],
        isRemoved: false,
        subdivision: "",
        unitId: trackData.trackName,
        description: trackData.description,
        start: mpStart,
        end: mpEnd,
        assetLength: assetLength,
        assetType: "track",
        frequency: null,
        attributes: {
          "Local Track Name": trackData.localTrackName,
          primaryTrack: primaryTrack,
          railOrientation: trackData.railOrientation,
        },
        name: trackData.description,
        lineId: parentAsset,
        trackId: parentAsset,
      };

      if (trackJsonCord) {
        if (!trackAssetObj.attributes) {
          trackAssetObj.attributes = {};
        }
        trackAssetObj.attributes.geoJsonCord = trackJsonCord;
      }

      let trackAsset = new AssetsModel(trackAssetObj);

      let savedTrackAsset = await trackAsset.save();
      let parent = null;
      if (savedTrackAsset.parentAsset) {
        parent = await AssetsModel.findById(savedTrackAsset.parentAsset).exec();
        await this.manageLevels(savedTrackAsset, parent);
      }
      let trackAssets = asset.trackAssets;
      for (let i = 0; i < trackAssets.length; i++) {
        if (trackAssets[i].assetType != "track") {
          mpStart = utils.toFixed(trackAssets[i].start);
          mpEnd = utils.toFixed(trackAssets[i].end);
          assetLength = utils.toFixed(trackAssets[i].end - trackAssets[i].start);
          let trackChildObj = {
            inspectable: true,
            parentAsset: savedTrackAsset._id,
            isRemoved: false,
            subdivision: "",
            unitId: trackAssets[i].unitId,
            description: trackAssets[i].unitId,
            start: mpStart,
            end: mpEnd,
            assetLength: assetLength,
            assetType: trackAssets[i].assetType,
            frequency: null,
            name: trackAssets[i].assetType,
            lineId: parentAsset,
            trackId: savedTrackAsset._id,
          };
          let trackChild = new AssetsModel(trackChildObj);
          await this.manageLevels(trackChild, savedTrackAsset);
          let saveTrackChild = await trackChild.save();
          savedTrackAsset.childAsset.push(saveTrackChild._id);
        }
      }
      savedTrackAsset.markModified("childAsset");
      if (savedTrackAsset.parentAsset) {
        //parent.childAsset.push(savedTrackAsset._id);
        if (primaryTrack) {
          parent.start = savedTrackAsset.start;
          parent.end = savedTrackAsset.end;
        }
        if (geoJsonCord) {
          if (!parent.attributes) {
            parent.attributes = {};
          }
          parent.attributes.geoJsonCord = geoJsonCord;
        }
        parent.markModified("attributes");
        parent.markModified("childAsset");
        let savedParent = await parent.save();
        if (savedParent.assetType == "track") {
          savedTrackAsset.trackId = savedParent._id;
        } else {
          savedTrackAsset.trackId = savedParent.trackId;
        }

        let finalSavedAsset = await savedTrackAsset.save();
        await AssetsTreeService.createHierarchyTree();

        resultObj = { value: finalSavedAsset, status: 200 };
      } else {
        resultObj = { value: savedAsset, status: 200 };
      }
    } catch (error) {
      console.log(error);
      resultObj = { errorVal: error, status: 500 };
    }
    return resultObj;
  }
  async createAssetsLamp(asset) {
    
    let resultObj, AssetsModel, adminCheck, subdivisionUser, assetsList;
    resultObj = {};
    AssetsModel = ServiceLocator.resolve("AssetsModel");
    let utils = ServiceLocator.resolve("utils");

    let AssetsTreeService = ServiceLocator.resolve("AssetsTreeService");
    try {
      if (asset.start) asset.start = utils.toFixed(asset.start);

      if (asset.end) asset.end = utils.toFixed(asset.end);

      if (asset.assetLength) asset.assetLength = utils.toFixed(asset.assetLength);

      let newAsset = new AssetsModel(asset);

      let savedAsset = await newAsset.save();
      if (savedAsset.parentAsset) {
        let parent = await AssetsModel.findById(savedAsset.parentAsset).exec();
        parent.childAsset.push(savedAsset._id);
        parent.markModified("childAsset");
        await this.manageLevels(savedAsset, parent);
        let savedParent = await parent.save();

        if (savedParent.assetType == "track") {
          savedAsset.trackId = savedParent._id;
        } else {
          savedAsset.trackId = savedParent.trackId;
        }

        let finalSavedAsset = await savedAsset.save();
        await AssetsTreeService.createHierarchyTree();

        resultObj = { value: finalSavedAsset, status: 200 };
      } else {
        resultObj = { value: savedAsset, status: 200 };
      }
    } catch (error) {
      console.log(error);
      resultObj = { errorVal: error, status: 500 };
    }
    return resultObj;
  }

  async assignDevice(asset) {
    let resultObj, AssetsModel;
    resultObj = {};
    AssetsModel = ServiceLocator.resolve("AssetsModel");
 
    let AssetsTreeService = ServiceLocator.resolve("AssetsTreeService");
    try {
     
      let newAsset = new AssetsModel(asset);

      let savedAsset = await newAsset.save();
      if (savedAsset.parentAsset) {
        let parent = await AssetsModel.findById(savedAsset.parentAsset).exec();
        parent.childAsset.push(savedAsset._id);
        parent.markModified("childAsset");
        await this.manageLevels(savedAsset, parent);
        let savedParent = await parent.save();

        if (savedParent.assetType == "track") {
          savedAsset.trackId = savedParent._id;
        } else {
          savedAsset.trackId = savedParent.trackId;
        }

       
        let finalSavedAsset = await savedAsset.save();
        await AssetsTreeService.createHierarchyTree();

        resultObj = { value: finalSavedAsset, status: 200 };
      } else {
        resultObj = { value: savedAsset, status: 200 };
      }
    } catch (error) {
      console.log(error);
      resultObj = { errorVal: error, status: 500 };
    }
    return resultObj;
  }

  async getParentLines(user) {
    let resultObj = {},
      assets;

    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    let assetTreeService = ServiceLocator.resolve("AssetsTreeService");
    let result = await assetTreeService.getPlannableLocations(user);
    let plannableLocations = result.value ? result.value : [];
    // let criteria = { assetType: "line" };
    // if (!user.isAdmin) criteria.subdivision = user.subdivision;

    try {
      //assets = await AssetsModel.find(criteria).exec();
      assets = await AssetsModel.find({ _id: { $in: plannableLocations } });
      resultObj = { value: assets, status: 200 };
    } catch (err) {
      resultObj = { errorVal: err.toString(), status: 500 };
    }

    return resultObj;
  }
  async getParentLinesWithSelf(user, criteria) {
    let resultObj = {},
      assets;

    if (!criteria) {
      criteria = { location: true, plannable: true };
    }

    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    // let assetTreeService = ServiceLocator.resolve("AssetsTreeService");
    // let result = await assetTreeService.getPlannableLocations(user);
    // let plannableLocations = result.value ? result.value : [];
    // let criteria = { assetType: "line" };
    // if (!user.isAdmin) criteria.subdivision = user.subdivision;
    let assetIds = await this.getFilteredAssetsIds(user, criteria, true);

    try {
      //assets = await AssetsModel.find(criteria).exec();
      assets = await AssetsModel.find({ _id: { $in: assetIds.assetIds } });
      resultObj = { value: assets, status: 200 };
    } catch (err) {
      resultObj = { errorVal: err.toString(), status: 500 };
    }

    return resultObj;
  }
  async getChildAssets(
    parentId, // recursive function to get all childern
  ) {
    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    let fullList = [];
    let assets = await AssetsModel.find({ parentAsset: parentId }).exec();
    for (const asset of assets) {
      fullList.push(asset);
      let childern = await this.getChildAssets(asset.id);
      fullList = [...fullList, ...childern];
    }

    return fullList;
  }
  async getAssetsForLine(lineName, user) {
    let resultObj = {},
      assets;
    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    let criteria = { assetType: "line", unitId: lineName };

    if (!user.isAdmin) criteria.subdivision = user.subdivision;

    try {
      let line = await AssetsModel.findOne(criteria).exec();
      let assets = await this.getChildAssets(line.id);

      resultObj = { value: assets, status: 200 };
    } catch (err) {
      resultObj = { errorVal: err.toString(), status: 500 };
    }

    return resultObj;
  }
  async getAssetTypeAssets(assetObj) {
    let resultObj, assetType, line_id, AssetsModel;
    assetType = assetObj.assetType;
    line_id = assetObj.lineId;
    AssetsModel = ServiceLocator.resolve("AssetsModel");
    try {
      let assets = await AssetsModel.find({
        lineId: line_id,
        assetType: assetType,
      }).exec();
      resultObj = { value: assets, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }
    return resultObj;
  }
  async updateAsset(asset) {
    let resultObj, AssetsModel;
    AssetsModel = ServiceLocator.resolve("AssetsModel");
    let assetTreeService = ServiceLocator.resolve("AssetsTreeService");
    let utils = ServiceLocator.resolve("utils");
    try {
      let query = { _id: asset._id };

      if (asset.start) asset.start = utils.toFixed(asset.start);

      if (asset.end) asset.end = utils.toFixed(asset.end);

      if (asset.assetLength) asset.assetLength = utils.toFixed(asset.assetLength);
      await updateLocationMapTemplate(asset);
      let savedAsset = await AssetsModel.findOneAndUpdate(query, asset, {
        upsert: true,
      }).exec();

      await assetTreeService.createHierarchyTree();
      resultObj = { value: asset, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }
    return resultObj;
  }

  async updateSettings(id,asset) {
   
    let resultObj, AssetsModel;
    AssetsModel = ServiceLocator.resolve("AssetsModel");
    let assetTreeService = ServiceLocator.resolve("AssetsTreeService");
    let utils = ServiceLocator.resolve("utils");
    try {
      let query = { _id: id };
      
      if (asset.start) asset.start = utils.toFixed(asset.start);

      if (asset.end) asset.end = utils.toFixed(asset.end);

      if (asset.assetLength) asset.assetLength = utils.toFixed(asset.assetLength);
      await updateLocationMapTemplate(asset);
      asset = {settings:asset};
     
      let savedAsset = await AssetsModel.findOneAndUpdate(query, asset, {
        upsert: true,
      }).exec();

      await assetTreeService.createHierarchyTree();
      resultObj = { value: asset, status: 200 };
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }
    return resultObj;
  }

  async updateMultipleAsset(bodyObj) {
    let resultObj = { errorVal: "No logic found", status: 500 };

    if (bodyObj._id == "multi") {
      let AssetModel = ServiceLocator.resolve("AssetsModel");

      try {
        let result = await AssetModel.updateMany({ _id: { $in: bodyObj.assets } }, { $set: { ...bodyObj.propsToUpdate } });
        resultObj = { value: {}, status: 200 };
      } catch (err) {
        console.log("assets.service.updateMultipleAsset.catch err:", err.toString());
        resultObj = { errorVal: err.toString(), status: 500 };
      }
    }
    return resultObj;
  }
  async getAssetIdsForUnitIds(unitIds) {
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    let result = [];
    try {
      result = await AssetModel.find({ unitId: { $in: unitIds } }, { _id: 1 });
    } catch (err) {
      console.log("assets.service.getAssetIdsForUnitIds.catch err:", err.toString());
    }
    return result.map((r) => {
      return r._id;
    });
  }
  async find(id) {
    let resultObj, AssetsModel;
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    try {
      if (id) {
        let asset = await AssetModel.findById(id).exec();
        resultObj = { value: asset, status: 200 };
      }
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }

  async findDevicesAtLocation(id)
  {
    let resultObj ={value:{}}; 
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    try {
      if (id) {
        let assets = await AssetModel.find().exec();
        let asset = await AssetModel.findById(id).exec();
        let devices = assets.filter(({parentAsset,isRemoved}) => parentAsset == asset._id && isRemoved == false);
        resultObj.value.devicesAtLocation = devices;
       // console.log(resultObj);
      }
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }
  async getFloorAndSensors(id) {
    let resultObj;
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    let data = { floor: {}, sensors: [] };
    try {
      if (id) {
        let asset = await AssetModel.find(
          { $or: [{ _id: id }, { parentAsset: id }] },
          { name: 1, attributes: 1, unitId: 1, assetType: 1 },
        ).exec();
        for (let item of asset) {
          if (item.id === id) {
            data.floor = item;
          } else {
            data.sensors.push(item);
          }
        }
        resultObj = { value: data, status: 200 };
      }
    } catch (error) {
      resultObj = { errorVal: error.toString(), status: 500 };
    }

    return resultObj;
  }
  async deleteAsset(id) {
    let AssetModel = ServiceLocator.resolve("AssetsModel");
    let assetsTreeService = ServiceLocator.resolve("AssetsTreeService");
    let wPlanTemplate = ServiceLocator.resolve("WorkPlanTemplateModel");
    let result = { errorVal: "default", status: 200 };
    try {
      if (id) {
        let assetsToDelete = await AssetModel.findById(id).exec();

        if (assetsToDelete) {
          // console.log('deleting',assetsToDelete.length, 'assets'); // todo log user and assets being deleted
          let assetArray = await assetsTreeService.getArrayByNode(id);

          let criteria = { _id: { $in: [...assetArray] } };
          let assetList = await AssetModel.find(criteria).exec();

          let assetListAry = [...assetList];
          let templates = await wPlanTemplate.find({ inspectionAssets: { $in: assetArray } }).exec();
          //[...templates];
          for (let i = 0, l = templates.length; i < l; i++) {
            console.log(templates[i]._id.toString());
            let template = templates[i];
            if (template.tasks) {
              for (let t = 0, tl = template.tasks.length; t < tl; t++) {
                let units = template.tasks[t].units || [];
                template.tasks[t].units = units.filter((item) => !assetArray.includes(item.id));
              }
            }
            //template.save();
            console.log(template);
            template.inspectionAssets = template.inspectionAssets.filter((item) => !assetArray.includes(item));
            await template.save();
          }
          for (let i1 = 0, l1 = assetList.length; i1 < l1; i1++) {
            assetList[i1].isRemoved = true;
            await assetList[i1].save();
          }
          /*           Promise.all(
            templates.map(item => {
              console.log(item._id);
            }),
          );
 */
          assetsTreeService.createHierarchyTree();
          console.log(`Deleting [${assetArray}]`); // console.log('delete result', result.value); // todo: log
          /*           result.value = await AssetModel.remove({
            _id: {
              $in: assetsToDelete.map(a => {
                return a._id;
              }),
            },
          });
 */ result.status = 200;
        } else {
          result.status = 404;
          result.errorVal = "Asset not found";
        }
      } else {
        result.status = 404;
        result.errorVal = "Missing id parameter";
      }
    } catch (err) {
      console.log("asset.service.deleteAsset.catch err:", err.toString());
      result.status = 500;
      result.errorVal = "Internal Server Error: " + err.toString(); // todo log the error string and send back only 'Internal Server Error'
    }

    return result;
  }
  async multiLineAssets(lines) {
    let resultObj = {},
      assets,
      AssetsModel;

    try {
      AssetsModel = ServiceLocator.resolve("AssetsModel");
      let criteria = { lineId: { $in: lines } };
      assets = await AssetsModel.find(criteria);
      resultObj = { value: assets, status: 200 };
    } catch (err) {
      resultObj = { errorVal: err.toString(), status: 500 };
      console.log("assets.service.multiLineAssets.catch", err.toString());
    }

    return resultObj;
  }
  async getTimezone(assetId) {
    let assetsModel = ServiceLocator.resolve("AssetsModel");
    let asset = await assetsModel.findOne({ _id: assetId, isRemoved: false }, { attributes: true });
    if (asset && asset.attributes && asset.attributes.timezone) {
      return asset.attributes.timezone;
    }

    return null;
  }
  // The intention of the following function was to manually clean a geojson already in database, nevertheless this can in future be operated through frontend after modifications.
  async cleanCoords(assetId) {
    let assetsModel = ServiceLocator.resolve("AssetsModel");
    let asset = await assetsModel.findOne({ _id: assetId, isRemoved: false }, { unitId: true, attributes: true });
    if (asset && asset.attributes && asset.attributes.geoJsonCord) {
      let geojson = JSON.parse(asset.attributes.geoJsonCord);
      let lineString = turf.lineString(geojson.features[0].geometry.coordinates, { name: "l1" });
      let length = turf.length(lineString, { units: "kilometers" });

      console.log(`Asset :${asset.unitId}`);
      console.log(`Size  :${asset.attributes.geoJsonCord.length}`);
      console.log(`Length:${length} kilometers`);
      let str = JSON.stringify(lineString);
      console.log("Size:", str.length);
      //      console.log('Compare:', asset.attributes.geoJsonCord, str);
      console.log("cleaning...");

      let ls1 = turf.cleanCoords(lineString);
      let str1 = JSON.stringify(ls1);
      console.log("Size:", str1.length);
      // let fs=require('fs');
      // fs.writeFileSync('output.json', str1);

      //console.log('Compare:', asset.attributes.geoJsonCord, str);
    } else {
      console.log("this was retured " + asset);
    }
  }
  async manageLevels(asset, parentAsset) {
    if (templateSettings.templateName == "railRoad") {
      let AssetTypesModel = ServiceLocator.resolve("AssetTypesModel");
      let parentAType = await AssetTypesModel.findOne({ assetType: parentAsset.assetType }).exec();
      let assetType = await AssetTypesModel.findOne({ assetType: asset.assetType }).exec();
      if (parentAType && parentAType.location) {
        !asset.levels && (asset.levels = { 1: null, 2: null, 3: null, currentLevel: null });
        // the else statement tells that we are dealing with the first level location asset.

        let firstLevelAsset = !parentAType.parentAssetType;
        let level2Exist = parentAsset.levels["2"];
        let level3Exist = parentAsset.levels["3"];

        if (firstLevelAsset) {
          asset.levels.currentLevel = "1";
          asset.levels["1"] = asset._id;
        } else {
          asset.levels["1"] = parentAsset.levels["1"];
          asset.levels.currentLevel = "1";
          if (level2Exist) {
            asset.levels["2"] = parentAsset.levels["2"];
            asset.levels.currentLevel = "2";
          }
          if (level2Exist && level3Exist) {
            asset.levels["3"] = parentAsset.levels["3"];
            asset.levels.currentLevel = "3";
          }
          if (level2Exist && !level3Exist && assetType.location) {
            asset.levels["3"] = asset._id;
            asset.levels.currentLevel = "3";
          }
          if (!level2Exist && assetType.location) {
            asset.levels["2"] = asset._id;
            asset.levels.currentLevel = "2";
          }
        }
      } else {
        asset.levels = parentAsset.levels;
      }
    }
    //  console.log(asset);
    asset.markModified("levels");
    return asset;
  }
  async getUnAssignedAssets() {
    let AssetTypesModel = ServiceLocator.resolve("AssetTypesModel");
    let AssetsModel = ServiceLocator.resolve("AssetsModel");
    let resultObj = null;
    try {
      let assetTypes = await AssetTypesModel.find().exec();
      let assets = await AssetsModel.find().exec();
      let unAssignedAssets = [];
      for (let asset of assets) {
        let aType = _.find(assetTypes, { assetType: asset.assetType });
        if (aType && !aType.location) {
          let parentAsset = _.find(assets, { id: asset.parentAsset });
          let parentAType = _.find(assetTypes, { assetType: parentAsset ? parentAsset.assetType : "" });
          if (parentAType && parentAType.location && !parentAType.plannable) {
            unAssignedAssets.push(asset);
          }
        }
      }
      resultObj = { status: 200, value: unAssignedAssets };
    } catch (err) {
      resultObj = { errorVal: err.toString(), status: 500 };
      console.log("assets.service.getUnAssignedAssets.catch", err.toString());
    }
    return resultObj;
  }
}

async function convertTreeToFlatArrayKeys(tree, criteria) {
  let arrayOfKeys = [];
  await recursivelyConvertTree(tree, arrayOfKeys, criteria);
  return arrayOfKeys;
}

async function recursivelyConvertTree(treeObj, arrayOfKeys, criteria) {
  let keys = Object.keys(treeObj);
  for (let key of keys) {
    if (key != "properties") {
      let isCriteriaMeet = true;
      if (criteria) {
        Object.keys(criteria).forEach((criteriaKey) => {
          isCriteriaMeet = treeObj[key].properties[criteriaKey] === criteria[criteriaKey] && isCriteriaMeet;
        });
      }

      if (isCriteriaMeet) {
        arrayOfKeys.push(ObjectId(key));
      }

      await recursivelyConvertTree(treeObj[key], arrayOfKeys, criteria);
    }
  }
}

async function updateLocationMapTemplate(location) {
  let AssetsModel = ServiceLocator.resolve("AssetsModel");
  if (location.assetType == "Floor") {
    try {
      let eLoc = await AssetsModel.findOne({ _id: location._id }).exec();
      let newMap = location.attributes.FloorMap ? JSON.parse(location.attributes.FloorMap.toString()) : null;
      if (eLoc) {
        // TODO : parse FloorMap and create assets as first time
        let eLocMap = eLoc.attributes.FloorMap ? JSON.parse(eLoc.attributes.FloorMap.toString()) : null;
        if (newMap) {
          // eLocMapAssetCount = eLocMap.instances.length;
          let assetsToAdd = [];
          let assetsToUpdate = [];
          let assetsToDelete = [];
          newMap.instances.forEach((instance) => {
            let exist = eLocMap && _.find(eLocMap.instances, { id: instance.id });
            let type = instance.typeName;
            let asset = {
              unitId: "N/A",
              description: "Sensor",
              name: "N/A",
              start: 0,
              end: 0,
              parentAsset: location._id,
              assetType: "Sensor",
              attributes: {
                sensorId: instance.sensorId,
                sensorName: instance.sensorName,
                deviceType: instance.deviceType,
                id: instance.id,
                deviceNum: instance.deviceNum,
                defrostCycles: instance.defrostCycles,
              },
            };

            if (!exist && type == "Path") {
              assetsToAdd.push(_.cloneDeep(asset));
            } else if (exist && type == "Path") {
              assetsToUpdate.push(_.cloneDeep(asset));
            }
          });
          assetsToDelete = eLocMap ? _.differenceBy(eLocMap.instances, newMap.instances, "id") : [];
          let aIds = [];
          for (let aToD of assetsToDelete) {
            aIds.push(aToD.id);
          }
          for (let i = 0; i < assetsToUpdate.length; i++) {
            let defrost = assetsToUpdate[i].attributes.defrostCycles;
            await AssetsModel.updateOne(
              { "attributes.id": assetsToUpdate[i].attributes.id },
              {
                $set: {
                  "attributes.sensorId": assetsToUpdate[i].attributes.sensorId,
                  "attributes.sensorName": assetsToUpdate[i].attributes.sensorName,
                  "attributes.deviceType": assetsToUpdate[i].attributes.deviceType,
                  "attributes.deviceNum": assetsToUpdate[i].attributes.deviceNum,
                  "attributes.defrostCycles": defrost,
                },
              },
            );
          }
          await AssetsModel.insertMany(assetsToAdd);
          await AssetsModel.updateMany({ "attributes.id": { $in: aIds } }, { $set: { isRemoved: true } });
        }
      }
    } catch (err) {
      console.log("updateLocationMapTemplate : ", err);
    }
  } else if (location.assetType == "Sensor") {
    try {
      let foundData = await AssetsModel.findOne({ _id: location.locationId }).exec();
      let FloorMap = JSON.parse(foundData.attributes.FloorMap);
      for (let item of FloorMap.instances) {
        if (item.typeName === "Path") {
          if (item.id === location.attributes.id) {
            item.sensorId = location.attributes.sensorId;
            break;
          }
        }
      }
      foundData.attributes.FloorMap = JSON.stringify(FloorMap);
      foundData.markModified("attributes");
      await foundData.save();
      console.log(FloorMap);
    } catch (error) {
      console.log(error);
    }
  }
}
export default AssetsService;

let demoMap = {
  stageDimensions: { height: 800, width: 1000 },
  itemTypes: [
    {
      name: "Produce",
      data:
        "M27.05,2.491l-0.514,0.082l-0.467,0.082 c-0.571,0.22-1.025,0.64-1.262,1.17c-0.013,0.13-0.013,0.26,0,0.39c-0.013,0.13-0.013,0.26,0,0.39v0.261\t\tc0.123,1.153,0.489,2.272,1.075,3.294c0.094,0.347,0.654,1.04,0.654,1.04c0.735,10.893,8.107,20.442,18.987,24.596\t\tc0.054,0.025,0.108,0.05,0.163,0.076c0.936,0.381,1.893,0.718,2.865,1.01c0.972,0.292,1.959,0.537,2.958,0.736\t\tc0.998,0.199,2.007,0.351,3.021,0.455c0.417,0.043,0.836,0.077,1.255,0.104c0.43,0.182,0.852,0.379,1.266,0.592l0.794,0.39\t\tc-1.48,2.582-2.625,5.318-3.411,8.149c-0.523-0.358-1.064-0.69-1.623-0.997c-0.172-0.087-0.345-0.172-0.519-0.254\t\tc-2.63-1.46-5.595-2.324-8.652-2.521c-19.065,0-33.271,6.112-40,17.339c-7.71,12.614-5.046,30.343,7.43,49.503\t\tc2.97,4.592,5.873,8.39,8.684,11.524c0.577,0.673,1.15,1.319,1.719,1.936c0.77,0.835,1.533,1.62,2.288,2.357\t\tc0.755,0.737,1.502,1.425,2.241,2.068s1.469,1.241,2.191,1.796c0.721,0.555,1.434,1.067,2.137,1.54\t\tc0.703,0.472,1.397,0.905,2.08,1.299c0.683,0.395,1.356,0.752,2.019,1.074c0.663,0.322,1.314,0.61,1.955,0.866\t\tc0.641,0.255,1.27,0.479,1.888,0.673c0.618,0.194,1.224,0.358,1.817,0.496c0.594,0.137,1.175,0.248,1.743,0.334\t\tc0.568,0.086,1.124,0.148,1.666,0.189c0.542,0.041,1.071,0.059,1.586,0.059c0.642,0.038,1.286,0.045,1.93,0.023\t\tc0.163-0.006,0.326-0.013,0.49-0.023c0.587-0.067,1.169-0.161,1.746-0.282c0.577-0.121,1.147-0.269,1.708-0.444\t\tc0.561-0.175,1.112-0.375,1.652-0.602c0.54-0.226,1.067-0.478,1.58-0.753c0.513-0.276,1.011-0.575,1.492-0.898\t\tc0.145-0.097,0.288-0.196,0.43-0.298c0.463,0.333,0.944,0.644,1.44,0.931c0.496,0.288,1.007,0.552,1.532,0.792\t\tc0.524,0.24,1.061,0.455,1.608,0.644c0.547,0.189,1.104,0.353,1.669,0.49c0.565,0.137,1.136,0.248,1.713,0.331\t\tc0.106,0.015,0.213,0.03,0.32,0.044c0.795,0.077,1.593,0.116,2.392,0.118c0.799,0.002,1.597-0.034,2.392-0.107\t\tc0.795-0.073,1.586-0.183,2.369-0.33c0.783-0.147,1.558-0.331,2.322-0.551c0.764-0.22,1.515-0.475,2.252-0.765\t\tc0.737-0.29,1.457-0.615,2.159-0.973c0.702-0.358,1.384-0.748,2.045-1.17c0.569-0.363,1.121-0.75,1.654-1.158\t\tc-0.013-0.054-0.023-0.108-0.031-0.163c-0.006-0.048-0.01-0.096-0.011-0.144c0.216,0.077,0.447,0.114,0.679,0.109l0,0\t\tc0.988-0.024,1.776-0.774,1.776-1.691v-1.777c-0.853,0.696-1.68,1.345-2.501,1.931l-0.376-4.195l-0.427,0.233l-0.107-1.177\t\tl-5.374,2.904c-0.66,0.27-1.429,0.153-1.963-0.297c-0.01-0.048-0.017-0.097-0.022-0.146c-0.005-0.057-0.007-0.113-0.006-0.17\t\tc0.001-0.057,0.004-0.114,0.011-0.17c0.007-0.056,0.017-0.113,0.029-0.168c0.013-0.056,0.029-0.11,0.047-0.164\t\tc0.019-0.054,0.04-0.107,0.064-0.159c0.024-0.052,0.051-0.103,0.081-0.152c0.03-0.049,0.062-0.098,0.097-0.144\t\tc0.035-0.046,0.072-0.091,0.112-0.134c0.04-0.043,0.081-0.084,0.125-0.123c0.044-0.039,0.09-0.076,0.138-0.111\t\tc0.01-0.007,0.02-0.013,0.029-0.02l5.35-2.926l-1.109-0.615l0.568-0.307l-4.673-2.558c-0.044-0.031-0.087-0.063-0.128-0.098\t\tc-0.012-0.048-0.021-0.095-0.028-0.144c-0.008-0.056-0.013-0.113-0.015-0.17c-0.002-0.057-0.001-0.114,0.003-0.17\t\tc0.004-0.057,0.011-0.113,0.022-0.169c0.01-0.056,0.023-0.111,0.039-0.166c0.016-0.055,0.035-0.109,0.057-0.162\t\tc0.022-0.053,0.046-0.105,0.073-0.156c0.027-0.051,0.057-0.1,0.09-0.148c0.032-0.048,0.067-0.094,0.105-0.139\t\tc0.037-0.045,0.077-0.088,0.119-0.128c0.042-0.041,0.086-0.08,0.132-0.117c0.046-0.037,0.094-0.071,0.144-0.103\t\tc0.05-0.032,0.101-0.062,0.154-0.09c0.053-0.027,0.107-0.052,0.163-0.075c0.056-0.022,0.112-0.042,0.17-0.059\t\tc0.058-0.017,0.116-0.031,0.175-0.043c0.059-0.011,0.119-0.02,0.179-0.026c0.06-0.006,0.121-0.008,0.181-0.008\t\tc0.06,0,0.121,0.003,0.181,0.008c0.06,0.006,0.12,0.014,0.18,0.026c0.059,0.011,0.118,0.025,0.176,0.042\t\tc0.058,0.017,0.115,0.036,0.171,0.058c0.011,0.005,0.023,0.009,0.034,0.014l6.42,3.538l9.676-5.241l-1.052-0.562l0.57-0.305\t\tl-9.86-5.202l-6.449,3.511c-0.687,0.471-1.634,0.436-2.278-0.084c-0.008-0.026-0.015-0.052-0.022-0.079\t\tc-0.012-0.056-0.022-0.112-0.028-0.168c-0.007-0.056-0.01-0.113-0.011-0.17c0-0.057,0.002-0.114,0.008-0.17\t\tc0.006-0.056,0.014-0.113,0.026-0.168c0.011-0.056,0.026-0.111,0.043-0.166c0.017-0.054,0.038-0.108,0.061-0.16\t\tc0.023-0.053,0.049-0.104,0.077-0.154c0.029-0.05,0.06-0.099,0.094-0.146c0.034-0.047,0.07-0.093,0.109-0.137\t\tc0.039-0.044,0.079-0.085,0.122-0.125c0.043-0.04,0.088-0.078,0.135-0.114c0.047-0.036,0.096-0.069,0.147-0.1\t\tc0.051-0.031,0.103-0.06,0.156-0.086c0.034-0.016,0.068-0.032,0.103-0.046l4.652-2.577l-1.013-0.554l0.471-0.258l-5.374-2.904\t\tc-0.027-0.02-0.054-0.04-0.081-0.062c-0.015-0.041-0.027-0.082-0.038-0.124c-0.014-0.055-0.025-0.111-0.033-0.168\t\tc-0.008-0.056-0.013-0.113-0.015-0.17c-0.002-0.057-0.001-0.114,0.003-0.17c0.004-0.057,0.011-0.113,0.021-0.169\t\tc0.01-0.056,0.023-0.111,0.039-0.166c0.016-0.055,0.035-0.109,0.056-0.162c0.022-0.053,0.046-0.105,0.074-0.156\t\tc0.027-0.051,0.057-0.1,0.09-0.148c0.032-0.048,0.067-0.094,0.105-0.139c0.037-0.045,0.077-0.087,0.119-0.128\t\tc0.042-0.041,0.086-0.08,0.132-0.117c0.046-0.037,0.094-0.071,0.144-0.103c0.05-0.032,0.101-0.062,0.154-0.09\t\tc0.053-0.027,0.107-0.052,0.163-0.075c0.056-0.022,0.112-0.042,0.17-0.059c0.058-0.017,0.116-0.031,0.176-0.043\t\tc0.059-0.011,0.119-0.02,0.179-0.026c0.06-0.006,0.121-0.008,0.181-0.008c0.06,0,0.121,0.003,0.181,0.008\t\tc0.06,0.006,0.12,0.014,0.179,0.026c0.059,0.011,0.118,0.025,0.176,0.042c0.058,0.017,0.115,0.036,0.171,0.058\t\tc0.011,0.005,0.023,0.009,0.034,0.014l5.35,2.926v-5.067c0-0.057,0.003-0.114,0.009-0.17c0.006-0.057,0.015-0.113,0.027-0.168\t\tc0.012-0.056,0.027-0.111,0.045-0.165c0.018-0.054,0.039-0.108,0.062-0.16c0.024-0.052,0.05-0.104,0.079-0.154\t\tc0.029-0.05,0.061-0.098,0.095-0.145c0.034-0.047,0.071-0.092,0.11-0.135c0.039-0.043,0.08-0.085,0.124-0.124\t\tc0.043-0.04,0.089-0.077,0.136-0.113c0.047-0.035,0.097-0.068,0.148-0.099c0.051-0.031,0.103-0.059,0.157-0.085\t\tc0.054-0.026,0.109-0.049,0.165-0.069c0.056-0.021,0.114-0.038,0.172-0.054c0.058-0.015,0.117-0.028,0.177-0.037\t\tc0.06-0.009,0.12-0.016,0.18-0.02c0.027-0.002,0.055-0.002,0.082-0.003c0.06,0.001,0.121,0.005,0.181,0.011\t\tc0.06,0.007,0.12,0.017,0.179,0.03c0.059,0.013,0.117,0.028,0.175,0.046c0.057,0.018,0.114,0.039,0.169,0.063c0.055,0.023,0.109,0.049,0.161,0.078c0.052,0.028,0.103,0.059,0.152,0.093c0.049,0.033,0.096,0.069,0.141,0.106c0.06,0.169,0.091,0.346,0.092,0.524v6.979l0.519,0.278v0.527l9.677,5.241v-10.483l-0.476-0.265v-0.499l-6.308-3.468\t\tc-0.092-0.054-0.178-0.116-0.258-0.184c0,0,0,0,0-0.001c-0.019-0.054-0.034-0.109-0.047-0.164\t\tc-0.013-0.056-0.022-0.112-0.029-0.168c-0.007-0.056-0.011-0.113-0.011-0.17c-0.001-0.057,0.002-0.114,0.007-0.17\t\tc0.006-0.057,0.014-0.113,0.026-0.169c0.011-0.056,0.026-0.111,0.043-0.165c0.017-0.054,0.037-0.108,0.06-0.161\t\tc0.023-0.053,0.049-0.104,0.077-0.154c0.028-0.05,0.06-0.099,0.093-0.146c0.034-0.047,0.07-0.093,0.108-0.137\t\tc0.039-0.044,0.079-0.086,0.122-0.126c0.043-0.04,0.088-0.078,0.135-0.114c0.047-0.036,0.096-0.069,0.147-0.101\t\tc0.051-0.031,0.103-0.06,0.156-0.086c0.054-0.026,0.109-0.05,0.165-0.071c0.056-0.021,0.113-0.04,0.172-0.055\t\tc0.058-0.016,0.117-0.029,0.176-0.039c0.059-0.01,0.119-0.018,0.18-0.023c0.06-0.005,0.121-0.007,0.181-0.006\t\tc0.061,0.001,0.121,0.005,0.181,0.011c0.06,0.007,0.12,0.016,0.179,0.029c0.059,0.012,0.117,0.028,0.175,0.046\t\tc0.057,0.018,0.114,0.038,0.169,0.062c0.022,0.009,0.044,0.019,0.065,0.029l4.652,2.489v-5.766c0-0.057,0.003-0.114,0.009-0.17\t\tc0.006-0.057,0.015-0.113,0.027-0.168c0.012-0.056,0.027-0.111,0.045-0.165c0.018-0.054,0.039-0.108,0.062-0.16\t\tc0.024-0.052,0.05-0.103,0.079-0.153c0.029-0.05,0.061-0.098,0.095-0.145c0.034-0.047,0.071-0.092,0.11-0.135\t\tc0.039-0.043,0.08-0.085,0.124-0.125c0.044-0.039,0.089-0.077,0.137-0.112c0.047-0.035,0.097-0.068,0.148-0.099\t\tc0.051-0.031,0.104-0.059,0.157-0.084c0.054-0.026,0.109-0.049,0.165-0.069c0.056-0.02,0.114-0.038,0.172-0.053\t\tc0.058-0.015,0.117-0.028,0.177-0.037c0.06-0.009,0.12-0.016,0.18-0.02c0.06-0.004,0.121-0.005,0.181-0.003\t\tc0.06,0.002,0.121,0.007,0.181,0.014c0.06,0.007,0.119,0.018,0.178,0.031c0.059,0.013,0.117,0.029,0.175,0.047\t\tc0.057,0.019,0.113,0.04,0.168,0.063c0.055,0.024,0.109,0.05,0.161,0.079c0.052,0.029,0.103,0.06,0.152,0.094\t\tc0.049,0.034,0.096,0.069,0.141,0.107c0.017,0.015,0.033,0.03,0.049,0.046c0.061,0.17,0.093,0.348,0.094,0.528v5.765l0.459-0.243\t\tv0.977l4.652-2.489c0.054-0.025,0.11-0.048,0.166-0.068c0.057-0.02,0.115-0.037,0.173-0.052c0.058-0.014,0.118-0.026,0.177-0.035\t\tc0.06-0.008,0.12-0.014,0.18-0.017c0.06-0.003,0.121-0.004,0.181-0.001c0.06,0.002,0.121,0.007,0.181,0.014\t\tc0.06,0.008,0.119,0.019,0.178,0.032c0.059,0.014,0.117,0.03,0.174,0.049c0.057,0.019,0.113,0.041,0.168,0.065\t\tc0.055,0.024,0.108,0.051,0.16,0.081c0.052,0.029,0.102,0.061,0.151,0.095c0.048,0.034,0.095,0.07,0.14,0.109\t\tc0.034,0.03,0.067,0.062,0.099,0.094c0.205,0.715-0.115,1.471-0.79,1.865l-6.496,3.425v10.403l0.459-0.252v0.648\t\tc-1.346,1.99-2.665,3.859-3.824,5.542v10.1l-6.495,3.424c-0.903,0.413-1.274,1.426-0.829,2.264c0.445,0.838,1.537,1.182,2.44,0.769\t\tc0.057-0.026,0.112-0.054,0.165-0.086l4.673-2.471v5.765c0.01,0.934,0.835,1.683,1.841,1.673c0.992-0.01,1.793-0.753,1.803-1.673\t\tv-5.635l4.673,2.471c0.903,0.413,1.995,0.068,2.44-0.769c0.413-0.777,0.126-1.717-0.665-2.178l-6.496-3.425v-10.403l9.72,5.202\t\tv6.936c0,0.917,0.788,1.667,1.776,1.69c0.989,0,1.797-0.731,1.823-1.647v-4.985l5.374,2.904c0.92,0.378,1.997-0.008,2.404-0.862\t\tc0.345-0.723,0.103-1.571-0.581-2.042l-0.094-0.043l-5.374-2.904l4.673-2.557c0.809-0.555,0.979-1.614,0.381-2.365\t\tc-0.508-0.636-1.423-0.861-2.203-0.54l-6.448,3.511l-9.72-5.202l9.72-5.202l6.448,3.511c0.92,0.378,1.997-0.007,2.405-0.861\t\tc0.346-0.724,0.104-1.573-0.582-2.044l-4.673-2.558l5.374-2.904c0.809-0.556,0.978-1.615,0.379-2.365\t\tc-0.508-0.635-1.422-0.859-2.201-0.539l-5.373,2.904v-4.985c0.002-0.934-0.813-1.692-1.82-1.693\t\tc-1.007-0.001-1.824,0.754-1.825,1.688c0,0.002,0,0.003,0,0.005v6.979l-6.867,3.519c0.525-0.835,1.032-1.667,1.519-2.495\t\tc0.707-1.202,1.376-2.396,2.005-3.583c0.629-1.187,1.219-2.367,1.77-3.537c0.551-1.171,1.062-2.333,1.535-3.485\t\tc0.472-1.153,0.905-2.296,1.299-3.429c0.394-1.133,0.748-2.256,1.063-3.368c0.315-1.112,0.59-2.213,0.826-3.302\t\tc0.236-1.089,0.432-2.167,0.588-3.231c0.156-1.065,0.273-2.117,0.349-3.155c0.077-1.039,0.114-2.064,0.111-3.075\t\tc-0.003-1.011-0.046-2.008-0.128-2.989c-0.083-0.982-0.206-1.948-0.369-2.899c-0.163-0.951-0.366-1.886-0.609-2.804\t\tc-0.243-0.918-0.527-1.82-0.851-2.704c-0.324-0.884-0.688-1.751-1.093-2.599c-0.405-0.848-0.85-1.678-1.335-2.489\t\tc-0.41-0.683-0.846-1.346-1.308-1.989c-0.462-0.644-0.95-1.268-1.463-1.872c-0.513-0.604-1.051-1.189-1.614-1.754\t\tc-0.429-0.43-0.872-0.849-1.33-1.256c-7.375-6.739-18.556-10.356-32.414-10.356c-3.018,0.028-5.997,0.636-8.748,1.786\t\tc0.311-0.775,0.654-1.539,1.026-2.291c0.51-0.996,1.073-1.968,1.687-2.911c0.614-0.943,1.277-1.857,1.988-2.738\t\tc0.711-0.881,1.468-1.728,2.269-2.538c0.801-0.81,1.645-1.582,2.528-2.313c0.883-0.731,1.805-1.42,2.761-2.064\t\tc0.956-0.644,1.946-1.244,2.966-1.795c1.02-0.552,2.069-1.055,3.143-1.509c1.074-0.453,2.171-0.856,3.288-1.206\t\tc1.117-0.35,2.251-0.648,3.399-0.892c1.148-0.244,2.309-0.434,3.477-0.569c1.169-0.135,2.343-0.215,3.521-0.24\t\tc0.274-0.006,0.548-0.009,0.822-0.009c0.078,0,0.155-0.004,0.232-0.011c0.077-0.007,0.154-0.018,0.23-0.033\t\tc0.076-0.014,0.151-0.032,0.225-0.054c0.074-0.021,0.147-0.046,0.218-0.075c0.071-0.028,0.141-0.06,0.209-0.095\t\tc0.068-0.035,0.134-0.073,0.198-0.114c0.064-0.041,0.126-0.085,0.185-0.132c0.059-0.047,0.116-0.096,0.17-0.149\t\tc0.054-0.052,0.105-0.107,0.154-0.164c0.048-0.057,0.093-0.116,0.135-0.178c0.042-0.061,0.08-0.125,0.115-0.19\t\tc0.035-0.065,0.067-0.131,0.095-0.199c0.028-0.068,0.053-0.137,0.073-0.207c0.021-0.07,0.038-0.141,0.051-0.213\t\tc0.013-0.072,0.023-0.144,0.028-0.217c0.005-0.073,0.007-0.146,0.005-0.218c-0.002-0.073-0.008-0.145-0.018-0.217\t\tc-0.01-0.072-0.024-0.144-0.041-0.215c-0.017-0.071-0.039-0.141-0.063-0.21c-0.025-0.069-0.054-0.136-0.086-0.203\t\tc-0.032-0.066-0.068-0.131-0.107-0.194c-0.039-0.063-0.082-0.124-0.127-0.183c-0.046-0.059-0.094-0.115-0.146-0.17\t\tc-0.052-0.054-0.106-0.106-0.163-0.155c-0.057-0.049-0.117-0.096-0.179-0.139c-0.062-0.044-0.127-0.084-0.193-0.122\t\tc-0.066-0.038-0.135-0.072-0.205-0.103c-0.07-0.031-0.142-0.059-0.215-0.083c-0.073-0.024-0.147-0.045-0.222-0.063\t\tc-0.04-0.008-0.079-0.016-0.119-0.022c-0.29-0.118-0.602-0.179-0.919-0.181c-12.096,0.009-23.539,5.089-31.135,13.822l-0.251-0.621\t\tc-0.061-0.96-0.173-1.917-0.336-2.866c-0.163-0.947-0.376-1.886-0.639-2.814c-0.263-0.928-0.575-1.842-0.935-2.74\t\tc-0.36-0.898-0.768-1.779-1.222-2.639c-0.454-0.86-0.953-1.698-1.496-2.511c-0.543-0.813-1.129-1.6-1.756-2.358\t\tc-0.627-0.758-1.293-1.486-1.997-2.182c-0.704-0.696-1.445-1.358-2.22-1.984c-0.775-0.626-1.582-1.215-2.419-1.766\t\tc-0.837-0.55-1.703-1.061-2.595-1.53c-0.892-0.469-1.808-0.896-2.745-1.279c-0.937-0.383-1.894-0.722-2.867-1.016\t\tc-0.973-0.293-1.961-0.541-2.961-0.742c-0.999-0.201-2.009-0.354-3.025-0.461c-0.449-0.047-0.899-0.085-1.35-0.113\t\tc-0.441-0.141-0.873-0.303-1.297-0.485c-0.096-0.041-0.191-0.083-0.286-0.126c-0.285-0.141-0.578-0.269-0.877-0.383\t\tc-0.299-0.114-0.604-0.213-0.914-0.298c-0.31-0.085-0.624-0.156-0.941-0.211c-0.282-0.049-0.565-0.087-0.851-0.113l-0.001,0\t\tl-0.271,0.044C27.385,2.531,27.218,2.509,27.05,2.491z M34.474,8.104c11.623,1.858,20.719,9.914,22.817,20.207L34.474,8.104z\t\t M30.874,11.293L53.691,31.5C42.069,29.642,32.972,21.586,30.874,11.293z M39.452,50.908L39.452,50.908\t\tc0.078,0.001,0.155,0.005,0.233,0.012c0.077,0.008,0.154,0.019,0.23,0.034c0.076,0.015,0.151,0.033,0.225,0.055\t\tc0.042,0.013,0.083,0.028,0.124,0.043c0.972,0.787,1.073,2.156,0.225,3.058c-0.443,0.471-1.083,0.742-1.756,0.743\t\tc-12.904,0-23.364,9.703-23.364,21.673c-0.003,1.197-1.052,2.165-2.343,2.162c-0.33-0.001-0.655-0.066-0.956-0.192\t\tc-0.024-0.026-0.047-0.052-0.07-0.079c-0.046-0.058-0.089-0.119-0.129-0.181c-0.04-0.062-0.077-0.127-0.11-0.193\t\tc-0.033-0.066-0.062-0.133-0.088-0.202c-0.026-0.069-0.048-0.138-0.067-0.209c-0.018-0.071-0.033-0.142-0.044-0.215\t\tc-0.011-0.072-0.018-0.145-0.021-0.217c-0.001-0.028-0.002-0.056-0.002-0.084c0.008-0.881,0.062-1.761,0.164-2.637\t\tc0.101-0.876,0.249-1.747,0.443-2.609c0.194-0.862,0.434-1.714,0.718-2.554c0.285-0.84,0.614-1.665,0.987-2.474\t\tc0.372-0.809,0.788-1.599,1.244-2.369c0.457-0.77,0.954-1.518,1.49-2.241c0.536-0.723,1.111-1.42,1.721-2.09\t\tc0.61-0.669,1.256-1.309,1.935-1.918c0.678-0.609,1.389-1.185,2.129-1.727c0.74-0.542,1.508-1.049,2.302-1.519\t\tc0.794-0.47,1.612-0.902,2.452-1.296c0.84-0.393,1.7-0.747,2.577-1.059c0.877-0.313,1.771-0.584,2.677-0.812\t\tc0.906-0.229,1.824-0.415,2.75-0.557c0.926-0.143,1.859-0.242,2.795-0.297C38.433,50.929,38.942,50.912,39.452,50.908\t\tL39.452,50.908z M48.924,57.655c0.902,0.007,1.733,0.436,2.184,1.129c2.103,3.249,6.782,4.372,10.45,2.51\t\tc1.18-0.599,2.158-1.465,2.834-2.51c0.431-0.665,1.215-1.09,2.08-1.129c1.403-0.062,2.598,0.895,2.667,2.138\t\tc0.024,0.432-0.092,0.861-0.336,1.236c-3.54,5.406-11.359,7.248-17.463,4.113c-1.926-0.989-3.527-2.407-4.644-4.113\t\tc-0.699-1.079-0.278-2.456,0.941-3.075C48.028,57.754,48.472,57.651,48.924,57.655z M94.246,115.583l-9.673,5.202v5.158\t\tc3.603-3.021,6.846-6.393,9.673-10.057V115.583z",
      typeName: "Path",
      width: 120,
      height: 135,
    },
    {
      name: "Fridge1",
      data:
        "m 12.331909,62.693651 c 1.28925,1.055233 3.03915,1.505849 4.67138,1.08942 1.63224,-0.416429 5.32628,-2.595843 4.38769,-4.944807 -1.58199,-3.96018 -7.15464,-5.813302 -9.16143,-8.168884 -1.70878,-1.678304 -2.8530383,-4.203396 -3.2496183,-6.175861 -4.8e-4,-0.0031 -0.004,-0.0042 -0.006,-0.0052 -0.93579,0.606888 -6.51896,-0.887506 -6.51752,-0.891905 3.0674,-10.398338 10.3669783,-21.230598 15.7630883,-27.397279 -0.0435,-0.568573 0.41236,-1.046644 0.95724,-0.998021 0.37313,-0.263816 0.88595,-0.02741 0.96105,0.444853 0.17223,0.157428 0.26216,0.410655 0.27078,0.625378 v 0 c 0.38221,9.290706 5.20619,13.941838 10.34638,20.885555 3.59837,4.938491 6.847524,11.607393 5.78599,17.928143 -1.18543,12.120528 -14.00743,17.38358 -24.49733,13.411789 C 0.56444075,63.958105 -0.59897925,53.982772 2.4564307,43.59779 c 9.5e-4,-0.0042 5.14975,0.77648 5.09857,0.739031 0,0 1.44757,0.0147 1.41888,0.151633 -0.79795,2.233874 -1.4452,4.504311 -1.98767,6.866612 -0.0656,1.326918 0.0961,2.713862 0.4645,4.060031 0.68552,2.899674 2.4062383,5.483488 4.8813583,7.279659 z M 39.758359,6.1742812 c 0.08274,-0.7019354 0.58936,-1.3667942 1.193066,-1.3715992 0.618548,-0.00417 1.12755,0.7803976 1.24379,1.3870043 0,0.3779268 -0.0042,0.8757269 -0.0052,1.3874849 -0.0021,0.982616 0.04355,1.958955 0.04355,1.958955 0,0 1.167725,-0.858394 1.92452,-1.394707 0.365965,-0.254685 1.281585,-0.456401 1.656635,-0.04774 0.352557,0.38418 0.177473,1.217058 -0.165998,1.559838 -1.03474,0.9166478 -3.452951,2.8269788 -3.452951,2.8269788 v 22.105521 c 0,1.608943 -0.0083,3.028219 -1.290668,3.028667 -1.072513,-0.01772 -1.172028,-1.407685 -1.172028,-3.020485 V 12.729441 l 0.0107,-3.1480898 c 0,0 -0.01164,-0.899804 -0.01091,-2.03646 4.79e-4,-0.560871 -0.04106,-0.9556504 0.0263,-1.3706413 z m -0.02536,26.7137838 c 0,0 -1.167713,0.858405 -1.924518,1.394719 -0.365955,0.254675 -1.281572,0.456402 -1.656632,0.04774 -0.35256,-0.384191 -0.17747,-1.217071 0.16601,-1.559851 1.034736,-0.91665 3.452934,-2.826985 3.452934,-2.826985 z m 0.01071,-23.3071618 c 0,0 -1.177775,-0.895468 -1.935047,-1.431302 -0.365955,-0.254675 -1.281573,-0.456401 -1.656623,-0.04774 -0.35257,0.38418 -0.17748,1.217058 0.166,1.559838 1.034736,0.9166478 3.415141,2.8154198 3.415141,2.8154198 z m 2.452168,23.3071618 c 0,0 1.167725,0.858405 1.92453,1.394719 0.365955,0.254675 1.281574,0.456402 1.656625,0.04774 0.352566,-0.384191 0.177473,-1.217071 -0.165999,-1.559851 -1.03474,-0.91665 -3.415156,-2.842869 -3.415156,-2.842869 z m 12.375605,-5.980856 c 0.562087,0.423183 0.880217,1.19781 0.582179,1.726902 -0.3052,0.5421 -1.234218,0.59361 -1.814005,0.391893 -0.324825,-0.188718 -0.750588,-0.441955 -1.18973,-0.699048 -0.843389,-0.492987 -1.705425,-0.941687 -1.705425,-0.941687 0,0 0.154034,1.448161 0.236316,2.376849 0.03596,0.446291 -0.24828,1.346566 -0.786937,1.469339 -0.506165,0.115538 -1.134745,-0.453515 -1.257689,-0.924832 -0.270296,-1.361503 -0.703222,-4.426309 -0.703222,-4.426309 L 28.934079,14.828044 c -1.38252,-0.804477 -2.59903,-1.520847 -1.95801,-2.64067 0.55157,-0.927237 1.79583,-0.318702 3.18218,0.487702 l 18.7917,10.932386 c 0.868252,0.505025 1.709241,0.994164 2.700448,1.582957 0,0 0.779277,0.440027 1.755651,1.00909 0.482205,0.280671 0.841944,0.441466 1.164845,0.7077 z M 31.624479,13.528175 c 0,0 -0.15404,-1.448157 -0.23632,-2.376844 -0.036,-0.44628 0.24829,-1.3465628 0.78694,-1.4693248 0.50612,-0.115549 1.1347,0.4535038 1.25766,0.9248298 0.27027,1.36149 0.70322,4.426301 0.70322,4.426301 z m 20.026385,11.662244 c 0,0 1.358608,-0.580131 2.197682,-0.972973 0.401837,-0.192096 1.032828,-0.890174 0.86921,-1.421673 -0.153557,-0.49973 -0.957229,-0.763077 -1.423655,-0.6355 -1.305014,0.444842 -4.164766,1.5507 -4.164766,1.5507 z M 30.393619,15.676808 c 0,0 -1.32176,0.589763 -2.16083,0.982126 -0.40186,0.192095 -1.03284,0.890174 -0.86923,1.421672 0.15403,0.49973 0.95724,0.763077 1.42366,0.635499 1.30502,-0.444852 4.10545,-1.585365 4.10545,-1.585365 z m -2.26896,12.244308 c -0.66639,0.220977 -1.47867,0.0395 -1.73794,-0.509841 -0.26552,-0.562799 0.2253,-1.359095 0.72185,-1.722095 0.33966,-0.159826 0.78982,-0.365888 1.2505,-0.581092 0.88453,-0.413061 1.74368,-0.867534 1.74368,-0.867534 0,0 -1.26578,-0.703374 -2.06755,-1.168447 -0.38366,-0.226273 -0.95198,-0.977311 -0.74292,-1.492433 0.19662,-0.483845 1.01942,-0.67642 1.47342,-0.507922 1.26195,0.557504 4.00162,1.958475 4.00162,1.958475 l 19.882403,-9.342216 c 1.447104,-0.679787 2.726766,-1.272916 3.269727,-0.101624 0.43724,0.987409 -0.771148,1.665268 -2.221589,2.346503 l -19.666651,9.241113 c -0.90844,0.42703 -1.78867,0.840581 -2.83584,1.32105 0,0 -0.80463,0.390445 -1.8274,0.869954 -0.5042,0.236863 -0.84147,0.441956 -1.24331,0.556057 z M 52.162735,16.654608 c 0,0 1.265796,0.703364 2.067555,1.168437 0.383667,0.226272 0.95198,0.977309 0.742928,1.492444 -0.196609,0.484325 -1.019428,0.67641 -1.473412,0.507912 -1.261961,-0.557504 -4.001647,-1.958477 -4.001647,-1.958477 z m -20.967366,9.840497 c 0,0 -0.30759,1.453934 -0.46976,2.372022 -0.0741,0.441477 0.13108,1.362941 0.65682,1.532888 0.49416,0.159356 1.16963,-0.352412 1.33323,-0.810731 0.38701,-1.332131 1.07874,-4.304026 1.07874,-4.304026 z m 19.9269,-12.089286 c 0,0 0.278881,-1.429374 0.441064,-2.34698 0.07412,-0.441476 -0.131083,-1.362939 -0.65682,-1.532884 -0.494169,-0.159357 -1.169637,0.35241 -1.333245,0.810728 -0.387003,1.332128 -1.082096,4.305468 -1.082096,4.305468 z",
      typeName: "Path",
      width: 65,
      height: 75,
    },
    {
      name: "Freezer1",
      data:
        "M131.345,91.499c0,0,0.631-3.12,0.998-5.124 c0.168-0.964-0.296-2.976-1.488-3.347c-1.119-0.348-2.648,0.769-3.018,1.77c-0.877,2.909-2.45,9.399-2.45,9.399L131.345,91.499\t\tL131.345,91.499z M86.229,117.892c0,0-0.696,3.174-1.064,5.178c-0.168,0.964,0.296,2.976,1.488,3.347\t\tc1.119,0.348,2.648-0.769,3.018-1.77c0.877-2.909,2.442-9.396,2.442-9.396L86.229,117.892z M133.702,96.409\t\tc0,0,2.866,1.536,4.682,2.551c0.869,0.494,2.156,2.134,1.682,3.258c-0.445,1.057-2.309,1.477-3.335,1.109\t\tc-2.857-1.217-9.06-4.276-9.06-4.276L133.702,96.409L133.702,96.409z M79.277,121.004c-1.509,0.483-3.348,0.086-3.935-1.113\t\tc-0.602-1.228,0.51-2.968,1.634-3.759c0.769-0.349,1.788-0.799,2.831-1.269c2.003-0.902,3.948-1.894,3.948-1.894\t\ts-2.866-1.536-4.682-2.551c-0.869-0.494-2.156-2.134-1.682-3.258c0.445-1.057,2.309-1.477,3.336-1.109\t\tc2.857,1.217,9.06,4.276,9.06,4.276l45.016-20.395c3.276-1.484,6.174-2.779,7.403-0.221c0.99,2.155-1.746,3.635-5.03,5.123\t\tL92.65,115.008c-2.057,0.932-4.05,1.835-6.421,2.884c0,0-1.822,0.853-4.137,1.9C80.95,120.308,80.187,120.756,79.277,121.004\t\tL79.277,121.004z M84.414,94.274c0,0-2.993,1.287-4.893,2.144c-0.909,0.419-2.339,1.943-1.968,3.103\t\tc0.348,1.09,2.167,1.666,3.223,1.387c2.955-0.971,9.296-3.461,9.296-3.461L84.414,94.274L84.414,94.274z M132.543,115.043\t\tc0,0,3.076-1.267,4.976-2.124c0.909-0.419,2.339-1.943,1.968-3.103c-0.348-1.09-2.167-1.666-3.223-1.387\t\tc-2.955,0.971-9.43,3.385-9.43,3.385L132.543,115.043z M87.201,89.583c0,0-0.349-3.162-0.535-5.189\t\tc-0.081-0.975,0.562-2.939,1.782-3.208c1.146-0.252,2.569,0.99,2.848,2.019c0.612,2.972,1.592,9.664,1.592,9.664L87.201,89.583\t\tL87.201,89.583z M139.154,118.791c1.272,0.924,1.992,2.615,1.319,3.77c-0.691,1.183-2.795,1.296-4.107,0.856\t\tc-0.735-0.412-1.699-0.965-2.694-1.526c-1.909-1.077-3.861-2.056-3.861-2.056s0.349,3.162,0.535,5.189\t\tc0.082,0.975-0.562,2.939-1.782,3.208c-1.146,0.252-2.569-0.99-2.848-2.019c-0.612-2.972-1.592-9.664-1.592-9.664L81.11,92.421\t\tc-3.13-1.756-5.884-3.32-4.433-5.765c1.249-2.024,4.066-0.696,7.205,1.065l42.547,23.867c1.966,1.103,3.87,2.171,6.115,3.456\t\tc0,0,1.764,0.961,3.974,2.203C137.608,117.859,138.423,118.21,139.154,118.791L139.154,118.791z M111.134,131.848\t\tc0,0,2.644,1.874,4.358,3.045c0.828,0.556,2.901,0.997,3.75,0.104c0.798-0.838,0.402-2.657-0.375-3.406\t\tc-2.343-2.001-7.732-6.207-7.732-6.207L111.134,131.848L111.134,131.848z M105.582,80.966c0,0-2.667-1.955-4.381-3.125\t\tc-0.828-0.556-2.901-0.997-3.75-0.105c-0.798,0.838-0.402,2.657,0.375,3.406c2.343,2.001,7.733,6.146,7.733,6.146L105.582,80.966z\t\t M105.559,131.848c0,0-2.644,1.874-4.358,3.045c-0.828,0.556-2.901,0.997-3.75,0.104c-0.798-0.838-0.402-2.657,0.375-3.406\t\tc2.343-2.001,7.818-6.171,7.818-6.171L105.559,131.848L105.559,131.848z M105.617,73.529c0.188-1.533,1.335-2.984,2.701-2.994\t\tc1.4-0.01,2.552,1.704,2.816,3.028c0,0.825-0.01,1.912-0.012,3.029c-0.006,2.145,0.098,4.276,0.098,4.276s2.644-1.874,4.358-3.045\t\tc0.828-0.556,2.901-0.997,3.75-0.105c0.798,0.838,0.402,2.657-0.375,3.406c-2.343,2.001-7.818,6.171-7.818,6.171v48.259\t\tc0,3.512-0.017,6.611-2.922,6.612c-2.429-0.039-2.653-3.073-2.653-6.595V87.839l0.023-6.873c0,0-0.026-1.965-0.024-4.446\t\tC105.559,75.296,105.464,74.435,105.617,73.529L105.617,73.529z M96.231,10.323c9.062,8.117,12.406,17.651,10.747,28.258\t\tc-0.164,1.346-0.604,4.025-0.604,4.025l-3.211-2.738c0,0-1.504-0.998-2.458-1.319c-6.566-2.21-12.608,4.814-8.895,10.531\t\tl2.808,4.324c0,0,0.012-0.051-5.211-1.17c-4.988-1.069-9.968,1.571-11.664,6.201c-1.541,4.205,0.073,8.981,4.173,11.335\t\tc0.818,0.47,2.341,1.583,2.341,1.583L61.494,96.358c-50.907-43.195,0,0-50.907-43.195c0,0,25.315-27.587,37.85-41.485\t\tC60.138-1.294,80.825-2.363,94.37,9.077L96.231,10.323 M7.711,107.034L5.9,105.491c-2.946-2.42-3.239-6.783-0.562-9.565\t\tl10.578-11.71c0,0-6.991-6.14-10.61-9.069c-4.669-3.78-5.135-10.685-0.897-15.215c1.07-1.143,3.337-3.313,3.337-3.313\t\tl50.907,43.195c0,0-2.156,2.337-3.212,3.525c-3.969,4.467-11.128,4.77-15.9,0.838c-3.784-3.117-11.223-9.498-11.223-9.498\t\tl-10.657,11.725C15.132,109.308,10.584,109.576,7.711,107.034L7.711,107.034z",
      typeName: "Path",
      width: 140,
      height: 140,
    },
    {
      name: "WalkinFridge",
      data:
        "M-0.06,0.464l13.596-0.368h14.928l12.309,0.368v27.624\tl-11.115,0.783L12.48,28.826l-12.54-0.738V0.464z M30.807,7.326h6.707v-3.73h-6.707V7.326z M37.514,7.832h-6.707v2.625h6.707V7.832z\t M37.514,10.963h-6.707v2.578h6.707V10.963z M37.514,14.092h-6.707v3.132h6.707V14.092z M37.514,17.73h-6.707v2.578h6.707V17.73z\t M37.514,20.814h-6.707v4.145h6.707V20.814z M37.514,25.465h-6.707v1.105l6.707-0.691V25.465z M4.809,24.592h6.66v-3.547h-6.66\tV24.592z M11.469,25.098h-6.66v0.781l6.66,0.691V25.098z M4.809,20.539h6.66v-3.498h-6.66V20.539z M4.809,16.533h6.66v-3.545h-6.66\tV16.533z M4.809,12.482h6.66V8.983h-6.66V12.482z M4.809,8.477h6.66V3.595h-6.66V8.477z M15.465,1.847h9.738v24.907h-9.738V1.847z M16.43,12.298L16.43,12.298c-0.092,0-0.184,0.046-0.184,0.139\tv4.188c0,0.092,0.092,0.139,0.184,0.139l0,0c0.046,0,0.138-0.047,0.138-0.139v-4.188C16.567,12.344,16.476,12.298,16.43,12.298\tL16.43,12.298z",
      typeName: "Path",
      width: 50,
      height: 50,
    },
    { name: "bgImage", data: "/static/media/StoreLayout.412688f3.svg", typeName: "bgImage", width: 1000, height: 500 },
    { name: "MainDoor", data: "/static/media/double-door.a75e88d6.svg", typeName: "Image", width: 100, height: 100 },
    { name: "Cashier", data: "/static/media/cashier.3b534b18.svg", typeName: "Image", width: 100, height: 100 },
    { name: "VerticalLine", points: [0, 0, 0, 50], typeName: "Line" },
    { name: "HorizontalLine", points: [50, 0, 0, 0], typeName: "Line" },
    { name: "Text", text: "Text", typeName: "Text" },
    { name: "Rect", width: 100, height: 50, typeName: "Rect" },
    { name: "Circle", typeName: "Circle", width: 100, height: 100, radius: 50 },
    { name: "SensorH", data: "/static/media/sensor-h.dd3cdd8a.svg", typeName: "Path", width: 100, height: 50 },
    { name: "SensorV", data: "/static/media/sensor-v.1db69ef8.svg", typeName: "Path", width: 50, height: 100 },
  ],
  instances: [
    {
      src: "/static/media/StoreLayout.412688f3.svg",
      x: 0,
      y: 0,
      width: 1000,
      height: 500,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 1,
      name: "bgImage",
      id: "e6790ba8-a008f2ce",
      typeName: "bgImage",
      data: "bgImagePath",
    },
    {
      src: "/static/media/StoreLayout.412688f3.svg",
      x: 0,
      y: 0,
      width: 1000,
      height: 500,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 1,
      name: "bgImage",
      id: "6df7d873-92e1e5f9",
      typeName: "bgImage",
      data: "bgImagePath",
    },
    {
      src: "/static/media/sensor-h.dd3cdd8a.svg",
      x: 407,
      y: 59,
      width: 100,
      height: 50,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 1,
      name: "SensorH",
      id: "b8ecbd19-7895ef7c",
      typeName: "Path",
      data: "SensorHPath",
    },
    {
      src: "/static/media/sensor-h.dd3cdd8a.svg",
      x: 280,
      y: 60,
      width: 100,
      height: 50,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 1,
      name: "SensorH",
      id: "7e65508b-139de9d7",
      typeName: "Path",
      data: "SensorHPath",
    },
  ],
};
