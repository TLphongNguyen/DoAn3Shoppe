// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD96dL5L38iXGQeM9h176S7XvR4bgIG35I",
  authDomain: "doan3shopee.firebaseapp.com",
  projectId: "doan3shopee",
  storageBucket: "doan3shopee.appspot.com",
  messagingSenderId: "1094658670803",
  appId: "1:1094658670803:web:1d3d04b3f0ee0819c45426",
  measurementId: "G-VJV8EXCSQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app)
export {app,analytics,storage}