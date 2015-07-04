import React, { findDOMNode, PropTypes } from 'react';
import { encodeComponent, decodeComponent } from '../utils';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class Search extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      search: PropTypes.string
    })
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
      search: props.params && props.params.search || ''
    }
  }

  // Update the internal state when routing changes occur
  componentWillReceiveProps(nextProps) {
    if (this.state.search !== nextProps.params.search) {
      this.setState({
        search: nextProps.params.search
      });
    }
  }

  render() {
    const locationActive = this.context.router.isActive('/nearby') &&
                          !this.context.router.isActive('/nearby/');

    return (
      <nav className="search-bar">
        <div className="nav-wrapper blue lighten-2">
          <form onSubmit={(e) => {e.preventDefault()}}>
            <div className="row">
              <div className="col s2 l3 center-align">
                <Link to="/nearby">
                  <i className={classnames('medium material-icons',
                                            {'white-text': locationActive},
                                            {'grey-text text-lighten-2': !locationActive})}>
                    {locationActive ? 'my_location' : 'location_disabled'}
                  </i>
                </Link>
              </div>
              <div className="col s8 l6 input-field">
                <input
                  className="center-align"
                  id="search"
                  type="search"
                  ref="search"
                  onKeyUp={this.handleOnKeyUp}
                  onChange={this.handleOnChange}
                  value={this.state.search}
                  placeholder="Search by Address or Place" />
              </div>
              <a href="#" className="col s2 l3 center-align"
                 onClick={(e) => {
                  e.preventDefault();
                  this.handleSearch();
                 }}>
                 <i className="material-icons">send</i>
              </a>
            </div>
          </form>
        </div>
      </nav>
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