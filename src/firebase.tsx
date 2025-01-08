// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4KqBBfiRISzURE42wP8j8ej9nkVaLGVc",
  authDomain: "meetingsummary-76642.firebaseapp.com",
  databaseURL: "https://meetingsummary-76642-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "meetingsummary-76642",
  storageBucket: "meetingsummary-76642.firebasestorage.app",
  messagingSenderId: "718986171927",
  appId: "1:718986171927:web:6e090a5b342fa395476e52",
  measurementId: "G-PZ2JG0Y4Y5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 初始化 Firebase 認證
const auth = getAuth(app);

// 初始化 Google 登入提供者
const googleProvider = new GoogleAuthProvider();

// 初始化 Firestore
const db = getFirestore(app);

const functions = getFunctions(app);

export { auth, googleProvider, db, functions, analytics };

