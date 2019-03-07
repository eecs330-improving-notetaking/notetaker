/*
  class.js - handles all logic for the idividual 'class' page(s). 
  Assumes that the users notes all have a different TOPIC field.
  TODO: additional logic could be added to make sure the user does not have 
  many notes of the same topic
*/


class Note //TODO remove and replace bby including anoher js file like main
{
    constructor(date, topic, content)
    {
	this.date = date;
	this.topic = topic;
	this.content = content || "";
	this.NOfReviews = 0;
    }
}


//load user data
var user = localStorage.getItem("user");
while(typeof(user) == "string"){
    user = JSON.parse(user)
}


if(user === undefined){
    //we don't have a cookie on them, go back to start
    location.href = "index.html"
}
else if(user.currentClassIndex == -1){
    //they haven't selected a class, go back
    location.href = "index.html"
}
else if(user.classes[user.currentClassIndex] === undefined){
    throw "no class at index " + toString(user.currentClassIndex)
}
console.log('loaded user:', user );

document.getElementById('title-class-name').textContent =
    user.classes[user.currentClassIndex].name;

var debug = false;
(function(){
    if(debug)
    {
	for(let i = 0; i < 3; ++i){
	    user.classes[user.currentClassIndex].notes.push(
		new Note(new Date().toJSON().slice(0,10).replace(/-/g,'/'),
			 `Fishing ${i}` ,
			 `Fishing is an a ancient sport that originated ${i+1}000 years ago by a boy of only ${i+2} years. `+
			 `\"Stop!\" His mother would tell him. She feared he would fall victim to the giant sea monsters `+
			 `like his father and ${i+2} brothers. But he was determined to slay the beasts that took his `+
			 `dear family away from him.`))
	}
    }
})();
 


function addAllNotes(){
    if(user.classes[user.currentClassIndex].length == 0)
    {
	alert("no notes");
    }
    //console.log( user.classes[user.currentClassIndex].notes.length);
    let table = document.getElementById('notes-table');
    for(let i = 0; i < user.classes[user.currentClassIndex].notes.length; ++i)
    {
	let isLast = (i == user.classes[user.currentClassIndex].notes.length - 1)
	if (isLast) {
	    var id = "auto-gen-note-last"
	}
	else {
	    var id = "auto-gen-note"
	}
	let currentNote = user.classes[user.currentClassIndex].notes[i]
	template = `
	    <tr class="${id}">
		<td>${currentNote.topic}</td>
		<td>${currentNote.date}</td> 
		<td>${currentNote.NOfReviews}</td>
	    </tr>
`
	table.innerHTML += template;
	
    }

}

document.addEventListener('click', function(e) {
    console.log(e.target.parentNode.className);
    var className =  e.target.parentNode.className;
    if( className == 'auto-gen-note' || className == 'auto-gen-note-last' )
    {
	console.log(e.target.parentNode.children[0].textContent);
	let topic = e.target.parentNode.children[0].textContent;
	console.log(user.classes[user.currentClassIndex].notes);
	for(let i = 0; i < user.classes[user.currentClassIndex].notes.length; ++i)
	{
	    let curr =  user.classes[user.currentClassIndex].notes[i];
	    if(curr.topic == topic)
	    {
		user.currentNoteIndex = i;
		saveCurrentUser(user);
		console.log(curr);
		location.href = "editor.html";
	    }
	}
    }
    else
    {
	console.log("clicked an example class");
    }
});


addAllNotes();


function saveCurrentUser(curr)
{
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
    localStorage.setItem("user", JSON.stringify(user));

}

var modal = document.getElementById('new-note-popup');

document.getElementById("new-note").onclick = function () {
    modal.style.display = "block";
}

var span = document.getElementById("popup-close");
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("submit-new-note-btn").onclick = function () {
    console.log("pressed new note btn");
    noteTopic = document.getElementById("new-note-topic").value;
    noteDate = document.getElementById("new-note-date").value;
    console.log(noteTopic, noteDate);
    if (noteTopic == "" || noteDate == "") {
        alert("please fill in all the fields!");
    }
    user.classes[user.currentClassIndex].notes.push(new Note(noteDate, noteTopic, "heyo"));
    saveCurrentUser(user);
    //save our user first!
    //localStorage.setItem('user', JSON.stringify(user));
    console.log("saved user supposedly");
    location.reload();
    //make a new class! refresh the page or add child?
}
window.onbeforeunload = function () {
    saveCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
};

addAllNotes();