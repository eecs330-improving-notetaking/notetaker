/*
  the main js file
  loaded when user loads index.html
*/

class schoolClass
{
    constructor(name, number, description, notes)
    {
	this.name = name;
	this.number = number; 
	this.description = description;
	this.notes = notes || [] //empty list of notes
    }

}

console.log('loaded main.js');
var user = localStorage.getItem("user")
if(user == undefined || user == null)
{
    console.log("new user!");
    user = {
	username : "",
	classes : [
	    new schoolClass('Human Computer Interaction',
			    'EECS 330',
			    'This is a great class about web interfaces'),
	    new schoolClass('Bioethics',
			    'PHIL 269',
			    'This class is sooooo interesting wow')
	],

    }
}
else
{
    console.log("returning user!");
    user = JSON.parse(user);
}
if(!navigator.cookieEnabled)
{ alert("please enable cookies! \n " +
	"Settings > Privacy > Content > Cookies > Allow 3rd Party Sites to set Cookies")
}
localStorage.setItem("user", JSON.stringify(user))

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

