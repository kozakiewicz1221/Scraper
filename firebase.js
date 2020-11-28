const firebaseConfig = {
  apiKey: "AIzaSyDw5_cHGZL1b8LM_yQxh-kacWWf0lj5_6U",
  authDomain: "wp-scraper.firebaseapp.com",
  databaseURL: "https://wp-scraper.firebaseio.com",
  projectId: "wp-scraper",
  storageBucket: "wp-scraper.appspot.com",
  messagingSenderId: "490178700013",
  appId: "1:490178700013:web:fa4815bd00c97e85e162e4",
  measurementId: "G-64NTYB5MYT",
};

var admin = require("firebase-admin");
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = { firebase, db };
