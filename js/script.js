

//Save button feature
function saveButtonReplace(button){
    var buttonReplace = document.createElement("span");
    buttonReplace.innerHTML = "Saved\t" + '<i class="fa-solid fa-check"></i>';
    buttonReplace.classList.add("button-replace-div");
    button.replaceWith(buttonReplace);
}

var saveButton = document.getElementById("save-button");

 if (localStorage.getItem("isSavedButton") === "true"){
     saveButtonReplace(saveButton);
 }

saveButton.onclick = () => {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = "Saved";
    
    newDiv.classList.add("js-saved-div");
    newDiv.style.left = window.innerWidth/2 - 225 +"px";
    
    document.body.appendChild(newDiv);

    setTimeout(() => newDiv.remove(),5000);
    
    saveButtonReplace(saveButton);
    localStorage.setItem('isSavedButton', true);
};

// validate data

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
    return String(password)
        .toLowerCase()
        .match(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );
};

const validateUserName = (password) => {
    return String(password)
        .toLowerCase()
        .match(
            /^[a-zA-Z0-9]+$/
    );
};

// for form with authent...
const email_authent = document.getElementById('email_authent')
const password_authent = document.getElementById('password_authent')
const form_authent = document.getElementById('form_for_authent')
const error_for_authent = document.getElementById('error_for_authent')
var login_button = document.getElementById('button-login')

form_authent.addEventListener('submit', (e) =>
{
    let message = []

    if (!validateEmail(email_authent.value)){
        message.push('Email is uncorrect')
    }

    if (validatePassword(password_authent.value) || (password_authent.value.length <= 6)){
        message.push('password is so easy')
    }   

    if (message.length > 0){
        e.preventDefault()
        var newDiv = document.createElement("div");
        newDiv.innerHTML = message.join(' or ')
        newDiv.style.fontSize = 25 + "px";
    
        newDiv.classList.add("js-saved-div");
        newDiv.style.left = window.innerWidth/2 - 225 +"px";

        document.body.appendChild(newDiv);

        setTimeout(() => newDiv.remove(),4000);
    }

})

// form with registration

const email_reg = document.getElementById('email_reg')
const username_reg = document.getElementById('username_reg')
const password_reg = document.getElementById('password_reg')
const rep_password_reg = document.getElementById('rep_password_reg')
const form_for_registration = document.getElementById('form_for_register')

var reg_button = document.getElementById('reg_button')

form_for_registration.addEventListener('submit', (e) => {
    let message = []
    let flag = false

    if (!validateEmail(email_reg.value)){
        message.push('Email is uncorrect')
    }

    if (validatePassword(password_reg.value) || (password_reg.value.length <= 6)){
        message.push('Password is so easy')
    }

    if (password_reg.value !== rep_password_reg.value){
        message.push('Passwords do not match')
    }

    if (validateUserName(username_reg.value) || (username_reg.value.length <= 3)){
        message.push('Username is uncorrect')
    }
    
    if (message.length > 0)
        var newDiv = document.createElement("div");
        newDiv.innerHTML = message.join(', ')
        newDiv.style.fontSize = 16 + "px";

        newDiv.classList.add("js-saved-div");
        newDiv.style.left = window.innerWidth/2 - 225 +"px";

        document.body.appendChild(newDiv);

        setTimeout(() => newDiv.remove(),4000);
        e.preventDefault()
})


