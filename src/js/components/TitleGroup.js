import React from 'react';

const styles = {
  main: {
    fontSize: '1.4rem'
  },
  sub: {
    fontSize: '1rem'
  }
}

export default class TitleGroup extends React.Component {
  render() {
    return(
      <div>
        <div style={ styles.main }>{ this.props.main }</div>
        <div style={ styles.sub }>{ this.props.sub }</div>
      </div>
    );
  }
}