"use strict";

// for hompage var
let username;

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