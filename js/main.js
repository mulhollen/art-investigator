"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    user = require("./user");



//***************************************************************
$("#login").click(function () {
    console.log("clicked login");
    db.logInGoogle()
        .then((result) => {
            console.log("result from login", result.user.uid);
            user.setUser(result.user.uid);
            $("#login").addClass("is-hidden");
            $("#logout").removeClass("is-hidden");
            user.checkUserFB(result.user.uid);
        });
});

$("#logout").click(() => {
    console.log("main.logout clicked");
    db.logOut();
    $("#login").removeClass("is-hidden");
    $("#logout").addClass("is-hidden");
});

/////// email and register
$("#login-email").click(() => {
    console.log("clicked login email");
    user.emailLogin();
});

$("#register-email").click(() => {
    console.log("clicked register");
    user.emailRegister();
});
