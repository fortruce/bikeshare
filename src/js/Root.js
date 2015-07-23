import React, { PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import { Provider } from 'redux/react';
import { createRedux, composeStores, createDispatcher } from 'redux';
import thunkMiddleware from 'redux/lib/middleware/thunk';

import * as components from './components';
import * as stores from './stores';
import * as tutorials from './components/tutorials';

import { queryStations } from './actions/stations';

const {
  Application,
  NearbyStations,
  SearchResults,
  About
} = components;

function logMiddleware(next) {
  return action => {
    console.log('Action:', action.type);
    next(action);
  }
}

const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [thunkMiddleware(getState), logMiddleware]
);

const redux = createRedux(dispatcher);

export default class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  componentWillMount() {
    redux.dispatch(queryStations());

    this._interval = setInterval(() => {
      redux.dispatch(queryStations());
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const { history } = this.props;
    return (
      <Provider redux={redux}>
        {renderRoutes.bind(null, history)}
      </Provider>
    );
  }
}

function renderRoutes(history) {
  return (
    <Router history={history}>
      <Route component={Application}>
        <Route path="nearby" component={NearbyStations}>
          <Route name="latlng" path=":latlng" component={NearbyStations} />
        </Route>
        <Route path="search/:search" component={SearchResults} />
        <Route path="tutorial">
          <Route path="intro" component={tutorials.Intro} />
        </Route>
        <Route path="about" component={About} />
        <Redirect from="/" to="/nearby" />
      </Route>
    </Router>
  );
}