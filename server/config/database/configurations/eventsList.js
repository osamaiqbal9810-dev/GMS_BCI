import { dynamicLanguageToDB } from "../../../dynamicLanguage/languageSeed.js";
import { addIfNotExist } from "../dbFunctions/dbHelperMethods.js";
let EventsModel = require("../../../api/Events/Events.model");

let events = [
  {
    name:"Alert! Primary Power Lost",
    type:"Alert",
    code:10001,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:"Power Status",
      message:"Alert! Primary Power Lost"
    }
  },
  {
    name:"Alert! Primary Power Restored",
    type:"Alert",
    code:10002,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:"Power Status",
      message:"Alert! Primary Power Restored"
    }
  },
  {
    name:"Alert! Backup Powered ON",
    type:"Alert",
    code:10003,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:"Power Status",
      message:"Alert! Backup Powered ON"
    },
  },
  {
    name:"Alert! Backup Powered OFF",
    type:"Alert",
    code:10004,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:"Power Status",
      message:"Alert! Backup Powered OFF"
    }
  },
  {
    name:"Alert! Generator Low Fuel",
    type:"Alert",
    code:10005,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:'Low Fuel',
      message:"Alert! Generator Low Fuel"
    }
  },
  {
    name:"Generator Overheating",
    type:"Alert",
    code:10006,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:false,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:"Generator Overheating",
      message:"Generator Overheating"
    }
  },
  {
    name:"Generator Battery Voltage Low",
    type:"Warning",
    code:10007,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:false,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title: "Battery Voltage",
      message:"Generator Battery Voltage Low"
    }
  },
{
    name:"Engine LOW RPM",
    type:"Warning",
    code:10008,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:false,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title: "Low RPM",
      message:"Engine LOW RPM"
    }
  },
  {
    name:"Alert! Primary Power Restored and Generator is still Running",
    type:"Alert",
    code:10009,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title: "Primary Power and Generator",
      message:"Alert! Primary Power Restored and Generator is still Running"
    }
  },
  {
    name:"Generator Turned On",
    type:"Info",
    code:100010,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:false,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title: "Generator Status",
      message:"Generator Turned On"
    }
  },
  {
    name:"Alert! Generator Comm Failure",
    type:"Alert",
    code:100012,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title: "Comm Failure",
      message:"Alert! Generator Comm Failure"
    }
  },
  {
    name:"Alert! ATS Comm Failure",
    type:"Alert",
    code:100013,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title: "Comm Failure",
      message:"Alert! ATS Comm Failure"
    }
  },
  {
    name:"ATS Comm Restored",
    type:"Alert",
    code:100014,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:false,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title: "Comm Failure",
      message:"ATS Comm Restored"
    }
  },
  {
    name:"Generator Comm Restored",
    type:"Alert",
    code:100015,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:false,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title: "Comm Failure",
      message:"Generator Comm Restored"
    }
  },
  {
    name:"Generator turned On",
    type:"Info",
    code:100016,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:false,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:"Power Status",
      message:"Generator turned On"
    }
  },
  {
    name:"Generator turned Off",
    type:"Alert",
    code:100017,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:false,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:"Power Status",
      message:"Generator turned Off"
    }
  },
  {
    name:"Alert! Primary & backup powers are still OFF",
    type:"Alert",
    code:100018,
    priority: 1,
    pushNotification:{
        SMS:false,
        Email:true,
        Visual:true,
        Audiable:false
    },
    messageInfo:{
      title:"Power Status",
      message:"Alert! Primary & backup powers are still OFF"
    }
  },
  // {
  //   name:"Alert! Primary power is still OFF",
  //   type:"Alert",
  //   code:100019,
  //   priority: 1,
  //   pushNotification:{
  //       SMS:false,
  //       Email:true,
  //       Visual:true,
  //       Audiable:false
  //   },
  //   messageInfo:{
  //     title:"Power Status",
  //     message:"Alert! Primary power is still OFF"
  //   }
  // },
  // {
  //   name:"Alert! Backup power source is running",
  //   type:"Alert",
  //   code:100020,
  //   priority: 1,
  //   pushNotification:{
  //       SMS:false,
  //       Email:true,
  //       Visual:true,
  //       Audiable:false
  //   },
  //   messageInfo:{
  //     title:"Power Status",
  //     message:"Alert! Backup power source is running"
  //   }
  // }
];

export async function createEvents() {
  for (const ev of events) {
    await addIfNotExist(EventsModel, { code: ev.code }, ev);
  }
  dynamicLanguageToDB();
}

