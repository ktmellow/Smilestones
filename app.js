var express = require('express');
var morgan  = require('morgan');

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

app.get('/profiles/:id', function(req, res) {
    res.json({
        id: req.params.id,
        fullName: 'Katherine Low',
        tags: ['problem solving', 'math', 'counting']
    });
});

// Start the app on port 5000
app.listen(5000, '0.0.0.0');
console.log("App is now listening at http://localhost:5000");
