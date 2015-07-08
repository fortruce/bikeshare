import React from 'react';
import Radium from 'radium';

const styles = {
  width: '100%',
  minWidth: '300px',
  margin: '82px auto 0 auto',

  '@media (min-width: 480px)': {
    width: '95%'
  },

  '@media (min-width: 768px)': {
    width: '80%'
  },

  '@media (min-width: 992px)': {
    width: '70%'
  },

  '@media (min-width: 1200px)': {
    width: '60%'
  },

  '@media (min-width: 1400px)': {
    width: '50%'
  }
};

@Radium
export default class BodyContent extends React.Component {
  render() {
    return (
      <div  style={ styles }>
        {this.props.children}
      </div>
    );
  }
}