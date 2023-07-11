import { createReducer } from '@reduxjs/toolkit';
import { INCREMENT, DECREMENT } from '../constants';

const votes = 0;

const votesReducer = createReducer(
  votes,
  {
    [INCREMENT]: (state, action) => {
      return state + 1
    },
    [DECREMENT]: (state, action) => {
      return state - 1
    }
  }
)

export default votesReducer;
