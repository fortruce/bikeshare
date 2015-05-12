var React = require('react');
var keyMirror = require('react/lib/keyMirror');
var InjectMap = require('../components/InjectMap');

var States = keyMirror({
  PENDING: null,
  MAP_CREATED: null,

});

var Map = React.createClass({
  getInitialState() {
    return {
      state: States.PENDING
    };
  },

  getDefaultProps: function() {
    return {
      zoom: 1,
      style: {},
      className: "",
      center: {lat: 38.88, lng: -77.01}
    };
  },

  componentDidMount() {
    this._map = new google.maps.Map(this.refs.mapHolder.getDOMNode(),
      {
        zoom: this.props.zoom,
        center: this.props.center
      });
    this.setState({state: States.MAP_CREATED});
  },

  render: function() {
    var children = [];
    if (this.state.state === States.MAP_CREATED) {
      children = (<InjectMap map={this._map}>
                    {this.props.children}
                  </InjectMap>);
    }
    return(
      <div  ref="mapHolder"
            style={this.props.style}
            className={this.props.className}>
        {children}
      </div>
    );
  }
})

module.exports = Map;