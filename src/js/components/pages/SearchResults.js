import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import { Link } from 'react-router';

// utility functions
import { search } from '../../actions/search';
import { decodeComponent, stringifyLatLng } from '../../utils';

// components
import LoadingSpinner from '../pure/LoadingSpinner';
import Notification from '../containers/Notification';
import Collection from '../containers/Collection';
import TitleGroup from '../TitleGroup';

@connect(state => ({
  results: state.search.results,
  query: state.search.query,
  inProgress: state.search.inProgress,
  error: state.search.error
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
    //    This has the side affect of not displaying old search results
    if (this.props.inProgress) {
      return (
        <Notification>
          <LoadingSpinner title={'Searching for ' + this.props.query} />
        </Notification>
      );
    }

    if (this.props.results.error) {
      return (
        <Notification>
          Oops! Something went wrong :(
        </Notification>
      );
    }

    if (this.props.results.length === 0) {
      return (
        <Notification>
          There were no results found for {this.props.query}
        </Notification>
      );
    }

    const results = this.props.results.map((r, i) => (
      <TitleGroup main={
                    <Link to={"/nearby/" + stringifyLatLng(r.geometry.location)}
                          query={{name: r.name}}>
                      {r.name}
                    </Link>
                  }
                  sub={'@ ' + r.formatted_address}
                  key={i} />
    ));

    return (
      <div>
        <Collection header="Did you mean...">
          {results}
        </Collection>
      </div>
    );
  }
}