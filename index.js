// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import liff from '@line/liff';

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

// Write Database
function writeUserData(lineUserId, name, pictureUrl, isStretcherBearer, isOnDuty) {
  const db = getDatabase();
  const reference = ref(db, 'userProfile/' + lineUserId);
  set(reference, {
    displayName: name,
    station: station,
    isStretcherBearer: isStretcherBearer,
    isOnDuty: isOnDuty,
    pictureUrl: pictureUrl,
  });
}

liff.init({
  liffId: '2000215406-oapqAqqk', // Use own liffId
  withLoginOnExternalBrowser: true,
})
  .then(() => {
      // start to use LIFF's api
      const accessToken = liff.getAccessToken();

      // Check accessToken
      fetch('https://api.line.me/v2/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((profileResponse) => profileResponse.json())
        .then((profileJSON) => {
          //writeUserData(profileJSON.userId, profileJSON.displayName, profileJSON.pictureUrl, true, true);
          
          document.getElementById('pictureUrl').src = profileJSON.pictureUrl;
          document.getElementById('displayName').innerHTML = 'displayName: ' + profileJSON.displayName;
          document.getElementById('userId').innerHTML = 'userId: ' + profileJSON.userId;
          
        });
  })
  .catch((err) => {
      console.log(err);
  });

console.log("Hello");
