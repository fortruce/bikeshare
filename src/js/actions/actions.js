var Reflux = require('reflux');
var { parseString } = require('xml2js');
var { parseNumbers } = require('xml2js').processors;
var request = require('request');

var actions = Reflux.createActions({
  'getBikes': {asyncResult: true}
});

actions.getBikes.listen(() => {
  request(window.location.origin + '/bikes', (err, resp) => {
    if (err) return actions.getBikes.failed(err);
    actions.getBikes.completed(JSON.parse(resp.body));
  });
});

module.exports = actions;