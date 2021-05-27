import firebase from 'firebase/app';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA555NPwzbJ6GhW7tXbeFBgvwhJprfB_tI",
    authDomain: "appmonitoreo-a2112.firebaseapp.com",
    projectId: "appmonitoreo-a2112",
    storageBucket: "appmonitoreo-a2112.appspot.com",
    messagingSenderId: "161822936600",
    appId: "1:161822936600:web:04f7c8d8cc64dc0d387d6d",
    measurementId: "G-6KJ67XMERB"
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();

//Documento configurador de la coneccion a la base de datos
// se usa db en los componentes externos para llamar a la
// base de datos.