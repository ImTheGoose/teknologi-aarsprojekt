
const loginButtonEl = document.getElementById("loginButton")
const registerButtonEl = document.getElementById("regButton")

loginButtonEl.addEventListener("click", function(){
    window.parent.changePage("loginPage")
})

registerButtonEl.addEventListener("click", function(){
    window.parent.changePage("registerPage")
})
