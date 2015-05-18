var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catchphrasely_app");

var phraseSchema = new mongoose.Schema({
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