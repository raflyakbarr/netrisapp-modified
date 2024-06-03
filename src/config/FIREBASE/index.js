import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";  

firebase.initializeApp({
    apiKey: "AIzaSyBkBhYzhj0TOhZjeHHmfwdI6qzyyfleWAU",
    authDomain: "netrisapp.firebaseapp.com",
    databaseURL: "https://netrisapp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "netrisapp",
    storageBucket: "netrisapp.appspot.com",
    messagingSenderId: "425813583046",
    appId: "1:425813583046:web:7a163eeb407546ede6e3c7"
});

const FIREBASE = firebase;

export default FIREBASE;