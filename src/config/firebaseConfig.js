import firebase from 'firebase';
import 'firebase/auth';

// Initialize firebase app
const config = {
  apiKey: 'AIzaSyCyRsOqFBBFOTCJTb2PKCeVFOPlD6OaAYc',
  authDomain: 'coral-197417.firebaseapp.com',
  databaseURL: 'https://coral-197417.firebaseio.com',
  projectId: 'coral-197417',
  storageBucket: '',
  messagingSenderId: '179287576341'
};

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();
const firebaseDB = firebaseApp.database();
export { firebaseApp, firebaseAuth, firebaseDB };
