const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

module.exports = mongoose.model("Blog", schema);
