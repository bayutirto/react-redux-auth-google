import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCKek5j7fVHexwjnn5ZBbf5aSELcRKdTS4",
    authDomain: "baybuy-ecommerce.firebaseapp.com",
    projectId: "baybuy-ecommerce",
    storageBucket: "baybuy-ecommerce.appspot.com",
    messagingSenderId: "127469799902",
    appId: "1:127469799902:web:7423088902c4999ffe754f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();