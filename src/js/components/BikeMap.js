var React =require('react');
var Reflux = require('reflux');
var BikeStore = require('../stores/BikeStore');

var actions = require('../actions/actions');

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
    scale: 10,
    fillColor: fillColor,
    strokeWeight: 2,
    fillOpacity: 1
  };
}

function Marker(station, map) {
  this.id = station.id;
  this.map = map;
  this.position = new google.maps.LatLng(station.lat, station.long);

  this.marker = new google.maps.Marker({
    position: this.position,
    icon: getIcon(station.nbBikes, station.nbEmptyDocks),
    map: map
  });

  this.info = new google.maps.InfoWindow({
    content: station.nbBikes + '/' + (station.nbEmptyDocks + station.nbBikes)
  });

  google.maps.event.addListener(this.info, 'closeclick', this.toggleInfo.bind(this));
  google.maps.event.addListener(this.marker, 'click', this.toggleInfo.bind(this));
}

Marker.prototype.toggleInfo = function() {
  if (this.infoEnabled)
    this.info.close();
  else
    this.info.open(this.map, this.marker);
  this.infoEnabled = !this.infoEnabled;
};

Marker.prototype.remove = function() {
  this.marker.setMap(null);
};

Marker.prototype.destroy = function() {
  this.remove();
  google.maps.event.clearInstanceListeners(this.marker);
  google.maps.event.clearInstanceListeners(this.info);
};

Marker.prototype.update = function(station) {
  this.marker.setIcon(getIcon(station.nbBikes, station.nbEmptyDocks));
  this.info.setContent(station.nbBikes + '/' + (station.nbBikes + station.nbEmptyDocks));
};

function padZero(s) {
  if (s < 10)
    return '0' + s;
  return s;
}

function secondsToString(time) {
  var seconds = time % 60;
  var minutes = Math.floor(time / 60);
  var hours = Math.floor(minutes / 60);
  return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
}

function UpdateTimer(map) {
  this.time = 0;
  this.timer = document.createElement('div');
  this.timer.textContent = secondsToString(this.time);
  this.timer.className = 'timer';
  this.interval = setInterval(() => {
    this.time++;
    this.timer.textContent = secondsToString(this.time);
  }, 1000);

  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(this.timer);
}

UpdateTimer.prototype.update = function() {
  this.time = 0;
};

var BikeMap = React.createClass({
  mixins: [Reflux.connect(BikeStore)],
  componentDidMount() {
    this.markers = {};
    this.info = {};

    this.map = new google.maps.Map(this.refs.map_canvas.getDOMNode(), {
      zoom: 12,
      center: new google.maps.LatLng(38.88, -77.01)
    });

    this.lastUpdate = Date.now();
    this.updateTimer = new UpdateTimer(this.map);
    setTimeout(actions.getBikes, 1000);
  },
  shouldComponentUpdate(nprops, nstate) {
    if (this.lastUpdate < nstate.lastUpdate) {
      this.lastUpdate = nstate.lastUpdate;
      this.updateTimer.update(nstate.lastUpdate);
    }

    for (var id in nstate.stations) {
      if (id in this.state.stations)
        this.markers[id].update(nstate.stations[id]);
      else
        this.markers[id] = new Marker(nstate.stations[id], this.map);
    }

    for (id in this.state.stations) {
      if (!(id in nstate.stations)) {
        this.markers[id].destroy();
        delete this.markers[id];
      }
    }

    return false;
  },
  render() {
    return (
      <div id="map_canvas" ref="map_canvas">
      </div>
    );
  }
});

module.exports = BikeMap;