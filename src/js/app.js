var React = require('react');
var actions = require('./actions/actions');

var Router = require('react-router');
var { Route, RouteHandler, DefaultRoute } = Router;
var RouterContainer = require('./RouterContainer');

var BikeMap = require('./components/BikeMap');
var StationList = require('./components/StationList');
var Location = require('./components/Location');

var routes = (
  <Route path="/">
    <DefaultRoute handler={Location} />
    <Route name="location" path="loc" handler={Location}>
      <Route name="near" path=":location" handler={StationList} />
    </Route>
    <Route name="map" handler={BikeMap} />
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('container'));
});