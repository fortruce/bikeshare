import React from 'react';

export default class LoadingSpinner extends React.Component {
  render() {
    return (
      <div>
        <div className="preloader-wrapper big active primary-spinner">
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