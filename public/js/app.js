//CLIENT-SIDE

// on page load
$(function() {
    // get and render the phrase
    Phrase.all();
    // set the view's behaviors
    View.init();
});

// VIEW OBJECT
function View() {}
View.init = function() {
    // phrase form submit event listener
    $("#phrase-form").on("submit", function(event) {
        // stop page reload
        event.preventDefault();
        // format form data into a query string
        var phraseParams = $(this).serialize();
        Phrase.create(phraseParams);
    });
};

View.render = function(items, parentId, templateId) {
    // render a template
    var template = _.template($("#" + templateId).html());
    // input data into template and append to parent
    $("#" + parentId).html(template({collection: items}));
};

// PHRASES OBJECT
function Phrase() {}
Phrase.all = function() {
    $.get("/phrases", function(res) {
        console.log(res);
        // parse the response
        var phrases = JSON.parse(res);
        // render the results
        View.render(phrases, "phrase-ul", "phrases-template");
    });
};

Phrase.create = function(phraseParams) {
    $.post("/phrases", phraseParams).done(function(res) {
        // append new phrase to the page
        Phrase.all();
        //reset form
        $("#phrase-form")[0].reset();
    });
};


Phrase.delete = function(phrase) {
    var phraseId = $(phrase).data().id;
    $.ajax({
        url: '/phrases/' + phraseId,
        type: 'DELETE',
        success: function(res) {
            //once successful, re-render all phrases
            Phrase.all();
        }
    });
};
