import React from 'react';

const styles = {
  fontSize: '1.3rem',
  margin: '18px auto',
  textAlign: 'center'
}

export default class CollectionHeader extends React.Component {
  render() {
    return (
      <div style={ styles }>
        {this.props.children}
      </div>
    );
  }
}