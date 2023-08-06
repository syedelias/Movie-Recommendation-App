// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-hLsZXPetSFRxO6DmZZelitOnYOHnYfQ",
  authDomain: "movie-recommendation-app-761be.firebaseapp.com",
  projectId: "movie-recommendation-app-761be",
  storageBucket: "movie-recommendation-app-761be.appspot.com",
  messagingSenderId: "108495023591",
  appId: "1:108495023591:web:ca1d414b6744d831656142",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
