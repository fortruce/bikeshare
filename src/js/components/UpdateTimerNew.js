var React = require('react');

function padZero(s) {
  if (s < 10)
    return '0' + s;
  return s;
}

function secondsToString(time) {
  var seconds = time % 60;
  var minutes = Math.floor(time / 60);
  var hours = Math.floor(minutes / 60);
  return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
}

module.exports = React.createClass({
  getInitialState() {
    return {time: 0};
  },
  componentDidMount() {
    this.props.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(this.refs.control);

    this.interval = setInterval(() => {
      this.setState({time: this.state.time++});
    }, 1000);
  },
  render() {
    return (
      <div ref="control">
        Test: {secondsToString(this.state.time)}
      </div>
    );
  }
});