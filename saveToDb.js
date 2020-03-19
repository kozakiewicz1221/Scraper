const MongoClient = require("mongodb").MongoClient;
const data = require("./data");
const { mongoURI } = data;
const cTable = require("console.table");

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const saveToDb = dataObj => {
  console.log("Saving to DB started");

  client.connect(async err => {
    const db = client.db("scraper").collection("news");
    const database = await db.find().toArray();
    const scrapedData = await dataObj;

    for (var i = 0; i < scrapedData.length; i++) {
      const matched = await db.find({ title: scrapedData[i].title }).toArray();

      if (matched.length < 1) {
        db.insertOne(scrapedData[i]);
        console.log("New posts inserted");
      } else {
        console.log("comparing posts...");
      }
    } //end loop
    console.log("Saved to DB");
  });
};

module.exports = saveToDb;
