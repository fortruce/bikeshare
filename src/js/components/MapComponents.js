var React = require('react');
var keyMirror = require('react/lib/keyMirror');

var MapComponentMixin = {
  componentDidMount() {
    this._component = new this.componentConstructor();
    this._events = {};
    this._updateProps(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this._updateProps(nextProps);
  },

  componentWillUnmount() {
    this._destroy();
    this._removeAllListeners();
    this._component.setOptions({map: null});
    this._component = null;
  },

  _updateProps(nextProps) {
    var options = Object.create(null);
    var events = Object.create(null);

    // Set all previous properties to null to be deleted
    for (var propKey in this.props) {
      if (propKey in Options)
        options[propKey] = null;
      else if (propKey in Events)
        events[propKey] = null;
    }

    // Set all new options/events
    for (var propKey in nextProps) {
      if (propKey in Options)
        options[propKey] = this.props[propKey];
      else if (propKey in Events)
        events[propKey] = this.props[propKey];
    }

    this._updateOptions(options);
    this._updateEvents(events);
  },

  _updateOptions(options) {
    this._component.setOptions(options);
  },

  _updateEvents(events) {
    for (var eventKey in events) {
      if (events[eventKey] === null)
        this._removeEventListener(eventKey);
      else
        this._addEventListener(eventKey, events[eventKey]);
    }
  },

  _removeEventListener(eventName) {
    google.maps.event.removeListener(this._events[eventName]);
  },

  _addEventListener(eventName, listener) {
    this._events[eventName] = google.maps.event.addListener(this._component, eventName, listener);
  },

  _removeAllListeners() {
    google.maps.event.clearInstanceListeners(this._component);
  }
}

var Events = keyMirror({
  'click': null
});

var Options = keyMirror({
  'title': null,
  'position': null,
  'map': null
});

function reactMapComponent(constructorName) {
  return React.createClass({
    displayName: constructorName,
    mixins: [MapComponentMixin],
    render: () => {return null;},
    // get the constructor from the google maps api
    componentConstructor: google.maps[constructorName]
  });
}

module.exports = {
  'Marker': reactMapComponent('Marker'),
  'Polyline': reactMapComponent('Polyline'),
  'Circle': reactMapComponent('Circle'),
  'Rectangle': reactMapComponent('Rectangle'),
  'Polygon': reactMapComponent('Polygon')
};