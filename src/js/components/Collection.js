import React from 'react';

const styles = {
  collection: {
    border: '1px solid #e0e0e0',
    backgroundColor: '#fefefe'
  },
  item: {
    backgroundColor: 'inherit',
    lineHeight: '1.5rem',
    margin: '0',
    padding: '15px 20px 12px 20px',
    borderBottom: '1px solid #e0e0e0'
  }
}

export default class Collection extends React.Component {
  render() {
    return (
      <div style={ styles.collection }>
        { this.props.children.map((c, i) => (
            <div key={i} style={ styles.item }>{c}</div>
          )) }
      </div>
    );
  }
}