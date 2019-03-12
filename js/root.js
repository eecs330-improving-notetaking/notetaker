/*
  This file is for helper function, that ALL 
  files can inherit and use
  
TODO add base classes here!
*/

//write the current user into local storage
function saveCurrentUser(curr)
{
    let allUsers = localStorage.getItem("users");
    while(typeof(allUsers) == "string"){
	allUsers = JSON.parse(allUsers);
    }
    
    if(!curr.username in allUsers)
    {
	console.log("something is wrong with the cookies, root.js");
	alert("Data was curropted, clear your browser cookies, and then "+
	      "make sure to leave them enabled");
    }
    //v you'll prob need this to v
    //localStorage.setItem("user", JSON.stringify(user))

    allUsers[curr.username] = curr;
    localStorage.setItem("users", JSON.stringify(allUsers));

}
