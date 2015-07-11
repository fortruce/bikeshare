import React, { findDOMNode, PropTypes } from 'react';
import { encodeComponent, decodeComponent } from '../../utils';
import { Link } from 'react-router';

export default class Search extends React.Component {
  static propTypes = {
    search: PropTypes.string.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getInputValue = this.getInputValue.bind(this);

    // Pull the initial state from the url params
    this.state = {
      search: this.props.search
    }
  }

  // Update the internal state when routing changes occur
  componentWillReceiveProps(nextProps) {
    if (this.state.search !== nextProps.search) {
      this.setState({
        search: nextProps.search
      });
    }
  }

  render() {
    return (
      <input
        id="search"
        type="search"
        ref="search"
        className="search"
        onKeyUp={this.handleOnKeyUp}
        onChange={this.handleOnChange}
        value={this.state.search}
        placeholder="Search by Address or Place" />
    );
  }

  handleOnKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }

  handleOnChange() {
    this.setState({
      search: this.getInputValue()
    });
  }

  handleSearch() {
    if (this.getInputValue().trim() !== '') {
      var route = '/search/' + encodeComponent(this.getInputValue());
      this.context.router.transitionTo(route);
    }
  }

  getInputValue() {
    return findDOMNode(this.refs.search).value;
  }
}