import * as constants from '../constants';
import assign from 'object-assign';

const initialState = {
  results: [],
  query: undefined
}

const actionsMap = {
  [constants.SEARCH]: (state, action) => ({
    results: action.results,
    query: action.query
  })
};

export default function search(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;

  return assign({}, state, reduceFn(state, action));
}