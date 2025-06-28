import AssetsTypeModel from "../api/assetTypes/assetTypes.model";
import AssetsModel from "../api/assets/assets.modal";
import { LampAttributes, inspectionInstructions, switchInspForm, trackInspForm } from "./assetTypeAttributes";
import { defectCodes } from "../config/database/defectCodes";
import { signalApp } from "./config";
import { SingalAppDefectCodes } from "./DefectCodes";
export async function railRoadLocationsTemplate() {
  let aTypes = await AssetsTypeModel.find().exec();
  let locGeo;
  if (aTypes.length == 0) {
    console.log("No Asset Types Exist, creating locations");
    let atrr = await AssetsTypeModel.create(railRoad);
    await AssetsModel.create(company);

    let majGeo = await AssetsTypeModel.create({ ...majorGeographical, parentAssetType: atrr._id });
    let minGeo = await AssetsTypeModel.create({ ...minorGeographical, parentAssetType: majGeo._id });
    locGeo = await AssetsTypeModel.create({ ...locationIdentifier, parentAssetType: minGeo._id });
  }

  let sensorObj = { ...Sensor, parentAssetType: locGeo && locGeo.id };
  let gatewayObj = { ...Gateway, parentAssetType: locGeo && locGeo.id };
  await addIfNotExist(AssetsTypeModel, { assetType: Sensor.assetType }, sensorObj);
  await addIfNotExist(AssetsTypeModel, { assetType: Gateway.assetType }, gatewayObj);
}
async function addIfNotExist(model, criteria, newEntry) {
  if (!model) {
    console.log("model not valid, exitting");
    return;
  }
  if (!criteria || criteria == {}) {
    console.log("Only one entry should be added, provide criteria");
    return;
  }
  if (!newEntry) {
    console.log("Entry to add is null");
    return;
  }

  try {
    let entry = await model.findOne(criteria).exec();
    if (!entry) {
      //  console.log("adding entry ", newEntry);
      await model.create(newEntry);
    }
  } catch (err) {
    console.log("addIfNotExist in Septa-Location.js, err:", err.toString());
  }
}

let company = {
  inspectable: false,
  parentAsset: null,
  images: [],
  documents: [],
  childAsset: [],
  isRemoved: false,
  unitId: "Organization",
  description: "",
  assetType: "Company",
  frequency: "",
  attributes: {},
};

let railRoad = {
  assetType: "Company",
  assetTypeClassify: "point",
  lampAttributes: [],
  timpsAttributes: {},
  defectCodes: [],
  inspectionInstructions: "",
  inspectionForms: "",
  plannable: false,
  inspectable: false,
  location: true,
  menuFilter: false,
  allowedAssetTypes: ["Location"],
  parentAssetType: null,
};
let majorGeographical = {
  assetType: "Location",
  assetTypeClassify: "point",
  lampAttributes: LampAttributes["line"],
  timpsAttributes: { code: "0001", description: "line" },
  defectCodes: [],
  inspectionInstructions: "",
  inspectionForms: "",
  plannable: false,
  inspectable: false,
  menuFilter: false,
  location: true,
  allowedAssetTypes: ["Store"],
};
let minorGeographical = {
  assetType: "Store",
  assetTypeClassify: "point",
  lampAttributes: LampAttributes["line"],
  timpsAttributes: { code: "0001", description: "line" },
  defectCodes: [],
  inspectionInstructions: "",
  inspectionForms: "",
  plannable: false,
  inspectable: false,
  menuFilter: true,
  location: true,
  allowedAssetTypes: ["Floor"],
};
let locationIdentifier = {
  assetType: "Floor",
  assetTypeClassify: "point",
  lampAttributes: LampAttributes["Floor"],
  timpsAttributes: { code: "0001", description: "line" },
  defectCodes: [],
  inspectionInstructions: "",
  inspectionForms: "",
  plannable: true,
  inspectable: false,
  location: true,
  menuFilter: false,
  allowedAssetTypes: ["Sensor", "Gateway"],
};
let Sensor = {
  assetType: "Generator",
  assetTypeClassify: "point",
  lampAttributes: LampAttributes["Sensor"],
  timpsAttributes: { code: "0001", description: "Sensor" },
  defectCodes: null,
  inspectionInstructions: "",
  inspectionForms: null,
  plannable: false,
  inspectable: true,
  location: false,
  defectCodesObj: null,
  inspectionFormsObj: null,
  allowedAssetTypes: [],
};
let Gateway = {
  assetType: "ATS",
  assetTypeClassify: "point",
  lampAttributes: LampAttributes["Gateway"],
  timpsAttributes: { code: "0002", description: "Gateway" },
  defectCodes: null,
  inspectionInstructions: "",
  inspectionForms: null,
  plannable: false,
  inspectable: true,
  location: false,
  defectCodesObj: null,
  inspectionFormsObj: null,
  allowedAssetTypes: [],
};
