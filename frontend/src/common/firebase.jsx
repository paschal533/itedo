/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAPdv5cu7ZzVWK7wQwH2GFlNK1Wj-tjOL0",
    authDomain: "itedo223.firebaseapp.com",
    projectId: "itedo223",
    storageBucket: "itedo223.appspot.com",
    messagingSenderId: "767035132901",
    appId: "1:767035132901:web:8a6affcac77ee0fe12bd0c"
  };

const app = initializeApp(firebaseConfig);

// Google Auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {        
        user = result.user;
    })
    .catch((error) => {
        console.log(error)
    });

    return user;

}