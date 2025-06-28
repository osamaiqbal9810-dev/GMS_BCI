import axios from 'axios';
import Configurations from './configurations.js';

//Functions to get or post data to or from web app
export default {
    async get(path, callback) { 
        //TODO: Change Path
        axios.get(`${Configurations.webServerPath}${path}`)        
        .then(res => {
            callback(res.data);
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
    },
    async post(path, data) { 
        //TODO: Change Path
        axios.post(`${Configurations.webServerPath}${path}`, data)
        .then(res => {
            //callback(res.data);
            //console.log('data posted successfully, status: ' + res.status);
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
    }
}