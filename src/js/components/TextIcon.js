import React from 'react';

export default class TextIcon extends React.Component {
  render() {
    return (
      <div className="text-icon">
        <div>{this.props.text}</div>
        <i className="material-icons">{this.props.icon}</i>
      </div>
    );
  }
}