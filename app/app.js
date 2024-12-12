let currentButton = document.getElementById("home-button")


const profileButtonEl = document.getElementById("profil-button")
const homeButtonEl = document.getElementById("home-button")
const messageButtonEl = document.getElementById("message-button")


//Navbar things--------

profileButtonEl.addEventListener("click", function(){
    navBarPressed(profileButtonEl, "profilPage")
})

messageButtonEl.addEventListener("click", function(){
    navBarPressed(messageButtonEl, "messageListPage")
})
homeButtonEl.addEventListener("click", function(){
    navBarPressed(homeButtonEl, "swipePage")
})

function navBarPressed(button, pageId){
    console.log(button)
    if (currentButton === button) {return}
    console.log(button)

    currentButton.classList.remove("selectedButton")
    document.getElementById("swipePage").style.display = "none"
    document.getElementById("messageListPage").style.display = "none"
    document.getElementById("profilPage").style.display = "none"
    currentButton = button
    document.getElementById(pageId).style.display = "block"
    currentButton.classList.add("selectedButton")
}