"use strict";

let $ = require('../lib/node_modules/jquery');
let html = require("./html-cont");

let main = $("#iSpyMain");

function playISpy(array){
    let color = randColor(colorList);
    let question = array[0].q01;
    let hintImg = array[0].hint;
    let nextID = array[0].id;

    html.ispyMain(color, question, hintImg, nextID);

}

var colorList = ["red", "orange", "yellow", "green", "blue", "purple"];

var randColor = function (colors) {
    var choice = Math.floor(Math.random() * colors.length);
    return colors[choice];
};

module.exports = {playISpy};


// color, questionText, hintID, qImage, questionNext
// this function neeeds to randomize a background color
// give a question
// give a hint image
// give a randomized ID