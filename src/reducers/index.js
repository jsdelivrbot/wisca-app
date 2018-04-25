import { combineReducers } from 'redux';
import SchoolsReducer from './reducer_schools';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  schools: SchoolsReducer,
  form: formReducer
});

export default rootReducer;