import React from 'react';

export default class Intro extends React.Component {
  render() {
    return (
      <div className="tutorial">
        <h1 className="tutorial__header">Welcome to BikeInDC</h1>
        <div className="tutorial__details">
        <p>It looks like this is your first time 
            here. Let me show you around.</p>
        </div>
      </div>
    );
  }
}