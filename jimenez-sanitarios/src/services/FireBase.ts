// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTV-Q47ZTg_brtsrH63meMVaHQq5uJW7Y",
  authDomain: "jimenez-sanitarios.firebaseapp.com",
  projectId: "jimenez-sanitarios",
  storageBucket: "jimenez-sanitarios.appspot.com",
  messagingSenderId: "1020459471858",
  appId: "1:1020459471858:web:74b374d8ddeb34e639916b",
  measurementId: "G-DHV80207QV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
