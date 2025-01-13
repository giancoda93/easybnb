// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5igkQB2cQLscmkgITrwvAZFLNTDX8VcA",
  authDomain: "easybnb-fd550.firebaseapp.com",
  projectId: "easybnb-fd550",
  storageBucket: "easybnb-fd550.firebasestorage.app",
  messagingSenderId: "623700214907",
  appId: "1:623700214907:web:7caca8ef6af9de445e0ede"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore(app)

export { db }
