/*
  loaded when user loads index.html
  
TODO: update the 'save user' method in other js files, maybe have them inherit it
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
class Note
{
    constructor(date, topic, content)
    {
	this.date = date;
	this.topic = topic;
	this.content = content || "";
	this.NOfReviews = 0; //TODO maybe 1 instead?
    }
}
console.log('loading main.js');
function loadUser(username)
{
    // load / initialize 'users' in localstorage
    var users = localStorage.getItem("users")
    if(users == undefined || users == null)
    {
	console.log("no users in the local storage");
	users = {
	    "bob" : {
		username : "bob",
		classes : [
		    new schoolClass('Human Computer Interaction',
				    'EECS 330',
				    'This is a great class about web interfaces'),
		    new schoolClass('Bioethics',
				    'PHIL 269',
				    'This class is sooooo interesting wow')
		],
		currentClassIndex : -1, //current class we're viewing, none atm
	    }
	}
	localStorage.setItem("users", JSON.stringify(users));
    }
    else
    {
	console.log("users found in local storage");
	users = JSON.parse(users);
	while(typeof(users) == "string") {
	    users = JSON.parse(users);
	}
    }
    if(!navigator.cookieEnabled)
    {
	alert("please enable cookies! \n " +
	      "Settings > Privacy > Content > Cookies > Allow 3rd Party Sites to set Cookies")
    }

    var currentUser;
    if(typeof(users) == "string") { (alert("Cookies Currupted :(")); }
    if(username in users)
    {
	currentUser = users[username];
	console.log("user found! logging in", currentUser);
    }
    else
    {
	users[username] = {
	    username : username,
	    classes : [],
	    currentClassIndex : -1
	}
	currentUser = users[username];
	console.log("new user! making account", currentUser);
    }



    localStorage.setItem("user", JSON.stringify(currentUser))
    //from root.js  vv
    saveCurrentUser(currentUser);
}

//called by the Log In button
function logIn()
{
    //console.log("logged in user:", user);
    userField = document.getElementById("username-field").value;
    if( userField == "") {
	alert("Please enter a username.")
	return;
    }
    if( document.getElementById("password-field").value == ""){
	alert("Please enter a password.");
	return;
    }

    // then redirect:
    if(userField != "")
    {
	loadUser(userField);
	//console.log("would have redirected here...");
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

passwordInput = document.getElementById("password-field")
passwordInput.addEventListener("keyup", function(e){
    e.preventDefault();
    if(e.keyCode === 13){
	logIn();
	document.getElementById("sign-in-button").click();
    }
});


//credit: W3 schools for all the modals here
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("new-account-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




function logInNewUser()
{
    //console.log("logged in user:", user);
    userField = document.getElementById("username-new-account").value;
    if(document.getElementById("password-new-account").value == ""){
	alert("Please complete the form.");
	return;
    }
    // then redirect:
    if(userField != "")
    {
	loadUser(userField);
	//console.log("would have redirected here...");
	location.href = "classview.html";
    }
    else
    {
	alert("Please complete the form.");
    }
}
document.getElementById('submit-new-account').onclick = logInNewUser;

document.getElementById("username-new-account").addEventListener("keyup", function(e){
    e.preventDefault();
    if(e.keyCode === 13){
	document.getElementById("submit-new-account").click();
    }
});


document.getElementById("password-new-account").addEventListener("keyup", function(e){
    e.preventDefault();
    if(e.keyCode === 13){
	document.getElementById("submit-new-account").click();
    }
});
