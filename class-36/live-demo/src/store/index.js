// our redux store hub
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import votesReducer from './votes';

let reducers = combineReducers({
  votes: votesReducer,
});

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
