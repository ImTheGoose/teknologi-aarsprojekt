import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { ref, get, set, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { database, app, auth } from "./firebaseAuth.js";

let thisUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.uid);
        thisUser = user
        // Create a reference to the user's data
        const userRef = ref(database, `users/${user.uid}/info`);


        uploadToDB(userRef, {
            email: user.email,
            lastLogin: new Date().toISOString(),
            profile:{
                postedPics:{

                },
                tags:{
                    0:"Mit første Tag",
                }
            }
            })
        
      } else {
        console.log("No user logged in.");
      } 
});

export function getRefValues(ref){
    return new Promise((resolve, reject)=>{
        get(ref)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log(data);
                    resolve(data)
                } else {
                    console.log("No data found.");
                    resolve(null);
                }
                })
                .catch((error) => {
                console.error("Error retrieving data:", error);
                reject(error);
                });
    })

}

export function getRef(gRef){
    return ref(database, `users/${thisUser.uid}/${gRef}`)
}

export function getUserRef(gRef){
    return ref(database, `users/${gRef}`)
}

export function uploadToDB(upRef, upVal){
    set(upRef, upVal)
        .then(() => console.log("User data written"))
        .catch((error) => console.error("Error writing user data:", error));
}

export function getUsers(){
    return new Promise((resolve, reject)=>{
        get(ref(database, `users`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log(data);
                    resolve(Object.keys(data))
                } else {
                    console.log("No data found.");
                    resolve(null);
                }
                })
                .catch((error) => {
                console.error("Error retrieving data:", error);
                reject(error);
                });
    })
}