

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
        message.push('Email is incorrect')
    }

    if (validatePassword(password_reg.value) || (password_reg.value.length <= 6)){
        message.push('Password is too easy')
    }

    if (password_reg.value !== rep_password_reg.value){
        message.push('Passwords do not match')
    }

    if (validateUserName(username_reg.value) || (username_reg.value.length <= 3)){
        message.push('Username is incorrect')
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
