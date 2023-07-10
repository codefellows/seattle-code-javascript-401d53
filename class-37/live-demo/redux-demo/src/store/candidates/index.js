let initialState = [
  { name: 'Peter', votes: 0 },
  { name: 'Paul', votes: 0 },
  { name: 'Mary', votes: 0 },
];

function candidatesReducer(state = initialState, action) {
  // type of actions:  INCREMENT, DECREMENT, RESET
  switch (action.type) {

    case 'INCREMENT':
      // payload will be a candidate
      return state.map(candidate => {
          if (candidate.name === action.payload.name) {
            return {
              name: candidate.name,
              votes: candidate.votes + 1,
            }
          }
          return candidate;
        });
      
    case 'DECREMENT':
      // payload will be a candidate
      return state.map(candidate => candidate.name === action.payload.name ? {name: candidate.name, votes: candidate.votes - 1} : candidate);
       
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default candidatesReducer;
