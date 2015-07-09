import React, { PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';

import Search from './Search';
import GpsIcon from './GpsIcon';

const styles = {
  both: {
    backgroundColor: '#64b5f6',
    lineHeight: '64px',
    height: '64px'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    zIndex: '20',
    top: 0,
    left: 0,
    width: '100%',
    fontSize: '1.4rem',
    boxShadow: '0 2px 5px 0 ' +
               color('#000').alpha(.16).hslString() +
               ',0 2px 10px 0 ' +
               color('#000').alpha(.12).hslString()
  },
  searchWrap: {
    flex: '1 0 70%',
    position: 'relative'
  },
  gpsWrap: {
    flex: '0 0 15%'
  },
  afterSearch: {
    flex: '0 0 15%'
  },
  search: {
    color: '#fff',

    ':focus': {
      backgroundColor: '#fff',
      color: '#665555',
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
        <div style={ styles.gpsWrap }>
          <GpsIcon disabled={!gpsActive} />
        </div>
        <div style={ styles.searchWrap }>
          <Search search={this.props.search}
                  styles={[
                    // manually include base styles here instead of inherit
                    // for IE support
                    styles.both,
                    styles.search
                  ]} />
        </div>
        <div style={ styles.afterSearch }></div>
      </nav>
    );
  }
}