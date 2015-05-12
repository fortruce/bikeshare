var React = require('react');

var Events = require('../utils/ReactEvents');
var Options = require('../utils/ReactOptions');

var deepEqual = require('deep-equal');

module.exports = {
  componentDidMount() {
    this._component = new this.componentConstructor();
    this._events = {};
    this._updateProps(this.props, true);
  },

  componentWillReceiveProps(nextProps) {
    this._updateProps(nextProps);
  },

  componentWillUnmount() {
    if (this._destroy)
      this._destroy();
    this._removeAllListeners();
    this._component.setOptions({map: null});
    this._component = null;
  },

  _updateProps(nextProps, force) {
    var options = Object.create(null);
    var events = Object.create(null);

    // Set all previous properties to null to be deleted
    for (var prop in this.props) {
      if (propKey in Options && !(prop in nextProps))
        options[propKey] = null;
      else if (propKey in Events)
        events[propKey] = null;
    }

    // Set all new options/events
    for (var propKey in nextProps) {
      if (propKey in Options) {
        if (force || !deepEqual(this.props[propKey], nextProps[propKey]))
          options[propKey] = nextProps[propKey];
      }
      else if (propKey in Events) {
        if (nextProps[propKey] === this.props[propKey] && !force)
          delete events[propKey];
        else
          events[propKey] = nextProps[propKey];
      }
    }

    this._updateOptions(options);
    this._updateEvents(events);
  },

  _updateOptions(options) {
    if (Object.keys(options).length !== 0)
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
  },

  getMapNode() {
    return this._component;
  }
}