var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catchphrasely_app");

var phraseSchema = new mongoose.Schema({
  id: {
  type: Number,
    default: 1
  },
  word: {
    type: String,
    default: ""
  },
  definition: {
    type: String,
    default: ""
  }
});

var Phrase = mongoose.model("Phrase", phraseSchema);

module.exports.Phrase = Phrase;