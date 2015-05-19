var React = require('react');
var Reflux = require('reflux');

var Router = require('react-router');
var { RouteHandler, State } = Router;
var LocationStore = require('../stores/LocationStore');

var actions = require('../actions/actions');

var LocationBar = React.createClass({
  mixins: [Reflux.connect(LocationStore), State],
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    willTransitionTo(t, params, query) {
      // turn on tracking if no search or location is queried
      // if already tracking, trackLocation is garaunteed to trigger
      // a locationChange to redirect to current location
      if (!(params.search || params.location) || query.tracking) {
        actions.trackLocation();
      }
    }
  },
  getSearchParam() {
    if (this.getParams().search)
      return (new Buffer(this.getParams().search, 'base64')).toString('ascii');
    if (this.getQuery().search)
      return (new Buffer(this.getQuery().search, 'base64')).toString('ascii');
    return '';
  },
  getInitialState() {
    return {
      search: this.getSearchParam()
    };
  },
  componentWillReceiveProps() {
    if (this.getSearchParam() !== '') {
      this.setState({
        search: this.getSearchParam()
      });
    }
  },
  render() {
    var buttonClass = this.state.tracking ? "" : " secondary";
    return (
      <div>
          <form  onSubmit={this.searchLocation}>
            <div className="row collapse">
              <div className="small-2 column">
                <a className={"button prefix" + buttonClass}
                   onClick={this.currentLocation} >#</a>
              </div>
              <div className="small-10 column">
                <input  ref="search"
                        value={this.state.search}
                        onChange={() => this.setState({search: this.refs.search.getDOMNode().value})}
                        type="text"
                        placeholder="Location" />
              </div>
            </div>
          </form>
        <RouteHandler/>
      </div>
    );
  },
  searchLocation(e) {
    e.preventDefault();
    this.context.router.transitionTo('search', {
      search: (new Buffer(this.refs.search.getDOMNode().value.trim())).toString('base64')
    });
  },
  currentLocation() {
    if (!this.state.tracking) {
      actions.trackLocation();
    } else {
      actions.stopTrackLocation();
    }
  }
});

module.exports = LocationBar;