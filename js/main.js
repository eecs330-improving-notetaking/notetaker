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

userNameInput = document.getElementById("username-field")
userNameInput.addEventListener("keyup", function(e){
    e.preventDefault();
    if(e.keyCode === 13){
	logIn();
	document.getElementById("sign-in-button").click();
    }
});

