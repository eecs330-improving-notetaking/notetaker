/*
  This js file handles
  all interaction on the 
  class view page.
 
  Assumes index.html (and
  main.js) have been loaded 
  already. This gives us access 
  to the 'user' global var
*/

  
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

for(i = 0; i < classes.length; ++i) {
    console.log(i);
    if (classes[i].id == "new-class")
    {
	classes[i].onclick = newClass;
    }
    else
    {
	classes[i].onclick = openClassPage;
    }
}
