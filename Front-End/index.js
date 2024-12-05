let currentButton = document.getElementById("home-button")


const profileButtonEl = document.getElementById("profil-button")
const homeButtonEl = document.getElementById("home-button")
const messageButtonEl = document.getElementById("message-button")

const rightButtonEl = document.getElementById("next-picture")
const leftButtonEl = document.getElementById("last-picture")

const pictureBar = document.getElementById("pictureBar")
const imgContainer = document.getElementById("imgContainer")

//data that needs to be loaded.
const amount = 6;


let activeImgNum = 0
let imageBarEl = []
let imageElements = []
const images = ["./testImages/img-1.jpg","./testImages/img-2.jpg","./testImages/img-3.jpg","./testImages/img-4.jpg","./testImages/img-5.jpg","./testImages/img-6.jpg"]



rightButtonEl.addEventListener("click", function(){
    updateImgNum(1)
})
leftButtonEl.addEventListener("click", function(){
    updateImgNum(-1)
})

function loadImage(index){
    let newEl = document.createElement("img")
    newEl.src = images[index]
    imageElements[index] = newEl
}

//fkn skyd mig sikkert smth med at id asigner ikke fungere. Løsningen er at give dem alle et id og logge det forrige id.

function updateImage(number){
    document.getElementById("currentImage").remove()
    imageElements[number].id = "currentImage"
    imgContainer.append(imageElements[number])
    imageElements[number].id = ""
}

function setup(){
    loadImageBar()
    let img = imageElements[activeImgNum]
    img.id = "currentImage"
    imgContainer.append(img)

}

function loadImageBar(){
    for (let i = 0; i < amount; i++){
        let newEl = document.createElement("div")
        newEl.classList.add("barEl")
        if (i == activeImgNum){ newEl.classList.add("actBarEl") }
        if (i < activeImgNum){ newEl.classList.add("loadBarEl") }
        pictureBar.append(newEl)
        imageBarEl[i] = newEl
        loadImage(i)
    }
}

function updateImgNum(index){
    if (activeImgNum === 0 && index < 0) {return}
    if (activeImgNum === amount-1 && index > 0) {return}

    console.log(index)
    imageBarEl[activeImgNum].classList.remove("actBarEl")
    if (index > 0){
        imageBarEl[activeImgNum].classList.add("loadBarEl")
    }

    activeImgNum += index
    console.log(activeImgNum)
    imageBarEl[activeImgNum].classList.remove("loadBarEl")
    imageBarEl[activeImgNum].classList.add("actBarEl")
    updateImage()
}


profileButtonEl.addEventListener("click", function(){
    navBarPressed(profileButtonEl)
})

messageButtonEl.addEventListener("click", function(){
    navBarPressed(messageButtonEl)
})
homeButtonEl.addEventListener("click", function(){
    navBarPressed(homeButtonEl)
})

function navBarPressed(button){
    console.log(button)
    if (currentButton === button) {return}
    console.log(button)

    currentButton.classList.remove("selectedButton")
    currentButton = button
    currentButton.classList.add("selectedButton")
}