import React from 'react';

export default class TitleGroup extends React.Component {
  render() {
    return(
      <div className="title-group">
        <div key="main" className="title-group__main">{ this.props.main }</div>
        <div className="title-group__sub">{ this.props.sub }</div>
      </div>
    );
  }
}