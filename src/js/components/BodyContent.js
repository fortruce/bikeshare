import React from 'react';

const styles = {
  marginTop: '64px'
};

export default class BodyContent extends React.Component {
  render() {
    return (
      <div  style={ styles }
            className="col s12 l6 offset-l3 m10 offset-m1">
        {this.props.children}
      </div>
    );
  }
}