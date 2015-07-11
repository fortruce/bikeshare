import React, { PropTypes } from 'react';

export default class TextIcon extends React.Component {
  static propTypes = {
    text: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
          ]).isRequired,
    icon: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="text-icon">
        <div>{this.props.text}</div>
        <i className="material-icons">{this.props.icon}</i>
      </div>
    );
  }
}