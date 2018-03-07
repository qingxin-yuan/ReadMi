import * as firebase from 'firebase';
import 'firebase/auth';

// Initialize firebase app
const config = {
  apiKey: 'AIzaSyAsBcz5eVxGxzYQbSV8y9WOgIoguYzCQRA',
  authDomain: 'readmi-6a6c4.firebaseapp.com',
  databaseURL: 'https://readmi-6a6c4.firebaseio.com',
  projectId: 'readmi-6a6c4',
  storageBucket: 'readmi-6a6c4.appspot.com',
  messagingSenderId: '259444831258'
};

// uncomment and change key stuff if you want to use a diff' db
// const dbConfig = {
//   apiKey: 'AIzaSyAsBcz5eVxGxzYQbSV8y9WOgIoguYzCQRA',
//   authDomain: 'readmi-6a6c4.firebaseapp.com',
//   databaseURL: 'https://readmi-6a6c4.firebaseio.com',
//   projectId: 'readmi-6a6c4',
//   storageBucket: 'readmi-6a6c4.appspot.com',
//   messagingSenderId: '259444831258'
// };

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export { firebaseApp, firebaseAuth, firebaseDb };
