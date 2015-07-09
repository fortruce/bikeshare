import React from 'react';

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.title || 'Loading...'}</div>
        <div className="preloader-wrapper big active loading">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}