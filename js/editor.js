
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

