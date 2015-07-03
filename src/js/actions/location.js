import * as constants from '../constants';

var _trackHandle;
var _currentLocation;
var _supported = 'geolocation' in navigator;

export function startTrackingLocation() {
  return dispatch => {
    if (!_supported) {
      console.log('Geolocation is not supported on your device.');
      return;
    }

    if (_trackHandle)
      return;

    _trackHandle = navigator.geolocation.watchPosition((pos) => {
      _currentLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      dispatch(locationChange(_currentLocation));
    }, (error) => {
      console.log('ERROR:', error);
    });

    dispatch({
      type: constants.START_TRACKING
    });
  }
}

export function locationChange(loc) {
  return {
    type: constants.LOCATION_CHANGE,
    location: loc
  }
}

export function stopTrackingLocation() {
  return dispatch => {
    if (_trackHandle) {
      navigator.geolocation.clearWatch(_trackHandle);
      _trackHandle = null;

      dispatch({
        type: constants.STOP_TRACKING
      });
    }
  }
}