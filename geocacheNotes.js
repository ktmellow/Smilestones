// example URL1: http://localhost:5000/stores/94043 
// example URL2: http://localhost:5000/stores/MountainView
// example URL3: http://localhost:5000/stores/MountainView,CA

var _       = require('lodash'),
    express = require('express'),
    request = require('request'),
    app = express();

var API_KEY = '1Kfdqvy6wHmvJ4LDyAVOl7saCBoKHcSb';

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
app.listen(5000);
console.log('App running on port 5000');