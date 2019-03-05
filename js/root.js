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
	alert("Data was curropted, please enable cookies");
	console.log("something is wrong with the cookies, root.js 12");
    }

    allUsers[curr.username] = curr;
    localStorage.setItem("users", JSON.stringify(allUsers));

}
