import React from 'react';
import HashHistory from 'react-router/lib/HashHistory';
import App from './containers/App';

React.render(
  <App history={new HashHistory()} />,
  document.getElementById('container')
);