// our redux store hub
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import votesReducer from './votes';
import candidatesReducer from './candidates';
import todoReducer from './todo';

let reducers = combineReducers({
  votes: votesReducer,
  candidates: candidatesReducer,
  todos: todoReducer
});

const store = () => {

  // thunk allows us to perform asynchronous actions in vanilla redux
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};

export default store();
