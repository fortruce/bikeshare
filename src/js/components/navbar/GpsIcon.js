import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class GpsIcon extends React.Component {
  render() {
    return (
      <div className="icon icon--gps">
        <Link to="/nearby">
          <i  className={classnames("material-icons", { disabled: this.props.disabled })}>
            { this.props.disabled ? 'location_disabled' : 'my_location' }
          </i>
        </Link>
      </div>
    );
  }
}