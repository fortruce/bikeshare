import React, { PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';

import Search from './Search';
import GpsIcon from './GpsIcon';

const styles = {
  both: {
    boxSizing: 'border-box',
    backgroundColor: '#64b5f6',
    lineHeight: '64px',
    height: '64px'
  },
  nav: {
    position: 'fixed',
    zIndex: '20',
    top: 0,
    left: 0,
    width: '100%',
    boxShadow: '0 2px 5px 0 ' +
               color('#000').alpha(.16).hslString() +
               ',0 2px 10px 0 ' +
               color('#000').alpha(.12).hslString()
  },
  search: {
    padding: 0,
    width: '100%',
    boxShadow: 'none',
    border: 'none',
    textAlign: 'center',
    color: '#665555',
    transition: 'all .3s',

    ':focus': {
      backgroundColor: '#fff',
      outline: 'none'
    }
  }
}

@Radium
export default class NavBar extends React.Component {
  static PropTypes = {
    search: PropTypes.string.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    const gpsActive = this.context.router.isActive('/nearby') &&
                      !this.context.router.isActive('/nearby/');
    return (
      <nav  style={[
              styles.both,
              styles.nav
            ]}>
        <div className="row">
          <div className="col s2 l3">
            <GpsIcon disabled={!gpsActive} />
          </div>
          <div className="col s8 l6">
            <Search search={this.props.search}
                    style={[
                      // manually include base styles here instead of inherit
                      // for IE support
                      styles.both,
                      styles.search
                    ]} />
          </div>
          <div className="col s2 l3"></div>
        </div>
      </nav>
    );
  }
}