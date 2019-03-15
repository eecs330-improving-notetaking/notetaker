/*
  This js file handles
  all interaction on the
  class view page.

  Assumes index.html (and
  main.js) have been loaded
  already. This gives us access
  to the 'user' global var
*/
class schoolClass //instead of this, just require main on each page! or something
{
    constructor(name, number, description, notes)
    {
	this.name = name;
	this.number = number;
	this.description = description;
	this.notes = notes || []; //empty list of notes
	this.dates = {}; //"Wednesday : "10 AM - 12AM"
    }

}

//get the info about our user from before / login page
var user = localStorage.getItem("user");
while(typeof(user) == "string"){
    user = JSON.parse(user)
}

console.log("logged in", user);
addClassesToPage(user);

document.getElementById("title").innerHTML =
    `Hello ${user.username}, welcome to the Note Garden!`;

function newClass()
{
    console.log('making a new class');
    // document.append a
    // div with class='class' etc.

    // have it link to class1.html page!
}



function openClassPage(e) {
    e = e || window.event; //SO https://stackoverflow.com/questions/9012537/how-to-get-the-element-clicked-for-the-whole-document
    var target = e.target || e.srcElement;
    let targetIndex = -1;
    while(target.className != "class"){
	if(target.className == "class-title"){
	    break;
	}
	else{
	    target = target.parentElement
	}

    }
    target = target.children[0];
    var text = target.textContent || target.innerText;
    console.log(target);
    console.log(text);
    text = text.replace(/\s/g, '');
    for(let i = 0; i < user.classes.length; ++i)
    {
	if (text == user.classes[i].name.replace(/\s/g, '')){
	    targetIndex = i;
	    break;
	}
    }
    console.log(targetIndex);
    if(targetIndex == -1){
	alert('an error occured')
    }
    user.currentClassIndex = targetIndex;
    location.href = 'class.html'
}

classes = document.getElementsByClassName("class");
if(classes != undefined){
    for(i = 0; i < classes.length; ++i) {
	if (classes[i].id == "new-class")
	{
	    classes[i].onclick = newClass;
	}
	else
	{
	    classes[i].onclick = openClassPage;
	}
    }
}

function addClassesToPage(user)
{
    if( user === null || user === undefined)
    {
	alert('Please change your browser to use cookies!')
    };
    var classesElement = document.getElementById('user-classes')
    for(let i = 0; i<user.classes.length; ++i)
    {
	currClass = user.classes[i];
	console.log(currClass.dates);
	template = `
    <div class="class">
	<div class="class-title">
	    ${currClass.name}
	</div>
	<div class="class-number">
	    ${currClass.number}
	</div>
	<hr>
	<div class="class-info">
	    ${currClass.description}
	</div>
	<div class="class-time">
	<hr> <!-- currClass.dates -->
${makeDatesHTML(currClass.dates)}
	</div>
    </div>
    `
	classesElement.innerHTML += template;
    }
}

// Get the modal
var modal = document.getElementById('new-class-popup');

// Get the button that opens the modal

// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal
document.getElementById("new-class").onclick = function() {
  modal.style.display = "block";
}

// When the user X, close the modal
var span = document.getElementById("popup-close");
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


document.getElementById("submit-new-class-btn").onclick = function(){
    console.log("pressed new calss btn");
    className = document.getElementById("new-class-name").value;
    classNumber =  document.getElementById("new-class-number").value;
    classDesc = document.getElementById("new-class-desc").value;
    console.log(className, classNumber, classDesc);
    if(className == "" || classNumber == "" || classDesc == "") {
	alert("please fill in all the fields!");
	return;
    }
    let newClass = new schoolClass(className, classNumber, classDesc);

    newClass.dates = getDates();
    if( newClass.dates == false ) {
	return;
    }

    user.classes.push(newClass);

    //user is saved automatically by beforeonload event
    location.reload();
    //make a new class! refresh the page or add child?
}
window.onbeforeunload = function(){
    saveCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
};


function getDates() {
    var result = {};

    var days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
    var checks = ["MondayCheck", "TuesdayCheck", "WednesdayCheck", "ThursdayCheck", "FridayCheck"];
    var starts = ["MondayStart", "TuesdayStart", "WednesdayStart", "ThursdayStart", "FridayStart"];
    var ends = ["MondayEnd", "TuesdayEnd", "WednesdayEnd", "ThursdayEnd", "FridayEnd"];

    for( let i = 0; i < checks.length; i++) {
	if( document.getElementById(checks[i]).checked ) {
	    var start = makeUsTime(document.getElementById(starts[i]).value);
	    var end = makeUsTime(document.getElementById(ends[i]).value);
	    if(start.includes("undefined") || end.includes("undefined")) {
		alert("Please complete the times section of the form");
		return false;
	    }
	    var day = days[i];
	    result[day] = start + ' - ' + end
	    console.log(start, end);
	}
    }
    if( Object.keys(result).length == 0 ) {
	alert("Please complete the times section of the form");
	return false;
    }

    return result;
}

function makeUsTime(time) {
    let hour = time.split(':')[0];
    let min = time.split(':')[1];
    let is_pm = false;
    if( parseInt(hour) > 12 ){
	is_pm = true;
	hour = '' + (parseInt(hour) - 12);
    }
	
    console.log( hour + ':' + min + ' ' + (is_pm ? 'PM' : 'AM' ) );
    return hour + ':' + min + ' ' + (is_pm ? 'PM' : 'AM' );
}

function makeDatesHTML(dates) {
    if(!dates) return "Monday: 1:00 pm - 3:30 pm <br>";
    result = ""
    Object.keys(dates).forEach(function(key) {
	result += ` ${key}: ${dates[key]}  <br> `;
    })
    return result;
}

function saveCurrentUser(curr)
{
    //while(true){};
    console.log("saving user to allusers");
    let allUsers = localStorage.getItem("users");
    while(typeof(allUsers) == "string"){
	allUsers = JSON.parse(allUsers);
    }

    if(!curr.username in allUsers)
    {
	alert("Data was curropted, please enable cookies");
	console.log("something is wrong with the cookies, root.js 12");
    }

    allUsers[curr.username] = curr;
    localStorage.setItem("users", JSON.stringify(allUsers));
    return;
}

function check(i){
  console.log(i);
  var checks = ["MondayCheck", "TuesdayCheck", "WednesdayCheck", "ThursdayCheck", "FridayCheck"]
  var starts = ["MondayStart", "TuesdayStart", "WednesdayStart", "ThursdayStart", "FridayStart"]
  var ends = ["MondayEnd", "TuesdayEnd", "WednesdayEnd", "ThursdayEnd", "FridayEnd"]
  var checked = document.getElementById(checks[i]).checked;
  console.log(checked);
  if (checked){
    document.getElementById(starts[i]).disabled = false;
    document.getElementById(ends[i]).disabled = false;
  } else {
    document.getElementById(starts[i]).disabled = true;
    document.getElementById(ends[i]).disabled = true;
  }
}

document.getElementsByClassName("back-button")[0].onclick = function() {
    location.href = "index.html";
}
