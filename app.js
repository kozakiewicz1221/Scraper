const express = require("express");
const app = express();
const initScraper = require("./scraper");
// const saveToDb = require("./saveToDb");
var admin = require("firebase-admin");

var serviceAccount = require("./cbd-4de96-firebase-adminsdk-xgck9-81ea4d9268.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cbd-4de96.firebaseio.com",
});

(async () => {
  const items = await initScraper();
  const db = await admin.firestore();

  items.forEach((item) => {
    console.log(item);
    const docRef = db.collection("posts").doc(item.title);
    docRef.set(item);
  });
})();

app.get("/hello", (req, res) => {
  res.send("Hello");
});
app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(3000, () => console.log(`Example app listening on port 3000`));
