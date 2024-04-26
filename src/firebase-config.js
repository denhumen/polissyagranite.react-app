// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpfA_8lVvq5T6eEItCYS8SU1jIt98J99w",
  authDomain: "polissya-granite.firebaseapp.com",
  databaseURL: "https://polissya-granite-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "polissya-granite",
  storageBucket: "polissya-granite.appspot.com",
  messagingSenderId: "300695673627",
  appId: "1:300695673627:web:029efe049532f797f611be",
  measurementId: "G-QY2D0DW2LV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const imgDB = getStorage(app);
const textDB = getFirestore(app);
const rtDatabase = getDatabase(app);

export { app, auth, imgDB, textDB, rtDatabase };