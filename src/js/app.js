var React = require('react');
var actions = require('./actions/actions');

var Router = require('react-router');
var { Route, RouteHandler, DefaultRoute } = Router;
var RouterContainer = require('./RouterContainer');

var BikeMap = require('./components/BikeMap');
var LocationResults = require('./components/LocationResults');
var LocationBar = require('./components/LocationBar');
var SearchResults = require('./components/SearchResults');

var App = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="column small-12 large-10 large-offset-1">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route path="/">
    <Route path="/" handler={App}>
      <DefaultRoute handler={LocationBar} />
      <Route name="near" path="near" handler={LocationBar}>
        <Route name="location" path="location/:location" handler={LocationResults} />
        <Route name="search" path="search/:search" handler={SearchResults} />
      </Route>
    </Route>
    <Route name="map" handler={BikeMap} />
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('container'));
});