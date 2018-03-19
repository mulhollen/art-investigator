"use strict";

// REQUIRES
let $ = require('../lib/node_modules/jquery');
let printJS = require("./print");
let html = require("./html-cont");
let user = require("./user");

let login = $("#login");


// Event listeners
$(document).ready(() => {
    printJS.print(html.signInPage);
});

function check (event) {
    console.log('did we even make it here');
    if (event.target.id === "login") {
        console.log("login", event.target.id);
        user.getUser();
    }
}

check();
