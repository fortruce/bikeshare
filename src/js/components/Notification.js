import React from 'react';
import Radium from 'radium';

const styles = {
  margin: '100px auto',
  fontSize: '1.6rem',
  textAlign: 'center'
}

@Radium
export default class Notification extends React.Component {
  render() {
    return (
      <div style={ styles }>
        {this.props.children}
      </div>
    );
  }
}