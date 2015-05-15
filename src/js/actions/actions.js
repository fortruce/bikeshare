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

  'geocode': {asyncResult: true},

  'error': {}
});

var watchId;
var _currLoc;

actions.trackLocation.listen(() => {
  function trackLocation() {
    watchId = navigator.geolocation.watchPosition((pos) => {
      _currLoc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      actions.locationChange(_currLoc, true);
    }, (error) => {
      actions.trackLocation.failed(error);
      actions.error(error.message);
    });
  }

  if (_currLoc) {
    actions.locationChange(_currLoc, true);
    if (!watchId) {
      trackLocation();
    }
    return;
  }

  if ('geolocation' in navigator) {
    trackLocation();
  } else {
    actions.error('Your device does not support geolocation.');
    actions.trackLocation.failed();
  }
});

actions.locationChange.listen((loc, tracking) => {
  RouterContainer.get().transitionTo('location', {
    location: loc.lat + ',' + loc.lng
  }, {tracking: tracking});
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

var geocoder = new google.maps.Geocoder();

actions.geocode.listen((address) => {
  geocoder.geocode({address: address}, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results.length === 1) {
        return RouterContainer.get().transitionTo('location', {
          location: results[0].geometry.location.toUrlValue()
        }, {
          search: (new Buffer(results[0].formatted_address)).toString('base64')
        });
      }
      actions.geocode.completed(results);
    } else {
      actions.geocode.failed(status);
    }
  });
});

module.exports = actions;