const form = document.getElementById("registration");
console.log(form);

// ToDo Part3 --1  - Registration Form - Username Validation:
// The username cannot be blank.
// The username must be at least four characters long.
// The username must contain at least two unique characters.
// The username cannot contain any special characters or whitespace.
const username = form.elements.username;
const email = form.elements.email;

const div = document.getElementById("errorDisplay");
const ul = document.createElement("ul");
div.appendChild(ul);
let strErrMsg = "";

username.addEventListener("change", function(e){
    const inputUserName= e.target.value;
    const regex = /^[A-Za-z0-9]+$/;  
    
    strErrMsg = "The username cannot contain any special characters or whitespace.";
    if(!regex.test(inputUserName))
    {        
        checkErrMsgDisplay(strErrMsg);    
        username.focus();        
    }
    else
    {
        removeErrMsgIfExist(strErrMsg);
    }    
    showErrorDialog();

    //Set removes duplicates
    const uniqueCharacters = new Set(inputUserName);
    strErrMsg = "The username must contain at least two unique characters."; 
    if(uniqueCharacters.size < 2){   
        console.log("unique char present");       
        checkErrMsgDisplay(strErrMsg);
        username.focus();      
    }
    else
    {
        removeErrMsgIfExist(strErrMsg);
    }
    showErrorDialog();

});

// ToDo Part3-- 2 -- Registration Form - Email Validation:
// The email must be a valid email address.
// The email must not be from the domain "example.com."
email.addEventListener("change",function(e){    
    const inputEmail= e.target.value;
    const strDomain = "example.com";
    strErrMsg = "The email must be a valid email address.";

    if(!isValidEmail(inputEmail)){        
        checkErrMsgDisplay(strErrMsg);
        email.focus();
    } 
    else
    {        
        removeErrMsgIfExist(strErrMsg);
    }
    showErrorDialog();

    strErrMsg = "The email must not be from the domain 'example.com.'";
    if(inputEmail.substring(inputEmail.indexOf('@')+1).trim().toLowerCase() ===  strDomain.trim().toLowerCase()){        
        checkErrMsgDisplay(strErrMsg);
        email.focus();
    }
    else
    {
        removeErrMsgIfExist(strErrMsg);
    }
    showErrorDialog();

});



//-------Helper Functions------------------------
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function showErrorDialog()
{console.log("childnode", ul.hasChildNodes());
    
    if(ul.hasChildNodes())
    {
        div.style.display = "block"; 
    }
    else
    {
        div.style.display = "none"; 
    }
}

function checkErrMsgDisplay(errorMessage)
{
    let bFlag = false;
    const listItems = ul.querySelectorAll('li');     
    listItems.forEach((item) =>{        
        if(item.textContent.trim().toLowerCase() === errorMessage.trim().toLowerCase())
        {bFlag = true}            
    }); 
    
    if(!bFlag)
    {
        const li = document.createElement("li");
        li.textContent = strErrMsg;
        ul.appendChild(li);
    }     
}

function removeErrMsgIfExist(errorMessage)
{    
    const listItems = ul.querySelectorAll('li'); 
    listItems.forEach((item) =>{
        if(item.textContent.trim().toLowerCase().includes(errorMessage.trim().toLowerCase()))
        {
            ul.removeChild(item);
            return;        
        }            
    }); 

}
