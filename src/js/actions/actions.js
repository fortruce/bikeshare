var Reflux = require('reflux');
var { parseString } = require('xml2js');
var { parseNumbers } = require('xml2js').processors;
var request = require('request');

var actions = Reflux.createActions({
  'getBikes': {asyncResult: true}
});

actions.getBikes.listen(() => {
  request('http://localhost:3001/bikes', (err, resp) => {
    if (err) return actions.getBikes.failed(err);
    parseString(resp.body, {
          valueProcessors: [parseNumbers],
          explicitArray: false
        }, (err, json) => {
          if (err) return actions.getBikes.failed(err);
          var res = Object.create(null);
          json.stations.station.forEach((s) => {
            res[s.id] = s;
          });
          actions.getBikes.completed({stations: res});
        });
  });
});

module.exports = actions;