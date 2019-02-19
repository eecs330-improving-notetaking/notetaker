/*
  the main js file
  loaded when user loads index.html
*/

console.log('loaded main.js');
var user = {
    name : "new user"
}

//called by the Log In button
function logIn()
{
    console.log("logged in user:", user);

    // TODO if the fields are filled in...

    // then redirect:
    location.href = "classview.html";
}
document.getElementById('sign-in-button').onclick = logIn;

