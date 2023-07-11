import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories';
import productsReducer from './products';
import cartReducer from './cart';

const store = () => configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
    cart: cartReducer
  }
});

export default store();



// import { legacy_createStore as createStore, combineReducers } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';

// const reducers = combineReducers({
// });

// const store = () => createStore(reducers, composeWithDevTools());

