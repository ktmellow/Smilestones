var express = require('express');
var morgan  = require('morgan');

// Get data models
var recipes = require('./models/Recipe');

// Initialize the app
var app = express();

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

// Start the app on port 5000
app.listen(5000, '0.0.0.0');
console.log("App is now listening at http://localhost:5000");
