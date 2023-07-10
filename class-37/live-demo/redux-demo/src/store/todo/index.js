import axios from 'axios';

let initialState = [];

// https://api-js401.herokuapp.com/api/v1/todo
function todoReducer(state=initialState, action){
  switch(action.type){
    case 'GET':
      return action.payload
    default:
      return state;
  }
  
}

// need an action
export const setTodos = (data) => {
  return {
    type: 'GET',
    payload: data,
  }
}

// ALSO need a function to handle the async (our data getter)
export const getTodos = () => async(dispatch, getState) => {
  let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
  console.log('initial data from getTodos', response.data.results);
  dispatch(setTodos(response.data.results));
}

export default todoReducer;
