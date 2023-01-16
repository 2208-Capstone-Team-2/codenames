// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCRAgTs-YufUrv7XCFiQ3DRZ1_fcjBZgkc",
  authDomain: "oliviascodenames.firebaseapp.com",
  databaseURL: "https://oliviascodenames-default-rtdb.firebaseio.com",
  projectId: "oliviascodenames",
  storageBucket: "oliviascodenames.appspot.com",
  messagingSenderId: "1036661737403",
  appId: "1:1036661737403:web:e7a9538466919200b5669e",
  measurementId: "G-LCWXM3Y6F3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth();
