var React = require('react');
var BikeMap = require('./components/BikeMap');
var actions = require('./actions/actions');

var Router = require('react-router');
var { Route, RouteHandler } = Router;

setTimeout(actions.getBikes, 0);
setInterval(actions.getBikes, 15000);

var routes = (
  <Route handler={BikeMap} path="/">
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('container'));
});