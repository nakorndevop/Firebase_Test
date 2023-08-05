// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK5qDYCIwcB3ox7V0aTebPIdRZAWlNTj4",
  authDomain: "realtimedb-a17ed.firebaseapp.com",
  databaseURL: "https://realtimedb-a17ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtimedb-a17ed",
  storageBucket: "realtimedb-a17ed.appspot.com",
  messagingSenderId: "860885717482",
  appId: "1:860885717482:web:1665503e268812b8ad6293",
  measurementId: "G-944W4BVR6H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Database

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId)
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

writeUserData('001A', 'Nakorn', 'nakorn_palm@yahoo.com', 'www.google.com');

console.log("Hello");
