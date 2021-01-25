import { defaultReducers } from 'redux-rest-resource/lib/reducers';

export const paginatedFetchReducer = (state, action) => {
  if (action.status !== 'resolved') {
    return {
      ...state,
      ...defaultReducers.fetch(state, action),
    };
  }

  const newState = defaultReducers.fetch(state, {
    ...action,
    body: action.body.data,
  });
  return {
    ...state,
    ...newState,
    pageIndex: action.body.pageIndex,
    totalItemsCount: action.body.totalItemsCount,
  };
};
