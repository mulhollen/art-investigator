"use strict";

let $ = require('../lib/node_modules/jquery');
let html = require("./html-cont");

let main = $("#iSpyMain");

var colorList = ["red", "orange", "yellow", "green", "blue", "purple"];

let counter = 0;

function playISpy(array){

    if (counter <= 11) {
    let color = randColor(colorList);
    let question = array[counter].q;
    let hintImg = array[counter].hint;
    let nextID = array[counter].id;

    html.ispyMain(color, question, hintImg, nextID);

    counter = counter + 1;
    }
}

function playLast(position){
    let color = randColor(colorList);
    let question = position.q;
    let hintImg = position.hint;
    let nextID = position.id;

    html.ispyMain(color, question, hintImg, nextID);
}


function randColor(colors) {
    var choice = Math.floor(Math.random() * colors.length);
    return colors[choice];
}

module.exports = { playISpy, colorList, randColor, playLast};


// color, questionText, hintID, qImage, questionNext
// this function neeeds to randomize a background color
// give a question
// give a hint image
// give a randomized ID