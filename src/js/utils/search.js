var nearby = function (map) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: {lat: 38.88, lng: -77.01},
    radius: 20000,
    keyword: 'barrel pennsylvania ave washington dc'
  }, (results, status) => {
    console.log(results);
    console.log(status);
  });
}

module.exports = nearby;