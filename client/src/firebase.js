// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //Imported from .env to hide it
  authDomain: "real-estate-marketplace-899e8.firebaseapp.com",
  projectId: "real-estate-marketplace-899e8",
  storageBucket: "real-estate-marketplace-899e8.appspot.com",
  messagingSenderId: "863459813543",
  appId: "1:863459813543:web:9334b6da99aae1fefd9382"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);