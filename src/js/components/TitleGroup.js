import React from 'react';
import Radium from 'radium';

const styles = {
  main: {
    fontSize: '1.4rem',

    ':hover': {
      textDecoration: 'underline'
    }
  },
  sub: {
    fontSize: '1rem'
  }
}

@Radium
export default class TitleGroup extends React.Component {
  render() {
    return(
      <div>
        <div key="main" style={ styles.main }>{ this.props.main }</div>
        <div style={ styles.sub }>{ this.props.sub }</div>
      </div>
    );
  }
}