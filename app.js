var express = require('express');
var morgan  = require('morgan');
var request = require('request');
var _       = require('lodash');
var recipes = require('./models/Recipe');
var app = express();

var API_KEY = '1Kfdqvy6wHmvJ4LDyAVOl7saCBoKHcSb';

// Initialize logging
app.use(morgan('combined'));

// Render with dynamic partials
app.get('/', function(req, res) {
    res.json({
        'status': 'ready'
    });
});

app.get('/recipes/:id', function(req, res) {
    var recipe = recipes[req.params.id];
    if (!recipe) {
        res.status(404).json({
            error: 404,
            message: 'Data not found'
        });
    }
    res.json(recipe);
});

app.get('/puppies', function(req, res) {
    request.get('http://reddit.com/r/puppies.json', {
        json: true
    }, function(err, response, body) {
        res.json(body);
    });
});

// Geocache
// example URL1: http://localhost:5000/stores/94043 
// example URL2: http://localhost:5000/stores/MountainView
// example URL3: http://localhost:5000/stores/MountainView,CA

app.get('/stores/:where', function(req, res) {

    var where = req.params.where;
    request.get('http://api.target.com/v2/location/geocode', {
        qs: {
            place: where,
            key: API_KEY
        },
        json: true
    },
        function(err, response, body) {
            console.log("hi there");

        var address = body.Locations.Location.Address;
        res.json({
            "lattitude": address.Latitude, 
            "longitude": address.Longitude, 
            "city": address.City 
        });
    });
});


// Start the app on port 5000
app.listen(5000, '0.0.0.0');
console.log("App is now listening at http://localhost:5000");

/*
profile = {
    fullName: “Clarence Leung”,
    profilePhoto: "https://avatars2.githubusercontent.com/u/686352?v=3&s=460",
    about: 
    {
        region: “San Mateo Convention Center”,
        age: “30”,
        bio: “As a single father, raising Sophie by myself, I needed all the help I could get. \
         My jobs don't pay well, so we live paycheck to paycheck. \
         I want to make sure that my daughter can afford the life I never had. \
         Every morning I drop a quarter into a piggy bank labelled Sophie's Educational Fund. \
         I want her to grow up to be a confident leader and passionate learner. So every moment I spend with her, I make it count. \
         I have always relied on my close friends and family for advice but sometimes even they didn't have all the answers. \
         After all, it takes a village to raise a child. And that's when I found Smilestones.”
    }
    recipesInvolved: [123] // parent documents each recipe they are trying: their own and others
}

*/