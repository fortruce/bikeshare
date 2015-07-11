import React, { PropTypes } from 'react';

export default class Collection extends React.Component {
  static propTypes = {
    header: PropTypes.string,
    children: PropTypes.array.isRequired
  }

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