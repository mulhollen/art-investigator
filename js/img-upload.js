"use strict";
let $ = require('../lib/node_modules/jquery');
let db = require("./db-interaction");

function previewFile(fileUpload) {
    // console.log("file upload", fileUpload);

    var preview = document.querySelector('img'); //selects the query named img
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }

    console.log("making it to uploadStorageBucket");
    db.uploadStorageBucket(file);

}

module.exports = {previewFile};