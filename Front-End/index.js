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
let imageEl = []
let activeImageEl;
const images = ["./testImages/img-1.jpg","./testImages/img-2.jpg","./testImages/img-3.jpg","./testImages/img-4.jpg","./testImages/img-5.jpg","./testImages/img-6.jpg"]


//Event Listeners for switching picture
rightButtonEl.addEventListener("click", function(){ updateImgNum(1) })
leftButtonEl.addEventListener("click", function(){ updateImgNum(-1) })


//Setup function when loading site
function setup(){
    loadImageBar()

    imgContainer.append(imageEl[activeImgNum])

}

//Loads the image with the current index
function loadImage(index){
    let newEl = document.createElement("img")
    newEl.src = images[index]
    newEl.id = `img-${index}`
    imageEl[index] = newEl
}

//Changes the image shown from previous to current
function changeImage(prevNum){
    let prevEl = document.getElementById(`img-${prevNum}`)
    prevEl.remove()
    imgContainer.append(imageEl[activeImgNum])
}

//The function that loads all tabs in image bar based on amount of pictures
function loadImageBar(){
    for (let i = 0; i < amount; i++){
        let newEl = document.createElement("div")
        newEl.classList.add("barEl")

        //Assign css styles based on the position compared to the active element
        if (i == activeImgNum){ newEl.classList.add("actBarEl") }
        if (i < activeImgNum){ newEl.classList.add("loadBarEl") }

        //adds image to html element and element list
        loadImage(i)
        pictureBar.append(newEl)
        imageBarEl[i] = newEl
    }
}

//function for updating the image bar.
function updateImageBar(){
    for (let i = 0; i < imageBarEl.length; i++){
        imageBarEl[i].classList = "barEl"
        if (i < activeImgNum){ 
            imageBarEl[i].classList.add("loadBarEl")
         }
        if (i == activeImgNum){
            imageBarEl[i].classList.add("actBarEl")
            console.log("you suck"+i)
        }
    }
}

function updateImgNum(index){
    let prevNum = activeImgNum
    if (activeImgNum === 0 && index < 0) {return}
    if (activeImgNum === amount-1 && index > 0) {return}

    activeImgNum += index

    updateImageBar()
    changeImage(prevNum)

}


//Navbar things--------

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