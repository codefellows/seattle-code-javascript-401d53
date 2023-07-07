const initialState = 0;

function votesReducer(state = initialState, action) {
  // type of actions:  INCREMENT, DECREMENT, RESET
  let newState;
  switch (action.type) {
    case 'INCREMENT':
      // payload will be a candidate
      newState = state + 1;
      return newState;
    case 'DECREMENT':
      // payload will be a candidate
      newState = state - 1;
      return newState
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}



export default votesReducer;
