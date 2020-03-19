require("dotenv").config();

const mongoURI = process.env.MONGOURI;

module.exports = { mongoURI };
