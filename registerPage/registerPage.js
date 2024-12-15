import { createUserFunction } from "../firebaseAuth.js"
const buttonEl = document.getElementById("createAccount")

const allreadyUserEl = document.getElementById("allreadyUser")
const emailEl = document.getElementById("email")
const passwordEl = document.getElementById("password") 
const rePasswordEl = document.getElementById("rePassword") 
document.addEventListener('loginSuccess', function(event) {
    window.parent.changePage("app")

})

allreadyUserEl.addEventListener("click", function(){
    window.parent.changePage("loginPage")
})

buttonEl.addEventListener("click", function(){
    registerPrepareAttempt()
})

emailEl.addEventListener("focus", function(){
    emailEl.style.borderColor = "";
})


passwordEl.addEventListener("focus", function(){
    passwordEl.style.borderColor = "";
})

rePasswordEl.addEventListener("focus", function(){
    rePasswordEl.style.borderColor = "";
})

function errorField(object){
    object.style.borderColor = "red"
}

function registerPrepareAttempt(){
    if(emailEl.value === "" || 
        emailEl.value === null || 
        emailEl.value.includes("@") != true) { 
            errorField(emailEl)
            return; 
        }
    if(passwordEl.value === "" || 
        passwordEl.value === null || 
        passwordEl.value.length < 6 || 
        passwordEl.value.includes(" ") === true) { 
            errorField(passwordEl)
            return; 
        }
    if(rePasswordEl.value != passwordEl.value) { 
        errorField(rePasswordEl) 
        return;
        }


    createUserFunction(emailEl.value, passwordEl.value)
}
