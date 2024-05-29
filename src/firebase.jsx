import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "store-tutorial-afbd9.firebaseapp.com",
  projectId: "store-tutorial-afbd9",
  storageBucket: "store-tutorial-afbd9.appspot.com",
  messagingSenderId: "399073876551",
  appId: "1:399073876551:web:79ab90c5efb23939866f62",
  measurementId: "G-NQZ454GXEB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();