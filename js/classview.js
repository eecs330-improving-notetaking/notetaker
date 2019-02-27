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
	this.notes = notes || [] //empty list of notes
    }

}

//get the info about our user from before / login page
var user = JSON.parse(JSON.parse(localStorage.getItem("user")));

console.log(user);
console.log(typeof(user));
addClassesToPage(user);

function newClass()
{
    console.log('making a new class');
    // document.append a
    // div with class='class' etc.

    // have it link to class1.html page!
}



function openClassPage() {
    location.href = "class1.html";
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
	<hr> <!-- TODO add currClass.meetTimes or something -->
	    Mon: 1-2 pm <br>
	    Wed: 1-2 pm <br>
	    Fri: 11-12pm <br>
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
    className = document.getElementById("new-class-name").value;
    classNumber =  document.getElementById("new-class-number").value;
    classDesc = document.getElementById("new-class-desc").value;
    console.log(className, classNumber, classDesc);
    if(className == "" || classNumber == "" || classDesc == "") {
	alert("please fill in all the fields!");
    }
    user.classes.push(new schoolClass(className, classNumber, classDesc))
    //save our user first!
    //localStorage.setItem('user', JSON.stringify(user));
    location.reload();
    //make a new class! refresh the page or add child?
}
window.onbeforeunload = function(){
    localStorage.setItem('user', JSON.stringify(user));
};
