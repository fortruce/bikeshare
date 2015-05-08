var React = require('react');
var BikeMap = require('./components/BikeMap');
var actions = require('./actions/actions');
var Map = require('./components/Map');

var { Marker } = require('./components/MapComponents');

// setTimeout(actions.getBikes, 0);
// setInterval(actions.getBikes, 15000);

React.render(
  <Map  style={{height: "100%"}}
        zoom={12}>
    <Marker position={{lat: 38.88, lng: -77.01}}
            title="test title"
            click={() => {console.log('clicked');}} />
  </Map>,
  document.getElementById('container')
);