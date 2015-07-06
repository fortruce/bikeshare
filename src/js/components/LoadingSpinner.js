import React from 'react';
import Notification from './Notification';

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <Notification>
        <div>{this.props.title || 'Loading...'}</div>
        <div className="preloader-wrapper big active notification__spinner">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </Notification>
    );
  }
}