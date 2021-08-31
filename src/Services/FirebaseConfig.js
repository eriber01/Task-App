import firebase from "firebase";

import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAtb6ZDXymV_Svw4lyDxmtKJcPNSSe2-UI",
    authDomain: "task-app-4997c.firebaseapp.com",
    projectId: "task-app-4997c",
    storageBucket: "task-app-4997c.appspot.com",
    messagingSenderId: "913290092708",
    appId: "1:913290092708:web:59515b8a14f385c6120631",
    measurementId: "G-H97GGQYEY0"
};

  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth()
const FirebaseStorage = fire.firestore()

export {auth, FirebaseStorage}