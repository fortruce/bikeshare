import React from 'react';
import { Link } from 'react-router';

const GITHUB_LINK = 'https://github.com/fortruce/bikeshare';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="menu__header">This is the menu!</div>
        <ul className="menu__links">
          <li className="menu__links__link">
            <Link to="/favorites">Favorites</Link>
          </li>
          <li className="menu__links__link">
            <Link to="/tutorial/intro">Help</Link>
          </li>
          <li className="menu__links__link">
            <Link to="/about">About</Link>
          </li>
          <li className="menu__links__link">
            <a href={GITHUB_LINK} target="_blank">Github</a>
          </li>
        </ul>
      </div>
    );
  }
}