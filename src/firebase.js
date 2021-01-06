import { initializeApp } from 'firebase';

const app = initializeApp( {
    apiKey: "AIzaSyDGFBTYvc3gBvHtDJOuKXU9STT_7R8ouZI",
    authDomain: "yeetmeinto-space.firebaseapp.com",
    projectId: "yeetmeinto-space",
    storageBucket: "yeetmeinto-space.appspot.com",
    messagingSenderId: "730764694666",
    appId: "1:730764694666:web:31f523a865b7be15124973",
    measurementId: "G-Z1PFBVC184"
});

export const db = app.database();
export const namesRef = db.ref('names');