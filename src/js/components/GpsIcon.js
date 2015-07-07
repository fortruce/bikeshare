import React from 'react';
import { Link } from 'react-router';

import Radium from 'radium';
import color from 'color'

const styles = {
  base: {
    color: '#fff',
    fontSize: '2rem',
    lineHeight: '64px'
  },
  disabled: {
    color: color('#9e9e9e').lighten(.2).hexString()
  },
  container: {
    textAlign: 'center'
  }
}

@Radium
export default class GpsIcon extends React.Component {
  render() {
    return (
      <div style={ styles.container }>
        <Link to="/nearby">
          <i  className="material-icons"
              style={[
                styles.base,
                this.props.disabled && styles.disabled
              ]}>
            { this.props.disabled ? 'location_disabled' : 'my_location' }
          </i>
        </Link>
      </div>
    );
  }
}