import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDsISOCQaL5ia847TQy4_Z7du-4Wf48REk",
    authDomain: "facebook-clone-73703.firebaseapp.com",
    databaseURL: "https://facebook-clone-73703-default-rtdb.firebaseio.com",
    projectId: "facebook-clone-73703",
    storageBucket: "facebook-clone-73703.appspot.com",
    messagingSenderId: "355599029737",
    appId: "1:355599029737:web:40496c4f25ed8d4fb82778",
    measurementId: "G-K2Z9S19M79"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, db, storage}
