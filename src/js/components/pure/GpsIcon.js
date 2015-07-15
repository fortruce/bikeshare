import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class GpsIcon extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    link: PropTypes.string
  }
  render() {
    const { disabled, link } = this.props;
    const icon = disabled ? 'location_disabled' : 'my_location';
    return (
      <div className="icon icon--gps">
        <Link to={ link }>
          <i  className={classnames("material-icons", { disabled })}>
            { icon }
          </i>
        </Link>
      </div>
    );
  }
}