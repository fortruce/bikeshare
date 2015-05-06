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
  this.position = {lat: station.lat, lng: station.long};

  this.marker = new google.maps.Marker({
    position: this.position,
    icon: getIcon(station.nbBikes, station.nbEmptyDocks),
    map: map
  });

  this.info = new google.maps.InfoWindow({
    content: station.name + '\n' + station.nbBikes + '/' + (station.nbBikes + station.nbEmptyDocks)
  });

  google.maps.event.addListener(this.info, 'closeclick', this.close.bind(this));
  google.maps.event.addListener(this.marker, 'click', this.toggleInfo.bind(this));
  google.maps.event.addListener(this.marker, 'mouseover', this.open.bind(this));
  google.maps.event.addListener(this.marker, 'mouseout', this.close.bind(this));
}

Marker.prototype.open = function() {
  if (this.infoEnabled)
    return;

  this.infoEnabled = true;
  this.info.open(this.map, this.marker);
};

Marker.prototype.close = function() {
  if (!this.infoEnabled || this.click)
    return;

  this.infoEnabled = false;
  this.info.close();
};

Marker.prototype.toggleInfo = function() {
  if (this.click) {
    this.close();
    this.click = false;
    return;
  }
  this.click = true;
  this.open();
  return;
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
  this.info.setContent(station.name + '\n' + station.nbBikes + '/' + (station.nbBikes + station.nbEmptyDocks));
};

module.exports = Marker;