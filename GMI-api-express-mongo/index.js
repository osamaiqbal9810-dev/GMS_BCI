require('dotenv').config();

const express = require('express');
const axios = require('axios');

//const router = require('./routes/routes');
//const Model = require('./model/model');

/////////////////////////////////////////////////
//const appExpress = express();

/////////////////////////////////////////////////


/////////////////////////////////////////////////
//For server connection
/*appExpress.use(express.json());
appExpress.use('/api', router);*/

/*appExpress.listen(3000, () => {
    console.log('Server Started at ${3000}')
});*/
/////////////////////////////////////////////////



/////////////////////////////////////////////////
//DataBase Interaction functions
//Post Method
/*router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});*/
/////////////////////////////////////////////////

/////////////////////////////////////////////////
//To get generators memory map data from Main server
axios.get('http://localhost:6001/api/asset/getGenAts',
{ 
  headers: {"Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjdhMTA0OTg1ODdlZDNkZDAzMzU2NGIiLCJpYXQiOjE2NTIxNzY1NTN9.hEePJq6vZVY5zawE-NZCADySd24Dsu6fippNVqJVqKs"}, 
  user:{
   "_id":{
      "$oid":"627a10498587ed3dd033564b"
   },
   "department":[
      "administration"
   ],
   "subdivision":"All",
   "active":true,
   "isRemoved":false,
   "isAdmin":true,
   "userGroups":[
      
   ],
   "teamLead":"",
   "team":[
      
   ],
   "name":"admin",
   "tenantId":"ps19",
   "email":"admin@rms.com",
   "hashedPassword":"$2a$10$lWAFhbGihVnZh9glag/okOOSx8lLJ6GtHhKG0Ep/aWIxWWmA.vLQ.",
   "userGroup":{
      "$oid":"627a10498587ed3dd0335647"
   },
   "group_id":"admin",
   "genericEmail":"admin2@timps.com",
   "mobile":"+1455555645",
   "createdAt":{
      "$date":{
         "$numberLong":"1652166729247"
      }
   },
   "updatedAt":{
      "$date":{
         "$numberLong":"1652166730032"
      }
   },
   "__v":0,
   "assignedLocation":"627a10498587ed3dd03356e4",
   "assignedLocationName":"Organization"
}
}
)
.then(res => {
       const generatorsObject = res.data;
       console.log(generatorsObject.assetsList);
     })
     .catch(err => {
       console.log('Error: ', err.message);
     });
// axios.get('http://localhost:6001/api/asset')
//   .then(res => {
//     const generatorsObject = res.data;
//     console.log(generatorsObject);
//   })
//   .catch(err => {
//     console.log('Error: ', err.message);
//   });

/////////////////////////////////////////////////