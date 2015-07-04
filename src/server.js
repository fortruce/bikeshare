var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var parseString = require('xml2js').parseString;
var parseNumbers = require('xml2js').processors.parseNumbers;
var debug = require('debug')('SERVER');
var compression = require('compression');


app.use(compression());
// cache static resources for 30 day
app.use(
  express.static(path.join(__dirname, '..', 'build'),
  {
    maxAge: '30d'
  }
));


var _bikes;
var _err;
var server;

function getBikes(cb) {
  request('https://www.capitalbikeshare.com/data/stations/bikeStations.xml',
    function (err, resp, body) {
      if (err) {
        debug('Request Error:', err);
        return cb(err);
      }
      xmlToJson(body, function (err, json) {
        if (err){
          debug('xml2js Error:', err);
          return cb(err);
        }
        cb(null, json);
    });
  });
}

function updateBikes() {
  if (_bikes && (Date.now() - _bikes.lastUpdate) < 65000) 
    return;
  getBikes(function (err, bikes) {
    if (err)
      return _err = err;
    if (bikes.lastUpdate !== _bikes.lastUpdate) {
      _err = null;
      return _bikes = bikes;
    }
  });
}

function xmlToJson(xml, callback) {
  parseString(
    xml,
    {
      valueProcessors: [parseNumbers],
      tagNameProcessors: [function (name) {
        return name === "long" ? "lng" : name;
      }],
      explicitArray: false
    },
    function (err, json) {
      if (err) return callback(err);
      return callback(undefined, {
        stations: json.stations.station,
        lastUpdate: json.stations.$.lastUpdate
      });
    }
  );
}

app.get('/bikes', function(req, res) {
  res.set('Content-Type', 'application/json');

  if (!_bikes)
    return res.status(500).send(JSON.stringify(_err || {error: 'No bike data available'}));

  return res.send(JSON.stringify(_bikes));
});

getBikes(function (err, bikes) {
  if (err)
    _err = err;
  else
    _bikes = bikes;

  debug('Starting Server');
  server = app.listen(process.env.PORT || 3333);
  setInterval(updateBikes, 15000);
});