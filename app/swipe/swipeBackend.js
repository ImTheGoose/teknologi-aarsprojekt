import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getRef, getRefValues, uploadToDB, getUsers, getUserRef } from "../../firebaseDB.js";
import { createUser } from "./swipePage.js";

const loadAmount = 5;
const loadAmountMin = 2;
let swipeLogic;
let allUsers;
let currentCache = [];
let currentCacheObjects = {};

onAuthStateChanged(getAuth(), (user) => {
    if (user){
        getSwipe()
    }

})



export async function getSwipe(){
    allUsers = await getUsers();
    console.log("allusers= ", allUsers)
    let swipeRef = await getRef("swipeLogic")
    swipeLogic = await getRefValues(swipeRef)
    if (swipeLogic === null) {swipeLogic = {}}
    if (swipeLogic.swiped === null) { swipeLogic.swiped = {}}

    for (const keys in swipeLogic.swiped){
        delete allUsers[keys]
    }

    let i = 0;
    for (const keys in allUsers){
        if (i < loadAmount){
            currentCache.push(allUsers[keys])
            i++
        }else{
            break;
        }
    }

    for (let i = 0; i < currentCache.length; i++){
        let useRef = await getUserRef(`${currentCache[i]}`)
        currentCacheObjects[currentCache[i]] = await getRefValues(useRef)
        document.body.append(createUser(currentCache[i],currentCacheObjects[currentCache[i]].profile))
    }

    console.log("current cache= ", currentCache)
    console.log("CurrentCacheObjects", currentCacheObjects)


}

