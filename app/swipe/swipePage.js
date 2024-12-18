import { getSwipe } from "./swipeBackend.js";


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
window.addEventListener('load', () =>{
    loadImageBar()

    imgContainer.append(imageEl[activeImgNum])
})


export function createUser(uid,profile){
    let userEl = document.createElement("div")
    userEl.id = uid;
    userEl.className = "swipePerson"


    let imgArray = loadImages(profile.postedPics)
    imgArray.forEach(element => {
        //måske kan være problem. Mby er det imgArray[element] idk ka ik teste endnu
        userEl.append(element)
    });

    let picBarEl = createPicBar(imgArray.length)
    updatePicBar(picBarEl)
    userEl.append(picBarEl)

    let tagBarEl = createTagBar(profile.tags)
    userEl.append(tagBarEl)    

    return userEl;
}

function createTagBar(tags){
    let tagBarEl = document.createElement("div")
    tagBarEl.className = "tags"
    tagBarEl.id = "tags"
    for (const keys in tags){
        let newEl = document.createElement("div")
        newEl.className = "tag"
        newEl.innerHTML = tags[keys]
        tagBarEl.append(newEl)
    }
    return tagBarEl
}

function updatePicBar(barEl){
    const array = Array.from(barEl.children)
    for (let i = 0; i < array.length; i++){
        if (i === activeImgNum) { array[i].className = "barEl actBarEl" }
        if (i < activeImgNum) { array[i].className = "barEl loadBarEl" }
        if (i > activeImageEl) { array[i].className = "barEl"}
    }
}

function createPicBar(length){
    let picBarEl = document.createElement("div")
    picBarEl.className = "pictureBar";
    picBarEl.id = "pictureBar";
    for (let i = 0; i < length; i++){
        let newEl = document.createElement("div")
        newEl.classList.add("barEl")
        picBarEl.append(newEl)
    }


    return picBarEl;
}

function loadImages(postedPics){
    let loadedImages = []
    let i = 0;
    for (const keys in postedPics){
        let img = loadImage(postedPics[keys], i)
        loadedImages.push(img)
        i++
    }

    return loadedImages;
}


function loadImage(picInfo, id){
    let newImg = document.createElement("img")
    newImg.src = picInfo.img;
    newImg.id = id
    return newImg;
}



//Everything under here is depricated


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
