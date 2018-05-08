import { combineReducers } from 'redux';
import SchoolsReducer from './reducer_schools';
import UsersReducer from './reducer_users';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  schools: SchoolsReducer,
  users: UsersReducer,
  form: formReducer
});

export default rootReducer;