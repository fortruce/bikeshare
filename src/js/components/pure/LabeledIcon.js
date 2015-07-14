import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Icon from './Icon';

export default class LabeledIcon extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    iconClassNames: PropTypes.array,
    classNames: PropTypes.array
  }

  render() {
    const description = <div className="label-icon__label">
                          { this.props.label }
                        </div>;
    return (
      <div className={classnames('label-icon', this.props.classNames)}>
        { this.props.position === 'before' ? description : null }
        <Icon icon={ this.props.icon }
              classNames={ ['label-icon__icon', this.props.iconClassNames] } />
        { this.props.position === 'after' ? description : null }
      </div>
    );
  }
}