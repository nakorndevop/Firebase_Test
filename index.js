// Import stylesheets
import './style.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
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
function writeUserData(lineUserId, name, station, pictureUrl, isStretcherBearer, isOnDuty, approvalStatus) {
  const db = getDatabase();
  const reference = ref(db, 'userProfile/' + lineUserId);
  set(reference, {
    displayName: name,
    station: station,
    isStretcherBearer: isStretcherBearer,
    isOnDuty: isOnDuty,
    pictureUrl: pictureUrl,
    approvalStatus: approvalStatus,
  });
}

function writeStationList(stationName, stationBuilding, stationTel, stationKeyword) {
  const db = getDatabase();
  const reference = ref(db, 'stationList/' + stationName);
  set(reference, {
    stationBuilding: stationBuilding,
    stationTel: stationTel,
    stationKeyword: stationKeyword,
  });
}

function writeJobData(jobId, bearerName, start, destination, status, startTimestamp, finishTimestamp) {
  const db = getDatabase();
  const reference = ref(db, 'jobList/' + jobId);
  set(reference, {
    bearerName: bearerName,
    start: start,
    destination: destination,
    status: status,
    startTimestamp: startTimestamp,
    finishTimestamp: finishTimestamp,
  });
}

function checkDataExist (dataToCheck) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `userProfile/${dataToCheck}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('Exist');
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

function checkUserExist (dataToCheck) {
  const db = getDatabase();
  const dbRef = ref(db);
  get(child(dbRef, `userProfile/${dataToCheck}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('Exist');
    } else {
      // Show form
      document.getElementById('createProfile').className = "show";
      
      // List Staion
      const starCountRef = ref(db, 'stationList/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        
        const wardList = Object.keys(data);

        wardList.forEach((wardList) => {
          let sentence = `I am ${wardList} a staff of Royal Suites.`;
          console.log(sentence);
        });

        console.log(data);
        console.log(wardList);
      });     

      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

/*
function showElement (show) {
  document.getElementById(show).className = "show";
}
*/

/*
function listData (ref1, callBackFunction, elementId) {
  const db = getDatabase();
  const starCountRef = ref(db, ref1+'/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    callBackFunction(data, elementId);
  });
}
*/

/*
function createSelectList(data, elementId) {

}
*/

//writeUserData("A004", "Phuthirat", "OPD", "google.com", "no", "yes");

//writeJobData("job002", "Somchai", "OPD", "x-ray", "Finished", "12:15", "13:15");


liff.init({
  liffId: '2000215406-oapqAqqk', // Use own liffId
  withLoginOnExternalBrowser: true,
})
  .then(() => {
      // start to use LIFF's api
      const accessToken = liff.getAccessToken();

     //Get profile from Line server
     fetch('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((profileResponse) => profileResponse.json())
      .then((profileJSON) => {


        //listData ('stationList');
        
        //writeUserData(profileJSON.userId, profileJSON.displayName, "opd", profileJSON.pictureUrl, "no", "no", true);
        
        //writeStationList('ศัลยกรรมหญิง', 'กายภาพบำบัด', '4310', 'ศญ ศัลย หญิง');

        if(profileJSON.userId) {
          checkUserExist ('Hello');
        }
        

        console.log(profileJSON.userId);

        //document.getElementById('pictureUrl').src = profileJSON.pictureUrl;
        //document.getElementById('displayName').innerHTML = 'displayName: ' + profileJSON.displayName;
        //document.getElementById('userId').innerHTML = 'userId: ' + profileJSON.userId;
      });     

  })
  .catch((err) => {
      console.log(err);
  });
