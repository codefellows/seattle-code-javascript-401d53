import { createAction, createReducer } from '@reduxjs/toolkit';
import { INCREMENT, DECREMENT } from '../constants';

let candidate = [
  { name: 'Peter', votes: 0 },
  { name: 'Paul', votes: 0 },
  { name: 'Mary', votes: 0 },
];

const candidatesReducer = createReducer(
  // first param is our initialState
  candidate,
  // second param creates our individual reducer properties
  {
    [INCREMENT]: (state, action) => {
      return state.map(candidate => {
        if (candidate.name === action.payload.name) {
          return {
            name: candidate.name,
            votes: candidate.votes + 1,
          }
        }
        return candidate;
      });
    },
    [DECREMENT]: (state, action) => {
      return state.map(candidate => candidate.name === action.payload.name ? {name: candidate.name, votes: candidate.votes - 1} : candidate);
    }
  }
);

export default candidatesReducer;
