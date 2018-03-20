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
    } else if (event.target.id === "edit-profile") {
        printDiv.empty('');
        let userObj = user.getUserObj();
        html.editProfilePage(userObj.displayName, userObj.email);
    } else if (event.target.id === "edit-cancel") {
        printDiv.empty('');
        let userObj = user.getUserObj();
        html.homePage(userObj.displayName);
    } else if (event.target.id === "edit-save"){
        printDiv.empty('');
        // this is where I need to get displayName to FB and editable. 
        let userObj = user.getUserObj();
        html.homePage(userObj.displayName);
    } else if (event.target.id === "before") {
        printDiv.empty('');
        printJS.appendMain(html.vulnerablePage);
    } else if (event.target.id === "vulnerable-back") {
        printDiv.empty('');
        let userObj = user.getUserObj();
        html.homePage(userObj.displayName);
    } else if (event.target.id === "home") {
        printDiv.empty('');
        let userObj = user.getUserObj();
        html.homePage(userObj.displayName);
    } else if (event.target.id === "hole") {
        console.log("event.keycode", event.keycode);
        if (event.keyCode === 13) {
            var input = $("hole").val;
            console.log("enter press", input);
            printDiv.empty('');
            // scary word needs to go to FB
            html.scaryWordPage(input);
            }
    }
});
 
