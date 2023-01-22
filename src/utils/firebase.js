// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  // apiKey: 'AIzaSyDgwmE6Cs0gGyCrdWbCNiCJBzqWk2C0Cmo',
  // authDomain: 'codenames-15627.firebaseapp.com',
  // databaseURL: 'https://codenames-15627-default-rtdb.firebaseio.com',
  // projectId: 'codenames-15627',
  // storageBucket: 'codenames-15627.appspot.com',
  // messagingSenderId: '83297844882',
  // appId: '1:83297844882:web:2fe2658e9e0b4b83c3304b',
  // measurementId: 'G-9YXEWYWX70',
  apiKey: 'AIzaSyCRAgTs-YufUrv7XCFiQ3DRZ1_fcjBZgkc',
  authDomain: 'oliviascodenames.firebaseapp.com',
  databaseURL: 'https://oliviascodenames-default-rtdb.firebaseio.com',
  projectId: 'oliviascodenames',
  storageBucket: 'oliviascodenames.appspot.com',
  messagingSenderId: '1036661737403',
  appId: '1:1036661737403:web:e7a9538466919200b5669e',
  measurementId: 'G-LCWXM3Y6F3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth();
