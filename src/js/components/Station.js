import React from 'react';
import { round, stringifyLatLng } from '../utils';
import url from 'url';

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

export default class Station extends React.Component {
  render() {
    return (
      <div className="collection-item result">
        <div className="row">
          <div className="col s9 m7">
            <div className="result__title">
              <a href={makeMapsLink('Current+Location',
                                    stringifyLatLng({
                                      lat: this.props.state.lat,
                                      lng: this.props.state.lng
                                    }))} className="result__title">
                {this.props.state.name}
              </a>
            </div>
            <p className="result__subtitle">Distance: {roundDistance(this.props.state.distance)} mi</p>
          </div>
          <div className="result__info col s1 m2 right-align">
            <span>{this.props.state.nbBikes} </span><i className="material-icons">directions_bike</i>
          </div>
          <div className="result__info col s1 offset-s1 offset-m1 m2 right-align">
            <span>{this.props.state.nbEmptyDocks}</span> <i className="material-icons">space_bar</i>
          </div>
        </div>
      </div>
    );
  }
}