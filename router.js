var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const data = require("./data");
const { mongoURI } = data;

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.get("/", async function (req, res) {
  client.connect(async (err) => {
    const db = client.db("scraper").collection("news");
    const output = await db.find().toArray();
    res.render("index", { output });
  });
});

module.exports = router;
