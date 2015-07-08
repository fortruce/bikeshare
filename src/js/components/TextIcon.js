import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    fontSize: '1.6rem',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  }
}

@Radium
export default class TextIcon extends React.Component {
  render() {
    return (
      <div style={ styles.base }>
        <div>{this.props.text}</div>
        <div style={ this.props.styles.icon }><i className="material-icons">{this.props.icon}</i></div>
      </div>
    );
  }
}