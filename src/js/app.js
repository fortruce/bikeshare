var React = require('react');
var BikeMap = require('./components/BikeMap');
var actions = require('./actions/actions');

setInterval(actions.getBikes, 1000);

React.render(
  <BikeMap />,
  document.getElementById('container')
);