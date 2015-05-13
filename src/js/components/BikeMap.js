var React =require('react');
var Reflux = require('reflux');
var BikeStore = require('../stores/BikeStore');
var actions = require('../actions/actions');

var Map = require('../components/Map');
var {Marker} = require('../components/MapComponents');

function getIcon(bikes, empty) {
  var fillColor = 'green';
  if (bikes < 3)
    fillColor = 'orange';
  if (bikes === 0)
    fillColor = 'white';
  if (empty === 0)
    fillColor = 'purple';

  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    fillColor: fillColor,
    strokeWeight: 2,
    fillOpacity: 1
  };
}

function getContent(station) {
  return station.name + '\r\n' + station.nbBikes + '/' + (station.nbBikes + station.nbEmptyDocks);
}

var BikeMap = React.createClass({
  mixins: [Reflux.connect(BikeStore)],
  render() {
    var markers = this.state.stations.map((s) => {
      return (<Marker position={{lat: s.lat, lng: s.lng}}
                      title={s.name}
                      icon={getIcon(s.nbBikes, s.nbEmptyDocks)}
                      key={s.id} />);
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
