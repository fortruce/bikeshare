var Reflux = require('reflux');
var actions = require('../actions/actions');

var GeocodeStore = Reflux.createStore({
  listenables: actions,
  getInitialState() {
    return {results: []};
  },

  onGeocode(address) {
    console.log('geocode:', address);
  },

  onGeocodeCompleted(results) {
    console.log('completed');
    console.log(results);
    this.trigger({results: results});
  },

  onGeocodeFailed(error) {
    console.log('failed:', error);
  }
});

module.exports = GeocodeStore;