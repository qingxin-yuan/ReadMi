import { firebaseAuth } from '../config/firebaseConfig';
import { firebaseDB } from '../config/firebaseConfig';
// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => {
  console.log('creating account');
  return firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => console.log(error));
};

// Write to user db
export const createUserInDB = (userId, userName, email) => {
  firebaseDB.ref(`users/${userId}`).set({
    userName,
    email
  });
};

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

// Sign Out
export const signOut = () => firebaseAuth.signOut();
