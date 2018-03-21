"use strict";

let $ = require('../lib/node_modules/jquery');
let html = require("./html-cont");

let main = $("#iSpyMain");

function playISpy(array){
    let question = array[0].q01;
    let hintImg = array[0].hint;
    let nextID = array[0].id;

    html.ispyMain("yellow", question, hintImg, nextID);

}
module.exports = {playISpy};
// function backgroundColor(){
//     switch (random) {
//         case 0:
//             main.addClass("red");
//             break;
//         case 1:
//             main.addClass("orange");
//             break;
//         case 3:
//             main.addClass("yellow");
//             break;
//         case 4:
//             main.addClass("green");
//             break;
//         case 5:
//             main.addClass("blue");
//             break;
//         case 6:
//             main.addClass("violet");
//             break;
//     }
// }


// color, questionText, hintID, qImage, questionNext
// this function neeeds to randomize a background color
// give a question
// give a hint image
// give a randomized ID