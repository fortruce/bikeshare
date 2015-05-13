var React = require('react');
var actions = require('./actions/actions');

var Router = require('react-router');
var { Route, RouteHandler } = Router;

var BikeMap = require('./components/BikeMap');
var StationList = require('./components/StationList');

setTimeout(actions.getBikes, 0);
setInterval(actions.getBikes, 15000);

var routes = (
  <Route path="/">
    <Route name="list" path="list" handler={StationList} />
    <Route name="map" handler={BikeMap} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('container'));
});