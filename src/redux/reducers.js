import { combineReducers } from 'redux';

import { rootReducer as users } from '../resources/users';

const reducers = combineReducers({
  users,
});

export default reducers;
