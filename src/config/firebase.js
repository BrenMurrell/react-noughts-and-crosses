import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();


export const boardsRef = databaseRef.child("boards"); //.orderByChild('order');
export const userRef = databaseRef.child("users"); //.orderByChild('order');


export const authRef = firebase.auth();
export const google = new firebase.auth.GoogleAuthProvider();
export const facebook = new firebase.auth.FacebookAuthProvider();
export const twitter = new firebase.auth.TwitterAuthProvider();

