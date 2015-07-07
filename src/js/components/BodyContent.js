import React from 'react';

export default class BodyContent extends React.Component {
  render() {
    return (
      <div className="col s12 l8 offset-l2 m10 offset-m1">
        {this.props.children}
      </div>
    );
  }
}