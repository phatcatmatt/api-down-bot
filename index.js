const axios = require('axios');
const twilio = require('twilio');
const keys = require('./keys.js')

const port = 3000;
const client = new twilio(keys.twilioID, keys.twilioToken)
const baseurl = keys.baseURL;
const credentials = keys.credentials;
const interval = 5 * 60 * 1000

let apiStatus = null;
let pastStatus = null;

function apiTest() {
    console.log('testing api...')    
    axios({
        url: 'login',
        baseURL: baseurl,
        method: 'post',
        data: credentials
    })
        .then(res => {
            console.log('login success');
            apiStatus = true;
            sendMessage();
        })
        .catch(err => {
            console.log('login failed');
            apiStatus = false;
            sendMessage();
    
        });
}

function sendMessage() {
    if (pastStatus !== apiStatus) {
        pastStatus = apiStatus;
        let message = apiStatus === true ? 'API is up!' : 'API is down!';
        client.messages.create({
            body: message,
            to: keys.toPhone,
            from: keys.fromPhone
        });
    }
}

apiTest();
setInterval(() => {
    apiTest();
}, interval)

