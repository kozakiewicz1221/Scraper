const express = require("express");
const app = express();
const initScraper = require("./scraper");
const saveToDb = require("./saveToDb");

// Render views
app.set("view engine", "pug");
app.set("views", "./views");

// Router
const indexRouter = require("./router");
app.use("/", indexRouter);

// Scrape & save
(async () => {
  const items = await initScraper();
  saveToDb(items);
})();

app.listen(3000, () => console.log(`Example app listening on port 3000`));
