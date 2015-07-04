import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="col s0 l3 menu center-align">
        <h3>Bike In DC</h3>
        <ul>
          <li><a href="#">Near Me</a></li>
          <li><a href="#">Favorites</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Donate</a></li>
          <li><a href="#">Github</a></li>
        </ul>
      </div>
    );
  }
}