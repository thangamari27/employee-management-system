import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwUvTA5IjOhnbmWd7bmQwgEunFaZdqx2c",
  authDomain: "emsproject-6fcec.firebaseapp.com",
  projectId: "emsproject-6fcec",
  storageBucket: "emsproject-6fcec.firebasestorage.app",
  messagingSenderId: "325204426181",
  appId: "1:325204426181:web:f9fc39c115abba9179dfac"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

