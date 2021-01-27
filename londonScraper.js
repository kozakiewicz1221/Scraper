const express = require("express");
const app = express();
const getPosts = require("./getPosts");
const saveToDb = require("./saveToDb");
const saveNewsProvidersToDb = require("./saveNewsProvidersToDb");
const saveCouponsToDb = require("./saveCouponsToDb");
var CronJob = require("cron").CronJob;
const { db } = require("./firebase/firebaseHemp");
const { fitLinks } = require("./links/fitLinks");

// const getCoupons = require("./getCoupons");
// const getBankierPrograms = require("./getBankierPrograms");

// INIT SCRAPER
(async () => {
  const data = await getPosts(fitLinks);
  saveToDb(data, db, "fitPosts");
  // saveNewsProvidersToDb(hempPosts, db, "hempNewsProviders");

  // const hempBazaWiedzy = await getPosts(bazaWiedzy);
  // saveToDb(hempBazaWiedzy, db, "bazaWiedzy");
})();

// ROUTES
app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(3002, () => console.log(``));
