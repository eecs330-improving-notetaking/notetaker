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
var user = localStorage.getItem("user");
while(typeof(user) == "string"){
    user = JSON.parse(user)
}

console.log("logged in", user);
addClassesToPage(user);

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
	alert('an error occured, conact your local Dillon')
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
    console.log("pressed new calss btn");
    className = document.getElementById("new-class-name").value;
    classNumber =  document.getElementById("new-class-number").value;
    classDesc = document.getElementById("new-class-desc").value;
    console.log(className, classNumber, classDesc);
    if(className == "" || classNumber == "" || classDesc == "") {
	alert("please fill in all the fields!");
    }
    user.classes.push(new schoolClass(className, classNumber, classDesc));
    //save our user first!
    //localStorage.setItem('user', JSON.stringify(user));
    console.log("saved user supposedly");
    location.reload();
    //make a new class! refresh the page or add child?
}
window.onbeforeunload = function(){
    saveCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
};



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
