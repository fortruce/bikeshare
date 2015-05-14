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
var loc;

actions.trackLocation.listen(() => {
  function positionError(perror) {
    actions.error(perror.message);
  }

  function triggerPos(p) {
    loc = {
      lat: p.coords.latitude,
      lng: p.coords.longitude
    };
    actions.locationChange(loc);
    actions.trackLocation.completed();
  }

  if ('geolocation' in navigator) {
    if (watchId) {
      if (loc) {
        actions.locationChange(loc);
        actions.trackLocation.completed();
        return;
      }
      else {
        return navigator.geolocation.getCurrentPosition(triggerPos, positionError);
      }
    } else {
      watchId = navigator.geolocation.watchPosition(triggerPos, positionError);
      return;
    }
  } else {
    actions.error('Your device does not support geolocation.');
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