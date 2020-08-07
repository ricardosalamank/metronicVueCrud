import firebase from 'firebase'
//import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDgptltORRHZihh5FQDW32bMUc1uPYo2FQ",
  authDomain: "pruebacrudvue.firebaseapp.com",
  databaseURL: "https://pruebacrudvue.firebaseio.com",
  projectId: "pruebacrudvue",
  storageBucket: "pruebacrudvue.appspot.com",
  messagingSenderId: "346829954688",
  appId: "1:346829954688:web:eaacf7ecd1c63a4f4b1065",
  measurementId: "G-SQ1EWX8G00"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
//firebaseApp.firestore();

export default firebaseApp.firestore();