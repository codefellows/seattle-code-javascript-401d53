import { createAction } from '@reduxjs/toolkit';
import { INCREMENT, DECREMENT, RESET } from './constants';

// create actions used by candidates and votes reducers
export const incrementVote = createAction(INCREMENT);
export const decrementVote = createAction(DECREMENT);
export const reset = createAction(RESET);
