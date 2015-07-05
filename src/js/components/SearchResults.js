import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import { search } from '../actions/search';
import { decodeComponent, stringifyLatLng } from '../utils';
import { Link } from 'react-router';
import LoadingSpinner from './LoadingSpinner';

@connect(state => ({
  results: state.search.results,
  query: state.search.query,
  inProgress: state.search.inProgress
}))
export default class SearchResults extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.dispatch(search(decodeComponent(this.props.params.search),
                               this.context.router));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.search !== nextProps.params.search)
      this.props.dispatch(search(decodeComponent(nextProps.params.search),
                                 this.context.router));
  }

  render() {
    // If search is in progress, display loading spinner
    if (this.props.inProgress) {
      console.log('loading spinner');
      return <LoadingSpinner />;
    }
    // If results is empty (still loading), don't display anything
    // otherwise, 'Did you mean...' will flash on screen before redirect
    // if only 1 result is found thru search
    // Also, only display results if the query matches the current search
    if (this.props.results.length === 0 ||
        this.props.query !== decodeComponent(this.props.params.search))
      return null;

    const results = this.props.results.map((r, i) => (
      <div className="collection-item result" key={i}>
        <div className="result__title">
          <Link to={"/nearby/" + stringifyLatLng(r.geometry.location)}
                query={{name: r.name}}>
            {r.name}
          </Link>
        </div>
        <div className="row">
          <p className="result__subtitle col offset-s1">@ {r.formatted_address}</p>
        </div>
      </div>
    ));

    return (
      <div>
        <div className="center-align results-header">Did you mean...</div>
        <div className="collection">
          {results}
        </div>
      </div>
    );
  }
}