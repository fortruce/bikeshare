var React =require('react');
var Reflux = require('reflux');
var BikeStore = require('../stores/BikeStore');
var actions = require('../actions/actions');

var Map = require('../components/Map');
var {Marker} = require('../components/MapComponents');

var BikeMap = React.createClass({
  mixins: [Reflux.connect(BikeStore)],
  render() {
    var markers = this.state.stations.map((s) => {
      return (<Marker position={{lat: s.lat, lng: s.lng}}
                      title={s.name} />);
    });
    return (
      <Map  style={{height: '100%'}}
            zoom={12}>
        {markers}
      </Map>
    );
  }
});

module.exports = BikeMap;
