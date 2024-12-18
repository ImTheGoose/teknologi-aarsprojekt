
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; 
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0k-VBxTBvSeAZRpG9EMXJ2Jak1XhA4NU",
  authDomain: "teknologi-aarsprojekt.firebaseapp.com",
  databaseURL: "https://teknologi-aarsprojekt-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "teknologi-aarsprojekt",
  storageBucket: "teknologi-aarsprojekt.firebasestorage.app",
  messagingSenderId: "355328468885",
  appId: "1:355328468885:web:89cb7aa7fa3facd023b89c",
  measurementId: "G-0N4R7K8SY1"
};

const debugInfo = {
  enabled:false,
  debugUser1:{
    mail: "test@test.dk",
    password: "123456",
  },
  debugUser2:{
    mail: "david.gawin@gmail.com",
    password: "123456",
  }
}










let userCredential;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const database = getDatabase(app);

if (debugInfo.enabled){
  loginUserFunction(debugInfo.debugUser1.mail, debugInfo.debugUser1.password)
}

signOut(auth)
  .then(() => {
    console.log("User logged out successfully");
    // Optionally redirect to a login page or show a logged-out state
  })
  .catch((error) => {
    console.error("Error logging out:", error.message);
  });


export async function loginUserFunction(email, password){
    try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);

        const successEvent = new CustomEvent('loginSuccess', { detail: userCredential.user });
        document.dispatchEvent(successEvent);
        } catch (error) {
        console.error("Login failed:", error.message);
        }
}

export async function createUserFunction(email, password) {
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully:", userCredential.user);

      const successEvent = new CustomEvent('loginSuccess', { detail: userCredential.user });
      document.dispatchEvent(successEvent);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }
