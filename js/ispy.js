"use strict";

let $ = require('../lib/node_modules/jquery');
let html = require("./html-cont");

let main = $("#iSpyMain");

var colorList = ["red", "orange", "yellow", "green", "blue", "purple"];

let counter = 0;

function playISpy(array){

    if (counter <= 15) {
        console.log("counter hint", array[counter].hint);
        if (array[counter].hint === undefined){
            let color = randColor(colorList);
            let question = array[counter].q;
            let nextID = array[counter].id;

            html.ispyGallery(color, question, nextID);

            counter = counter + 1;
        } else {
            let color = randColor(colorList);
            let question = array[counter].q;
            let hintImg = array[counter].hint;
            let nextID = array[counter].id;

            html.ispyMain(color, question, hintImg, nextID);

            counter = counter + 1;
        }
    }
}

function playLast(position){
    if (position.hint === undefined) {
        let color = randColor(colorList);
        let question = position.q;
        let nextID = position.id;

        html.ispyGallery(color, question, nextID);
    } else {
        let color = randColor(colorList);
        let question = position.q;
        let hintImg = position.hint;
        let nextID = position.id;

        html.ispyMain(color, question, hintImg, nextID);
        $("#hintImg").removeClass("invisible");
    }
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