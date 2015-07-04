import React, { PropTypes } from 'react';
import Search from './Search';
import Menu from './Menu';
import BodyContent from './BodyContent';

export default class Application extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div>
        <Search {...this.props} />
        <div className="main-content row">
          <Menu />
          <BodyContent>
            {this.props.children}
          </BodyContent>
        </div>
      </div>
    )
  }
}