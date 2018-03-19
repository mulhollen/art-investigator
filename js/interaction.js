"use strict";

// REQUIRES
let $ = require('../lib/node_modules/jquery');
let printJS = require("./print");
let html = require("./html-cont");
let db = require("./db-interaction");
let user = require("./user");

let login = $("#login");
let printDiv = $('#main');


// Event listeners
$(document).ready(() => {
    printJS.appendMain(html.signInPage);
});


document.querySelector('#main').addEventListener('click', (event) => {
    if (event.target.id === "login") {
        console.log("login", event.target.id);
        db.logInGoogle()
        .then((result) => {
            console.log("result from login", result.user.uid);
            user.setUser(result.user.uid);
            user.checkUserFB(result.user.uid);
            printDiv.empty('');
            html.homePage(result.user.displayName);  
        });
    } else if (event.target.id === "logout"){
        db.logOut()
        .then(() => {
            printDiv.empty('');
            printJS.appendMain(html.signInPage);
        });
    }
});


