export function encodeComponent(s) {
  return encodeURIComponent(s).replace(/%20/g, '+');
}

export function decodeComponent(s) {
  return decodeURIComponent(s.replace(/\+/g, '%20'));
}

export function sortByDistanceTo(dest, origins = []) {
  origins.map((s) => {
    s.distance = haversineDistance(s, dest);
    return s;
  });

  return origins.sort((a, b) => {
    if (a.distance < b.distance)
      return -1;
    else if (a.distance > b.distance)
      return 1;
    return 0;
  });
}

export function round(n, places = 6) {
  const order = Math.pow(10, places);
  return Math.round(n * order) / order;
}

export function stringifyLatLng(loc) {
  let lat = loc.lat;
  let lng = loc.lng;
  if (typeof loc.lat === 'function') {
    lat = loc.lat();
    lng = loc.lng();
  }

  return round(lat).toString() + ',' + round(lng).toString();
}

function kmToMi(km) {
  return km * 0.621371;
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
  return kmToMi(r * c);
}

function radians(deg) {
  return deg/180.0 * Math.PI;
}