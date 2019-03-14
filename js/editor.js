
/*
  This file handles the LOGIC and 
  DOM management of the editor
*/

console.log('loading editor.js');


//load user
var user = localStorage.getItem("user");
while( typeof(user) == "string" )
{
    user = JSON.parse(user);
}

function insertDot()
{
    let dot = '\u2022 '; // emoji : '\u26AB'
    insertAtCursor(dot);
}

var textarea = document.getElementById("notes-text");
function insertAtCursor(myValue) {
    let myField = textarea;
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

var currentNote = user.classes[user.currentClassIndex].notes[user.currentNoteIndex];
textarea.textContent += user.classes[user.currentClassIndex].notes[user.currentNoteIndex].content;
console.log("looking at note: ", user.classes[user.currentClassIndex].notes[user.currentNoteIndex], '\n',
	    "at index ", user.currentNoteIndex);

currentNote.NOfReviews += 1;

var backBtn = document.getElementsByClassName("back-button")[0];

window.onunload = function() {
    //auto save when page is left
}

backBtn.onclick = function() {
    //save the note,
    //go back
    user.classes[user.currentClassIndex].notes[user.currentNoteIndex].content =
	textarea.value;
    saveCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user))
    location.href = "class.html"
    console.log("pressed the back button");
}

window.addEventListener("keydown", function(e){
    if(document.activeElement !== textarea){
	return;
    }
    switch(e.keyCode){
    case 9:
	e.preventDefault();
	insertAtCursor('    ');
	break;
    }
});


/* 
textarea.oninput = function() {
    console.log('inputting...');
    var scroll_height = textarea.scrollHeight;
    console.log('scroll height is', scroll_height + 'px;');
    textarea.style['height'] = scroll_height + 'px;';
} 
*/
