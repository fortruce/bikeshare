import * as constants from '../constants';
import assign from 'object-assign';

const initialState = {
  stations: []
};

const actionsMap = {
  [constants.UPDATE_STATIONS]: (state, action) => ({ stations: action.stations })
}

export default function station (state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;

  return assign({}, state, reduceFn(state, action));
}