import axios from 'axios';
import { createAction, createReducer } from '@reduxjs/toolkit'

const GET = 'GET';

export const setTodos = createAction(GET);

let todos = [];

const todoReducer = createReducer(
  todos,
  {
    [GET]: (state, action) => {
      return action.payload
    }
  }
)

// ALSO need a function to handle the async (our data getter)
export const getTodos = () => async(dispatch, getState) => {
  let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
  console.log('initial data from getTodos', response.data.results);
  dispatch(setTodos(response.data.results));
}

export default todoReducer;
