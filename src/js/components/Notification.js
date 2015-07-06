import React from 'react';

export default class Notification extends React.Component {
  render() {
    return (
      <div className="notification center-align">
        {this.props.children}
      </div>
    );
  }
}