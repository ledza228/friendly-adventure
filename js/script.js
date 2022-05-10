

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
const checkUsername = (element) => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = element.value.trim();

    if (!isRequired(username)) {
        showError(element, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(element, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(element);
        valid = true;
    }

    if (!valid){
        element.style.boxShadow = "inset 2px 2px 2px red, inset -1px -1px 5px red"
        element.style.borderColor = "red"
    }
    else {
        element.style.boxShadow = "inset 2px 2px 2px rgb(110, 110, 110), inset -1px -1px 5px rgb(110, 110, 110)"
        element.style.borderColor = "rgb(110, 110, 110)"
    }

    return valid;
};


const checkEmail = (element) => {
    let valid = false;
    const email = element.value.trim();
    if (!isRequired(email)) {
        showError(element, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(element, 'Email is not valid.')
    } else {
        showSuccess(element);
        valid = true;
    }

    if (!valid){
        element.style.boxShadow = "inset 2px 2px 2px red, inset -1px -1px 5px red"
        element.style.borderColor = "red"
    }
    else {
        element.style.boxShadow = "inset 2px 2px 2px rgb(110, 110, 110), inset -1px -1px 5px rgb(110, 110, 110)"
        element.style.borderColor = "rgb(110, 110, 110)"
    }

    return valid;
};

const checkPassword = (element) => {
    let valid = false;

    const password = element.value.trim();

    if (!isRequired(password)) {
        showError(element, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(element, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(element);
        valid = true;
    }

    if (!valid){
        element.style.boxShadow = "inset 2px 2px 2px red, inset -1px -1px 5px red"
        element.style.borderColor = "red"
    }
    else {
        element.style.boxShadow = "inset 2px 2px 2px rgb(110, 110, 110), inset -1px -1px 5px rgb(110, 110, 110)"
        element.style.borderColor = "rgb(110, 110, 110)"
    }

    return valid;
};

const checkConfirmPassword = (element, confirm_element) => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirm_element.value.trim();
    const password = element.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirm_element, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirm_element, 'The password does not match');
    } else {
        showSuccess(confirm_element);
        valid = true;
    }

    if (!valid){
        confirm_element.style.boxShadow = "inset 2px 2px 2px red, inset -1px -1px 5px red"
        confirm_element.style.borderColor = "red"
    }
    else {
        confirm_element.style.boxShadow = "inset 2px 2px 2px rgb(110, 110, 110), inset -1px -1px 5px rgb(110, 110, 110)"
        confirm_element.style.borderColor = "rgb(110, 110, 110)"
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

// for form with authent...
const email_authent = document.getElementById('email_authent')
const password_authent = document.getElementById('password_authent')
const form_authent = document.getElementById('form_for_authent')
const error_for_authent = document.getElementById('error_for_authent')
var login_button = document.getElementById('button-login')



form_authent.addEventListener('submit', (e) =>
{
    e.preventDefault()

    let isEmailValid = checkEmail(email_authent),
        isPasswordValid = checkPassword(password_authent);

    let isFormValid = isEmailValid &&
        isPasswordValid;
        
    if (isFormValid){

    }
})

form_authent.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'email_authent':
            checkEmail(email_authent);
            break;
        case 'password_authent':
            checkPassword(password_authent);
            break;
    }
}));

// form with registration

const email_reg = document.getElementById('email_reg')
const username_reg = document.getElementById('username_reg')
const password_reg = document.getElementById('password_reg')
const rep_password_reg = document.getElementById('rep_password_reg')
const form_for_registration = document.getElementById('form_for_register')

var reg_button = document.getElementById('reg_button')

form_for_registration.addEventListener('submit', (e) => {
    e.preventDefault()

    let isUsernameValid = checkUsername(username_reg),
        isEmailValid = checkEmail(email_reg),
        isPasswordValid = checkPassword(password_reg),
        isConfirmPasswordValid = checkConfirmPassword(password_reg, rep_password_reg);

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;
    
    if (isFormValid){

    }
})

form_for_registration.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username_reg':
            checkUsername(username_reg);
            break;
        case 'email_reg':
            checkEmail(email_reg);
            break;
        case 'password_reg':
            checkPassword(password_reg);
            break;
        case 'rep_password_reg':
            checkConfirmPassword(password_reg, rep_password_reg);
            break;
    }
}));


/* comments*/


/* 
    Comments section 
*/

const postButton = document.getElementById("post-button");
const commentForm = document.getElementById("comment-form");

var maxPages = 6;

var currentPage = sessionStorage.getItem("currentPage");
var customComments = sessionStorage.getItem("commentsAmount");

if (!currentPage) {
    currentPage = 1;
}

if (!customComments) {
    sessionStorage.setItem("commentsAmount", 0);
}

changePage(currentPage);

if (currentPage == "1") {
    printComments();
}

checkTextArea();

commentForm.addEventListener('input', checkTextArea)

postButton.onclick = () => {
    changePostButton(postButton, true);
    console.log("posting comment...");

    addComment(commentForm.value);
};

function changePostButton(button, toDisable) {
    const classes = ["submit-button-disabled", "submit-button-enabled"];
    button.disabled = toDisable;
    button.classList.remove(classes[toDisable % classes.length]);
    button.classList.add(classes[(toDisable + 1) % classes.length]);
    console.log("button disabled" + toDisable);
}

function checkTextArea() {
    if (commentForm.value) {
        changePostButton(postButton, false);
    }
    else {
        changePostButton(postButton, true);
    }
}

function printComment(elem, clone, text, date, id) {
    var image = clone.querySelector("#comment-image");

    if (image) {
        image.remove();
    }

    clone.querySelector("#comment-text").innerText = text;
    clone.querySelector("#comment-name").innerText = "Serega Bandit";

    if (!date) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        date = dd + '/' + mm + '/' + yyyy;
    }

    clone.querySelector("#comment-date").innerText = date;

    console.log(id);

    clone.id = "comment" + id;

    elem.before(clone);

    clone.animate([
        { transform: 'scale(1)', background: 'white', opacity: 1, offset: 0 },
        { transform: 'scale(.5) rotate(90deg)', background: 'gray', opacity: .5, offset: .2 },
        { transform: 'scale(1) rotate(0deg)', background: 'white', opacity: 1, offset: 1 },
    ], {
        duration: 2000,
        easing: 'ease-in-out',
        delay: 10,
        iterations: 1,
        direction: 'alternate',
        fill: 'forwards'
    });
}

function addComment(text, date = "") {
    customComments = sessionStorage.getItem("commentsAmount");

    changePage(1);

    var elem;
    if (customComments >= 1) {
        elem = document.querySelector('#comment' + customComments);   
    }
    else {
        elem = document.querySelector('#last-comment');
    }
    var clone = elem.cloneNode(true);


    customComments++;

    console.log(customComments)

    printComment(elem, clone, text, date, customComments);

    sessionStorage.setItem("commentText" + customComments, text);
    sessionStorage.setItem("commentDate" + customComments, date);
    sessionStorage.setItem("commentsAmount", customComments);

}

function prevPage() {
    currentPage = sessionStorage.getItem("currentPage");
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage() {
    currentPage = sessionStorage.getItem("currentPage");
    if (currentPage < maxPages) {
        currentPage++;
        changePage(currentPage);
    }
}

function changePage(page) {
    var curPage = document.getElementById("current-page");
    if ('' + page != curPage.innerText) {
        curPage.id = "page" + curPage.innerText;
        var futurePage = document.getElementById("page" + page)
        futurePage.id = "current-page";
        sessionStorage.setItem("currentPage", page);
        if (page === 1) {
            deleteComments();
            printComments();
        }
        if (curPage.innerText == '1') {
            deleteComments();
        }
    }
}

function printComments() {
    commentsAmount = sessionStorage.getItem("commentsAmount");

    var elem = document.querySelector('#last-comment');

    for (i = commentsAmount; i >= 1; i--) {
        var clone = elem.cloneNode(true);
        printComment(elem, clone, sessionStorage.getItem("commentText" + i), sessionStorage.getItem("commentDate" + i), i);
    }
}

function deleteComments() {
    commentsAmount = sessionStorage.getItem("commentsAmount");
    for (i = 1; i <= commentsAmount; i++) {
        var comment = document.querySelector('#comment' + i);
        if (comment) {
            comment.remove();
        }
    }
}


// Slider initialization
function setSlide(slideNumber) {
    
    width = document.getElementsByClassName("bananas_slider")[0].offsetWidth; 
    sliderLine = document.getElementsByClassName("bananas_slider_line")[0];
    
    points = document.getElementsByClassName("photo-circle");
    for (i = 0; i < 5; i++)
        points[i].className = "photo-circle" + (i == slideNumber ? " photo-circle-gray" : "");
   
   sliderLine.style.left = -slideNumber * width + 'px';
   localStorage.setItem('sliderNumber', slideNumber);
}

function setSliderTransfer(number){
    number %= 5;
    setSlide(number);
    localStorage.setItem('pid', setTimeout(setSliderTransfer, 7000, ++number));
}

slideNumber = localStorage.getItem('sliderNumber');
setSliderTransfer(slideNumber ? slideNumber : 2);

points = document.getElementsByClassName("photo-circle");

function onClickPoint(i){
    clearTimeout(localStorage.getItem('pid'));
    setSliderTransfer(i);
}

