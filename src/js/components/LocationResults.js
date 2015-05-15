var React = require('react');
var { State } = require('react-router');
var Reflux = require('reflux');

var BikeStore = require('../stores/BikeStore');

var { sortByDistance, kmToMi } = require('../utils/distance');

var actions = require('../actions/actions');

function roundDistance(distance) {
  distance = Math.round(distance * 100) / 100;
  if (distance.toString().split('.')[1].length < 2)
    return distance.toString() + '0';
  return distance.toString();
}

var Station = React.createClass({
  render() {
    return (
      <div className="row">
        <h4 className="small-12 column">{this.props.state.name}</h4>
        <p className="small-6 column">Bikes: {this.props.state.nbBikes} / {this.props.state.nbBikes + this.props.state.nbEmptyDocks}</p>
        <p className="small-6 column align-right">{roundDistance(this.props.state.distance)} mi</p>
      </div>
    );
  }
});

var LocationResults = React.createClass({
  mixins: [
    Reflux.connect(BikeStore),
    State
  ],

  statics: {
    willTransitionTo(t, params, query) {
      actions.getBikes();

      // if an explicit location search is performed, stop tracking
      if (!query.tracking) {
        actions.stopTrackLocation();
      }
    }
  },

  render() {
    var stations = sortByDistance(this.latLng(), this.state.stations).slice(0,10);
    stations = stations.map((s) => {
      return (<Station state={s} key={s.id} />);
    });
    return (
      <div className="row">
        <div className="small-offset-3 small-6 column">
          {stations}
        </div>
      </div>
    );
  },

  latLng() {
    var coords = this.getParams().location.split(',');
    return {
      lat: parseFloat(coords[0]),
      lng: parseFloat(coords[1])
    }
  }
});

module.exports = LocationResults;