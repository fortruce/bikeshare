var React = require('react');
var Reflux = require('reflux');

var Router = require('react-router');
var { RouteHandler } = Router;
var LocationStore = require('../stores/LocationStore');

var actions = require('../actions/actions');

var Location = React.createClass({
  mixins: [Reflux.connect(LocationStore)],
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    willTransitionTo(t, params) {
      if (!params.location) {
        console.log('location willTransitionTo')
        var state = LocationStore.getState();
        if (state.location)
          t.redirect('near', {
            location: state.location.lat + ':' + state.location.lng
          });
      }
    }
  },
  componentDidMount() {
    console.log('location mount');
    actions.trackLocation();
  },
  render() {
    var buttonClass = this.state.tracking ? "" : " secondary";
    return (
      <div>
        <div className="row">
          <form className="large-offset-3 large-6 column"
                onSubmit={this.searchLocation}>
            <div className="row collapse">
              <div className="small-2 column">
                <a className={"button prefix" + buttonClass}
                   onClick={this.currentLocation} >#</a>
              </div>
              <div className="small-10 column">
                <input  ref="geocode"
                        className="small-9 columns"
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
  searchLocation(e) {
    e.preventDefault();
    if (this.state.tracking)
      actions.stopTrackLocation();
    this.context.router.transitionTo('near', {
      location: '38.88:-77.01'
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

module.exports = Location;