import React, { PropTypes } from 'react';
import Search from './Search';
import BodyContent from './BodyContent';
import NavBar from './NavBar';

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

  componentWillMount() {
    if (!window.localStorage.getItem('tutorial')) {
      window.localStorage.setItem('tutorial', true);
      this.context.router.transitionTo('/tutorial/intro');
    }
  }

  render() {
    return (
      <div>
        <NavBar search={this.props.params && this.props.params.search || ''} />
        <BodyContent>
          {this.props.children}
        </BodyContent>
      </div>
    )
  }
}