var React = require('react');

module.exports = React.createClass({
  render() {
    var children = React.Children.map(this.props.children, (c) => {
      return React.cloneElement(c, {map: this.props.map});
    });
    return (
      <div>{children}</div>
    );
  }
});