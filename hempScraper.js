const express = require("express");
const app = express();
const getPosts = require("./utils/getPosts");
const saveToDb = require("./utils/saveToDb");
const saveNewsProvidersToDb = require("./utils/saveNewsProvidersToDb");
const saveCouponsToDb = require("./utils/saveCouponsToDb");
var CronJob = require("cron").CronJob;
const { db } = require("./firebase/firebaseHemp");
const { hempLinks } = require("./links/hempLinks");

// const getCoupons = require("./getCoupons");
// const getBankierPrograms = require("./getBankierPrograms");

// INIT SCRAPER
(async () => {
  const hempPosts = await getPosts(hempLinks);
  saveToDb(hempPosts, db, "hempPosts");
  saveNewsProvidersToDb(hempPosts, db, "hempNewsProviders");

  // const hempBazaWiedzy = await getPosts(bazaWiedzy);
  // saveToDb(hempBazaWiedzy, db, "bazaWiedzy");
})();

// ROUTES
app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(3002, () => console.log(``));
