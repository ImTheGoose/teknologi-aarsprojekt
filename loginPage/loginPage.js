import { loginUserFunction } from "../firebaseAuth.js"

const buttonEl = document.getElementById("loginAccount")
const newUserButton = document.getElementById("newUser")
const emailEl = document.getElementById("email")
const passwordEl = document.getElementById("password") 
document.addEventListener('loginSuccess', function(event) {
    window.parent.changePage("app")

})


emailEl.addEventListener("focus", function(){
    emailEl.style.borderColor = "";
})


passwordEl.addEventListener("focus", function(){
    passwordEl.style.borderColor = "";
})

function errorField(object){
    object.style.borderColor = "red"
}

newUserButton.addEventListener("click", function(){
    window.parent.changePage("registerPage")
})

buttonEl.addEventListener("click", function(){
    loginPrepareAttempt()
})

function loginPrepareAttempt(){
    if(emailEl.value === "" || 
        emailEl.value === null || 
        emailEl.value.includes("@") != true) { 
            errorField(emailEl)
            return; 
        }
    if(passwordEl.value === "" || 
        passwordEl.value === null || 
        passwordEl.value.length > 6 || 
        passwordEl.value.includes(" ") === true) { 
            errorField(passwordEl)
            return; 
        }
    loginUserFunction(emailEl.value, passwordEl.value)
}

