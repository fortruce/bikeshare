var express = require('express');
var app = express();
var path = require('path');
var request = require('request');

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/bikes', function(req, res) {
  request
      .get('https://www.capitalbikeshare.com/data/stations/bikeStations.xml')
      .pipe(res);
});

var server = app.listen(3000);