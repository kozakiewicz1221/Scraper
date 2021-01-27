var firebaseConfig = {
  apiKey: "AIzaSyAGXlFJ9LVU94czfnfNX_F9zo4pJEGHy5w",
  authDomain: "finance-app-90aad.firebaseapp.com",
  projectId: "finance-app-90aad",
  storageBucket: "finance-app-90aad.appspot.com",
  messagingSenderId: "268243912937",
  appId: "1:268243912937:web:60eff444eceed0922e0878",
  measurementId: "G-NPHPMBWTN5",
};

var admin = require("firebase-admin");
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = { firebase, db };
