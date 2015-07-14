import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class Icon extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    classNames: PropTypes.array
  }

  render() {
    return <i className={ classnames('material-icons', ...this.props.classNames) }>
              { this.props.icon }
           </i>;
  }
}