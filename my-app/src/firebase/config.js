import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDhYfkvk5Av2Gt0GbiBZlAYSp-5_wBBCBE",
    authDomain: "pi-prog3-reactnative.firebaseapp.com",
    projectId: "pi-prog3-reactnative",
    storageBucket: "pi-prog3-reactnative.appspot.com",
    messagingSenderId: "696663123069",
    appId: "1:696663123069:web:d4c8546d760075a2873d14"
};

app.initializeApp(firebaseConfig)

export const auth= firebase.auth();
export const db = app.firestore();
export const storage = app.storage();
