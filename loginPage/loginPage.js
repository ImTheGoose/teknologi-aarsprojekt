const buttonEl = document.getElementById("loginAccount")

const newUser = document.getElementById("newUser")

newUser.addEventListener("click", function(){
    window.parent.changePage("registerPage")
})

buttonEl.addEventListener("click", function(){
    loginPrepareAttempt()
})

function loginPrepareAttempt(){
    window.parent.changePage("app")
}