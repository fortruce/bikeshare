import React, { PropTypes } from 'react';
import Link from '../pure/Link';
import LabeledIcon from '../pure/LabeledIcon';
import { Link as RouterLink } from 'react-router';

const GITHUB_LINK = 'https://github.com/fortruce/bikeshare';

function renderLinks(links) {
  return links.map(link => (
    <li className="menu__links__link">
      <Link {...link}>
        <LabeledIcon label={link.title}
                     position="after"
                     icon={link.icon} />
      </Link>
    </li>
  ))
}

export default class Menu extends React.Component {
  static propTypes = {
    closeMenu: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }

  componentWillMount() {
    document.body.addEventListener('click', this.documentClickHandler);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.documentClickHandler);
  }

  documentClickHandler = (e) => {
    if (this.props.active) {
      this.props.closeMenu();
      e.stopPropagation();
    }
  }

  render() {
    const links = [
      { link: '/', title: 'Favorites', icon: 'favorite_border' },
      { link: '/tutorial/intro', title: 'Tutorial', icon: 'help_outline' },
      { link: '/about', title: 'About', icon: 'info_outline' },
      { link: GITHUB_LINK, title: 'Github', icon: 'code', external: true }
    ];

    return (
      <div className="menu">
        <div className="menu__header">
          <div className="menu__header__text">
            <RouterLink to="/">
              <LabeledIcon label="Bike In DC"
                           icon="directions_bike"
                           position="after" />
            </RouterLink>
          </div>
        </div>
        <ul className="menu__links">
          { renderLinks(links) }
        </ul>
      </div>
    );
  }
}