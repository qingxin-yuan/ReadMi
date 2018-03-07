import { firebaseAuth } from '../config/firebaseConfig';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  firebaseAuth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

// Sign Out
export const signOut = () => firebaseAuth.signOut();
