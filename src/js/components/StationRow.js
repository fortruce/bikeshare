import React, { PropTypes } from 'react';
import LabeledIcon from './pure/LabeledIcon';
import TitleGroup from './TitleGroup';

import url from 'url';
import { round, stringifyLatLng } from '../utils';

function roundDistance(distance) {
  // round to 2 decimal places
  distance = round(distance, 2);
  const [whole, decimal] = distance.toString().split('.');
  if (!decimal)
    return distance.toString() + '.00';
  if (decimal.length < 2)
    return distance.toString() + '0';
  return distance.toString();
}

function makeMapsLink(from, to) {
  return url.format({
    protocol: 'https',
    host: 'maps.google.com',
    pathname: 'maps',
    query: {
      saddr: from,
      daddr: to,
      dirflg: 'w'
    }
  }).replace('%2B', '+').replace('%2C', ',');
}

export default class StationRow extends React.Component {
  static propTypes = {
    station: PropTypes.shape({
      distance: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      nbBikes: PropTypes.number.isRequired,
      nbEmptyDocks: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    const mapsHref = makeMapsLink(
      'Current+Location',
      stringifyLatLng({
        lat: this.props.station.lat,
        lng: this.props.station.lng
      })
    );

    return (
      <div className="station-row">
        <div className="station-row__details">
          <TitleGroup main={ <a href={ mapsHref }>{this.props.station.name}</a> }
                      sub={ 'Distance: ' + roundDistance(this.props.station.distance) + ' mi'} />
        </div>
        <div className="station-row__icons">
          <LabeledIcon icon="directions_bike"
                       label={ this.props.station.nbBikes.toString() }
                       position="before" />
          <LabeledIcon icon="space_bar"
                       label={ this.props.station.nbEmptyDocks.toString() }
                       position="before" />
        </div>
      </div>
    );
  }
}