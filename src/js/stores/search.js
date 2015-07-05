import * as constants from '../constants';
import assign from 'object-assign';

const initialState = {
  results: [],
  query: undefined,
  inProgress: false
}

const actionsMap = {
  [constants.SEARCH_COMPLETED]: (state, action) => ({
    results: action.results,
    inProgress: false
  }),
  [constants.SEARCH_STARTED]: (state, action) => ({
    query: action.query,
    inProgress: true
  })
};

export default function search(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;

  return assign({}, state, reduceFn(state, action));
}