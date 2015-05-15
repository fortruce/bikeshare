var Reflux = require('reflux');
var { parseString } = require('xml2js');
var { parseNumbers } = require('xml2js').processors;
var request = require('request');

var RouterContainer = require('../RouterContainer');

var actions = Reflux.createActions({
  'getBikes': {asyncResult: true},

  'trackLocation': {asyncResult: true},
  'stopTrackLocation': {},

  'locationChange': {},

  'error': {}
});

var watchId;

actions.trackLocation.listen(() => {
  function positionError(perror) {
    actions.error(perror.message);
    actions.trackLocation.failed();
  }

  function triggerPos(p) {
    actions.locationChange({
      lat: p.coords.latitude,
      lng: p.coords.longitude
    });
    actions.trackLocation.completed();
  }

  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(triggerPos, positionError);
  } else {
    actions.error('Your device does not support geolocation.');
    actions.trackLocation.failed();
  }
});

actions.locationChange.listen((loc) => {
  RouterContainer.get().transitionTo('near', {location: loc.lat + ':' + loc.lng});
});

actions.stopTrackLocation.listen(() => {
  if (watchId)
    navigator.geolocation.clearWatch(watchId);
});

actions.error.listen((e) => {
  console.log('error', e);
});

setTimeout(actions.getBikes, 0);
setInterval(actions.getBikes, 15000);

actions.getBikes.listen(() => {
  request(window.location.origin + '/bikes', (err, resp) => {
    if (err) return actions.getBikes.failed(err);
    actions.getBikes.completed(JSON.parse(resp.body));
  });
});

module.exports = actions;