import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import Search from './Search';
import GpsIcon from '../pure/GpsIcon';

@connect(state => ({
  disabled: !state.location.tracking
}))
export default class NavBar extends React.Component {
  static PropTypes = {
    search: PropTypes.string.isRequired,
    closeMenu: PropTypes.func.isRequired,
    openMenu: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    const { search, closeMenu, openMenu, disabled, active } = this.props;

    return (
      <nav  className="navbar">
        <div className="navbar__icon">
          <GpsIcon disabled={disabled}
                   link="/nearby" />
        </div>
        <div className="navbar__search">
          <Search search={search}/>
        </div>
        <div className="navbar__icon">
          <div className="icon  menu__toggle">
            <i className="material-icons"
               onClick={ active ? closeMenu : openMenu }>{ active ? 'close' : 'menu' }</i>
          </div>
        </div>
      </nav>
    );
  }
}