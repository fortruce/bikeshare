var React = require('react');
var Reflux = require('reflux');

var { Link } = require('react-router');

var GeocodeStore = require('../stores/GeocodeStore');
var actions = require('../actions/actions');

var SearchResults = React.createClass({
  mixins: [Reflux.connect(GeocodeStore)],
  statics: {
    willTransitionTo(t, params) {
      // always terminate location tracking on explicit searching
      actions.stopTrackLocation();

      actions.geocode((new Buffer(params.search, 'base64')).toString('ascii'));
    }
  },
  render() {
    var results = this.state.results.map((r) => {
      return (
        <div key={r.place_id}>
          <Link to="location"
            params={{
              location: r.geometry.location.toUrlValue()
            }}
            query={{search: (new Buffer(r.formatted_address)).toString('base64')}}>
              {r.formatted_address}
          </Link>
        </div>
      );
    });
    if (this.state.results.length > 0)
      return (
        <div className="row">
          <div className="column small-10 small-offset-1 large-8 large-offset-2">
            <h3 className="align-center">Search Results</h3>
            {results}
          </div>
        </div>
      );
    else
      return null;
  }
});

module.exports = SearchResults;