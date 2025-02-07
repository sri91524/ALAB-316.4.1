const form = document.getElementById("registration");
console.log(form);

// ToDo Part3 --1  - Registration Form - Username Validation:
// The username cannot be blank.
// The username must be at least four characters long.
// The username must contain at least two unique characters.
// The username cannot contain any special characters or whitespace.
const username = form.elements.username;
const email = form.elements.email;
const password = form.elements.password;
const passwordCheck = form.elements.passwordCheck;
let inputUserName = "";

const div = document.getElementById("errorDisplay");
const ul = document.createElement("ul");
div.appendChild(ul);
let strErrMsg = "";

username.addEventListener("change", function(e){
    inputUserName= e.target.value;
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

//ToDo Part3 --3 -- Registration Form - Password Validation:
// Passwords must be at least 12 characters long.
// Passwords must have at least one uppercase and one lowercase letter.
// Passwords must contain at least one number.
// Passwords must contain at least one special character.
// Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
// Passwords cannot contain the username.
// Both passwords must match.
password.addEventListener("change", function(e){
    const inputPassword = e.target.value; 
    ValidatePassword(inputPassword, "password");    
});

passwordCheck.addEventListener("change", function(e){
    const confirmPassword = e.target.value;
    ValidatePassword(confirmPassword,"passwordcheck");
});

// ToDo -- Part 5--Registration Form - Form Submission:
// Usually, we would send this information to an external API for processing. In our case, we are going to process and store the data locally for practice purposes.
// If all validation is successful, store the username, email, and password using localStorage.
// If you are unfamiliar with localStorage, that is okay! Reference the documentation's "Description" and "Examples" sections to learn how to implement it. If you run into issues speak with a peer or one of your instructors.
// Consider how you want to store the user data, keeping in mind that there will be quite a few users registering for the site. Perhaps you want to store it with an array of user objects; or maybe an object whose keys are the usernames themselves.
// Valid usernames should be converted to all lowercase before being stored.
// Valid emails should be converted to all lowercase before being stored.
// Clear all form fields after successful submission and show a success message.

form.addEventListener("submit", ValidateRegistrationForm);

// ToDo -- part 6--Registration Form - Username Validation (Part Two):
// Now that we are storing usernames, create an additional validation rule for them...
// Usernames must be unique ("that username is already taken" error). Remember that usernames are being stored all lowercase, so "learner" and "Learner" are not unique.


//-------Helper Functions------------------------
function ValidateRegistrationForm(e){   

    e.preventDefault();
    if(ul.hasChildNodes())
    {
        showErrorDialog(); 
        return false;
    }
    else{
        let usrName = username.value.trim().toLowerCase();
        let pwd = password.value.trim();
        let usrEmail = email.value.trim().toLowerCase();    
        let users = {username:usrName, password:pwd, email:usrEmail};
        // console.log(users);

        if(localStorage.getItem(usrName))
        {
            div.textContent ="Sorry, Username already taken!"; 
        }
        else
        {
            localStorage.setItem(usrName, JSON.stringify(users));               
            form.reset(); 
            div.textContent = "Registration Successful!!";
            div.style.color = "green";
        }        
        div.style.display ="block";         
        setTimeout(() => {
            div.style.display = "none";
            div.textContent = "";
        },5000)
    }
    return true;
}

function ValidatePassword(Password, passwordType)
{
    const strPassword = "password";
    const passwordVal = password.value.trim();
    const confirmPasswordVal = passwordCheck.value.trim();

    strErrMsg = "Password must have at least one uppercase, one lowercase letter, one number and one special character."; 
    if(!isValidPassword(Password))
    {
        checkErrMsgDisplay(strErrMsg);

        if(passwordType === "password")
        {password.focus();}
        else{passwordCheck.focus();}        
    }
    else
    {        
        removeErrMsgIfExist(strErrMsg);
    }
     
    strErrMsg = "Password cannot contain the word 'password' (uppercase, lowercase, or mixed).";   
    if(Password.trim().toLowerCase().indexOf(strPassword.trim().toLowerCase()) >= 0)
    {
        checkErrMsgDisplay(strErrMsg);

        if(passwordType === "password")
        {password.focus();}
        else{passwordCheck.focus();}  
    }
    else
    {        
        removeErrMsgIfExist(strErrMsg);
    }
 
    strErrMsg = "Password cannot contain the username.";     
    if(Password.trim().toLowerCase().indexOf(inputUserName.trim().toLowerCase()) >= 0)
    {
        checkErrMsgDisplay(strErrMsg);

        if(passwordType === "password")
        {password.focus();}
        else{passwordCheck.focus();}  
    }
    else
    {        
        removeErrMsgIfExist(strErrMsg);
    }

    strErrMsg = "Both passwords must match.";
    if(confirmPasswordVal.trim() != ""){
        if(passwordVal.trim().toLowerCase() !== confirmPasswordVal.trim().toLowerCase())
        {checkErrMsgDisplay(strErrMsg);
    
            if(passwordType === "password")
            {password.focus();}
            else{passwordCheck.focus();}  
        }
        else
        {        
            removeErrMsgIfExist(strErrMsg);
        }
    }   
    showErrorDialog(); 
}

function isValidPassword(password)
{
    const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*()|:<>.,?]).+$");
    return pattern.test(password);
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function showErrorDialog()
{    
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
