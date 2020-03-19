const express = require("express");
const app = express();
const port = 3000;
const indexRouter = require("./router");
const initScraper = require("./scraper");

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", indexRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
