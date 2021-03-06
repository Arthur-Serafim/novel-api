const mongoose = require("mongoose");

const featuredSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  category: String,
  synopsis: String,
  author: String
});

const Featured = mongoose.model("Featured", featuredSchema);

module.exports = Featured;
