import React, { PropTypes } from 'react';
import Menu from './Menu';
import BodyContent from './BodyContent';
import NavBar from '../navbar/NavBar';

export default class Application extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      search: PropTypes.string
    }),
    children: PropTypes.any
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    active: false
  }

  componentWillMount() {
    if (!window.localStorage.getItem('tutorial')) {
      window.localStorage.setItem('tutorial', true);
      this.context.router.transitionTo('/tutorial/intro');
    }
  }

  closeMenu = () => {
    this.setState({ active: false });
  }
  openMenu = () => {
    this.setState({ active: true });
  }

  render() {
    return (
      <div id="layout">
        <div id="menu" className={ this.state.active ? 'active' : ''} >
          <Menu closeMenu={this.closeMenu}
                active={this.state.active} />
        </div>
        <div id="main">
          <NavBar search={this.props.params && this.props.params.search || ''}
                  closeMenu={this.closeMenu}
                  openMenu={this.openMenu}
                  active={this.state.active} />
          <BodyContent>
            { this.props.children }
          </BodyContent>
        </div>
      </div>
    );
  }
}