let initialState = {
  categories: [
    { name: 'electronics', displayName: 'Electronics' },
    { name: 'food', displayName: 'Food' },
    { name: 'clothing', displayName: 'Clothing' },
  ],
  activeCategory: ''
};

function categoryReducer(state=initialState, action){
  switch(action.type){
    case 'SET':
      return {
        ...state,
        activeCategory: action.payload,
      }
    default:
      return state;
  }
}

export default categoryReducer;
