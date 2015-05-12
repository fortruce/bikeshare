var React = require('react');
var MapComponentMixin = require('../utils/MapComponentMixin');
var assign = require('object-assign');

function reactMapComponent(constructorName, opts) {
  return React.createClass(assign({
    displayName: constructorName,
    mixins: [MapComponentMixin],
    render: () => {return null;},
    // get the constructor from the google maps api
    componentConstructor: google.maps[constructorName]
  }, opts || {}));
}

module.exports = {
  'Marker':     reactMapComponent('Marker'),
  'Polyline':   reactMapComponent('Polyline'),
  'Circle':     reactMapComponent('Circle'),
  'Rectangle':  reactMapComponent('Rectangle'),
  'Polygon':    reactMapComponent('Polygon'),
  'InfoWindow': reactMapComponent('InfoWindow', {
    componentDidMount() {
      this.props.open(this._component);
    },
    _destroy() {
      this.props.close(this._component);
    }
  })
};