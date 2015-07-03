import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import Station from './Station';

import { sortByDistanceTo, decodeComponent } from '../utils';
import shallowEqual from 'redux/lib/utils/shallowEqual';

import { startTrackingLocation, stopTrackingLocation } from '../actions/location';

function getLocation(props) {
  if (props.params && props.params.latlng) {
    const [lat, lng] = props.params.latlng.split(',');
    return { loc: { lat: parseFloat(lat), lng: parseFloat(lng) } };
  }
  return { loc: props.loc };
}

// If the route is /nearby/lat,lng then stop location tracking
// If the route is /nearby then ensure location tracking is enabled
function toggleTracking(props) {
  if (props.params && props.params.latlng)
    return props.dispatch(stopTrackingLocation());
  else
    return props.dispatch(startTrackingLocation());
}

@connect(state => ({
  loc: state.location.location,
  stations: state.station.stations
}))
export default class NearbyStations extends React.Component {
  constructor(props) {
    super(props);

    toggleTracking(props);
    this.state = getLocation(props);
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    toggleTracking(nextProps);

    const nextLoc = getLocation(nextProps).loc;
    if (this.state.loc && nextLoc &&
        shallowEqual(this.state.loc, nextLoc))
      return;

    this.setState(getLocation(nextProps));
  }

  render() {
    if (!this.state.loc) {
      return (
        <div className="preloader-wrapper big active primary-spinner">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      );
    }

    const stations = this.state.loc ?
      sortByDistanceTo(
        this.state.loc,
        this.props.stations).map((s) => (
          <Station
            state={s}
            key={s.id} />))
      : '';

    var near = 'You';
    if (this.context.router.isActive('/nearby/')) {
      near = this.props.location.query ? 
                decodeComponent(this.props.location.query.name)
              : this.props.params.latlng;
    }

    return (
      <div className="row">
        <div className="center-align results-header">Stations near: {near}</div>
        <div className="collection col s12 m8 offset-m2">
          {stations}
        </div>
      </div>
    );
  }
}