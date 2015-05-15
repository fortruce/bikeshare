var Reflux = require('reflux');
var actions = require('../actions/actions');

var GeocodeStore = Reflux.createStore({
  listenables: actions,
  getInitialState() {
    return {results: []};
  },

  onGeocodeCompleted(results) {
    this.trigger({results: results});
  },

  onGeocodeFailed(error) {
    console.log('failed:', error);
  }
});

module.exports = GeocodeStore;