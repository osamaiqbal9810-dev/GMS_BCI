import { dynamicLanguageToDB } from "../../../dynamicLanguage/languageSeed.js";
import { addIfNotExist } from "../dbFunctions/dbHelperMethods.js";
let ApplicationLookupsModel = require("../../../api/ApplicationLookups/ApplicationLookups.model");

function getHtmlForTable(i) {
  if (i == 0 || i == 1) {
    return '<!DOCTYPE html><html lang="en"><head>  <title>Remedial Action Table</title>  <meta charset="utf-8">  <meta name="viewport" content="width=device-width, initial-scale=1">  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script><style>.center {  text-align: center;}p {font-size:17px;line-height:1.6;margin-bottom:20px;margin-left:5px;margin-right:5px;}</style></head><body><div class="container p-3 my-3 border">  <h2>Remedial Action Table</h2>  <table class="table table-hover" border=1>    <thead>      <tr><th rowspan=2 class="center">Defect</th><th colspan=2 class="center">Lenth of defect (inch(es))</th><th colspan=2 class="center">Percentage of existing rail head cross-sectional area</th><th rowspan=2 class="center">if the defective rail is not replaces or repaired, take the remedial action</th>      </tr>      <tr><th class="center">More than</th><th class="center">But not more than</th><th class="center">Less than</th><th class="center">But not less than</th>      </tr>    </thead>    <tbody>      <tr><td>Compound Fissure</td><td></td><td></td><td>70</td><td>5</td><td>B.</td>      </tr>      <tr><td></td><td></td><td></td><td>100</td><td>70</td><td>A2.</td>      </tr>      <tr><td></td><td></td><td></td><td></td><td>100</td><td>A.</td>      </tr><tr><td>Transverse Fissure</td><td></td><td></td><td>25</td><td>5</td><td>C.</td>      </tr><tr><td>Detail Fracture</td><td></td><td></td><td>60</td><td>25</td><td>D.</td>      </tr><tr><td>Engine Burn Fracture</td><td></td><td></td><td>100</td><td>60</td><td>A2, or [E and H]</td>      </tr><tr><td>Defective Weld</td><td></td><td></td><td></td><td>100</td><td>A, or [E and H].</td>      </tr><tr><td>Bolt Hole Crack</td><td>3/4</td><td>1</td><td></td><td></td><td>H and F.</td>      </tr><tr><td> </td><td>1</td><td>1 1/2</td><td></td><td></td><td>H and G.</td>      </tr><tr><td> </td><td>1</td><td></td><td></td><td></td><td>B.</td>      </tr><tr><td> </td><td>1 1/2</td><td></td><td></td><td></td><td></td>      </tr><tr><td> </td><td>(1)</td><td>(1)</td><td></td><td></td><td>A.</td>      </tr><tr><td>Broken Base </td><td>1</td><td>6</td><td></td><td></td><td>D.</td>      </tr><tr><td> </td><td>6 2</td><td></td><td></td><td></td><td>A, or [E and I].</td>      </tr><tr><td>Ordinary Break </td><td></td><td></td><td></td><td></td><td>A or E.</td>      </tr><tr><td>Damaged Rail </td><td></td><td></td><td></td><td></td><td>C.</td>      </tr><tr><td>Flattened Rail Crushed Head </td><td>Depth > 3/8 and Length >8</td><td></td><td></td><td></td><td>H.</td>      </tr></tbody>  </table><div><div><p><dt>A.<dl> Assign a person designated under 213.7 to visually supervise each operation over the defective rail.</dl></dt></p><dt>A2. <dl>Assign a person designated under 213.7 to make a visual inspection. After a visual inspection, that persion may authorize operation to continue without continuous visual supervision at a maximum of 10 m.p.h for up to 24 hours prior to another such viual inspection or replacement or repair of the rail.</dl></dt><dt>B. <dl>Limit operating speed over defective rail to that as authorized by a person designated under 213.7 a who has at least one year of supervisory experience in railroad track maintenance The operating speed cannot be over 30 mph or the maximum allowable speed under $213.9 for the class of track concerned whichever is lower </dl></dt><dt>C. <dl>Apply joint bars bolted only through the outermost holes to defect within 20 days after it is determined to continue the track in use In the case of Classes 3 through track limit operating speed over defective rail to 30 mph until joint bars are applied thereafter limit speed to 50 mph or the maximum allowable speed under 213.9 the class of track concerned whichever lower When a search for internal rail defects is conducted under 213.237 and defects are discovered in Classes 3 through 5 which require remedial action C the operating speed shall be limited to 50 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower for a period not to exceed 4 days If the defective rail has not been removed from the track or a permanent repair made within 4 days of the discovery limit operating speed over the defective rail to 30 mph until joint bars are applied thereafter limit speed to 50 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower </dl></dt><dt>D. <dl>Apply joint bars bolted only through the outermost holes to defect within 10 days after it is determined to continue the track in use In the case of Classes 3 through 5 track limit operating speed over the defective rail to 30 mph or less as authorized by a person designated under 213.7 a who has at least one year of supervisory experience in railroad track maintenance until joint bars are applied thereafter limit speed to 50 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower </dl></dt><dt>E. <dl>Apply joint bars to defect and bolt in accordance with 213.121 (d) and (e)</dl> </dt><dt>F <dl>Inspect rail 90 days after it is determined to continue the track in use.</dl></dt><dt>G. <dl>Inspect rail 30 days after it is determined to continue the track in use. </dl></dt><dt>H. <dl>Limit operating speed over defective rail to 50 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower </dl></dt><dt>I. <dl>Limit operating speed over defective rail to 30 mph or the maximum allowable speed under 213.9 for the class of track concerned whichever is lower </dl></dt></div></div></body></html>';
  } else {
    return "";
  }
}

let listOfAppConstants = [
  {
    tenantId: "ps19",
    listName: "RefreshRate",
    code: "default",
    description: "Refresh Rate",
    opt1: 7000,
    eventType:0
  },
  {
    tenantId: "ps19",
    listName: "emailTimezone",
    code: "emailTimezone-00",
    description: "emailTimezone",
    opt1: "US/Central",
    eventType:-1
  },
  {
    tenantId: "ps19",
    listName: "CoolDownTime",
    code: "coolDownTime",
    description: "Cooldown Time",
    opt1: 60000,
    eventType:1
  },
  {
    tenantId: "ps19",
    listName: "Backup&MainTime",
    code: "backup&MainTime",
    description: "Primary & Backup Power Lost Time",
    opt1: 60000,
    eventType:2
  },
  {
    tenantId: "ps19",
    listName: "MainOff",
    code: "mainOFF",
    description: "Main Power Off Time",
    opt1: 60000,
    eventType:3
  },
  {
    tenantId: "ps19",
    listName: "BackUpOff",
    code: "backupOFF",
    description: "Backup Power On Time",
    opt1: 60000,
    eventType:4
  },
];
  let listOfAppLookups = [
  {
    threshold:900,
      type: "GENSET",
      name: "engineSpeed",
      eventType:10008
  },
  {
    threshold:118,
      type: "GENSET",
      name: "coolantTemp",
      eventType:10006
  },
  
  {
    threshold:18,
      type: "GENSET",
      name: "batteryVoltage",
      eventType:10007
  },
  {
    threshold:21,
      type: "GENSET",
      name: "fuelLevel",
      eventType: 10005 
  },
  {
      threshold:"No",
      type: "ATS",
      name: "prefSrcAvail",
      eventType: 10001 
  },
  
  {
    threshold:"Yes",
    type: "ATS",
    name: "prefSrcAvail",
    eventType: 10002 
  },
  {
    threshold:"Yes",
    type: "ATS",
    name: "standbySrcAvail",
    eventType: 10003 
  },
  {
    threshold:"No",
    type: "ATS",
    name: "standbySrcAvail",
    eventType: 10004 
  },
  {
    threshold:"Running",
    type: "GENSET",
    name: "genStatus",
    eventType: 100016 
  },
  {
    threshold:"Off",
    name: "genStatus",
    eventType: 100017 
  },
];

export async function createApplicationLookups() {
    for (const al of listOfAppConstants) {
    await addIfNotExist(ApplicationLookupsModel, { eventType:al.eventType }, al);
  }

  for (const al of listOfAppLookups) {
    await addIfNotExist(ApplicationLookupsModel, { eventType: al.eventType, name: al.name }, al);
  }

  dynamicLanguageToDB();
}
export async function deleteApplicationLookups(list) {
  if (list && list.length) {
    for (let l2d of list) {
      if (!l2d.listName || !l2d.code) continue;
      console.log("attempting to delete applicaitonlookup: listname:", l2d.listName, "code:", l2d.code);
      await ApplicationLookupsModel.deleteOne({ listName: l2d.listName, code: l2d.code });
    }
  }
}

//
// provide this function array of {listName:'', code:'', compare:''}
// listName and code identifies the unique entry
// compare contains the field to match, if match fails, the entry will be updated
//
export async function updateApplicationLookups(list) {
  if (list && list.length) {
    for (let l2u of list) {
      if (!l2u.listName || !l2u.code || !l2u.compare) continue;
      let item2u = await ApplicationLookupsModel.findOne({ listName: l2u.listName, code: l2u.code }).exec();
      let item2compare = listOfAppLookups.find((a) => {
        return a.listName === l2u.listName && a.code === l2u.code;
      });
      if (item2u && item2u[l2u.compare] !== undefined && item2compare && item2compare[l2u.compare] !== undefined) {
        ////if(item2u && item2u[l2u.compare] && item2compare && item2compare[l2u.compare])
        let f1 = item2u[l2u.compare];
        let f2 = item2compare[l2u.compare];
        try {
          if (JSON.stringify(f1) !== JSON.stringify(f2)) {
            item2u[l2u.compare] = item2compare[l2u.compare];
            item2u.markModified(l2u.compare);
            await item2u.save();
          }
        } catch (err) {}
      }
    }
  }
}
