"use strict";

let $ = require('jquery');

let printDiv = $('#main');


function print(html) {
    printDiv.append(html);
}

module.exports = { print };