import React from 'react';

export default class BodyContent extends React.Component {
  render() {
    return (
      <div className="col s12 l9 offset-l3">
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}