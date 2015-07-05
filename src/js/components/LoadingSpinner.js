import React from 'react';

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="loading">
        <div className="center-align loading__title">{this.props.title || 'Loading...'}</div>
        <div className="preloader-wrapper big active loading__spinner">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}