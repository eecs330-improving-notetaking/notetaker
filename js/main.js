/*
  the main js file
  loaded when user loads index.html
*/

console.log('loaded main.js');
var user = {
    username : ""
}

//called by the Log In button
function logIn()
{
    console.log("logged in user:", user);

    userField = document.getElementById("username-field").value;
    console.log("userField is", userField)
    // then redirect:
    if(userField != "")
    {
	user.username = userField;
	location.href = "classview.html";
    }
    else
    {
	alert("please enter a username");
    }
}
document.getElementById('sign-in-button').onclick = logIn;

