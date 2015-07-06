import * as constants from '../constants';
import assign from 'object-assign';

const initialState = {
  results: [],
  query: null,
  inProgress: false,
  error: null
}

const actionsMap = {
  [constants.SEARCH_COMPLETED]: (state, action) => ({
    results: action.results,
    inProgress: false
  }),
  [constants.SEARCH_STARTED]: (state, action) => ({
    query: action.query,
    inProgress: true,
    error: null
  }),
  [constants.SEARCH_ERROR]: (state, action) => ({
    error: action.error,
    inProgress: false
  })
};

export default function search(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;

  return assign({}, state, reduceFn(state, action));
}