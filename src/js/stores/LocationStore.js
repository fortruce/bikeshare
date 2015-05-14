var Reflux = require('reflux');
var actions = require('../actions/actions');

var LocationStore = Reflux.createStore({
  listenables: actions,

  getInitialState() {
    return {
      location: undefined,
      tracking: false
    };
  },

  onTrackLocationCompleted() {
    this.trigger({tracking: true});
  },

  onLocationChange(loc) {
    this.trigger({location: loc});
  },

  onStopTrackLocation() {
    this.trigger({tracking: false});
  }
});

module.exports = LocationStore;