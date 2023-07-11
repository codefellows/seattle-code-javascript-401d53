// our redux store hub
import { configureStore } from '@reduxjs/toolkit';
import votesReducer from './votes';
import candidatesReducer from './candidates';
import todoReducer from './todo';
import counterReducer from './counter';

const store = () => configureStore({
  reducer: {
    votes: votesReducer,
    candidates: candidatesReducer,
    todos: todoReducer,
    counter: counterReducer
  }
});

export default store();
