import React from 'react';

export default class BodyContent extends React.Component {
  render() {
    return (
      <div className="col s12 l8 offset-l2">
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}