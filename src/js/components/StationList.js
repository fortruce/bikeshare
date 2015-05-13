var React = require('react');
var { State } = React;
var Reflux = require('reflux');

var BikeStore = require('../stores/BikeStore');

var { sortByDistance, kmToMi } = require('../utils/distance');

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
    Reflux.connect(BikeStore)
  ],

  getInitialState() {
    return {position: {lat: 38.88, lng: -77.01}};
  },

  componentWillMount() {
    navigator.geolocation.watchPosition((p) => {
      this.setState({position: {lat: p.coords.latitude, lng: p.coords.longitude}});
    }, undefined, {timeout: 3000});
  },

  render() {
    var stations = sortByDistance(this.state.position, this.state.stations).slice(0,10);
    stations = stations.map((s) => {
      return (<Station state={s} key={s.id} />);
    });
    return (
      <div>
        Hello World
        {stations}
      </div>
    );
  }
});

module.exports = StationList;