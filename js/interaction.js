"use strict";

// REQUIRES
let $ = require('../lib/node_modules/jquery');
let printJS = require("./print");
let html = require("./html-cont");
let db = require("./db-interaction");
let user = require("./user");
let game = require("./ispy");
let questions = require("./questions");
let imgUpload = require("./img-upload");

let login = $("#login");
let printDiv = $('#main');

let input;

// Event listeners
$(document).ready(() => {
    printJS.appendMain(html.signInPage);
});


document.querySelector('#main').addEventListener('click', (event) => {
    if (event.target.id === "login") {
        console.log("login", event.target.id);
        db.logInGoogle()
        .then((result) => {
            console.log("result from login", result.user);
            user.setUser(result.user.uid);
            user.checkUserFB(result.user);
            printDiv.empty('');

            db.getFBDetails(result.user.uid).then((user) => {
                let keys = Object.keys(user);
                let userKey = keys.shift();
                html.homePage(user[userKey].displayName);  
            });
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
        var inputOne = document.getElementById("username").value;
        var inputTwo = document.getElementById("email").value;


        let currentUser = user.getUserObj();
        currentUser.displayName = inputOne;
        currentUser.email = inputTwo;
        currentUser.fbID = currentUser.fbID ? currentUser.fbID : currentUser.fbID.name;
    
        db.updateUserFB(currentUser);
        
        printDiv.empty('');
        html.homePage(inputOne);
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
        document.querySelector('#hole').addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) { 
                input = document.getElementById("hole").value;
                
                let currentUser = user.getUserObj();
                let scaryObj = {scaryword: input};
                
                printDiv.empty('');
                
                db.addFBkey(scaryObj, currentUser.fbID).then( () => {
                    db.getFBDetails(currentUser.uid).then((user) => {
                        let keys = Object.keys(user);
                        let userKey = keys.shift();
                        html.scaryWordPage(user[userKey].scaryword);
                    });
                });
            }
        });
    } else if (event.target.id === "scary-word-back") {
        printDiv.empty('');
        printJS.appendMain(html.vulnerablePage);
    } else if (event.target.id === "next-scary-word") {
        printDiv.empty('');
        html.wordCloudPage();
    } else if (event.target.id === "word-cloud-back") {
        printDiv.empty('');
        html.scaryWordPage();
    } else if (event.target.id === "next-word-cloud") {
        printDiv.empty('');
        printJS.appendMain(html.armorPage);
    } else if (event.target.id === "armor-back") {
        printDiv.empty('');
        html.wordCloudPage();
    } else if (event.target.id === "during") {
        printDiv.empty('');
        printJS.appendMain(html.ispyInstructionsPage);
    } else if (event.target.id === "ispy-instructions-back") {
        printDiv.empty('');
        printJS.appendMain(html.armorPage);
    } else if (event.target.id === "ispy-letsgo") {
        printDiv.empty('');
        
        game.playISpy(questions.questionArray);
    } else if (event.target.id === "questionBack" ){
        printDiv.empty('');
        printJS.appendMain(html.ispyInstructionsPage);
    } else if (event.target.id === "hintId") {
        console.log("i've been clicked");
        $("#hintImg").removeClass("invisible");
    } else if (event.target.id === "cameraID") {
        console.log("clicked the camera ID");
        html.imageUpload();
        $("#uploader").change(() => imgUpload.previewFile(this.files));
    } else if (event.target.id === "save") {
        console.log("you clicked save");

        let url = $("#theuploaded").attr('src');
        let currentUser = user.getUserObj();
        let photoObj = { q_01: url };

        console.log("URLLLLL", url);

        db.addFBkey(photoObj, currentUser.fbID).then(() => {
            db.getFBDetails(currentUser.uid).then((user) => {
                let keys = Object.keys(user);
                let userKey = keys.shift();
                printDiv.empty('');
                game.playISpy(questions.questionArray);
            });
        });
    }
});
 
