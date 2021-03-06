"use strict";

let $ = require('jquery');
let firebase = require("./fb-config");
let imgUpload = require("./img-upload");
let questions = require("./questions");


let printDiv = $('#main');

// for hompage var
let username;
let scaryWord;
let color;
let questionBack;
let questionText;
let hintId;
let cameraId;
let qImage;
let userUpload;
let questionNext;
let galleryUpload;

let signInPage = `<div class="sign-in full-height-100 text-center d-flex flex-column justify-content-center">    
                        <h3>Sign in with Google:</h3>    
                        <a class="d-inline-block">
                            <img id="login" class="round" src="img/sign-in/google-logo.png">
                        </a>
                    </div>`;

function homePage(username) {
    printDiv.append(
        `<div>
            <div class="mx-3 mt-2 d-flex justify-content-between">
                <a class="light-link h4" id="logout">logout</a>
                <a class="light-link h4" id="edit-profile">edit profile</a>
            </div>
            <div class="text-center">
                <img class="round my-5 center-block w-50" src="img/avatar/Art-Investigator-300.png">
                <h1 class="display-3 mt-2">Hi, ${username}!</h1>
                <h1 class="display-5">Ready to investigate?</h1>
                <div class="mt-5 mx-5 d-flex justify-content-around phone-col">
                    <a class="round p-3 circle-link h4 green d-flex align-items-center" id="before">before you enter</a>
                    <a class="round p-3 circle-link h4 yellow d-flex align-items-center" id="during">during the exhibit</a>
                    <a class="round p-3 circle-link h4 red d-flex align-items-center" id="after">at the end<br>of your visit</a>
                </div>
            </div>
            <div class="mx-3 fixed-bottom d-flex justify-content-end">
            <a class="light-link h3 mt-auto p-2" data-popup-open="popup-1" href="#">help!</a>
            <div class="popup" data-popup="popup-1">
                <div class="popup-inner">
                    <h3>Select "before you enter" if it's your first time visting the exhibit.<br><br>If you would like to get straight into gameplay select "during your visit".<br><br>View "at the end of your visit" if you'd like to see what you did on your visit!</h3>

                    <p><a data-popup-close="popup-1" href="#">Close</a></p>
                    <a class="popup-close" data-popup-close="popup-1" href="#">x</a>
                </div>
            </div>
                <script>
                    $(function() {
                        //----- OPEN
                        $('[data-popup-open]').on('click', function(e)  {
                        var targeted_popup_class = jQuery(this).attr('data-popup-open');
                        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
                        e.preventDefault();
                        });
                        //----- CLOSE
                        $('[data-popup-close]').on('click', function(e)  {
                        var targeted_popup_class = jQuery(this).attr('data-popup-close');
                        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
                        e.preventDefault();
                        });
                    });
                </script>
                </div>
        </div>`);
}


function editProfilePage(username, email) {
    printDiv.append(
        `<div>
            <div class="px-3 my-5 d-flex justify-content-between border-medium-bottom">
                <a class="dark-link h3" id="edit-cancel">cancel</a>
                <a class="dark-link h3" id="edit-save">save</a>
            </div>
            <div class="text-center">
                <img class="round my-5 center-block w-50" id="change-avatar" src="img/avatar/Art-Investigator-300.png">
                <br>
                <div class="mt-5 mx-5 border-medium-top">
                    <div class="d-flex flex-row justify-content-center py-4 border-medium-bottom">
                        <span class="h3">username:</span>
                        <input type="text" class="form-control ml-3" id="username" value="${username}">
                    </div>
                    <div class="d-flex flex-row justify-content-center py-4 border-medium-bottom">
                        <span class="h3">email:</span>
                        <input type="text" class="form-control ml-3" id="email" value="${email}">
                    </div>
                </div>
            </div>
        </div>`);
}

let vulnerablePage = `<div class="background-black pb-5">
                        <div class="full-height-100">
                            <div class="mx-4 pt-4 d-flex justify-content-between">
                                <a id="vulnerable-back" class="circle-button round d-flex justify-content-center align-items-center">
                                    <i class="fas fa-angle-left fa-2x"></i>
                                </a>
                                <a id="home" class="circle-button round d-flex justify-content-center align-items-center">
                                    <i class="fas fa-home fa-lg"></i>
                                </a>
                            </div>
                            <div class="m-5 p-4 square-border rounded">
                                <h2 class="display-4 white-text">Do you know what it means to feel</h2>
                                <a data-popup-open="popup-2"><h1 class="display-3 white-text"><u>vulnerable</u>?</h1></a>
                            </div>
                            <div class="tall d-flex align-items-end justify-content-center">
                                <a href="#page-2"><i id="scrolldown" class="fas fa-angle-down fa-5x"></i></a>
                            </div>
                        </div>
                        <div class="background-black tall">
                            <div id="page-2" class="mt-5 mr-0 ml-5 pl-5 pr-4 yellow rounded-left">
                                <h2>The artist, Nick Cave, was feeling alone. He felt like people didn’t like him or care about him. He was scared. He felt</h2>
                                <h1>vulnerable.</h1>
                            </div>
                            <div class="mr-5 mt-5 mb-5 p-3 square-border rounded negative-left">
                                <h2 class="p-3 white-text">Do you know what it’s like to be scared or feel alone?</h2>
                                <h4 class="p-3 white-text text-center">type one of your fears in the hole below and press enter.</h4>
                            </div>
                            <div class="d-flex justify-content-center center-block">
                                <div class="hole yellow d-flex align-items-center">
                                    <input id="hole" type="text" class="form-control m-3 background-black p-3 d-flex align-items-center">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="popup" data-popup="popup-2">
                        <div class="popup-inner">
                            <h2>vul·ner·a·ble</h2><h3>Open to being wounded or hurt either emotionally or physically.</h3>

                            <p><a data-popup-close="popup-2" href="#">Close</a></p>
                            <a class="popup-close" data-popup-close="popup-2" href="#">x</a>
                        </div>
                    </div>
                    <script>
                        $(function() {
                            //----- OPEN
                            $('[data-popup-open]').on('click', function(e)  {
                            var targeted_popup_class = jQuery(this).attr('data-popup-open');
                            $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
                            e.preventDefault();
                            });
                            //----- CLOSE
                            $('[data-popup-close]').on('click', function(e)  {
                            var targeted_popup_class = jQuery(this).attr('data-popup-close');
                            $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
                            e.preventDefault();
                            });
                        });
                    </script>`;

function scaryWordPage(scaryWord) {
    printDiv.append(
        `<div class="full-height-100 background-black">
            <div class="background-black pb-5">
                <div class="mx-4 pt-4 d-flex justify-content-between">
                    <a id="scary-word-back" class="circle-button round d-flex justify-content-center align-items-center">
                        <i class="fas fa-angle-left fa-2x"></i>
                    </a>
                    <a id="home" class="circle-button round d-flex justify-content-center align-items-center">
                        <i class="fas fa-home fa-lg"></i>
                    </a>
                </div>
                <div class="canvas d-flex justify-content-center">
                    <div id="canvas" class="align-self-center">
                        <h1 class="display-2 white-text shake">${scaryWord}</h1>
                    </div>
                </div>
                <div class="background-black">
                    <div class="green mx-5 p-4">
                        <h2>That’s really scary! Did you know everyone is scared of something?</h2>
                        <div class=" green mx-3 d-flex justify-content-end">
                            <a id="next-scary-word" class="circle-button round d-flex justify-content-center align-items-center">
                                <i class="fas fa-angle-right fa-2x"></i>
                            </a>
                    </div>
                </div>
            </div>
        </div>`);
}

function wordCloudPage() {
    printDiv.append(`<div>
                        <div class="mx-4 pt-4 d-flex justify-content-between">
                            <a id="word-cloud-back" class="circle-button round d-flex justify-content-center align-items-center">
                                <i class="fas fa-angle-left fa-2x"></i>
                            </a>
                            <a id="home" class="circle-button round d-flex justify-content-center align-items-center">
                                <i class="fas fa-home fa-lg"></i>
                            </a>
                        </div>
                        <div class="canvas"></div>
                            <script>
                            </script>
                        <div class="background-black">
                            <div class="yellow p-5">
                                <h2>Here are the fears that everyone shared. Can you see yours?</h2>
                                <div class="mx-3 d-flex justify-content-end">
                                    <a id="next-word-cloud" class="circle-button round d-flex justify-content-center align-items-center">
                                        <i class="fas fa-angle-right fa-2x"></i>
                                    </a>
                                </div>
                    
                            </div>
                    </div>`
    );
}

let armorPage = `<div class="full-height background-black pb-5">
                    <div class="mx-4 pt-4 d-flex justify-content-between">
                        <a id="armor-back" class="circle-button round d-flex justify-content-center align-items-center">
                            <i class="fas fa-angle-left fa-2x"></i>
                        </a>
                        <a id="home" class="circle-button round d-flex justify-content-center align-items-center">
                            <i class="fas fa-home fa-lg"></i>
                        </a>
                    </div>
                    <div class="mr-5 mt-5 mb-5 p-3 square-border rounded negative-left">
                        <h2 class="p-3 white-text">Nick’s fear was being treated differently from the people around him because he didn’t look like them, talk like them, or
                        grow up like them - so Nick did something to face his fear.<br><br>To make himself feel better, Nick started making armor but not the kind knights or soldiers wear.</h2> 
                        <h2 class="p-3 white-text">Nick made his armour with what was around him, things that were discarded, things that made him feel strong.</h2>
                        <h1 class="p-3 display-4 white-text">do you have armor that makes you feel strong?</h1>
                        <div class="mx-3 pb-3 d-flex justify-content-end">
                            <a class="circle-button round d-flex justify-content-center align-items-center">
                                <i id="during" class="fas fa-angle-right fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </div>`;

let ispyInstructionsPage = `<div class="yellow pb-5 full-height">
                                <div class="mx-4 pt-4 d-flex justify-content-between">
                                    <a id="ispy-instructions-back" class="invisible circle-button round d-flex justify-content-center align-items-center">
                                        <i class="fas fa-angle-left fa-2x"></i>
                                    </a>
                                    <a id="home" class="circle-button round d-flex justify-content-center align-items-center">
                                        <i class="fas fa-home fa-lg"></i>
                                    </a>
                                </div>
                                <div class="m-5 p-3 square-border-black rounded">
                                    <h1 class="p-3 display-3 text-center">Can you find?</h1>
                                    <h2 class="p-3">Use your detective skills to search through the exhibit for hidden surprises in Nick Cave's art. If you need a hint in your searching, click the hint button. Once you find the object take a picture and see how you did!</h2>
                                </div>
                                <div class="d-flex justify-content-center p-5">
                                    <a class="square-border-black background-white p-3"><h1 id="ispy-letsgo" class="d-inline-block">let's go!</h1></a>
                                </div>
                            </div>`;

function ispyMain(color, questionText, qImage, ID) {
    printDiv.empty('');
    printDiv.append(
        `<div id="iSpyMain" class="${color} pb-5 full-height">
            <div class="mx-4 pt-4 d-flex justify-content-between">
                <a id="questionBack" class="d-inline-block invisible circle-button round d-flex justify-content-center align-items-center">
                    <i class="fas fa-angle-left fa-2x"></i>
                </a>
                <a id="home" class="d-inline-block circle-button round d-flex justify-content-center align-items-center">
                    <i class="fas fa-home fa-lg"></i>
                </a>
            </div>
            <div class="m-5 p-3 square-border-black rounded background-white">
                <h1 class="p-3 display-3 text-center">${questionText}</h1>
                <div class="d-flex justify-content-around mt-4">
                    <a id="hintId" class="visible display-4">hint</a>
                    <a id="cameraID" class="display-4">camera</a>
                </div>
            </div>
            <div class="${color} pb-5 px-5 d-flex justify-content-around mt-4 phone-col">
                <img id="hintImg" class="invisible q-img square-border-black" src="${qImage}">
                <img id="userUpload" class="invisible q-img square-border-black" src="${userUpload}">
            </div>
            <div class="mx-3 mb-3 fixed-bottom d-flex justify-content-end">
                <a id="iSpyNext" data-popup-open="popup-3" class="invisible circle-button round d-flex justify-content-center align-items-center">
                    <i class="fas fa-angle-right fa-2x"></i>
                </a>
            </div>
        </div>
        <div class="popup" data-popup="popup-3">
                <div class="popup-inner">
                    <h3 class="text-center">You found them all!</h3><br><h3>Click the home button to see all you've acomplished!</h3>

                    <p><a data-popup-close="popup-3" href="#">Close</a></p>
                    <a class="popup-close" data-popup-close="popup-3" href="#">x</a>
                </div>
        </div>`);
}

function imageUpload() {
    printDiv.append(
        `<div class="green pb-5 full-height">
            <div class="tall-15"></div>
            <div class="background-white p-4 square-border-black">
                <div class="mx-4 pt-4 d-flex justify-content-between">
                    <a class="circle-button round d-flex justify-content-center align-items-center">
                        <i id="cancelUpload" class="d-inline-block fas fa-times fa-lg"></i>
                    </a>
                </div>
                <div class="mt-4 d-flex justify-content-center align-items-center flex-column">
                    <input id="uploader" class="text-center" type="file">                    
                    <br>
                    <div class="background-white m-4 d-flex justify-content-center align-items-center square-border-black q-img">
                        <img id="theuploaded" src="" height="200" alt="Image preview...">
                    </div>
                </div>
                <div class="mx-3 mb-3 d-flex justify-content-end">
                    <a id="savecircle" class="circle-button round d-flex justify-content-center align-items-center">
                        <i id="save" class="d-inline-block fas fa-check fa-lg"></i>
                    </a>
                </div>
            </div>
        </div>`
    );
}

function ispyGallery(color, questionText, ID) {
    printDiv.empty('');
    printDiv.append(
        `<div class="${color} pb-5 full-height">
            <div class="mx-4 pt-4 d-flex justify-content-between">
                <a id="questionBack" class="invisible circle-button round d-flex justify-content-center align-items-center">
                    <i class="fas fa-angle-left fa-2x"></i>
                </a>
                <a id="home" class="d-inline-block circle-button round d-flex justify-content-center align-items-center">
                    <i class="fas fa-home fa-lg"></i>
                </a>
            </div>
            <div class="m-5 p-3 square-border-black rounded background-white">
                <h1 class="p-3 display-3 text-center">${questionText}</h1>
                <div class="d-flex justify-content-around mt-4">
                    <a id="cameraID" class="display-4">camera</a>
                </div>
            </div>
            <div class="d-flex justify-content-around mt-4 phone-col">
                <img id="userUpload" class="invisible q-img square-border-black" src="${userUpload}">
            </div>
            <div class="mx-3 mb-3 fixed-bottom d-flex justify-content-end flex-wrap">
                <a id="iSpyNext" data-popup-open="popup-3" class="invisible circle-button round d-flex justify-content-center align-items-center">
                    <i class="fas fa-angle-right fa-2x"></i>
                </a>
            </div>
        </div>
        <div class="popup" data-popup="popup-3">
            <div class="popup-inner">
                <h3 class="text-center">You found them all!</h3><br><h3>Click the home button to see all you've acomplished!</h3>

                <p><a data-popup-close="popup-3" href="#">Close</a></p>
                <a class="popup-close" data-popup-close="popup-3" href="#">x</a>
            </div>
        </div>`
    );
}


let ispyGalleryUpload = `<img class="g-img square-border-black m-4" src="${galleryUpload}">`;

function after(username, scaryWord, img) {


    printDiv.append(
        `<div class="yellow">
                <div class="mx-4 pt-4">
                <a id="after-back" class="circle-button round d-flex justify-content-center align-items-center">
                    <i class="fas fa-angle-left fa-2x"></i>
                </a>
                <div class="text-center">
                    <div class="m-4 square-border-black rounded background-white">
                        <h1 class="display-3 mt-2">Hi, ${username}!</h1>
                        <h2 class="display-5">Here's some things you did today!</h2>
                        <img class="round my-5 center-block after-img" src="img/avatar/Art-Investigator-300.png">
                        <h2 class="pb-2">You learned that <i>${scaryWord}</i> is something that you can conquer!</h2>
                    </div>
                    <br>
                    <div class="m-4 square-border-black rounded background-white">
                        <h3 class="py-2">Here are some pictures you took:</h3>
                    </div>    
                    <div id="afterImg" class="mt-5 mx-4 d-flex justify-content-around flex-column">
                    <div>
                </div>
            </div>`);

    if (img.id_0 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[0].q}</h2>
                        </div>
                        <div class="col-sm">                        
                            <img class="square-border-black q-img" src="${img.id_0}"></div>
                        </div>        
                    </div>
                </div>
            </div>`);
    }
    if (img.id_1 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                    <div class="row">
                        <div class="d-flex m-3 align-items-center phone-col">
                             <div class="col-sm">
                                <h2>${questions.questionArray[1].q}</h2>
                            </div> 
                            <div class="col-sm">
                                <img class="square-border-black q-img" src="${img.id_1}"></div>
                            </div>       
                        </div>
                    </div>
                </div>`);    
    }
    if (img.id_2 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                        <div class="row">
                            <div class="d-flex m-3 align-items-center phone-col">
                                <div class="col-sm">
                                    <h2>${questions.questionArray[2].q}</h2>
                                </div>
                                <div class="col-sm">                        
                                    <img class="square-border-black q-img" src="${img.id_2}"></div>
                                </div>        
                            </div>
                        </div>
                    </div>`);
    }
    if (img.id_3 != undefined) {
        $("#afterImg").append(`
          <div class="container my-5 p-3 square-border-black rounded background-white">
                        <div class="row">
                            <div class="d-flex m-3 align-items-center phone-col">
                                 <div class="col-sm">
                                    <h2>${questions.questionArray[3].q}</h2>
                                </div>
                                <div class="col-sm">
                                    <img class="square-border-black q-img" src="${img.id_3}"></div>
                                </div>       
                            </div>
                        </div>
                    </div>`);
    }
    if (img.id_4 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                            <div class="row">
                                <div class="d-flex m-3 align-items-center phone-col">
                                    <div class="col-sm">
                                        <h2>${questions.questionArray[4].q}</h2>
                                    </div>
                                    <div class="col-sm">                        
                                        <img class="square-border-black q-img" src="${img.id_4}"></div>
                                    </div>        
                                </div>
                            </div>
                        </div>`);
    }
    if (img.id_5 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[5].q}</h2>
                        </div>  
                        <div class="col-sm">
                            <img class="square-border-black q-img" src="${img.id_5}"></div>
                        </div>      
                    </div>
                </div>
            </div>`);
    }
    if (img.id_6 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[6].q}</h2>
                        </div>
                        <div class="col-sm">                        
                            <img class="square-border-black q-img" src="${img.id_6}"></div>
                        </div>        
                    </div>
                </div>
            </div>`);
    }
    if (img.id_7 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[7].q}</h2>
                        </div> 
                        <div class="col-sm">
                            <img class="square-border-black q-img" src="${img.id_7}"></div>
                        </div>      
                    </div>
                </div>
            </div>`);
    }
    if (img.id_8 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[8].q}</h2>
                        </div>
                        <div class="col-sm">                        
                            <img class="square-border-black q-img" src="${img.id_8}"></div>
                        </div>        
                    </div>
                </div>
            </div>`);
    }
    if (img.id_9 != undefined) {
        $("#afterImg").append(`
             <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[9].q}</h2>
                        </div> 
                        <div class="col-sm">
                            <img class="square-border-black q-img" src="${img.id_9}"></div>
                        </div>      
                    </div>
                </div>
            </div>`);
    }
    if (img.id_10 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[10].q}</h2>
                        </div>
                        <div class="col-sm">                        
                            <img class="square-border-black q-img" src="${img.id_10}"></div>
                        </div>        
                    </div>
                </div>
            </div>`);
    }
    if (img.id_11 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[11].q}</h2>
                        </div> 
                        <div class="col-sm">
                            <img class="square-border-black q-img" src="${img.id_11}"></div>
                        </div>      
                    </div>
                </div>
            </div>`);
    }
    if (img.id_12 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[12].q}</h2>
                        </div>
                        <div class="col-sm">                        
                            <img class="square-border-black q-img" src="${img.id_12}"></div>
                        </div>        
                    </div>
                </div>
            </div>`);
    } 
    if (img.id_13 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[13].q}</h2>
                        </div> 
                        <div class="col-sm">
                            <img class="square-border-black q-img" src="${img.id_13}"></div>
                        </div>     
                    </div>
                </div>
            </div>`);
    }
    if (img.id_14 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[14].q}</h2>
                        </div>
                        <div class="col-sm">                        
                            <img class="square-border-black q-img" src="${img.id_14}"></div>
                        </div>        
                    </div>
                </div>
            </div>`);
    }
    if (img.id_15 != undefined) {
        $("#afterImg").append(`
            <div class="container my-5 p-3 square-border-black rounded background-white">
                <div class="row">
                    <div class="d-flex m-3 align-items-center phone-col">
                        <div class="col-sm">
                            <h2>${questions.questionArray[15].q}</h2>
                        </div> 
                        <div class="col-sm">
                            <img class="square-border-black q-img" src="${img.id_15}"></div>
                        </div>    
                    </div>
                </div>
            </div>`);
    }
}

module.exports = {
    signInPage,
    homePage,
    editProfilePage,
    vulnerablePage,
    scaryWordPage,
    wordCloudPage,
    armorPage,
    ispyInstructionsPage,
    ispyMain,
    ispyGallery,
    ispyGalleryUpload,
    imageUpload,
    after
};