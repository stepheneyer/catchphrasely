// SERVER-SIDE

// REQUIREMENTS //
var express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path");
    _ = require("underscore");
    db = require("./models");

var app = express();

// CONFIG //

// Serve js & css files into a public folder
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Body parser config
app.use(bodyParser.urlencoded({
    extended: true
}));

// DATA //

// ROUTES //

// root path
app.get("/", function(req, res) {
    // render index.html
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

//phrases index path
app.get("/phrases", function (req, res) {
    db.Phrase.find({},
        function(err, phrases) {
            res.send(200, JSON.stringify(phrases));
    });
});

//add a phrase
app.post("/phrases", function (req, res) {
    db.Phrase.create(req.body,
        function(err, phrase) {
        res.send(201, phrase);
    });
});

//delete a phrase
app.delete("/phrases/:id", function (req, res) {
    console.log(req.params.id);
    db.Phrase.findOneAndRemove({
        _id: req.params.id
    }, function(err, phrase) {
        res.send(204);
    });
});

//listen on port 3000
app.listen(3000, function() {
    console.log("Running");
});