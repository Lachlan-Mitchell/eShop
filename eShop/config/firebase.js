// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgRVF0WjAbpyFhEIMmTgVMt-hgzYxrP6E",
  authDomain: "pokemoneshop-11410.firebaseapp.com",
  projectId: "pokemoneshop-11410",
  storageBucket: "pokemoneshop-11410.appspot.com",
  messagingSenderId: "492373826955",
  appId: "1:492373826955:web:10afc78cf116a808d2e38e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
