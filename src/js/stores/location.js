import * as constants from '../constants';
import assign from 'object-assign';

const initialState = {
  location: undefined,
  tracking: true
}

const actionsMap = {
  [constants.LOCATION_CHANGE]: (state, action) => ({ location: action.location }),
  [constants.START_TRACKING]: (state, action) => ({ tracking: true }),
  [constants.STOP_TRACKING]: (state, action) => ({ tracking: false })
};

export default function location (state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;

  return assign({}, state, reduceFn(state, action));
}