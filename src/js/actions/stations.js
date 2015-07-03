import * as constants from '../constants';
import request from 'request';

export function queryStations() {
  return dispatch => {
    request(window.location.origin + '/bikes', (err, resp) => {
      if (err)
        return console.log('ERROR:', err);
      dispatch({
        type: constants.UPDATE_STATIONS,
        stations: JSON.parse(resp.body).stations
      });
    });
  }
}