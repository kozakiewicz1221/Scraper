const express = require("express");
const app = express();
const getPosts = require("./getPosts");
const saveToDb = require("./saveToDb");
var CronJob = require("cron").CronJob;
const { db } = require("./firebase/firebaseFinance");
const {
  cryptoLinks,
  finanseOsobisteLinks,
  inwestycjeLinks,
  newsyLinks,
  rozwojOsobistyLinks,
  nieruchomosciLinks,
} = require("./links/financeLinks");

// INIT SCRAPER
(async () => {
  const inwestycje = await getPosts(inwestycjeLinks);
  saveToDb(inwestycje, db, "inwestycjePosts");

  const crypto = await getPosts(cryptoLinks);
  saveToDb(crypto, db, "cryptoPosts");

  const finanseOsobiste = await getPosts(finanseOsobisteLinks);
  saveToDb(finanseOsobiste, db, "finanseOsobistePosts");

  const finanseNewsy = await getPosts(newsyLinks);
  saveToDb(finanseNewsy, db, "finanseNewsy");

  const nieruchomosci = await getPosts(nieruchomosciLinks);
  saveToDb(nieruchomosci, db, "nieruchomosciPosts");
})();

// ROUTES
app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(3002, () => console.log(``));
