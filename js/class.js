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

var debug = true;
(function(){
    if(debug)
    {
	for(let i = 0; i < 3; ++i){
	    user.classes[user.currentClassIndex].notes.push(
		new Note(new Date().toJSON().slice(0,10).replace(/-/g,'/'),
			 `Fishing ` ,
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
    console.log( user.classes[user.currentClassIndex].notes.length);
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

addAllNotes();
