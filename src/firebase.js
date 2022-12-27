// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4vEx0Fsgpewfx8R1OkggUgLvSbVCLIIc",
    authDomain: "soccer-lopettes.firebaseapp.com",
    projectId: "soccer-lopettes",
    storageBucket: "soccer-lopettes.appspot.com",
    messagingSenderId: "347930702136",
    appId: "1:347930702136:web:0a4b77d7246f15889711cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);