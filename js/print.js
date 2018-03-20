"use strict";

let $ = require('jquery');

let printDiv = $('#main');


function appendMain(html) {
    printDiv.empty('');
    printDiv.append(html);
}


module.exports = { appendMain };
