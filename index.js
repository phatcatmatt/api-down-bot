const express = require('express');
const axios = require('axios');
const credentials = require('./login.js')

const app = express();
const port = 3000;
const baseurl = 'https://rco-auth-api-develop.qa.redcross.us/rest/';

let apiStatus = {
    login: null,
}

if (!credentials.username || !credentials.password || !credentials.provider) {
    console.log('Please provide login credentials!');
}

axios({
    url: 'login',
    baseURL: baseurl,
    method: 'post',
    data: credentials
})
    .then(res => {
        console.log('login success');
        apiStatus.login = true;
    })
    .catch(err => {
        console.log('login failed');
        apiStatus.login = false;
    });

app.get('/status', ()=> {
    return apiStatus;
})


app.listen(port, () => {
    console.log('listening on port ' + port);
})