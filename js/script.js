
//Save button feature
function saveButtonReplace(button){
    var buttonReplace = document.createElement("span");
    buttonReplace.innerHTML = "Saved\t" + '<i class="fa-solid fa-check"></i>';
    buttonReplace.classList.add("button-replace-div");
    button.replaceWith(buttonReplace);
}

var saveButton = document.getElementById("save-button");

 if (sessionStorage.getItem("isSavedButton") === "true"){
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
    sessionStorage.setItem('isSavedButton', true);
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

document.getElementById("prev-page").onclick = prevPage;
document.getElementById("next-page").onclick = nextPage;

var maxPages = 1;
var maxCommentsOnPage = 4;

var maxPagesInSlider = 7;

var currentPage = sessionStorage.getItem("currentPage");

if (!currentPage) {
    currentPage = 1;
}


checkPages2();

deleteComments();
printComments(currentPage);



// if (currentPage == "1") {
//     printComments(1);
// }

checkTextArea();


document.getElementById('current-page').addEventListener('click', 
    function(){
        changePage(1);
        deleteComments();
        printComments(1);
});
commentForm.addEventListener('input', checkTextArea);

postButton.onclick = () => {
    changePostButton(postButton, true);
    console.log("posting comment...");

    addComment(commentForm.value);
};

function deleteAllPageNumbers(){
    var pageNumbers = document.getElementsByClassName('comments-page');
    while (pageNumbers.length > 1){
        pageNumbers[1].parentNode.removeChild(pageNumbers[1]);
    }
}

function addPageNumber(num){
    var pageNumbers = document.getElementsByClassName('comments-page');
    lastPage = pageNumbers[pageNumbers.length - 1];
    var clone = lastPage.cloneNode(true);
    
    clone.innerHTML = '<button type="button' + num + '">' + num + '<button>';
    clone.id = 'page' + num;
    clone.addEventListener('click', function(event) {
        deleteCurrentPage();
        addCurrentPageToNumPage(event.target.innerText);
        checkPages2();
        deleteComments();
        printComments(event.target.innerText);
    });
    lastPage.after(clone);
}


function editFirstNumberToNum(num){
    var firstNum = document.getElementsByClassName('comments-page')[0];
    firstNum.id = "page" + num;
    firstNum.innerHTML = '<button type="button' + num + '">' + num + '<button>';
    firstNumClone = firstNum.cloneNode(true);
    firstNum.parentNode.replaceChild(firstNumClone, firstNum);
    firstNumClone.addEventListener('click', function(event) {
        deleteCurrentPage();
        addCurrentPageToNumPage(event.target.innerText);
        checkPages2();
        deleteComments();
        printComments(event.target.innerText);
    });
}

function getFirstNum(){
    var firstNum = document.getElementsByClassName('comments-page')[0];
    return parseInt(firstNum.innerText);
}


function checkPages2(){
    var db;
    let openRequest = indexedDB.open("comments_base", 1);

    openRequest.onupgradeneeded = function () {
        console.log('update db');
        db = openRequest.result;

        if (!db.objectStoreNames.contains('comments')){
            commentsStore = db.createObjectStore('comments', {keyPath: 'id', autoIncrement: true} );
            
            commentsStore.createIndex('id', 'id');
            commentsStore.createIndex('date', 'date');
            commentsStore.createIndex('text', 'text');

        }

    };

    openRequest.onsuccess = function () {

        db = openRequest.result;
        console.log('Successfully opened db to check pages');
        
        var store = db.transaction('comments', 'readonly').objectStore('comments');
        var count = store.count();

        count.onsuccess = function() {
            console.log('Current amount of rows while checking pages ' + count.result);
            
            maxPages = Math.ceil(count.result / maxCommentsOnPage);
            middlePage = Math.ceil(maxPagesInSlider / 2);
            
            deleteAllPageNumbers();
            console.log(document.getElementsByClassName('comments-page'));

            if (maxPages <= maxPagesInSlider){
                for (var i = 2; i < maxPages+1; i++){
                    addPageNumber(i);
                }
            }
            else if (currentPage <= middlePage){
                if (getFirstNum() !== 1){
                    editFirstNumberToNum(1);
                }

                for (var i=2; i < maxPagesInSlider + 1; i++){
                    addPageNumber(i);
                }
                
            }
            else if (currentPage > middlePage && currentPage < maxPages - middlePage){
                editFirstNumberToNum(currentPage - middlePage + 1);
                for (var i=2;i < maxPagesInSlider + 1;i++){
                    addPageNumber(currentPage - middlePage + i);
                }
            }
            else {
                var firstNumInEnd = maxPages - maxPagesInSlider + 1;
                editFirstNumberToNum(firstNumInEnd);
                for (var i=1;i < maxPagesInSlider; i++){
                    addPageNumber(firstNumInEnd + i);
                } 
            }

            deleteCurrentPage();
            addCurrentPageToNumPage(currentPage);
        }
    }
}

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

function printComment(elem, clone, text, date, id, iterations) {
    var image = clone.querySelector("#comment-image");

    if (image) {
        image.remove();
    }

    clone.querySelector("#comment-text").innerText = text;
    clone.querySelector("#comment-name").innerText = "Pagination enjoyer";

    
    var today = date;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    date = dd + '/' + mm + '/' + yyyy;


    clone.querySelector("#comment-date").innerText = date;

    console.log(id);

    clone.id = "comment" + id;

    elem.before(clone);

    clone.animate([
        { transform: 'scale(1)', background: 'white', opacity: 1, offset: 0 },
        { transform: 'scale(0.95)', background: 'white', opacity: .7, offset: 0.15 },
        { transform: 'scale(1)', background: 'white', opacity: 1, offset: 0.3 },
    ], {
        duration: 1500,
        easing: 'ease-in-out',
        delay: 10,
        iterations: iterations,
        direction: 'alternate',
        fill: 'forwards'
    });
}

function addComment(fieldText) {
    
    var db;
    let openRequest = indexedDB.open("comments_base", 1);

    openRequest.onupgradeneeded = function () {
        console.log('update db');
        db = openRequest.result;
        
        if (!db.objectStoreNames.contains('comments')){
            commentsStore = db.createObjectStore('comments', {keyPath: 'id', autoIncrement: true} );
            
            commentsStore.createIndex('id', 'id');
            commentsStore.createIndex('date', 'date');
            commentsStore.createIndex('text', 'text');

        }

    };

    openRequest.onsuccess = function () {

        db = openRequest.result;
        console.log('Opened db to add comment');
        anotherAddCommentPart(db, fieldText)
    };


    openRequest.onerror = function () {

        console.log("Error on request indexeddb");

    };


}

function anotherAddCommentPart(db, fieldText){

    let transaction = db.transaction('comments', 'readwrite');
    let comments = transaction.objectStore('comments');

    let comment = {
        text: fieldText,
        date: new Date()
    }

    let request = comments.add(comment);
    let isSuccess = false;
    
    request.onsuccess = () => {
        isSuccess = true;
        console.log("Did save comment to db");
    }

    request.onerror = () => {
        console.log("Didn't save comment to db");
    };

    //On complete transaction
    transaction.oncomplete = () => {

        if (!isSuccess) return;

        transaction = db.transaction('comments', 'readwrite');
        comments = transaction.objectStore('comments');
        request = comments.getAll();
        
        request.onerror = () => {
            request.result = [];
        }

        request.onsuccess = () => {

        }

        transaction.oncomplete = () => {
            console.log('Completing adding');
            currentPage = 1;
            deleteCurrentPage();
            addCurrentPageToNumPage(1);
            checkPages2();            
            deleteComments();
            printComments(1);
        }
    }

}

function prevPage() {
    currentPage = sessionStorage.getItem("currentPage");
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
        checkPages2();
        deleteComments();
        printComments(currentPage);
    }
}

function nextPage() {
    currentPage = sessionStorage.getItem("currentPage");
    if (currentPage < maxPages) {
        currentPage++;
        changePage(currentPage);
        checkPages2();
        deleteComments();
        printComments(currentPage);
    }
}

function changePage(page) {
    var curPage = document.getElementById("current-page");
    if ('' + page != curPage.innerText) {
        curPage.id = "page" + curPage.innerText;
        var futurePage = document.getElementById("page" + page)
        futurePage.id = "current-page";
        sessionStorage.setItem("currentPage", page);
    }
}

function addCurrentPageToNumPage(num){
    var futurePage = document.getElementById("page" + num);
    if (futurePage === null)
        return;
    futurePage.id = "current-page";
    sessionStorage.setItem("currentPage", num);
    currentPage = num;
}

function deleteCurrentPage(){
    var curPage = document.getElementById("current-page");
    if (curPage !== null){
        curPage.id = "page" + curPage.innerText;
    }
}

function printComments(page) {
    var db;
    let openRequest = indexedDB.open("comments_base", 1);

    openRequest.onupgradeneeded = function () {
        console.log('update db');
        db = openRequest.result;

        if (!db.objectStoreNames.contains('comments')){
            commentsStore = db.createObjectStore('comments', {keyPath: 'id', autoIncrement: true} );
            
            commentsStore.createIndex('id', 'id');
            commentsStore.createIndex('date', 'date');
            commentsStore.createIndex('text', 'text');

        }

    };

    openRequest.onsuccess = function () {

        db = openRequest.result;
        console.log('Successfully opened db to print comments');
        nextPartDrawing(db, page);

    };


    openRequest.onerror = function () {

        console.log("Error on request indexeddb");

    };

}

function nextPartDrawing(db, page) {
 
    var store = db.transaction('comments', 'readonly').objectStore('comments');
    var count = store.count();

    count.onsuccess = function() {
        console.log(count.result);
        
        var advanceAmount, elemAmount;
        var inc = count.result % maxCommentsOnPage;
        if (inc === 0) {
            inc = maxCommentsOnPage;
        }
        advanceAmount = page == maxPages ? 1 : maxCommentsOnPage * (maxPages - page - 1) + inc + 1;

        inc = count.result % maxCommentsOnPage;
        if (inc === 0) {
            inc = maxCommentsOnPage;
        }
        elemAmount = advanceAmount + (page == maxPages ? inc : maxCommentsOnPage);
        var elem = document.querySelector('#last-comment');
        
        
        var request = db.transaction('comments', 'readonly').objectStore('comments').getAll()
        request.onsuccess = function(event) {
            console.log(request.result);

            if (!request.result) {
                return;
            }

            var counter = 0;
            var commentNumber = 1;
            for (i = elemAmount - 2; i >= advanceAmount - 1; i--) {
                if (request.result[i]) {
                    var clone = elem.cloneNode(true);
                    printComment(elem, clone, request.result[i]['text'], request.result[i]['date'], commentNumber, 0);
                    commentNumber++;
                }
            }
            if (counter < count.result && counter < maxCommentsOnPage) {
                counter++;
            }
            console.log('Comments are printed');
        }
    }
}

function deleteComments() {
    for (var i = 1; i <= maxCommentsOnPage; i++) {
        var comment = document.querySelector('#comment' + i);
        if (comment) {
            comment.remove();
        }
    }
    console.log('Deleted comments');
}


// Slider initialization
function setSlide(slideNumber) {
    
    width = document.getElementsByClassName("bananas_slider")[0].offsetWidth; 
    sliderLine = document.getElementsByClassName("bananas_slider_line")[0];
    
    points = document.getElementsByClassName("photo-circle");
    for (i = 0; i < 5; i++)
        points[i].className = "photo-circle" + (i == slideNumber ? " photo-circle-gray" : "");
   
   sliderLine.style.left = -slideNumber * width + 'px';
   sessionStorage.setItem('sliderNumber', slideNumber);
}

function setSliderTransfer(number){
    number %= 5;
    setSlide(number);
    sessionStorage.setItem('pid', setTimeout(setSliderTransfer, 7000, ++number));
}

slideNumber = sessionStorage.getItem('sliderNumber');
setSliderTransfer(slideNumber ? slideNumber : 2);

points = document.getElementsByClassName("photo-circle");

function onClickPoint(i){
    clearTimeout(sessionStorage.getItem('pid'));
    setSliderTransfer(i);
}

