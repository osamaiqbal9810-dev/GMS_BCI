//Configurations used by the project
var Configurations =
{
   //release data 9:00, 30-05-2022
   GMI_API_VERSION: '1.0.1',

   //Paths    
   //webServerPath : "http://localhost:3000/",
   webServerPath : "http://172.19.91.167:6001/",

   //webServerPath : "http://brcgenset.eastus.cloudapp.azure.com/",
   getMemoryMapPath : "api/asset/getGenAts",
   postDeviceData : "api/sensorLog/sensordata",
   getRefreshTimePath : "api/ApplicationLookups/refreshTime",
   childProcessPath : "../modbus-driver/src/index.js",

}

export default Configurations;