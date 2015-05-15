var Reflux = require('reflux');
var actions = require('../actions/actions');

var _loc;
var _tracking = false;

var LocationStore = Reflux.createStore({
  listenables: actions,

  getInitialState() {
    return this.getState();
  },

  getState() {
    return {
      location: _loc,
      tracking: _tracking
    }
  },

  onTrackLocation() {
    _tracking = true;
    this.trigger({tracking: _tracking});
  },

  onTrackLocationCompleted() {
    _tracking = true;
    this.trigger({tracking: _tracking});
  },

  onTrackLocationFailed() {
    _tracking = false;
    this.trigger({tracking: _tracking});
  },

  onLocationChange(loc) {
    _loc = loc;
    this.trigger({location: _loc});
  },

  onStopTrackLocation() {
    _tracking = false;
    this.trigger({tracking: _tracking});
  }
});

module.exports = LocationStore;