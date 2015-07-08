import React from 'react';
import Radium from 'radium';
import TextIcon from './TextIcon';
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

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleGroup: {
    flex: '0 0 70%'
  },
  iconGroup: {
    flex: '0 0 25%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  icon: {
    flex: '0 0 60px',
    '@media (max-width: 550px)': {
      flex: '0 0 30px'
    }
  },
  textIcon: {
    icon: {
      marginLeft: '8px',
      '@media (max-width: 550px)': {
        marginLeft: '0px'
      }
    }
  }
}

@Radium
export default class StationRow extends React.Component {
  render() {
    const mapsHref = makeMapsLink(
      'Current+Location',
      stringifyLatLng({
        lat: this.props.station.lat,
        lng: this.props.station.lng
      })
    );

    return (
      <div style={ styles.container }>
        <div style={ styles.titleGroup }>
          <TitleGroup main={ <a href={ mapsHref }>{this.props.station.name}</a> }
                      sub={ 'Distance: ' + roundDistance(this.props.station.distance) } />
        </div>
        <div style={ styles.iconGroup }>
          <div key="1" style={ styles.icon }>
            <TextIcon icon="directions_bike"
                      text={ this.props.station.nbBikes }
                      styles={ styles.textIcon } />
          </div>
          <div key="2" style={ styles.icon }>
            <TextIcon icon="space_bar"
                      text={ this.props.station.nbEmptyDocks }
                      styles={ styles.textIcon } />
          </div>
        </div>
      </div>
    );
  }
}