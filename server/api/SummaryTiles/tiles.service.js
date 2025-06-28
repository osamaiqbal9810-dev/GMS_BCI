import TilesModel from "./tiles.modal.js";
let ServiceLocator = require("../../framework/servicelocator");
import ApplicationLookupsModel from '../ApplicationLookups/ApplicationLookups.model.js';
class TilesService {

    async getAllTilesCount() {
        let resultObj = { value: {} }, AssetModel, tilesArray = [], online = { onlineRec: [] }, running = { runRec: [] }, offline = { offlineRec: [] }, alert = { alertRec: [] };
        try {
            AssetModel = ServiceLocator.resolve("AssetsModel");
            let assets = await AssetModel.find({ assetType: "Floor", isRemoved: false }).exec();
            let Tiles = await TilesModel.find().exec();
            //console.log(assets);
            if (assets) {
                for (let asset in assets) {
                    let tile = Tiles.find(({ assetId }) => assetId == assets[asset]._id);
                    if (tile !== undefined) {
                        tilesArray.push(tile);
                    }
                }
            }
            if (tilesArray.length > 0) {
                let onlineTiles = tilesArray.filter(({ status }) => status == "ONLINE" || status == "Running" || status == "ALERT");
                online.count = onlineTiles.length;
                for (let onlineTile in onlineTiles) {
                    let assetInfo = assets.find(({ _id }) => _id == onlineTiles[onlineTile].assetId);
                    if (assetInfo) {
                        let onlineObj = {
                            assetId: onlineTiles[onlineTile].assetId,
                            assetName: assetInfo.name
                        }
                        online.onlineRec.push(onlineObj)
                    }
                }
                let runningTiles = tilesArray.filter(({ status }) => status == "Running");
                running.count = runningTiles.length;

                for (let runTile in runningTiles) {
                    let assetInfo = assets.find(({ _id }) => _id == runningTiles[runTile].assetId);
                    if (assetInfo) {
                        let runObj = {
                            assetId: runningTiles[runTile].assetId,
                            assetName: assetInfo.name
                        }
                        running.runRec.push(runObj)
                    }
                }

                let offlineTiles = tilesArray.filter(({ status }) => status == "OFFLINE");
                offline.count = offlineTiles.length;

                for (let offlineTile in offlineTiles) {
                    let assetInfo = assets.find(({ _id }) => _id == offlineTiles[offlineTile].assetId);
                    if (assetInfo) {
                        let offlineObj = {
                            assetId: offlineTiles[offlineTile].assetId,
                            assetName: assetInfo.name
                        }
                        offline.offlineRec.push(offlineObj)
                    }
                }

                let alertTiles = tilesArray.filter(({ status }) => status == "ALERT");
                alert.count = alertTiles.length;

                for (let alertTile in alertTiles) {
                    let assetInfo = assets.find(({ _id }) => _id == alertTiles[alertTile].assetId);
                    if (assetInfo) {
                        let alertObj = {
                            assetId: alertTiles[alertTile].assetId,
                            assetName: assetInfo.name
                        }
                        alert.alertRec.push(alertObj)
                    }
                }
            }
            resultObj.status = 200;
            resultObj.value.online = online;
            resultObj.value.running = running;
            resultObj.value.offline = offline;
            resultObj.value.alert = alert;
        }
        catch (error) {
            resultObj = { errorVal: error, status: 500 };
        }
        return resultObj;

    }
    async computeAssetStatus(dataSet, assetInfo, interPretedValue) {
        let resultObj = {}, AssetModel;

        try {
            AssetModel = ServiceLocator.resolve("AssetsModel");
            let assets = await AssetModel.find().exec();
            if (assets.length > 0) {
                let assetAtLocation = assets.filter(({ parentAsset, isRemoved }) => parentAsset == assetInfo.parentAsset && isRemoved == false);
                let assetCount = assetAtLocation.length;

                this.devicesDecision(dataSet, assetAtLocation, assetCount, assetInfo, interPretedValue);
            }
        } catch (error) {
            console.log("ComputeAssetStatus " + error);
        }
    }

    async devicesDecision(dataSet, assetAtLocation, assetCount, assetInfo, interPretedValue) {
        let SocketIOService = ServiceLocator.resolve("SocketIOService");
        try {
            let tile = await TilesModel.find({ assetId: assetInfo.parentAsset }).exec();
            let tileObj;

            if (dataSet.hasOwnProperty('data')) {
                let { data } = dataSet || undefined;
                if (data !== undefined) {
                    if (assetCount == 1) {
                        if (Object.keys(data).length == 0 && assetInfo.commStatus == true) {
                            tileObj = {
                                assetId: assetInfo.parentAsset,
                                status: "OFFLINE"
                            }
                        }
                        else if (Object.keys(data).length > 0 && assetInfo && assetInfo.commStatus == false) {
                            // for online to running
                            // console.log("tile length: " + tile.length)
                            if (tile.length > 0 && Object.keys(interPretedValue).length > 0) {
                                if (tile[0].status == "ONLINE") {
                                    if (assetInfo.suppDevice.type == "GENSET") {
                                        if (interPretedValue.hasOwnProperty('genStatus')) {
                                            if (interPretedValue.genStatus.hasOwnProperty('value')) {
                                                if (interPretedValue.genStatus.value == "Running") {
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "Running"
                                                    }
                                                }
                                                else {
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "ONLINE"
                                                    }
                                                }
                                            }
                                        }
                                        else if (interPretedValue.hasOwnProperty('engineSpeed')) {
                                            if (interPretedValue.engineSpeed.hasOwnProperty('value')) {
                                                if (interPretedValue.engineSpeed.value >= 300) {
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "Running"
                                                    }
                                                }
                                                else {
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "ONLINE"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else if (assetInfo.suppDevice.type == "ATS") {
                                        const { systemOverview: { value: { standbySrcAvail } } } = interPretedValue || undefined;
                                        if (standbySrcAvail !== undefined) {
                                            if (standbySrcAvail == "Yes") {
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "Running"
                                                }
                                            }
                                            else {
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "ONLINE"
                                                }
                                            }
                                        }

                                    }

                                }
                                else if (tile[0].status == "Running") {
                                    // running to online, offline, ALert single device
                                    // running to online
                                    if (assetInfo.suppDevice.type == "GENSET") {
                                        if (interPretedValue.hasOwnProperty('genStatus')) {
                                            if (interPretedValue.genStatus.hasOwnProperty('value')) {
                                                if (interPretedValue.genStatus.value == "Off") {
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "ONLINE"
                                                    }
                                                }
                                                else {
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "Running"
                                                    }
                                                }
                                            }
                                        }
                                        else if (interPretedValue.hasOwnProperty('engineSpeed')) {

                                            if (interPretedValue.engineSpeed.hasOwnProperty('value')) {
                                                if (interPretedValue.engineSpeed.value < 300) {
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "ONLINE"
                                                    }
                                                }
                                                else {
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "Running"
                                                    }
                                                }
                                            }
                                        }
                                        // running to offline
                                        if (assetInfo.commStatus == true) {
                                            tileObj = {
                                                assetId: assetInfo.parentAsset,
                                                status: "OFFLINE"
                                            }
                                        }
                                    }
                                    else if (assetInfo.suppDevice.type == "ATS") {
                                        //running to online
                                        const { systemOverview: { value: { standbySrcAvail, prefSrcAvail } } } = interPretedValue || undefined;
                                        if (standbySrcAvail !== undefined) {
                                            if (standbySrcAvail == "No") {
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "ONLINE"
                                                }
                                            }
                                            else if (standbySrcAvail == "Yes") {
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "Running"
                                                }
                                            }
                                            else if (assetInfo.commStatus == true) {
                                                // running to offline
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "OFFLINE"
                                                }
                                            }
                                            if (standbySrcAvail && prefSrcAvail) {
                                                if (standbySrcAvail == "Yes" && prefSrcAvail == "Yes") {
                                                    // running to Alert
                                                    tileObj = {
                                                        assetId: assetInfo.parentAsset,
                                                        status: "Running"
                                                    }
                                                    let engineCoolDown = 60000;
                                                    let coolDownTime = await ApplicationLookupsModel.find({ eventType: 1 }).exec();
                                                    if (coolDownTime.length > 0) {
                                                        engineCoolDown = coolDownTime[0].opt1;
                                                    }
                                                    setTimeout(async function () {

                                                        let AssetsModel = ServiceLocator.resolve("AssetsModel");
                                                        let asset = await AssetsModel.findById(assetInfo._id).exec();
                                                        if (asset !== undefined) {
                                                            let { state = {} } = asset;
                                                            if (state !== undefined || state !== null) {
                                                                if (state.hasOwnProperty('systemOverview')) {
                                                                    let { value = {} } = state.systemOverview;
                                                                    if (value !== undefined || value !== null) {
                                                                        let { prefSrc, prefSrcAvail, standbySrcAvail } = value || {};
                                                                        if (prefSrcAvail !== undefined || prefSrcAvail !== null && standbySrcAvail !== undefined || standbySrcAvail !== null) {
                                                                            if (prefSrcAvail == 'Yes' && standbySrcAvail == 'Yes') {

                                                                                tileObj.status = "ALERT";
                                                                                TilesModel.findOneAndUpdate(
                                                                                    { assetId: assetInfo.parentAsset },
                                                                                    { $set: { assetId: tileObj.assetId, status: tileObj.status } },
                                                                                    { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                                                                                    function (err, doc) {
                                                                                        if (err) {
                                                                                            console.log("Something wrong when updating data!");
                                                                                        }
                                                                                    });

                                                                                // count tiles status to update tiles at runtime

                                                                                let resultObj = { value: {} }, AssetModel, tilesArray = [], online = { onlineRec: [] }, running = { runRec: [] }, offline = { offlineRec: [] }, alert = { alertRec: [] };
                                                                                AssetModel = ServiceLocator.resolve("AssetsModel");
                                                                                let assets = await AssetModel.find({ assetType: "Floor", isRemoved: false }).exec();
                                                                                let Tiles = await TilesModel.find().exec();
                                                                                //console.log(assets);
                                                                                if (assets) {
                                                                                    for (let asset in assets) {
                                                                                        let tile = Tiles.find(({ assetId }) => assetId == assets[asset]._id);
                                                                                        if (tile !== undefined) {
                                                                                            tilesArray.push(tile);
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if (tilesArray.length > 0) {
                                                                                    let onlineTiles = tilesArray.filter(({ status }) => status == "ONLINE" || status == "Running" || status == "ALERT");
                                                                                    online.count = onlineTiles.length;
                                                                                    for (let onlineTile in onlineTiles) {
                                                                                        let assetInfo = assets.find(({ _id }) => _id == onlineTiles[onlineTile].assetId);
                                                                                        if (assetInfo) {
                                                                                            let onlineObj = {
                                                                                                assetId: onlineTiles[onlineTile].assetId,
                                                                                                assetName: assetInfo.name
                                                                                            }
                                                                                            online.onlineRec.push(onlineObj)
                                                                                        }
                                                                                    }
                                                                                    let runningTiles = tilesArray.filter(({ status }) => status == "Running");
                                                                                    running.count = runningTiles.length;

                                                                                    for (let runTile in runningTiles) {
                                                                                        let assetInfo = assets.find(({ _id }) => _id == runningTiles[runTile].assetId);
                                                                                        if (assetInfo) {
                                                                                            let runObj = {
                                                                                                assetId: runningTiles[runTile].assetId,
                                                                                                assetName: assetInfo.name
                                                                                            }
                                                                                            running.runRec.push(runObj)
                                                                                        }
                                                                                    }

                                                                                    let offlineTiles = tilesArray.filter(({ status }) => status == "OFFLINE");
                                                                                    offline.count = offlineTiles.length;

                                                                                    for (let offlineTile in offlineTiles) {
                                                                                        let assetInfo = assets.find(({ _id }) => _id == offlineTiles[offlineTile].assetId);
                                                                                        if (assetInfo) {
                                                                                            let offlineObj = {
                                                                                                assetId: offlineTiles[offlineTile].assetId,
                                                                                                assetName: assetInfo.name
                                                                                            }
                                                                                            offline.offlineRec.push(offlineObj)
                                                                                        }
                                                                                    }

                                                                                    let alertTiles = tilesArray.filter(({ status }) => status == "ALERT");
                                                                                    alert.count = alertTiles.length;

                                                                                    for (let alertTile in alertTiles) {
                                                                                        let assetInfo = assets.find(({ _id }) => _id == alertTiles[alertTile].assetId);
                                                                                        if (assetInfo) {
                                                                                            let alertObj = {
                                                                                                assetId: alertTiles[alertTile].assetId,
                                                                                                assetName: assetInfo.name
                                                                                            }
                                                                                            alert.alertRec.push(alertObj)
                                                                                        }
                                                                                    }
                                                                                }
                                                                                resultObj.status = 200;
                                                                                resultObj.value.online = online;
                                                                                resultObj.value.running = running;
                                                                                resultObj.value.offline = offline;
                                                                                resultObj.value.alert = alert;

                                                                                SocketIOService.onAssetStatusChange(resultObj);
                                                                            }
                                                                            else {
                                                                                tileObj = {
                                                                                    assetId: assetInfo.parentAsset,
                                                                                    status: "Running"
                                                                                }
                                                                                TilesModel.findOneAndUpdate(
                                                                                    { assetId: assetInfo.parentAsset },
                                                                                    { $set: { assetId: tileObj.assetId, status: tileObj.status } },
                                                                                    { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                                                                                    function (err, doc) {
                                                                                        if (err) {
                                                                                            console.log("Something wrong when updating data!");
                                                                                        }
                                                                                    });


                                                                                // count tiles status to update tiles at runtime

                                                                                let resultObj = { value: {} }, AssetModel, tilesArray = [], online = { onlineRec: [] }, running = { runRec: [] }, offline = { offlineRec: [] }, alert = { alertRec: [] };
                                                                                AssetModel = ServiceLocator.resolve("AssetsModel");
                                                                                let assets = await AssetModel.find({ assetType: "Floor", isRemoved: false }).exec();
                                                                                let Tiles = await TilesModel.find().exec();
                                                                                //console.log(assets);
                                                                                if (assets) {
                                                                                    for (let asset in assets) {
                                                                                        let tile = Tiles.find(({ assetId }) => assetId == assets[asset]._id);
                                                                                        if (tile !== undefined) {
                                                                                            tilesArray.push(tile);
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if (tilesArray.length > 0) {
                                                                                    let onlineTiles = tilesArray.filter(({ status }) => status == "ONLINE" || status == "Running" || status == "ALERT");
                                                                                    online.count = onlineTiles.length;
                                                                                    for (let onlineTile in onlineTiles) {
                                                                                        let assetInfo = assets.find(({ _id }) => _id == onlineTiles[onlineTile].assetId);
                                                                                        if (assetInfo) {
                                                                                            let onlineObj = {
                                                                                                assetId: onlineTiles[onlineTile].assetId,
                                                                                                assetName: assetInfo.name
                                                                                            }
                                                                                            online.onlineRec.push(onlineObj)
                                                                                        }
                                                                                    }
                                                                                    let runningTiles = tilesArray.filter(({ status }) => status == "Running");
                                                                                    running.count = runningTiles.length;

                                                                                    for (let runTile in runningTiles) {
                                                                                        let assetInfo = assets.find(({ _id }) => _id == runningTiles[runTile].assetId);
                                                                                        if (assetInfo) {
                                                                                            let runObj = {
                                                                                                assetId: runningTiles[runTile].assetId,
                                                                                                assetName: assetInfo.name
                                                                                            }
                                                                                            running.runRec.push(runObj)
                                                                                        }
                                                                                    }

                                                                                    let offlineTiles = tilesArray.filter(({ status }) => status == "OFFLINE");
                                                                                    offline.count = offlineTiles.length;

                                                                                    for (let offlineTile in offlineTiles) {
                                                                                        let assetInfo = assets.find(({ _id }) => _id == offlineTiles[offlineTile].assetId);
                                                                                        if (assetInfo) {
                                                                                            let offlineObj = {
                                                                                                assetId: offlineTiles[offlineTile].assetId,
                                                                                                assetName: assetInfo.name
                                                                                            }
                                                                                            offline.offlineRec.push(offlineObj)
                                                                                        }
                                                                                    }

                                                                                    let alertTiles = tilesArray.filter(({ status }) => status == "ALERT");
                                                                                    alert.count = alertTiles.length;

                                                                                    for (let alertTile in alertTiles) {
                                                                                        let assetInfo = assets.find(({ _id }) => _id == alertTiles[alertTile].assetId);
                                                                                        if (assetInfo) {
                                                                                            let alertObj = {
                                                                                                assetId: alertTiles[alertTile].assetId,
                                                                                                assetName: assetInfo.name
                                                                                            }
                                                                                            alert.alertRec.push(alertObj)
                                                                                        }
                                                                                    }
                                                                                }
                                                                                resultObj.status = 200;
                                                                                resultObj.value.online = online;
                                                                                resultObj.value.running = running;
                                                                                resultObj.value.offline = offline;
                                                                                resultObj.value.alert = alert;

                                                                                SocketIOService.onAssetStatusChange(resultObj);
                                                                            }
                                                                        }
                                                                    }

                                                                    TilesModel.findOneAndUpdate(
                                                                        { assetId: assetInfo.parentAsset },
                                                                        { $set: { assetId: tileObj.assetId, status: tileObj.status } },
                                                                        { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                                                                        function (err, doc) {
                                                                            if (err) {
                                                                                console.log("Something wrong when updating data!");
                                                                            }
                                                                        });
                                                                }
                                                            }
                                                        }
                                                    }, engineCoolDown)
                                                }
                                            }
                                        }

                                    }
                                }
                                else if (tile[0].status == "ALERT") {
                                    // Alert to Online
                                    if (assetInfo.suppDevice.type == "ATS") {
                                        const { systemOverview: { value: { standbySrcAvail, prefSrcAvail } } } = interPretedValue || undefined;
                                        if (standbySrcAvail !== undefined && prefSrcAvail !== undefined) {
                                            if (standbySrcAvail == "No") {
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "ONLINE"
                                                }
                                            }
                                            else if (prefSrcAvail == "No") {
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "Running"
                                                }
                                            }
                                            else if (standbySrcAvail == "No" && prefSrcAvail == "No") {
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "Online"
                                                }
                                            }
                                            else if (assetInfo.commStatus == true) {
                                                // running to offline
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "OFFLINE"
                                                }
                                            }
                                            else {
                                                tileObj = {
                                                    assetId: assetInfo.parentAsset,
                                                    status: "ALERT"
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (tile[0].status == "OFFLINE" && assetInfo) {
                                    tileObj = {
                                        assetId: assetInfo.parentAsset,
                                        status: "ONLINE"
                                    }
                                }

                            }
                            else {
                                if (assetInfo.commStatus == true) {
                                    tileObj = {
                                        assetId: assetInfo.parentAsset,
                                        status: "OFFLINE"
                                    }
                                }
                                else {
                                    tileObj = {
                                        assetId: assetInfo.parentAsset,
                                        status: "ONLINE"
                                    }
                                }
                            }
                        }

                        if (assetInfo && assetInfo.commStatus == true) {
                            tileObj = {
                                assetId: assetInfo.parentAsset,
                                status: "OFFLINE"
                            }
                        }
                    }
                    else if (assetCount == 2) {
                        tileObj = await this.bothDevicesHasData(assetAtLocation, assetInfo.parentAsset, assetInfo);
                    }
                }
            }
            else {
                tileObj = {
                    assetId: assetInfo.parentAsset,
                    status: "OFFLINE"
                }
            }
            // Save Record
            if (tile.length > 0) {

                if (tileObj !== undefined && tile[0].status !== tileObj.status) {
                    TilesModel.findOneAndUpdate(
                        { assetId: assetInfo.parentAsset },
                        { $set: { assetId: tileObj.assetId, status: tileObj.status } },
                        { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                        function (err, doc) {
                            if (err) {
                                console.log("Something wrong when updating data!");
                            }
                        });
                    let tilesLatestInfo = await this.getAllTilesCount();

                    SocketIOService.onAssetStatusChange(tilesLatestInfo);
                }
            }
            else {
                if (tileObj !== undefined) {
                    TilesModel.findOneAndUpdate(
                        { assetId: assetInfo.parentAsset },
                        { $set: { assetId: tileObj.assetId, status: tileObj.status } },
                        { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                        function (err, doc) {
                            if (err) {
                                console.log("Something wrong when updating data!");
                            }
                        });
                    let tilesLatestInfo = await this.getAllTilesCount();
                    SocketIOService.onAssetStatusChange(tilesLatestInfo);
                }
            }

        }
        catch (error) {
            console.log("Devices Decision " + error);
        }

    }


    async bothDevicesHasData(assetAtLocation, parentAsset, assetInfo) {
        let SocketIOService = ServiceLocator.resolve("SocketIOService");
        let gensetDataAvailable = false;
        let atsDataAvailable = false;
        let tilesObj;
        try {
            let tileRecord = await TilesModel.find({ assetId: assetInfo.parentAsset }).exec();
            //default state
            if (tileRecord.length == 0) {
                tilesObj = {
                    assetId: parentAsset,
                    status: "OFFLINE"
                }
                this.saveOrUpdate(tilesObj, assetInfo, tileRecord);
            }
            else {
                if (tileRecord && tileRecord[0].status !== "ALERT" && tileRecord[0].status !== "Running" && assetAtLocation) {

                    for (let asset in assetAtLocation) {
                        if ('state' in assetAtLocation[asset]) {
                            let { state } = assetAtLocation[asset] || undefined;
                            if (state !== undefined) {
                                if (Object.keys(state).length > 0) {
                                    if (assetAtLocation[asset].suppDevice.type == "GENSET") {
                                        // if gen comm fails, but ATS tells us BackupSource is "No" so move to online
                                        if (assetAtLocation[asset].commStatus == true) {
                                            let atsAtLocation = assetAtLocation.find(({ suppDevice, isRemoved }) => suppDevice.type == "ATS" && isRemoved == false);
                                            if (atsAtLocation !== undefined) {

                                                if (atsAtLocation.hasOwnProperty('state')) {
                                                    if (atsAtLocation.state.hasOwnProperty('systemOverview')) {
                                                        if (atsAtLocation.state.systemOverview.hasOwnProperty('value')) {
                                                            if (atsAtLocation.state.systemOverview.value.hasOwnProperty('standbySrcAvail')) {
                                                                let standByValue = atsAtLocation.state.systemOverview.value.standbySrcAvail;
                                                                if (standByValue == 'No') {
                                                                    gensetDataAvailable = false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            gensetDataAvailable = true;
                                        }
                                    }
                                    else if (assetAtLocation[asset].suppDevice.type == "ATS") {
                                        // if ats comm fails then move to offline
                                        if (assetAtLocation[asset].commStatus == true) {
                                            atsDataAvailable = false;
                                        }
                                        else {
                                            atsDataAvailable = true;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (gensetDataAvailable && atsDataAvailable) {
                        tilesObj = {
                            assetId: parentAsset,
                            status: "ONLINE"
                        }
                    }
                    else if (atsDataAvailable && !gensetDataAvailable) {
                        tilesObj = {
                            assetId: parentAsset,
                            status: "ONLINE"
                        }
                    }
                    else if (!atsDataAvailable && gensetDataAvailable) {
                        tilesObj = {
                            assetId: parentAsset,
                            status: "OFFLINE"
                        }
                    }
                    else if (!atsDataAvailable && !gensetDataAvailable) {
                        tilesObj = {
                            assetId: parentAsset,
                            status: "OFFLINE"
                        }
                    }

                    // two devices (GEN,ATS) online to running
                    this.saveOrUpdate(tilesObj, assetInfo, tileRecord);
                }
                let tileRec = await TilesModel.find({ assetId: assetInfo.parentAsset }).exec();
                let atsDevice, gensetDevice;
                if (assetAtLocation) {
                    gensetDevice = assetAtLocation.find(({ suppDevice, isRemoved }) => suppDevice.type == "GENSET" && isRemoved == false);
                    atsDevice = assetAtLocation.find(({ suppDevice, isRemoved }) => suppDevice.type == "ATS" && isRemoved == false);
                    if (gensetDevice && atsDevice) {
                        if (tileRec && tileRec[0].status == "ONLINE") {
                            let atsState = atsDevice.state || undefined;
                            let genState = gensetDevice.state || undefined;
                            if (genState !== undefined && atsState !== undefined && atsDevice.commStatus == false) {
                                if (atsDevice.state.hasOwnProperty('systemOverview')) {
                                    if (atsDevice.state.systemOverview.hasOwnProperty('value')) {
                                        let { standbySrcAvail } = atsDevice.state.systemOverview.value || undefined;
                                        if (standbySrcAvail !== undefined) {
                                            let atsStatusValue = standbySrcAvail;

                                            if (atsStatusValue == "Yes") {
                                                tilesObj = {
                                                    assetId: parentAsset,
                                                    status: "Running"
                                                }
                                                this.saveOrUpdate(tilesObj, assetInfo, tileRec);
                                            }
                                            else {

                                                tilesObj = {
                                                    assetId: parentAsset,
                                                    status: "ONLINE"
                                                }
                                                this.saveOrUpdate(tilesObj, assetInfo, tileRec);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (atsDevice && atsDevice.commStatus == true) {
                                    tilesObj = {
                                        assetId: parentAsset,
                                        status: "OFFLINE"
                                    }
                                }
                                else {
                                    tilesObj = {
                                        assetId: parentAsset,
                                        status: "ONLINE"
                                    }
                                }
                            }
                        }
                    }
                    let tile = await TilesModel.find({ assetId: assetInfo.parentAsset }).exec();

                    if (tile && tile[0].status == "Running") {

                        let atsDevice, gensetDevice;
                        gensetDevice = assetAtLocation.find(({ suppDevice, isRemoved }) => suppDevice.type == "GENSET" && isRemoved == false);
                        atsDevice = assetAtLocation.find(({ suppDevice, isRemoved }) => suppDevice.type == "ATS" && isRemoved == false);
                        if (gensetDevice && atsDevice) {
                            if (atsDevice.state.hasOwnProperty('systemOverview') && atsDevice.commStatus == false) {
                                if (atsDevice.state.systemOverview.hasOwnProperty('value')) {
                                    if (atsDevice.state.systemOverview.value.hasOwnProperty('standbySrcAvail')) {
                                        let atsStatusValue = atsDevice.state.systemOverview.value.standbySrcAvail;
                                        let atsPrefStatusValue = atsDevice.state.systemOverview.value.prefSrcAvail;
                                        // running to Alert
                                        if (atsStatusValue == "Yes" && atsPrefStatusValue == "Yes") {
                                            let engineCoolDown = 60000;
                                            let coolDownTime = await ApplicationLookupsModel.find({ eventType: 1 }).exec();
                                            if (coolDownTime.length > 0) {
                                                engineCoolDown = coolDownTime[0].opt1;
                                            }
                                            setTimeout(async function () {
                                                let AssetsModel = ServiceLocator.resolve("AssetsModel");
                                                let asset = await AssetsModel.findById(assetInfo._id).exec();
                                                if (asset) {
                                                    let { state = {} } = asset;
                                                    if (state) {
                                                        if (state.hasOwnProperty('systemOverview')) {
                                                            let { value = {} } = state.systemOverview;
                                                            if (value) {
                                                                let { prefSrc, prefSrcAvail, standbySrcAvail } = value || {};
                                                                if (prefSrcAvail && standbySrcAvail) {
                                                                    if (prefSrcAvail == 'Yes' && standbySrcAvail == 'Yes') {

                                                                        tilesObj.status = "ALERT";
                                                                        //let findStatus = TilesModel.find({ assetId:assetInfo.parentAsset }).exec();
                                                                        if (tilesObj) {
                                                                            TilesModel.findOneAndUpdate(
                                                                                { assetId: assetInfo.parentAsset },
                                                                                { $set: { assetId: tilesObj.assetId, status: tilesObj.status } },
                                                                                { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                                                                                function (err, doc) {
                                                                                    if (err) {
                                                                                        console.log("Something wrong when updating data!");
                                                                                        //console.log(doc);
                                                                                    }

                                                                                });

                                                                            // count tiles status to update tiles at runtime

                                                                            let resultObj = { value: {} }, AssetModel, tilesArray = [], online = { onlineRec: [] }, running = { runRec: [] }, offline = { offlineRec: [] }, alert = { alertRec: [] };
                                                                            AssetModel = ServiceLocator.resolve("AssetsModel");
                                                                            let assets = await AssetModel.find({ assetType: "Floor", isRemoved: false }).exec();
                                                                            let Tiles = await TilesModel.find().exec();
                                                                            //console.log(assets);
                                                                            if (assets) {
                                                                                for (let asset in assets) {
                                                                                    let tile = Tiles.find(({ assetId }) => assetId == assets[asset]._id);
                                                                                    if (tile !== undefined) {
                                                                                        tilesArray.push(tile);
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (tilesArray.length > 0) {
                                                                                let onlineTiles = tilesArray.filter(({ status }) => status == "ONLINE" || status == "Running" || status == "ALERT");
                                                                                online.count = onlineTiles.length;
                                                                                for (let onlineTile in onlineTiles) {
                                                                                    let assetInfo = assets.find(({ _id }) => _id == onlineTiles[onlineTile].assetId);
                                                                                    if (assetInfo) {
                                                                                        let onlineObj = {
                                                                                            assetId: onlineTiles[onlineTile].assetId,
                                                                                            assetName: assetInfo.name
                                                                                        }
                                                                                        online.onlineRec.push(onlineObj)
                                                                                    }
                                                                                }
                                                                                let runningTiles = tilesArray.filter(({ status }) => status == "Running");
                                                                                running.count = runningTiles.length;

                                                                                for (let runTile in runningTiles) {
                                                                                    let assetInfo = assets.find(({ _id }) => _id == runningTiles[runTile].assetId);
                                                                                    if (assetInfo) {
                                                                                        let runObj = {
                                                                                            assetId: runningTiles[runTile].assetId,
                                                                                            assetName: assetInfo.name
                                                                                        }
                                                                                        running.runRec.push(runObj)
                                                                                    }
                                                                                }

                                                                                let offlineTiles = tilesArray.filter(({ status }) => status == "OFFLINE");
                                                                                offline.count = offlineTiles.length;

                                                                                for (let offlineTile in offlineTiles) {
                                                                                    let assetInfo = assets.find(({ _id }) => _id == offlineTiles[offlineTile].assetId);
                                                                                    if (assetInfo) {
                                                                                        let offlineObj = {
                                                                                            assetId: offlineTiles[offlineTile].assetId,
                                                                                            assetName: assetInfo.name
                                                                                        }
                                                                                        offline.offlineRec.push(offlineObj)
                                                                                    }
                                                                                }

                                                                                let alertTiles = tilesArray.filter(({ status }) => status == "ALERT");
                                                                                alert.count = alertTiles.length;

                                                                                for (let alertTile in alertTiles) {
                                                                                    let assetInfo = assets.find(({ _id }) => _id == alertTiles[alertTile].assetId);
                                                                                    if (assetInfo) {
                                                                                        let alertObj = {
                                                                                            assetId: alertTiles[alertTile].assetId,
                                                                                            assetName: assetInfo.name
                                                                                        }
                                                                                        alert.alertRec.push(alertObj)
                                                                                    }
                                                                                }
                                                                            }
                                                                            resultObj.status = 200;
                                                                            resultObj.value.online = online;
                                                                            resultObj.value.running = running;
                                                                            resultObj.value.offline = offline;
                                                                            resultObj.value.alert = alert;

                                                                            SocketIOService.onAssetStatusChange(resultObj);
                                                                        }
                                                                    }
                                                                    else {
                                                                        //let findStatus = TilesModel.find({ assetId:assetInfo.parentAsset }).exec();
                                                                        tilesObj = {
                                                                            assetId: assetInfo.parentAsset,
                                                                            status: "Running"
                                                                        }
                                                                        if (tilesObj) {
                                                                            TilesModel.findOneAndUpdate(
                                                                                { assetId: assetInfo.parentAsset },
                                                                                { $set: { assetId: tilesObj.assetId, status: tilesObj.status } },
                                                                                { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                                                                                function (err, doc) {
                                                                                    if (err) {
                                                                                        console.log("Something wrong when updating data!");
                                                                                        //console.log(doc);
                                                                                    }

                                                                                });

                                                                            // count tiles status to update tiles at runtime

                                                                            let resultObj = { value: {} }, AssetModel, tilesArray = [], online = { onlineRec: [] }, running = { runRec: [] }, offline = { offlineRec: [] }, alert = { alertRec: [] };
                                                                            AssetModel = ServiceLocator.resolve("AssetsModel");
                                                                            let assets = await AssetModel.find({ assetType: "Floor", isRemoved: false }).exec();
                                                                            let Tiles = await TilesModel.find().exec();
                                                                            //console.log(assets);
                                                                            if (assets) {
                                                                                for (let asset in assets) {
                                                                                    let tile = Tiles.find(({ assetId }) => assetId == assets[asset]._id);
                                                                                    if (tile !== undefined) {
                                                                                        tilesArray.push(tile);
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (tilesArray.length > 0) {
                                                                                let onlineTiles = tilesArray.filter(({ status }) => status == "ONLINE" || status == "Running" || status == "ALERT");
                                                                                online.count = onlineTiles.length;
                                                                                for (let onlineTile in onlineTiles) {
                                                                                    let assetInfo = assets.find(({ _id }) => _id == onlineTiles[onlineTile].assetId);
                                                                                    if (assetInfo) {
                                                                                        let onlineObj = {
                                                                                            assetId: onlineTiles[onlineTile].assetId,
                                                                                            assetName: assetInfo.name
                                                                                        }
                                                                                        online.onlineRec.push(onlineObj)
                                                                                    }
                                                                                }
                                                                                let runningTiles = tilesArray.filter(({ status }) => status == "Running");
                                                                                running.count = runningTiles.length;

                                                                                for (let runTile in runningTiles) {
                                                                                    let assetInfo = assets.find(({ _id }) => _id == runningTiles[runTile].assetId);
                                                                                    if (assetInfo) {
                                                                                        let runObj = {
                                                                                            assetId: runningTiles[runTile].assetId,
                                                                                            assetName: assetInfo.name
                                                                                        }
                                                                                        running.runRec.push(runObj)
                                                                                    }
                                                                                }

                                                                                let offlineTiles = tilesArray.filter(({ status }) => status == "OFFLINE");
                                                                                offline.count = offlineTiles.length;

                                                                                for (let offlineTile in offlineTiles) {
                                                                                    let assetInfo = assets.find(({ _id }) => _id == offlineTiles[offlineTile].assetId);
                                                                                    if (assetInfo) {
                                                                                        let offlineObj = {
                                                                                            assetId: offlineTiles[offlineTile].assetId,
                                                                                            assetName: assetInfo.name
                                                                                        }
                                                                                        offline.offlineRec.push(offlineObj)
                                                                                    }
                                                                                }

                                                                                let alertTiles = tilesArray.filter(({ status }) => status == "ALERT");
                                                                                alert.count = alertTiles.length;

                                                                                for (let alertTile in alertTiles) {
                                                                                    let assetInfo = assets.find(({ _id }) => _id == alertTiles[alertTile].assetId);
                                                                                    if (assetInfo) {
                                                                                        let alertObj = {
                                                                                            assetId: alertTiles[alertTile].assetId,
                                                                                            assetName: assetInfo.name
                                                                                        }
                                                                                        alert.alertRec.push(alertObj)
                                                                                    }
                                                                                }
                                                                            }
                                                                            resultObj.status = 200;
                                                                            resultObj.value.online = online;
                                                                            resultObj.value.running = running;
                                                                            resultObj.value.offline = offline;
                                                                            resultObj.value.alert = alert;

                                                                            SocketIOService.onAssetStatusChange(resultObj);
                                                                        }

                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }, engineCoolDown)
                                        }
                                        else {

                                            tilesObj = {
                                                assetId: parentAsset,
                                                status: "Running"
                                            }
                                            this.saveOrUpdate(tilesObj, assetInfo, tile);
                                        }

                                        let tileRunningToOnline = await TilesModel.find({ assetId: assetInfo.parentAsset }).exec();

                                        // running to online, running      
                                        if (tileRunningToOnline && tileRunningToOnline[0].status == "Running") {
                                            // console.log(genStatusValue);
                                            if (atsStatusValue == "No") {
                                                tilesObj = {
                                                    assetId: parentAsset,
                                                    status: "ONLINE"
                                                }
                                                this.saveOrUpdate(tilesObj, assetInfo, tileRunningToOnline);
                                            }
                                            else {
                                                tilesObj = {
                                                    assetId: parentAsset,
                                                    status: "Running"
                                                }
                                                this.saveOrUpdate(tilesObj, assetInfo, tileRunningToOnline);
                                            }
                                            //this.saveOrUpdate(tilesObj,assetInfo);

                                            if (atsStatusValue == "No" && atsPrefStatusValue == "No") {
                                                this.saveOrUpdate(tilesObj, assetInfo, tileRunningToOnline);
                                            }
                                        }
                                    }
                                }

                            }
                            else {
                                // running to offline
                                if (atsDevice && atsDevice.commStatus == true) {
                                    tilesObj = {
                                        assetId: parentAsset,
                                        status: "OFFLINE"
                                    }
                                }
                                else {
                                    tilesObj = {
                                        assetId: parentAsset,
                                        status: "Running"
                                    }
                                }
                                this.saveOrUpdate(tilesObj, assetInfo, tile);
                            }
                        }

                    }

                    // alert to running,online, Alert
                    let tileAlertToRun = await TilesModel.find({ assetId: assetInfo.parentAsset }).exec();
                    if (tileAlertToRun && tileAlertToRun[0].status == "ALERT") {

                        let atsDevice;
                        atsDevice = assetAtLocation.find(({ suppDevice, isRemoved }) => suppDevice.type == "ATS" && isRemoved == false);
                        if (atsDevice) {

                            if (atsDevice.state.hasOwnProperty('systemOverview') && atsDevice.commStatus == false) {
                                if (atsDevice.state.systemOverview.hasOwnProperty('value')) {
                                    if (atsDevice.state.systemOverview.value.hasOwnProperty('standbySrcAvail')) {

                                        let atsStatusValue = atsDevice.state.systemOverview.value.standbySrcAvail;
                                        let atsPrefStatusValue = atsDevice.state.systemOverview.value.prefSrcAvail;

                                        if (atsStatusValue == "No") {
                                            tilesObj = {
                                                assetId: parentAsset,
                                                status: "ONLINE"
                                            }

                                        }
                                        else if (atsPrefStatusValue == "No") {
                                            tilesObj = {
                                                assetId: parentAsset,
                                                status: "Running"
                                            }
                                        }
                                        else if (atsStatusValue == "No" && atsPrefStatusValue == "No") {
                                            tilesObj = {
                                                assetId: parentAsset,
                                                status: "ONLINE"
                                            }
                                        }
                                        else {
                                            tilesObj = {
                                                assetId: parentAsset,
                                                status: "ALERT"
                                            }
                                        }
                                        this.saveOrUpdate(tilesObj, assetInfo, tileAlertToRun);
                                    }
                                }
                            }
                            else {
                                if (atsDevice && atsDevice.commStatus == true) {
                                    tilesObj = {
                                        assetId: parentAsset,
                                        status: "OFFLINE"
                                    }
                                }
                                else {
                                    tilesObj = {
                                        assetId: parentAsset,
                                        status: "Running"
                                    }
                                }
                                this.saveOrUpdate(tilesObj, assetInfo, tileAlertToRun);
                            }

                        }

                    }
                }
            }
        }
        catch (error) {
            console.log("bothDevicesHasData " + error);
        }
    }
    async saveOrUpdate(tilesObj, assetInfo, tile) {
        let SocketIOService = ServiceLocator.resolve("SocketIOService");
        try {
            if (tile.length > 0) {
                if (tilesObj !== undefined && tile[0].status !== tilesObj.status) {
                    TilesModel.findOneAndUpdate(
                        { assetId: assetInfo.parentAsset },
                        { $set: { assetId: tilesObj.assetId, status: tilesObj.status } },
                        { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                        function (err, doc) {
                            if (err) {
                                console.log("Something wrong when updating data!");
                                // console.log(doc);
                            }

                        });

                    let tilesLatestInfo = await this.getAllTilesCount();
                    SocketIOService.onAssetStatusChange(tilesLatestInfo);
                }
            } else {
                if (tilesObj !== undefined) {
                    TilesModel.findOneAndUpdate(
                        { assetId: assetInfo.parentAsset },
                        { $set: { assetId: tilesObj.assetId, status: tilesObj.status } },
                        { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
                        function (err, doc) {
                            if (err) {
                                console.log("Something wrong when updating data!");
                                console.log(doc);
                            }

                        });

                    let tilesLatestInfo = await this.getAllTilesCount();
                    SocketIOService.onAssetStatusChange(tilesLatestInfo);
                }
            }
        }
        catch (error) {
            console.log("Save or Update " + error);
        }

    }

    // for updating tiles to offline if data is not being recieved or gateway app is not sending data to server

    async reportLocationToOffline() {
        console.log("going to report location to offline")
        let AssetsModel = ServiceLocator.resolve("AssetsModel");
        let allAssets = await AssetsModel.find().exec()
        let floorAssets = allAssets.filter(({ assetType, isRemoved }) => assetType == "Floor" && isRemoved == false)
        let devices = allAssets.filter(({ assetType, isRemoved }) => assetType == "device" && isRemoved == false)

        let ApplicationLookupsModel = ServiceLocator.resolve("ApplicationLookupsModel");
        let lookUps = await ApplicationLookupsModel.find().exec();
        let refreshRate = await lookUps.find(({ listName }) => listName == "RefreshRate");

        let timeOut = 90
        if (refreshRate.opt1) {
            timeOut = refreshRate.opt1 * 10 / 1000
        }
        for (let index in floorAssets) {
            let asset = floorAssets[index]

            let devicesAtLocation = devices.filter(({ parentAsset }) => parentAsset == asset._id)
            var shouldReportGensetOffline = false
            var shouldReportATSOffline = false
            var gensetOfflineDevice = ""
            var atsOfflineDevice = ""
            for (let deviceIndex in devicesAtLocation) {
                let device = devicesAtLocation[deviceIndex]
                if (devicesAtLocation.length == 2) {

                    if (device.suppDevice.type == "ATS") {
                        if (device.state) {
                            if (device.commStatus == false) {
                                let shouldReportDeviceOffline = await this.evaluateGatewayAvailabilityForATS(device.state, timeOut)
                                if (shouldReportDeviceOffline) {
                                    shouldReportATSOffline = true
                                    atsOfflineDevice = device
                                }
                            }
                        }
                        else {
                            atsOfflineDevice = device
                            shouldReportATSOffline = true
                        }
                    }

                    if (device.suppDevice.type == "GENSET") {
                        if (device.state) {
                            if (device.commStatus == false) {
                                let shouldReportDeviceOffline = await this.evaluateGatewayAvailabilityForGenset(device.state, timeOut)
                                if (shouldReportDeviceOffline) {
                                    shouldReportGensetOffline = true
                                    gensetOfflineDevice = device
                                }
                            }
                        }
                        else {
                            shouldReportGensetOffline = true
                            gensetOfflineDevice = device
                        }
                    }


                }
                else {
                    shouldReportGensetOffline = false
                    shouldReportATSOffline = false
                    if (device.suppDevice.type == "ATS") {
                        if (device.state) {
                            if (device.commStatus == false) {
                                let shouldReportDeviceOffline = await this.evaluateGatewayAvailabilityForATS(device.state, timeOut)
                                if (shouldReportDeviceOffline) {
                                    await this.reportOffline(device)
                                }
                            }
                        }
                        else {
                            await this.reportOffline(device)
                        }
                    }
                    else if (device.suppDevice.type == "GENSET") {
                        if (device.state) {
                            if (device.commStatus == false) {
                                let shouldReportDeviceOffline = await this.evaluateGatewayAvailabilityForGenset(device.state, timeOut)
                                if (shouldReportDeviceOffline) {
                                    await this.reportOffline(device)
                                }
                            }
                        }
                        else {
                            await this.reportOffline(device)
                        }
                    }
                }
            }

            if (shouldReportGensetOffline && shouldReportATSOffline) {
                await this.reportOffline(atsOfflineDevice)
                await this.reportOffline(gensetOfflineDevice)
            }

        }
    }

    async evaluateGatewayAvailabilityForGenset(state, timeOut) {
        if (state.hasOwnProperty("genStatus")) {

            let currentTime = new Date().getTime();
            let lastUpdate = new Date(state.genStatus.lastUpdated).getTime();
            let timeDiff = (currentTime - lastUpdate) / 1000;

            if (timeDiff > timeOut) {
                console.log("Genset Time Diff" + timeDiff + "TimeOut" + timeOut)
                return true
            }
        }
        return false
    }

    async evaluateGatewayAvailabilityForATS(state, timeOut) {
        if (state.hasOwnProperty("systemOverview")) {

            let currentTime = new Date().getTime();
            let lastUpdate = new Date(state.systemOverview.lastUpdated).getTime();
            let timeDiff = (currentTime - lastUpdate) / 1000;

            if (timeDiff > timeOut) {
                console.log("ATS Time Diff" + timeDiff + "TimeOut" + timeOut)
                return true
            }
        }
        return false
    }

    async reportOffline(device) {
        let notificationService = ServiceLocator.resolve("NotificationService")
        console.log("ReportOffline")
        let AssetsModel = ServiceLocator.resolve("AssetsModel");
        device.commStatus = true
        notificationService.createCommFailureNotification(device._id, "", "", device.suppDevice.type)
        // TODO: alerts implementation
        // update asset 
        await AssetsModel.updateOne({ _id: device._id }, { $set: { commStatus: true } }).exec();
        // update tiles
        let existingStatus = await TilesModel.find({ assetId: device.parentAsset }).exec();
        let tilesObj = {
            assetId: device.parentAsset,
            status: "OFFLINE"
        }
        await this.saveOrUpdate(tilesObj, device, existingStatus);
    }
}
export default TilesService;
