import { getRef, getRefValues, uploadToDB } from "../../firebaseDB.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; 
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";



let profilData = {
    postedPics: [{
        img: "https://randomuser.me/api/portraits/women/2.jpg",
        title: "100 kills",
        subText: "Jeg f**king smadrede de skide ass noobs",
    },{
        img: "https://randomuser.me/api/portraits/women/3.jpg",
        title: "Hjemløs :D",
        subText: "Drenge sværger jeg blir seriøt hjemløs af priserne i kantinen",
    },{
        img: "https://randomuser.me/api/portraits/women/4.jpg",
        title: "Vandt i lotto",
        subText: "Brors vi vandt lige 300k i jysk lotto. #letsgoooo",
    },{
        img: "https://randomuser.me/api/portraits/women/5.jpg",
        title: "Gifflar på tilbud?",
        subText: "Skynd jer i netto!! gifflar til 10 kr",
    }],
    tags:[
        "minecraft",
        "fortnite",
        "Grand theft auto v",
        "abe",
        "among us",
    ],
}

const cache = {
    postedPics:{
        added: [],
        removed: [],
    },
    tags:{
        added: [],
        removed: []
    }
}

const tagListe = document.getElementById("tagListe")
const addTagMenu = document.getElementById("addTagMenu")
const addPostMenu = document.getElementById("addPostMenu")
const closePostMenuButton = document.getElementById("closePostMenuButton")
const closeTagMenuButton = document.getElementById("closeTagMenuButton")
const addTagMenuButton = document.getElementById("addTagMenuButton")
const addPostMenuButton = document.getElementById("addPostMenuButton")
const saveButton = document.getElementById("saveButton")

addPostMenuButton.addEventListener("click", function() { addNewPost() })
saveButton.addEventListener("click", function() { saveChanges() })
addTagMenuButton.addEventListener("click", function() { addNewTag() } )
closeTagMenuButton.addEventListener("click", function() { viewTagMenu(false) })
closePostMenuButton.addEventListener("click", function() { viewPostMenu(false) })



function viewTagMenu(show){
    if (!show){ 
        addTagMenu.style.display = "none" 
        return;
    }
    addPostMenu.style.display = "none" 
    addTagMenu.style.display = "block"
}

function viewPostMenu(show){
    if (!show){ 
        addPostMenu.style.display = "none" 
        return;
    }
    addTagMenu.style.display = "none" 
    addPostMenu.style.display = "block"
}

function addNewTag(){
    let newTagInput = document.getElementById("newTagInput")
    let tagValue = newTagInput.value
    if (tagValue === "" || tagValue === null) { return }
    cacheChange(cache.tags.added, tagValue)
    addTagEl(tagValue)
    newTagInput.value = ""
    viewTagMenu(false)
}

function addNewPost(){
    let newPostImg = document.getElementById("imageUpload")
    let newPostTitle = document.getElementById("newPostTitle")
    let newPostSubText = document.getElementById("newPostSubText")

    let newObject = {
        img: uploadedPicPath,
        title: newPostTitle.value,
        subText: newPostSubText.value,
    }

    console.log(newObject)

    if (newObject.img === null  || newObject.img === "") { return; }
    if (newObject.title === null || newObject.title === "") { return; }
    if (newObject.subText === null || newObject.subText === "") { return; }
    let index = cache.postedPics.added.length
    cacheChange(cache.postedPics.added, newObject)
    addPostEl(index, true)
    newPostImg.value = ""
    newPostTitle = ""
    newPostSubText = ""

    viewPostMenu(false)
}

let uploadedPic;
let uploadedPicPath;
const imageInput = document.getElementById("imageUpload")

imageInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log("Image uploaded to:", event.target.files[0]);
        uploadedPic = event.target.files[0]
        uploadedPicPath = URL.createObjectURL(uploadedPic); 

    }
});

function addTagEl(tag){
    let newEl = document.createElement("li")
    newEl.innerHTML = tag
    newEl.addEventListener("click", function () {
        removeTag(newEl)
    })
    tagListe.insertBefore(newEl,tagListe.firstChild)
}

function cacheChange(path, value){
    path.push(value)
    saveButton.style.display = "block";
    console.log(cache)
    console.log(profilData)
}

async function getProfile(){
    const profilRef = await getRef("profile")
    const newData = await getRefValues(profilRef)
    profilData = newData;
    if (!profilData.tags) { profilData.tags = {} }
    if (!profilData.postedPics) { profilData.postedPics = {} }
    console.log(profilData)

    loadTags()
    loadPosts()
}


onAuthStateChanged(getAuth(), (user) => {
    if (user){
        console.log(user)

        loadProfile()
    }

})

function loadProfile(){
    getProfile()
}

window.addEventListener('load', () => {
    window.parent.parent.asyncLoadComplete('profilPage')
})



function removeTag(object){
    cacheChange(cache.tags.removed, object.innerHTML)
    object.remove()
}

function loadTags(){
    let tagListe = document.getElementById("tagListe")
    let tags = profilData.tags

    tagListe.innerHTML = `<div id="addTagButton" class="addButton">+</div>`
    document.getElementById("addTagButton").addEventListener("click", function(){ viewTagMenu(true) })

    for (let i = 0; i < tags.length; i++){
        addTagEl(tags[i])
    }
}

function loadPosts(){
    let picList = document.getElementById("picList")
    let postedPics = profilData.postedPics

    picList.innerHTML = `<div id="addPostButton" class="addPic">Tilføj et post</div>`
    document.getElementById("addPostButton").addEventListener("click", function(){ viewPostMenu(true) })
    for (const key in postedPics){
        addPostEl(key, false)
    }
}

function removePost(object){
    let index = object.id
    cacheChange(cache.postedPics.removed, index)
    object.remove()

}

function addPostEl(index, inCache){
    let picList = document.getElementById("picList")
    let info;
    if (inCache) { info = cache.postedPics.added[index] } else { info = profilData.postedPics[index] }

    let newEl = document.createElement("div")
    newEl.classList = "postedPic"
    newEl.id = `${index}`
    newEl.innerHTML = `                <img class="postImage" src="${info.img}" alt="">
                <div class="textBox">
                    <p class="picTitel">${info.title}</p>
                    <p class="picSubText">${info.subText}</p>
                </div>
                <div class="deleteButton">X</div>`
    newEl.querySelector(".deleteButton").addEventListener("click", function(){ removePost(this.parentElement) })
    picList.insertBefore(newEl,picList.firstChild)
}

function saveChanges(){
    let pAdded = cache.postedPics.added
    let pRemoved = cache.postedPics.removed
    let tAdded = cache.tags.added
    let tRemoved = cache.tags.removed

    for (let i = 0; i < pAdded.length; i++) {
        //profilData.postedPics.push(pAdded[i])
        profilData.postedPics[Object.keys(profilData.postedPics).length+1] = pAdded[i]
    }
    cache.postedPics.added = []

    for (let i = 0; i < pRemoved.length; i++) {
        profilData.postedPics[pRemoved[i]] = "null"
    }
    cache.postedPics.removed = []

    for (const keys in profilData.postedPics){
        if (profilData.postedPics[keys] === "null"){
            delete profilData.postedPics[keys]
        }
    }
    
    for (let i = 0; i < tAdded.length; i++) {
        profilData.tags.push(tAdded[i])
    }
    cache.tags.added = []

    for (let i = 0; i < tRemoved.length; i++) {
        let index = profilData.tags.indexOf(tRemoved[i])
        profilData.tags.splice(index, 1)

    }
    cache.tags.removed = []

    saveButton.style.display = "none"
    
    let saveRef = getRef("profile")
    uploadToDB(saveRef, profilData)


    loadTags()
    loadPosts()
    console.log(cache)
    console.log(profilData)
}

