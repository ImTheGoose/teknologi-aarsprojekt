
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; 

const firebaseConfig = {
  apiKey: "AIzaSyC0k-VBxTBvSeAZRpG9EMXJ2Jak1XhA4NU",
  authDomain: "teknologi-aarsprojekt.firebaseapp.com",
  projectId: "teknologi-aarsprojekt",
  storageBucket: "teknologi-aarsprojekt.firebasestorage.app",
  messagingSenderId: "355328468885",
  appId: "1:355328468885:web:89cb7aa7fa3facd023b89c",
  measurementId: "G-0N4R7K8SY1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 

export async function loginUserFunction(email, password){
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);

        const successEvent = new CustomEvent('loginSuccess', { detail: userCredential.user });
        document.dispatchEvent(successEvent);
        } catch (error) {
        console.error("Login failed:", error.message);
        }
}

export async function createUserFunction(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully:", userCredential.user);

      const successEvent = new CustomEvent('loginSuccess', { detail: userCredential.user });
      document.dispatchEvent(successEvent);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }
