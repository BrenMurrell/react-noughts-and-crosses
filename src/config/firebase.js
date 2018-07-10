import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();


export const gamesRef = databaseRef.child("games"); //.orderByChild('order');


export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

