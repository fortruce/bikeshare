var React = require('react');
var { State } = require('react-router');
var Reflux = require('reflux');

var BikeStore = require('../stores/BikeStore');

var { sortByDistance, kmToMi } = require('../utils/distance');

var actions = require('../actions/actions');

var Station = React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.state.name}</h2>
        <p>Bikes: {this.props.state.nbBikes} / {this.props.state.nbBikes + this.props.state.nbEmptyDocks}</p>
        <p>Distance: {Math.round(this.props.state.distance * 100) / 100} miles</p>
      </div>
    );
  }
});

var StationList = React.createClass({
  mixins: [
    Reflux.connect(BikeStore),
    State
  ],

  statics: {
    willTransitionTo() {
      actions.getBikes();
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
    var coords = this.getParams().location.split(':');
    return {
      lat: parseFloat(coords[0]),
      lng: parseFloat(coords[1])
    }
  }
});

module.exports = StationList;