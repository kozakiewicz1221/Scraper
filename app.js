const express = require("express");
const app = express();
const getPosts = require("./getPosts");
const saveToDb = require("./saveToDb");
var CronJob = require("cron").CronJob;
const { db } = require("./firebase");
const hempLinks = require("./links/hempLinks");
const fitLinks = require("./links/fitLinks");

// INIT SCRAPER
(async () => {
  const hempPosts = await getPosts(hempLinks);
  saveToDb(hempPosts, db, "hempPosts");
  const fitPosts = await getPosts(fitLinks);
  saveToDb(fitPosts, db, "fitPosts");
})();

// ROUTES
app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => console.log(``));
