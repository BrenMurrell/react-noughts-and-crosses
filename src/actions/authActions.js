import { authRef, userRef } from "../config/firebase";
import { FETCH_USER } from "./types";

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: FETCH_USER,
          payload: user
        });
      } else {
        dispatch({
          type: FETCH_USER,
          payload: null
        });
      }
    });
  };
  

  export const signIn = (provider) => dispatch => {
    console.log('attempting login');
    authRef
      .signInWithPopup(provider)
      .then(result => {
          console.log('logged in', result);
          var newUser = {
              displayName: result.user.displayName,
              photoURL: result.user.photoURL
          }
          userRef.child(result.user.uid).set(newUser);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  export const signOut = () => dispatch => {
    authRef
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        console.log(error);
      });
  };