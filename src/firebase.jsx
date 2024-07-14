import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_KEY,
  apiKey: "AIzaSyDY9RW-JwYUeDzidkZdvv9uCbk7NxDbCgQ",
  authDomain: "store-tutorial-799fd.firebaseapp.com",
  projectId: "store-tutorial-799fd",
  storageBucket: "store-tutorial-799fd.appspot.com",
  messagingSenderId: "671514694903",
  appId: "1:671514694903:web:7a7e389ea92934afbdaff2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage (app);
