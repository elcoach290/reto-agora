// Import the functions you need from the SDKs you need

// initializeApp, firebase

import { initializeApp } from "firebase/app"

//import firebase from "firebase"
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDfgxT9sjn0cqSPc-b0srUA9m9Dwwv8Lp4",

  authDomain: "reto-agora.firebaseapp.com",

  projectId: "reto-agora",

  storageBucket: "reto-agora.appspot.com",

  messagingSenderId: "605205562976",

  appId: "1:605205562976:web:55cdbd11f649b849fca505"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

export default db;

