import productsReducer from '.';
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { set } from '../actions';

describe('Products reducer', () => {
  // combine reducers
  const reducers = combineReducers({
    products: productsReducer,
  });

  // create a store to provide state
  const store = createStore(reducers);

  test('provides initial state', () => {
    let state = store.getState();

    let { products } = state.products;
    console.log(products);

    expect(products.length).toEqual(7)
  });
  test('contains relevant products when active category is set', () => {
    let category = { name: 'food', displayName: 'Food' };
    store.dispatch(set(category));
    let state = store.getState();
    let { products } = state.products;
    console.log('modified products list', products);

    expect(products.length).toEqual(3);
    expect(products[0].name).toEqual('Apples');
  })
});
