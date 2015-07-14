import React, { PropTypes } from 'react';
import { Link as RouterLink } from 'react-router';

export default class Link extends React.Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    external: PropTypes.bool,
    target: PropTypes.string
  }

  render() {
    if (this.props.external)
      return <a href={this.props.link}
                target={ this.props.target || '_blank' }>
                { this.props.children }
             </a>;

    return <RouterLink to={this.props.link}>
             { this.props.children }
           </RouterLink>;
  }
}