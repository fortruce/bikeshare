var React = require('react');
var BikeMap = require('./components/BikeMap');
var actions = require('./actions/actions');
var Map = require('./components/Map');

var InfoMarker = require('./components/InfoMarker');

// setTimeout(actions.getBikes, 0);
// setInterval(actions.getBikes, 15000);

var Test = React.createClass({
  render() {
    return (
      <Map  style={{height: "100%"}}
            zoom={12}>
        <InfoMarker
          marker={{
            position: {lat: 38.88, lng: -77.01},
            title: 'hello'
          }}
          infoWindow={{title: 'goodbye'}} />
      </Map>
    );
  }
});

React.render(
  <Test />,
  document.getElementById('container')
);