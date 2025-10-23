import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";  
import {getFirestore} from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeile5GiXQSHQER2iVvhC75mUepwCnKJ0",
  authDomain: "blogproject-679b0.firebaseapp.com",
  projectId: "blogproject-679b0",
  storageBucket: "blogproject-679b0.firebasestorage.app",
  messagingSenderId: "897738363438",
  appId: "1:897738363438:web:cc003c237411bbcef005bf",
  measurementId: "G-7PZQRNJDW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

