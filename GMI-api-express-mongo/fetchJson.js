//import {got} from 'got';

const axios = require('axios');
//const got = require('got');

const jsonData = require('./myObject.json');
console.log(jsonData);

//To get generators memory map data from Main server
/*got.get('https://jsonplaceholder.typicode.com/users', {responseType: 'json'})
  .then(res => {
    const generatorsObject = res.data;
    console.log(generatorsObject);
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });
*/
axios.get('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    const generatorsObject = res.data;
    console.log(generatorsObject);
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });




