// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgfrBMUTl_dqt1oqdJBAcBMZt7ONPCXw0",
  authDomain: "learnlingo-app-1c681.firebaseapp.com",
  projectId: "learnlingo-app-1c681",
  storageBucket: "learnlingo-app-1c681.firebasestorage.app",
  messagingSenderId: "971459705778",
  appId: "1:971459705778:web:71de1b443118563e5642ab",
  measurementId: "G-JPBGVVGQY6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// https://learnlingo-app-1c681-default-rtdb.europe-west1.firebasedatabase.app/
