const buttonEl = document.getElementById("createAccount")

const allreadyUserEl = document.getElementById("allreadyUser")

allreadyUserEl.addEventListener("click", function(){
    window.parent.changePage("loginPage")
})

buttonEl.addEventListener("click", function(){
    registerPrepareAttempt()
})

function registerPrepareAttempt(){
    window.parent.changePage("app")
}