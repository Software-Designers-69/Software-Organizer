import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDPar9XU2BpATfXY6tHU9-3T1xRYS7J6Xs",
    authDomain: "soft-organizer.firebaseapp.com",
    projectId: "soft-organizer",
    storageBucket: "soft-organizer.appspot.com",
    messagingSenderId: "573280946537",
    appId: "1:573280946537:web:49576755745c10901ad5f8",
    measurementId: "G-97R0YRCKHH"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const auth = getAuth();

export function signupmethod(email, password) {         //function used to sign up new user on database
    return createUserWithEmailAndPassword(auth, email, password)
}
export function loginmethod(email, password) {              //function used to login an exiting user on database
    return signInWithEmailAndPassword(auth, email, password)
}

export const db = getFirestore(app);