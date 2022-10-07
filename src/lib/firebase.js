import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwoWtRQWM0z1N0ODYr3GswK7gvKt0SFiE",
  authDomain: "classroom-clone-9b890.firebaseapp.com",
  projectId: "classroom-clone-9b890",
  storageBucket: "classroom-clone-9b890.appspot.com",
  messagingSenderId: "383818944088",
  appId: "1:383818944088:web:bc934069eb35c30df3042d",
  measurementId: "G-F84PC8BNXH"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth , provider , storage}
export default db