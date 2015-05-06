var Reflux = require('reflux');

var actions = require('../actions/actions');

var BikeStore = Reflux.createStore({
  listenables: actions,

  getInitialState() {
    return {stations: {}};
  },

  onGetBikesCompleted(res) {
    this.trigger(res);
  }
});

module.exports = BikeStore;