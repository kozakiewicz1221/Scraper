const MongoClient = require("mongodb").MongoClient;
const data = require("./data");
const { mongoURI } = data;

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const saveToDb = dataObj => {
  client.connect(err => {
    const db = client.db("scraper").collection("news");
    db.insertMany(dataObj);
  });
};

module.exports = saveToDb;
