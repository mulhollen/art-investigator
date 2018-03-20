"use strict";
//install firebase into lib folder npm install firebase --save
let firebase = require("./fb-config"),
    db = require("./db-interaction"),
    $ = require("jquery");

let defaultCode = 37027;

let currentUser = {
    uid: null,
    fbID: null,
    email: null,
    displayName: null
};

firebase.auth().onAuthStateChanged((user) => {
    console.log("onAuthStateChanged", user);
    if (user) {
        console.log("current user.displayname", user.displayName);
        currentUser.uid = user.uid;
        console.log("current user Logged in?", currentUser);
    } else {
        currentUser.uid = null;
        currentUser.fbID = null;
        console.log("current user NOT logged in:", currentUser);
    }
});


function getUser() {
    return currentUser.uid;
}

function setUser(val) {
    currentUser.uid = val;
}

function getUserObj() {
    return currentUser;
}

function setDisplayName(val) {
    currentUser.displayName = val;
}

function changeEmail(val) {
    currentUser.email = val;
}

function setUserVars(obj) {
    console.log("user.setUserVars: obj", obj);
    return new Promise((resolve, reject) => {
        currentUser.fbID = obj.fbID ? obj.fbID : currentUser.fbID;
        currentUser.uid = obj.uid ? obj.uid : currentUser.uid;
        currentUser.email = obj.email ? obj.email : currentUser.email;
        currentUser.displayName = obj.displayName ? obj.displayName : currentUser.displayName;
        resolve(currentUser);
    });
}

function showUser(obj) {
    let userDetails = getUserObj();
    console.log("user.showUser: userDetails:", userDetails);
    $("#currentTemp").html(`${userDetails.weather} F in ${userDetails.zipCode}`);
}

function checkUserFB(userObject) {
    db.getFBDetails(userObject.uid)
        .then((result) => {
            let data = Object.values(result);
            console.log("user: any data?", data.length);
            if (data.length === 0) {
                console.log("need to add this user to FB", data);
                db.addUserFB(makeUserObj(userObject))
                    .then((result) => {
                        console.log("user: user added", result);
                        currentUser.fbID = result;
                        let tmpObj = {
                            fbID: result.name,
                            uid: currentUser.uid,
                            email: currentUser.email,
                            displayName: currentUser.displayName
                        };
                        console.log("temp", tmpObj);
                        db.addFBkey(tmpObj, result.name);
                    });
            } else {
                console.log("user: already a user", data);
                var key = Object.keys(result);
                data[0].fbID = key[0];
                setUserVars(data[0]);

            }
        });
}


function makeUserObj(userObject) {
    let userObj = {
        uid: userObject.uid,
        email: userObject.email,
        displayName: userObject.displayName

    };
    return userObj;
}
/////////////////// Login with email and password
function emailRegister() {
    console.log("you clicked register");
    if ($("#email-input").val() != "" && $("#password-input").val() != "") {
        db.createUser({
            email: $("#email-input").val(),
            password: $("#password-input").val()
        })
            .then((userData) => {
                checkUserFB(userData.uid);
            }, (error) => {
                console.log("Error creating user:", error);
            });
    }
}

function emailLogin() {
    console.log("you clicked email login");
    if ($("#email-input").val() != "" && $("#password-input").val() != "") {
        let account = {
            email: $("#email-input").val(),
            password: $("#password-input").val()
        };
        db.loginUser(account)
            .then((userData) => {
                checkUserFB(userData.uid);
            }, (error) => {
                console.log("Error with login:", error);
            });
    }
}


module.exports = {
    checkUserFB,
    emailRegister,
    emailLogin,
    getUser,
    setUser,
    setUserVars,
    getUserObj,
    showUser,
    setDisplayName,
    changeEmail,
    currentUser
};