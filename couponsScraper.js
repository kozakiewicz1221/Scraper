const express = require("express");
const app = express();
const getCoupons = require("./getCoupons");
const saveCouponsToDb = require("./saveCouponsToDb");
const { db } = require("./firebase/firebaseHemp");

// const getCoupons = require("./getCoupons");
// const getBankierPrograms = require("./getBankierPrograms");

// INIT SCRAPER
(async () => {
  const coupons = await getCoupons();
  console.log(coupons);
  saveCouponsToDb(coupons, db, "coupons");
})();

// ROUTES
app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(3002, () => console.log(``));
