import React, { PropTypes } from 'react';
import { connect } from 'redux/react';

// utility functions
import { sortByDistanceTo, decodeComponent } from '../../utils';
import { startTrackingLocation, stopTrackingLocation } from '../../actions/location';
import shallowEqual from 'redux/lib/utils/shallowEqual';

// Components
import Collection from '../containers/Collection';
import Notification from '../containers/Notification';
import LoadingSpinner from '../LoadingSpinner';
import StationRow from '../StationRow';


function getLocation(props) {
  if (props.params && props.params.latlng) {
    const [lat, lng] = props.params.latlng.split(',');
    return { loc: { lat: parseFloat(lat), lng: parseFloat(lng) } };
  }
  return { loc: props.loc };
}

// Indicates if the current props state should be tracking location
// If the route is /nearby/lat,lng then stop location tracking
// If the route is /nearby then ensure location tracking is enabled
function shouldBeTracking(props) {
  return !(props.params && props.params.latlng);
}

function toggleTracking(props) {
  if (shouldBeTracking(props)) {
    props.dispatch(startTrackingLocation());
  } else {
    props.dispatch(stopTrackingLocation());
  }
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
    let near = 'You';
    if (this.context.router.isActive('/nearby/')) {
      near = this.props.location.query ?
              decodeComponent(this.props.location.query.name) :
              this.props.params.latlng;
    }

    if (!this.state.loc) {
      return (
        <Notification>
          <LoadingSpinner title={'Loading Stations near ' + near}/>
        </Notification>
      );
    }

    const stations = this.state.loc ?
      sortByDistanceTo(
        this.state.loc,
        this.props.stations
      ).map((s, i) => (
          <StationRow
            station={s}
            key={i} />)
      ).slice(0, 15)
      : '';

    return (
      <div>
        <Collection header={ 'Stations near ' + near }>
          {stations}
        </Collection>
      </div>
    );
  }
}