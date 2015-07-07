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

  render() {
    return (
      <div>
        <NavBar search={this.props.params && this.props.params.search || ''} />
        <div className="main-content row">
          <BodyContent>
            {this.props.children}
          </BodyContent>
        </div>
      </div>
    )
  }
}