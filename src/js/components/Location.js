var React = require('react');
var Reflux = require('reflux');

var Router = require('react-router');
var { RouteHandler } = Router;
var LocationStore = require('../stores/LocationStore');

var actions = require('../actions/actions');

var Location = React.createClass({
  mixins: [Reflux.connect(LocationStore)],
  statics: {
    willTransitionTo(t, params) {
      // If no location is specified, then default to tracking the geolocation
      if (!params.location) {
        actions.trackLocation();
      }
    }
  },
  render() {
    var buttonClass = this.state.tracking ? "" : " secondary";
    return (
      <div>
        <div className="row">
          <form className="large-offset-3 large-6 column">
            <div className="row collapse">
              <div className="small-2 column">
                <a className={"button prefix" + buttonClass}
                   onClick={this.currentLocation} >#</a>
              </div>
              <div className="small-10 column">
                <input  className="small-9 columns"
                        type="text"
                        placeholder="Location" />
              </div>
            </div>
          </form>
        </div>
        <RouteHandler/>
      </div>
    );
  },
  currentLocation() {
    if (!this.state.tracking) {
      actions.trackLocation();
    } else {
      actions.stopTrackLocation();
    }
  }
});

module.exports = Location;