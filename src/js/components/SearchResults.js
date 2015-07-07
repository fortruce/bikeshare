import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import { search } from '../actions/search';
import { decodeComponent, stringifyLatLng } from '../utils';
import { Link } from 'react-router';
import LoadingSpinner from './LoadingSpinner';
import Notification from './Notification';
import Collection from './Collection';
import CollectionHeader from './CollectionHeader';

const styles = {
  result: {
    fontSize: '1rem',
  },
  title: {
    fontSize: '1.5rem'
  },
  subtitle: {
    lineHeight: '1.5rem',
    marginBottom: 0,
    marginTop: '5px'
  },
  row: {
    margin: '0'
  }
}

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
      return <LoadingSpinner title={'Searching for ' + this.props.query} />;
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

    const results = this.props.results.map((r) => (
      <div style={ styles.result }>
        <div style={ styles.title }>
          <Link to={"/nearby/" + stringifyLatLng(r.geometry.location)}
                query={{name: r.name}}>
            {r.name}
          </Link>
        </div>
        <div  style={ styles.row }
              className="row">
          <p  style={ styles.subtitle }
              className="col offset-s1">@ {r.formatted_address}</p>
        </div>
      </div>
    ));

    return (
      <div>
        <CollectionHeader>Did you mean...</CollectionHeader>
        <Collection>
          {results}
        </Collection>
      </div>
    );
  }
}