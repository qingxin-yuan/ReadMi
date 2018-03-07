import { firebaseAuth } from '../config/firebaseConfig';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => {
  console.log('creating account');
  return firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .catch(error => console.log(error));
};

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

// Sign Out
export const signOut = () => firebaseAuth.signOut();
