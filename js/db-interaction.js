"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./fb-config"),
    provider = new firebase.auth.GoogleAuthProvider();

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

// POST - Submits data to be processed to a specified resource.
// GET - Requests/read data from a specified resource
// PUT - Update data to a specified resource.

function getFBDetails(user) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user.json?orderBy="uid"&equalTo="${user}"`
    }).done((resolve) => {
        return resolve;
    }).fail((error) => {
        return error;
    });
}

function addUserFB(userObj) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user.json`,
        type: 'POST',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((fbID) => {
        return fbID;
    });
}

function addFBkey(obj, key) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user/${key}.json`,
        type: 'PATCH',
        data: JSON.stringify(obj),
        dataType: 'json'
    });
}

function updateUserFB(userObj) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user/${userObj.fbID}.json`,
        type: 'PATCH',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((userID) => {
        return userID;
    });
}

// remember firebase returns a promise
function createUser(userObj) {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error:", errorCode, errorMessage);
        });
}

function loginUser(userObj) {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error:", errorCode, errorMessage);
        });
}

function logInGoogle() {
    //all firebase functions return a promise!! Add a then when called
    return firebase.auth().signInWithPopup(provider);
}

function logOut() {
    return firebase.auth().signOut();
}


function uploadStorageBucket(file) {
    const ref = firebase.storage().ref();
    const name = (+new Date()) + '-' + file.name;
    const metadata = { contentType: file.type };
    const task = ref.child(name).put(file, metadata);

    task.then((snapshot) => {
        const url = snapshot.downloadURL;
        console.log(url);
        document.querySelector('#theuploaded').src = url;
        $("#save").removeClass("disabled");
        $("#savecircle").removeClass("disabled-border");

    }).catch((error) => {
        console.error(error);
    });
}

module.exports = {
    getFBDetails,
    addUserFB,
    updateUserFB,
    createUser,
    loginUser,
    logInGoogle,
    logOut,
    addFBkey,
    uploadStorageBucket
};