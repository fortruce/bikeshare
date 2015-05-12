function radians(deg) {
  return deg/180.0 * Math.PI;
}

function haversineDistance(a, b) {
  var r = 6372.8;
  var alat = radians(a.lat);
  var alng = radians(a.lng);
  var blat = radians(b.lat);
  var blng = radians(b.lng);
  var deltaLat = blat - alat;
  var deltaLng = blng - alng;
  var aa = Math.sin(deltaLat/2)*Math.sin(deltaLat/2) +
          Math.sin(deltaLng/2)*Math.sin(deltaLng/2) *
          Math.cos(alat) * Math.cos(blat);
  var c = 2*Math.asin(Math.sqrt(aa));
  return r * c;
}

function sortPointsToDest(dest, points) {
  var distances = Object.create(null);
  points.forEach((s) => {
    var p = {lat: s.lat, lng: s.lng};
    distances[s.id] = haversineDistance(p, dest);
  });
  return points.sort((a, b) => {
    if (distances[a.id] < distances[b.id])
      return -1;
    else if (distances[a.id] > distances[b.id])
      return 1;
    return 0;
  });
}

function testDistance() {
  var stations = sortPointsToDest(this.position, _stations).slice(0,5);
  stations.forEach((s) => {
    console.log(s.name);
  });
}