import React from 'react';
import HashHistory from 'react-router/lib/HashHistory';
import Root from './Root';

React.render(
  <Root history={new HashHistory()} />,
  document.getElementById('container')
);