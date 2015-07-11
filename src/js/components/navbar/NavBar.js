import React, { PropTypes } from 'react';
import Search from './Search';
import GpsIcon from './GpsIcon';

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
      <nav  className="navbar">
        <div className="navbar__icon">
          <GpsIcon disabled={!gpsActive} />
        </div>
        <div className="navbar__search">
          <Search search={this.props.search}/>
        </div>
        <div className="navbar__icon"></div>
      </nav>
    );
  }
}