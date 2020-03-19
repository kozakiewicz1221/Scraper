var express = require("express");
var router = express.Router();
var app = express();

const initScraper = require("./scraper");

router.get("/", async function(req, res) {
  const output = await initScraper();
  res.render("index", { output });
});

module.exports = router;
