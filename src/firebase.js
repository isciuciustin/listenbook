import firebase from 'firebase'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB-M8F5p3aA6EYR1jha2kr03imC8WcuMKo",
    authDomain: "test2-68f21.firebaseapp.com",
    databaseURL: "https://test2-68f21-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test2-68f21",
    storageBucket: "test2-68f21.appspot.com",
    messagingSenderId: "426274490977",
    appId: "1:426274490977:web:3aaeeaf5b2e81e7ba33820"
  };
  firebase.initializeApp(firebaseConfig)

  export default firebase;