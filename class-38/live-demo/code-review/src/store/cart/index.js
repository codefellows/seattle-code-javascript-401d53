const initialState = { 
  cart: [] 
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        cart: [...state.cart, {
          name: action.payload.name,
          price: action.payload.price,
        }
        ]
      }
    case 'REMOVE':
      return {
        ...state,
        cart: state.cart.filter(product => product.name !== action.payload.name)
      };
    default:
      return state;
  }
}

export default cartReducer;
