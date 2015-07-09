import React from 'react';

export default class Collection extends React.Component {
  render() {
    const header = this.props.header ?
                    <div className="collection__header">
                      {this.props.header}
                    </div>
                  : null;
    return (
      <div className="collection">
        { header }
        <div className="collection__body">
          { this.props.children.map((c, i) => (
              <div key={i} className="collection__item">{c}</div>
            )) }
        </div>
      </div>
    );
  }
}