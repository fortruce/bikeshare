import React, { PropTypes } from 'react';
import Search from './Search';

export default class Application extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div>
        <Search {...this.props} />
        <div className="main-content container">
            {this.props.children}
        </div>
      </div>
    )
  }
}