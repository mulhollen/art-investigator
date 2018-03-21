"use strict";


let firebase = require("firebase/app"),
    fb = require("./fb-key"),
    storage = 'firebase/storage',
    fbData = fb();

require("firebase/auth");
require("firebase/database");

var config = {
    apiKey: fbData.apiKey,
    authDomain: fbData.authDomain,
    databaseURL: fbData.databaseURL,
    projectId: fbData.projectId,
    storageBucket: fbData.storageBucket,
    messagingSenderId: fbData.messagingSenderId
};


firebase.initializeApp(config);
console.log("firebase", firebase);
firebase.getFBsettings = () => {
    // console.log("fb-config.getFBsettings", config);
    return config;
};


module.exports = firebase;


