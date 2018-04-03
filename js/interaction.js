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
let num = 0;

function makeID() {
    let FBid = "id_" + num;
    num = num + 1;
    return FBid;
}

// Event listeners
$(document).ready(() => {
    printJS.appendMain(html.signInPage);
});


document.querySelector('#main').addEventListener('click', (event) => {
    if (event.target.id === "login") {
        // console.log("login", event.target.id);
        db.logInGoogle()
            .then((result) => {
                // console.log("result from login", result.user);
                user.setUser(result.user.uid);
                user.checkUserFB(result.user);
                printDiv.empty('');

                db.getFBDetails(result.user.uid).then((user) => {
                    let keys = Object.keys(user);
                    let userKey = keys.shift();
                    html.homePage(user[userKey].displayName);
                });
            });
    } else if (event.target.id === "logout") {
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
    } else if (event.target.id === "edit-save") {
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
                let scaryObj = { scaryword: input };

                printDiv.empty('');

                db.addFBkey(scaryObj, currentUser.fbID).then(() => {
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
    } else if (event.target.id === "scrolldown"){
        $("html, body").animate({ scrollTop: $('#page-2').offset().top }, 500);
    } else if (event.target.id === "next-scary-word") {
        printDiv.empty('');
        printJS.appendMain(html.armorPage);
    } else if (event.target.id === "word-cloud-back") {
        printDiv.empty('');
        html.scaryWordPage();
    } else if (event.target.id === "next-word-cloud") {
        printDiv.empty('');
        printJS.appendMain(html.armorPage);
    } else if (event.target.id === "armor-back") {
        printDiv.empty('');
        // html.wordCloudPage();
        let currentUser = user.getUserObj();
        db.getFBDetails(currentUser.uid).then((user) => {
            let keys = Object.keys(user);
            let userKey = keys.shift();
            html.scaryWordPage(user[userKey].scaryword);
        });
    } else if (event.target.id === "during") {
        printDiv.empty('');
        printJS.appendMain(html.ispyInstructionsPage);
    } else if (event.target.id === "ispy-instructions-back") {
        printDiv.empty('');
        printJS.appendMain(html.armorPage);
    } else if (event.target.id === "ispy-letsgo") {
        printDiv.empty('');
        // there's an error happening here
        game.playISpy(questions.questionArray);
    } else if (event.target.id === "questionBack") {
        printDiv.empty('');
        printJS.appendMain(html.ispyInstructionsPage);
    } else if (event.target.id === "hintId") {
        // console.log("i've been clicked");
        $("#hintImg").removeClass("invisible");
    } else if (event.target.id === "cameraID") {
        // console.log("clicked the camera ID");
        printDiv.empty('');
        html.imageUpload();
        $("#save").addClass("disabled");
        $("#savecircle").addClass("disabled-border");
        $("#uploader").change(() => imgUpload.previewFile(this.files));
    } else if (event.target.id === "save") {

        let url = $("#theuploaded").attr('src');
        let currentUser = user.getUserObj();
        let place = num;
        let photoid = makeID();
        let photoObj;

        if (photoid === "id_0") {
            photoObj = { id_0: url };
        } else if (photoid === "id_1") {
            photoObj = { id_1: url };
        } else if (photoid === "id_2") {
            photoObj = { id_2: url };
        } else if (photoid === "id_3") {
            photoObj = { id_3: url };
        } else if (photoid === "id_4") {
            photoObj = { id_4: url };
        } else if (photoid === "id_5") {
            photoObj = { id_5: url };
        } else if (photoid === "id_6") {
            photoObj = { id_6: url };
        } else if (photoid === "id_7") {
            photoObj = { id_7: url };
        } else if (photoid === "id_8") {
            photoObj = { id_8: url };
        } else if (photoid === "id_9") {
            photoObj = { id_9: url };
        } else if (photoid === "id_10") {
            photoObj = { id_10: url };
        } else if (photoid === "id_11") {
            photoObj = { id_11: url };
        } else if (photoid === "id_12") {
            photoObj = { id_12: url };
        } else if (photoid === "id_13") {
            photoObj = { id_13: url };
        } else if (photoid === "id_14") {
            photoObj = { id_15: url };
        } else if (photoid === "id_15") {
            photoObj = { id_15: url };
        }

        // console.log("photoObj", photoObj);
        // console.log("FB upload key", currentUser.fbID);

        db.addFBkey(photoObj, currentUser.fbID).then(() => {
            printDiv.empty('');
            game.playLast(questions.questionArray[place]);
            $("#userUpload").attr('src', url);
            $("#nextBtn").removeClass("invisible");
            $("#userUpload").removeClass("invisible");
        });
    } else if (event.target.id === "cancelUpload"){
        let place = num;
        game.playLast(questions.questionArray[place]);

    } else if (event.target.id === "iSpyNext") {
        if (num === 15) {
            $(function () {
                //----- OPEN
                $('[data-popup-open]').on('click', function (e) {
                    var targeted_popup_class = $(this).attr('data-popup-open');
                    $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
                    e.preventDefault();
                });
                //----- CLOSE
                $('[data-popup-close]').on('click', function (e) {
                    var targeted_popup_class = $(this).attr('data-popup-close');
                    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
                    e.preventDefault();
                });
            });
        } else {
            $("#nextBtn").addClass("invisible");
            game.playISpy(questions.questionArray);
        }
    } else if (event.target.id === "after") {
        let currentUser = user.getUserObj();
        db.getFBDetails(currentUser.uid).then((user) => {
            let keys = Object.keys(user);
            let userKey = keys.shift();
            // console.log("keys", user[userKey]);

            printDiv.empty('');
            html.after(user[userKey].displayName, user[userKey].scaryword, user[userKey]);
            // console.log("user key", user[userKey]);
        });
    } else if (event.target.id === "after-back") {
        let currentUser = user.getUserObj();
        printDiv.empty('');
        html.homePage(currentUser.displayName);
    }
});

