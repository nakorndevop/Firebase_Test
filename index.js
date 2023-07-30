// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK5qDYCIwcB3ox7V0aTebPIdRZAWlNTj4",
  authDomain: "realtimedb-a17ed.firebaseapp.com",
  projectId: "realtimedb-a17ed",
  storageBucket: "realtimedb-a17ed.appspot.com",
  messagingSenderId: "860885717482",
  appId: "1:860885717482:web:1665503e268812b8ad6293",
  measurementId: "G-944W4BVR6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;