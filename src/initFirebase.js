import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyAo0G2bLK7VP77P6ojpfP1q-Fwj9QXcRXA",
    authDomain: "thesisproject-2021.firebaseapp.com",
    databaseURL: "https://thesisproject-2021-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "thesisproject-2021",
    storageBucket: "thesisproject-2021.appspot.com",
    messagingSenderId: "873907592244",
    appId: "1:873907592244:web:5ead2acdcf467c766abe61"
};

function initFirebase() {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
    }
}

initFirebase();

export { firebase };
