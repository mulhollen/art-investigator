"use strict";

// for hompage var
let username;
let scaryWord;

let signInPage = `<div class="sign-in column text-center align-middle align-middle h-100">    
                        <h3>Sign in with:</h3>    
                        <a id="login">
                            <img class="round" src="img/sign-in/google-logo.png">
                        </a>
                    </div>`;

let homePage = `<div>
                    <div class="mx-3 mt-2 d-flex justify-content-between">
                        <a class="light-link h4" id="logout">logout</a>
                        <a class="light-link h4" id="edit-profile">edit profile</a>
                    </div>
                    <div class="text-center">
                        <img class="round mt-5 center-block" src="img/avatar/gator.jpg">
                        <h1 class="display-3 mt-2">Hi, ${username}!</h1>
                        <h1 class="display-5">Ready to investigate?</h1>
                        <div class="mt-5 mx-5 d-flex justify-content-around">
                            <a class="round p-3 circle-link h4 green d-flex align-items-center" id="before">before you enter</a>
                            <a class="round p-3 circle-link h4 yellow d-flex align-items-center" id="during">during the exhibit</a>
                            <a class="round p-3 circle-link h4 red d-flex align-items-center" id="after">at the end<br>of your visit</a>
                        </div>
                    </div>
                    <div class="mx-3 fixed-bottom d-flex justify-content-end">
                        <a class="light-link h4 mt-auto p-2" id="help">help!</a>
                    </div>
                </div>`;

let editProfilePage = `<div>
                            <div class="px-3 my-5 d-flex justify-content-between border-medium-bottom">
                                <a class="dark-link h3" id="edit-cancel">cancel</a>
                                <a class="dark-link h3" id="edit-save">save</a>
                            </div>
                            <div class="text-center">
                                <img class="round mt-5 center-block" id="change-avatar" src="img/avatar/gator.jpg">
                                <br>
                                <a class="dark-link h3 mt-3" id="change-avatar">change avatar</a>
                                <div class="mt-5 mx-5 border-medium-top">
                                    <div class="d-flex flex-row justify-content-center py-4 border-medium-bottom">
                                        <span class="h3">username:</span>
                                        <input type="text" class="form-control ml-3" id="username">
                                    </div>
                                    <div class="d-flex flex-row justify-content-center py-4 border-medium-bottom">
                                        <span class="h3">email:</span>
                                        <input type="text" class="form-control ml-3" id="email">
                                    </div>
                                </div>
                            </div>
                        </div>`;

let vulnerablePage = ` <div class="background-black pb-5">
                            <div class="mx-4 pt-4 d-flex justify-content-between">
                                <button id="vulnerable-back" type="button" class="circle-button round">
                                    <i class="fas fa-angle-left fa-2x"></i>
                                </button>
                                <button id="home" type="button" class="circle-button round">
                                    <i class="fas fa-home fa-lg"></i>
                                </button>
                            </div>
                            <div class="m-5 p-4 square-border rounded">
                                <h2 class="display-4 white-text">Do you know what it means to feel</h2>
                                <h1 class="display-3 white-text"><u>vulnerable</u>?</h1>
                            </div>
                            <div class="tall d-flex align-items-end justify-content-center">
                                <a href="#page-2"><i class="fas fa-angle-down fa-5x"></i></a>
                            </div>
                            <div id="page-2" class="mt-5 mr-0 ml-5 pl-5 pr-4 yellow rounded-left">
                                <h2>The artist, Nick Cave, was feeling alone. He felt like people didn’t like him or care about him. He was scared. He felt</h2>
                                <h1>vulnerable.</h1>
                            </div>
                            <div class="mr-5 mt-5 mb-5 p-3 square-border rounded negative-left">
                                <h2 class="p-3 white-text">Do you know what it’s like to be scared or feel alone? scared or feel alone?</h2>
                                <h4 class="p-3 white-text text-center">type one of your fears in the hole below and press enter.</h4>
                            </div>
                            <div class="d-flex justify-content-center center-block">
                                <div class="hole yellow d-flex align-items-center">
                                    <input type="text" class="form-control m-3 background-black p-3 d-flex align-items-center" id="hole">
                                </div>
                            </div>
                        </div>`;

let scaryWordPage = `<div class="background-black pb-5">
                        <div class="mx-4 pt-4 d-flex justify-content-between">
                            <button id="scary-word-back" type="button" class="circle-button round">
                                <i class="fas fa-angle-left fa-2x"></i>
                            </button>
                            <button id="home" type="button" class="circle-button round">
                                <i class="fas fa-home fa-lg"></i>
                            </button>
                        </div>
                        <div class="canvas d-flex justify-content-center">
                            <div id="canvas" class="align-self-center">
                                <h1 class="display-4 white-text">${scaryWord}</h1>
                            </div>
                        </div>
                        <div class="background-black">
                            <div class="green mx-5 p-4">
                                <h2>That’s really scary! Did you know everyone is scared of something? Let’s take a look…</h2>
                                <div class=" green mx-3 d-flex justify-content-end">
                                    <button id="next-scary-word" type="button" class="circle-button round">
                                        <i class="fas fa-angle-right fa-2x"></i>
                                    </button>
                            </div>

                        </div>
                    </div>`;

let wordCloudPage = `<div>
                    <div class="mx-4 pt-4 d-flex justify-content-between">
                        <button id="scary-word-back" type="button" class="circle-button round">
                            <i class="fas fa-angle-left fa-2x"></i>
                        </button>
                        <button id="home" type="button" class="circle-button round">
                            <i class="fas fa-home fa-lg"></i>
                        </button>
                    </div>
                    <div class="canvas">
                        <div id="word-cloud" class="align-self-center">
                            
                        </div>
                    </div>
                    <div class="background-black">
                        <div class="yellow p-5">
                            <h2>Here are the fears that everyone shared. Can you see yours?</h2>
                            <div class="mx-3 d-flex justify-content-end">
                                <button id="next-scary-word" type="button" class="circle-button round">
                                    <i class="fas fa-angle-right fa-2x"></i>
                                </button>
                            </div>
                
                        </div>
                </div>`;

let armorPage = `<div class="background-black pb-5">
                    <div class="mx-4 pt-4 d-flex justify-content-between">
                        <button id="armor-back" type="button" class="circle-button round">
                            <i class="fas fa-angle-left fa-2x"></i>
                        </button>
                        <button id="home" type="button" class="circle-button round">
                            <i class="fas fa-home fa-lg"></i>
                        </button>
                    </div>
                    <div class="mr-5 mt-5 mb-5 p-3 square-border rounded negative-left">
                        <h2 class="p-3 white-text">Nick’s fear was being treated differently from the people around him becuase he didn’t look like them, talk like them or
                        grow up like them. To make himself feel better, Nick started making armor but not the kind knights or soldiers wear.</h2> 
                        <h2 class="p-3 white-text">Nick made his armour with what was around him, things that were discarded, things that made him feel strong.</h2>
                        <h1 class="p-3 display-4 white-text">do you have armor that makes you feel strong?</h1>
                    </div>
                    <div class="mt-5 mr-0 ml-5 pl-5 pr-4 yellow rounded-left">
                        <h2 class="p-5">let's go see the exhibit!</h2>
                    </div>
                </div>`;

module.exports = { signInPage, homePage, editProfilePage, vulnerablePage, scaryWordPage, wordCloudPage, armorPage };