// SERVER-SIDE

// REQUIREMENTS //
var express = require("express"),
	bodyParser = require("body-parser"),
	path = require("path");
	_ = require ("underscore");

var app = express();

// CONFIG //

// Serve js & css files into a public folder
app.use (express.static(__dirname + '/public'));

// Body parser config
app.use (bodyParser.urlencoded({extended: true}));

// DATA //

var phrases = [

	{id: 0, word: "Abstraction", definition: "Abstraction in computer programming is a way to reduce complexity and allow efficient design and implementation in complex software systems."},
	{id: 1, word: "Asynchronous", definition: "A communication environment (like email) where each party receives and processes messages when convenient or possible rather than at once."},
	{id: 2, word: "CRUD", definition: "CRUD (create, read, update, delete) is a mnemonic for ways one can operate on stored data."},
	{id: 3, word: "Encapsulation", definition: "The packing of data and functions into one component (for example, a class) and then controlling access to that component to make a 'blackbox' out of the object."},
	{id: 4, word: "JSON", definition: "The JavaScript Object Notation (JSON) is a data-interchange format."},
	{id: 5, word: "Polymorphism", definition: "Polymorphism is the presentation of one interface for multiple data types."},
];

// ROUTES //

// root path
app.get("/", function (req, res){
	// render index.html
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

//phrases index path
app.get("/phrases", function (req, res){
	// render phrases as JSON
	res.send(JSON.stringify(phrases));
});

//delete a phrase
app.post("/phrases", function (req, res){
	var newPhrase = req.body;
	// add a unique id
	newPhrase.id = phrases[phrases.length - 1].id + 1;
	// add new phrase to the array
	phrases.push(newPhrase);
	// send a reponse with newly created object
	res.send(JSON.stringify(newPhrase));
});

app.delete("/phrases/:id", function (req, res){
  	// set the value of the id
  	var targetId = parseInt(req.params.id, 10);  //what is 10?
  	// find item in the array matching the id
  	var targetItem = _.findWhere(phrases, {id: targetId});
  	// get the index of the found item
  	var index = phrases.indexOf(targetItem);
  	// remove the item at that index, only remove 1 item
  	phrases.splice(index, 1);
  	// render deleted object
  	res.send(JSON.stringify(targetItem));
});

//listen on port 3000
app.listen(3000, function() {
	console.log("Running");
});
