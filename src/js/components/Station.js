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

const styles = {
  base: {
    marginBottom: 0
  },
  title: {
    fontSize: '1.5rem'
  },
  subtitle: {
    lineHeight: '1.5rem',
    marginBottom: 0,
    marginTop: '5px'
  },
  number: {
    display: 'flex',
    marginTop: '10px',
    fontSize: '1.8rem',
    textAlign: 'right'
  },
  icon: {
    flex: '1 0 64px',
    marginLeft: '5px'
  }
}

export default class Station extends React.Component {
  render() {
    return (
      <div  style={ styles.base }
            className="row">
        <div className="col s9 m7">
          <a  style={ styles.title }
              href={makeMapsLink('Current+Location',
                                stringifyLatLng({
                                  lat: this.props.state.lat,
                                  lng: this.props.state.lng
                                }))}>
            {this.props.state.name}
          </a>
          <p style={ styles.subtitle }>Distance: {roundDistance(this.props.state.distance)} mi</p>
        </div>
        <div style={ styles.number } className="col s1 m2">
          <span>{this.props.state.nbBikes}</span>
          <i  style={ styles.icon }
              className="material-icons">directions_bike</i>
        </div>
        <div style={ styles.number } className="col s1 offset-s1 offset-m1 m2">
          <span>{this.props.state.nbEmptyDocks}</span>
          <i  style={ styles.icon }
              className="material-icons">space_bar</i>
        </div>
      </div>
    );
  }
}