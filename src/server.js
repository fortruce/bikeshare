var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var parseString = require('xml2js').parseString;
var parseNumbers = require('xml2js').processors.parseNumbers;

app.use(express.static(path.join(__dirname, '..', 'build')));

var _bikes;
var _err;

function xmlToJson(xml, callback) {
  var res = Object.create(null);
  parseString(
    xml,
    {
      valueProcessors: [parseNumbers],
      explicitArray: false
    },
    function (err, json) {
      if (err) return callback(err);
      json.stations.station.forEach(function (s) {
        res[s.id] = s;
      });
      return callback(undefined, {
        stations: res,
        lastUpdate: json.stations.$.lastUpdate
      });
    }
  );
}

function getBikes(callback) {
  if (_bikes && (Date.now() - _bikes.lastUpdate) < 5000)
    return callback(undefined, _bikes);

  request('https://www.capitalbikeshare.com/data/stations/bikeStations.xml',
    function (err, resp, body) {
      if (err) return callback(err);
      xmlToJson(body, function (err, json) {
        if (err) return callback(err);
        _bikes = json;
        return callback(undefined, _bikes);
      });
    });
}

app.get('/bikes', function(req, res) {
  res.set('Content-Type', 'application/json');

  getBikes(function (err, bikes) {
    if (err) return res.status(500).send(JSON.stringify(err));
    return res.send(JSON.stringify(bikes));
  });
});

var server = app.listen(process.env.PORT || 3333);